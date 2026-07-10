import { useSocket } from "../hooks/useSocket"
import { MAQUINAS } from "../config/maquinas"
import { MachinePanel } from "../components/overview/MachinePanel"

export function Home() {
  const { getMaquina, isConnected } = useSocket()

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">Overview</h2>
        <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
          {isConnected ? "Conectado" : "Sin conexion"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3 overflow-hidden">
        {MAQUINAS.map((m) => {
          const maquina = getMaquina(m.id)
          if (!maquina) {
            return (
              <div key={m.id} className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-3">
                <h2 className="text-sm font-bold mb-2">{m.nombre}</h2>
                <div className="p-2 bg-[var(--input-bg)] radius-card border border-[var(--elevated-color)]">
                  <p className="text-[9px] font-mono text-[var(--text-muted)] text-center uppercase tracking-widest">Sin datos</p>
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
