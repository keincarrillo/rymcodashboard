import { Estado } from "./Estado"
import { PiezasTurno } from "./PiezasTurno"
import type { EstadoYRun } from "../../../types"

interface EstadoCardProps {
  estadoYRun: EstadoYRun
}

export function EstadoCard({ estadoYRun }: EstadoCardProps) {
  const { estado, turno, piezas } = estadoYRun

  return (
    <div className="panel accent-top p-5 space-y-4">
      <Estado estado={estado} />
      <PiezasTurno turno={turno} piezas={piezas} />
    </div>
  )
}
