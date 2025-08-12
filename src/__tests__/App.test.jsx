import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { TOTAL_LESSONS } from "../lessons/lessonData";

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("App Integration", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();

    // Reset mock implementation to return null (no stored data)
    mockLocalStorage.getItem.mockImplementation((key) => null);
  });

  it("should render app header and navigation", () => {
    render(<App />);

    expect(screen.getByText("🀄 Mahjong Scoring Tutor")).toBeInTheDocument();
    expect(screen.getByText("📚 Lessons")).toBeInTheDocument();
    expect(screen.getByText("🎯 Practice")).toBeInTheDocument();
  });

  it("should start with lessons mode and first lesson", () => {
    render(<App />);

    expect(screen.getByText("📚 Lessons")).toHaveClass("active");
    expect(screen.getByText("Introduction to Fu (符)")).toBeInTheDocument();
    expect(screen.getByText("Lesson 1")).toBeInTheDocument();
  });

  it("should switch to practice mode when practice button is clicked", () => {
    render(<App />);

    const practiceButton = screen.getByText("🎯 Practice");
    fireEvent.click(practiceButton);

    expect(practiceButton).toHaveClass("active");
    expect(screen.getByText("🎯 Scoring Practice")).toBeInTheDocument();
  });

  it("should switch back to lessons mode", () => {
    render(<App />);

    // Switch to practice
    const practiceButton = screen.getByText("🎯 Practice");
    fireEvent.click(practiceButton);

    // Switch back to lessons
    const lessonsButton = screen.getByText("📚 Lessons");
    fireEvent.click(lessonsButton);

    expect(lessonsButton).toHaveClass("active");
    expect(screen.getByText("Introduction to Fu (符)")).toBeInTheDocument();
  });

  it("should show lesson selector in lessons mode", () => {
    render(<App />);

    expect(screen.getByText(/📚 Lessons \(/)).toBeInTheDocument();
  });

  it("should not show lesson selector in practice mode", () => {
    render(<App />);

    const practiceButton = screen.getByText("🎯 Practice");
    fireEvent.click(practiceButton);

    expect(screen.queryByText(/📚 Lessons \(/)).not.toBeInTheDocument();
  });

  it("should persist current lesson in localStorage", () => {
    render(<App />);

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      "mahjong-current-lesson",
    );
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      "mahjong-completed-lessons",
    );
  });

  it("should show completion screen when all lessons are completed", () => {
    // Mock completed lessons
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "mahjong-completed-lessons") {
        return JSON.stringify(
          Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1),
        );
      }
      if (key === "mahjong-current-lesson") {
        return TOTAL_LESSONS.toString();
      }
      return null;
    });

    render(<App />);

    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText(`You've completed all ${TOTAL_LESSONS} lessons!`),
    ).toBeInTheDocument();
  });

  it("should have proper responsive structure", () => {
    const { container } = render(<App />);

    expect(container.querySelector(".app")).toBeInTheDocument();
    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.querySelector(".app-controls")).toBeInTheDocument();
  });

  it("should handle mode switching with proper state management", () => {
    render(<App />);

    const lessonsButton = screen.getByText("📚 Lessons");
    const practiceButton = screen.getByText("🎯 Practice");

    // Initial state
    expect(lessonsButton).toHaveClass("active");
    expect(practiceButton).not.toHaveClass("active");

    // Switch to practice
    fireEvent.click(practiceButton);
    expect(practiceButton).toHaveClass("active");
    expect(lessonsButton).not.toHaveClass("active");

    // Switch back to lessons
    fireEvent.click(lessonsButton);
    expect(lessonsButton).toHaveClass("active");
    expect(practiceButton).not.toHaveClass("active");
  });

  it("should render lesson content properly", () => {
    render(<App />);

    // Check first lesson content (using more flexible text matching)
    expect(screen.getByText(/Fu are base points/)).toBeInTheDocument();
    expect(screen.getByText(/Basic ron hand/)).toBeInTheDocument();
    expect(screen.getByText("Take Quiz")).toBeInTheDocument();
  });

  it("should handle lesson navigation", () => {
    render(<App />);

    // Should not show Previous button on first lesson
    expect(screen.queryByText("← Previous")).not.toBeInTheDocument();

    // Should show Take Quiz button
    expect(screen.getByText("Take Quiz")).toBeInTheDocument();
  });

  it("should maintain lesson state correctly", () => {
    render(<App />);

    // Verify initial lesson state (using more flexible text matching)
    expect(screen.getByText("Lesson 1")).toBeInTheDocument();
    expect(screen.getByText("Introduction to Fu (符)")).toBeInTheDocument();
  });
});
