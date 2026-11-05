import { AccuracyChart } from "./AccuracyChart";
import { ACCURACY_BY_ROUND, TOTAL_ROUNDS } from "./data";
import { Button, InfoBox, ProgressBar, StepCard, StepFooter } from "./ui";

interface TrainStepProps {
  round: number;
  isTraining: boolean;
  isTrained: boolean;
  onStart: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function TrainStep({ round, isTraining, isTrained, onStart, onBack, onNext }: TrainStepProps) {
  const buttonText = isTraining ? "Training..." : isTrained ? "Train again" : "Start training";

  return (
    <StepCard title="Step 3: Train the model">
      <div className="flex flex-col items-center">
        <Button size="lg" onClick={onStart} disabled={isTraining} aria-busy={isTraining} className="disabled:cursor-progress">
          {buttonText}
        </Button>
        <p className="mt-6 text-[16px] text-muted">Round</p>
        <p className="mt-2 font-display text-[44px] font-bold leading-none text-ink sm:text-[52px]" aria-live="polite">
          {round} / {TOTAL_ROUNDS}
        </p>
      </div>

      <ProgressBar percent={(round / TOTAL_ROUNDS) * 100} label="Training progress" />

      <AccuracyChart values={ACCURACY_BY_ROUND.slice(0, round)} />

      <InfoBox title="What is happening?">
        After each round the model checks its guesses and fixes itself a little.
      </InfoBox>

      {!isTraining && (
        <StepFooter>
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          {isTrained ? (
            <Button onClick={onNext}>Next: Test the model</Button>
          ) : (
            <Button variant="locked">Train the model to continue</Button>
          )}
        </StepFooter>
      )}
    </StepCard>
  );
}
