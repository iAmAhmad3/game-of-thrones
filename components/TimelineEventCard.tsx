"use client";

type TimelineEvent = {
  id: string;
  name: string;
  description: string;
  type: string;
  side: string;
  landmark?: boolean;
};

export function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const isLeft = event.side === "left";
  const isLandmark = event.landmark === true;
  const color =
    event.type === "death"
      ? "var(--got-crimson-bright)"
      : event.type === "battle"
      ? "var(--got-gold)"
      : "var(--got-text-muted)";

  return (
    <div
      className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
      style={{ paddingLeft: isLeft ? 0 : "50%", paddingRight: isLeft ? "50%" : 0 }}
    >
      {/* Dot on the line */}
      <div
        className={`absolute top-5 rounded-full border-2 z-10 timeline-dot`}
        style={{
          left: "calc(50% - 8px)",
          width: isLandmark ? "16px" : "14px",
          height: isLandmark ? "16px" : "14px",
          marginTop: isLandmark ? "-1px" : "0",
          background: isLandmark ? color : "var(--got-bg-obsidian)",
          borderColor: color,
          boxShadow: isLandmark ? `0 0 14px ${color}` : `0 0 8px ${color}60`,
        }}
      />

      {/* Connector line */}
      <div
        className="absolute top-[22px] h-px"
        style={{
          width: "24px",
          background: color,
          opacity: 0.5,
          left: isLeft ? "calc(50% - 32px)" : "calc(50% + 8px)",
        }}
      />

      <div
        className={`w-full max-w-md rounded-lg p-5 timeline-event cursor-default ${isLeft ? "mr-8" : "ml-8"} ${isLandmark ? "timeline-landmark" : ""}`}
        style={{
          background: isLandmark ? `linear-gradient(135deg, var(--got-bg-elevated), var(--got-bg-card))` : "var(--got-bg-card)",
          border: `1px solid ${isLandmark ? color + "55" : color + "30"}`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = color + "80";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}25`;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = isLandmark ? color + "55" : color + "30";
          (e.currentTarget as HTMLElement).style.boxShadow = isLandmark ? `0 0 20px ${color}15` : "";
          (e.currentTarget as HTMLElement).style.transform = "";
        }}
      >
        {isLandmark && (
          <div
            className="font-cormorant text-[9px] tracking-[0.4em] uppercase mb-2"
            style={{ color }}
          >
            ◆ Landmark Event
          </div>
        )}
        <div className="flex items-start gap-3 mb-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
            style={{ background: color, boxShadow: isLandmark ? `0 0 6px ${color}` : undefined }}
          />
          <h3
            className={`font-cinzel text-sm font-semibold leading-snug ${isLandmark ? "text-base" : ""}`}
            style={{ color: isLandmark ? color : "var(--got-text-parchment)" }}
          >
            {event.name}
          </h3>
        </div>
        <p className="font-garamond text-sm leading-relaxed pl-5" style={{ color: "var(--got-text-muted)" }}>
          {event.description}
        </p>
        <span
          className="mt-3 ml-5 inline-block font-cormorant text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}40`,
            color: color,
          }}
        >
          {event.type === "death" ? "Death" : event.type === "battle" ? "Battle" : "Event"}
        </span>
      </div>
    </div>
  );
}
