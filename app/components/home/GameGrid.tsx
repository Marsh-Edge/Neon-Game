"use client";

import { useState } from "react";
import { GameCard } from "./GameCard";
import { Button } from "@/components/ui/button";
import type { Game } from "@/app/data/games";

interface GameGridProps {
  title: string;
  games: Game[];
}

export function GameGrid({ title, games }: GameGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleGames = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  return (
    <section className="w-full">
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground mb-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleGames.map((game) => (
          <div key={game.id} className="flex justify-center">
            <GameCard game={game} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="glass border border-border text-muted-foreground hover:text-foreground hover:border-neon-cyan/30 hover:bg-muted px-8 cursor-pointer rounded-xl"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
