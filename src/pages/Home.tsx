import { useSocket } from "../hooks/useSocket"
import { MAQUINAS } from "../config/maquinas"
import { MachinePanel } from "../components/overview/MachinePanel"

export function Home() {
  const { getMaquina, isConnected } = useSocket()

  return (
    <div className="p-6 h-full overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-extrabold tracking-tight text-[var(--text)]">Overview</h1>
          <span className="w-px h-4 bg-[var(--border)]" />
          <span className="text-[10px] font-mono text-[var(--muted)] font-bold">{MAQUINAS.length} estaciones</span>
        </div>
        <span className={`text-[10px] font-mono flex items-center gap-2 font-bold ${isConnected ? "text-[var(--accent-bright)]" : "text-[var(--muted)]"}`}>
          <span className={`inline-block w-2 h-2 ${isConnected ? "bg-[var(--accent)]" : "bg-[var(--muted)]"}`} />
          {isConnected ? "Conectado" : "Sin conexion"}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-5">
        {MAQUINAS.map((m) => {
          const maquina = getMaquina(m.id)
          if (!maquina) {
            return (
              <div key={m.id} className="card p-5 flex flex-col gap-4">
                <h2 className="text-sm font-extrabold">{m.nombre}</h2>
                <div className="flex-1 flex items-center justify-center p-6 bg-[var(--input-bg)] border-2 border-[var(--border)]">
                  <p className="text-[9px] font-mono text-[var(--muted)] text-center uppercase tracking-[0.12em] font-bold">Sin datos</p>
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
