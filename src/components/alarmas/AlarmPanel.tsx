import { useState } from "react"
import { Bell, ChevronDown, ChevronUp } from "lucide-react"
import { useAlarmas } from "../../hooks/useAlarmas"
import { AlarmList } from "./AlarmList"

export function AlarmPanel() {
  const { alarmasActivas, limpiarAlarma } = useAlarmas()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Bell size={16} className={alarmasActivas.length > 0 ? "text-red-500" : "opacity-50"} />
          <span className="text-sm font-medium">Alarmas</span>
          {alarmasActivas.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">
              {alarmasActivas.length}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-700 max-h-64 overflow-y-auto">
          <AlarmList alarmas={alarmasActivas} onDismiss={limpiarAlarma} />
        </div>
      )}
    </div>
  )
}
