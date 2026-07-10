import { Link, useLocation } from "react-router-dom"
import { X } from "lucide-react"
import { AlarmPanel } from "../components/alarmas/AlarmPanel"
import { MAQUINAS } from "../config/maquinas"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-[var(--panel-color)] border-r border-gray-700 p-4 flex flex-col gap-4
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold">Menú</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 hidden lg:block">Máquinas</h2>
        <nav className="space-y-2">
          {MAQUINAS.map((m) => (
            <Link
              key={m.id}
              to={`/maquina/${m.id}`}
              onClick={onClose}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                location.pathname === `/maquina/${m.id}`
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {m.nombre}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <AlarmPanel />
      </div>
    </aside>
  )
}