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
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] flex flex-col items-center overflow-hidden">
      <div className="w-full px-2.5 py-2 border-b border-[var(--border-color)]">
        <h3 className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] text-center truncate">
          {nombre || variableKey}
        </h3>
      </div>

      <div className="p-2">
        <DialGauge
          valor={actual}
          min={dbp_valmin}
          max={dbp_valmax}
          nom={dbp_valnom}
          estado={estado}
          size={90}
        />
      </div>

      <div className="w-full px-2.5 pb-1.5 flex justify-between text-[8px] font-mono text-[var(--text-muted)]">
        <span>{dbp_valmin}</span>
        <span className="text-[var(--text-color)] font-bold">{dbp_valnom}</span>
        <span>{dbp_valmax}</span>
      </div>

      <a
        href={grafanaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center py-1.5 border-t border-[var(--border-color)] text-[8px] font-mono text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-colors"
      >
        <ExternalLink size={8} className="inline mr-0.5" />
        Grafana
      </a>
    </div>
  )
}
