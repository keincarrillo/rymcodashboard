import { Play, Square } from "lucide-react"

interface EstadoProps {
  estado: string
}

export function Estado({ estado }: EstadoProps) {
  const isRunning = estado === "Corriendo"

  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 border-2 flex items-center justify-center ${isRunning ? "border-[var(--accent)] bg-[var(--accent-dim)]" : "border-[var(--border)] bg-[var(--input-bg)]"}`}>
        {isRunning ? (
          <Play size={14} className="fill-[var(--accent-bright)] text-[var(--accent-bright)]" />
        ) : (
          <Square size={14} className="text-[var(--muted)]" />
        )}
      </div>
      <div>
        <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-[var(--muted)] font-bold">Estado</p>
        <p className={`text-sm font-extrabold ${isRunning ? "text-[var(--accent-bright)]" : "text-[var(--text)]"}`}>{estado}</p>
      </div>
    </div>
  )
}
