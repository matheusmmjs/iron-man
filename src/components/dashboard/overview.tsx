"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12400,
  },
  {
    name: "Fev",
    total: 14250,
  },
  {
    name: "Mar",
    total: 15240,
  },
  {
    name: "Abr",
    total: 14800,
  },
  {
    name: "Mai",
    total: 16200,
  },
  {
    name: "Jun",
    total: 15600,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip formatter={(value) => [`R$ ${value}`, "Receita"]} labelFormatter={(label) => `Mês: ${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
