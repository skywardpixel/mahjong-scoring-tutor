import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CompletionScreen from "../CompletionScreen";
import { TOTAL_LESSONS } from "../../lessons/lessonData";

describe("CompletionScreen", () => {
  const mockOnRestart = vi.fn();
  const mockOnPractice = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render congratulations message", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText(`You've completed all ${TOTAL_LESSONS} lessons!`),
    ).toBeInTheDocument();
  });

  it("should render celebration icon", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(screen.getByText("🎉")).toBeInTheDocument();
  });

  it("should display skills learned list", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(screen.getByText("🧠 What You've Learned")).toBeInTheDocument();
    expect(
      screen.getByText(/Fu calculation and rounding rules/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Han system and yaku recognition/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Base point formula/)).toBeInTheDocument();
  });

  it("should display next steps section", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(screen.getByText("🚀 What's Next?")).toBeInTheDocument();
    expect(
      screen.getByText(/complete Japanese Mahjong scoring system/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Majsoul use standardized payment tables/),
    ).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(screen.getByText("🎯 Continue Practicing")).toBeInTheDocument();
    expect(screen.getByText("📚 Review Lessons")).toBeInTheDocument();
  });

  it("should call onPractice when Continue Practicing button is clicked", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    const practiceButton = screen.getByText("🎯 Continue Practicing");
    fireEvent.click(practiceButton);

    expect(mockOnPractice).toHaveBeenCalledTimes(1);
    expect(mockOnRestart).not.toHaveBeenCalled();
  });

  it("should call onRestart when Review Lessons button is clicked", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    const restartButton = screen.getByText("📚 Review Lessons");
    fireEvent.click(restartButton);

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
    expect(mockOnPractice).not.toHaveBeenCalled();
  });

  it("should have proper CSS classes for styling", () => {
    const { container } = render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    expect(container.querySelector(".lesson-container")).toBeInTheDocument();
    expect(container.querySelector(".completion-screen")).toBeInTheDocument();
    expect(container.querySelector(".completion-header")).toBeInTheDocument();
    expect(container.querySelector(".completion-content")).toBeInTheDocument();
    expect(container.querySelector(".completion-actions")).toBeInTheDocument();
  });

  it("should have accessible button structure", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    buttons.forEach((button) => {
      expect(button).toHaveClass("button");
    });
  });

  it("should display all skill items", () => {
    render(
      <CompletionScreen
        onRestart={mockOnRestart}
        onPractice={mockOnPractice}
      />,
    );

    const skillItems = screen
      .getByText(/Fu calculation/)
      .closest("ul")
      .querySelectorAll("li");
    expect(skillItems).toHaveLength(10);

    skillItems.forEach((item) => {
      expect(item.textContent).toMatch(/✅/);
    });
  });
});
