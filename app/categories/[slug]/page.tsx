"use client";

import { use } from "react";
import { notFound } from "next/navigation";
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
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { GameGrid } from "@/app/components/home/GameGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { allGames, categories } from "@/app/data/games";
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

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const category = categories.find(
    (c) => c.id.toLowerCase() === slug.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const filteredGames = allGames.filter((game) =>
    game.genres.some((g) => g.toLowerCase() === category.id.toLowerCase())
  );

  const Icon = iconMap[category.icon] || Sparkles;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/games" className="hover:text-neon-cyan transition-colors duration-200">
                All Games
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </nav>
          </FadeIn>

          {/* Category Header */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                <Icon className="size-6 text-neon-purple" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
                  {category.name}
                </h1>
                <p className="text-muted-foreground">
                  {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"} available
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Game Grid */}
          <FadeIn delay={0.2}>
            <GameGrid games={filteredGames} />
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
