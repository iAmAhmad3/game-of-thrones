"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import charactersData from "@/data/characters.json";

type QuoteEntry = {
  quote: string;
  character: string;
  characterId: string;
};

// Build quiz pool from character data
function buildQuotePool(): QuoteEntry[] {
  const pool: QuoteEntry[] = [];
  (charactersData as Array<{ id: string; name: string; quotes: string[] }>).forEach((c) => {
    if (c.quotes && c.quotes.length > 0) {
      c.quotes.forEach((q) => {
        if (q && q.length > 10 && !q.startsWith("...")) {
          pool.push({ quote: q, character: c.name, characterId: c.id });
        }
      });
    }
  });
  return pool;
}

function getRandomItems<T>(arr: T[], count: number, exclude?: T): T[] {
  const available = exclude ? arr.filter((x) => x !== exclude) : [...arr];
  const result: T[] = [];
  while (result.length < count && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    result.push(available.splice(idx, 1)[0]);
  }
  return result;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOTAL_QUESTIONS = 10;
const allCharacterNames = Array.from(new Set((charactersData as Array<{ name: string }>).map((c) => c.name)));

type QuizState = "playing" | "answered" | "results";

function getVerdict(score: number): { title: string; description: string; color: string } {
  if (score >= 9) return {
    title: "Hand of the King",
    description: "You know Westeros as intimately as a Maester knows his chains. The realm bows to your knowledge.",
    color: "var(--got-gold)",
  };
  if (score >= 5) return {
    title: "Maester of the Citadel",
    description: "A true scholar of the Seven Kingdoms. Your knowledge serves you well, even if a few truths slipped past.",
    color: "var(--got-text-parchment)",
  };
  return {
    title: "Shame. Shame. Shame.",
    description: "The sparrows are disappointed. Perhaps more time in the library and less time at the feast.",
    color: "var(--got-text-muted)",
  };
}

export function QuizClient() {
  const quotePool = useMemo(() => buildQuotePool(), []);

  const generateQuestion = useCallback((pool: QuoteEntry[], usedIndices: Set<number>) => {
    const available = pool.map((_, i) => i).filter((i) => !usedIndices.has(i));
    if (available.length === 0) return null;
    const idx = available[Math.floor(Math.random() * available.length)];
    const correct = pool[idx];
    const wrongNames = getRandomItems(
      allCharacterNames.filter((n) => n !== correct.character),
      3
    );
    const options = shuffle([correct.character, ...wrongNames]);
    return { idx, correct, options };
  }, []);

  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [currentQ, setCurrentQ] = useState(() => {
    return generateQuestion(buildQuotePool(), new Set());
  });
  const [questionNum, setQuestionNum] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<QuizState>("playing");
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<boolean[]>([]);

  const handleAnswer = (choice: string) => {
    if (state !== "playing" || selected !== null) return;
    setSelected(choice);
    const correct = choice === currentQ?.correct.character;
    if (correct) setScore((s) => s + 1);
    setScoreHistory((h) => [...h, correct]);
    setState("answered");
  };

  const handleNext = () => {
    if (!currentQ) return;
    const newUsed = new Set(usedIndices).add(currentQ.idx);
    setUsedIndices(newUsed);

    if (questionNum >= TOTAL_QUESTIONS) {
      setState("results");
      return;
    }

    const next = generateQuestion(quotePool, newUsed);
    if (!next) {
      setState("results");
      return;
    }

    setCurrentQ(next);
    setQuestionNum((n) => n + 1);
    setSelected(null);
    setState("playing");
  };

  const handleRestart = () => {
    const newPool = buildQuotePool();
    setUsedIndices(new Set());
    setCurrentQ(generateQuestion(newPool, new Set()));
    setQuestionNum(1);
    setSelected(null);
    setState("playing");
    setScore(0);
    setScoreHistory([]);
  };

  const verdict = getVerdict(score);

  if (state === "results") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl p-10 text-center"
        style={{
          background: "var(--got-bg-card)",
          border: "1px solid var(--got-border)",
        }}
      >
        {/* Score display */}
        <div className="mb-8">
          <div
            className="font-almendra text-8xl font-bold glow-gold-subtle mb-2"
            style={{ color: "var(--got-gold)" }}
          >
            {score}/{TOTAL_QUESTIONS}
          </div>
          <div className="flex justify-center gap-1.5 mb-6">
            {scoreHistory.map((correct, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                className="w-3 h-3 rounded-full"
                style={{ background: correct ? "#4caf50" : "var(--got-crimson-bright)" }}
              />
            ))}
          </div>
        </div>

        <div className="mb-2">
          <p className="font-cormorant text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--got-text-muted)" }}>
            Your Verdict
          </p>
          <h2
            className="font-cinzel-deco text-3xl font-bold mb-4"
            style={{ color: verdict.color }}
          >
            {verdict.title}
          </h2>
          <p className="font-garamond text-lg italic max-w-md mx-auto" style={{ color: "var(--got-text-muted)" }}>
            {verdict.description}
          </p>
        </div>

        <div
          className="my-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--got-gold) 30%, var(--got-gold) 70%, transparent)" }}
        />

        <button
          onClick={handleRestart}
          className="font-cinzel text-sm tracking-[0.2em] uppercase px-8 py-3 rounded transition-all duration-250 gold-btn-filled"
        >
          Play Again
        </button>
      </motion.div>
    );
  }

  if (!currentQ) return null;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i < questionNum - 1 ? "20px" : i === questionNum - 1 ? "32px" : "8px",
                background: i < questionNum - 1
                  ? (scoreHistory[i] ? "#4caf50" : "var(--got-crimson-bright)")
                  : i === questionNum - 1
                  ? "var(--got-gold)"
                  : "var(--got-border)",
              }}
            />
          ))}
        </div>
        <span className="font-almendra text-lg font-bold" style={{ color: "var(--got-gold)" }}>
          {score} / {questionNum - 1}
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.idx}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--got-bg-card)", border: "1px solid var(--got-border)" }}
        >
          {/* Quote */}
          <div
            className="p-8 md:p-10 relative"
            style={{ background: "var(--got-bg-elevated)", borderBottom: "1px solid var(--got-border)" }}
          >
            <div
              className="font-cinzel-deco text-8xl leading-none absolute top-4 left-6 select-none pointer-events-none"
              style={{ color: "var(--got-gold)", opacity: 0.06 }}
              aria-hidden
            >
              &ldquo;
            </div>
            <p
              className="font-garamond text-xl md:text-2xl italic leading-relaxed text-center max-w-xl mx-auto relative z-10"
              style={{ color: "var(--got-text-parchment)" }}
            >
              &ldquo;{currentQ.correct.quote}&rdquo;
            </p>
            <p
              className="font-cormorant text-xs tracking-[0.35em] uppercase text-center mt-4"
              style={{ color: "var(--got-text-dim)" }}
            >
              Question {questionNum} of {TOTAL_QUESTIONS}
            </p>
          </div>

          {/* Options */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option) => {
              const isCorrect = option === currentQ.correct.character;
              const isSelected = option === selected;
              const revealed = state === "answered";

              let bg = "transparent";
              let borderColor = "var(--got-border)";
              let color = "var(--got-text-parchment)";

              if (revealed) {
                if (isCorrect) {
                  bg = "rgba(201, 168, 76, 0.15)";
                  borderColor = "var(--got-gold)";
                  color = "var(--got-gold)";
                } else if (isSelected && !isCorrect) {
                  bg = "rgba(192, 57, 43, 0.15)";
                  borderColor = "var(--got-crimson-bright)";
                  color = "var(--got-crimson-bright)";
                }
              }

              return (
                <motion.button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={state === "answered"}
                  whileHover={state === "playing" ? { scale: 1.02, y: -1 } : {}}
                  whileTap={state === "playing" ? { scale: 0.97 } : {}}
                  animate={revealed && isCorrect ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="w-full text-left px-5 py-4 rounded-lg font-cinzel text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:cursor-default"
                  style={{
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    color,
                  }}
                >
                  <span className="font-cormorant text-xs tracking-widest uppercase mr-3 opacity-50">
                    {revealed && isCorrect ? "✓" : revealed && isSelected ? "✗" : "◆"}
                  </span>
                  {option}
                </motion.button>
              );
            })}
          </div>

          {/* Next button */}
          <AnimatePresence>
            {state === "answered" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{
                    background: selected === currentQ.correct.character
                      ? "rgba(201, 168, 76, 0.08)"
                      : "rgba(192, 57, 43, 0.08)",
                    border: `1px solid ${selected === currentQ.correct.character ? "var(--got-gold)" : "var(--got-crimson-bright)"}22`,
                  }}
                >
                  <p className="font-garamond text-sm" style={{ color: "var(--got-text-muted)" }}>
                    {selected === currentQ.correct.character
                      ? `✓ Correct! — `
                      : `✗ The answer was `}
                    <strong style={{ color: "var(--got-gold)" }}>{currentQ.correct.character}</strong>
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full font-cinzel text-sm tracking-[0.2em] uppercase px-6 py-3 rounded gold-btn-filled transition-all duration-200"
                >
                  {questionNum >= TOTAL_QUESTIONS ? "See Results →" : "Next Quote →"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
