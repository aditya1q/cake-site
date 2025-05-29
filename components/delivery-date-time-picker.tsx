"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, Truck, Zap, Moon, Sun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, isSameDay, isToday, isTomorrow } from "date-fns"

interface DeliverySlot {
  id: string
  time: string
  label: string
  available: boolean
  price: number
  icon: React.ReactNode
  popular?: boolean
}

interface DeliveryDateTimePickerProps {
  onSelectionChange: (date: Date | null, slot: DeliverySlot | null) => void
  selectedDate?: Date | null
  selectedSlot?: DeliverySlot | null
}

export function DeliveryDateTimePicker({
  onSelectionChange,
  selectedDate = null,
  selectedSlot = null,
}: DeliveryDateTimePickerProps) {
  const [date, setDate] = useState<Date | null>(selectedDate)
  const [timeSlot, setTimeSlot] = useState<DeliverySlot | null>(selectedSlot)
  const [availableSlots, setAvailableSlots] = useState<DeliverySlot[]>([])

  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  // Time slots based on selected date
  useEffect(() => {
    if (!date) {
      setAvailableSlots([])
      return
    }

    const now = new Date()
    const isSelectedToday = isToday(date)
    const currentHour = now.getHours()

    let slots: DeliverySlot[] = []

    if (isSelectedToday) {
      // Same day delivery slots
      if (currentHour < 10) {
        slots.push({
          id: "same-day-morning",
          time: "10:00 AM - 12:00 PM",
          label: "Same Day Morning",
          available: true,
          price: 99,
          icon: <Sun className="h-4 w-4" />,
          popular: true,
        })
      }
      if (currentHour < 14) {
        slots.push({
          id: "same-day-afternoon",
          time: "2:00 PM - 4:00 PM",
          label: "Same Day Afternoon",
          available: true,
          price: 99,
          icon: <Sun className="h-4 w-4" />,
        })
      }
      if (currentHour < 18) {
        slots.push({
          id: "same-day-evening",
          time: "6:00 PM - 8:00 PM",
          label: "Same Day Evening",
          available: true,
          price: 99,
          icon: <Moon className="h-4 w-4" />,
        })
      }
      // Midnight delivery (11 PM - 1 AM)
      slots.push({
        id: "midnight-delivery",
        time: "11:00 PM - 1:00 AM",
        label: "Midnight Surprise",
        available: true,
        price: 199,
        icon: <Moon className="h-4 w-4" />,
        popular: true,
      })
    } else {
      // Future date slots
      slots = [
        {
          id: "morning",
          time: "9:00 AM - 12:00 PM",
          label: "Morning Delivery",
          available: true,
          price: isTomorrow(date) ? 49 : 0,
          icon: <Sun className="h-4 w-4" />,
        },
        {
          id: "afternoon",
          time: "12:00 PM - 4:00 PM",
          label: "Afternoon Delivery",
          available: true,
          price: isTomorrow(date) ? 49 : 0,
          icon: <Sun className="h-4 w-4" />,
          popular: true,
        },
        {
          id: "evening",
          time: "4:00 PM - 8:00 PM",
          label: "Evening Delivery",
          available: true,
          price: isTomorrow(date) ? 49 : 0,
          icon: <Moon className="h-4 w-4" />,
        },
        {
          id: "midnight",
          time: "11:00 PM - 1:00 AM",
          label: "Midnight Surprise",
          available: true,
          price: isTomorrow(date) ? 149 : 99,
          icon: <Moon className="h-4 w-4" />,
        },
      ]
    }

    setAvailableSlots(slots)
  }, [date])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const newDate = selectedDate || null
    setDate(newDate)
    setTimeSlot(null) // Reset time slot when date changes
    onSelectionChange(newDate, null)
  }

  const handleSlotSelect = (slot: DeliverySlot) => {
    setTimeSlot(slot)
    onSelectionChange(date, slot)
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM dd")
  }

  const getDateBadge = (date: Date) => {
    if (isToday(date)) return { text: "Same Day", color: "bg-red-100 text-red-700" }
    if (isTomorrow(date)) return { text: "Next Day", color: "bg-blue-100 text-blue-700" }
    return { text: "Standard", color: "bg-green-100 text-green-700" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Delivery Date & Time</h3>
        <p className="text-sm text-gray-600">Select your preferred delivery date and time slot</p>
      </div>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-rose-600" />
            <span>Select Date</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {availableDates.map((availableDate) => {
              const badge = getDateBadge(availableDate)
              const isSelected = date && isSameDay(date, availableDate)

              return (
                <Button
                  key={availableDate.toISOString()}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto p-3 flex flex-col space-y-1 ${isSelected ? "bg-rose-600 hover:bg-rose-700" : ""}`}
                  onClick={() => handleDateSelect(availableDate)}
                >
                  <div className="text-xs font-medium">{format(availableDate, "EEE")}</div>
                  <div className="text-sm font-bold">{getDateLabel(availableDate)}</div>
                  <Badge className={`text-xs ${badge.color}`}>{badge.text}</Badge>
                </Button>
              )
            })}
          </div>

          {/* Calendar Popover for more dates */}
          <div className="mt-4 text-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Choose Different Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
                  mode="single"
                  selected={date || undefined}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Time Slot Selection */}
      {date && availableSlots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Select Time Slot</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={timeSlot?.id === slot.id ? "default" : "outline"}
                  className={`h-auto p-4 flex items-center justify-between ${
                    timeSlot?.id === slot.id ? "bg-blue-600 hover:bg-blue-700" : ""
                  } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => slot.available && handleSlotSelect(slot)}
                  disabled={!slot.available}
                >
                  <div className="flex items-center space-x-3">
                    {slot.icon}
                    <div className="text-left">
                      <div className="font-medium">{slot.label}</div>
                      <div className="text-sm opacity-80">{slot.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {slot.popular && <Badge className="mb-1 bg-orange-100 text-orange-700">Popular</Badge>}
                    <div className="font-bold">{slot.price === 0 ? "FREE" : `₹${slot.price}`}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Special Delivery Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                <Zap className="h-4 w-4" />
                <span>Same-day delivery available for orders placed before 6 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-purple-700 bg-purple-50 p-2 rounded">
                <Moon className="h-4 w-4" />
                <span>Midnight delivery perfect for surprise celebrations!</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                <Truck className="h-4 w-4" />
                <span>Free delivery on orders above ₹500 (except same-day & midnight)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      {date && timeSlot && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-green-900">
                  Delivery scheduled for {format(date, "EEEE, MMMM dd")}
                </div>
                <div className="text-sm text-green-700">
                  {timeSlot.label} ({timeSlot.time})
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-900">{timeSlot.price === 0 ? "FREE" : `₹${timeSlot.price}`}</div>
                <div className="text-xs text-green-600">Delivery charge</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
