"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
}

export function GoldButton({ href, children, variant = "outline", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-block font-cinzel text-xs tracking-[0.2em] uppercase px-6 py-3 rounded transition-all duration-300 gold-btn-${variant} ${className}`}
    >
      {children}
    </Link>
  );
}
