"use client";

import Link from "next/link";

export function HomeCTA() {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <Link href="/houses" className="font-cinzel text-xs tracking-[0.2em] uppercase px-8 py-3 rounded gold-btn-filled">
        Explore Houses
      </Link>
      <Link href="/timeline" className="font-cinzel text-xs tracking-[0.2em] uppercase px-8 py-3 rounded gold-btn-outline">
        View Timeline
      </Link>
    </div>
  );
}
