import { type LucideIcon } from "lucide-react"

interface ItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function Item({ icon: Icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-blue-400" />
      <div>
        <p className="text-xs opacity-60">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}