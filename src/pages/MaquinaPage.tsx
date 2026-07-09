import { useParams } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"
import { useAlarmas } from "../hooks/useAlarmas"
import { DialCard } from "../components/dials/DialCard"
import { EstadoCard } from "../components/informativo/estado/EstadoCard"
import { OdtDesArtCard } from "../components/informativo/odtDesArt/OdtDesArtCard"
import { TonejaleCard } from "../components/informativo/produccion/TonejaleCard"
import { ChartPanel } from "../components/graficas/ChartPanel"
import { AlarmList } from "../components/alarmas/AlarmList"

export function MaquinaPage() {
  const { id } = useParams<{ id: string }>()
  const { getMaquina } = useSocket()
  const { alarmasActivas, limpiarAlarma } = useAlarmas()

  const maquina = id ? getMaquina(id) : undefined
  const alarmasMaquina = alarmasActivas.filter((a) => a.maquinaId === id)

  if (!maquina) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Máquina: {id}</h2>
        <div className="p-4 bg-[var(--panel-color)] rounded-xl border border-gray-700">
          <p className="opacity-70">Esperando datos de la máquina...</p>
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{maquina.nombre}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EstadoCard estadoYRun={maquina.informativo.estadoYRun} />
        <OdtDesArtCard odtArtDesc={maquina.informativo.odtArtDesc} />
        <TonejaleCard tonelaje={maquina.informativo.tonelaje} />
      </div>

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

      {variablesList.length > 0 && <ChartPanel variables={variablesList} />}

      {alarmasMaquina.length > 0 && (
        <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
          <h3 className="text-sm font-medium mb-3 opacity-70">
            Alarmas — {maquina.nombre}
          </h3>
          <AlarmList alarmas={alarmasMaquina} onDismiss={limpiarAlarma} />
        </div>
      )}
    </div>
  )
}