"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import housesData from "@/data/houses.json";

type Character = {
  id: string;
  name: string;
  titles: string[];
  house: string;
  houseName: string;
  status: string;
  region: string;
  seasonsAppeared: number[];
  biography: string;
  keyMoments: string[];
  quotes: string[];
  allegiances: string[];
};

interface Props { characters: Character[] }

const statuses = ["all", "alive", "dead", "unknown"] as const;

const ROLES: Record<string, string[]> = {
  Noble: ["ned-stark", "robb-stark", "sansa-stark", "bran-stark", "catelyn-stark", "cersei-lannister", "jaime-lannister", "tyrion-lannister", "tywin-lannister", "joffrey-baratheon", "stannis-baratheon", "daenerys-targaryen", "margaery-tyrell", "olenna-tyrell", "oberyn-martell", "theon-greyjoy", "petyr-baelish", "varys"],
  Warrior: ["jon-snow", "arya-stark", "robb-stark", "sandor-clegane", "brienne-of-tarth", "jaime-lannister", "drogo", "ramsay-bolton"],
  Advisor: ["tyrion-lannister", "varys", "petyr-baelish", "davos-seaworth", "samwell-tarly", "melisandre"],
  Wildling: ["ygritte"],
  "White Walker": ["night-king"],
};

function getRoles(id: string): string[] {
  return Object.entries(ROLES)
    .filter(([, ids]) => ids.includes(id))
    .map(([role]) => role);
}

