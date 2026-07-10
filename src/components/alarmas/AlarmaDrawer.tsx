import { X, Bell } from "lucide-react"
import { useAlarmas } from "../../hooks/useAlarmas"
import { AlarmList } from "./AlarmList"

interface AlarmaDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function AlarmaDrawer({ isOpen, onClose }: AlarmaDrawerProps) {
  const { alarmasActivas, limpiarAlarma } = useAlarmas()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-[#07050a]/80 z-40" onClick={onClose} />
      )}

      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-80 bg-[var(--surface)] border-l-2 border-[var(--border)] flex flex-col
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Bell size={14} className="text-[var(--fault)]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.08em] text-[var(--text)]">
              Alarmas {alarmasActivas.length > 0 && `(${alarmasActivas.length})`}
            </span>
          </div>
          <button onClick={onClose} className="btn">
            <X size={12} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AlarmList alarmas={alarmasActivas} onDismiss={limpiarAlarma} />
        </div>

        {alarmasActivas.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              Sin alarmas activas
            </p>
          </div>
        )}
      </div>
    </>
  )
}
