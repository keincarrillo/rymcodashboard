import { type LucideIcon } from "lucide-react"

interface ItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function Item({ icon: Icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-[var(--text-muted)]" />
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-mono uppercase text-[var(--text-muted)]">{label}</p>
        <p className="text-xs font-mono font-medium truncate">{value}</p>
      </div>
    </div>
  )
}
