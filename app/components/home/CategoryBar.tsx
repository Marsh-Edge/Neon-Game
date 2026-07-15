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
import { categories } from "@/app/data/games";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { useLanguage } from "@/app/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Swords,
  Shield,
  Crosshair,
  Car,
  Brain,
  Trophy,
  Compass,
  Sparkles,
};

export function CategoryBar() {
  const { t } = useLanguage();

  return (
    <section id="categories" className="w-full">
      <FadeIn>
        <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground mb-5">
          {t("home.browseByCategory")}
        </h2>
      </FadeIn>
      <StaggerContainer className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          return (
            <StaggerItem key={cat.id}>
              <Link
                href={`/categories/${cat.id}`}
                className={cn(
                  "group flex flex-col items-center gap-2.5 p-4 rounded-xl",
                  "glass glass-border",
                  "hover:bg-muted hover:border-neon-purple/30",
                  "transition-all duration-250 cursor-pointer"
                )}
              >
                <Icon className="size-6 text-neon-purple group-hover:text-neon-cyan transition-all duration-250 group-hover:scale-110" />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-250">
                  {cat.name}
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
