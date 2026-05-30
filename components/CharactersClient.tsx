"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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

const allHouses = ["all", ...Array.from(new Set(housesData.map((h) => h.id)))];
const statuses = ["all", "alive", "dead", "unknown"];

export function CharactersClient({ characters }: Props) {
  const [houseFilter, setHouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(
    () =>
      characters.filter((c) => {
        if (houseFilter !== "all" && c.house !== houseFilter) return false;
        if (statusFilter !== "all" && c.status !== statusFilter) return false;
        return true;
      }),
    [characters, houseFilter, statusFilter]
  );

  const houseMap = Object.fromEntries(housesData.map((h) => [h.id, { name: h.name, sigil: h.sigil, colors: h.colors }]));

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="flex flex-wrap gap-2">
          <span className="font-cormorant text-xs tracking-[0.25em] uppercase self-center mr-2" style={{ color: "var(--got-text-muted)" }}>
            House:
          </span>
          {allHouses.map((h) => (
            <button
              key={h}
              onClick={() => setHouseFilter(h)}
              className="font-cinzel text-xs tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                border: "1px solid var(--got-border)",
                background: houseFilter === h ? "var(--got-gold)" : "transparent",
                color: houseFilter === h ? "var(--got-bg-obsidian)" : "var(--got-text-muted)",
                fontWeight: houseFilter === h ? 700 : 400,
              }}
            >
              {h === "all" ? "All" : houseMap[h]?.name.replace("House ", "") ?? h}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="font-cormorant text-xs tracking-[0.25em] uppercase self-center mr-2" style={{ color: "var(--got-text-muted)" }}>
            Status:
          </span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="font-cinzel text-xs tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                border: `1px solid ${s === "alive" ? "rgba(76,175,80,0.5)" : s === "dead" ? "rgba(192,57,43,0.5)" : "var(--got-border)"}`,
                background: statusFilter === s
                  ? s === "alive" ? "rgba(76,175,80,0.15)" : s === "dead" ? "rgba(192,57,43,0.15)" : "rgba(201,168,76,0.15)"
                  : "transparent",
                color: statusFilter === s
                  ? s === "alive" ? "#4caf50" : s === "dead" ? "#c0392b" : "var(--got-gold)"
                  : "var(--got-text-muted)",
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p
        className="font-cormorant text-xs tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--got-text-dim)" }}
      >
        {filtered.length} {filtered.length === 1 ? "character" : "characters"} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                <Link href={`/characters/${char.id}`} className="got-card group block rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-cinzel text-base font-semibold truncate mb-1 group-hover:text-got-gold transition-colors"
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
                      <span className="text-2xl ml-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {house.sigil}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {house && (
                      <span
                        className="flex items-center gap-1.5 font-cormorant text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--got-text-muted)" }}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: house.colors[0] }}
                        />
                        {house.name.replace("House ", "")}
                      </span>
                    )}
                    <span
                      className={`ml-auto font-cormorant text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${
                        char.status === "alive"
                          ? "status-alive"
                          : char.status === "dead"
                          ? "status-dead"
                          : "status-unknown"
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
