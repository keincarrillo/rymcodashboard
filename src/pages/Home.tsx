import { Link } from "react-router-dom"

const MAQUINAS = [
  { id: "mxm001", nombre: "Molino 1" },
  { id: "mxm002", nombre: "Molino 2" },
  { id: "mxm003", nombre: "Molino 3" },
  { id: "mxsl1", nombre: "Slitter" },
  { id: "mxrs1", nombre: "Roscadora" },
]

export function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bienvenido al Dashboard RYMCO</h2>
      <p className="opacity-70">Selecciona una máquina del panel lateral para ver sus detalles.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MAQUINAS.map((m) => (
          <Link
            key={m.id}
            to={`/maquina/${m.id}`}
            className="block p-4 bg-[var(--panel-color)] rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-lg font-semibold">{m.nombre}</h3>
            <p className="text-sm opacity-70">ID: {m.id}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}