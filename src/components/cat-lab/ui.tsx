import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "locked";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white enabled:hover:bg-accent-hover",
  secondary: "border-2 border-line bg-white text-ink enabled:hover:bg-canvas",
  locked: "bg-line text-muted cursor-not-allowed",
};

const SIZE_CLASSES: Record<ButtonSize, Record<"plain" | "bordered", string>> = {
  md: { plain: "px-[26px] py-[14px] text-[17px]", bordered: "px-[24px] py-[12px] text-[17px]" },
  lg: { plain: "px-[34px] py-[18px] text-[19px]", bordered: "px-[32px] py-[16px] text-[19px]" },
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const sizing = SIZE_CLASSES[size][variant === "secondary" ? "bordered" : "plain"];
  return (
    <button
      type={type}
      disabled={variant === "locked" ? true : disabled}
      className={`rounded-xl font-bold leading-[1.6] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${sizing} ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    />
  );
}

export function StepCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-edge bg-white p-5 sm:p-7">
      <h2 className="font-display text-[24px] font-bold leading-tight text-ink sm:text-[28px]">{title}</h2>
      {children}
    </section>
  );
}

export function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <p className="rounded-xl bg-accent-soft px-[18px] py-4 text-[15px] leading-6 text-ink">
      <strong className="font-extrabold">{title}</strong> {children}
    </p>
  );
}

export function ProgressBar({
  percent,
  label,
  fillClassName = "bg-accent",
}: {
  percent: number;
  label: string;
  fillClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className="h-3.5 w-full overflow-hidden rounded-[7px] border border-edge bg-pending-soft"
    >
      <div
        className={`h-full rounded-[7px] transition-[width] duration-500 ease-out ${fillClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function StepFooter({ children, align = "between" }: { children: ReactNode; align?: "between" | "end" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${align === "end" ? "justify-end" : "justify-between"}`}>
      {children}
    </div>
  );
}
