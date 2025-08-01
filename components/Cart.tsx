"use client"

import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
          </div>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items ({state.totalItems})</span>
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
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 