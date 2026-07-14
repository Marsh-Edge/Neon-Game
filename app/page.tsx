import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroCarousel } from "./components/home/HeroCarousel";
import { CategoryBar } from "./components/home/CategoryBar";
import { GameRow } from "./components/home/GameRow";
import { GameGrid } from "./components/home/GameGrid";
import { PromoBanner } from "./components/home/PromoBanner";
import { SocialProof } from "./components/home/SocialProof";
import { Newsletter } from "./components/home/Newsletter";
import {
  bestSellers,
  recommended,
  newReleases,
  freeGames,
} from "./data/games";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-16">
          {/* Hero Carousel */}
          <HeroCarousel />

          {/* Browse by Category */}
          <CategoryBar />

          {/* Best Sellers */}
          <GameRow title="Best Sellers This Week" games={bestSellers} />

          {/* Mid-page Promo */}
          <PromoBanner />

          {/* Recommended */}
          <GameRow
            title="Recommended for You"
            games={recommended}
          />

          {/* Social Proof */}
          <SocialProof />

          {/* New Releases Grid */}
          <GameGrid title="New Releases" games={newReleases} />

          {/* Free Games */}
          <GameRow
            title="Free or Nearly Free"
            games={freeGames}
            seeAllHref="#free"
          />

          {/* Newsletter */}
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
