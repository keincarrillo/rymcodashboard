import { Weight } from "lucide-react"

interface TonejaleCardProps {
  tonelaje: number
}

export function TonejaleCard({ tonelaje }: TonejaleCardProps) {
  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] overflow-hidden">
      <div className="px-3 py-2 border-b border-[var(--border-color)]">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Produccion</h3>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-3">
          <Weight size={20} className="text-[var(--accent)]" />
          <div>
            <p className="text-2xl font-bold font-mono">{tonelaje.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-[var(--text-muted)]">Toneladas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
