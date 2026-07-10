import { XCircle, Clock } from "lucide-react"
import type { Alarma } from "../../types"

interface AlarmItemProps {
  alarma: Alarma
  onDismiss: (id: string) => void
}

const SEVERIDAD_STYLES = {
  critica: {
    accent: "var(--color-danger)",
    badge: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
    label: "CRITICA",
  },
  preventivo: {
    accent: "var(--color-warn)",
    badge: "bg-[var(--color-warn)]/15 text-[var(--color-warn)]",
    label: "PREVENTIVO",
  },
  sin_rango: {
    accent: "var(--text-muted)",
    badge: "bg-[var(--hover-bg)] text-[var(--text-muted)]",
    label: "SIN RANGO",
  },
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts)
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  })
}

export function AlarmItem({ alarma, onDismiss }: AlarmItemProps) {
  const style = SEVERIDAD_STYLES[alarma.severidad]

  return (
    <div className="bg-[var(--input-bg)] border border-[var(--border-color)] radius-card p-2 flex items-start gap-2 group">
      <div
        className="w-0.5 h-full min-h-[28px] rounded-full shrink-0"
        style={{ backgroundColor: style.accent }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[8px] font-mono px-1 py-0 font-bold ${style.badge}`}>
            {style.label}
          </span>
          <span className="text-[8px] font-mono text-[var(--text-muted)] flex items-center gap-0.5">
            <Clock size={7} />
            {formatTimestamp(alarma.timestamp)}
          </span>
        </div>

        <p className="text-[10px] font-medium truncate">{alarma.maquinaNombre}</p>
        <p className="text-[8px] font-mono text-[var(--text-muted)] truncate">
          {alarma.variableNombre}: {alarma.valor.toFixed(1)} ({alarma.min}–{alarma.max})
        </p>
      </div>

      <button
        onClick={() => onDismiss(alarma.id)}
        className="shrink-0 p-0.5 radius-button hover:bg-[var(--hover-bg)] transition-colors opacity-0 group-hover:opacity-50 hover:!opacity-100 text-[var(--text-muted)]"
        title="Descartar"
      >
        <XCircle size={10} />
      </button>
    </div>
  )
}
