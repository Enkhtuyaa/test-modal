import { STEPS } from "./data";
import type { StepId } from "./types";

type StepState = "active" | "done" | "todo";

const CIRCLE_CLASSES: Record<StepState, string> = {
  active: "border-accent bg-accent text-white",
  done: "border-accent bg-accent-soft text-accent",
  todo: "border-line bg-white text-muted",
};

interface StepperProps {
  current: StepId;
  reachable: Record<StepId, boolean>;
  onSelect: (step: StepId) => void;
}

export function Stepper({ current, reachable, onSelect }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol className="grid grid-cols-4">
        {STEPS.map((step) => {
          const state: StepState = step.id === current ? "active" : step.id < current ? "done" : "todo";
          const clickable = step.id !== current && reachable[step.id];
          return (
            <li key={step.id} className="flex justify-center">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onSelect(step.id)}
                aria-current={state === "active" ? "step" : undefined}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent enabled:cursor-pointer enabled:hover:opacity-80"
              >
                <span
                  className={`grid size-11 place-items-center rounded-full border-2 font-display text-[18px] font-semibold transition-colors ${CIRCLE_CLASSES[state]}`}
                >
                  {step.id}
                </span>
                <span className={`text-[15px] font-bold sm:text-[16px] ${state === "active" ? "text-ink" : "text-muted"}`}>
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
