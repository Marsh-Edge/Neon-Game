"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GameGrid } from "../components/home/GameGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/app/context/LanguageContext";

export default function WishlistPage() {
  const { t } = useLanguage();
  const { items, itemCount } = useWishlist();
  const { addItem, isInCart } = useCart();

  const handleAddAllToCart = () => {
    let added = 0;
    for (const game of items) {
      if (!isInCart(game.id)) {
        addItem(game);
        added++;
      }
    }
    if (added > 0) {
      toast.success(t("wishlist.added", { count: added, n: added }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <FadeIn>
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neon-magenta/10 border border-neon-magenta/20 shrink-0">
                <Heart className="size-6 text-neon-magenta" />
              </div>
              <div className="flex-1">
                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {t("wishlist.title")}
                </h1>
                <p className="text-muted-foreground">
                  {t("wishlist.saved", { count: itemCount, n: itemCount })}
                </p>
              </div>
              {itemCount > 0 && (
                <Button
                  onClick={handleAddAllToCart}
                  className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm cursor-pointer rounded-xl gap-2 shrink-0"
                >
                  <ShoppingCart className="size-4" />
                  {t("wishlist.addAll")}
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Content */}
          {itemCount > 0 ? (
            <FadeIn delay={0.1}>
              <GameGrid games={items} />
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl glass glass-border mb-5">
                  <Heart className="size-8 text-muted-foreground/40" />
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2">
                  {t("wishlist.empty")}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  {t("wishlist.emptyDesc")}
                </p>
                <Link href="/games">
                  <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm cursor-pointer rounded-xl">
                    {t("cart.browseGames")}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
