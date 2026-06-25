import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Globe2, Heart, MapPin, ShieldCheck, Users } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { ABOUT_HERO_IMAGE, ABOUT_SOUTHERN_AFRICA_IMAGES, replaceBrokenImage } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - AfriMarket" },
      {
        name: "description",
        content:
          "Learn about AfriMarket — the premium marketplace connecting verified African vendors with buyers worldwide.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [hero, ...gallery] = ABOUT_SOUTHERN_AFRICA_IMAGES;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <section className="relative overflow-hidden border-b border-border bg-foreground text-white">
        <div className="absolute inset-0">
          <img
            src={ABOUT_HERO_IMAGE}
            alt="Cape Town skyline with harbour and the Atlantic coast"
            className="size-full object-cover opacity-50"
            onError={replaceBrokenImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.145_0_0/.75),oklch(0.145_0_0/.92))]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">About AfriMarket</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Building the continent's most trusted marketplace for African-made goods.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
            AfriMarket connects verified African vendors with buyers who value authenticity, quality, and continental
            craftsmanship — from Cape Town&apos;s creative economy to Johannesburg&apos;s markets and beyond.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              Southern Africa
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Cities, markets & business</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              AfriMarket is rooted in the skylines of Cape Town and Johannesburg, the bustle of Rosebank Sunday
              Market, and the entrepreneurs building Southern Africa&apos;s next generation of exports.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-12">
            <figure className="col-span-2 overflow-hidden border border-border bg-white lg:col-span-7">
              <img
                src={hero.src}
                alt={hero.alt}
                className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
                loading="eager"
                onError={replaceBrokenImage}
              />
              <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <div>
                  <p className="text-sm font-bold">{hero.label}</p>
                  <p className="text-xs text-muted-foreground">{hero.region}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{hero.context}</p>
                </div>
                <MapPin className="size-4 shrink-0 text-primary" />
              </figcaption>
            </figure>

            <div className="col-span-2 grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {gallery.slice(0, 2).map((photo) => (
                <figure key={photo.src} className="overflow-hidden border border-border bg-white">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    onError={replaceBrokenImage}
                  />
                  <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-bold">{photo.label}</p>
                      <p className="text-xs text-muted-foreground">{photo.region}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{photo.context}</p>
                    </div>
                    <MapPin className="size-4 shrink-0 text-primary" />
                  </figcaption>
                </figure>
              ))}
            </div>

            {gallery.slice(2).map((photo) => (
              <figure key={photo.src} className="col-span-1 overflow-hidden border border-border bg-white sm:col-span-1">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  onError={replaceBrokenImage}
                />
                <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-bold">{photo.label}</p>
                    <p className="text-xs text-muted-foreground">{photo.region}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{photo.context}</p>
                  </div>
                  <MapPin className="size-4 shrink-0 text-primary" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Africa's entrepreneurs create world-class products every day, but reaching buyers beyond local markets
              remains a challenge. AfriMarket exists to close that gap — giving vendors a professional storefront,
              verified credibility, and access to buyers across the continent and globally.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              For buyers, we offer a curated, high-trust catalog where every vendor is reviewed before listing. No
              noise, no uncertainty — just quality goods with clear provenance.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Heart, label: "Authenticity first", body: "Every product tells a story of African craft and enterprise." },
              { icon: ShieldCheck, label: "Verified vendors", body: "Sellers are reviewed and verified before going live." },
              { icon: Globe2, label: "Continental reach", body: "Buy and sell across borders with integrated logistics." },
              { icon: Users, label: "Community driven", body: "Built for vendors and buyers who believe in African excellence." },
            ].map(({ icon: Icon, label, body }) => (
              <div key={label} className="border border-border bg-white p-6">
                <Icon className="mb-3 size-5 text-primary" />
                <h3 className="font-bold">{label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">What we stand for</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Trust by design",
                body: "Verification, transparent vendor profiles, and buyer protection are built into every transaction — not bolted on after the fact.",
              },
              {
                title: "Vendor empowerment",
                body: "From AI-assisted product listings to a dedicated vendor console, we give sellers the tools to launch and scale without technical barriers.",
              },
              {
                title: "Global ambition",
                body: "AfriMarket is built for African businesses with worldwide buyers in mind — fashion from Cape Town, crafts from Zimbabwe, and exports from Johannesburg and beyond.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <BadgeCheck className="mb-4 size-6 text-primary" />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 text-pretty text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tighter">Ready to join us?</h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Whether you're looking to shop African-made products or grow your business on the continent's premium
          marketplace, AfriMarket is your starting point.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            Browse marketplace <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup", role: "vendor" }}
            className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-foreground hover:text-white transition-colors"
          >
            Become a vendor
          </Link>
        </div>
      </section>

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
