import { useEffect, useRef } from "react";

export default function ClickStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars = [];
    let frame = null;
    let lastTime = null;
    let width = 0;
    let height = 0;

    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
      stars = [];
      context.clearRect(0, 0, width, height);
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

    const draw = (time) => {
      const dt = Math.min((time - (lastTime ?? time)) / 1000, 0.04);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        if (time < star.start) continue;
        star.vy += 240 * dt;
        star.x += star.vx * dt;
        star.y += star.vy * dt;
        star.rotation += star.spin * dt;
        context.save();
        context.translate(star.x, star.y);
        context.rotate(star.rotation);
        context.beginPath();
        for (let point = 0; point < 10; point += 1) {
          const angle = (point * Math.PI) / 5 - Math.PI / 2;
          const radius = point % 2 ? star.size * 0.45 : star.size;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.fillStyle = star.color;
        context.fill();
        context.restore();
      }
      stars = stars.filter((star) => star.y < height + star.size);
      frame = stars.length ? requestAnimationFrame(draw) : null;
      if (frame === null) lastTime = null;
    };

    const click = (event) => {
      if (motion.matches || event.detail === 0) return;
      const now = performance.now();
      for (let index = 0; index < 3; index += 1) {
        stars.push({
          start: now + index * 140,
          x: event.clientX + (Math.random() - 0.5) * 24,
          y: event.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 16,
          vy: 16,
          size: 7 + Math.random() * 3,
          rotation: 0,
          spin: (Math.random() - 0.5) * 0.8,
          color: "#000000",
        });
      }
      stars = stars.slice(-60);
      if (frame === null) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("click", click, { capture: true, passive: true });
    window.addEventListener("resize", resize);
    motion.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("click", click, true);
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return <canvas ref={canvasRef} className="click-stars" aria-hidden="true" />;
}
