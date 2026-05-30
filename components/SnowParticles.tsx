"use client";

import { useEffect, useRef } from "react";

export function SnowParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const flakes: HTMLDivElement[] = [];

    const createFlake = () => {
      const el = document.createElement("div");
      el.className = "snow-flake";
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 6;
      const drift = (Math.random() - 0.5) * 80;
      const size = 2 + Math.random() * 3;
      el.style.cssText = `
        left: ${left}%;
        --snow-drift: ${drift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        width: ${size}px;
        height: ${size}px;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      container.appendChild(el);
      flakes.push(el);
      setTimeout(() => {
        el.remove();
        const idx = flakes.indexOf(el);
        if (idx > -1) flakes.splice(idx, 1);
      }, (duration + delay) * 1000 + 500);
    };

    for (let i = 0; i < 18; i++) {
      setTimeout(createFlake, i * 300);
    }
    const interval = setInterval(createFlake, 600);

    return () => {
      clearInterval(interval);
      flakes.forEach((e) => e.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
