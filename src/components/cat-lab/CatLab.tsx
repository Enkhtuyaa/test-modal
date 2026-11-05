"use client";

import { useEffect, useState } from "react";
import { ROUND_DURATION_MS, TOTAL_ROUNDS } from "./data";
import { LabelStep } from "./LabelStep";
import { Stepper } from "./Stepper";
import { TestStep } from "./TestStep";
import { TrainStep } from "./TrainStep";
import type { Label, Photo, StepId, UploadedPhoto } from "./types";
import { UploadStep } from "./UploadStep";

export default function CatLab() {
  const [step, setStep] = useState<StepId>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [labels, setLabels] = useState<Record<string, Label>>({});
  const [trainingStarted, setTrainingStarted] = useState(false);
  const [round, setRound] = useState(0);

  const isTraining = trainingStarted && round < TOTAL_ROUNDS;
  const isTrained = trainingStarted && round >= TOTAL_ROUNDS;
  const unlabeledCount = photos.filter((photo) => !labels[photo.id]).length;
  const uploads = photos.filter((photo): photo is UploadedPhoto => photo.source === "upload");

  // Advance one training round at a time until all rounds are done.
  useEffect(() => {
    if (!isTraining) return;
    const timer = window.setTimeout(() => setRound((r) => r + 1), ROUND_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [isTraining, round]);

  const reachable: Record<StepId, boolean> = {
    1: true,
    2: photos.length > 0,
    3: photos.length > 0 && unlabeledCount === 0,
    4: isTrained,
  };

  const goTo = (target: StepId) => {
    if (reachable[target]) setStep(target);
  };

  // Any change to the training data makes the old model out of date.
  const resetTraining = () => {
    setTrainingStarted(false);
    setRound(0);
  };

  const addFiles = (files: File[]) => {
    const stamp = Date.now();
    const added: UploadedPhoto[] = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file, index) => ({
        id: `upload-${stamp}-${index}`,
        source: "upload",
        url: URL.createObjectURL(file),
        name: file.name,
      }));
    if (added.length === 0) return;
    setPhotos((prev) => [...prev, ...added]);
    resetTraining();
  };

  const removePhoto = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo?.source === "upload") URL.revokeObjectURL(photo.url);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setLabels((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    resetTraining();
  };

  const setLabel = (id: string, label: Label) => {
    if (labels[id] === label) return;
    setLabels((prev) => ({ ...prev, [id]: label }));
    resetTraining();
  };

  const startTraining = () => {
    setRound(0);
    setTrainingStarted(true);
  };

  return (
    <div className="w-full max-w-[1144px] rounded-[20px] border border-edge bg-canvas px-3 pb-3 pt-6 sm:px-7 sm:pb-7 sm:pt-8">
      <Stepper current={step} reachable={reachable} onSelect={goTo} />

      <div className="mt-6">
        {step === 1 && (
          <UploadStep uploads={uploads} onAddFiles={addFiles} onRemove={removePhoto} onNext={() => goTo(2)} />
        )}
        {step === 2 && (
          <LabelStep
            photos={photos}
            labels={labels}
            onLabel={setLabel}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        )}
        {step === 3 && (
          <TrainStep
            round={round}
            isTraining={isTraining}
            isTrained={isTrained}
            onStart={startTraining}
            onBack={() => goTo(2)}
            onNext={() => goTo(4)}
          />
        )}
        {step === 4 && <TestStep />}
      </div>
    </div>
  );
}
