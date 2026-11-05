export type StepId = 1 | 2 | 3 | 4;

export type Label = "cat" | "notcat";

export type ArtKind = "cat" | "dog" | "mug";

export type Tone = "orange" | "green" | "blue" | "purple";

export interface SamplePhoto {
  id: string;
  source: "sample";
  art: ArtKind;
  tone: Tone;
}

export interface UploadedPhoto {
  id: string;
  source: "upload";
  url: string;
  name: string;
}

export type Photo = SamplePhoto | UploadedPhoto;

export interface TestPhoto {
  id: string;
  art: ArtKind;
  tone: Tone;
  truth: Label;
  guess: Label;
  /** How sure the model is about its guess, 0–100. */
  confidence: number;
}
