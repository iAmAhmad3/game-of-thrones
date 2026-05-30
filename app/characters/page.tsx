import type { Metadata } from "next";
import charactersData from "@/data/characters.json";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CharactersClient } from "@/components/CharactersClient";

export const metadata: Metadata = { title: "Characters" };

export default function CharactersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="text-center px-6 mb-16">
        <AnimatedSection>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-gold)" }}
          >
            The Players
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-bold glow-gold-subtle mb-4"
            style={{ color: "var(--got-gold)" }}
          >
            Characters
          </h1>
          <p
            className="font-garamond text-lg italic max-w-2xl mx-auto"
            style={{ color: "var(--got-text-muted)" }}
          >
            The men and women whose ambitions, loyalties, and betrayals wrote the history of Westeros in fire and blood.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <CharactersClient characters={charactersData} />
      </div>
    </div>
  );
}
