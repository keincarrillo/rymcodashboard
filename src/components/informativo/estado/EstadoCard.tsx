import { Estado } from "./Estado"
import { PiezasTurno } from "./PiezasTurno"
import type { EstadoYRun } from "../../../types"

interface EstadoCardProps {
  estadoYRun: EstadoYRun
}

export function EstadoCard({ estadoYRun }: EstadoCardProps) {
  const { estado, turno, piezas } = estadoYRun

  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <h3 className="text-sm font-medium mb-3 opacity-70">Estado</h3>
      <div className="space-y-3">
        <Estado estado={estado} />
        <PiezasTurno turno={turno} piezas={piezas} />
      </div>
    </div>
  )
}