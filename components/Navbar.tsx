"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import housesData from "@/data/houses.json";
import charactersData from "@/data/characters.json";
import dragonsData from "@/data/dragons.json";
import regionsData from "@/data/regions.json";

const navLinks = [
  { href: "/houses", label: "Houses" },
  { href: "/characters", label: "Characters" },
  { href: "/regions", label: "Regions" },
  { href: "/dragons", label: "Dragons" },
  { href: "/timeline", label: "Timeline" },
  { href: "/quiz", label: "Quiz" },
];

type SearchResult = {
  id: string;
  name: string;
  category: "House" | "Character" | "Dragon" | "Region";
  descriptor: string;
  href: string;
};

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  housesData.forEach((h) => results.push({ id: h.id, name: h.name, category: "House", descriptor: h.region, href: `/houses/${h.id}` }));
  (charactersData as Array<{ id: string; name: string; titles: string[]; houseName: string }>).forEach((c) =>
    results.push({ id: c.id, name: c.name, category: "Character", descriptor: c.titles[0] ?? c.houseName, href: `/characters/${c.id}` })
  );
  dragonsData.forEach((d) => results.push({ id: d.id, name: d.name, category: "Dragon", descriptor: d.rider, href: `/dragons#${d.id}` }));
  regionsData.forEach((r) => results.push({ id: r.id, name: r.name, category: "Region", descriptor: r.climate.split(";")[0], href: `/regions` }));
  return results;
}

function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

const categoryColors: Record<string, string> = {
  House: "var(--got-gold)",
  Character: "var(--got-ice-bright)",
  Dragon: "var(--got-crimson-bright)",
  Region: "#7ab87a",
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchIndex.filter((item) =>
      fuzzyMatch(searchQuery, item.name) || fuzzyMatch(searchQuery, item.descriptor)
    ).slice(0, 12);
  }, [searchQuery, searchIndex]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    searchResults.forEach((r) => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return groups;
  }, [searchResults]);

  const handleResultClick = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10, 10, 15, 0.97)" : "rgba(10, 10, 15, 0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(201, 168, 76, 0.35)"
            : "1px solid rgba(201, 168, 76, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group flex-shrink-0">
            <span
              className="font-cinzel-deco text-xl font-bold glow-gold-subtle transition-all duration-300 group-hover:glow-gold"
              style={{ color: "var(--got-gold)", letterSpacing: "0.15em" }}
            >
              GOT
            </span>
            <span className="font-cormorant text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--got-text-muted)" }}>
              Encyclopedia
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-hover relative font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-250 ${!active ? "hover:opacity-100" : ""}`}
                  style={{ color: active ? "var(--got-gold)" : "var(--got-text-muted)" }}
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

          {/* Right: Search + Hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search toggle */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "220px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Westeros…"
                      className="font-cinzel text-xs tracking-wider w-full bg-transparent outline-none border-b px-2 py-1"
                      style={{
                        color: "var(--got-text-parchment)",
                        borderColor: "var(--got-gold)",
                        caretColor: "var(--got-gold)",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                      }}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                onClick={() => { setSearchOpen((v) => !v); if (searchOpen) setSearchQuery(""); }}
                className="w-9 h-9 flex items-center justify-center rounded transition-colors hover:opacity-80"
                style={{ color: searchOpen ? "var(--got-gold)" : "var(--got-text-muted)" }}
                aria-label="Toggle search"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchOpen && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 rounded-lg overflow-hidden shadow-2xl"
                    style={{
                      width: "320px",
                      background: "var(--got-bg-elevated)",
                      border: "1px solid var(--got-border)",
                      maxHeight: "420px",
                      overflowY: "auto",
                    }}
                  >
                    {searchResults.length === 0 ? (
                      <p className="font-garamond text-sm italic p-4 text-center" style={{ color: "var(--got-text-muted)" }}>
                        No results in the Seven Kingdoms…
                      </p>
                    ) : (
                      Object.entries(groupedResults).map(([category, items]) => (
                        <div key={category}>
                          <div
                            className="px-4 py-2 font-cormorant text-[10px] tracking-[0.3em] uppercase"
                            style={{ background: "rgba(0,0,0,0.3)", color: categoryColors[category] ?? "var(--got-gold)" }}
                          >
                            {category}
                          </div>
                          {items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleResultClick(item.href)}
                              className="w-full text-left px-4 py-3 flex flex-col gap-0.5 transition-colors hover:bg-white/5"
                            >
                              <span className="font-cinzel text-sm" style={{ color: "var(--got-text-parchment)" }}>
                                {item.name}
                              </span>
                              <span className="font-cormorant text-xs tracking-wider" style={{ color: "var(--got-text-muted)" }}>
                                {item.descriptor}
                              </span>
                            </button>
                          ))}
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
        </div>
      </nav>

      {/* Full-Screen Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "rgba(10, 10, 15, 0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Close button top-right */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full transition-all"
                style={{ border: "1px solid var(--got-border)", color: "var(--got-gold)" }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Centered Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block font-cinzel-deco text-3xl font-bold tracking-widest transition-all duration-300"
                    style={{
                      color: pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "var(--got-gold)"
                        : "var(--got-text-parchment)",
                      minHeight: "48px",
                      lineHeight: "48px",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom sigils */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-6 pb-10 text-2xl"
            >
              {["🐺", "🦁", "🐉", "🦌", "🌹"].map((s) => (
                <span key={s} style={{ opacity: 0.3 }}>{s}</span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
