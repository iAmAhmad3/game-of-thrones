import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import housesData from "@/data/houses.json";
import charactersData from "@/data/characters.json";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SnowParticles } from "@/components/SnowParticles";

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return housesData.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const house = housesData.find((h) => h.id === id);
  return { title: house?.name ?? "House" };
}

export default async function HouseDetailPage({ params }: Props) {
  const { id } = await params;
  const house = housesData.find((h) => h.id === id);
  if (!house) notFound();

  const members = charactersData.filter((c) => house.notableMembers?.includes(c.id));
  const [color1, color2] = house.colors;
  const houseWithExtras = house as typeof house & { wordsExplanation?: string; arc?: string };

  const isNorth = house.region === "The North";

  return (
    <div className="min-h-screen pt-16">
      {isNorth && <SnowParticles />}
      {/* Hero Banner */}
      <div
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color1}33, ${color2}1a, var(--got-bg-obsidian))`,
          borderBottom: "1px solid var(--got-border)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${color1}15, transparent 70%)` }}
        />
        <div className="relative z-10">
          <Link
            href="/houses"
            className="inline-flex items-center gap-2 font-cormorant text-xs tracking-[0.2em] uppercase mb-8 transition-colors hover:text-got-gold"
            style={{ color: "var(--got-text-muted)" }}
          >
            <ArrowLeft size={14} /> Back to Houses
          </Link>

          <div className="text-7xl mb-6">{house.sigil}</div>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-gold)" }}
          >
            {house.region}
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-black mb-4 glow-gold-subtle"
            style={{ color: "var(--got-gold)", letterSpacing: "0.06em" }}
          >
            {house.name}
          </h1>
          <p className="font-garamond text-2xl italic" style={{ color: "var(--got-text-parchment)" }}>
            &ldquo;{house.words}&rdquo;
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Metadata Row */}
        <AnimatedSection>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg"
            style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border)" }}
          >
            {[
              { label: "Seat of Power", value: house.seat },
              { label: "Region", value: house.region },
              { label: "Current Lord", value: house.currentLord },
              { label: "Status", value: house.status },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--got-gold)" }}>
                  {label}
                </p>
                <p
                  className={`font-cinzel text-sm font-semibold ${
                    label === "Status" && house.status === "active" ? "text-green-400" : label === "Status" ? "text-red-400" : ""
                  }`}
                  style={label !== "Status" ? { color: "var(--got-text-parchment)" } : undefined}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Description */}
        <AnimatedSection delay={0.1}>
          <div className="relative pl-8" style={{ borderLeft: "2px solid rgba(201,168,76,0.5)" }}>
            <p className="font-cormorant text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--got-gold)" }}>
              About the House
            </p>
            <p className="font-garamond text-lg leading-relaxed" style={{ color: "var(--got-text-parchment)" }}>
              {house.description}
            </p>
          </div>
        </AnimatedSection>

        {/* Notable Members */}
        {members.length > 0 && (
          <AnimatedSection delay={0.15}>
            <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--got-gold)" }}>
              Notable Members
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((char) => (
                <Link key={char.id} href={`/characters/${char.id}`} className="got-card group rounded-lg p-5">
                  <h3
                    className="font-cinzel text-sm font-semibold mb-1 group-hover:text-yellow-400 transition-colors"
                    style={{ color: "var(--got-text-parchment)" }}
                  >
                    {char.name}
                  </h3>
                  <p className="font-cormorant text-xs tracking-wider uppercase mb-2" style={{ color: "var(--got-text-muted)" }}>
                    {char.titles[0]}
                  </p>
                  <span
                    className={`inline-block font-cormorant text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${
                      char.status === "alive" ? "status-alive" : char.status === "dead" ? "status-dead" : "status-unknown"
                    }`}
                  >
                    {char.status}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Words Explanation */}
        {houseWithExtras.wordsExplanation && (
          <AnimatedSection delay={0.18}>
            <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--got-gold)" }}>
              The Words — Explained
            </p>
            <div
              className="rounded-lg p-6 relative"
              style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border)" }}
            >
              <div className="font-garamond text-5xl leading-none absolute top-4 left-6 select-none" style={{ color: "var(--got-gold)", opacity: 0.08 }}>
                &ldquo;
              </div>
              <p className="font-garamond text-lg italic leading-relaxed pl-8" style={{ color: "var(--got-text-parchment)" }}>
                {houseWithExtras.wordsExplanation}
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* History */}
        <AnimatedSection delay={0.2}>
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--got-gold)" }}>
            House History
          </p>
          <div className="rounded-lg p-8" style={{ background: "var(--got-bg-card)", border: "1px solid var(--got-border)" }}>
            <p className="font-garamond text-base leading-[1.9] whitespace-pre-line" style={{ color: "var(--got-text-parchment)" }}>
              {house.history}
            </p>
          </div>
        </AnimatedSection>

        {/* Arc */}
        {houseWithExtras.arc && (
          <AnimatedSection delay={0.22}>
            <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--got-gold)" }}>
              Arc Across Eight Seasons
            </p>
            <div
              className="rounded-lg p-6"
              style={{ background: "var(--got-bg-card)", border: "1px solid var(--got-border)", borderLeft: "3px solid var(--got-gold)" }}
            >
              <p className="font-garamond text-base leading-[1.85]" style={{ color: "var(--got-text-muted)" }}>
                {houseWithExtras.arc}
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Known For */}
        <AnimatedSection delay={0.25}>
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--got-gold)" }}>
            Known For
          </p>
          <div className="flex flex-wrap gap-3">
            {house.knownFor.map((item) => (
              <span
                key={item}
                className="font-cinzel text-xs tracking-wider px-4 py-2 rounded"
                style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid var(--got-gold)", color: "var(--got-gold)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
