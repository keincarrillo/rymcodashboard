import { Users } from "lucide-react"

interface PiezasTurnoProps {
  turno: string
  piezas: number
}

export function PiezasTurno({ turno, piezas }: PiezasTurnoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-blue-400">
        <Users size={18} />
        <span className="text-sm">Turno {turno}</span>
      </div>
      <div className="text-sm opacity-80">
        <span className="font-semibold">{piezas.toLocaleString()}</span> piezas
      </div>
    </div>
  )
}