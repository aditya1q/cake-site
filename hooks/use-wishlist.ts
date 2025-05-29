"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useAuth } from "./use-auth"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
}

interface WishlistStore {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => Promise<void>
  removeFromWishlist: (id: number) => Promise<void>
  isInWishlist: (id: number) => boolean
  loadWishlist: (userId: string) => Promise<void>
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: async (item) => {
        const { user } = useAuth.getState()
        if (!user) return

        try {
          // Add to local state
          set((state) => ({
            wishlistItems: [...state.wishlistItems, item],
          }))
        } catch (error) {
          console.error("Error adding to wishlist:", error)
        }
      },
      removeFromWishlist: async (id) => {
        const { user } = useAuth.getState()
        if (!user) return

        try {
          // Remove from local state
          set((state) => ({
            wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
          }))
        } catch (error) {
          console.error("Error removing from wishlist:", error)
        }
      },
      isInWishlist: (id) => {
        return get().wishlistItems.some((item) => item.id === id)
      },
      loadWishlist: async (userId) => {
        // No-op for localStorage implementation
      },
      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
