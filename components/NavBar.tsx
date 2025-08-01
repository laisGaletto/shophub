"use client"

import Link from "next/link"
import { Store, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import CartWidget from "./CartWidget"

const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "jewelery", name: "Jewelry" },
  { id: "men's clothing", name: "Men's Clothing" },
  { id: "women's clothing", name: "Women's Clothing" },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="font-bold text-xl">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[250px] p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${encodeURIComponent(category.id)}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{category.name}</div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation and Cart */}
          <div className="flex items-center space-x-2">
            <CartWidget />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Categorias</h3>
                    <div className="pl-4 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${encodeURIComponent(category.id)}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 