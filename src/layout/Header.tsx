import { useTema } from "../hooks/useTema"
import { Moon, Sun, Bell } from "lucide-react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"
import { useAlarmas } from "../hooks/useAlarmas"

export function Header() {
  const { isDark, toggleTema } = useTema()
  const { alarmasActivas } = useAlarmas()

  return (
    <header className="bg-[var(--surface)] border-b-2 border-[var(--border)]">
      <div className="max-w-5xl px-4 sm:px-6" style={{ margin: "0 auto" }}>
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--accent)] flex items-center justify-center shrink-0">
              <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">R</span>
            </div>
            <div className="flex items-baseline gap-1 sm:gap-2 min-w-0">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-[var(--text)]">RYMCO</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.1em] text-[var(--muted)] font-bold hidden sm:inline">
                Digital Twin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ConnectionStatus />
            <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
            <span className="text-[10px] font-mono text-[var(--muted)] font-bold hidden md:inline">Tubo Conduit</span>
            <div className="relative flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[10px] font-mono font-bold text-[var(--muted)] border-2 border-[var(--border)]">
              <Bell size={12} />
              {alarmasActivas.length}
              {alarmasActivas.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--fault)] text-[8px] font-bold text-white flex items-center justify-center">
                  !
                </span>
              )}
            </div>
            <button onClick={toggleTema} className="btn !px-2 !py-1.5 sm:!px-3">
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
