import { Link } from "react-router-dom"
import type { Maquina } from "../../schemas/maquinaSchema"

interface MachinePanelProps {
  maquina: Maquina
}

function StatusBadge({ estado }: { estado: string }) {
  if (estado === "Produciendo") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="status-dot status-dot--running" />
        <span className="text-[10px] font-semibold text-[var(--running)]">Running</span>
      </div>
    )
  }
  if (estado === "Detenido") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="status-dot status-dot--warn" />
        <span className="text-[10px] font-semibold text-[var(--warn)]">Stopped</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5">
      <span className="status-dot status-dot--fault" />
      <span className="text-[10px] font-semibold text-[var(--fault)]">Fault</span>
    </div>
  )
}

export function MachinePanel({ maquina }: MachinePanelProps) {
  const variableEntries = Object.entries(maquina.variables).filter(([, v]) => v !== undefined)

  return (
    <Link
      to={`/maquina/${maquina.id}`}
      className="card card-glow radius-panel p-5 flex flex-col gap-4 block"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--text-color)]">{maquina.nombre}</h2>
        <StatusBadge estado={maquina.informativo.estadoYRun.estado} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {variableEntries.slice(0, 6).map(([key, variable]) => (
          <div key={key} className="bg-[var(--input-bg)] radius-card p-3 border border-[var(--border-color)]">
            <span className="block text-[8px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] mb-0.5 font-medium">{variable!.nombre}</span>
            <span className="data-value text-sm">{variable!.valor}</span>
          </div>
        ))}
      </div>
    </Link>
  )
}
