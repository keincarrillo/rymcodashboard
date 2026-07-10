import { Wifi, WifiOff } from "lucide-react"
import { useSocket } from "../../hooks/useSocket"

export function ConnectionStatus() {
  const { isConnected, isMockMode } = useSocket()

  if (isMockMode) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-warn)] shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
        <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--color-warn)]">SIM</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      {isConnected ? (
        <>
          <Wifi size={10} className="text-[var(--color-running)]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--color-running)]">Live</span>
        </>
      ) : (
        <>
          <WifiOff size={10} className="text-[var(--color-danger)]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--color-danger)]">Off</span>
        </>
      )}
    </div>
  )
}
