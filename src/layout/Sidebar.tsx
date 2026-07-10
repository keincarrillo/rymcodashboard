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
  const color =
    estado === "Produciendo"
      ? "bg-[var(--color-running)] shadow-[0_0_6px_rgba(34,197,94,0.5)]"
      : estado === "Detenido"
        ? "bg-[var(--color-warn)] shadow-[0_0_6px_rgba(245,158,11,0.4)]"
        : "bg-[var(--text-muted)]"

  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${color}`} />
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { getMaquina } = useSocket()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[40px] left-0 z-40 h-[calc(100%-40px)] w-56 bg-[var(--surface-color)] border-r border-[var(--border-color)] flex flex-col shrink-0
          transition-transform duration-200 ease-in-out
          lg:static lg:top-0 lg:h-full lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-3 lg:hidden border-b border-[var(--border-color)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Menú</span>
          <button
            onClick={onClose}
            className="p-1 radius-button hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)]"
            aria-label="Cerrar menú"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] hidden lg:block mb-2 px-2 font-medium">
              Estaciones
            </span>
            <nav className="space-y-0.5">
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
                      flex items-center gap-2 px-2 py-1.5 radius-button transition-all duration-100
                      ${isActive
                        ? "bg-[var(--accent-dim)] text-[var(--accent)] font-medium"
                        : "text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--hover-bg)]"
                      }
                    `}
                  >
                    <StatusDot estado={estado} />
                    <span className="text-xs truncate">{m.nombre}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="p-2 border-t border-[var(--border-color)]">
          <AlarmPanel />
        </div>
      </aside>
    </>
  )
}
