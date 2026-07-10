import { useLocation, useNavigate } from "react-router-dom"
import { MAQUINAS } from "../config/maquinas"
import { useSocket } from "../hooks/useSocket"
import { useAlarmas } from "../hooks/useAlarmas"
import { Bell } from "lucide-react"

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getMaquina } = useSocket()
  const { alarmasActivas } = useAlarmas()

  const isOverview = location.pathname === "/"

  return (
    <div className="border-b-2 border-[var(--border)] overflow-x-auto">
        <div className="max-w-5xl px-4 sm:px-6" style={{ margin: "0 auto" }}>
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className={`px-2 sm:px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.08em] transition-colors relative flex items-center gap-1 sm:gap-2 shrink-0 ${
                isOverview
                  ? "text-[var(--accent-bright)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              <span className={`w-2 h-2 shrink-0 ${isOverview ? "bg-[var(--accent)]" : "bg-[var(--muted)]"}`} />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">OV</span>
              {isOverview && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-[var(--accent)]" />}
            </button>
            {MAQUINAS.map((m) => {
              const maquina = getMaquina(m.id)
              const estado = maquina?.informativo?.estadoYRun?.estado ?? "Desconocido"
              const isActive = location.pathname === `/maquina/${m.id}`

              let statusColor = "bg-[var(--muted)]"
              if (estado === "Produciendo") statusColor = "bg-[var(--accent)]"
              else if (estado === "Detenido") statusColor = "bg-[var(--warn)]"

              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/maquina/${m.id}`)}
                  className={`px-2 sm:px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.04em] transition-colors relative flex items-center gap-1 sm:gap-2 shrink-0 ${
                    isActive
                      ? "text-[var(--accent-bright)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className={`w-2 h-2 shrink-0 ${statusColor}`} />
                  <span className="hidden sm:inline">{m.nombre}</span>
                  <span className="sm:hidden">{m.id.replace(/^mx/, "").toUpperCase()}</span>
                  {isActive && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-[var(--accent)]" />}
                </button>
              )
            })}
          </div>

          {alarmasActivas.length > 0 && (
            <button
              onClick={() => {
                const maquinaId = location.pathname.match(/\/maquina\/(.+)/)?.[1]
                if (maquinaId) {
                  document.getElementById("alarmas-section")?.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-[10px] font-mono font-bold text-[var(--fault)] shrink-0 border-2 border-[var(--fault)]"
            >
              <Bell size={12} />
              {alarmasActivas.length}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
