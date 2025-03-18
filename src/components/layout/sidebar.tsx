"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { BarChart3, Users, MessageSquareText, Settings, LogOut, Menu, X, Video } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  user: {
    userId: string
    name: string
    email: string
    role: string
    tenantId: string
  }
}

export function Sidebar({ user }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Armazenar token no localStorage após login
  useEffect(() => {
    const storeToken = async () => {
      try {
        const response = await fetch("/api/token")
        if (response.ok) {
          const { token } = await response.json()
          localStorage.setItem("token", token)
        }
      } catch (error) {
        console.error("Erro ao obter token:", error)
      }
    }

    storeToken()
  }, [])

  const routes = [
    {
      href: "/",
      icon: BarChart3,
      title: "Dashboard",
    },
    {
      href: "/studio",
      icon: Users,
      title: "Estúdio",
    },
    {
      href: "/home-exercises",
      icon: Video,
      title: "Aulas para Casa",
    },
    {
      href: "/chat",
      icon: MessageSquareText,
      title: "Chat com IA",
    },
  ]

  async function handleSignOut() {
    try {
      const response = await fetch("/api/sign-out", {
        method: "POST",
      })

      if (response.ok) {
        localStorage.removeItem("token")
        router.push("/sign-in")
        router.refresh()
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Trigger */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-background border-b md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-bold">PF</span>
          </div>
          <span className="font-semibold">PilatesFlow</span>
        </div>

        <ModeToggle />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">PF</span>
                </div>
                <span className="font-semibold">PilatesFlow</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <nav className="px-2 space-y-1">
                {routes.map((route) => (
                  <Link key={route.href} href={route.href}>
                    <Button
                      variant={isActive(route.href) ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.title}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push("/settings")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-background">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center h-16 px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-bold">PF</span>
              </div>
              <span className="font-semibold">PilatesFlow</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto py-4">
            <nav className="flex-1 px-4 space-y-2">
              {routes.map((route) => (
                <Link key={route.href} href={route.href}>
                  <Button variant={isActive(route.href) ? "secondary" : "ghost"} className="w-full justify-start">
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
              </div>
              <ModeToggle />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Opções
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Offset para o conteúdo principal no desktop */}
      <div className="md:pl-64 pt-14 md:pt-0" />
    </>
  )
}
