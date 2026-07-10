import { useTema } from "../hooks/useTema"
import { Moon, Sun, Menu } from "lucide-react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isDark, toggleTema } = useTema()

  return (
    <header className="bg-[var(--surface-color)] border-b border-[var(--border-color)] px-5 lg:px-6 py-3 flex items-center justify-between shrink-0 relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 radius-button hover:bg-[var(--hover-bg)] transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={16} className="text-[var(--text-muted)]" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center">
            <span className="text-[11px] font-bold text-[var(--accent)]">R</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold tracking-tight text-[var(--text-color)]">RYMCO</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium">
              Digital Twin
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <ConnectionStatus />
        <div className="h-3.5 w-px bg-[var(--border-color)]" />
        <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">Tibo Conduit</span>
        <button
          onClick={toggleTema}
          className="p-1.5 radius-button hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-color)]"
        >
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </header>
  )
}
