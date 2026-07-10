import { Users } from "lucide-react"

interface PiezasTurnoProps {
  turno: string
  piezas: number
}

export function PiezasTurno({ turno, piezas }: PiezasTurnoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Users size={11} className="text-[var(--muted)]" />
        <span className="text-[10px] font-mono text-[var(--muted)] font-bold uppercase tracking-[0.06em]">Turno {turno}</span>
      </div>
      <span className="w-px h-3 bg-[var(--border)]" />
      <span className="data-value text-sm">{piezas.toLocaleString()}</span>
      <span className="text-[9px] font-mono text-[var(--muted)] font-bold">pcs</span>
    </div>
  )
}
