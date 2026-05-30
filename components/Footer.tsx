"use client";

import Link from "next/link";

const navLinks = [
  { href: "/houses", label: "Houses" },
  { href: "/characters", label: "Characters" },
  { href: "/regions", label: "Regions" },
  { href: "/dragons", label: "Dragons" },
  { href: "/timeline", label: "Timeline" },
];

const sigils = ["🐺", "🦁", "🐉", "🦌", "🌹", "☀️", "🐟", "🦅", "🦑"];

const quote = {
  text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
  character: "Jojen Reed",
};

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-20"
      style={{
        background: "var(--got-bg-deep)",
        borderTop: "1px solid var(--got-gold)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Navigation */}
          <div>
            <p
              className="font-cormorant text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--got-gold)" }}
            >
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-cinzel text-sm tracking-wider transition-colors duration-200"
                  style={{ color: "var(--got-text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--got-text-parchment)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--got-text-muted)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="text-center">
            <p
              className="font-garamond text-lg italic leading-relaxed mb-3"
              style={{ color: "var(--got-text-parchment)" }}
            >
              &ldquo;{quote.text}&rdquo;
            </p>
            <p
              className="font-cormorant text-xs tracking-[0.25em] uppercase"
              style={{ color: "var(--got-gold)" }}
            >
              — {quote.character}
            </p>
          </div>

          {/* Credits */}
          <div className="text-right">
            <Link href="/" className="block mb-4">
              <span
                className="font-cinzel-deco text-2xl font-bold"
                style={{ color: "var(--got-gold)" }}
              >
                GOT
              </span>
              <span
                className="block font-cormorant text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "var(--got-text-muted)" }}
              >
                Encyclopedia
              </span>
            </Link>
            <p
              className="font-cormorant text-xs leading-relaxed"
              style={{ color: "var(--got-text-dim)" }}
            >
              A fan encyclopedia dedicated to the world of Westeros.
              <br />
              Game of Thrones &copy; HBO. All rights reserved.
              <br />
              <span style={{ color: "var(--got-gold-dim)" }}>
                &copy; {new Date().getFullYear()} GOT Encyclopedia
              </span>
            </p>
          </div>
        </div>

        {/* Sigil Row */}
        <div
          className="mt-12 pt-8 flex items-center justify-center gap-6 flex-wrap"
          style={{ borderTop: "1px solid rgba(201, 168, 76, 0.12)" }}
        >
          {sigils.map((sigil, i) => (
            <span
              key={i}
              className="text-2xl transition-transform duration-300 hover:scale-125"
              style={{ opacity: 0.35, filter: "grayscale(0.6)" }}
            >
              {sigil}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
