import { Users } from "lucide-react"

interface PiezasTurnoProps {
  turno: string
  piezas: number
}

export function PiezasTurno({ turno, piezas }: PiezasTurnoProps) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-mono">
      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
        <Users size={12} />
        <span>Turno {turno}</span>
      </div>
      <div className="text-[var(--text-color)]">
        <span className="font-bold">{piezas.toLocaleString()}</span> <span className="text-[var(--text-muted)]">pcs</span>
      </div>
    </div>
  )
}
