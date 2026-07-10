import { Estado } from "./Estado"
import { PiezasTurno } from "./PiezasTurno"
import type { EstadoYRun } from "../../../types"

interface EstadoCardProps {
  estadoYRun: EstadoYRun
}

export function EstadoCard({ estadoYRun }: EstadoCardProps) {
  const { estado, turno, piezas } = estadoYRun

  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] overflow-hidden">
      <div className="px-3 py-2 border-b border-[var(--border-color)]">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Estado</h3>
      </div>
      <div className="p-3 space-y-2">
        <Estado estado={estado} />
        <PiezasTurno turno={turno} piezas={piezas} />
      </div>
    </div>
  )
}
