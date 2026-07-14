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
    <header className="sticky top-0 z-50 frosted border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex size-9 items-center justify-center rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 transition-all duration-300 group-hover:bg-neon-cyan/15 group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Gamepad2 className="size-5 text-neon-cyan" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white">
              NEON<span className="text-neon-cyan">GAME</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-neon-cyan transition-colors duration-200" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 frosted-input rounded-xl text-sm text-white placeholder:text-slate-500 h-9"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
            >
              <User className="size-[18px]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl relative"
            >
              <ShoppingCart className="size-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white shadow-[0_0_8px_rgba(255,46,147,0.4)]">
                3
              </span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-9 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] py-4 space-y-1">
            <div className="sm:hidden relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search games..."
                className="pl-9 frosted-input rounded-xl text-sm text-white placeholder:text-slate-500 h-9"
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-1 px-2 pt-3 mt-2 border-t border-white/[0.06]">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
              >
                <User className="size-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl relative"
              >
                <ShoppingCart className="size-[18px]" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-neon-magenta text-[9px] font-bold text-white">
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
