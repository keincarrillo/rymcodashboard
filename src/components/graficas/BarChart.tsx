import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DataPoint {
  name: string
  value: number
}

interface BarChartProps {
  data: DataPoint[]
  color?: string
  unit?: string
}

export function BarChart({ data, color = "#10b981", unit = "" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis
          dataKey="name"
          stroke="var(--text-muted)"
          fontSize={8}
          fontFamily="JetBrains Mono, monospace"
          tickLine={false}
        />
        <YAxis stroke="var(--text-muted)" fontSize={8} fontFamily="JetBrains Mono, monospace" tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--elevated-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "4px",
            fontSize: "9px",
            fontFamily: "JetBrains Mono, monospace",
          }}
          formatter={(value) => [`${value}${unit}`, "Valor"]}
        />
        <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
