import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApplicationPipelineValue } from "@/components/stats/application-pipeline-value";

describe("ApplicationPipelineValue", () => {
  it("should render with correct title and value", () => {
    render(<ApplicationPipelineValue title="Applied" value={42} />);

    expect(screen.getByText("Applied")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should render zero value correctly", () => {
    render(<ApplicationPipelineValue title="Offer" value={0} />);

    expect(screen.getByText("Offer")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render large numbers correctly", () => {
    render(<ApplicationPipelineValue title="Total" value={1000} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    const { container } = render(
      <ApplicationPipelineValue title="Test" value={5} />
    );

    const card = container.querySelector(".w-full");
    expect(card).toBeInTheDocument();
  });

  it("should render title with font-normal class", () => {
    render(<ApplicationPipelineValue title="Status" value={10} />);

    const title = screen.getByText("Status");
    expect(title).toHaveClass("font-normal");
  });

  it("should render value with font-semibold class", () => {
    render(<ApplicationPipelineValue title="Count" value={25} />);

    const value = screen.getByText("25");
    expect(value).toHaveClass("font-semibold");
  });
});
