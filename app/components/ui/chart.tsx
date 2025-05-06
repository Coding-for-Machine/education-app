import type React from "react"

interface ChartTooltipProps {
  children?: React.ReactNode
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <>{children}</>
}

export const ChartTooltipContent = ({ children }: { children?: React.ReactNode }) => {
  return <>{children}</>
}

export const BarChart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const LineChart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const PieChart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
