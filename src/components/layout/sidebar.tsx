"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { ModeToggle } from "@/components/ui/mode-toggle"
import { BarChart3, Users, Settings, LogOut, MenuIcon, X, ChevronDown, MessageSquareText } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SidebarProps {
  user: {
    userId: string
    name: string
    email: string
    role: string
  }
}

export function Sidebar({ user }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const pathname = usePathname()
  const router = useRouter()

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
      subItems: [
        { href: "/studio/clients", title: "Clientes" },
        { href: "/studio/schedule", title: "Agenda" },
        { href: "/studio/payments", title: "Pagamentos" },
      ],
    },
    {
      href: "/ai-assistant",
      icon: MessageSquareText,
      title: "Assistente IA",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Configurações",
    },
  ]

  async function handleSignOut() {
    try {
      const response = await fetch("/api/sign-out", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/sign-in")
        router.refresh()
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const toggleSubmenu = (href: string) => {
    setOpenMenus(prev => 
      prev.includes(href) 
        ? prev.filter(menu => menu !== href)
        : [...prev, href]
    )
  }

  const isSubmenuOpen = (href: string) => openMenus.includes(href)

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Menu</span>
      </Button>

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

            <div className="flex-1 overflow-auto py-2">
              <nav className="px-2 space-y-1">
                {routes.map((route) => (
                  <div key={route.href} className="space-y-1">
                    {route.subItems ? (
                      <>
                        <Button
                          variant={pathname.startsWith(route.href) ? "secondary" : "ghost"}
                          className="w-full justify-between"
                          onClick={() => toggleSubmenu(route.href)}
                        >
                          <div className="flex items-center">
                            <route.icon className="mr-2 h-4 w-4" />
                            {route.title}
                          </div>
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isSubmenuOpen(route.href) && "transform rotate-180"
                            )}
                          />
                        </Button>
                        {isSubmenuOpen(route.href) && (
                          <div className="ml-6 space-y-0.5">
                            {route.subItems.map((subItem) => (
                              <Button
                                key={subItem.href}
                                variant={pathname === subItem.href ? "secondary" : "ghost"}
                                className="w-full justify-start h-9 px-2 text-sm font-normal text-muted-foreground hover:text-foreground"
                                size="sm"
                                onClick={() => {
                                  router.push(subItem.href)
                                  setIsMobileMenuOpen(false)
                                }}
                              >
                                {subItem.title}
                              </Button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Button
                        variant={pathname === route.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          router.push(route.href)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <route.icon className="mr-2 h-4 w-4" />
                        {route.title}
                      </Button>
                    )}
                  </div>
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
                {/* <ModeToggle /> */}
              </div>
              <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-background">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-bold">PF</span>
              </div>
              <span className="font-semibold">PilatesFlow</span>
            </div>
            {/* <ModeToggle /> */}
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-1">
              {routes.map((route) => (
                <div key={route.href} className="space-y-1">
                  {route.subItems ? (
                    <>
                      <Button
                        variant={pathname.startsWith(route.href) ? "secondary" : "ghost"}
                        className="w-full justify-between"
                        onClick={() => toggleSubmenu(route.href)}
                      >
                        <div className="flex items-center">
                          <route.icon className="mr-2 h-4 w-4" />
                          {route.title}
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isSubmenuOpen(route.href) && "transform rotate-180",
                          )}
                        />
                      </Button>
                      {isSubmenuOpen(route.href) && (
                        <div className="ml-6 space-y-0.5">
                          {route.subItems.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <Button
                                variant={pathname === subItem.href ? "secondary" : "ghost"}
                                className="w-full justify-start h-9 px-2 text-sm font-normal text-muted-foreground hover:text-foreground"
                                size="sm"
                              >
                                {subItem.title}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={route.href}>
                      <Button
                        variant={pathname === route.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        <route.icon className="mr-2 h-4 w-4" />
                        {route.title}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-left">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </div>
                  </div>
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
      <div className="hidden md:block md:pl-64" />
    </>
  )
}
