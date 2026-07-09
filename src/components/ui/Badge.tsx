import type { ReactNode } from "react"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-gray-500/20 text-gray-400",
  success: "bg-green-500/20 text-green-400",
  warning: "bg-orange-500/20 text-orange-400",
  danger: "bg-red-500/20 text-red-400",
  info: "bg-blue-500/20 text-blue-400",
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${VARIANT_STYLES[variant]} ${className}`}>
      {children}
    </span>
  )
}
