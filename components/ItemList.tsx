"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Item from "./Item"

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

interface ItemListProps {
  products: Product[]
}

export default function ItemList({ products }: ItemListProps) {
  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
      {products.map((product) => (
        <Item key={product.id} product={product} formatCategoryName={formatCategoryName} />
      ))}
    </div>
  )
} 