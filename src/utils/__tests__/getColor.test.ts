import { describe, it, expect } from "vitest"
import { getColor } from "../getColor"

describe("getColor", () => {
  it("returns black when valor is NaN", () => {
    expect(getColor(NaN, 0, 100, "Produciendo")).toBe("black")
  })

  it("returns black when min is NaN", () => {
    expect(getColor(50, NaN, 100, "Produciendo")).toBe("black")
  })

  it("returns black when max is NaN", () => {
    expect(getColor(50, 0, NaN, "Produciendo")).toBe("black")
  })

  it("returns stop when estado is Detenido", () => {
    expect(getColor(50, 0, 100, "Detenido")).toBe("stop")
  })

  it("returns purple when min and max are 0", () => {
    expect(getColor(50, 0, 0, "Produciendo")).toBe("purple")
  })

  it("returns red when value is below min", () => {
    expect(getColor(-5, 0, 100, "Produciendo")).toBe("red")
  })

  it("returns red when value is above max", () => {
    expect(getColor(150, 0, 100, "Produciendo")).toBe("red")
  })

  it("returns green when value is in the safe middle range", () => {
    expect(getColor(50, 0, 100, "Produciendo")).toBe("green")
  })

  it("returns orange when value is in warning zone (lower)", () => {
    expect(getColor(10, 0, 100, "Produciendo")).toBe("orange")
  })

  it("returns orange when value is in warning zone (upper)", () => {
    expect(getColor(90, 0, 100, "Produciendo")).toBe("orange")
  })

  it("returns green for exact midpoint", () => {
    expect(getColor(50, 0, 100, "Produciendo")).toBe("green")
  })
})
