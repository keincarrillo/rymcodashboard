import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Panel } from "../Panel"

describe("Panel", () => {
  it("renders children", () => {
    render(<Panel><p>Content</p></Panel>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("renders as a div element", () => {
    render(<Panel>Test</Panel>)
    const panel = screen.getByText("Test")
    expect(panel.parentElement!.tagName).toBe("DIV")
  })

  it("renders with children inside", () => {
    render(
      <Panel>
        <span>First</span>
        <span>Second</span>
      </Panel>
    )
    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
  })
})
