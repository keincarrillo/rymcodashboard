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

function StatusBadge({ estado }: { estado: string }) {
  const config =
    estado === "Produciendo"
      ? { dot: "bg-[var(--color-running)] shadow-[0_0_6px_rgba(34,197,94,0.5)]", text: "text-[var(--color-running)]", label: "Running" }
      : estado === "Detenido"
        ? { dot: "bg-[var(--text-muted)]", text: "text-[var(--text-muted)]", label: "Stopped" }
        : { dot: "bg-[var(--color-fault)] shadow-[0_0_6px_rgba(239,68,68,0.5)]", text: "text-[var(--color-fault)]", label: "Fault" }

  return (
    <div className={`flex items-center gap-1.5 shrink-0 ${config.text}`}>
      <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${config.dot}`} />
      <span className="text-xs font-semibold">{config.label}</span>
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
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{id}</h2>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Offline</span>
        </div>
        <div className="p-4 bg-[var(--surface-color)] radius-panel border border-[var(--border-color)]">
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
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-xl font-bold truncate">{maquina.nombre}</h2>
          <StatusBadge estado={maquina.informativo.estadoYRun.estado} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EstadoCard estadoYRun={maquina.informativo.estadoYRun} />
        <OdtDesArtCard odtArtDesc={maquina.informativo.odtArtDesc} />
        <TonejaleCard tonelaje={maquina.informativo.tonelaje} />
      </div>

      <div>
        <h3 className="text-xs font-semibold mb-3">Metricas En Vivo</h3>
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
      </div>

      {variablesList.length > 0 && <ChartPanel variables={variablesList} />}

      {alarmasMaquina.length > 0 && (
        <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-4">
          <h3 className="text-xs font-semibold mb-3">Alarmas Activas</h3>
          <AlarmList alarmas={alarmasMaquina} onDismiss={limpiarAlarma} />
        </div>
      )}
    </div>
  )
}
