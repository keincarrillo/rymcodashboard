import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

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
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis
          dataKey="time"
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
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${color.replace("#", "")})`}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: "var(--surface-color)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
