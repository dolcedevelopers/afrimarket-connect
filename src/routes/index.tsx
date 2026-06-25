import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Sparkles, Store, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/app-header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { MarketingSlideshow } from "@/components/marketing-slideshow";
import { CATEGORIES, CATEGORY_META } from "@/lib/categories";
import { LANDING_HERO_IMAGE, LANDING_MARKET_IMAGES, replaceBrokenImage } from "@/lib/images";

const marketImages = [
  {
    ...LANDING_MARKET_IMAGES[0],
    icon: Store,
  },
  {
    ...LANDING_MARKET_IMAGES[1],
    icon: BadgeCheck,
  },
  {
    ...LANDING_MARKET_IMAGES[2],
    icon: Globe2,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriMarket - Discover, Buy, and Grow African Businesses" },
      { name: "description", content: "A premium B2B2C marketplace connecting verified African vendors with buyers worldwide. Browse fashion, beauty, food, decor, agriculture, and electronics." },
      { property: "og:title", content: "AfriMarket - Discover, Buy, and Grow African Businesses" },
      { property: "og:description", content: "A premium B2B2C marketplace connecting verified African vendors with buyers worldwide." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { data: featured } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, currency, category, image_url, vendor_id")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white">
      <AppHeader />

      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0">
          <img
            src={LANDING_HERO_IMAGE}
            alt="African landscape and commerce routes"
            className="h-full w-full object-cover opacity-55"
            onError={replaceBrokenImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.145_0_0/.92),oklch(0.145_0_0/.66),oklch(0.145_0_0/.24))]" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-3xl animate-reveal">
            <span className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white backdrop-blur">
              Connecting African Excellence
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tighter text-balance sm:text-7xl">
              Discover, Buy, and Grow African Businesses.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/78 text-pretty leading-relaxed">
              A high-trust marketplace for African-made products, verified vendors, and buyers looking for quality goods with continental roots.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:bg-primary/90 active:scale-95"
              >
                Browse Products
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup", role: "vendor" }}
                className="border-2 border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:bg-transparent hover:text-white"
              >
                Sell on AfriMarket
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-end pb-2">
            {marketImages.map((image, index) => {
              const Icon = image.icon;

              return (
                <figure
                  key={image.src}
                  className={index === 0 ? "col-span-2 overflow-hidden border border-white/15 bg-white/10" : "overflow-hidden border border-white/15 bg-white/10"}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={index === 0 ? "h-56 w-full object-cover sm:h-64" : "h-40 w-full object-cover sm:h-48"}
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={replaceBrokenImage}
                  />
                  <figcaption className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80">
                    <Icon className="size-3 text-primary" />
                    {image.label}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-stone-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-70">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Verified by Pan-African Trust</span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Secured Transactions</span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">50k+ Active Merchants</span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Logistics Integrated</span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Verified Vendors", body: "Every seller is reviewed and ID-verified before going live, so buyers shop with confidence." },
            { icon: Truck, title: "Pan-African Logistics", body: "Integrated shipping partners move goods from Lagos to Nairobi to anywhere globally." },
            { icon: Sparkles, title: "AI Vendor Tools", body: "Smart description writing and category suggestions help vendors launch products in minutes." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="mb-4 size-6 text-primary" />
              <h3 className="mb-2 text-xl font-bold">{title}</h3>
              <p className="text-pretty text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <Link to="/products" className="border-b-2 border-primary pb-1 font-mono text-xs font-bold uppercase">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                className="group rounded-sm border border-border bg-white p-6 transition-colors hover:border-primary"
              >
                <div className="mb-2 font-mono text-lg font-bold text-primary">{CATEGORY_META[cat].icon}</div>
                <h3 className="mb-1 text-sm font-bold transition-colors group-hover:text-primary">{cat}</h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">{CATEGORY_META[cat].blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Exports</h2>
            <p className="mt-2 text-muted-foreground">Curated quality from verified regional hubs.</p>
          </div>
          <Link to="/products" className="border-b-2 border-primary pb-1 font-mono text-xs font-bold uppercase">
            View All
          </Link>
        </div>

        {!featured?.length ? (
          <EmptyFeatured />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={{ ...p, verified: true }} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-foreground py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tighter md:text-5xl">
              Grow your business on the continent's premium marketplace.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-white/70">
              Onboard in minutes. List products with AI-assisted descriptions. Reach buyers across Africa and beyond.
            </p>
            <Link
              to="/auth"
              search={{ mode: "signup", role: "vendor" }}
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Become a Vendor <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <MarketingSlideshow />

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}

function EmptyFeatured() {
  return (
    <div className="rounded-sm border border-dashed border-border bg-stone-50 p-12 text-center">
      <p className="text-sm text-muted-foreground">
        No products listed yet. <Link to="/auth" search={{ mode: "signup", role: "vendor" }} className="font-semibold text-primary underline">Become the first vendor.</Link>
      </p>
    </div>
  );
}
