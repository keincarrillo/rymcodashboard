export const COLORS = {
  black: "var(--text-muted)",
  stop: "var(--text-muted)",
  purple: "#a78bfa",
  orange: "var(--color-warn)",
  red: "var(--color-danger)",
  green: "var(--color-running)",
} as const

export const COLOR_CLASSES = {
  black: "text-[var(--text-muted)]",
  stop: "text-[var(--text-muted)]",
  purple: "text-purple-400",
  orange: "text-[var(--color-warn)]",
  red: "text-[var(--color-danger)]",
  green: "text-[var(--color-running)]",
} as const

export const COLOR_GLOW = {
  black: "none",
  stop: "none",
  purple: "0 0 16px rgba(167, 139, 250, 0.25)",
  orange: "0 0 16px rgba(245, 158, 11, 0.25)",
  red: "0 0 16px rgba(239, 68, 68, 0.3)",
  green: "0 0 16px rgba(34, 197, 94, 0.3)",
} as const
