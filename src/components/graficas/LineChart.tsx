import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DataPoint {
  time: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  color?: string
  unit?: string
}

export function LineChart({ data, color = "#10b981", unit = "" }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis
          dataKey="time"
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 3, fill: color }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
