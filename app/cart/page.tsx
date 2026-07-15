"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function CartPage() {
  const { items, itemCount, total, removeItem, clearCart } = useCart();

  const handleRemove = (gameId: string, title: string) => {
    removeItem(gameId);
    toast.success(`Removed from cart`, { description: title });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <FadeIn>
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 shrink-0">
                <ShoppingCart className="size-6 text-neon-cyan" />
              </div>
              <div className="flex-1">
                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  Shopping Cart
                </h1>
                <p className="text-muted-foreground">
                  {itemCount} {itemCount === 1 ? "game" : "games"} in your cart
                </p>
              </div>
              {itemCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                  className="text-muted-foreground hover:text-neon-magenta hover:bg-neon-magenta/10 font-medium px-4 h-9 text-sm cursor-pointer rounded-xl gap-2 shrink-0"
                >
                  <Trash2 className="size-4" />
                  Clear Cart
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Content */}
          {itemCount > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <FadeIn delay={0.1} className="lg:col-span-2 space-y-3">
                {items.map((game) => {
                  const hasDiscount = game.originalPrice && game.originalPrice > game.price;
                  return (
                    <div
                      key={game.id}
                      className="flex gap-4 p-4 glass glass-border rounded-xl"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/games/${game.id}`}
                        className="shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-lg bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.02] from-black/[0.05] to-black/[0.02] flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <span className="font-[family-name:var(--font-display)] text-xl text-muted-foreground/40">
                          {game.title.charAt(0)}
                        </span>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/games/${game.id}`}
                            className="font-medium text-foreground hover:text-neon-cyan transition-colors line-clamp-1"
                          >
                            {game.title}
                          </Link>
                          <div className="flex gap-1.5 mt-1 flex-wrap">
                            {game.genres.map((genre) => (
                              <span
                                key={genre}
                                className="text-[10px] text-muted-foreground dark:bg-white/[0.04] bg-black/[0.04] px-1.5 py-0.5 rounded-md"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-neon-cyan">
                              ${game.price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                              <span className="text-xs text-muted-foreground/60 line-through">
                                ${game.originalPrice!.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(game.id, game.title)}
                            className="text-muted-foreground hover:text-neon-magenta hover:bg-neon-magenta/10 cursor-pointer rounded-lg gap-1.5 h-8 text-xs"
                          >
                            <Trash2 className="size-3.5" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </FadeIn>

              {/* Order Summary */}
              <FadeIn delay={0.2}>
                <div className="glass glass-border rounded-xl p-6 sticky top-24 space-y-5">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span className="text-foreground font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-status-success font-medium">
                        -${items
                          .reduce(
                            (sum, g) => sum + ((g.originalPrice ?? g.price) - g.price),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <Separator className="bg-border" />
                    <div className="flex justify-between">
                      <span className="text-foreground font-bold">Total</span>
                      <span className="text-xl font-bold text-neon-cyan">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-bold h-11 text-sm cursor-pointer rounded-xl gap-2">
                    Proceed to Checkout
                    <ArrowRight className="size-4" />
                  </Button>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60 justify-center">
                    <ShieldCheck className="size-3.5" />
                    Secure checkout powered by Stripe
                  </div>

                  <Link href="/games" className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-foreground cursor-pointer rounded-xl h-9 text-sm"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          ) : (
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl glass glass-border mb-5">
                  <ShoppingCart className="size-8 text-muted-foreground/40" />
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Looks like you haven&apos;t added any games yet. Browse our catalog and find something you love.
                </p>
                <Link href="/games">
                  <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm cursor-pointer rounded-xl">
                    Browse Games
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
