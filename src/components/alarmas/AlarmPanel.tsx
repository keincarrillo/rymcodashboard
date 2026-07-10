import { X } from "lucide-react"
import type { Alarma } from "../../types"

interface AlarmPanelProps {
  alarmas: Alarma[]
  onDismiss: (id: string) => void
}

const SEVERITY_CLASS: Record<string, string> = {
  baja: "status status--warn",
  media: "status status--warn",
  alta: "status status--fault",
  crítica: "status status--fault",
  critica: "status status--fault",
  preventivo: "status status--warn",
  sin_rango: "status status--fault",
}

export function AlarmPanel({ alarmas, onDismiss }: AlarmPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="section-label flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--fault)]" />
        Alarmas activas
        <span className="text-[var(--fault)] font-extrabold">{alarmas.length}</span>
      </h2>
      <div className="space-y-2">
        {alarmas.map((alarma) => (
          <div
            key={alarma.id}
            className="card p-3 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={SEVERITY_CLASS[alarma.severidad] || "status status--fault"} />
              <span className="text-[10px] font-mono font-bold text-[var(--fault)] uppercase flex-1">
                {alarma.severidad}
              </span>
              <button
                onClick={() => onDismiss(alarma.id)}
                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-[11px] font-semibold text-[var(--text)] leading-snug">
              {alarma.variableNombre}: {alarma.valor} (min: {alarma.min}, max: {alarma.max})
            </p>
            <p className="text-[9px] font-mono font-bold text-[var(--muted)]">
              {new Date(alarma.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
