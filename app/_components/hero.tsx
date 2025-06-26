'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <section ref={ref} className="text-center space-y-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
        tkrd-stack
      </h1>
      <p className="text-muted-foreground text-lg">
        技術と思考を記録するスタック型ポートフォリオ
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/notes">ノートを見る</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/about">プロフィール</Link>
        </Button>
      </div>
    </section>
  );
}
