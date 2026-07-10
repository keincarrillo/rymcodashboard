import { Users } from "lucide-react"

interface PiezasTurnoProps {
  turno: string
  piezas: number
}

export function PiezasTurno({ turno, piezas }: PiezasTurnoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Users size={11} className="text-[var(--text-muted)]" />
        <span className="text-[10px] font-mono text-[var(--text-muted)] font-medium uppercase tracking-[0.08em]">Turno {turno}</span>
      </div>
      <span className="w-px h-3 bg-[var(--border-color)]" />
      <div className="text-[10px] font-mono">
        <span className="data-value text-sm">{piezas.toLocaleString()}</span>
        <span className="text-[var(--text-muted)] ml-1 font-medium">pcs</span>
      </div>
    </div>
  )
}
