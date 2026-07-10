export const COLORS = {
  black: "var(--muted)",
  stop: "var(--muted)",
  accent: "var(--accent-bright)",
  orange: "var(--warn)",
  red: "var(--fault)",
  green: "var(--accent-bright)",
} as const

export const COLOR_CLASSES = {
  black: "text-[var(--muted)]",
  stop: "text-[var(--muted)]",
  accent: "text-[var(--accent-bright)]",
  orange: "text-[var(--warn)]",
  red: "text-[var(--fault)]",
  green: "text-[var(--accent-bright)]",
} as const

export const COLOR_GLOW = {
  black: "none",
  stop: "none",
  accent: "0 0 12px rgba(96, 165, 250, 0.2)",
  orange: "0 0 12px rgba(217, 119, 6, 0.2)",
  red: "0 0 12px rgba(220, 38, 38, 0.25)",
  green: "0 0 12px rgba(96, 165, 250, 0.2)",
} as const
