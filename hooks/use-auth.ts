"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    phone?: string
  }
}

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
  ) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

// Mock user database for demo purposes
const mockUsers = [
  {
    id: "1",
    email: "demo@KyraBakers.com",
    password: "password123",
    user_metadata: {
      full_name: "Demo User",
      phone: "+91 98765 43210",
    },
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      setUser: (user) => {
        set({ user })
      },

      setLoading: (loading) => set({ loading }),

      signIn: async (email: string, password: string) => {
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Check mock users or allow any email/password for demo
          const mockUser = mockUsers.find((u) => u.email === email && u.password === password)

          if (mockUser || email.includes("@")) {
            const user: User = mockUser
              ? {
                  id: mockUser.id,
                  email: mockUser.email,
                  user_metadata: mockUser.user_metadata,
                }
              : {
                  id: Date.now().toString(),
                  email: email,
                  user_metadata: {
                    full_name: email.split("@")[0],
                    phone: "+91 98765 43210",
                  },
                }

            get().setUser(user)
            return { success: true }
          } else {
            return { success: false, error: "Invalid email or password" }
          }
        } catch (error) {
          return { success: false, error: "An unexpected error occurred" }
        }
      },

      signUp: async (email: string, password: string, fullName: string, phone?: string) => {
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Check if user already exists
          const existingUser = mockUsers.find((u) => u.email === email)
          if (existingUser) {
            return { success: false, error: "User already exists" }
          }

          const user: User = {
            id: Date.now().toString(),
            email: email,
            user_metadata: {
              full_name: fullName,
              phone: phone,
            },
          }

          // Add to mock database
          mockUsers.push({
            id: user.id,
            email: email,
            password: password,
            user_metadata: user.user_metadata!,
          })

          get().setUser(user)
          return { success: true }
        } catch (error) {
          return { success: false, error: "An unexpected error occurred" }
        }
      },

      signOut: async () => {
        try {
          get().setUser(null)
        } catch (error) {
          console.error("Error signing out:", error)
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
