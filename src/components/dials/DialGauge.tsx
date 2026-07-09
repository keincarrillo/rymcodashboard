import { useMemo } from "react"
import { getColor } from "../../utils/getColor"
import { COLORS } from "../../styles/colors"

interface DialGaugeProps {
  valor: number
  min: number
  max: number
  nom: number
  estado: string
  size?: number
}

export function DialGauge({ valor, min, max, estado, size = 120 }: DialGaugeProps) {
  const colorKey = getColor(valor, min, max, estado)
  const color = COLORS[colorKey]

  const { arcPath, needleAngle, displayValue } = useMemo(() => {
    const startAngle = -225
    const endAngle = 45
    const totalAngle = endAngle - startAngle

    const r = size / 2 - 10
    const cx = size / 2
    const cy = size / 2

    const valorClamped = Math.max(min, Math.min(max, valor))
    const ratio = max > min ? (valorClamped - min) / (max - min) : 0
    const currentAngle = startAngle + ratio * totalAngle

    const toRad = (deg: number) => (deg * Math.PI) / 180

    const arcStart = toRad(startAngle)
    const arcEnd = toRad(currentAngle)

    const x1 = cx + r * Math.cos(arcStart)
    const y1 = cy + r * Math.sin(arcStart)
    const x2 = cx + r * Math.cos(arcEnd)
    const y2 = cy + r * Math.sin(arcEnd)

    const largeArc = currentAngle - startAngle > 180 ? 1 : 0

    const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`

    const needleAngle = currentAngle

    const displayValue = isNaN(valor) ? "---" : valor.toFixed(1)

    return { arcPath, needleAngle, displayValue }
  }, [valor, min, max, size])

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 10

  const tickMarks = useMemo(() => {
    const ticks = []
    const startAngle = -225
    const endAngle = 45
    const totalAngle = endAngle - startAngle
    const numTicks = 10

    for (let i = 0; i <= numTicks; i++) {
      const angle = startAngle + (i / numTicks) * totalAngle
      const rad = (angle * Math.PI) / 180
      const innerR = r - 5
      const outerR = r + 2

      ticks.push({
        x1: cx + innerR * Math.cos(rad),
        y1: cy + innerR * Math.sin(rad),
        x2: cx + outerR * Math.cos(rad),
        y2: cy + outerR * Math.sin(rad),
      })
    }
    return ticks
  }, [r, cx, cy])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#374151"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path
        d={arcPath}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {tickMarks.map((tick, i) => (
        <line
          key={i}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="#6b7280"
          strokeWidth="2"
        />
      ))}

      <line
        x1={cx}
        y1={cy}
        x2={cx + (r - 15) * Math.cos((needleAngle * Math.PI) / 180)}
        y2={cy + (r - 15) * Math.sin((needleAngle * Math.PI) / 180)}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx={cx} cy={cy} r="5" fill={color} />

      <text
        x={cx}
        y={cy + 25}
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="bold"
      >
        {displayValue}
      </text>
    </svg>
  )
}