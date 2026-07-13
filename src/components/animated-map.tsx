import { motion } from "framer-motion";

/**
 * Animated map connections between hospital nodes — SVG based.
 * Renders a stylized India map silhouette + animated connection arcs.
 */
export function AnimatedMap({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 240, y: 180, label: "Delhi" },
    { x: 320, y: 340, label: "Mumbai" },
    { x: 470, y: 470, label: "Chennai" },
    { x: 520, y: 380, label: "Hyderabad" },
    { x: 610, y: 260, label: "Kolkata" },
    { x: 380, y: 260, label: "Bhopal" },
    { x: 430, y: 400, label: "Bengaluru" },
    { x: 300, y: 240, label: "Jaipur" },
    { x: 560, y: 200, label: "Patna" },
    { x: 450, y: 300, label: "Nagpur" },
  ];

  const connections: [number, number][] = [
    [0, 5], [0, 8], [0, 7], [5, 9], [9, 3], [3, 6], [6, 2], [8, 4], [4, 9], [1, 5], [1, 9], [7, 5],
  ];

  return (
    <svg viewBox="0 0 800 640" className={className} aria-hidden>
      <defs>
        <linearGradient id="link" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.16 240)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.7 0.16 240)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.68 0.24 25)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="node">
          <stop offset="0%" stopColor="oklch(0.9 0.05 240)" />
          <stop offset="100%" stopColor="oklch(0.55 0.18 250)" />
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>

      {/* subcontinent silhouette (stylized) */}
      <path
        d="M280 90 C 350 80, 470 90, 560 130 C 640 165, 660 230, 640 300 C 625 360, 570 400, 540 460 C 510 520, 460 560, 420 560 C 380 560, 340 500, 320 460 C 300 420, 260 400, 240 360 C 215 310, 220 250, 240 200 C 255 160, 250 110, 280 90 Z"
        fill="none"
        stroke="oklch(0.7 0.16 240 / 0.25)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />

      {/* grid dots */}
      {Array.from({ length: 20 }).map((_, i) =>
        Array.from({ length: 16 }).map((__, j) => (
          <circle
            key={`${i}-${j}`}
            cx={80 + i * 34}
            cy={40 + j * 36}
            r="0.6"
            fill="oklch(0.7 0.16 240 / 0.25)"
          />
        ))
      )}

      {/* connections */}
      {connections.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2 - 40;
        return (
          <g key={i}>
            <path
              d={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
              stroke="url(#link)"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.circle
              r="3"
              fill="oklch(0.85 0.14 240)"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, delay: i * 0.25, repeat: Infinity }}
            >
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                begin={`${i * 0.25}s`}
                path={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
              />
            </motion.circle>
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <motion.circle
            r="14"
            fill="oklch(0.7 0.16 240 / 0.15)"
            animate={{ r: [10, 22, 10], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, delay: i * 0.2, repeat: Infinity }}
          />
          <circle r="5" fill="url(#node)" />
          <text y="22" textAnchor="middle" fontSize="9" fill="oklch(0.75 0.05 240)" fontFamily="Inter">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
