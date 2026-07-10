import type { ReactNode } from "react"

interface PanelProps {
  children: ReactNode
  className?: string
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <div className={`bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-3 ${className}`}>
      {children}
    </div>
  )
}
