"use client";

import { useMemo } from "react";
import { Flame } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GameGrid } from "../components/home/GameGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { allGames } from "../data/games";

export default function DealsPage() {
  const dealGames = useMemo(
    () =>
      allGames.filter(
        (game) =>
          (game.originalPrice && game.originalPrice > game.price) ||
          game.discount
      ),
    []
  );

  const maxSavings = useMemo(() => {
    return dealGames.reduce((max, game) => {
      if (!game.originalPrice) return max;
      const saving = game.originalPrice - game.price;
      return saving > max ? saving : max;
    }, 0);
  }, [dealGames]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <FadeIn>
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 shrink-0">
                <Flame className="size-6 text-neon-magenta" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  Hot Deals
                </h1>
                <p className="text-muted-foreground">
                  {dealGames.length} {dealGames.length === 1 ? "game" : "games"} on sale
                  {maxSavings > 0 && (
                    <>
                      {" "}&mdash; save up to{" "}
                      <span className="font-bold text-neon-cyan">
                        ${maxSavings.toFixed(0)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Game Grid */}
          <FadeIn delay={0.1}>
            <GameGrid games={dealGames} />
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
