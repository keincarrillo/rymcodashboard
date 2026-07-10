import { type LucideIcon } from "lucide-react"

interface ItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function Item({ icon: Icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-6 h-6 rounded radius-card bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
        <Icon size={10} className="text-[var(--text-muted)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] font-medium">{label}</p>
        <p className="text-xs font-mono font-semibold truncate text-[var(--text-color)]">{value}</p>
      </div>
    </div>
  )
}
