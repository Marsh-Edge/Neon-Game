"use client";

import { ChevronRight } from "lucide-react";
import { GameCard } from "./GameCard";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Game } from "@/app/data/games";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { useLanguage } from "@/app/context/LanguageContext";

interface GameRowProps {
  title: string;
  games: Game[];
  seeAllHref?: string;
}

export function GameRow({ title, games, seeAllHref = "#" }: GameRowProps) {
  const { t } = useLanguage();
  const { ref, isDragging } = useDragScroll();

  return (
    <section className="w-full">
      <FadeIn>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground">
            {title}
          </h2>
          <a
            href={seeAllHref}
            className="flex items-center gap-1 text-sm font-medium text-neon-cyan/70 hover:text-neon-cyan transition-colors duration-200"
          >
            {t("home.seeAll")}
            <ChevronRight className="size-4" />
          </a>
        </div>
      </FadeIn>
      <StaggerContainer
        ref={ref}
        staggerDelay={0.05}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide py-6 -mx-4 px-4",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {games.map((game) => (
          <StaggerItem key={game.id} className="shrink-0 px-3">
            <GameCard game={game} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
