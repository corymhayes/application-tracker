import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/table/status-badge";

describe("StatusBadge", () => {
  it("should render Applied status with correct styling", () => {
    render(<StatusBadge status="Applied" />);
    const badge = screen.getByText("Applied");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-yellow-950", "text-yellow-400");
  });

  it("should render Recruiter Screen status with correct styling", () => {
    render(<StatusBadge status="Recruiter Screen" />);
    const badge = screen.getByText("Recruiter Screen");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-purple-950", "text-purple-400");
  });

  it("should render Initial Interview status with correct styling", () => {
    render(<StatusBadge status="Initial Interview" />);
    const badge = screen.getByText("Initial Interview");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-pink-950", "text-pink-400");
  });

  it("should render Technical Interview status with correct styling", () => {
    render(<StatusBadge status="Technical Interview" />);
    const badge = screen.getByText("Technical Interview");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-blue-950", "text-blue-400");
  });

  it("should render Final Interview status with correct styling", () => {
    render(<StatusBadge status="Final Interview" />);
    const badge = screen.getByText("Final Interview");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-indigo-950", "text-indigo-400");
  });

  it("should render Offer status with correct styling", () => {
    render(<StatusBadge status="Offer" />);
    const badge = screen.getByText("Offer");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-950", "text-green-400");
  });

  it("should render Rejected status with correct styling", () => {
    render(<StatusBadge status="Rejected" />);
    const badge = screen.getByText("Rejected");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-950", "text-red-400");
  });

  it("should render Withdrawn status with correct styling", () => {
    render(<StatusBadge status="Withdrawn" />);
    const badge = screen.getByText("Withdrawn");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-zinc-300/25", "text-zinc-400");
  });

  it("should render unknown status with default styling", () => {
    render(<StatusBadge status="UnknownStatus" />);
    const badge = screen.getByText("UnknownStatus");
    expect(badge).toBeInTheDocument();
  });
});
