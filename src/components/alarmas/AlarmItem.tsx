import { AlertTriangle, XCircle, Clock } from "lucide-react"
import type { Alarma } from "../../types"

interface AlarmItemProps {
  alarma: Alarma
  onDismiss: (id: string) => void
}

const SEVERIDAD_STYLES = {
  critica: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: <AlertTriangle size={16} className="text-red-500" />,
    badge: "bg-red-500/20 text-red-400",
    label: "Crítica",
  },
  preventivo: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    icon: <AlertTriangle size={16} className="text-orange-500" />,
    badge: "bg-orange-500/20 text-orange-400",
    label: "Preventivo",
  },
  sin_rango: {
    bg: "bg-gray-500/10",
    border: "border-gray-500/30",
    icon: <AlertTriangle size={16} className="text-gray-500" />,
    badge: "bg-gray-500/20 text-gray-400",
    label: "Sin rango",
  },
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts)
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  })
}

export function AlarmItem({ alarma, onDismiss }: AlarmItemProps) {
  const style = SEVERIDAD_STYLES[alarma.severidad]

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-3 flex items-start gap-3`}
    >
      <div className="mt-0.5 shrink-0">{style.icon}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge}`}>
            {style.label}
          </span>
          <span className="text-xs opacity-50 flex items-center gap-1">
            <Clock size={10} />
            {formatTimestamp(alarma.timestamp)}
          </span>
        </div>

        <p className="text-sm font-medium truncate">{alarma.maquinaNombre}</p>
        <p className="text-xs opacity-70 truncate">
          {alarma.variableNombre}: {alarma.valor.toFixed(1)} (
          {alarma.min}–{alarma.max})
        </p>
      </div>

      <button
        onClick={() => onDismiss(alarma.id)}
        className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors opacity-50 hover:opacity-100"
        title="Descartar"
      >
        <XCircle size={14} />
      </button>
    </div>
  )
}
