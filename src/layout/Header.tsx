import { useTema } from "../hooks/useTema"
import { Moon, Sun, Bell } from "lucide-react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"
import { useAlarmas } from "../hooks/useAlarmas"

interface HeaderProps {
  onToggleAlarmDrawer: () => void
}

export function Header({ onToggleAlarmDrawer }: HeaderProps) {
  const { isDark, toggleTema } = useTema()
  const { alarmasActivas } = useAlarmas()

  return (
    <header className="bg-[var(--surface)] border-b-2 border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--accent)] flex items-center justify-center">
            <span className="text-sm font-extrabold text-white tracking-tight">R</span>
          </div>
          <span className="text-sm font-extrabold tracking-tight text-[var(--text)]">RYMCO</span>
          <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--muted)] font-bold ml-1 hidden sm:inline">
            Digital Twin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ConnectionStatus />
          <div className="h-4 w-px bg-[var(--border)]" />
          <span className="text-[10px] font-mono text-[var(--muted)] hidden sm:inline font-bold">Tibo Conduit</span>
          <button
            onClick={onToggleAlarmDrawer}
            className="btn relative"
          >
            <Bell size={12} />
            {alarmasActivas.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--fault)] text-[8px] font-mono font-bold text-white flex items-center justify-center">
                {alarmasActivas.length}
              </span>
            )}
          </button>
          <button onClick={toggleTema} className="btn">
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
          </button>
        </div>
      </div>
    </header>
  )
}
