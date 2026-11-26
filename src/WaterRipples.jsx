import { useEffect, useRef } from "react";

export default function WaterRipples() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ripples = [];
    let frame = null;
    let lastRipple = -Infinity;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const clear = () => context.clearRect(0, 0, width, height);
    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      ripples = [];
      clear();
    };

    const resize = () => {
      reset();
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = (now) => {
      clear();
      ripples = ripples.filter((ripple) => now - ripple.start < 1400);
      for (const ripple of ripples) {
        const progress = (now - ripple.start) / 1400;
        const radius = 5 + progress * 85;
        const opacity = (1 - progress) ** 2 * 0.2;
        // A faint highlight beside each blue-grey ring gives a watery shimmer.
        for (let ring = 0; ring < 2; ring += 1) {
          const size = radius - ring * 14;
          if (size <= 0) continue;
          context.beginPath();
          context.arc(ripple.x, ripple.y, size, 0, Math.PI * 2);
          context.strokeStyle = `rgba(95, 139, 155, ${opacity * (1 - ring * 0.35)})`;
          context.lineWidth = 1;
          context.stroke();
          context.beginPath();
          context.arc(ripple.x, ripple.y, size + 2, 0, Math.PI * 2);
          context.strokeStyle = `rgba(255, 255, 255, ${opacity * 1.5})`;
          context.stroke();
        }
      }
      frame = ripples.length ? requestAnimationFrame(draw) : null;
    };

    const move = (event) => {
      if (motion.matches || event.pointerType === "touch") return;
      const now = performance.now();
      if (now - lastRipple < 90) return;
      lastRipple = now;
      ripples.push({ x: event.clientX, y: event.clientY, start: now });
      if (frame === null) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    motion.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-ripples" aria-hidden="true" />;
}
