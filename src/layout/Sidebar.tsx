import { Link, useLocation } from "react-router-dom"
import { X } from "lucide-react"
import { AlarmPanel } from "../components/alarmas/AlarmPanel"
import { MAQUINAS } from "../config/maquinas"
import { useSocket } from "../hooks/useSocket"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function StatusDot({ estado }: { estado: string }) {
  let cls = "status-dot"
  if (estado === "Produciendo") cls += " status-dot--running"
  else if (estado === "Detenido") cls += " status-dot--warn"
  else cls += " status-dot--stopped"
  return <span className={cls} />
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { getMaquina } = useSocket()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[43px] left-0 z-40 h-[calc(100%-43px)] w-60 bg-[var(--surface-color)] border-r border-[var(--border-color)] flex flex-col shrink-0
          transition-transform duration-200 ease-in-out
          lg:static lg:top-0 lg:h-full lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-[var(--border-color)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Menu</span>
          <button
            onClick={onClose}
            className="p-1 radius-button hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)]"
            aria-label="Cerrar menu"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          <div className="px-4 mb-3">
            <span className="section-label hidden lg:flex">Estaciones</span>
          </div>
          <nav className="space-y-0.5 px-3">
            {MAQUINAS.map((m) => {
              const maquina = getMaquina(m.id)
              const estado = maquina?.informativo?.estadoYRun?.estado ?? "Desconocido"
              const isActive = location.pathname === `/maquina/${m.id}`

              return (
                <Link
                  key={m.id}
                  to={`/maquina/${m.id}`}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 radius-card transition-all duration-150 relative
                    ${isActive
                      ? "bg-[var(--accent-dim)] text-[var(--accent)] font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--hover-bg)]"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
                  )}
                  <StatusDot estado={estado} />
                  <span className="text-xs truncate">{m.nombre}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-3 py-3 border-t border-[var(--border-color)]">
          <AlarmPanel />
        </div>
      </aside>
    </>
  )
}
