"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ItemProps {
  product: Product
  formatCategoryName: (category: string) => string
}

export default function Item({ product, formatCategoryName }: ItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-white">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-full object-contain p-4 hover:scale-105 transition-transform duration-200"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {formatCategoryName(product.category)}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>★</span>
            <span>{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
        </div>
        <CardTitle className="text-sm md:text-base line-clamp-2 mb-2 flex-1">{product.title}</CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <p className="text-lg md:text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0">
        <Button asChild className="w-full text-sm md:text-base">
          <Link href={`/product/${product.id}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 