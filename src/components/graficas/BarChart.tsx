import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface DataPoint {
  name: string
  value: number
}

interface BarChartProps {
  data: DataPoint[]
  color?: string
  unit?: string
}

const BAR_COLORS = ["#10b981", "#06b6d4", "#f59e0b"]

export function BarChart({ data, color = "#10b981", unit = "" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <defs>
          <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis
          dataKey="name"
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
          cursor={{ fill: "var(--hover-bg)" }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={36}>
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={BAR_COLORS[index % BAR_COLORS.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
