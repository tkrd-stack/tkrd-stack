"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useGsapScrollTrigger } from "@/lib/useGsapScrollTrigger";
import { gsap } from "gsap";

function ShowcaseCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) {
  return (
    <Card className="bg-white/10 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
        <a href={url} className="text-blue-500 hover:underline">
          View more
        </a>
      </CardContent>
    </Card>
  );
}

export function AppShowcase() {
  useGsapScrollTrigger([
    () => {
      gsap.to(".fade-in", {
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    () => {
      gsap.to(".bg-circle", {
        scrollTrigger: {
          trigger: ".hero",
          scrub: true,
        },
        x: 100,
        y: -50,
        scale: 1.1,
        ease: "none",
      });
    },
  ]);

  return (
    <section className="w-full">
      {/* 背景サークルは親で制御するため削除 */}
      <div className="hero relative z-10 max-w-3xl mx-auto text-center mt-40 mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">
          制作アプリ
        </h2>
        <p className="text-lg text-gray-300 fade-in opacity-0 translate-y-8 mb-8">
          tkrd-stackで開発中のアプリケーションを紹介します。
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6 fade-in opacity-0 translate-y-8">
        <h2 className="text-2xl font-bold text-white grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          ウェブアプリ一覧
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShowcaseCard
            title="Studio"
            description="studioで作ったWEBサイト"
            url="https://azure372601.studio.site"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          ネイティブアプリ一覧
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShowcaseCard
            title="SkillFlow"
            description="学習履歴に基づいて次の教材を提案するアプリ(制作中)"
            url="https://example.com/skillflow"
          />
          <ShowcaseCard
            title="Refeel"
            description="感情を可視化して内面を振り返るアプリ(制作中)"
            url="https://example.com/refeel"
          />
        </div>
      </div>
    </section>
  );
}
