import {
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

export function LineChart({ data, color = "#7c3aed", unit = "" }: LineChartProps) {
  const gradientId = `line-grad-${color.replace("#", "")}`

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="time"
          stroke="var(--muted)"
          fontSize={9}
          fontFamily="'SF Mono', ui-monospace, monospace"
          fontWeight="700"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--muted)"
          fontSize={9}
          fontFamily="'SF Mono', ui-monospace, monospace"
          fontWeight="700"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--elevated)",
            border: "2px solid var(--border)",
            borderRadius: "6px",
            fontSize: "9px",
            fontFamily: "'SF Mono', ui-monospace, monospace",
            fontWeight: "700",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
          formatter={(value) => [`${value}${unit}`, "Valor"]}
          cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: "var(--surface)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
