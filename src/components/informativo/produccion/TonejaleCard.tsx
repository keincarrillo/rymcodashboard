import { Weight } from "lucide-react"

interface TonejaleCardProps {
  tonelaje: number
}

export function TonejaleCard({ tonelaje }: TonejaleCardProps) {
  const display = tonelaje.toLocaleString()

  return (
    <div className="panel overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border-color)] flex items-center gap-2">
        <span className="w-1 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
        <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Produccion</h3>
      </div>
      <div className="p-5 flex items-center gap-5">
        <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent)]/20 shrink-0">
          <Weight size={20} className="text-[var(--accent)]" />
        </div>
        <div>
          <p className="data-value-accent text-3xl tracking-tight">{display}</p>
          <p className="text-[9px] font-mono text-[var(--text-muted)] tracking-[0.08em] uppercase font-medium">Toneladas</p>
        </div>
      </div>
    </div>
  )
}
