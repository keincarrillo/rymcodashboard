import { useSocket } from "../../hooks/useSocket"

export function ConnectionStatus() {
  const { isConnected, isMockMode } = useSocket()

  if (isMockMode) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-[var(--warn)]" />
        <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-[var(--warn)] font-bold">SIM</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 ${isConnected ? "bg-[var(--accent)]" : "bg-[var(--fault)]"}`} />
      <span className={`text-[9px] font-mono uppercase tracking-[0.1em] font-bold ${isConnected ? "text-[var(--accent-bright)]" : "text-[var(--fault)]"}`}>
        {isConnected ? "Live" : "Off"}
      </span>
    </div>
  )
}
