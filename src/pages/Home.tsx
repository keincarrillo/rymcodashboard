import { useSocket } from "../hooks/useSocket"
import { MAQUINAS } from "../config/maquinas"
import { MachinePanel } from "../components/overview/MachinePanel"

export function Home() {
  const { getMaquina, isConnected } = useSocket()

  return (
    <div className="p-6 h-full overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold tracking-tight text-[var(--text-color)]">Overview</h1>
          <span className="w-px h-4 bg-[var(--border-color)]" />
          <span className="text-[10px] font-mono text-[var(--text-muted)]">{MAQUINAS.length} estaciones</span>
        </div>
        <span className={`text-[10px] font-mono flex items-center gap-1.5 ${isConnected ? "text-[var(--color-running)]" : "text-[var(--text-muted)]"}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isConnected ? "bg-[var(--color-running)] shadow-[0_0_6px_rgba(34,197,94,0.6)]" : "bg-[var(--text-muted)]"}`} />
          {isConnected ? "Conectado" : "Sin conexion"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4 overflow-hidden">
        {MAQUINAS.map((m) => {
          const maquina = getMaquina(m.id)
          if (!maquina) {
            return (
              <div key={m.id} className="card radius-panel p-5 flex flex-col gap-4">
                <h2 className="text-sm font-bold">{m.nombre}</h2>
                <div className="flex-1 flex items-center justify-center p-6 bg-[var(--input-bg)] radius-card border border-[var(--border-color)]">
                  <p className="text-[9px] font-mono text-[var(--text-muted)] text-center uppercase tracking-[0.15em]">Sin datos</p>
                </div>
              </div>
            )
          }
          return <MachinePanel key={m.id} maquina={maquina} />
        })}
      </div>
    </div>
  )
}
