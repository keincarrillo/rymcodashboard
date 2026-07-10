import { XCircle, Clock } from "lucide-react"
import type { Alarma } from "../../types"

interface AlarmItemProps {
  alarma: Alarma
  onDismiss: (id: string) => void
}

const SEVERIDAD_STYLES = {
  critica: { color: "#ef4444", label: "CRITICA" },
  preventivo: { color: "#f59e0b", label: "PREVENTIVO" },
  sin_rango: { color: "#6d6896", label: "SIN RANGO" },
}

function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleTimeString("es-MX", {
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
    <div className="bg-[var(--input-bg)] border-2 border-[var(--border)] p-3 flex items-start gap-3 group">
      <div className="w-1 self-stretch shrink-0" style={{ background: style.color }} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 font-extrabold text-white"
            style={{ background: style.color }}
          >
            {style.label}
          </span>
          <span className="text-[8px] font-mono text-[var(--muted)] flex items-center gap-1 font-bold">
            <Clock size={8} />
            {formatTimestamp(alarma.timestamp)}
          </span>
        </div>
        <p className="text-[10px] font-extrabold truncate">{alarma.maquinaNombre}</p>
        <p className="text-[8px] font-mono text-[var(--muted)] truncate font-bold">
          {alarma.variableNombre}: {alarma.valor.toFixed(1)} ({alarma.min}–{alarma.max})
        </p>
      </div>

      <button
        onClick={() => onDismiss(alarma.id)}
        className="btn shrink-0"
        title="Descartar"
      >
        <XCircle size={11} />
      </button>
    </div>
  )
}
