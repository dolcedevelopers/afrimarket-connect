import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { LANDING_MARKETING_SLIDESHOW, replaceBrokenImage } from "@/lib/images";

const INTERVAL_MS = 5500;

export function MarketingSlideshow() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className="border-y border-border bg-foreground text-white" aria-label="African marketplace highlights">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              Southern African commerce
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter sm:text-4xl">
              The marketplace in motion
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="grid size-10 place-items-center border border-white/25 transition-colors hover:bg-white hover:text-foreground"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="grid size-10 place-items-center border border-white/25 transition-colors hover:bg-white hover:text-foreground"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="-ml-0">
          {LANDING_MARKETING_SLIDESHOW.map((slide, index) => (
            <CarouselItem key={slide.src} className="pl-0 basis-full">
              <div className="relative aspect-[16/7] min-h-[280px] max-h-[520px] w-full overflow-hidden sm:aspect-[21/9]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 size-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={replaceBrokenImage}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.145_0_0/.88),oklch(0.145_0_0/.55),oklch(0.145_0_0/.2))]" />
                <div className="absolute inset-0 flex items-end">
                  <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                      Slide {index + 1} / {LANDING_MARKETING_SLIDESHOW.length}
                    </p>
                    <h3 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tighter sm:text-4xl">
                      {slide.headline}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm text-white/75 sm:text-base">{slide.subline}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mx-auto flex max-w-7xl justify-center gap-2 px-4 py-6 sm:px-6">
        {LANDING_MARKETING_SLIDESHOW.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-1 transition-all ${index === active ? "w-8 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
