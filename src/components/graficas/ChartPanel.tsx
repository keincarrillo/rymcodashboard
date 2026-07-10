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
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)]">
      <div className="px-3 py-2 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Tendencia</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("line")}
            className={`px-2 py-0.5 text-[9px] font-mono radius-badge transition-colors ${
              activeTab === "line"
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:bg-[var(--hover-bg)]"
            }`}
          >
            Linea
          </button>
          <button
            onClick={() => setActiveTab("bar")}
            className={`px-2 py-0.5 text-[9px] font-mono radius-badge transition-colors ${
              activeTab === "bar"
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:bg-[var(--hover-bg)]"
            }`}
          >
            Barras
          </button>
        </div>
      </div>

      <div className="p-3">
        {variables.length > 0 && (
          <select
            value={selectedVar}
            onChange={(e) => setSelectedVar(e.target.value)}
            className="mb-3 px-2 py-1 bg-[var(--input-bg)] radius-badge text-[10px] font-mono text-[var(--text-color)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent)]"
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
    </div>
  )
}
