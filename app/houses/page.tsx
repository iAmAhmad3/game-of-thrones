import type { Metadata } from "next";
import Link from "next/link";
import housesData from "@/data/houses.json";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Great Houses" };

export default function HousesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="text-center px-6 mb-16">
        <AnimatedSection>
          <p
            className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--got-gold)" }}
          >
            The Great Houses of Westeros
          </p>
          <h1
            className="font-cinzel-deco text-4xl md:text-6xl font-bold glow-gold-subtle mb-4"
            style={{ color: "var(--got-gold)", letterSpacing: "0.06em" }}
          >
            Great Houses
          </h1>
          <p
            className="font-garamond text-lg italic max-w-xl mx-auto"
            style={{ color: "var(--got-text-muted)" }}
          >
            The noble families whose banners have cast long shadows across the Seven Kingdoms — in war, in feud, and in the endless game for the Iron Throne.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {housesData.map((house, i) => (
            <AnimatedSection key={house.id} delay={i * 0.06}>
              <Link href={`/houses/${house.id}`} className="got-card group block rounded-lg overflow-hidden">
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${house.colors[0]}, ${house.colors[1]})` }}
                />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p
                        className="font-cormorant text-[10px] tracking-[0.35em] uppercase mb-1"
                        style={{ color: "var(--got-text-dim)" }}
                      >
                        {house.region}
                      </p>
                      <h2
                        className="font-cinzel-deco text-xl font-bold leading-tight"
                        style={{ color: "var(--got-text-parchment)" }}
                      >
                        {house.name}
                      </h2>
                    </div>
                    <span className="text-4xl transition-transform duration-500 group-hover:scale-125" style={{ lineHeight: 1 }}>
                      {house.sigil}
                    </span>
                  </div>

                  <p
                    className="font-garamond text-base italic mb-5"
                    style={{ color: "var(--got-gold)" }}
                  >
                    &ldquo;{house.words}&rdquo;
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <span
                      className="font-cormorant text-[10px] tracking-widest uppercase px-2.5 py-1 rounded"
                      style={{ border: "1px solid var(--got-border)", color: "var(--got-text-muted)" }}
                    >
                      {house.seat}
                    </span>
                    <span
                      className={`font-cormorant text-[10px] tracking-widest uppercase px-2.5 py-1 rounded border ${
                        house.status === "active" ? "status-alive" : "status-dead"
                      }`}
                    >
                      {house.status}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
