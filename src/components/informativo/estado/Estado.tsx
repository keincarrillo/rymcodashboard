import { Play, Square } from "lucide-react"

interface EstadoProps {
  estado: string
}

export function Estado({ estado }: EstadoProps) {
  const isRunning = estado === "Corriendo"

  return (
    <div className={`flex items-center gap-2 ${isRunning ? "text-[var(--color-running)]" : "text-[var(--text-muted)]"}`}>
      {isRunning ? <Play size={14} /> : <Square size={14} />}
      <span className="text-sm font-medium">{estado}</span>
    </div>
  )
}
