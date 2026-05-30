import Link from "next/link";
import { Shield, Users, MapPin, Flame } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CountUp } from "@/components/CountUp";
import { QuoteRotator } from "@/components/QuoteRotator";
import { HeroSection } from "@/components/HeroSection";
import { HomeCTA } from "@/components/HomeCTA";
import housesData from "@/data/houses.json";

const pillars = [
  { href: "/houses", icon: Shield, label: "Great Houses", desc: "The noble families whose blood has written Westeros in war and diplomacy alike." },
  { href: "/characters", icon: Users, label: "Characters", desc: "The men and women whose choices shaped the fate of the Seven Kingdoms." },
  { href: "/regions", icon: MapPin, label: "Regions", desc: "From the frozen North to the sun-scorched sands of Dorne — the lands of Westeros." },
  { href: "/dragons", icon: Flame, label: "Dragons", desc: "The great wyrms of Old Valyria whose fire reshaped the course of history." },
];

const spotlightHouse = housesData.find((h) => h.id === "stark")!;

const stats = [
  { value: 11, suffix: "", label: "Great Houses" },
  { value: 50, suffix: "+", label: "Characters" },
  { value: 8, suffix: "", label: "Seasons" },
  { value: 6, suffix: "", label: "Dragons" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Pillar Cards */}
      <AnimatedSection delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ href, icon: Icon, label, desc }) => (
              <Link key={href} href={href} className="got-card group rounded-lg p-8 flex flex-col items-center text-center gap-5 cursor-pointer">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full border group-hover:border-yellow-400 transition-all duration-300"
                  style={{ border: "1px solid var(--got-border)", background: "rgba(201, 168, 76, 0.06)" }}
                >
                  <Icon size={24} style={{ color: "var(--got-gold)" }} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: "var(--got-text-parchment)" }}>
                    {label}
                  </h3>
                  <p className="font-garamond text-sm leading-relaxed" style={{ color: "var(--got-text-muted)" }}>
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="gold-divider" />
      </div>

      {/* House Spotlight */}
      <AnimatedSection delay={0.05}>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-center mb-12" style={{ color: "var(--got-gold)" }}>
            House Spotlight
          </p>
          <div
            className="rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
            style={{ border: "1px solid var(--got-border)", background: "var(--got-bg-card)" }}
          >
            {/* Text side */}
            <div className="relative p-10 md:p-14">
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "rgba(201,168,76,0.7)" }} />
              <p className="font-cormorant text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--got-gold)" }}>
                {spotlightHouse.region}
              </p>
              <h2 className="font-cinzel-deco text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--got-text-parchment)" }}>
                {spotlightHouse.name}
              </h2>
              <p className="font-garamond text-lg italic mb-6" style={{ color: "var(--got-gold)" }}>
                &ldquo;{spotlightHouse.words}&rdquo;
              </p>
              <p className="font-garamond text-base leading-relaxed mb-8" style={{ color: "var(--got-text-muted)" }}>
                {spotlightHouse.description}
              </p>
              <div className="flex gap-4 flex-wrap mb-8">
                <span
                  className="font-cormorant text-xs tracking-widest uppercase px-3 py-1 rounded"
                  style={{ border: "1px solid var(--got-border)", color: "var(--got-text-muted)" }}
                >
                  Seat: {spotlightHouse.seat}
                </span>
                <span className={`font-cormorant text-xs tracking-widest uppercase px-3 py-1 rounded border ${spotlightHouse.status === "active" ? "status-alive" : "status-dead"}`}>
                  {spotlightHouse.status}
                </span>
              </div>
              <Link href={`/houses/${spotlightHouse.id}`} className="inline-block font-cinzel text-xs tracking-[0.2em] uppercase px-6 py-3 rounded house-cta-btn">
                Read House History →
              </Link>
            </div>

            {/* Sigil side */}
            <div
              className="flex items-center justify-center p-16 relative"
              style={{ background: `linear-gradient(135deg, rgba(112,128,144,0.08), rgba(220,227,234,0.04))`, borderLeft: "1px solid var(--got-border)" }}
            >
              <div className="text-center">
                <div
                  className="text-[120px] leading-none mb-4 transition-transform duration-500 hover:scale-110"
                  style={{ filter: "drop-shadow(0 0 20px rgba(112,128,144,0.5))" }}
                >
                  {spotlightHouse.sigil}
                </div>
                <p className="font-cinzel text-xs tracking-[0.3em] uppercase" style={{ color: "var(--got-text-dim)" }}>
                  {spotlightHouse.seat}
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Bar */}
      <AnimatedSection delay={0.05}>
        <section
          className="py-16"
          style={{ background: "var(--got-bg-surface)", borderTop: "1px solid var(--got-border-subtle)", borderBottom: "1px solid var(--got-border-subtle)" }}
        >
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="font-almendra text-5xl font-bold mb-2 glow-gold-subtle" style={{ color: "var(--got-gold)" }}>
                  <CountUp end={value} suffix={suffix} />
                </div>
                <p className="font-cormorant text-xs tracking-[0.25em] uppercase" style={{ color: "var(--got-text-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Quote Rotator */}
      <AnimatedSection delay={0.1}>
        <section className="py-20 max-w-4xl mx-auto w-full px-6">
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-center mb-10" style={{ color: "var(--got-gold)" }}>
            Words of Westeros
          </p>
          <QuoteRotator />
        </section>
      </AnimatedSection>

      {/* CTA Strip */}
      <AnimatedSection delay={0.05}>
        <section className="py-16 px-6">
          <div
            className="max-w-4xl mx-auto text-center rounded-lg p-12"
            style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border)" }}
          >
            <h2 className="font-cinzel-deco text-2xl md:text-3xl font-bold mb-4 glow-gold-subtle" style={{ color: "var(--got-gold)" }}>
              Begin Your Journey
            </h2>
            <p className="font-garamond text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--got-text-muted)" }}>
              Explore the full breadth of Westeros — its great houses, legendary figures, and the events that shaped a world.
            </p>
            <HomeCTA />
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
