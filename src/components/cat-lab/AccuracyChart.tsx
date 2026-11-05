import { TOTAL_ROUNDS } from "./data";

const WIDTH = 720;
const HEIGHT = 330;
const PLOT_LEFT = 80;
const PLOT_RIGHT = 676;
const PLOT_TOP = 22;
const PLOT_BOTTOM = 262;

const Y_TICKS = [100, 50, 0];
const X_TICKS = [1, 5, TOTAL_ROUNDS];

const xForRound = (round: number) => PLOT_LEFT + ((round - 1) * (PLOT_RIGHT - PLOT_LEFT)) / (TOTAL_ROUNDS - 1);
const yForPercent = (percent: number) => PLOT_BOTTOM - (percent / 100) * (PLOT_BOTTOM - PLOT_TOP);

/** Line chart of accuracy (%) per finished round. */
export function AccuracyChart({ values }: { values: readonly number[] }) {
  const points = values.map((value, index) => ({ x: xForRound(index + 1), y: yForPercent(value) }));
  const last = points.at(-1);
  const summary =
    values.length > 0
      ? `Accuracy after round ${values.length}: ${values[values.length - 1]}%`
      : "Accuracy chart. Training has not started yet.";

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label={summary}>
      {Y_TICKS.map((tick) => (
        <g key={tick}>
          <line
            x1={PLOT_LEFT}
            x2={PLOT_RIGHT}
            y1={yForPercent(tick)}
            y2={yForPercent(tick)}
            stroke="var(--color-edge)"
            strokeWidth={1.2}
          />
          <text
            x={PLOT_LEFT - 14}
            y={yForPercent(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="var(--color-muted)"
            fontSize={18}
          >
            {tick}%
          </text>
        </g>
      ))}

      {X_TICKS.map((round) => (
        <text key={round} x={xForRound(round)} y={HEIGHT - 14} textAnchor="middle" fill="var(--color-muted)" fontSize={18}>
          round {round}
        </text>
      ))}

      {points.length > 1 && (
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {last && <circle cx={last.x} cy={last.y} r={8} fill="var(--color-accent)" />}
    </svg>
  );
}
