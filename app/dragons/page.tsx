import type { Metadata } from "next";
import dragonsData from "@/data/dragons.json";
import { AnimatedSection } from "@/components/AnimatedSection";
import { EmberParticles } from "@/components/EmberParticles";
import { DragonCard } from "@/components/DragonCard";

export const metadata: Metadata = { title: "Dragons" };

export default function DragonsPage() {
  return (
    <div className="min-h-screen pt-16 pb-20 relative" style={{ background: "var(--got-bg-obsidian)" }}>
      <EmberParticles />

      {/* Page Header */}
      <div
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,26,26,0.2) 0%, transparent 70%)`,
        }}
      >
        <AnimatedSection>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-crimson-bright)" }}
          >
            Fire Made Flesh
          </p>
          <h1
            className="font-cinzel-deco text-5xl md:text-7xl font-black glow-fire mb-4"
            style={{ color: "var(--got-crimson-bright)", letterSpacing: "0.06em" }}
          >
            Dragons
          </h1>
          <p
            className="font-garamond text-xl italic max-w-2xl mx-auto"
            style={{ color: "var(--got-text-parchment)" }}
          >
            Born from Old Valyria&apos;s darkest magic, riding the thermals of history itself. Before them, no king was truly king. After them, no world was quite the same.
          </p>
        </AnimatedSection>
      </div>

      {/* Dragons List */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10 relative z-10">
        {dragonsData.map((dragon, i) => (
          <AnimatedSection key={dragon.id} delay={i * 0.1}>
            <DragonCard dragon={dragon} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
