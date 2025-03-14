"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Fev",
    total: 1800,
  },
  {
    name: "Mar",
    total: 2200,
  },
  {
    name: "Abr",
    total: 2600,
  },
  {
    name: "Mai",
    total: 2400,
  },
  {
    name: "Jun",
    total: 2800,
  },
  {
    name: "Jul",
    total: 3200,
  },
  {
    name: "Ago",
    total: 3600,
  },
  {
    name: "Set",
    total: 3800,
  },
  {
    name: "Out",
    total: 4000,
  },
  {
    name: "Nov",
    total: 4500,
  },
  {
    name: "Dez",
    total: 4200,
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
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

