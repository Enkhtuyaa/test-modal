"use client";

import { useRef, useState, type DragEvent } from "react";
import { PhotoView } from "./PhotoView";
import type { UploadedPhoto } from "./types";
import { Button, InfoBox, StepCard, StepFooter } from "./ui";

interface UploadStepProps {
  uploads: UploadedPhoto[];
  onAddFiles: (files: File[]) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-12 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 15V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export function UploadStep({ uploads, onAddFiles, onRemove, onNext }: UploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    onAddFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <StepCard title="Step 1: Add your photos">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          onAddFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center rounded-2xl border-[3px] border-dashed px-5 py-9 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          dragging ? "border-accent bg-accent-soft/50" : "border-line bg-white hover:border-accent/50 hover:bg-canvas"
        }`}
      >
        <UploadIcon />
        <span className="mt-4 text-[20px] font-bold text-ink">Click to choose photos</span>
        <span className="mt-2 text-[17px] text-muted">You can pick many photos at once</span>
      </button>

      {uploads.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[15px] font-bold text-ink">
            {uploads.length} {uploads.length === 1 ? "photo" : "photos"} added
          </p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
            {uploads.map((photo) => (
              <li key={photo.id} className="relative overflow-hidden rounded-xl border-2 border-line">
                <PhotoView photo={photo} />
                <button
                  type="button"
                  onClick={() => onRemove(photo.id)}
                  aria-label={`Remove ${photo.name}`}
                  className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-white/90 text-[16px] font-bold leading-none text-ink shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-accent"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <InfoBox title="Why so many photos?">The model learns only from what you show it.</InfoBox>

      <StepFooter align="end">
        {uploads.length === 0 ? (
          <Button variant="locked">Add a photo to continue</Button>
        ) : (
          <Button onClick={onNext}>Next: Label photos</Button>
        )}
      </StepFooter>
    </StepCard>
  );
}
