"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Timer, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/app/context/LanguageContext";

export function PromoBanner() {
  const { t } = useLanguage();
  return (
    <section className="w-full">
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl glass glass-border gradient-border">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/15 via-purple-500/15 to-neon-cyan/15" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-72 h-72 bg-neon-magenta/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-neon-cyan/8 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 sm:px-12">
            <div className="text-center sm:text-start">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <Flame className="size-4 text-neon-magenta animate-pulse-glow" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-neon-magenta">
                  {t("promo.limitedTime")}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {t("promo.summerSale")}
              </h2>
              <p className="text-base text-muted-foreground">
                {t("promo.upTo")} <span className="font-bold text-neon-cyan">70% {t("promo.off")}</span> {t("promo.onThousands")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <Timer className="size-4" />
                <span>{t("promo.endsIn")}</span>
              </div>
              <Link href="/deals">
                <Button
                  size="lg"
                  className="bg-neon-magenta text-white hover:bg-neon-magenta/80 neon-glow-magenta font-semibold px-8 h-11 text-sm cursor-pointer rounded-xl gap-2"
                >
                  {t("promo.shopTheSale")}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
