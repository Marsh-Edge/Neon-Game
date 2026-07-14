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
  return (
    <section id="categories" className="w-full">
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground mb-5">
        Browse by Category
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={cn(
                "group flex flex-col items-center gap-2 p-4 rounded-xl",
                "glass glass-border",
                "hover:bg-white/10 hover:border-neon-purple/40",
                "transition-all duration-200 cursor-pointer"
              )}
            >
              <Icon className="size-6 text-neon-purple group-hover:text-neon-cyan transition-colors duration-200" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {cat.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
