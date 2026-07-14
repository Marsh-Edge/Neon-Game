import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/app/data/games";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const hasDiscount = game.originalPrice && game.originalPrice > game.price;
  const isFree = game.isFree || game.price === 0;

  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl overflow-hidden",
        "glass glass-border",
        "hover:bg-white/[0.08] hover:border-white/20",
        "transition-all duration-200 cursor-pointer min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px] shrink-0"
      )}
    >
      {/* Image Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-white/10 to-white/[0.02] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] text-lg text-white/40">
              {game.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Discount Badge */}
        {hasDiscount && game.discount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-neon-magenta text-white border-0 text-[10px] font-bold px-1.5 py-0 h-5">
              -{game.discount}%
            </Badge>
          </div>
        )}

        {/* Free Badge */}
        {isFree && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-status-success text-black border-0 text-[10px] font-bold px-1.5 py-0 h-5">
              FREE
            </Badge>
          </div>
        )}

        {/* Badge */}
        {game.badge === "new" && !isFree && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-neon-cyan text-black border-0 text-[10px] font-bold px-1.5 py-0 h-5">
              NEW
            </Badge>
          </div>
        )}

        {game.badge === "trending" && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-neon-purple text-white border-0 text-[10px] font-bold px-1.5 py-0 h-5">
              HOT
            </Badge>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <h3 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-neon-cyan transition-colors duration-200">
          {game.title}
        </h3>

        {/* Genres */}
        <div className="flex gap-1.5 flex-wrap">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-status-warning text-status-warning" />
          <span className="text-xs font-medium text-muted-foreground">
            {game.rating}
          </span>
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            {isFree ? (
              <span className="text-sm font-bold text-status-success neon-text-cyan">
                Free
              </span>
            ) : (
              <>
                <span className="text-sm font-bold text-neon-cyan">
                  ${game.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${game.originalPrice!.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-muted-foreground hover:text-neon-cyan hover:bg-white/5 cursor-pointer"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
