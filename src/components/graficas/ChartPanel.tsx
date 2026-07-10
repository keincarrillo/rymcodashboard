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
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="section-label">Tendencia</div>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("line")}
            className={`btn text-[9px] ${activeTab === "line" ? "btn--accent" : ""}`}
          >
            Linea
          </button>
          <button
            onClick={() => setActiveTab("bar")}
            className={`btn text-[9px] ${activeTab === "bar" ? "btn--accent" : ""}`}
          >
            Barras
          </button>
        </div>
      </div>

      {variables.length > 0 && (
        <select
          value={selectedVar}
          onChange={(e) => setSelectedVar(e.target.value)}
          className="mb-4 px-3 py-1.5 bg-[var(--input-bg)] text-[10px] font-mono text-[var(--text)] border-2 border-[var(--border)] font-bold appearance-none cursor-pointer"
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
