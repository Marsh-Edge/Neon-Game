"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { label: "Games", href: "#games" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "Wishlist", href: "#wishlist" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass glass-border-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Gamepad2 className="size-7 text-neon-cyan neon-text-cyan" />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-wide text-neon-cyan neon-text-cyan">
              NEONGAME
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-neon-purple rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 glass glass-border bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-neon-cyan focus-visible:ring-neon-cyan/30 h-9"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-neon-purple hover:bg-white/5"
            >
              <User className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-neon-cyan hover:bg-white/5"
            >
              <ShoppingCart className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[10px] font-bold text-white">
                3
              </span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-3">
            <div className="sm:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 glass glass-border bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground h-9"
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-neon-purple rounded-lg hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 pt-2 border-t border-white/10">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-neon-purple"
              >
                <User className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-neon-cyan"
              >
                <ShoppingCart className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[10px] font-bold text-white">
                  3
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
