import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import charactersData from "@/data/characters.json";
import housesData from "@/data/houses.json";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return charactersData.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const char = charactersData.find((c) => c.id === id);
  return { title: char?.name ?? "Character" };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const char = charactersData.find((c) => c.id === id);
  if (!char) notFound();

  const house = housesData.find((h) => h.id === char.house);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: house
            ? `linear-gradient(135deg, ${house.colors[0]}22, ${house.colors[1]}11, var(--got-bg-obsidian))`
            : "var(--got-bg-deep)",
          borderBottom: "1px solid var(--got-border)",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 font-cormorant text-xs tracking-[0.2em] uppercase mb-8 transition-colors hover:text-yellow-400"
            style={{ color: "var(--got-text-muted)" }}
          >
            <ArrowLeft size={14} /> Back to Characters
          </Link>

          {house && <div className="text-6xl mb-5">{house.sigil}</div>}
          {house && (
            <p className="font-cormorant text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "var(--got-gold)" }}>
              {house.name}
            </p>
          )}

          <h1
            className="font-cinzel-deco text-4xl md:text-5xl font-black mb-3 glow-gold-subtle"
            style={{ color: "var(--got-gold)", letterSpacing: "0.06em" }}
          >
            {char.name}
          </h1>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {char.titles.slice(0, 2).map((title) => (
              <span key={title} className="font-cormorant text-xs tracking-[0.25em] uppercase" style={{ color: "var(--got-text-muted)" }}>
                {title}
              </span>
            ))}
            <span
              className={`font-cormorant text-xs tracking-widest uppercase px-3 py-1 rounded border ${
                char.status === "alive" ? "status-alive" : char.status === "dead" ? "status-dead" : "status-unknown"
              }`}
            >
              {char.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        {/* Key Stats */}
        <AnimatedSection>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg"
            style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border)" }}
          >
            {[
              { label: "House", value: house?.name ?? char.houseName },
              { label: "Status", value: char.status },
              { label: "Home Region", value: char.region },
              { label: "Seasons", value: `S${char.seasonsAppeared.join(", S")}` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--got-gold)" }}>
                  {label}
                </p>
                <p className="font-cinzel text-sm font-semibold" style={{ color: "var(--got-text-parchment)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Biography */}
        <AnimatedSection delay={0.1}>
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--got-gold)" }}>
            Biography
          </p>
          <div
            className="rounded-lg p-8 relative"
            style={{ background: "var(--got-bg-card)", border: "1px solid var(--got-border)" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
              style={{ background: "rgba(201,168,76,0.4)" }}
            />
            <p className="font-garamond text-lg leading-[1.9] pl-6" style={{ color: "var(--got-text-parchment)" }}>
              {char.biography}
            </p>
          </div>
        </AnimatedSection>

        {/* Titles & Allegiances */}
        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--got-gold)" }}>
                Titles
              </p>
              <div className="flex flex-col gap-2">
                {char.titles.map((t) => (
                  <span key={t} className="font-cinzel text-xs tracking-wider" style={{ color: "var(--got-text-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--got-gold)" }}>
                Allegiances
              </p>
              <div className="flex flex-wrap gap-2">
                {char.allegiances.map((a) => (
                  <span
                    key={a}
                    className="font-cinzel text-xs tracking-wider px-3 py-1 rounded"
                    style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid var(--got-border)", color: "var(--got-text-muted)" }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Moments */}
        <AnimatedSection delay={0.2}>
          <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--got-gold)" }}>
            Key Moments
          </p>
          <div className="space-y-3">
            {char.keyMoments.map((moment, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded"
                style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border-subtle)" }}
              >
                <span className="font-almendra text-lg font-bold flex-shrink-0 w-6 text-center" style={{ color: "var(--got-gold-dim)" }}>
                  {i + 1}
                </span>
                <p className="font-garamond text-base" style={{ color: "var(--got-text-parchment)" }}>
                  {moment}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Quotes */}
        {char.quotes?.length > 0 && (
          <AnimatedSection delay={0.25}>
            <p className="font-cormorant text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--got-gold)" }}>
              Notable Quotes
            </p>
            <div className="space-y-4">
              {char.quotes.map((quote, i) => (
                <blockquote
                  key={i}
                  className="rounded-lg p-6"
                  style={{
                    background: "var(--got-bg-card)",
                    border: "1px solid var(--got-border)",
                    borderLeft: "3px solid var(--got-gold)",
                  }}
                >
                  <p className="font-garamond text-lg italic" style={{ color: "var(--got-text-parchment)" }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <footer className="font-cormorant text-xs tracking-[0.25em] uppercase mt-3" style={{ color: "var(--got-gold)" }}>
                    — {char.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* House link */}
        {house && (
          <AnimatedSection delay={0.3}>
            <div
              className="p-6 rounded-lg flex items-center justify-between"
              style={{ background: "var(--got-bg-elevated)", border: "1px solid var(--got-border)" }}
            >
              <div>
                <p className="font-cormorant text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "var(--got-text-muted)" }}>
                  Member of
                </p>
                <p className="font-cinzel text-base font-semibold" style={{ color: "var(--got-text-parchment)" }}>
                  {house.name}
                </p>
              </div>
              <Link href={`/houses/${house.id}`} className="font-cinzel text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded house-cta-btn">
                View House →
              </Link>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
