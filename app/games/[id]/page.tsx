"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShoppingCart, Heart, Monitor, Calendar, Building2 } from "lucide-react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { GameRow } from "@/app/components/home/GameRow";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allGames } from "@/app/data/games";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";
import { formatPrice, formatDate } from "@/app/lib/formatPrice";

const platformIcons: Record<string, string> = {
  PC: "PC",
  PS5: "PS5",
  "Xbox Series X": "Xbox",
  "Xbox One": "Xbox",
  Switch: "Switch",
  Mobile: "Mobile",
  PS4: "PS4",
};

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { locale, t } = useLanguage();
  const game = allGames.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const hasDiscount = game.originalPrice && game.originalPrice > game.price;
  const isFree = game.isFree || game.price === 0;

  const relatedGames = allGames
    .filter(
      (g) =>
        g.id !== game.id &&
        g.genres.some((genre) => game.genres.includes(genre))
    )
    .slice(0, 6);

  const handleAddToCart = () => {
    if (isInCart(game.id)) return;
    addItem(game);
    toast.success(t("game.addedToCart"), { description: game.title });
  };

  const handleToggleWishlist = () => {
    toggleItem(game);
    toast(
      isWishlisted(game.id) ? t("game.removedFromWishlist") : t("game.addedToWishlist"),
      { description: game.title }
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/games"
                className="hover:text-neon-cyan transition-colors duration-200"
              >
                {t("games.title")}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{game.title}</span>
            </nav>
          </FadeIn>

          {/* Hero + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hero Image */}
            <FadeIn className="lg:col-span-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.02] from-black/[0.05] to-black/[0.02] glass glass-border">
                <div className="absolute inset-0 animate-shimmer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl dark:bg-white/[0.07] dark:border-white/[0.08] bg-black/[0.05] border-black/[0.08] border flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-4xl text-muted-foreground/40">
                      {game.title.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 start-4 flex gap-2">
                  {hasDiscount && game.discount && (
                    <Badge className="bg-neon-magenta text-white border-0 text-xs font-bold px-2 py-1 shadow-[0_0_10px_rgba(255,46,147,0.3)]">
                      -{game.discount}%
                    </Badge>
                  )}
                  {isFree && (
                    <Badge className="bg-status-success text-white border-0 text-xs font-bold px-2 py-1">
                      {t("badge.free")}
                    </Badge>
                  )}
                  {game.badge === "new" && (
                    <Badge className="bg-neon-cyan text-black border-0 text-xs font-bold px-2 py-1">
                      {t("badge.new")}
                    </Badge>
                  )}
                  {game.badge === "trending" && (
                    <Badge className="bg-neon-purple text-white border-0 text-xs font-bold px-2 py-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      {t("badge.hot")}
                    </Badge>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-6">
                {/* Price Block */}
                <div className="glass glass-border rounded-2xl p-6 space-y-5">
                  <div>
                    {isFree ? (
                      <span className="text-3xl font-bold text-status-success">
                        {t("game.free")}
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-neon-cyan">
                          {formatPrice(locale, game.price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-lg text-muted-foreground/60 line-through">
                            {formatPrice(locale, game.originalPrice!)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={isInCart(game.id)}
                    className={cn(
                      "w-full h-11 font-semibold rounded-xl cursor-pointer gap-2",
                      isInCart(game.id)
                        ? "bg-status-success text-white hover:bg-status-success"
                        : "bg-neon-cyan text-black hover:bg-neon-cyan/80 neon-glow-cyan"
                    )}
                  >
                    <ShoppingCart className="size-4" />
                    {isInCart(game.id) ? t("game.inCart") : t("game.addToCart")}
                  </Button>

                  <Button
                    onClick={handleToggleWishlist}
                    variant="outline"
                    className={cn(
                      "w-full h-11 font-semibold rounded-xl cursor-pointer gap-2",
                      isWishlisted(game.id)
                        ? "border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10"
                        : "glass-border text-muted-foreground hover:text-foreground hover:border-neon-purple/30"
                    )}
                  >
                    <Heart
                      className="size-4"
                      fill={isWishlisted(game.id) ? "currentColor" : "none"}
                    />
                    {isWishlisted(game.id)
                      ? t("game.inWishlist")
                      : t("game.addToWishlist")}
                  </Button>
                </div>

                {/* Info */}
                <div className="glass glass-border rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{t("game.developer")}</span>
                    <span className="ms-auto font-medium text-foreground">
                      {game.developer}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{t("game.released")}</span>
                    <span className="ms-auto font-medium text-foreground">
                      {formatDate(locale, game.releaseDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="size-4 text-status-warning shrink-0" />
                    <span className="text-muted-foreground">{t("game.rating")}</span>
                    <span className="ms-auto font-medium text-foreground">
                      {game.rating} / 5
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Monitor className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{t("game.platforms")}</span>
                    <div className="ms-auto flex flex-wrap gap-1.5 justify-end">
                      {game.platform.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded-md dark:bg-white/[0.06] bg-black/[0.04] text-xs font-medium text-foreground/80"
                        >
                          {platformIcons[p] || p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Title + Genres */}
          <FadeIn delay={0.15}>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {game.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/categories/${genre.toLowerCase()}`}
                    className="px-3 py-1 rounded-lg glass glass-border text-sm font-medium text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-200"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.2}>
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                {t("game.about")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>
          </FadeIn>

          {/* Screenshots */}
          <FadeIn delay={0.25}>
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                {t("game.screenshots")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {game.screenshots.map((_, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br dark:from-white/[0.05] dark:to-white/[0.02] from-black/[0.03] to-black/[0.01] glass glass-border"
                  >
                    <div className="w-full h-full animate-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Related Games */}
          {relatedGames.length > 0 && (
            <FadeIn delay={0.3}>
              <GameRow title={t("game.related")} games={relatedGames} />
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
