"use client";

interface Props {
  scores: Record<string, number>; // 0-100
  labels: Record<string, string>;
  keys: string[];
  color: string; // hex e.g. "#e91e8c"
}

const CX = 160;
const CY = 160;
const R = 110;
const LABEL_R = 142;
const LEVELS = [20, 40, 60, 80, 100];

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function GenericRadarChart({ scores, labels, keys, color }: Props) {
  const n = keys.length;
  const angleStep = 360 / n;

  function gridPoints(level: number) {
    return keys
      .map((_, i) => {
        const { x, y } = polarToXY(i * angleStep, (R * level) / 100);
        return `${x},${y}`;
      })
      .join(" ");
  }

  const dataPoints = keys
    .map((key, i) => {
      const val = scores[key] ?? 0;
      const { x, y } = polarToXY(i * angleStep, (R * val) / 100);
      return `${x},${y}`;
    })
    .join(" ");

  const fillColor = hexToRgba(color, 0.18);

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-sm mx-auto">
      {LEVELS.map((level) => (
        <polygon
          key={level}
          points={gridPoints(level)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {keys.map((_, i) => {
        const end = polarToXY(i * angleStep, R);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={dataPoints}
        fill={fillColor}
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {keys.map((key, i) => {
        const val = scores[key] ?? 0;
        const { x, y } = polarToXY(i * angleStep, (R * val) / 100);
        return <circle key={key} cx={x} cy={y} r={4} fill={color} />;
      })}

      {keys.map((key, i) => {
        const angle = i * angleStep;
        const { x, y } = polarToXY(angle, LABEL_R);
        const textAnchor =
          Math.abs(angle % 360 - 180) < 10
            ? "middle"
            : x < CX - 10
            ? "end"
            : x > CX + 10
            ? "start"
            : "middle";
        const dy = y < CY - 10 ? -4 : y > CY + 10 ? 14 : 5;
        return (
          <text
            key={key}
            x={x}
            y={y + dy}
            textAnchor={textAnchor}
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
            fontWeight="600"
          >
            {labels[key] ?? key}
          </text>
        );
      })}
    </svg>
  );
}
