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
    <div className="min-h-[120px] flex flex-col items-center justify-center px-8 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <p
            className="font-garamond text-xl md:text-2xl italic max-w-2xl leading-relaxed"
            style={{ color: "var(--got-text-parchment)" }}
          >
            &ldquo;{quotes[index].text}&rdquo;
          </p>
          <span
            className="font-cormorant text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--got-gold)" }}
          >
            — {quotes[index].character}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === index ? "var(--got-gold)" : "var(--got-gold-dim)",
              opacity: i === index ? 1 : 0.4,
              transform: i === index ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
