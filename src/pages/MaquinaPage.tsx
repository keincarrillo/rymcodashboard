import { useParams } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"
import { useAlarmas } from "../hooks/useAlarmas"
import { DialCard } from "../components/dials/DialCard"
import { EstadoCard } from "../components/informativo/estado/EstadoCard"
import { OdtDesArtCard } from "../components/informativo/odtDesArt/OdtDesArtCard"
import { TonejaleCard } from "../components/informativo/produccion/TonejaleCard"
import { ChartPanel } from "../components/graficas/ChartPanel"
import { AlarmList } from "../components/alarmas/AlarmList"
import { Skeleton, CardSkeleton, DialSkeleton, ChartSkeleton } from "../components/ui/Skeleton"

const STATUS_CONFIG: Record<string, { dot: string; label: string }> = {
  Produciendo: { dot: "status-dot--running", label: "Running" },
  Detenido: { dot: "status-dot--warn", label: "Stopped" },
}

function StatusBadge({ estado }: { estado: string }) {
  const config = STATUS_CONFIG[estado] || { dot: "status-dot--fault", label: "Fault" }

  return (
    <div className="flex items-center gap-1.5">
      <span className={`status-dot ${config.dot}`} />
      <span className="text-xs font-semibold text-[var(--text-color)]">{config.label}</span>
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
      <div className="p-6 space-y-6 h-full overflow-y-auto">
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
      <div className="p-6 space-y-6 h-full overflow-y-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">{id}</h1>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Offline</span>
        </div>
        <div className="panel p-6">
          <p className="text-sm text-[var(--text-muted)]">Esperando datos de esta maquina...</p>
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
    <div className="p-6 space-y-7 h-full overflow-y-auto">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-xl font-bold tracking-tight truncate">{maquina.nombre}</h1>
          <StatusBadge estado={maquina.informativo.estadoYRun.estado} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EstadoCard estadoYRun={maquina.informativo.estadoYRun} />
        <OdtDesArtCard odtArtDesc={maquina.informativo.odtArtDesc} />
        <TonejaleCard tonelaje={maquina.informativo.tonelaje} />
      </div>

      <section className="space-y-3">
        <h2 className="section-label">Metricas En Vivo</h2>
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

      {alarmasMaquina.length > 0 && (
        <section className="panel p-5">
          <h2 className="section-label mb-4">Alarmas Activas</h2>
          <AlarmList alarmas={alarmasMaquina} onDismiss={limpiarAlarma} />
        </section>
      )}
    </div>
  )
}
