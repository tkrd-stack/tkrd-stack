"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Unity, useUnityContext } from "react-unity-webgl";

// プラグイン登録
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wave1Ref = useRef<SVGSVGElement>(null);
  const wave2Ref = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      top: number;
      left: number;
      duration: number;
      delay: number;
    }>
  >([]);

  // Unity WebGL設定
  const {
    unityProvider,
    isLoaded: unityIsLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "/unity/Build/RefeelEmotionSphere.loader.js",
    dataUrl: "/unity/Build/RefeelEmotionSphere.data",
    frameworkUrl: "/unity/Build/RefeelEmotionSphere.framework.js",
    codeUrl: "/unity/Build/RefeelEmotionSphere.wasm",
  });

  // Unity読み込み状態をログ出力
  useEffect(() => {
    if (isMounted) {
      console.log("Unity状態:", {
        unityProvider: !!unityProvider,
        unityIsLoaded,
        loadingProgression,
        isMounted,
      });
    }
  }, [unityProvider, unityIsLoaded, loadingProgression, isMounted]);

  // クライアントサイドでのみマウント
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // パーティクルデータをクライアントサイドで生成
  useEffect(() => {
    if (isMounted) {
      const particleData = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 5,
      }));
      setParticles(particleData);
    }
  }, [isMounted]);

  useEffect(() => {
    if (
      !isMounted ||
      !containerRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !buttonRef.current ||
      !wave1Ref.current ||
      !wave2Ref.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          delay: 0.5,
          duration: 1,
          ease: "power2.out",
        });
      }

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            delay: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
        );

        gsap.to(buttonRef.current, {
          y: -5,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
          delay: 2, // 最初のアニメーション完了後に開始
        });
      }

      if (wave1Ref.current) {
        gsap.to(wave1Ref.current, {
          x: "-50%",
          repeat: -1,
          duration: 20,
          ease: "linear",
        });
      }
      if (wave2Ref.current) {
        gsap.to(wave2Ref.current, {
          x: "0%",
          duration: 20,
          ease: "linear",
          repeat: -1,
        });
      }

      // パーティクルアニメーション
      particlesRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            scale: 1.2,
            opacity: 0.5,
            repeat: -1,
            yoyo: true,
            duration: particles[i]?.duration || 3,
            delay: particles[i]?.delay || 0,
            ease: "sine.inOut",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [particles, isMounted]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center 
      bg-gradient-radial from-indigo-950 via-slate-900 to-black text-slate-100 px-4 relative overflow-hidden"
    >
      {/* Unity背景 - 最背面 */}
      <div className="absolute inset-0 z-0">
        {isMounted ? (
          unityProvider ? (
            <div className="w-full h-full opacity-100">
              <Unity
                unityProvider={unityProvider}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  pointerEvents: "none",
                  display: "block",
                  background: "transparent",
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-teal-900/20 to-black/40 flex items-center justify-center">
              <span className="text-slate-300/60 text-sm">
                Unity Loading...
              </span>
            </div>
          )
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-teal-900/30 to-black/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)]" />
          </div>
        )}
      </div>

      {/* 装飾レイヤー - 中間 */}
      <div className="absolute inset-0 z-10">
        <svg
          ref={wave1Ref}
          className="absolute left-0 w-[200%] h-full opacity-50"
          viewBox="0 0 1440 320"
          fill="#60a5fa"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#06b6d4"
            fillOpacity="0.08"
            d="M0,224L30,229.3C60,235,120,245,180,245.3C240,245,300,235,360,213.3C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,213.3C960,203,1020,181,1080,165.3C1140,149,1200,139,1260,122.7C1320,107,1380,85,1410,74.7L1440,64V320H0Z"
          />
        </svg>
        <svg
          ref={wave2Ref}
          className="absolute left-[100%] w-[200%] h-full opacity-50"
          viewBox="0 0 1440 320"
          fill="#06b6d4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#06b6d4"
            fillOpacity="0.08"
            d="M0,224L30,229.3C60,235,120,245,180,245.3C240,245,300,235,360,213.3C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,213.3C960,203,1020,181,1080,165.3C1140,149,1200,139,1260,122.7C1320,107,1380,85,1410,74.7L1440,64V320H0Z"
          />
        </svg>

        {/* パーティクル */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={particle.id}
              ref={(el) => {
                if (el) particlesRef.current[i] = el;
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-teal-300 opacity-20 blur-[0.5px]"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* コンテンツ - 最前面 */}
      <div className="relative z-20 flex flex-col items-center space-y-8">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-slate-100"
        >
          tkrd-stack
        </h1>

        <section ref={subtitleRef} className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-2 text-slate-200">
            Web制作・開発のご依頼も承ります
          </h2>
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            和歌山を拠点に、Webアプリケーションやサイト制作のご相談も受け付けています。
            デザイン・UI/UX設計・React/Next.jsによる開発など、お気軽にお問い合わせください。
          </p>

          {/* Unity読み込み状況表示 */}
          {isMounted && loadingProgression > 0 && loadingProgression < 1 && (
            <div className="mt-4 flex flex-col items-center space-y-2">
              <div className="w-48 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-teal-400 transition-all duration-300"
                  style={{ width: `${(loadingProgression || 0) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">
                Unity Loading... {Math.round((loadingProgression || 0) * 100)}%
              </p>
            </div>
          )}
        </section>

        <button
          ref={buttonRef}
          className="relative z-30 px-8 py-4 backdrop-blur-sm bg-white/10 text-slate-100 
          rounded-full text-lg font-medium shadow-xl hover:bg-white/20 transition-all duration-300 
          border border-white/20 hover:border-white/30 
          bg-gradient-to-r from-indigo-500/20 via-teal-500/20 to-indigo-500/20
          hover:from-indigo-400/30 hover:via-teal-400/30 hover:to-indigo-400/30
          hover:shadow-2xl hover:scale-105"
          style={{
            position: "relative",
            opacity: 0,
            transform: "scale(0.8)",
          }}
        >
          <span className="relative z-10">ノートを見る</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* セクション間の滑らかな遷移 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-100/80 z-30 pointer-events-none"></div>

      {/* 対角線カット効果 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1200,0 L1200,60 L0,120 Z"
            fill="#f1f5f9"
            opacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
}
