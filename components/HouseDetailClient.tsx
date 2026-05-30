"use client";

import Link from "next/link";

interface Props {
  houseId: string;
  houseName: string;
}

export function HouseCtaButton({ houseId }: { houseId: string }) {
  return (
    <Link
      href={`/houses/${houseId}`}
      className="inline-block font-cinzel text-xs tracking-[0.2em] uppercase px-6 py-3 rounded house-cta-btn"
    >
      Read House History →
    </Link>
  );
}

export function HouseNavLink({ href, active }: { href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="font-cormorant text-xs tracking-[0.2em] uppercase mb-8 inline-flex items-center gap-2 transition-colors"
      style={{ color: active ? "var(--got-gold)" : "var(--got-text-muted)" }}
    >
      ← Back to Houses
    </Link>
  );
}

export function CharHouseButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="font-cinzel text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded house-cta-btn"
    >
      View House →
    </Link>
  );
}
