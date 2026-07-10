import type { Variable } from "../../schemas/maquinaSchema"
import { DialGauge } from "./DialGauge"
import { getUnidad } from "./getUnidad"

interface DialCardProps {
  variableKey: string
  variable: Variable
  estado: string
}

const NOM_PARAM_KEY = "paramNominal"

function findNomVal(variable: Variable, parentKey: string): number | undefined {
  if (variable.nom) return variable.nom
  return undefined
}

export function DialCard({ variableKey, variable, estado }: DialCardProps) {
  const valor = variable.valor
  const min = variable.min ?? 0
  const max = variable.max ?? 100
  const nom = findNomVal(variable, variableKey) ?? max
  const unidad = getUnidad(variable.nombre)

  const displayVal = isNaN(valor) ? "---" : valor.toFixed(1)

  return (
    <div className="card card-glow radius-panel p-4 flex flex-col items-center gap-3">
      <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] text-center leading-tight font-medium">
        {variable.nombre}
      </span>
      <DialGauge
        valor={valor}
        min={min}
        max={max}
        nom={nom}
        estado={estado}
        size={90}
      />
      <div className="flex items-baseline gap-1">
        <span className="data-value text-base">{displayVal}</span>
        {unidad && (
          <span className="text-[9px] font-mono text-[var(--text-muted)] font-medium">{unidad}</span>
        )}
      </div>
    </div>
  )
}
