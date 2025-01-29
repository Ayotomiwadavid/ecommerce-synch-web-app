"use client"

import React, { useState } from "react"
import Layout from "../components/Layout"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddProductModal } from "../components/AddProductModal"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
}

const initialProducts: Product[] = [
  { id: "1", name: "Eco-friendly Water Bottle", sku: "WB001", price: 19.99, stock: 150, category: "Home & Kitchen" },
  { id: "2", name: "Wireless Earbuds", sku: "WE002", price: 79.99, stock: 200, category: "Electronics" },
  { id: "3", name: "Yoga Mat", sku: "YM003", price: 29.99, stock: 100, category: "Sports & Outdoors" },
  { id: "4", name: "Stainless Steel Cookware Set", sku: "CS004", price: 149.99, stock: 50, category: "Home & Kitchen" },
  { id: "5", name: "Smart Watch", sku: "SW005", price: 199.99, stock: 75, category: "Electronics" },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const productWithId = {
      ...newProduct,
      id: (products.length + 1).toString(),
    }
    setProducts([...products, productWithId])
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => setIsAddProductModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="mb-4 flex items-center">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mr-2"
          />
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </Layout>
  )
}

