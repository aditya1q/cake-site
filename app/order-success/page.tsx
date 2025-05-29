"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Package, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const router = useRouter()
  const orderNumber = "SW" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">Thank you for choosing SweetDelights</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-semibold text-green-600">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold">Tomorrow, 2-5 PM</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-gray-600">We'll send you updates via SMS & Email</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Preparation Started</p>
                      <p className="text-sm text-gray-600">Our bakers are crafting your cake</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Out for Delivery</p>
                      <p className="text-sm text-gray-600">Track your order in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We'll send you order updates on your registered mobile number and email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50"
              onClick={() => router.push("/orders")}
            >
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
