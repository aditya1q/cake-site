"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, name: string) => void
  updateQuantity: (id: number, name: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id && cartItem.name === item.name,
          )

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id && cartItem.name === item.name
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            }
          }

          return {
            cartItems: [...state.cartItems, item],
          }
        }),
      removeFromCart: (id, name) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => !(item.id === id && item.name === name)),
        })),
      updateQuantity: (id, name, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.name === name ? { ...item, quantity } : item,
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)
