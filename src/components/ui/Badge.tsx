import type { ReactNode } from "react"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-[var(--hover-bg)] text-[var(--text-muted)]",
  success: "bg-[var(--color-running)]/15 text-[var(--color-running)]",
  warning: "bg-[var(--color-warn)]/15 text-[var(--color-warn)]",
  danger: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
  info: "bg-[var(--accent)]/15 text-[var(--accent)]",
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`text-[8px] font-mono px-1.5 py-0.5 radius-badge font-bold uppercase tracking-wider ${VARIANT_STYLES[variant]} ${className}`}>
      {children}
    </span>
  )
}
