import type { Metadata } from "next";
import regionsData from "@/data/regions.json";
import { AnimatedSection } from "@/components/AnimatedSection";
import { RegionCard } from "@/components/RegionCard";

export const metadata: Metadata = { title: "Regions of Westeros" };

export default function RegionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="text-center px-6 mb-16">
        <AnimatedSection>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-gold)" }}
          >
            The Known World
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-bold glow-gold-subtle mb-4"
            style={{ color: "var(--got-gold)" }}
          >
            Regions
          </h1>
          <p
            className="font-garamond text-lg italic max-w-2xl mx-auto"
            style={{ color: "var(--got-text-muted)" }}
          >
            From the frozen reaches beyond the Wall to the sun-scorched sands of Dorne — the lands whose character has shaped the men and women who rule them.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {regionsData.map((region, i) => (
          <AnimatedSection key={region.id} delay={i * 0.07}>
            <RegionCard region={region} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
