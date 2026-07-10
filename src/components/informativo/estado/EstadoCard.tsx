import { Estado } from "./Estado"
import { PiezasTurno } from "./PiezasTurno"
import type { EstadoYRun } from "../../../types"

interface EstadoCardProps {
  estadoYRun: EstadoYRun
}

export function EstadoCard({ estadoYRun }: EstadoCardProps) {
  const { estado, turno, piezas } = estadoYRun

  return (
    <div className="panel overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border-color)] flex items-center gap-2">
        <span className="w-1 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
        <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Estado</h3>
      </div>
      <div className="p-5 space-y-4">
        <Estado estado={estado} />
        <PiezasTurno turno={turno} piezas={piezas} />
      </div>
    </div>
  )
}
