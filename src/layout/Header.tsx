import { useTema } from "../hooks/useTema"
import { Moon, Sun, Menu } from "lucide-react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isDark, toggleTema } = useTema()

  return (
    <header className="bg-[var(--surface-color)] border-b border-[var(--border-color)] px-4 py-2 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 radius-button hover:bg-[var(--hover-bg)] transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} className="text-[var(--text-muted)]" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="RYMCO" className="h-6" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold tracking-wide text-[var(--text-color)]">RYMCO</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Digital Twin</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ConnectionStatus />
        <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block" />
        <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">Tibo Conduit</span>
        <button
          onClick={toggleTema}
          className="p-1.5 radius-button hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-color)]"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  )
}
