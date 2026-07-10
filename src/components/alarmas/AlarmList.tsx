import type { Alarma } from "../../types"
import { AlarmItem } from "./AlarmItem"

interface AlarmListProps {
  alarmas: Alarma[]
  onDismiss: (id: string) => void
}

export function AlarmList({ alarmas, onDismiss }: AlarmListProps) {
  if (alarmas.length === 0) {
    return (
      <div className="p-4 text-center text-[var(--text-muted)] text-[9px] font-mono">
        Sin alarmas activas
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {alarmas.map((alarma) => (
        <AlarmItem key={alarma.id} alarma={alarma} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
