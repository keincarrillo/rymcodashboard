import { Wifi, WifiOff, FlaskConical } from "lucide-react"
import { useSocket } from "../../hooks/useSocket"

export function ConnectionStatus() {
  const { isConnected, isMockMode } = useSocket()

  if (isMockMode) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <FlaskConical size={14} className="text-yellow-500" />
        <span className="text-yellow-400">Simulación</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {isConnected ? (
        <>
          <Wifi size={14} className="text-green-500" />
          <span className="text-green-400">Conectado</span>
        </>
      ) : (
        <>
          <WifiOff size={14} className="text-red-500" />
          <span className="text-red-400">Desconectado</span>
        </>
      )}
    </div>
  )
}
