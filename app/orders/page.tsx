"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Clock, CheckCircle, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const router = useRouter()

  // Mock order data
  const orders = [
    {
      id: "SW123456789",
      date: "2024-01-20",
      status: "delivered",
      total: 1299,
      items: [
        { name: "Chocolate Truffle Delight (1kg)", quantity: 1, price: 899 },
        { name: "Red Velvet Romance (500g)", quantity: 1, price: 649 },
      ],
      deliveryDate: "2024-01-21",
      deliveryAddress: "123 Main Street, Mumbai, Maharashtra - 400001",
    },
    {
      id: "SW987654321",
      date: "2024-01-18",
      status: "preparing",
      total: 749,
      items: [{ name: "Strawberry Cream Dream (1kg)", quantity: 1, price: 749 }],
      deliveryDate: "2024-01-22",
      deliveryAddress: "456 Park Avenue, Mumbai, Maharashtra - 400002",
    },
    {
      id: "SW456789123",
      date: "2024-01-15",
      status: "out_for_delivery",
      total: 1099,
      items: [{ name: "Red Velvet Romance (1kg)", quantity: 1, price: 1099 }],
      deliveryDate: "2024-01-21",
      deliveryAddress: "789 Garden Road, Mumbai, Maharashtra - 400003",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Clock className="h-4 w-4" />
      case "out_for_delivery":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return "Processing"
    }
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
              <h1 className="text-xl font-bold text-rose-600">My Orders</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={() => router.push("/")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Ordered on {new Date(order.date).toLocaleDateString()} • Total: ₹{order.total}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">₹{item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Delivery Address:</h4>
                        <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Expected Delivery:</h4>
                        <p className="text-sm text-gray-600">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button variant="outline" className="flex-1">
                      Track Order
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" className="flex-1">
                        Rate & Review
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
