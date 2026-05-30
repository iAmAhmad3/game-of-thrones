"use client";

type Region = {
  id: string;
  name: string;
  climate: string;
  description: string;
  accentColor: string;
  majorHouses: string[];
  notableLocations: string[];
};

const regionIcons: Record<string, string> = {
  "the-north": "❄️",
  "kings-landing": "👑",
  "the-reach": "🌾",
  dorne: "☀️",
  "the-vale": "🏔️",
  "iron-islands": "⚓",
  "the-riverlands": "🌊",
  "the-stormlands": "⛈️",
  essos: "🌍",
};

export function RegionCard({ region }: { region: Region }) {
  return (
    <div
      className="group rounded-xl overflow-hidden region-card"
      style={{
        background: "var(--got-bg-card)",
        border: "1px solid var(--got-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = region.accentColor + "80";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${region.accentColor}20, 0 4px 24px rgba(0,0,0,0.5)`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--got-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {/* Accent stripe */}
      <div
        className="h-1"
        style={{ background: `linear-gradient(90deg, ${region.accentColor}, ${region.accentColor}60, transparent)` }}
      />

      <div className="p-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* Main content */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{regionIcons[region.id] ?? "🗺️"}</span>
            <div>
              <h2
                className="font-cinzel-deco text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: region.accentColor }}
              >
                {region.name}
              </h2>
              <p
                className="font-cormorant text-xs tracking-[0.25em] uppercase mt-1"
                style={{ color: "var(--got-text-muted)" }}
              >
                {region.climate}
              </p>
            </div>
          </div>

          <p
            className="font-garamond text-base leading-[1.85]"
            style={{ color: "var(--got-text-parchment)" }}
          >
            {region.description}
          </p>
        </div>

        {/* Sidebar */}
        <div
          className="rounded-lg p-6 space-y-6"
          style={{
            background: "rgba(0,0,0,0.25)",
            border: "1px solid var(--got-border-subtle)",
          }}
        >
          <div>
            <p
              className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: region.accentColor }}
            >
              Major Houses
            </p>
            <div className="flex flex-col gap-1.5">
              {region.majorHouses.map((h) => (
                <span
                  key={h}
                  className="font-cinzel text-xs"
                  style={{ color: "var(--got-text-muted)" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              className="font-cormorant text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: region.accentColor }}
            >
              Notable Locations
            </p>
            <div className="flex flex-wrap gap-2">
              {region.notableLocations.map((loc) => (
                <span
                  key={loc}
                  className="font-cormorant text-[10px] tracking-wider uppercase px-2 py-1 rounded"
                  style={{
                    background: `${region.accentColor}12`,
                    border: `1px solid ${region.accentColor}30`,
                    color: "var(--got-text-muted)",
                  }}
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
