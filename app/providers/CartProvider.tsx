"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { CartContextType } from "../models/cart-context.model";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Оберните в CartProvider");
  } else {
    return context;
  }
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find((p) => p.id === product.id);

      if (findProduct) {
        return prev.map((p) =>
          p.id === findProduct.id ? { ...p, count: p.count + 1 } : p
        );
      } else {
        return [...prev, { ...product, count: 1 }];
      }

      return prev;
    });
  };

  const deleteCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find((p) => p.id === product.id);
      if (findProduct) {
        if (findProduct.count > 1) {
          return prev.map((p) =>
            p.id === findProduct.id ? { ...p, count: p.count - 1 } : p
          );
        } else {
          return prev.filter((p) => p.id !== product.id);
        }
      } else {
        return prev;
      }
    });
  };

  return (
    <CartContext.Provider value={{ isOpen, cartItems, setIsOpen, addCartItem, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
