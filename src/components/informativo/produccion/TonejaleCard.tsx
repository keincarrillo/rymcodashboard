import { Weight } from "lucide-react"

interface TonejaleCardProps {
  tonelaje: number
}

export function TonejaleCard({ tonelaje }: TonejaleCardProps) {
  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] overflow-hidden">
      <div className="px-3 py-2 border-b border-[var(--border-color)]">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Produccion</h3>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--accent-dim)]">
            <Weight size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono tracking-tight">{tonelaje.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-[var(--text-muted)]">Toneladas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
