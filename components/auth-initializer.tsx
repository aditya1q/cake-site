"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export function AuthInitializer() {
  const { setLoading } = useAuth()

  useEffect(() => {
    // Initialize auth state from localStorage
    setLoading(false)
  }, [setLoading])

  return null
}
