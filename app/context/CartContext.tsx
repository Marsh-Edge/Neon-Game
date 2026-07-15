"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Game } from "@/app/data/games";

interface CartContextType {
  items: Game[];
  itemCount: number;
  addItem: (game: Game) => void;
  removeItem: (gameId: string) => void;
  isInCart: (gameId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
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

  const isInCart = useCallback(
    (gameId: string) => items.some((item) => item.id === gameId),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, itemCount: items.length, addItem, removeItem, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
