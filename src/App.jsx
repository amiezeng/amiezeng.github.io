import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Card";
import TitleImage from "./Title.jpg";
import ExperienceImage from "./Experience.jpg";
import BearImage from "./Bear.png";
import PaperClipImage from "./paperclip.png";
import RecallImage from "./Recall.png";
import InboxyImage from "./Inboxy.png";
import ExtraImage from "./Extra.png";
import StarImage from "./Star.png";
import linkedinIcon from "./linkedin.webp";
import githubIcon from "./github.webp";

const TOP_COLOR = "#f5f2ed";
const BRUSH_RADIUS = 150;

export default function App() {

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const resetTimer = useRef(null);
  const fadeAnimation = useRef(null);
  const [titlePos, setTitlePos] = useState({ x: 710, y: 110 });
  const [experiencePos, setExperiencePos] = useState({ x: 280, y: 90 });
  const [bearPos, setBearPos] = useState({ x: 200, y: 480 });
  const [paperclipPos, setPaperclipPos] = useState({ x: 1160, y: 90 });
  const [recallPos, setRecallPos] = useState({ x: 710, y: 410 });
  const [inboxyPos, setInboxyPos] = useState({ x: 980, y: 410 });
  const [starPos, setStarPos] = useState({ x: 250, y: 70 });
  const [extraPos, setExtraPos] = useState({ x: 433, y: 500 });
  const draggingTarget = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 10;

  const fillCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "rgba(245, 242, 237, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const cancelFade = () => {
    if (fadeAnimation.current !== null) {
      cancelAnimationFrame(fadeAnimation.current);
      fadeAnimation.current = null;
    }
  };

  const fadeCanvasIn = (duration = 1000) => {
    cancelFade();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const start = performance.now();
    let lastAlpha = 0;

    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const nextAlpha = ease(progress);
      const deltaAlpha = nextAlpha - lastAlpha;
      if (deltaAlpha > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = deltaAlpha;
        ctx.fillStyle = TOP_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        lastAlpha = nextAlpha;
      }

      if (progress < 1) {
        fadeAnimation.current = requestAnimationFrame(animate);
      } else {
        fadeAnimation.current = null;
      }
    };

    fadeAnimation.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const resize = () => {
      fillCanvas();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(resetTimer.current);
      cancelFade();
    };
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (!draggingTarget.current) return;
      event.preventDefault();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const nextPos = {
        x: clientX - dragOffset.current.x,
        y: clientY - dragOffset.current.y,
      };

      if (draggingTarget.current === "title") {
        setTitlePos(nextPos);
      } else if (draggingTarget.current === "experience") {
        setExperiencePos(nextPos);
      } else if (draggingTarget.current === "bear") {
        setBearPos(nextPos);
      }
      else if (draggingTarget.current === "paperclip"){
        setPaperclipPos(nextPos);
      }
      else if (draggingTarget.current === "recall"){
        setRecallPos(nextPos);
      }
      else if (draggingTarget.current === "inboxy"){
        setInboxyPos(nextPos);
      }
      else if (draggingTarget.current === "star"){
        setStarPos(nextPos);
      }
      else if (draggingTarget.current === "extra"){
        setExtraPos(nextPos);
      }
    };

  const handleUp = (event) => {
    const clientX = event.touches ? event.touches[0]?.clientX : event.clientX;
    const clientY = event.touches ? event.touches[0]?.clientY : event.clientY;
    
    // Check if click
    if (draggingTarget.current && clientX && clientY) {
      const distance = Math.sqrt(
        Math.pow(clientX - dragStartPos.current.x, 2) +
        Math.pow(clientY - dragStartPos.current.y, 2)
      );
      
      if (distance < DRAG_THRESHOLD) {
        // This was a click, not a drag
        if (draggingTarget.current === "recall") {
          window.open("https://devpost.com/software/recall-1wr8y9", "_blank");
        } else if (draggingTarget.current === "inboxy") {
          window.open("https://devpost.com/software/inboxie", "_blank");
        }
      }
    }
      draggingTarget.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  const scheduleReset = () => {
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      fadeCanvasIn(1000);
    }, 3000);
  };

  const getPos = (e) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const erase = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 5);
    ctx.fill();
    scheduleReset();
  };

  const startDrawing = (e) => {
    cancelFade();
    isDrawing.current = true;
    erase(e);
  };

  const stopDrawing = (e) => {
    isDrawing.current = false;
    scheduleReset();
  };

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "fixed", top: 0, left: 0, cursor: "crosshair" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "url('/background1.jpg') center/cover no-repeat",
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
        onMouseDown={startDrawing}
        onMouseMove={erase}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={erase}
        onTouchEnd={stopDrawing}
      />
      <div className = "nav-bar">
        <a href="https://www.linkedin.com/in/amiezeng" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" width={40} height={40} />
        </a>
        <a href="https://github.com/amiezeng" target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="GitHub" width={40} height={40} />
        </a>
      </div>
      <Card
        cardPos={titlePos}
        image={TitleImage}
        width={520}
        onMouseDown={(e) => {
          draggingTarget.current = "title";
          dragOffset.current = {
            x: e.clientX - titlePos.x,
            y: e.clientY - titlePos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "title";
          dragOffset.current = {
            x: e.touches[0].clientX - titlePos.x,
            y: e.touches[0].clientY - titlePos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={experiencePos}
        image={ExperienceImage}
        width={400}
        onMouseDown={(e) => {
          draggingTarget.current = "experience";
          dragOffset.current = {
            x: e.clientX - experiencePos.x,
            y: e.clientY - experiencePos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "experience";
          dragOffset.current = {
            x: e.touches[0].clientX - experiencePos.x,
            y: e.touches[0].clientY - experiencePos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={bearPos}
        image={BearImage}
        width={250}
        onMouseDown={(e) => {
          draggingTarget.current = "bear";
          dragOffset.current = {
            x: e.clientX - bearPos.x,
            y: e.clientY - bearPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "bear";
          dragOffset.current = {
            x: e.touches[0].clientX - bearPos.x,
            y: e.touches[0].clientY - bearPos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={paperclipPos}
        image={PaperClipImage}
        width={100}
        onMouseDown={(e) => {
          draggingTarget.current = "paperclip";
          dragOffset.current = {
            x: e.clientX - paperclipPos.x,
            y: e.clientY - paperclipPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "paperclip";
          dragOffset.current = {
            x: e.touches[0].clientX - paperclipPos.x,
            y: e.touches[0].clientY - paperclipPos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={recallPos}
        image={RecallImage}
        width={250}
        onMouseDown={(e) => {
          draggingTarget.current = "recall";
          dragStartPos.current = { x: e.clientX, y: e.clientY };
          dragOffset.current = {
            x: e.clientX - recallPos.x,
            y: e.clientY - recallPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "recall";
          dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          dragOffset.current = {
            x: e.touches[0].clientX - recallPos.x,
            y: e.touches[0].clientY - recallPos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={inboxyPos}
        image={InboxyImage}
        width={250}
        onMouseDown={(e) => {
          draggingTarget.current = "inboxy";
          dragStartPos.current = { x: e.clientX, y: e.clientY };
          dragOffset.current = {
            x: e.clientX - inboxyPos.x,
            y: e.clientY - inboxyPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "inboxy";
          dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          dragOffset.current = {
            x: e.touches[0].clientX - inboxyPos.x,
            y: e.touches[0].clientY - inboxyPos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={starPos}
        image={StarImage}
        width={100}
        onMouseDown={(e) => {
          draggingTarget.current = "star";
          dragOffset.current = {
            x: e.clientX - starPos.x,
            y: e.clientY - starPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "star";
          dragOffset.current = {
            x: e.touches[0].clientX - starPos.x,
            y: e.touches[0].clientY - starPos.y,
          };
          e.stopPropagation();
        }}
      />
      <Card
        cardPos={extraPos}
        image={ExtraImage}
        width={250}
        onMouseDown={(e) => {
          draggingTarget.current = "extra";
          dragOffset.current = {
            x: e.clientX - extraPos.x,
            y: e.clientY - extraPos.y,
          };
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          draggingTarget.current = "extra";
          dragOffset.current = {
            x: e.touches[0].clientX - extraPos.x,
            y: e.touches[0].clientY - extraPos.y,
          };
          e.stopPropagation();
        }}
      />
    </div>
    
  );
}