-- Vendors may only read their own products; buyers and anonymous users can browse the full catalog.

DROP POLICY IF EXISTS "Products are publicly viewable" ON public.products;

CREATE POLICY "Anonymous users can browse products"
ON public.products
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Buyers and vendors can browse or manage visible products"
ON public.products
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR NOT public.has_role(auth.uid(), 'vendor')
  OR vendor_id = auth.uid()
);

DROP POLICY IF EXISTS "Vendors can update their own products" ON public.products;
CREATE POLICY "Vendors can update their own products"
ON public.products
FOR UPDATE
TO authenticated
USING (auth.uid() = vendor_id AND public.has_role(auth.uid(), 'vendor'))
WITH CHECK (auth.uid() = vendor_id AND public.has_role(auth.uid(), 'vendor'));

DROP POLICY IF EXISTS "Vendors can delete their own products" ON public.products;
CREATE POLICY "Vendors can delete their own products"
ON public.products
FOR DELETE
TO authenticated
USING (auth.uid() = vendor_id AND public.has_role(auth.uid(), 'vendor'));

-- Only vendors may upload product images.
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
CREATE POLICY "Vendors can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND public.has_role(auth.uid(), 'vendor')
);
