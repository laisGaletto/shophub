"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CartWidget() {
  const [cartCount, setCartCount] = useState(0)

  const handleCartClick = () => {
    console.log("Cart clicked")
  }

  return (
    <Button variant="outline" size="icon" className="relative" onClick={handleCartClick}>
      <ShoppingCart className="h-4 w-4" />
      {cartCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {cartCount}
        </Badge>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  )
}
