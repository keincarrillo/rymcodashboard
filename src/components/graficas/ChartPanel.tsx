import { useState } from "react"
import { LineChart } from "./LineChart"
import { BarChart } from "./BarChart"

interface ChartPanelProps {
  variables: { key: string; nombre: string }[]
}

const MOCK_LINE_DATA = [
  { time: "00:00", value: 12.5 },
  { time: "01:00", value: 13.2 },
  { time: "02:00", value: 11.8 },
  { time: "03:00", value: 14.1 },
  { time: "04:00", value: 12.9 },
  { time: "05:00", value: 13.5 },
  { time: "06:00", value: 12.2 },
  { time: "07:00", value: 14.8 },
]

const MOCK_BAR_DATA = [
  { name: "Turno A", value: 450 },
  { name: "Turno B", value: 520 },
  { name: "Turno C", value: 380 },
]

export function ChartPanel({ variables }: ChartPanelProps) {
  const [activeTab, setActiveTab] = useState<"line" | "bar">("line")
  const [selectedVar, setSelectedVar] = useState(variables[0]?.key || "")

  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium opacity-70">Gráficas</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("line")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === "line"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Línea
          </button>
          <button
            onClick={() => setActiveTab("bar")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeTab === "bar"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Barras
          </button>
        </div>
      </div>

      {variables.length > 0 && (
        <select
          value={selectedVar}
          onChange={(e) => setSelectedVar(e.target.value)}
          className="mb-4 px-3 py-2 bg-gray-700 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          {variables.map((v) => (
            <option key={v.key} value={v.key}>
              {v.nombre}
            </option>
          ))}
        </select>
      )}

      {activeTab === "line" ? (
        <LineChart data={MOCK_LINE_DATA} />
      ) : (
        <BarChart data={MOCK_BAR_DATA} />
      )}
    </div>
  )
}