import type { ReactNode } from "react"

interface PanelProps {
  children: ReactNode
  className?: string
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <div className={`bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4 ${className}`}>
      {children}
    </div>
  )
}
