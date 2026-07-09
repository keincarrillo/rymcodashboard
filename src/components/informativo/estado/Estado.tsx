import { Play, Square } from "lucide-react"

interface EstadoProps {
  estado: string
}

export function Estado({ estado }: EstadoProps) {
  const isRunning = estado === "Corriendo"

  return (
    <div className={`flex items-center gap-2 ${isRunning ? "text-green-500" : "text-gray-500"}`}>
      {isRunning ? <Play size={20} /> : <Square size={20} />}
      <span className="font-medium">{estado}</span>
    </div>
  )
}