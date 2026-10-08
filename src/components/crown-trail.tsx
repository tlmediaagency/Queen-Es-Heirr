import { useEffect } from "react";

const TRAIL = 7;

export function CrownTrail() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduce.matches || coarse.matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const positions = Array.from({ length: TRAIL }, () => ({ ...mouse }));
    const nodes = positions.map((_, i) => {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.className = "crown-trail";
      span.style.opacity = String((TRAIL - i) / TRAIL);
      span.innerHTML =
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M3 17 L5 8 L9 12 L12 6 L15 12 L19 8 L21 17 Z"/><rect x="4" y="18" width="16" height="2" rx="1"/></svg>';
      document.body.appendChild(span);
      return span;
    });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const tick = () => {
      let x = mouse.x;
      let y = mouse.y;
      positions.forEach((pos, index) => {
        pos.x += (x - pos.x) * 0.35;
        pos.y += (y - pos.y) * 0.35;
        x = pos.x;
        y = pos.y;
        const node = nodes[index];
        node.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      nodes.forEach((n) => n.remove());
    };
  }, []);

  return null;
}