export function CharactersClient({ characters }: Props) {
  const [houseFilters, setHouseFilters] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilters, setRoleFilters] = useState<Set<string>>(new Set());

  const allHouseIds = Array.from(new Set(housesData.map((h) => h.id)));
  const houseMap = Object.fromEntries(housesData.map((h) => [h.id, { name: h.name, sigil: h.sigil, colors: h.colors }]));
  const allRoles = Object.keys(ROLES);

  const toggleHouse = (id: string) => {
    setHouseFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleRole = (role: string) => {
    setRoleFilters((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role); else next.add(role);
      return next;
    });
  };

  const clearAll = () => {
    setHouseFilters(new Set());
    setStatusFilter("all");
    setRoleFilters(new Set());
  };

  const activeFilters = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];
    houseFilters.forEach((h) => {
      const name = houseMap[h]?.name.replace("House ", "") ?? h;
      tags.push({ label: `🏠 ${name}`, onRemove: () => toggleHouse(h) });
    });
    if (statusFilter !== "all") {
      tags.push({ label: `◉ ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`, onRemove: () => setStatusFilter("all") });
    }
    roleFilters.forEach((r) => {
      tags.push({ label: `⚔ ${r}`, onRemove: () => toggleRole(r) });
    });
    return tags;
  }, [houseFilters, statusFilter, roleFilters]);

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      if (houseFilters.size > 0 && !houseFilters.has(c.house)) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (roleFilters.size > 0) {
        const charRoles = getRoles(c.id);
        const hasRole = [...roleFilters].some((r) => charRoles.includes(r));
        if (!hasRole) return false;
      }
      return true;
    });
  }, [characters, houseFilters, statusFilter, roleFilters]);

  const hasFilters = houseFilters.size > 0 || statusFilter !== "all" || roleFilters.size > 0;

  return (
    <div>
      {/* Filter Bar */}
      <div className="space-y-4 mb-8">
        {/* House Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-cormorant text-xs tracking-[0.25em] uppercase self-center mr-1" style={{ color: "var(--got-text-muted)" }}>
            House:
          </span>
          <button
            onClick={() => setHouseFilters(new Set())}
            className="font-cinzel text-xs tracking-wider uppercase px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              border: "1px solid var(--got-border)",
              background: houseFilters.size === 0 ? "var(--got-gold)" : "transparent",
              color: houseFilters.size === 0 ? "var(--got-bg-obsidian)" : "var(--got-text-muted)",
              fontWeight: houseFilters.size === 0 ? 700 : 400,
            }}
          >
            All
          </button>
          {allHouseIds.map((h) => {
            const active = houseFilters.has(h);
            return (
              <button
                key={h}
                onClick={() => toggleHouse(h)}
                className="font-cinzel text-xs tracking-wider uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  border: "1px solid var(--got-border)",
                  background: active ? "var(--got-gold)" : "transparent",
                  color: active ? "var(--got-bg-obsidian)" : "var(--got-text-muted)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {houseMap[h]?.name.replace("House ", "") ?? h}
              </button>
            );
          })}
        </div>

        {/* Status + Role Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Status */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-cormorant text-xs tracking-[0.25em] uppercase self-center mr-1" style={{ color: "var(--got-text-muted)" }}>
              Status:
            </span>
            {statuses.map((s) => {
              const active = statusFilter === s;
              const borderColor = s === "alive" ? "rgba(76,175,80,0.5)" : s === "dead" ? "rgba(192,57,43,0.5)" : "var(--got-border)";
              const activeBg = s === "alive" ? "rgba(76,175,80,0.2)" : s === "dead" ? "rgba(192,57,43,0.2)" : "rgba(201,168,76,0.15)";
              const activeColor = s === "alive" ? "#4caf50" : s === "dead" ? "#c0392b" : "var(--got-gold)";
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="font-cinzel text-xs tracking-wider uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    border: `1px solid ${active ? borderColor : "var(--got-border)"}`,
                    background: active ? activeBg : "transparent",
                    color: active ? activeColor : "var(--got-text-muted)",
                  }}
                >
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Role */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-cormorant text-xs tracking-[0.25em] uppercase self-center mr-1" style={{ color: "var(--got-text-muted)" }}>
              Role:
            </span>
            {allRoles.map((r) => {
              const active = roleFilters.has(r);
              return (
                <button
                  key={r}
                  onClick={() => toggleRole(r)}
                  className="font-cinzel text-xs tracking-wider uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    border: "1px solid var(--got-border)",
                    background: active ? "rgba(74,144,217,0.2)" : "transparent",
                    color: active ? "var(--got-ice-bright)" : "var(--got-text-muted)",
                    borderColor: active ? "rgba(74,144,217,0.5)" : "var(--got-border)",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active filter tags */}
      <AnimatePresence>
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-2 mb-5 items-center"
          >
            {activeFilters.map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider uppercase px-3 py-1 rounded-full cursor-pointer transition-all hover:opacity-80"
                style={{ background: "rgba(201,168,76,0.12)", border: "1px solid var(--got-gold)", color: "var(--got-gold)" }}
                onClick={f.onRemove}
              >
                {f.label}
                <X size={10} />
              </span>
            ))}
            <button
              onClick={clearAll}
              className="font-cinzel text-[10px] tracking-wider uppercase px-3 py-1 rounded-full transition-all hover:opacity-80"
              style={{ background: "transparent", border: "1px solid var(--got-text-dim)", color: "var(--got-text-dim)" }}
            >
              Clear All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <p className="font-cormorant text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "var(--got-text-dim)" }}>
        {filtered.length} {filtered.length === 1 ? "character" : "characters"} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((char) => {
            const house = houseMap[char.house];
            return (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/characters/${char.id}`} className="got-card group block rounded-lg p-4 md:p-6 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-cinzel text-sm font-semibold truncate mb-1 group-hover:text-got-gold transition-colors"
                        style={{ color: "var(--got-text-parchment)" }}
                      >
                        {char.name}
                      </h3>
                      <p
                        className="font-cormorant text-xs tracking-wider uppercase truncate"
                        style={{ color: "var(--got-text-muted)" }}
                      >
                        {char.titles[0]}
                      </p>
                    </div>
                    {house && (
                      <span className="text-xl md:text-2xl ml-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {house.sigil}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    {house && (
                      <span
                        className="flex items-center gap-1.5 font-cormorant text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--got-text-muted)" }}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: house.colors[0] }} />
                        <span className="hidden sm:inline">{house.name.replace("House ", "")}</span>
                      </span>
                    )}
                    <span
                      className={`ml-auto font-cormorant text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${
                        char.status === "alive" ? "status-alive" : char.status === "dead" ? "status-dead" : "status-unknown"
                      }`}
                    >
                      {char.status}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-garamond text-xl italic" style={{ color: "var(--got-text-muted)" }}>
            No characters match these filters.
          </p>
        </div>
      )}
    </div>
  );
}
