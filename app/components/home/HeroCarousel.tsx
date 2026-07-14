"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/app/data/games";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    handleSelect();
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={cn(
                  "relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-r",
                  slide.gradient
                )}
              >
                {/* Decorative neon elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full glass glass-border text-white">
                      {slide.discount}
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 mb-6">
                      {slide.subtitle}
                    </p>
                    <Button
                      size="lg"
                      className={cn(
                        "font-semibold px-8 h-11 text-sm cursor-pointer",
                        slide.accentColor === "neon-cyan"
                          ? "bg-neon-cyan text-black hover:bg-neon-cyan/80 neon-glow-cyan"
                          : slide.accentColor === "neon-magenta"
                          ? "bg-neon-magenta text-white hover:bg-neon-magenta/80 neon-glow-magenta"
                          : "bg-neon-purple text-white hover:bg-neon-purple/80 neon-glow-purple"
                      )}
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Custom Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full glass glass-border border-white/20 text-white hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full glass glass-border border-white/20 text-white hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <ChevronRight className="size-5" />
      </Button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              current === index
                ? "w-8 bg-neon-cyan neon-glow-cyan"
                : "w-2 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}
