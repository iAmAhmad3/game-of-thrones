"use client";

import { useEffect, useRef } from "react";

export function EmberParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const embers: HTMLDivElement[] = [];

    const createEmber = () => {
      const el = document.createElement("div");
      el.className = "ember";
      const left = Math.random() * 100;
      const duration = 4 + Math.random() * 5;
      const delay = Math.random() * 4;
      const drift = (Math.random() - 0.5) * 120;
      el.style.cssText = `
        left: ${left}%;
        --drift: ${drift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        opacity: ${0.5 + Math.random() * 0.5};
      `;
      container.appendChild(el);
      embers.push(el);
      setTimeout(() => {
        el.remove();
        const idx = embers.indexOf(el);
        if (idx > -1) embers.splice(idx, 1);
      }, (duration + delay) * 1000 + 1000);
    };

    for (let i = 0; i < 20; i++) {
      setTimeout(createEmber, i * 200);
    }
    const interval = setInterval(createEmber, 400);

    return () => {
      clearInterval(interval);
      embers.forEach((e) => e.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
