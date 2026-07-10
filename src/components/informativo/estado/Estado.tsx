import { Play, Square } from "lucide-react"

interface EstadoProps {
  estado: string
}

export function Estado({ estado }: EstadoProps) {
  const isRunning = estado === "Corriendo"

  return (
    <div className={`flex items-center gap-2.5 ${isRunning ? "text-[var(--color-running)]" : "text-[var(--text-color)]"}`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isRunning ? "bg-[var(--color-running)]/15 border border-[var(--color-running)]/20" : "bg-[var(--input-bg)] border border-[var(--border-color)]"}`}>
        {isRunning ? (
          <Play size={13} className="fill-[var(--color-running)] text-[var(--color-running)]" />
        ) : (
          <Square size={13} className="text-[var(--text-muted)]" />
        )}
      </div>
      <div>
        <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] font-medium">Estado</p>
        <p className={`text-sm font-bold ${isRunning ? "text-[var(--color-running)]" : "text-[var(--text-color)]"}`}>{estado}</p>
      </div>
    </div>
  )
}
