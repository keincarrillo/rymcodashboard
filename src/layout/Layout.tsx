import { useState, type ReactNode } from "react"
import { Header } from "./Header"
import { TabBar } from "./TabBar"
import { AlarmaDrawer } from "../components/alarmas/AlarmaDrawer"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [alarmDrawerOpen, setAlarmDrawerOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col">
      <Header onToggleAlarmDrawer={() => setAlarmDrawerOpen(!alarmDrawerOpen)} />
      <TabBar />
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
      <AlarmaDrawer isOpen={alarmDrawerOpen} onClose={() => setAlarmDrawerOpen(false)} />
    </div>
  )
}
