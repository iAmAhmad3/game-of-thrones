import type { Metadata } from "next";
import timelineData from "@/data/timeline.json";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TimelineEventCard } from "@/components/TimelineEventCard";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="text-center px-6 mb-20">
        <AnimatedSection>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-gold)" }}
          >
            The Chronicle of Westeros
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-bold glow-gold-subtle mb-4"
            style={{ color: "var(--got-gold)" }}
          >
            Timeline
          </h1>
          <p
            className="font-garamond text-lg italic max-w-2xl mx-auto"
            style={{ color: "var(--got-text-muted)" }}
          >
            Eight seasons of war, betrayal, love, and survival — the greatest story ever told, now recorded in full.
          </p>

          {/* Legend */}
          <div className="flex gap-6 justify-center mt-8 flex-wrap">
            {[
              { color: "var(--got-gold)", label: "Major Battle" },
              { color: "var(--got-crimson-bright)", label: "Death" },
              { color: "var(--got-text-muted)", label: "Key Event" },
            ].map(({ color, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 font-cormorant text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--got-text-muted)" }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6">
        {timelineData.map((season, si) => (
          <AnimatedSection key={season.season} delay={si * 0.05}>
            <div className="relative mb-20">
              {/* Season Header */}
              <div className="text-center mb-12">
                <div
                  className="inline-block px-8 py-4 rounded"
                  style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-gold)" }}
                >
                  <div className="font-cinzel-deco text-5xl font-black glow-gold" style={{ color: "var(--got-gold)" }}>
                    {season.romanNumeral}
                  </div>
                  <div className="font-cormorant text-xs tracking-[0.3em] uppercase mt-1" style={{ color: "var(--got-text-muted)" }}>
                    Season {season.season} · {season.title}
                  </div>
                </div>
              </div>

              {/* Events */}
              <div className="relative">
                <div className="timeline-line" />
                <div className="space-y-8">
                  {season.events.map((event, ei) => (
                    <TimelineEventCard key={event.id} event={event} index={ei} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
