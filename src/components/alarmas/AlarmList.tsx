import type { Alarma } from "../../types"
import { AlarmItem } from "./AlarmItem"

interface AlarmListProps {
  alarmas: Alarma[]
  onDismiss: (id: string) => void
}

export function AlarmList({ alarmas, onDismiss }: AlarmListProps) {
  if (alarmas.length === 0) {
    return (
      <div className="p-4 text-center text-[10px] font-mono font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
        Sin alarmas activas
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {alarmas.map((alarma) => (
        <AlarmItem key={alarma.id} alarma={alarma} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
