import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Skeleton, DialSkeleton, CardSkeleton, ChartSkeleton } from "../Skeleton"

describe("Skeleton", () => {
  it("renders a div with animate-pulse", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass("animate-pulse")
  })

  it("appends custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-8" />)
    expect(container.firstChild).toHaveClass("h-4", "w-8")
  })
})

describe("DialSkeleton", () => {
  it("renders 3 skeleton elements", () => {
    const { container } = render(<DialSkeleton />)
    const skeletons = container.querySelectorAll(".animate-pulse")
    expect(skeletons.length).toBe(3)
  })
})

describe("CardSkeleton", () => {
  it("renders 3 skeleton elements", () => {
    const { container } = render(<CardSkeleton />)
    const skeletons = container.querySelectorAll(".animate-pulse")
    expect(skeletons.length).toBe(3)
  })
})

describe("ChartSkeleton", () => {
  it("renders 2 skeleton elements", () => {
    const { container } = render(<ChartSkeleton />)
    const skeletons = container.querySelectorAll(".animate-pulse")
    expect(skeletons.length).toBe(2)
  })
})
