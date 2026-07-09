import { Weight } from "lucide-react"

interface TonejaleCardProps {
  tonelaje: number
}

export function TonejaleCard({ tonelaje }: TonejaleCardProps) {
  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <h3 className="text-sm font-medium mb-3 opacity-70">Producción</h3>
      <div className="flex items-center gap-3">
        <Weight size={24} className="text-orange-400" />
        <div>
          <p className="text-2xl font-bold">{tonelaje.toLocaleString()}</p>
          <p className="text-xs opacity-60">Toneladas</p>
        </div>
      </div>
    </div>
  )
}