"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// プラグイン登録
if (typeof window !== 'undefined') {
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
  const [particles, setParticles] = useState<Array<{
    id: number;
    top: number;
    left: number;
    duration: number;
    delay: number;
  }>>([]);

  // パーティクルデータをクライアントサイドで生成
  useEffect(() => {
    const particleData = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5
    }));
    setParticles(particleData);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !buttonRef.current || !wave1Ref.current || !wave2Ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          delay: 0.5,
          duration: 1,
          ease: 'power2.out'
        });
      }

      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current, 
          {
            scale: 0.8,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            delay: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
          }
        );

        gsap.to(buttonRef.current, {
          y: -5,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'sine.inOut',
          delay: 2 // 最初のアニメーション完了後に開始
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
        x: '0%',
        duration: 20,
        ease: 'linear',
        repeat: -1
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
            ease: 'sine.inOut'
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <section
      ref={containerRef}
      className="min-h-[50vh] flex flex-col items-center justify-center text-center 
      bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 relative"
    >
      <div className="overflow-hidden absolute inset-0 -z-10">
          <svg
            ref={wave1Ref}
            className="absolute left-0 w-[200%] h-full opacity-50 "
            viewBox="0 0 1440 320"
            fill="#60a5fa"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#60a5fa"
              fillOpacity="0.1"
              d="M0,224L30,229.3C60,235,120,245,180,245.3C240,245,300,235,360,213.3C420,192,480,160,540,160C600,160,660,192,720,208C780,224,840,224,900,213.3C960,203,1020,181,1080,165.3C1140,149,1200,139,1260,122.7C1320,107,1380,85,1410,74.7L1440,64V320H0Z"
            />
          </svg>
          <svg
            ref={wave2Ref}
            className="absolute left-[100%] w-[200%] h-full  opacity-50"
            viewBox="0 0 1440 320"
            fill="#60a5fa"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#60a5fa"
              fillOpacity="0.1"
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
              className="absolute w-2 h-2 rounded-full bg-white opacity-10 blur-sm"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-30 flex flex-col items-center space-y-8">
        <h1 ref={titleRef} className="text-5xl  md:text-6xl font-bold">
          tkrd-stack
        </h1>
        
        <section ref={subtitleRef} className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">
            Web制作・開発のご依頼も承ります
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            和歌山を拠点に、Webアプリケーションやサイト制作のご相談も受け付けています。
            デザイン・UI/UX設計・React/Next.jsによる開発など、お気軽にお問い合わせください。
          </p>
        </section>
        
        <button
          ref={buttonRef}
          className="relative z-50 px-6 py-3 bg-white text-black rounded-full text-lg shadow-lg hover:bg-gray-200 transition border-2 border-gray-300 opacity-0"
          style={{ position: 'relative', zIndex: 9999, transform: 'scale(0.8)' }}
        >
          ノートを見る
        </button>
      </div>
    </section>
  );
}
