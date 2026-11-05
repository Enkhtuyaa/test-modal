import type { Label, StepId, TestPhoto, Tone } from "./types";

export const STEPS: ReadonlyArray<{ id: StepId; label: string }> = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Label" },
  { id: 3, label: "Train" },
  { id: 4, label: "Test" },
];

export const LABEL_TEXT: Record<Label, string> = {
  cat: "Cat",
  notcat: "Not cat",
};

export const TONES: Record<Tone, { bg: string; fg: string }> = {
  orange: { bg: "#f8e4d6", fg: "#8a4a22" },
  green: { bg: "#e0eee5", fg: "#3a5c46" },
  blue: { bg: "#e1e6f8", fg: "#2c3778" },
  purple: { bg: "#efe2f2", fg: "#523566" },
};

export const TOTAL_ROUNDS = 10;

export const ROUND_DURATION_MS = 700;

/** Accuracy (%) the model reaches at the end of each round. */
export const ACCURACY_BY_ROUND: readonly number[] = [
  59, 67, 74, 79, 83, 86, 88, 90, 91, 92,
];

/** Photos the model has never seen, with the model's guesses. */
export const TEST_PHOTOS: TestPhoto[] = [
  { id: "test-1", art: "cat", tone: "orange", truth: "cat", guess: "cat", confidence: 87 },
  { id: "test-2", art: "dog", tone: "purple", truth: "notcat", guess: "cat", confidence: 61 },
  { id: "test-3", art: "mug", tone: "green", truth: "notcat", guess: "notcat", confidence: 93 },
  { id: "test-4", art: "cat", tone: "blue", truth: "cat", guess: "cat", confidence: 84 },
  { id: "test-5", art: "mug", tone: "purple", truth: "notcat", guess: "notcat", confidence: 90 },
  { id: "test-6", art: "dog", tone: "green", truth: "notcat", guess: "notcat", confidence: 72 },
];
