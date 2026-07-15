"use client";

import { useState, useMemo } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GameGrid } from "../components/home/GameGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { allGames, categories } from "../data/games";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";

const allFilter = { id: "all", name: "All Games", icon: "" };

export default function GamesPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return allGames;
    return allGames.filter((game) =>
      game.genres.some(
        (g) => g.toLowerCase() === activeCategory.toLowerCase()
      )
    );
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <FadeIn>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {t("games.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("games.browse", { count: allGames.length })}
              </p>
            </div>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(allFilter.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === allFilter.id
                    ? "bg-neon-cyan text-black shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                    : "glass glass-border text-muted-foreground hover:text-foreground hover:border-neon-purple/30"
                )}
              >
                {t("games.allGames")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeCategory === cat.id
                      ? "bg-neon-cyan text-black shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                      : "glass glass-border text-muted-foreground hover:text-foreground hover:border-neon-purple/30"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Results Count */}
          <FadeIn delay={0.15}>
            <p className="text-sm text-muted-foreground">
              {t("games.showing")}{" "}
              <span className="font-medium text-foreground">
                {filteredGames.length}
              </span>{" "}
              {filteredGames.length === 1 ? t("games.game") : t("games.games")}
            </p>
          </FadeIn>

          {/* Game Grid */}
          <FadeIn delay={0.2}>
            <GameGrid title="" games={filteredGames} />
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
