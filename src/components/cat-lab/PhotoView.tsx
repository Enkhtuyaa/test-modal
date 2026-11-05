import Image from "next/image";
import { TONES } from "./data";
import type { ArtKind, Photo, Tone } from "./types";

function ArtShape({ art }: { art: ArtKind }) {
  switch (art) {
    case "cat":
      return (
        <>
          <path d="M34 31 L43 40 H57 L66 31 V55 A16 16 0 0 1 34 55 Z" fill="currentColor" />
          <circle cx="44" cy="50" r="2.6" fill="#fff" />
          <circle cx="56" cy="50" r="2.6" fill="#fff" />
          <path d="M47.6 57 H52.4 L50 59.8 Z" fill="#fff" />
        </>
      );
    case "dog":
      return (
        <>
          <ellipse cx="35" cy="47" rx="6" ry="10" transform="rotate(20 35 47)" fill="currentColor" />
          <ellipse cx="65" cy="47" rx="6" ry="10" transform="rotate(-20 65 47)" fill="currentColor" />
          <circle cx="50" cy="51" r="15" fill="currentColor" />
          <circle cx="45" cy="48" r="2.6" fill="#fff" />
          <circle cx="55" cy="48" r="2.6" fill="#fff" />
          <ellipse cx="50" cy="56.5" rx="4.2" ry="3.2" fill="#fff" />
        </>
      );
    case "mug":
      return (
        <>
          <circle cx="60" cy="43" r="6.5" fill="none" stroke="currentColor" strokeWidth="4.5" />
          <rect x="35" y="34" width="24" height="30" rx="3" fill="currentColor" />
        </>
      );
  }
}

export function PhotoArt({ art, tone, className = "" }: { art: ArtKind; tone: Tone; className?: string }) {
  const { bg, fg } = TONES[tone];
  return (
    <div className={`aspect-square w-full ${className}`} style={{ backgroundColor: bg, color: fg }}>
      <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
        <ArtShape art={art} />
      </svg>
    </div>
  );
}

export function PhotoView({ photo, className = "" }: { photo: Photo; className?: string }) {
  if (photo.source === "sample") {
    return <PhotoArt art={photo.art} tone={photo.tone} className={className} />;
  }
  return (
    <div className={`relative aspect-square w-full bg-canvas ${className}`}>
      <Image src={photo.url} alt={photo.name} fill sizes="200px" className="object-cover" />
    </div>
  );
}
