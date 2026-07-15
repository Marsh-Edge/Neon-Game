"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Gamepad2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Games", href: "/games" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "Wishlist", href: "/wishlist" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 frosted border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex size-9 items-center justify-center rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 transition-all duration-300 group-hover:bg-neon-cyan/15 group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Gamepad2 className="size-5 text-neon-cyan" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-foreground">
              NEON<span className="text-neon-cyan">GAME</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-neon-cyan transition-colors duration-200" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 frosted-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground h-9"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl relative"
              >
                <Heart className="size-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white shadow-[0_0_8px_rgba(255,46,147,0.4)]">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
            >
              <User className="size-[18px]" />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl relative"
              >
                <ShoppingCart className="size-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white shadow-[0_0_8px_rgba(255,46,147,0.4)]">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden frosted border border-border rounded-xl -mx-2 mb-3 py-4 space-y-1">
            <div className="sm:hidden relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 frosted-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground h-9"
              />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1 px-2 pt-3 mt-2 border-t border-border">
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl relative"
                >
                  <Heart className="size-[18px]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
              >
                <User className="size-[18px]" />
              </Button>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl relative"
                >
                  <ShoppingCart className="size-[18px]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
