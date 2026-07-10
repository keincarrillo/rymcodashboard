import { Weight } from "lucide-react"

interface TonejaleCardProps {
  tonelaje: number
}

export function TonejaleCard({ tonelaje }: TonejaleCardProps) {
  return (
    <div className="panel accent-top p-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[var(--accent-dim)] border-2 border-[var(--accent)] flex items-center justify-center shrink-0">
          <Weight size={18} className="text-[var(--accent-bright)]" />
        </div>
        <div>
          <p className="data-accent text-4xl tracking-tight">{tonelaje.toLocaleString()}</p>
          <p className="text-[9px] font-mono text-[var(--muted)] tracking-[0.08em] uppercase mt-0.5 font-bold">Toneladas</p>
        </div>
      </div>
    </div>
  )
}
