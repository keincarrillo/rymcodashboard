import { useParams } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"
import { useAlarmas } from "../hooks/useAlarmas"
import { DialCard } from "../components/dials/DialCard"
import { EstadoCard } from "../components/informativo/estado/EstadoCard"
import { OdtDesArtCard } from "../components/informativo/odtDesArt/OdtDesArtCard"
import { TonejaleCard } from "../components/informativo/produccion/TonejaleCard"
import { ChartPanel } from "../components/graficas/ChartPanel"
import { AlarmPanel } from "../components/alarmas/AlarmPanel"
import { Skeleton, CardSkeleton, DialSkeleton, ChartSkeleton } from "../components/ui/Skeleton"

const STATUS_LABEL: Record<string, string> = {
  Produciendo: "Running",
  Detenido: "Stopped",
}

function StatusBadge({ estado }: { estado: string }) {
  let cls = "status status--stopped"
  if (estado === "Produciendo") cls = "status status--running"
  else if (estado === "Detenido") cls = "status status--warn"

  return (
    <div className="flex items-center gap-2">
      <span className={cls} />
      <span className="text-xs font-extrabold text-[var(--text)]">{STATUS_LABEL[estado] || "Fault"}</span>
    </div>
  )
}

export function MaquinaPage() {
  const { id } = useParams<{ id: string }>()
  const { getMaquina, isConnected } = useSocket()
  const { alarmasActivas, limpiarAlarma } = useAlarmas()

  const maquina = id ? getMaquina(id) : undefined
  const alarmasMaquina = alarmasActivas.filter((a) => a.maquinaId === id)

  if (!maquina && !isConnected) {
    return (
      <div className="space-y-6 h-full overflow-y-auto">
        <Skeleton className="h-7 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DialSkeleton key={i} />
          ))}
        </div>
        <ChartSkeleton />
      </div>
    )
  }

  if (!maquina) {
    return (
      <div className="space-y-6 h-full overflow-y-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-extrabold tracking-tight">{id}</h1>
          <span className="text-[10px] font-mono text-[var(--muted)] font-bold uppercase">Offline</span>
        </div>
        <div className="panel p-6">
          <p className="text-sm text-[var(--muted)] font-semibold">Esperando datos de esta maquina...</p>
        </div>
      </div>
    )
  }

  const variableEntries = Object.entries(maquina.variables).filter(
    ([, v]) => v !== undefined
  )

  const variablesList = variableEntries.map(([key, variable]) => ({
    key,
    nombre: variable?.nombre || key,
  }))

  return (
    <div className="flex gap-6 h-full overflow-y-auto">
      <div className="flex-1 space-y-8 min-w-0 pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">{maquina.nombre}</h1>
            <StatusBadge estado={maquina.informativo.estadoYRun.estado} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <EstadoCard estadoYRun={maquina.informativo.estadoYRun} />
          <OdtDesArtCard odtArtDesc={maquina.informativo.odtArtDesc} />
          <TonejaleCard tonelaje={maquina.informativo.tonelaje} />
        </div>

        <section className="space-y-4">
          <h2 className="section-label px-1">Metricas en vivo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {variableEntries.map(([key, variable]) => (
              <DialCard
                key={key}
                variableKey={key}
                variable={variable!}
                estado={maquina.informativo.estadoYRun.estado}
              />
            ))}
          </div>
        </section>

        {variablesList.length > 0 && <ChartPanel variables={variablesList} />}
      </div>

      {alarmasMaquina.length > 0 && (
        <aside className="w-72 shrink-0 border-l-2 border-[var(--border)] pl-6 pb-6">
          <AlarmPanel alarmas={alarmasMaquina} onDismiss={limpiarAlarma} />
        </aside>
      )}
    </div>
  )
}
