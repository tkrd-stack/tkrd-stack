"useGsapScrollTrigger.ts";
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

export function useGsapScrollTrigger(animations: (() => void)[]) {
  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }
    animations.forEach((fn) => fn());
    // ScrollTrigger.refresh(); // 必要なら
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [animations]);
}
