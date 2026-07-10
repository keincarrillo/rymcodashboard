import { Link } from "react-router-dom"
import type { MaquinaData } from "../../types"

interface MachinePanelProps {
  maquina: MaquinaData
}

function StatusBadge({ estado }: { estado: string }) {
  if (estado === "Produciendo") {
    return (
      <div className="flex items-center gap-2">
        <span className="status status--running" />
        <span className="text-[10px] font-extrabold text-[var(--accent-bright)]">Running</span>
      </div>
    )
  }
  if (estado === "Detenido") {
    return (
      <div className="flex items-center gap-2">
        <span className="status status--warn" />
        <span className="text-[10px] font-extrabold text-[var(--warn)]">Stopped</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2">
      <span className="status status--fault" />
      <span className="text-[10px] font-extrabold text-[var(--fault)]">Fault</span>
    </div>
  )
}

export function MachinePanel({ maquina }: MachinePanelProps) {
  const entries = Object.entries(maquina.variables).filter(
    ([, v]) => v !== undefined
  ) as [string, NonNullable<typeof maquina.variables[keyof typeof maquina.variables]>][]

  return (
    <Link
      to={`/maquina/${maquina.id}`}
      className="card p-5 flex flex-col gap-4 block"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-[var(--text)]">{maquina.nombre}</h2>
        <StatusBadge estado={maquina.informativo.estadoYRun.estado} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {entries.slice(0, 6).map(([key, v]) => (
          <div key={key} className="bg-[var(--input-bg)] p-3 border-2 border-[var(--border)]">
            <span className="block text-[8px] font-mono uppercase tracking-[0.1em] text-[var(--muted)] mb-1 font-bold">{v.nombre || key}</span>
            <span className="data-value text-sm">{v.actual.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </Link>
  )
}
