import { Link, useLocation } from "react-router-dom"
import { X } from "lucide-react"
import { AlarmPanel } from "../components/alarmas/AlarmPanel"
import { MAQUINAS } from "../config/maquinas"
import { useSocket } from "../hooks/useSocket"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function StatusPin({ estado }: { estado: string }) {
  if (estado === "Produciendo") return <span className="status status--running" />
  if (estado === "Detenido") return <span className="status status--warn" />
  return <span className="status status--stopped" />
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { getMaquina } = useSocket()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#07050a]/80 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[45px] left-0 z-40 h-[calc(100%-45px)] w-60 bg-[var(--surface)] border-r-2 border-[var(--border)] flex flex-col shrink-0
          transition-transform duration-200 ease-in-out
          lg:static lg:top-0 lg:h-full lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b-2 border-[var(--border)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--muted)] font-bold">Menu</span>
          <button
            onClick={onClose}
            className="btn"
            aria-label="Cerrar menu"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-3 text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Estaciones</div>
          <nav className="px-3">
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
                    flex items-center gap-3 px-3 py-2.5 transition-all duration-100 relative
                    ${isActive
                      ? "bg-[var(--accent-dim)] text-[var(--accent-bright)] font-bold"
                      : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover-bg)]"
                    }
                  `}
                >
                  <StatusPin estado={estado} />
                  <span className="text-xs font-semibold truncate">{m.nombre}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-3 py-4 border-t-2 border-[var(--border)]">
          <AlarmPanel />
        </div>
      </aside>
    </>
  )
}
