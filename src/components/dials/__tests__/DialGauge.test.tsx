import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
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

  it("renders with custom size", () => {
    const { container } = render(<DialGauge {...defaultProps} size={200} />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("width", "200")
    expect(svg).toHaveAttribute("height", "200")
  })

  it("renders the track arc path", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")!
    const paths = svg.querySelectorAll("path")
    expect(paths.length).toBeGreaterThanOrEqual(2)
  })

  it("renders tick marks (11 lines for ticks)", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")!
    const lines = svg.querySelectorAll("line")
    expect(lines.length).toBeGreaterThanOrEqual(11)
  })

  it("renders the needle pivot circle", () => {
    const { container } = render(<DialGauge {...defaultProps} />)
    const svg = container.querySelector("svg")!
    const circles = svg.querySelectorAll("circle")
    expect(circles.length).toBe(1)
  })
})
