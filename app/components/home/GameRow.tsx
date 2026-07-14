"use client";

import { ChevronRight } from "lucide-react";
import { GameCard } from "./GameCard";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Game } from "@/app/data/games";
import { cn } from "@/lib/utils";

interface GameRowProps {
  title: string;
  games: Game[];
  seeAllHref?: string;
}

export function GameRow({ title, games, seeAllHref = "#" }: GameRowProps) {
  const { ref, isDragging } = useDragScroll();

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground">
          {title}
        </h2>
        <a
          href={seeAllHref}
          className="flex items-center gap-1 text-sm font-medium text-neon-cyan/70 hover:text-neon-cyan transition-colors duration-200"
        >
          See all
          <ChevronRight className="size-4" />
        </a>
      </div>
      <div
        ref={ref}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
