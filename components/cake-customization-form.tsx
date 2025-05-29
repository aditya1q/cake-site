"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Camera, Type, Gift, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CakeCustomizationFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (customization: any) => void
  cakeName: string
  basePrice: number
}

export function CakeCustomizationForm({ isOpen, onClose, onSubmit, cakeName, basePrice }: CakeCustomizationFormProps) {
  const [customization, setCustomization] = useState({
    message: "",
    name: "",
    age: "",
    flavor: "",
    color: "",
    photoUpload: false,
    photoFile: null as File | null,
    specialInstructions: "",
    candles: false,
    giftBox: false,
    giftNote: "",
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCustomization({ ...customization, photoFile: file, photoUpload: true })
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateTotalPrice = () => {
    let total = basePrice
    if (customization.photoUpload) total += 200
    if (customization.candles) total += 50
    if (customization.giftBox) total += 100
    return total
  }

  const handleSubmit = () => {
    onSubmit(customization)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Customize Your {cakeName}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Message Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type className="h-5 w-5 text-purple-600" />
                <span>Cake Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="message">Custom Message on Cake</Label>
                <Input
                  id="message"
                  placeholder="e.g., Happy Birthday Sarah!"
                  value={customization.message}
                  onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Birthday person's name"
                    value={customization.name}
                    onChange={(e) => setCustomization({ ...customization, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age (optional)</Label>
                  <Input
                    id="age"
                    placeholder="e.g., 25"
                    value={customization.age}
                    onChange={(e) => setCustomization({ ...customization, age: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-blue-600" />
                <span>Photo Cake</span>
                <Badge className="bg-blue-100 text-blue-700">+₹200</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {photoPreview ? (
                  <div className="space-y-4">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full h-32 object-cover mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPhotoPreview(null)
                        setCustomization({ ...customization, photoFile: null, photoUpload: false })
                      }}
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600">Upload a photo for your cake</p>
                      <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("photo-upload")?.click()}>
                      Choose Photo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-pink-600" />
                <span>Customization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="flavor">Preferred Flavor</Label>
                  <Input
                    id="flavor"
                    placeholder="e.g., Vanilla, Chocolate"
                    value={customization.flavor}
                    onChange={(e) => setCustomization({ ...customization, flavor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="color">Preferred Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Pink, Blue"
                    value={customization.color}
                    onChange={(e) => setCustomization({ ...customization, color: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests or instructions for the baker..."
                  value={customization.specialInstructions}
                  onChange={(e) => setCustomization({ ...customization, specialInstructions: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-green-600" />
                <span>Add-ons</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="candles"
                    checked={customization.candles}
                    onChange={(e) => setCustomization({ ...customization, candles: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="candles">Birthday Candles</Label>
                </div>
                <Badge variant="secondary">+₹50</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="giftBox"
                    checked={customization.giftBox}
                    onChange={(e) => setCustomization({ ...customization, giftBox: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="giftBox">Premium Gift Box</Label>
                </div>
                <Badge variant="secondary">+₹100</Badge>
              </div>

              {customization.giftBox && (
                <div>
                  <Label htmlFor="giftNote">Gift Note</Label>
                  <Textarea
                    id="giftNote"
                    placeholder="Write a special message for the gift recipient..."
                    value={customization.giftNote}
                    onChange={(e) => setCustomization({ ...customization, giftNote: e.target.value })}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>₹{basePrice}</span>
              </div>
              {customization.photoUpload && (
                <div className="flex justify-between text-sm">
                  <span>Photo Cake</span>
                  <span>+₹200</span>
                </div>
              )}
              {customization.candles && (
                <div className="flex justify-between text-sm">
                  <span>Birthday Candles</span>
                  <span>+₹50</span>
                </div>
              )}
              {customization.giftBox && (
                <div className="flex justify-between text-sm">
                  <span>Premium Gift Box</span>
                  <span>+₹100</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{calculateTotalPrice()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Add Customized Cake to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
