import { LABEL_TEXT } from "./data";
import { PhotoView } from "./PhotoView";
import type { Label, Photo } from "./types";
import { Button, StepCard, StepFooter } from "./ui";

interface LabelStepProps {
  photos: Photo[];
  labels: Record<string, Label>;
  onLabel: (photoId: string, label: Label) => void;
  onBack: () => void;
  onNext: () => void;
}

const CARD_BORDER: Record<Label | "none", string> = {
  cat: "border-cat",
  notcat: "border-notcat",
  none: "border-line",
};

const CHOICE_SELECTED: Record<Label, string> = {
  cat: "bg-cat-soft text-cat",
  notcat: "bg-notcat-soft text-notcat",
};

const CHOICES: Label[] = ["cat", "notcat"];

export function LabelStep({ photos, labels, onLabel, onBack, onNext }: LabelStepProps) {
  const catCount = photos.filter((photo) => labels[photo.id] === "cat").length;
  const notCatCount = photos.filter((photo) => labels[photo.id] === "notcat").length;
  const remaining = photos.length - catCount - notCatCount;

  return (
    <StepCard title="Step 2: Tell the model what each photo is">
      <div className="flex flex-wrap gap-3" aria-live="polite">
        <span className="rounded-full bg-cat-soft px-4 py-[7px] text-[16px] font-bold text-cat">Cat: {catCount}</span>
        <span className="rounded-full bg-notcat-soft px-4 py-[7px] text-[16px] font-bold text-notcat">
          Not cat: {notCatCount}
        </span>
        <span className="rounded-full bg-pending-soft px-4 py-[7px] text-[16px] font-bold text-muted">
          Still to label: {remaining}
        </span>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3.5">
        {photos.map((photo, index) => {
          const label = labels[photo.id];
          return (
            <li
              key={photo.id}
              className={`overflow-hidden rounded-xl border-2 bg-white transition-colors ${CARD_BORDER[label ?? "none"]}`}
            >
              <PhotoView photo={photo} />
              <div role="group" aria-label={`Label photo ${index + 1}`} className="grid grid-cols-2 border-t border-line">
                {CHOICES.map((choice) => {
                  const selected = label === choice;
                  return (
                    <button
                      key={choice}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onLabel(photo.id, choice)}
                      className={`py-3 text-[16px] font-bold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                        choice === "notcat" ? "border-l border-line" : ""
                      } ${selected ? CHOICE_SELECTED[choice] : "bg-white text-ink hover:bg-canvas"}`}
                    >
                      {LABEL_TEXT[choice]}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <StepFooter>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        {remaining > 0 ? (
          <Button variant="locked">Label {remaining} more to continue</Button>
        ) : (
          <Button onClick={onNext}>Next: Train the model</Button>
        )}
      </StepFooter>
    </StepCard>
  );
}
