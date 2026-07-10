import { useState } from "react"
import { Bell, ChevronDown, ChevronUp } from "lucide-react"
import { useAlarmas } from "../../hooks/useAlarmas"
import { AlarmList } from "./AlarmList"

export function AlarmPanel() {
  const { alarmasActivas, limpiarAlarma } = useAlarmas()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-[var(--surface-color)] radius-card border border-[var(--border-color)] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 py-2 flex items-center justify-between hover:bg-[var(--hover-bg)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Bell size={12} className={alarmasActivas.length > 0 ? "text-[var(--color-danger)]" : "text-[var(--text-muted)]"} />
          <span className="text-[10px] font-mono font-medium">Alarmas</span>
          {alarmasActivas.length > 0 && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 radius-badge bg-[var(--color-danger)]/15 text-[var(--color-danger)] font-bold">
              {alarmasActivas.length}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={10} className="text-[var(--text-muted)]" /> : <ChevronDown size={10} className="text-[var(--text-muted)]" />}
      </button>

      {isExpanded && (
        <div className="border-t border-[var(--border-color)] max-h-48 overflow-y-auto">
          <AlarmList alarmas={alarmasActivas} onDismiss={limpiarAlarma} />
        </div>
      )}
    </div>
  )
}
