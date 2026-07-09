import { Link, useLocation } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

const MAQUINAS = [
  { id: "mxm001", nombre: "Molino 1" },
  { id: "mxm002", nombre: "Molino 2" },
  { id: "mxm003", nombre: "Molino 3" },
  { id: "mxsl1", nombre: "Slitter" },
  { id: "mxrs1", nombre: "Roscadora" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-[var(--panel-color)] border-r border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4">Máquinas</h2>
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
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-sm opacity-70">
          <AlertTriangle size={16} />
          <span>Alarmas: 0</span>
        </div>
      </div>
    </aside>
  )
}