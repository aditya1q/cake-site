"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { allCakes } from "@/data/cakes"
import type { Cake } from "@/data/cakes"

interface RecommendationsStore {
  recentlyViewed: Cake[]
  addToRecentlyViewed: (cake: Cake) => void
  getPersonalizedRecommendations: (currentCakeId: number) => Cake[]
  getRelatedCakes: (cake: Cake) => Cake[]
  clearRecentlyViewed: () => void
}

export const useRecommendations = create<RecommendationsStore>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (cake) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((item) => item.id !== cake.id)
          return {
            recentlyViewed: [cake, ...filtered].slice(0, 10), // Keep only last 10 items
          }
        })
      },

      getPersonalizedRecommendations: (currentCakeId) => {
        const { recentlyViewed } = get()

        // Get categories and flavors from recently viewed cakes
        const viewedCategories = recentlyViewed.map((cake) => cake.category)
        const viewedFlavors = recentlyViewed.flatMap((cake) => cake.flavors)

        // Find cakes with similar categories or flavors
        const recommendations = allCakes
          .filter((cake) => cake.id !== currentCakeId)
          .filter(
            (cake) =>
              viewedCategories.includes(cake.category) || cake.flavors.some((flavor) => viewedFlavors.includes(flavor)),
          )
          .sort((a, b) => b.rating - a.rating) // Sort by rating
          .slice(0, 6)

        // If not enough personalized recommendations, add popular cakes
        if (recommendations.length < 6) {
          const popularCakes = allCakes
            .filter((cake) => cake.id !== currentCakeId)
            .filter((cake) => !recommendations.some((rec) => rec.id === cake.id))
            .sort((a, b) => b.reviews - a.reviews)
            .slice(0, 6 - recommendations.length)

          recommendations.push(...popularCakes)
        }

        return recommendations
      },

      getRelatedCakes: (cake) => {
        return allCakes
          .filter((c) => c.id !== cake.id)
          .filter(
            (c) =>
              c.category === cake.category ||
              c.flavors.some((flavor) => cake.flavors.includes(flavor)) ||
              c.occasion.some((occ) => cake.occasion.includes(occ)),
          )
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4)
      },

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: "recommendations-storage",
    },
  ),
)
