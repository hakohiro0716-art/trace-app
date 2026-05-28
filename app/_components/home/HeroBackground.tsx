export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_20%_0%,rgba(214,228,222,0.30),transparent_55%),radial-gradient(820px_560px_at_90%_25%,rgba(20,94,79,0.40),transparent_55%),linear-gradient(180deg,#2a6a69_0%,#1e5a59_35%,#163e45_72%,#12333e_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_0)] [background-size:30px_30px] [background-position:2px_6px] mix-blend-overlay" />

      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_20%,transparent_35%,rgba(0,0,0,0.38)_100%)]" />

      {/* right-side botanical silhouette (simple inline SVG) */}
      <svg
        className="absolute -right-6 top-10 h-[360px] w-[220px] opacity-60"
        viewBox="0 0 220 360"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M110 330c-4-62 2-112 24-170 14-35 34-68 52-93"
          stroke="rgba(234,242,238,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {[
          { x: 150, y: 94, r: 22, rot: -18 },
          { x: 134, y: 132, r: 18, rot: 12 },
          { x: 168, y: 158, r: 20, rot: 22 },
          { x: 120, y: 188, r: 16, rot: -8 },
          { x: 154, y: 214, r: 18, rot: 16 },
          { x: 126, y: 246, r: 15, rot: -12 },
        ].map((l, i) => (
          <g
            key={i}
            transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}
            opacity="0.85"
          >
            <path
              d={`M0 0c${l.r} -8 ${l.r} 18 0 28c-${l.r} -10 -${l.r} -36 0 -28Z`}
              fill="rgba(231,240,236,0.22)"
              stroke="rgba(231,240,236,0.40)"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

