"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Game } from "@/app/data/games";

interface WishlistContextType {
  items: Game[];
  itemCount: number;
  addItem: (game: Game) => void;
  removeItem: (gameId: string) => void;
  toggleItem: (game: Game) => void;
  isWishlisted: (gameId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Game[]>([]);

  const addItem = useCallback((game: Game) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === game.id)) return prev;
      return [...prev, game];
    });
  }, []);

  const removeItem = useCallback((gameId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== gameId));
  }, []);

  const toggleItem = useCallback((game: Game) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === game.id)) {
        return prev.filter((item) => item.id !== game.id);
      }
      return [...prev, game];
    });
  }, []);

  const isWishlisted = useCallback(
    (gameId: string) => items.some((item) => item.id === gameId),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, itemCount: items.length, addItem, removeItem, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
