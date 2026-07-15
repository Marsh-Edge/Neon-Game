"use client";

import Link from "next/link";
import {
  Swords,
  Shield,
  Crosshair,
  Car,
  Brain,
  Trophy,
  Compass,
  Sparkles,
} from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { categories, allGames } from "../data/games";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Shield,
  Crosshair,
  Car,
  Brain,
  Trophy,
  Compass,
  Sparkles,
};

export default function CategoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <FadeIn>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {t("categories.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("categories.browse", { catCount: categories.length, gameCount: allGames.length })}
              </p>
            </div>
          </FadeIn>

          {/* Category Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Sparkles;
              const gameCount = allGames.filter((game) =>
                game.genres.some((g) => g.toLowerCase() === cat.id.toLowerCase())
              ).length;

              return (
                <StaggerItem key={cat.id}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className={cn(
                      "group flex flex-col items-center gap-4 p-8 rounded-2xl",
                      "glass glass-border",
                      "hover:bg-muted hover:border-neon-purple/30",
                      "transition-all duration-300 cursor-pointer text-center"
                    )}
                  >
                    <div className="flex size-14 items-center justify-center rounded-xl bg-neon-purple/10 border border-neon-purple/20 transition-all duration-300 group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                      <Icon className="size-7 text-neon-purple transition-colors duration-300 group-hover:text-neon-cyan" />
                    </div>
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-1">
                        {cat.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {gameCount} {gameCount === 1 ? t("games.game") : t("games.games")}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
