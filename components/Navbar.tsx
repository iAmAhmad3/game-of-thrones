"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/houses", label: "Houses" },
  { href: "/characters", label: "Characters" },
  { href: "/regions", label: "Regions" },
  { href: "/dragons", label: "Dragons" },
  { href: "/timeline", label: "Timeline" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 10, 15, 0.97)"
            : "rgba(10, 10, 15, 0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(201, 168, 76, 0.35)"
            : "1px solid rgba(201, 168, 76, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="font-cinzel-deco text-xl font-bold glow-gold-subtle transition-all duration-300 group-hover:glow-gold"
              style={{ color: "var(--got-gold)", letterSpacing: "0.15em" }}
            >
              GOT
            </span>
            <span
              className="font-cormorant text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "var(--got-text-muted)" }}
            >
              Encyclopedia
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    color: active ? "var(--got-gold)" : "var(--got-text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--got-text-parchment)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--got-text-muted)";
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--got-gold)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded transition-colors"
            style={{ color: "var(--got-gold)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: "rgba(10, 10, 15, 0.98)" }}
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex flex-col items-center gap-10" onClick={(e) => e.stopPropagation()}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className="font-cinzel-deco text-2xl font-bold tracking-widest transition-all duration-300"
                    style={{
                      color: pathname.startsWith(link.href) ? "var(--got-gold)" : "var(--got-text-parchment)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
