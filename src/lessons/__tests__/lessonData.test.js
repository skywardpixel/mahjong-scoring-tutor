import { describe, it, expect } from "vitest";
import {
  lessons,
  TOTAL_LESSONS,
  getLessonById,
  getNextLesson,
  getPreviousLesson,
} from "../lessonData";

describe("lessonData", () => {
  describe("lessons array", () => {
    it("should contain the correct number of lessons", () => {
      expect(lessons).toHaveLength(TOTAL_LESSONS);
    });

    it("should have sequential lesson IDs", () => {
      for (let i = 0; i < lessons.length; i++) {
        expect(lessons[i].id).toBe(i + 1);
      }
    });

    it("should have required lesson structure", () => {
      lessons.forEach((lesson) => {
        expect(lesson).toHaveProperty("id");
        expect(lesson).toHaveProperty("title");
        expect(lesson).toHaveProperty("type");
        expect(lesson).toHaveProperty("content");
        expect(lesson).toHaveProperty("quiz");

        expect(typeof lesson.id).toBe("number");
        expect(typeof lesson.title).toBe("string");
        expect(["concept", "practice"]).toContain(lesson.type);

        // Content structure
        expect(lesson.content).toHaveProperty("text");
        expect(lesson.content).toHaveProperty("visual");
        expect(lesson.content).toHaveProperty("keyPoint");

        // Quiz structure
        expect(lesson.quiz).toHaveProperty("question");
        expect(lesson.quiz).toHaveProperty("options");
        expect(lesson.quiz).toHaveProperty("correct");
        expect(Array.isArray(lesson.quiz.options)).toBe(true);
        expect(lesson.quiz.options).toHaveLength(3);
        expect(typeof lesson.quiz.correct).toBe("number");
        expect(lesson.quiz.correct).toBeGreaterThanOrEqual(0);
        expect(lesson.quiz.correct).toBeLessThan(3);
      });
    });

    it("should have non-empty titles", () => {
      lessons.forEach((lesson) => {
        expect(lesson.title.trim()).toBeTruthy();
      });
    });

    it("should have non-empty content text", () => {
      lessons.forEach((lesson) => {
        expect(lesson.content.text.trim()).toBeTruthy();
        expect(lesson.content.visual.trim()).toBeTruthy();
        expect(lesson.content.keyPoint.trim()).toBeTruthy();
      });
    });

    it("should have valid quiz questions and options", () => {
      lessons.forEach((lesson) => {
        expect(lesson.quiz.question.trim()).toBeTruthy();
        lesson.quiz.options.forEach((option) => {
          expect(option.trim()).toBeTruthy();
        });
      });
    });
  });

  describe("getLessonById", () => {
    it("should return correct lesson for valid ID", () => {
      const lesson = getLessonById(1);
      expect(lesson.id).toBe(1);
      expect(lesson.title).toBe("Introduction to Fu (符)");
    });

    it("should return correct lesson for middle ID", () => {
      const lesson = getLessonById(8);
      expect(lesson.id).toBe(8);
      expect(lesson.title).toBe("Point Transfer (Tsumo)");
    });

    it("should return correct lesson for last ID", () => {
      const lesson = getLessonById(TOTAL_LESSONS);
      expect(lesson.id).toBe(TOTAL_LESSONS);
      expect(lesson.title).toBe("Complete Dora Scoring Integration");
    });

    it("should return undefined for invalid ID", () => {
      expect(getLessonById(0)).toBeUndefined();
      expect(getLessonById(TOTAL_LESSONS + 1)).toBeUndefined();
      expect(getLessonById(-1)).toBeUndefined();
    });
  });

  describe("getNextLesson", () => {
    it("should return next lesson for valid ID", () => {
      const nextLesson = getNextLesson(1);
      expect(nextLesson.id).toBe(2);
    });

    it("should return next lesson for middle ID", () => {
      const nextLesson = getNextLesson(8);
      expect(nextLesson.id).toBe(9);
    });

    it("should return undefined for last lesson", () => {
      const nextLesson = getNextLesson(TOTAL_LESSONS);
      expect(nextLesson).toBeUndefined();
    });

    it("should return undefined for invalid ID", () => {
      expect(getNextLesson(0)).toBeUndefined();
      expect(getNextLesson(TOTAL_LESSONS + 1)).toBeUndefined();
    });
  });

  describe("getPreviousLesson", () => {
    it("should return undefined for first lesson", () => {
      const prevLesson = getPreviousLesson(1);
      expect(prevLesson).toBeUndefined();
    });

    it("should return previous lesson for valid ID", () => {
      const prevLesson = getPreviousLesson(2);
      expect(prevLesson.id).toBe(1);
    });

    it("should return previous lesson for last ID", () => {
      const prevLesson = getPreviousLesson(TOTAL_LESSONS);
      expect(prevLesson.id).toBe(TOTAL_LESSONS - 1);
    });

    it("should return undefined for invalid ID", () => {
      expect(getPreviousLesson(0)).toBeUndefined();
      expect(getPreviousLesson(TOTAL_LESSONS + 1)).toBeUndefined();
    });
  });

  describe("Educational content validation", () => {
    it("should have correct quiz answers for key lessons", () => {
      // Lesson 1: Minimum fu
      const lesson1 = getLessonById(1);
      expect(lesson1.quiz.options).toContain("30 fu");
      expect(lesson1.quiz.options[lesson1.quiz.correct]).toBe("30 fu");

      // Lesson 6: Scoring formula
      const lesson6 = getLessonById(6);
      expect(lesson6.quiz.options).toContain("120 points");
      expect(lesson6.quiz.options[lesson6.quiz.correct]).toBe("120 points");
    });

    it("should have progressive difficulty in lesson types", () => {
      const conceptLessons = lessons.filter((l) => l.type === "concept");
      const practiceLessons = lessons.filter((l) => l.type === "practice");

      expect(conceptLessons.length).toBeGreaterThan(0);
      expect(practiceLessons.length).toBeGreaterThan(0);

      // First few lessons should be concepts
      expect(lessons[0].type).toBe("concept");
      expect(lessons[1].type).toBe("concept");
    });

    it("should have comprehensive dora lessons at the end", () => {
      // Check that dora lessons exist and have proper content
      const doraLessons = lessons.filter((l) =>
        l.title.toLowerCase().includes("dora"),
      );
      expect(doraLessons.length).toBeGreaterThanOrEqual(8); // Should have multiple dora lessons

      // Check specific new dora lessons
      const uraDoraLesson = getLessonById(21);
      expect(uraDoraLesson.title).toBe("Ura Dora Mechanics");
      expect(uraDoraLesson.content.text).toContain("riichi");

      const kanDoraLesson = getLessonById(22);
      expect(kanDoraLesson.title).toBe("Kan Dora Rules and Timing");
      expect(kanDoraLesson.content.text).toContain("kan");

      const integrationLesson = getLessonById(TOTAL_LESSONS);
      expect(integrationLesson.title).toBe("Complete Dora Scoring Integration");
      expect(integrationLesson.type).toBe("practice");
    });
  });
});
