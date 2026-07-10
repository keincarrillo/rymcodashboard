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

const START_ANGLE = -225
const END_ANGLE = 45
const ARC_SWEEP = END_ANGLE - START_ANGLE

export function DialGauge({ valor, min, max, estado, size = 90 }: DialGaugeProps) {
  const colorKey = getColor(valor, min, max, estado)
  const color = COLORS[colorKey]

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 6

  const arcCircumference = useMemo(() => {
    const sweepRad = (ARC_SWEEP * Math.PI) / 180
    return r * sweepRad
  }, [r])

  const ratio = useMemo(() => {
    if (isNaN(valor) || max <= min) return 0
    return Math.max(0, Math.min(1, (valor - min) / (max - min)))
  }, [valor, min, max])

  const dashOffset = arcCircumference * (1 - ratio)
  const needleAngle = START_ANGLE + ratio * ARC_SWEEP

  const tickMarks = useMemo(() => {
    const ticks = []
    const numTicks = 10
    for (let i = 0; i <= numTicks; i++) {
      const angle = START_ANGLE + (i / numTicks) * ARC_SWEEP
      const rad = (angle * Math.PI) / 180
      const innerR = r - 3
      const outerR = r + 1
      ticks.push({
        x1: cx + innerR * Math.cos(rad),
        y1: cy + innerR * Math.sin(rad),
        x2: cx + outerR * Math.cos(rad),
        y2: cy + outerR * Math.sin(rad),
      })
    }
    return ticks
  }, [cx, cy, r])

  const displayValue = isNaN(valor) ? "---" : valor.toFixed(1)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="track-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--border)" />
          <stop offset="100%" stopColor="var(--border)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <path
        d={`M ${cx + r * Math.cos((START_ANGLE * Math.PI) / 180)} ${cy + r * Math.sin((START_ANGLE * Math.PI) / 180)}
          A ${r} ${r} 0 1 1 ${cx + r * Math.cos((END_ANGLE * Math.PI) / 180)} ${cy + r * Math.sin((END_ANGLE * Math.PI) / 180)}`}
        fill="none"
        stroke="url(#track-bg)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d={`M ${cx + r * Math.cos((START_ANGLE * Math.PI) / 180)} ${cy + r * Math.sin((START_ANGLE * Math.PI) / 180)}
          A ${r} ${r} 0 1 1 ${cx + r * Math.cos((END_ANGLE * Math.PI) / 180)} ${cy + r * Math.sin((END_ANGLE * Math.PI) / 180)}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={arcCircumference}
        strokeDashoffset={dashOffset}
        style={{
          transition: "stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1), stroke 300ms ease",
        }}
      />

      {tickMarks.map((tick, i) => (
        <line
          key={i}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="var(--border)"
          strokeWidth="1"
          opacity={0.35}
        />
      ))}

      <g
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${needleAngle}deg)`,
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - (r - 10)}
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      <circle
        cx={cx}
        cy={cy}
        r={2.8}
        fill={color}
        style={{ transition: "fill 300ms ease" }}
      />

      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill="var(--text)"
        fontSize="11"
        className="dial-value"
      >
        {displayValue}
      </text>
    </svg>
  )
}
