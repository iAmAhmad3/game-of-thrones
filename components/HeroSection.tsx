"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const dividerVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 1.1, delay: 0.1, ease: "easeOut" as const } },
};

const subtleVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, delay: 0.2 } },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40, 28, 8, 0.7) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 50% 100%, rgba(139, 26, 26, 0.08) 0%, transparent 60%),
          var(--got-bg-obsidian)
        `,
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main text - staggered container */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center gap-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <span
            className="font-cinzel-deco font-bold glow-gold-subtle fluid-hero-title"
            style={{ color: "var(--got-gold)", display: "block" }}
          >
            When You Play the
          </span>
        </motion.div>

        <motion.div variants={item}>
          <span
            className="font-cinzel-deco font-black glow-gold fluid-hero-subtitle"
            style={{ color: "var(--got-gold)", display: "block" }}
          >
            Game of Thrones
          </span>
        </motion.div>

        <motion.div variants={item}>
          <span
            className="font-garamond text-xl md:text-2xl lg:text-3xl italic"
            style={{ color: "var(--got-text-parchment)", opacity: 0.85, display: "block" }}
          >
            You Win or You Die
          </span>
        </motion.div>

        {/* Decorative SVG divider */}
        <motion.div
          variants={dividerVariant}
          className="w-full max-w-lg mt-2"
        >
          <svg viewBox="0 0 400 40" className="w-full" style={{ color: "var(--got-gold)" }}>
            <line x1="0" y1="20" x2="155" y2="20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
            <path d="M 155 20 L 165 10 L 175 20 L 165 30 Z" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
            <path d="M 185 14 L 200 5 L 215 14 L 215 26 L 200 35 L 185 26 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="200" cy="20" r="3" fill="currentColor" opacity="0.8" />
            <path d="M 225 10 L 235 20 L 225 30 L 215 20 Z" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="245" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          </svg>
        </motion.div>

        <motion.p
          variants={subtleVariant}
          className="font-cormorant text-xs tracking-[0.35em] uppercase mt-1"
          style={{ color: "var(--got-text-muted)" }}
        >
          The Complete Encyclopedia of Westeros
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-cormorant text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--got-text-dim)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--got-gold-dim), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
