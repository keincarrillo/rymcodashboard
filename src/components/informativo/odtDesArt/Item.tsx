import { type LucideIcon } from "lucide-react"

interface ItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function Item({ icon: Icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 border-2 border-[var(--border)] bg-[var(--input-bg)] flex items-center justify-center shrink-0">
        <Icon size={11} className="text-[var(--muted)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-[var(--muted)] font-bold">{label}</p>
        <p className="text-xs font-mono font-extrabold truncate text-[var(--text)]">{value}</p>
      </div>
    </div>
  )
}
