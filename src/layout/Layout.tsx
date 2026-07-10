import { type ReactNode } from "react"
import { Header } from "./Header"
import { TabBar } from "./TabBar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <TabBar />
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-5xl px-4 sm:px-6 py-6 sm:py-8" style={{ margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  )
}
