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
    <ResponsiveContainer width="100%" height={180}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="var(--text-muted)"
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="var(--text-muted)" fontSize={9} fontFamily="JetBrains Mono, monospace" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--elevated-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            fontSize: "9px",
            fontFamily: "JetBrains Mono, monospace",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          formatter={(value) => [`${value}${unit}`, "Valor"]}
        />
        <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} maxBarSize={32} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
