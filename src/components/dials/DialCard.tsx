import type { Valores } from "../../types"
import { DialGauge } from "./DialGauge"

interface DialCardProps {
  variableKey: string
  variable: Valores
  estado: string
}

export function DialCard({ variableKey, variable, estado }: DialCardProps) {
  const valor = variable.actual
  const min = variable.maxMinNom.dbp_valmin
  const max = variable.maxMinNom.dbp_valmax
  const nom = variable.maxMinNom.dbp_valnom
  const displayVal = isNaN(valor) ? "---" : valor.toFixed(1)

  return (
    <div className="card p-4 flex flex-col items-center gap-3">
      <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-[var(--muted)] text-center font-bold">
        {variable.nombre || variableKey}
      </span>
      <DialGauge valor={valor} min={min} max={max} nom={nom} estado={estado} size={90} />
      <span className="data-value text-lg">{displayVal}</span>
    </div>
  )
}
