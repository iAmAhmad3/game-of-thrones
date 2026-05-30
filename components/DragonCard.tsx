"use client";

type Dragon = {
  id: string;
  name: string;
  rider: string;
  scaleColor: string;
  size: string;
  status: string;
  variant: string;
  description: string;
  keyMoments: string[];
};

const dragonEmojis: Record<string, string> = {
  drogon: "🐉",
  rhaegal: "🐲",
  viserion: "❄️",
  balerion: "🔥",
  meraxes: "⚔️",
  vhagar: "🌑",
};

export function DragonCard({ dragon }: { dragon: Dragon }) {
  const isIce = dragon.variant === "ice";
  const isDead = dragon.status === "dead";
  const accentColor = isIce ? "var(--got-ice-bright)" : "var(--got-crimson-bright)";

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-500 ${isIce ? "dragon-card-ice" : "dragon-card-fire"}`}
      style={{
        background: `linear-gradient(135deg, var(--got-bg-card) 0%, var(--got-bg-elevated) 100%)`,
        border: `1px solid ${isIce ? "rgba(74,144,217,0.3)" : "rgba(139,26,26,0.3)"}`,
      }}
    >
      {/* Color bar */}
      <div
        className="h-1"
        style={{
          background: isIce
            ? "linear-gradient(90deg, var(--got-ice), var(--got-ice-bright), var(--got-ice))"
            : "linear-gradient(90deg, var(--got-crimson), var(--got-crimson-bright), var(--got-crimson))",
        }}
      />

      <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          {/* Name */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{dragonEmojis[dragon.id] ?? "🐉"}</span>
            <div>
              <h2
                className={`font-cinzel-deco text-3xl md:text-4xl font-black leading-tight ${isIce ? "glow-ice" : "glow-fire"}`}
                style={{ color: accentColor }}
              >
                {dragon.name}
              </h2>
              <p
                className="font-cormorant text-xs tracking-[0.3em] uppercase mt-1"
                style={{ color: "var(--got-text-muted)" }}
              >
                Rider: {dragon.rider}
              </p>
            </div>
          </div>

          {/* Lore */}
          <p
            className="font-garamond text-base leading-[1.9] mb-6"
            style={{ color: "var(--got-text-parchment)" }}
          >
            {dragon.description}
          </p>

          {/* Key Moments */}
          <div>
            <p
              className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: accentColor }}
            >
              Key Moments
            </p>
            <ul className="space-y-1">
              {dragon.keyMoments.map((moment) => (
                <li
                  key={moment}
                  className="font-garamond text-sm flex items-start gap-2"
                  style={{ color: "var(--got-text-muted)" }}
                >
                  <span style={{ color: accentColor, flexShrink: 0 }}>◆</span>
                  {moment}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats sidebar */}
        <div
          className="rounded-lg p-6 min-w-[200px] space-y-5"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${isIce ? "rgba(74,144,217,0.2)" : "rgba(139,26,26,0.2)"}`,
          }}
        >
          {[
            { label: "Scale Color", value: dragon.scaleColor },
            { label: "Size Class", value: dragon.size },
            { label: "Status", value: dragon.status },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-1"
                style={{ color: accentColor }}
              >
                {label}
              </p>
              <p
                className={`font-cinzel text-sm font-semibold ${
                  label === "Status" && !isDead ? "text-green-400" : label === "Status" ? "text-red-400" : ""
                }`}
                style={label !== "Status" ? { color: "var(--got-text-parchment)" } : undefined}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
