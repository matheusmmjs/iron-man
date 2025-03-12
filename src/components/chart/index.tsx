"use client";

import { DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./../ui/card";
import { ChartContainer, type ChartConfig } from "./../ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

export function ChartOverview() {
  const chartData = [
    { month: "Janeiro", desktop: 186, mobile: 80 },
    { month: "Fevereiro", desktop: 305, mobile: 200 },
    { month: "Março", desktop: 237, mobile: 120 },
    { month: "Abril", desktop: 73, mobile: 190 },
    { month: "Maio", desktop: 209, mobile: 130 },
    { month: "Junho", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full md:w-1/2 md:max-w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Overview mensal de pagamentos recebidos
          </CardTitle>
          <DollarSign className="ml-auto w-4 h-4" />
        </div>
      </CardHeader>

      <CardContent>

        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}             
            />
            <Bar dataKey="desktop" fill={chartConfig.desktop.color} />
            <Bar dataKey="mobile" fill={chartConfig.mobile.color} />
          </BarChart>
        </ChartContainer>

      </CardContent>
    </Card>
  );
}