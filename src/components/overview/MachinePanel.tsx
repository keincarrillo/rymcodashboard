import { Link } from "react-router-dom"
import type { MaquinaData } from "../../types"

interface MachinePanelProps {
  maquina: MaquinaData
}

function StatusBadge({ estado }: { estado: string }) {
  const config =
    estado === "Produciendo"
      ? { dot: "bg-[var(--color-running)] shadow-[0_0_6px_rgba(34,197,94,0.5)]", text: "text-[var(--color-running)]", label: "Running" }
      : estado === "Detenido"
        ? { dot: "bg-[var(--text-muted)]", text: "text-[var(--text-muted)]", label: "Stopped" }
        : { dot: "bg-[var(--color-fault)] shadow-[0_0_6px_rgba(239,68,68,0.5)]", text: "text-[var(--color-fault)]", label: "Fault" }

  return (
    <span className={`inline-flex items-center gap-1 ${config.text} shrink-0`}>
      <span className={`inline-block w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-[10px] font-semibold whitespace-nowrap">{config.label}</span>
    </span>
  )
}

export function MachinePanel({ maquina }: MachinePanelProps) {
  const { nombre, id, informativo, variables } = maquina
  const { estado } = informativo.estadoYRun

  const variableEntries = Object.entries(variables).filter(([, v]) => v !== undefined)

  return (
    <Link
      to={`/maquina/${id}`}
      className="bg-[var(--surface-color)] radius-card border border-[var(--border-color)] hover:border-[var(--hover-border)] hover:shadow-sm active:scale-[0.985] transition-all duration-150 overflow-hidden min-w-0"
    >
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1.5">
          <h2 className="text-sm font-bold truncate min-w-0">{nombre}</h2>
          <StatusBadge estado={estado} />
        </div>

        <div className="py-3 px-2 bg-[var(--input-bg)] radius-card border border-[var(--elevated-color)]">
          <p className="text-[8px] font-mono text-[var(--text-muted)] text-center uppercase tracking-[0.15em]">Imagen {nombre}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {variableEntries.slice(0, 4).map(([key, variable]) => (
            <div key={key} className="flex items-center justify-between text-[10px] min-w-0 gap-1">
              <span className="font-mono text-[var(--text-muted)] truncate">{variable?.nombre || key}</span>
              <span className="font-mono font-bold shrink-0">{variable?.actual?.toFixed(1) ?? "---"}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border-color)]">
          <span className="font-mono text-[10px] text-[var(--text-muted)]">Produccion</span>
          <span className="font-mono text-[10px] font-bold">{informativo.tonelaje.toLocaleString()} t</span>
        </div>
      </div>
    </Link>
  )
}
