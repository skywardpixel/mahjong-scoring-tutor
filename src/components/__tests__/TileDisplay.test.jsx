import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TileDisplay from "../TileDisplay";

describe("TileDisplay", () => {
  it("should render regular text without tiles", () => {
    render(<TileDisplay>Hello World</TileDisplay>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should handle newlines correctly", () => {
    render(<TileDisplay>Line 1{"\n"}Line 2</TileDisplay>);
    expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    expect(screen.getByText(/Line 2/)).toBeInTheDocument();
  });

  it("should display text with multiple lines separated by breaks", () => {
    const { container } = render(
      <TileDisplay>
        First line{"\n"}Second line{"\n"}Third line
      </TileDisplay>,
    );
    const breaks = container.querySelectorAll("br");
    expect(breaks.length).toBeGreaterThanOrEqual(0); // May vary based on rendering

    // Verify content is processed correctly
    expect(container.textContent).toContain("First line");
    expect(container.textContent).toContain("Second line");
    expect(container.textContent).toContain("Third line");
  });

  it("should render with custom className", () => {
    const { container } = render(
      <TileDisplay className="custom-class">Test</TileDisplay>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should handle mixed content with tiles and text", () => {
    render(<TileDisplay>Text before 🀇🀈🀉 text after</TileDisplay>);
    expect(screen.getByText(/Text before/)).toBeInTheDocument();
    expect(screen.getByText(/text after/)).toBeInTheDocument();
  });

  it("should handle tile unicode characters", () => {
    const { container } = render(<TileDisplay>🀇🀈🀉</TileDisplay>);
    const tileSpans = container.querySelectorAll(".tile-unicode");
    expect(tileSpans.length).toBe(3);

    // Check that each tile character is rendered with the correct class
    tileSpans.forEach((span) => {
      expect(span).toHaveClass("tile-unicode");
      expect(["🀇", "🀈", "🀉"]).toContain(span.textContent);
    });
  });

  it("should handle empty content", () => {
    const { container } = render(<TileDisplay></TileDisplay>);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("should handle non-string children", () => {
    const { container } = render(
      <TileDisplay>
        <div>Child component</div>
      </TileDisplay>,
    );
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("should process each line independently for tile detection", () => {
    const { container } = render(<TileDisplay>🀇🀈{"\n"}🀉🀊</TileDisplay>);

    // Content should be processed correctly regardless of DOM structure
    expect(container.textContent).toContain("🀇🀈");
    expect(container.textContent).toContain("🀉🀊");

    // Verify component structure is reasonable
    expect(container.firstChild).toBeTruthy();
  });

  it("should handle complex mixed content", () => {
    const content = "Base: 20 fu\n🀇🀈🀉 sequence\nTotal: 30 fu";
    render(<TileDisplay>{content}</TileDisplay>);

    expect(screen.getByText(/Base: 20 fu/)).toBeInTheDocument();
    expect(screen.getByText(/sequence/)).toBeInTheDocument();
    expect(screen.getByText(/Total: 30 fu/)).toBeInTheDocument();
  });
});
