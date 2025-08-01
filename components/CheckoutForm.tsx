"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

interface CheckoutFormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
}

export default function CheckoutForm() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order document in Firestore
      const orderData = {
        customer: formData,
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "orders"), orderData)
      setOrderId(docRef.id)
      clearCart()
    } catch (error) {
      console.error("Error creating order:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-green-600">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="text-lg font-mono font-bold">{orderId}</p>
              </CardContent>
            </Card>
          </div>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    )
  }

  if (state.items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
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