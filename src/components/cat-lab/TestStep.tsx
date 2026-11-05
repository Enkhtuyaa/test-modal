"use client";

import { useState } from "react";
import { LABEL_TEXT, TEST_PHOTOS } from "./data";
import { PhotoArt } from "./PhotoView";
import { ProgressBar, StepCard } from "./ui";

export function TestStep() {
  const [selectedId, setSelectedId] = useState(TEST_PHOTOS[0].id);
  const selected = TEST_PHOTOS.find((photo) => photo.id === selectedId) ?? TEST_PHOTOS[0];
  const correct = TEST_PHOTOS.filter((photo) => photo.guess === photo.truth).length;
  const guessedCat = selected.guess === "cat";

  return (
    <StepCard title="Step 4: Test with new photos">
      <div className="mt-2 text-center">
        <p className="font-display text-[48px] font-bold leading-none text-ink sm:text-[56px]">
          {correct} / {TEST_PHOTOS.length}
        </p>
        <p className="mt-3 text-[18px] text-muted">test photos right</p>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3.5">
        {TEST_PHOTOS.map((photo, index) => {
          const right = photo.guess === photo.truth;
          return (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => setSelectedId(photo.id)}
                aria-pressed={photo.id === selected.id}
                aria-label={`Test photo ${index + 1}: ${right ? "right" : "wrong"}, guessed ${LABEL_TEXT[photo.guess]}`}
                className={`block w-full overflow-hidden rounded-xl border-2 bg-white text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  right ? "border-notcat" : "border-wrong"
                }`}
              >
                <PhotoArt art={photo.art} tone={photo.tone} />
                <span className="block border-t border-line px-4 py-3 text-[16px] leading-6">
                  <span className={`block font-bold ${right ? "text-notcat" : "text-wrong"}`}>
                    {right ? "Right" : "Wrong"}
                  </span>
                  <span className="block text-ink">Guessed: {LABEL_TEXT[photo.guess]}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8" aria-live="polite">
        <div className="w-40 shrink-0 overflow-hidden rounded-xl border-2 border-line">
          <PhotoArt art={selected.art} tone={selected.tone} />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-[18px] text-muted">The model thinks this is</p>
          <p className={`font-display text-[30px] font-bold leading-tight ${guessedCat ? "text-cat" : "text-notcat"}`}>
            {guessedCat ? "A cat" : "Not a cat"}
          </p>
          <ProgressBar
            percent={selected.confidence}
            label="How sure the model is"
            fillClassName={guessedCat ? "bg-cat" : "bg-notcat"}
          />
          <p className="text-[18px] text-muted">It is {selected.confidence}% sure.</p>
        </div>
      </div>
    </StepCard>
  );
}
