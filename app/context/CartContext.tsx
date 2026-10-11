"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import type { Game } from "@/app/data/games";
import { usePersistedState } from "./usePersistedState";

interface CartContextType {
  items: Game[];
  itemCount: number;
  total: number;
  addItem: (game: Game) => void;
  removeItem: (gameId: string) => void;
  clearCart: () => void;
  isInCart: (gameId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = usePersistedState<Game[]>("neon-cart", []);

  const addItem = useCallback((game: Game) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === game.id)) return prev;
      return [...prev, game];
    });
  }, [setItems]);

  const removeItem = useCallback((gameId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== gameId));
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const isInCart = useCallback(
    (gameId: string) => items.some((item) => item.id === gameId),
    [items]
  );

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, itemCount: items.length, total, addItem, removeItem, clearCart, isInCart }}>
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
