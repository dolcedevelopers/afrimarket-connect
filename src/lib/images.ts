import type { Category } from "@/lib/categories";
import type { SyntheticEvent } from "react";

const image = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=90`;

export const LANDING_HERO_IMAGE = image("photo-1523805009345-7448845a9e53", 1800);

export const LANDING_MARKET_IMAGES = [
  {
    src: image("photo-1509099836639-18ba1795216d", 1100),
    alt: "African textile market with colorful fabric stalls",
    label: "Textiles",
  },
  {
    src: image("photo-1464226184884-fa280b87c399", 900),
    alt: "Fresh produce arranged for sale at an open market",
    label: "Food trade",
  },
  {
    src: image("photo-1513519245088-0e12902e5a38", 900),
    alt: "Handmade baskets and decor pieces displayed for sale",
    label: "Artisans",
  },
] as const;

export const ABOUT_HERO_IMAGE = image("photo-1756061916299-643c5b65858e", 1800);

/** Southern African city skylines, open markets, and business scenes (Unsplash, free license). */
export const ABOUT_SOUTHERN_AFRICA_IMAGES = [
  {
    src: image("photo-1756061916299-643c5b65858e", 1200),
    alt: "Cape Town city skyline with harbour, colourful districts, and the Atlantic Ocean",
    label: "Cape Town CBD",
    region: "South Africa",
    context: "City",
  },
  {
    src: image("photo-1707049503512-deecae1d63fa", 1200),
    alt: "Panoramic view of Cape Town from Table Mountain with coastline and urban sprawl",
    label: "Table Mountain",
    region: "Cape Town, South Africa",
    context: "City",
  },
  {
    src: image("photo-1577948000111-9c970dfe3743", 1200),
    alt: "Aerial view of the Johannesburg city skyline during the day",
    label: "Johannesburg",
    region: "South Africa",
    context: "City",
  },
  {
    src: image("photo-1604348489791-f95132c5d8c0", 1200),
    alt: "Johannesburg skyline at sunset with clouds over the financial district",
    label: "Sandton & CBD",
    region: "Johannesburg, South Africa",
    context: "City",
  },
  {
    src: image("photo-1692689386358-910e46764d20", 1200),
    alt: "Vendors and shoppers at a craft stall at Rosebank Sunday Market",
    label: "Rosebank Market",
    region: "Johannesburg, South Africa",
    context: "Market",
  },
  {
    src: image("photo-1692689384678-5986513fffc3", 1200),
    alt: "Street food and produce laid out on tables at Rosebank Sunday Market",
    label: "Sunday Market",
    region: "Johannesburg, South Africa",
    context: "Market",
  },
] as const;

/** Landing-page marketing slideshow — Southern African commerce, cities, and business. */
export const LANDING_MARKETING_SLIDESHOW = [
  {
    src: image("photo-1692689386358-910e46764d20", 1600),
    alt: "Vendors trading handmade goods at Rosebank Sunday Market in Johannesburg",
    headline: "Markets that move Southern Africa",
    subline: "From Rosebank stalls to export-ready brands — real African commerce starts here.",
  },
  {
    src: image("photo-1692689383138-c2df3476072c", 1600),
    alt: "Colourful handmade bags displayed at Rosebank Sunday Market",
    headline: "Craft, colour, and continental trade",
    subline: "Fashion, artisan goods, and heritage — listed by verified vendors across the region.",
  },
  {
    src: image("photo-1577948000111-9c970dfe3743", 1600),
    alt: "Johannesburg city skyline seen from above during the day",
    headline: "Africa's cities. Global buyers.",
    subline: "Connect Johannesburg, Cape Town, and beyond from one trusted marketplace.",
  },
  {
    src: image("photo-1756061916299-643c5b65858e", 1600),
    alt: "Cape Town coastal skyline with modern buildings and the harbour",
    headline: "Coastal cities. Continental reach.",
    subline: "Premium storefronts for Southern African businesses selling to the world.",
  },
  {
    src: image("photo-1573164574511-73c773193279", 1600),
    alt: "Diverse business team collaborating in a modern office meeting",
    headline: "Built for African entrepreneurs",
    subline: "List products, manage orders, and grow with tools made for how you work.",
  },
  {
    src: image("photo-1692689383052-9fbf3d1c0969", 1600),
    alt: "Shoppers browsing open-air market stalls in Johannesburg",
    headline: "From market stall to digital storefront",
    subline: "AfriMarket gives vendors a verified presence — online and ready to scale.",
  },
] as const;

const CATEGORY_IMAGES: Record<Category, string> = {
  Fashion: image("photo-1515886657613-9f3515b0c78f"),
  Beauty: image("photo-1596462502278-27bfdc403348"),
  Food: image("photo-1506806732259-39c2d0268443"),
  "Home Decor": image("photo-1513519245088-0e12902e5a38"),
  Agriculture: image("photo-1464226184884-fa280b87c399"),
  Electronics: image("photo-1516321318423-f06f85e504b3"),
};

export const DEFAULT_PRODUCT_IMAGE = LANDING_MARKET_IMAGES[0].src;

export function categoryImage(category?: string | null): string {
  return CATEGORY_IMAGES[category as Category] ?? DEFAULT_PRODUCT_IMAGE;
}

export function productImage(src?: string | null, category?: string | null): string {
  const trimmed = src?.trim();
  return trimmed || categoryImage(category);
}

export function replaceBrokenImage(
  event: SyntheticEvent<HTMLImageElement>,
  category?: string | null,
) {
  const fallback = categoryImage(category);
  const img = event.currentTarget;

  if (img.src !== fallback) {
    img.src = fallback;
    return;
  }

  img.src = DEFAULT_PRODUCT_IMAGE;
}
