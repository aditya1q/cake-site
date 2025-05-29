"use client"

import { useState } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Star,
  Eye,
  Filter,
  Download,
  Search,
  Bell,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data - in real app, this would come from your backend
  const stats = {
    totalRevenue: 125000,
    totalOrders: 1250,
    totalCustomers: 850,
    avgOrderValue: 1200,
    revenueGrowth: 12.5,
    orderGrowth: 8.3,
    customerGrowth: 15.2,
  }

  const revenueData = [
    { name: "Mon", revenue: 12000, orders: 45 },
    { name: "Tue", revenue: 15000, orders: 52 },
    { name: "Wed", revenue: 18000, orders: 61 },
    { name: "Thu", revenue: 22000, orders: 73 },
    { name: "Fri", revenue: 25000, orders: 89 },
    { name: "Sat", revenue: 28000, orders: 95 },
    { name: "Sun", revenue: 32000, orders: 108 },
  ]

  const categoryData = [
    { name: "Birthday Cakes", value: 35, color: "#e11d48" },
    { name: "Wedding Cakes", value: 25, color: "#f59e0b" },
    { name: "Custom Cakes", value: 20, color: "#8b5cf6" },
    { name: "Cupcakes", value: 15, color: "#06b6d4" },
    { name: "Others", value: 5, color: "#10b981" },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Priya Sharma",
      product: "Chocolate Truffle Cake",
      amount: 1200,
      status: "Delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Rajesh Kumar",
      product: "Vanilla Birthday Cake",
      amount: 800,
      status: "In Progress",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "Anita Patel",
      product: "Red Velvet Cake",
      amount: 1500,
      status: "Pending",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "Vikram Singh",
      product: "Custom Photo Cake",
      amount: 2000,
      status: "Delivered",
      date: "2024-01-14",
    },
    {
      id: "ORD-005",
      customer: "Meera Joshi",
      product: "Strawberry Cake",
      amount: 900,
      status: "Cancelled",
      date: "2024-01-13",
    },
  ]

  const topProducts = [
    { name: "Chocolate Truffle Cake", sales: 145, revenue: 174000 },
    { name: "Vanilla Birthday Cake", sales: 132, revenue: 105600 },
    { name: "Red Velvet Cake", sales: 98, revenue: 147000 },
    { name: "Black Forest Cake", sales: 87, revenue: 130500 },
    { name: "Strawberry Cake", sales: 76, revenue: 68400 },
  ]

  const customerFeedback = [
    {
      id: 1,
      customer: "Priya Sharma",
      rating: 5,
      comment: "Absolutely delicious! The chocolate was rich and the cake was perfectly moist.",
      product: "Chocolate Truffle Cake",
      date: "2024-01-15",
    },
    {
      id: 2,
      customer: "Rajesh Kumar",
      rating: 4,
      comment: "Great taste and quality. Delivery was on time.",
      product: "Vanilla Birthday Cake",
      date: "2024-01-14",
    },
    {
      id: 3,
      customer: "Anita Patel",
      rating: 5,
      comment: "Best cake I've ever had! Perfect for special occasions.",
      product: "Red Velvet Cake",
      date: "2024-01-13",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">KyraBakers Admin</h1>
              <Badge className="bg-rose-100 text-rose-700">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{stats.revenueGrowth}% from last month</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  <p className="text-sm text-green-600">+{stats.orderGrowth}% from last month</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                  <p className="text-sm text-green-600">+{stats.customerGrowth}% from last month</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.avgOrderValue}</p>
                  <p className="text-sm text-gray-500">Per order</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#e11d48" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search orders..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.product}</td>
                          <td className="py-3 px-4">₹{order.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-rose-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Chocolate Truffle Cake", stock: 25, lowStock: false },
                    { name: "Vanilla Birthday Cake", stock: 8, lowStock: true },
                    { name: "Red Velvet Cake", stock: 15, lowStock: false },
                    { name: "Black Forest Cake", stock: 3, lowStock: true },
                    { name: "Strawberry Cake", stock: 20, lowStock: false },
                    { name: "Custom Photo Cake", stock: 12, lowStock: false },
                  ].map((item) => (
                    <div key={item.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.lowStock && <Badge className="bg-red-100 text-red-700">Low Stock</Badge>}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stock Level</span>
                          <span>{item.stock} units</span>
                        </div>
                        <Progress value={(item.stock / 30) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Customer Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerFeedback.map((feedback) => (
                    <div key={feedback.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-rose-100 text-rose-600">
                            {feedback.customer.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium">{feedback.customer}</h3>
                              <p className="text-sm text-gray-600">{feedback.product}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">{feedback.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-700">{feedback.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
