import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "../Badge"

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("applies default variant class", () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText("Test")
    expect(badge.className).toContain("bg-[var(--hover-bg)]")
  })

  it("applies success variant class", () => {
    render(<Badge variant="success">OK</Badge>)
    const badge = screen.getByText("OK")
    expect(badge.className).toContain("bg-[var(--color-running)]/15")
  })

  it("applies danger variant class", () => {
    render(<Badge variant="danger">Error</Badge>)
    const badge = screen.getByText("Error")
    expect(badge.className).toContain("bg-[var(--color-danger)]/15")
  })

  it("applies warning variant class", () => {
    render(<Badge variant="warning">Warn</Badge>)
    const badge = screen.getByText("Warn")
    expect(badge.className).toContain("bg-[var(--color-warn)]/15")
  })

  it("applies info variant class", () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText("Info")
    expect(badge.className).toContain("bg-[var(--accent)]/15")
  })

  it("appends custom className", () => {
    render(<Badge className="my-custom">Test</Badge>)
    const badge = screen.getByText("Test")
    expect(badge.className).toContain("my-custom")
  })
})
