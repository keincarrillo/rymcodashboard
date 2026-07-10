import { useTema } from "../hooks/useTema"
import { Moon, Sun, Menu } from "lucide-react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isDark, toggleTema } = useTema()

  return (
    <header className="bg-[var(--panel-color)] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <img src="/favicon.svg" alt="RYMCO" className="h-8" />
        <h1 className="text-xl font-bold">RYMCO Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <ConnectionStatus />
        <span className="text-sm opacity-70 hidden sm:inline">Tibo Conduit</span>
        <button
          onClick={toggleTema}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}