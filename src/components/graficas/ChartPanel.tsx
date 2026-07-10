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
    <div className="panel overflow-hidden">
      <div className="px-3 py-2.5 border-b border-[var(--border-color)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
          <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Tendencia</h3>
        </div>
        <div className="bg-[var(--input-bg)] radius-badge p-0.5 flex gap-0.5 border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("line")}
            className={`px-2.5 py-0.5 text-[9px] font-mono radius-badge transition-all duration-150 ${
              activeTab === "line"
                ? "bg-[var(--accent)] text-white font-semibold shadow-[0_0_8px_var(--accent-glow)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-color)]"
            }`}
          >
            Linea
          </button>
          <button
            onClick={() => setActiveTab("bar")}
            className={`px-2.5 py-0.5 text-[9px] font-mono radius-badge transition-all duration-150 ${
              activeTab === "bar"
                ? "bg-[var(--accent)] text-white font-semibold shadow-[0_0_8px_var(--accent-glow)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-color)]"
            }`}
          >
            Barras
          </button>
        </div>
      </div>

      <div className="p-5">
        {variables.length > 0 && (
          <select
            value={selectedVar}
            onChange={(e) => setSelectedVar(e.target.value)}
            className="mb-4 px-3 py-1.5 bg-[var(--input-bg)] radius-badge text-[10px] font-mono text-[var(--text-color)] border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] appearance-none cursor-pointer"
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
