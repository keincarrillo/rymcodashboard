import type { ReactNode } from "react"

interface MainContentProps {
  children: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return <div className="flex-1 p-4 overflow-auto">{children}</div>
}