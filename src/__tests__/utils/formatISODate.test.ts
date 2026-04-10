import { describe, it, expect } from "vitest";
import { formatISODate } from "@/lib/formatISODate";

describe("formatISODate", () => {
  it("should format a date to ISO string format (YYYY-MM-DD)", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    const result = formatISODate(date);
    expect(result).toBe("2024-01-15");
  });

  it("should handle dates from different months", () => {
    const date = new Date("2024-12-25T23:59:59Z");
    const result = formatISODate(date);
    expect(result).toBe("2024-12-25");
  });

  it("should format single digit months and days with leading zeros", () => {
    const date = new Date("2024-03-05T12:00:00Z");
    const result = formatISODate(date);
    expect(result).toBe("2024-03-05");
  });

  it("should work with date objects created from various constructors", () => {
    const date = new Date(2024, 0, 1);
    const result = formatISODate(date);
    expect(result).toMatch(/2024-01-01/);
  });

  it("should handle leap year dates", () => {
    const date = new Date("2024-02-29T00:00:00Z");
    const result = formatISODate(date);
    expect(result).toBe("2024-02-29");
  });
});
