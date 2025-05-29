"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, User, MapPin, Phone, Mail, LogOut, Package, Heart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()

  if (!user) {
    router.push("/")
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-xl font-bold text-rose-600">My Profile</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-semibold">{user.user_metadata?.full_name || "User"}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Mumbai, Maharashtra</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/orders")}>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push("/wishlist")}
              >
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{wishlistItems.length}</div>
                  <div className="text-sm text-gray-600">Wishlist Items</div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/cart")}>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{cartItems.length}</div>
                  <div className="text-sm text-gray-600">Cart Items</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/orders")}>
                  <Package className="h-4 w-4 mr-3" />
                  View Order History
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/wishlist")}>
                  <Heart className="h-4 w-4 mr-3" />
                  My Wishlist
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/cart")}>
                  <Package className="h-4 w-4 mr-3" />
                  Shopping Cart
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order #SW123456789 delivered</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Heart className="h-5 w-5 text-rose-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Added Chocolate Truffle to wishlist</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order #SW987654321 placed</p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
