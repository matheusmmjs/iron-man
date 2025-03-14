"use client"

import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CalendarDays, Receipt } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      value: "clients",
      label: "Clientes",
      icon: Users,
      href: "/studio/clients"
    },
    {
      value: "schedule",
      label: "Agenda",
      icon: CalendarDays,
      href: "/studio/schedule"
    },
    {
      value: "payments",
      label: "Pagamentos",
      icon: Receipt,
      href: "/studio/payments"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <Tabs value={pathname.split("/")[2]} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-9">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              onClick={() => router.push(tab.href)}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
