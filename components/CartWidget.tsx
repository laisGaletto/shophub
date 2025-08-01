"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

export default function CartWidget() {
  const { state } = useCart()

  return (
    <Button variant="outline" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        {state.totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
            {state.totalItems}
          </Badge>
        )}
        <span className="sr-only">Shopping cart</span>
      </Link>
    </Button>
  )
} 