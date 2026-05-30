"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  { text: "When you play the game of thrones, you win or you die.", character: "Cersei Lannister" },
  { text: "The night is dark and full of terrors.", character: "Melisandre" },
  { text: "A lion doesn't concern himself with the opinions of sheep.", character: "Tywin Lannister" },
  { text: "Chaos isn't a pit. Chaos is a ladder.", character: "Petyr Baelish" },
  { text: "I drink and I know things.", character: "Tyrion Lannister" },
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", character: "Jojen Reed" },
  { text: "The man who passes the sentence should swing the sword.", character: "Eddard Stark" },
  { text: "Not today.", character: "Arya Stark" },
  { text: "I will not stop the wheel. I will break the wheel.", character: "Daenerys Targaryen" },
  { text: "Power resides where men believe it resides.", character: "Varys" },
  { text: "Any man who must say 'I am the king' is no true king.", character: "Tywin Lannister" },
  { text: "The winters are hard, but the Starks will endure. We always have.", character: "Eddard Stark" },
];

export function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-8 text-center">
      {/* Fixed height container so layout doesn't shift */}
      <div className="relative min-h-[140px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            {/* Opening quote mark */}
            <span
              className="font-cinzel-deco text-6xl leading-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 select-none pointer-events-none"
              style={{ color: "var(--got-gold)", opacity: 0.12 }}
              aria-hidden
            >
              &ldquo;
            </span>

            <p
              className="font-garamond text-xl md:text-2xl italic max-w-2xl leading-relaxed relative z-10"
              style={{ color: "var(--got-text-parchment)" }}
            >
              &ldquo;{quotes[index].text}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "var(--got-gold-dim)" }} />
              <span className="font-cormorant text-xs tracking-[0.3em] uppercase" style={{ color: "var(--got-gold)" }}>
                {quotes[index].character}
              </span>
              <div className="w-8 h-px" style={{ background: "var(--got-gold-dim)" }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-8">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? "20px" : "6px",
              height: "6px",
              background: i === index ? "var(--got-gold)" : "var(--got-gold-dim)",
              opacity: i === index ? 1 : 0.4,
            }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
