"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { NoteMeta } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotesHighlight({ notes }: { notes: NoteMeta[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <section className="w-full mb-12">
      {/* グラデーション背景円は親で制御するため削除 */}
      <h2 className="relative z-10 text-2xl font-semibold mb-6 text-white drop-shadow-lg text-center">
        最近のノート
      </h2>
      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {notes.map((note) => (
          <Card
            key={note.slug}
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg fade-in opacity-0 translate-y-8 transition-all duration-700"
          >
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/notes/${note.slug}`}
                  className="hover:underline text-white/90"
                >
                  {note.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 text-sm leading-relaxed">
                {note.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
