"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function GradientCircle() {
  const [circlePos, setCirclePos] = useState({ x: 10, y: 10 });
  const lastMouse = useRef<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setCirclePos({
        x: e.clientX - 100,
        y: e.clientY - 100,
      });
    };
    const handleScroll = () => {
      if (lastMouse.current) {
        setCirclePos({
          x: lastMouse.current.x,
          y: lastMouse.current.y,
        });
      }
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed w-[160px] h-[160px] rounded-full bg-gradient-to-br from-green-400 to-gray-900 opacity-70 blur-2xl z-0 bg-circle transition-transform duration-500"
      style={{ left: circlePos.x, top: circlePos.y }}
    />,
    document.body,
  );
}
