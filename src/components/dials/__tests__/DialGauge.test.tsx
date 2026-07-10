import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DialGauge } from "../DialGauge"

describe("DialGauge", () => {
  const defaultProps = {
    valor: 50,
    min: 0,
    max: 100,
    nom: 50,
    estado: "Produciendo",
  }

  it("renders an SVG element", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })

  it("displays the formatted value", () => {
    render(<DialGauge {...defaultProps} />)
    expect(screen.getByText("50.0")).toBeInTheDocument()
  })

  it("displays --- when valor is NaN", () => {
    render(<DialGauge {...defaultProps} valor={NaN} />)
    expect(screen.getByText("---")).toBeInTheDocument()
  })

  it("formats value with one decimal place", () => {
    render(<DialGauge {...defaultProps} valor={42.789} />)
    expect(screen.getByText("42.8")).toBeInTheDocument()
  })

  it("renders with custom size", () => {
    const { container } = render(<DialGauge {...defaultProps} size={200} />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("width", "200")
    expect(svg).toHaveAttribute("height", "200")
  })

  it("renders tick marks (11 lines for ticks)", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")!
    const lines = svg.querySelectorAll("line")
    expect(lines.length).toBeGreaterThanOrEqual(11)
  })

  it("renders the background circle", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")!
    const circles = svg.querySelectorAll("circle")
    expect(circles.length).toBeGreaterThanOrEqual(1)
  })
})
