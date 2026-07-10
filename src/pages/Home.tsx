import { useSocket } from "../hooks/useSocket"
import { MAQUINAS } from "../config/maquinas"
import { MachinePanel } from "../components/overview/MachinePanel"

export function Home() {
  const { getMaquina, isConnected } = useSocket()

  return (
    <div className="p-5 h-full overflow-y-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold tracking-tight">Overview</h1>
        <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
          {isConnected ? "Conectado" : "Sin conexion"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3 overflow-hidden">
        {MAQUINAS.map((m) => {
          const maquina = getMaquina(m.id)
          if (!maquina) {
            return (
              <div key={m.id} className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-3 flex flex-col gap-2">
                <h2 className="text-sm font-bold">{m.nombre}</h2>
                <div className="flex-1 flex items-center justify-center p-3 bg-[var(--input-bg)] radius-card border border-[var(--elevated-color)]">
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
