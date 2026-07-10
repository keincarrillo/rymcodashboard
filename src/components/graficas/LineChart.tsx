import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

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
  const gradientId = `line-grad-${color.replace("#", "")}`

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <filter id={`glow-${color.replace("#", "")}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis
          dataKey="time"
          stroke="var(--text-muted)"
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--text-muted)"
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--elevated-color)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            fontSize: "9px",
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          formatter={(value: number) => [`${value}${unit}`, "Valor"]}
          cursor={{ stroke: "var(--border-color)", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: "var(--surface-color)", strokeWidth: 2 }}
          filter={`url(#glow-${color.replace("#", "")})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
