import type { Metadata } from "next";
import { QuizClient } from "@/components/QuizClient";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Who Said It? Quiz" };

export default function QuizPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="text-center px-6 mb-12">
        <AnimatedSection>
          <p className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--got-gold)" }}>
            Test Your Knowledge
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-bold glow-gold-subtle mb-4"
            style={{ color: "var(--got-gold)", letterSpacing: "0.06em" }}
          >
            Who Said It?
          </h1>
          <p className="font-garamond text-lg italic max-w-xl mx-auto" style={{ color: "var(--got-text-muted)" }}>
            The words that shaped Westeros. Can you match the quote to the mouth that spoke it?
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection delay={0.1}>
          <QuizClient />
        </AnimatedSection>
      </div>
    </div>
  );
}
