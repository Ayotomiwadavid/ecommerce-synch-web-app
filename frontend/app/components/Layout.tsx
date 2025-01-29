"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, ShoppingBag, TrendingUp, Settings, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: ShoppingBag, label: "Products", href: "/products" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition duration-300 ease-in-out transform md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-semibold">E-Commerce Hub</span>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md md:hidden hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-100" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-md md:hidden hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">E-Commerce Integration Platform</h1>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{user.name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">{children}</main>
      </div>
    </div>
  )
}

export default Layout

