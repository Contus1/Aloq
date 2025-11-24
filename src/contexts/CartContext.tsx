'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  tags: string[];
  available: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  size?: string;
  milk?: string;
}

interface CartContextType {
  cart: CartItem[];
  venueId: string | null;
  addToCart: (venueId: string, item: MenuItem, options?: { size?: string; milk?: string }) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  getTotalCents: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [venueId, setVenueId] = useState<string | null>(null);

  const addToCart = (
    newVenueId: string,
    item: MenuItem,
    options: { size?: string; milk?: string } = {}
  ) => {
    // If different venue, clear cart
    if (venueId && venueId !== newVenueId) {
      if (!confirm('Warenkorb leeren und von neuem Laden bestellen?')) {
        return;
      }
      setCart([]);
    }

    setVenueId(newVenueId);
    setCart((prev) => {
      const existing = prev.find(
        (c) =>
          c.item.id === item.id &&
          c.size === options.size &&
          c.milk === options.milk
      );
      if (existing) {
        return prev.map((c) =>
          c === existing ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1, ...options }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const newCart = prev.filter((_, i) => i !== index);
      if (newCart.length === 0) {
        setVenueId(null);
      }
      return newCart;
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const newCart = prev
        .map((item, i) => {
          if (i === index) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      if (newCart.length === 0) {
        setVenueId(null);
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setVenueId(null);
  };

  const getTotalCents = () => {
    return cart.reduce(
      (sum, item) => sum + item.item.price_cents * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        venueId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
