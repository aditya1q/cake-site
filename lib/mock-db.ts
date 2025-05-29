// Mock database for localStorage-based implementation
export interface User {
  id: string
  email: string
  password: string
  full_name?: string
  phone?: string
  created_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: number
  created_at: string
}

// Mock database storage
class MockDatabase {
  private users: User[] = []
  private wishlist: WishlistItem[] = []

  // User methods
  createUser(userData: Omit<User, "id" | "created_at">): User {
    const user: User = {
      ...userData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    this.users.push(user)
    return user
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  // Wishlist methods
  addToWishlist(userId: string, productId: number): WishlistItem {
    const item: WishlistItem = {
      id: Date.now().toString(),
      user_id: userId,
      product_id: productId,
      created_at: new Date().toISOString(),
    }
    this.wishlist.push(item)
    return item
  }

  removeFromWishlist(userId: string, productId: number): boolean {
    const index = this.wishlist.findIndex((item) => item.user_id === userId && item.product_id === productId)
    if (index > -1) {
      this.wishlist.splice(index, 1)
      return true
    }
    return false
  }

  getUserWishlist(userId: string): WishlistItem[] {
    return this.wishlist.filter((item) => item.user_id === userId)
  }
}

export const mockDB = new MockDatabase()
