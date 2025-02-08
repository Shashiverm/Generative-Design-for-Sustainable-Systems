"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Jan",
    energyUsage: 400,
    sustainabilityScore: 7.5,
  },
  {
    month: "Feb",
    energyUsage: 380,
    sustainabilityScore: 7.8,
  },
  {
    month: "Mar",
    energyUsage: 350,
    sustainabilityScore: 8.2,
  },
  {
    month: "Apr",
    energyUsage: 320,
    sustainabilityScore: 8.5,
  },
  {
    month: "May",
    energyUsage: 300,
    sustainabilityScore: 8.7,
  },
  {
    month: "Jun",
    energyUsage: 290,
    sustainabilityScore: 8.9,
  },
]

export default function ProjectChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="energyUsage" stroke="#adfa1d" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="sustainabilityScore" stroke="#0ea5e9" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

