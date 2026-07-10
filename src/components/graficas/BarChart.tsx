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

const BAR_COLORS = ["#2563eb", "#60a5fa", "#93c5fd"]

export function BarChart({ data, unit = "" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="name"
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
          cursor={{ fill: "var(--hover-bg)" }}
        />
        <Bar dataKey="value" maxBarSize={36}>
          {data.map((_, index) => (
            <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
