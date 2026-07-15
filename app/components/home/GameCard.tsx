"use client";

import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/app/data/games";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const { t } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const hasDiscount = game.originalPrice && game.originalPrice > game.price;
  const isFree = game.isFree || game.price === 0;

  const handleAddToCart = () => {
    if (isInCart(game.id)) return;
    addItem(game);
    toast.success(t("game.addedToCart"), {
      description: game.title,
    });
  };

  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl",
        "glass glass-border neon-card-hover",
        "min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px] shrink-0"
      )}
    >
      {/* Image Placeholder */}
      <Link href={`/games/${game.id}`} className="block">
        <div className="relative aspect-video rounded-t-xl bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.02] from-black/[0.05] to-black/[0.02] overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg dark:bg-white/[0.07] dark:border-white/[0.08] bg-black/[0.05] border-black/[0.08] border flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="font-[family-name:var(--font-display)] text-lg text-muted-foreground/40">
                {game.title.charAt(0)}
              </span>
            </div>
          </div>

          {/* Discount Badge */}
          {hasDiscount && game.discount && (
            <div className="absolute top-2 start-2">
              <Badge className="bg-neon-magenta text-white border-0 text-[10px] font-bold px-1.5 py-0 h-5 shadow-[0_0_10px_rgba(255,46,147,0.3)]">
                -{game.discount}%
              </Badge>
            </div>
          )}

          {/* Free Badge */}
          {isFree && (
            <div className="absolute top-2 start-2">
              <Badge className="bg-status-success text-white border-0 text-[10px] font-bold px-1.5 py-0 h-5">
                {t("badge.free")}
              </Badge>
            </div>
          )}

          {/* Badge */}
          {game.badge === "new" && !isFree && (
            <div className="absolute top-2 end-2">
              <Badge className="bg-neon-cyan text-black border-0 text-[10px] font-bold px-1.5 py-0 h-5">
                {t("badge.new")}
              </Badge>
            </div>
          )}

          {game.badge === "trending" && (
            <div className="absolute top-2 end-2">
              <Badge className="bg-neon-purple text-white border-0 text-[10px] font-bold px-1.5 py-0 h-5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                {t("badge.hot")}
              </Badge>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        <Link href={`/games/${game.id}`}>
          <h3 className="font-medium text-sm text-foreground/90 line-clamp-1 group-hover:text-neon-cyan transition-colors duration-200">
            {game.title}
          </h3>
        </Link>

        {/* Genres */}
        <div className="flex gap-1.5 flex-wrap">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="text-[10px] text-muted-foreground dark:bg-white/[0.04] bg-black/[0.04] px-1.5 py-0.5 rounded-md"
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
              <span className="text-sm font-bold text-status-success">
                {t("game.free")}
              </span>
            ) : (
              <>
                <span className="text-base font-bold text-neon-cyan">
                  ${game.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-muted-foreground/60 line-through">
                    ${game.originalPrice!.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => toggleItem(game)}
              className={cn(
                "size-8 rounded-lg cursor-pointer transition-all duration-200",
                isWishlisted(game.id)
                  ? "text-neon-magenta hover:text-neon-magenta"
                  : "text-muted-foreground hover:text-neon-magenta hover:bg-neon-magenta/10"
              )}
            >
              <Heart
                className="size-4"
                fill={isWishlisted(game.id) ? "currentColor" : "none"}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleAddToCart}
              disabled={isInCart(game.id)}
              className={cn(
                "size-8 rounded-lg cursor-pointer transition-all duration-200",
                isInCart(game.id)
                  ? "text-status-success hover:text-status-success"
                  : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10"
              )}
            >
              <ShoppingCart className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
