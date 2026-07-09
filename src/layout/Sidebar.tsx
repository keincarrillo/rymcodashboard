import { Link, useLocation } from "react-router-dom"
import { AlarmPanel } from "../components/alarmas/AlarmPanel"
import { MAQUINAS } from "../config/maquinas"

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-[var(--panel-color)] border-r border-gray-700 p-4 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-3">Máquinas</h2>
        <nav className="space-y-2">
          {MAQUINAS.map((m) => (
            <Link
              key={m.id}
              to={`/maquina/${m.id}`}
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