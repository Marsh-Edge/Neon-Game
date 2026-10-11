"use client";

import { PageShell } from "./components/layout/PageShell";
import { HeroCarousel } from "./components/home/HeroCarousel";
import { CategoryBar } from "./components/home/CategoryBar";
import { GameRow } from "./components/home/GameRow";
import { PromoBanner } from "./components/home/PromoBanner";
import { SocialProof } from "./components/home/SocialProof";
import { Newsletter } from "./components/home/Newsletter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  bestSellers,
  recommended,
  newReleases,
  freeGames,
} from "./data/games";

export default function Home() {
  const { t } = useLanguage();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-16">
          {/* Hero Carousel */}
          <FadeIn variant="fadeIn" duration={0.6}>
            <HeroCarousel />
          </FadeIn>

          {/* Browse by Category */}
          <CategoryBar />

          {/* Best Sellers */}
          <GameRow title={t("home.bestSellers")} games={bestSellers} />

          {/* Mid-page Promo */}
          <PromoBanner />

          {/* Recommended */}
          <GameRow
            title={t("home.recommended")}
            games={recommended}
          />

          {/* Social Proof */}
          <SocialProof />

          {/* New Releases */}
          <GameRow title={t("home.newReleases")} games={newReleases} />

          {/* Free Games */}
          <GameRow
            title={t("home.freeGames")}
            games={freeGames}
            seeAllHref="#free"
          />

          {/* Newsletter */}
          <Newsletter />
      </div>
    </PageShell>
  );
}
