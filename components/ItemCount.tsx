"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ItemCountProps {
  stock: number
  initial: number
  onAdd: (quantity: number) => void
}

export default function ItemCount({ stock, initial, onAdd }: ItemCountProps) {
  const [count, setCount] = useState(initial)

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleAddToCart = () => {
    onAdd(count)
  }

  return (
    <Card>
      <CardContent className="p-3 md:p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm md:text-base">Quantidade:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={count <= 1}
                className="h-8 w-8 md:h-9 md:w-9"
              >
                <Minus className="h-3 w-3 md:h-4 md:w-4" />
              </Button>

              <span className="w-12 text-center font-medium text-base md:text-lg">{count}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={count >= stock}
                className="h-8 w-8 md:h-9 md:w-9"
              >
                <Plus className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} className="w-full text-sm md:text-base" size="lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho ({count})
          </Button>

          <p className="text-xs md:text-sm text-muted-foreground text-center">{stock - count} itens restantes</p>
        </div>
      </CardContent>
    </Card>
  )
} 