import { ExternalLink } from "lucide-react"
import { DialGauge } from "./DialGauge"
import type { Valores } from "../../types"

interface DialCardProps {
  variableKey: string
  variable: Valores
  estado: string
}

const GRAFANA_BASE = "http://monitormx.rymco.io:9030/public-dashboards"

export function DialCard({ variableKey, variable, estado }: DialCardProps) {
  const { nombre, actual, maxMinNom } = variable
  const { dbp_valmin, dbp_valnom, dbp_valmax } = maxMinNom

  const grafanaUrl = `${GRAFANA_BASE}/${variableKey}`

  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4 flex flex-col items-center">
      <h3 className="text-sm font-medium mb-2 text-center opacity-80">
        {nombre || variableKey}
      </h3>

      <DialGauge
        valor={actual}
        min={dbp_valmin}
        max={dbp_valmax}
        nom={dbp_valnom}
        estado={estado}
      />

      <div className="mt-2 text-xs opacity-60 flex justify-between w-full px-2">
        <span>Min: {dbp_valmin}</span>
        <span>Nom: {dbp_valnom}</span>
        <span>Max: {dbp_valmax}</span>
      </div>

      <a
        href={grafanaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
      >
        <ExternalLink size={12} />
        Grafana
      </a>
    </div>
  )
}