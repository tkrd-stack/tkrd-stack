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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        最近のノート
      </h2>
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <Card
            key={note.slug}
            className="bg-white hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-indigo-200"
          >
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/notes/${note.slug}`}
                  className="hover:underline text-slate-800"
                >
                  {note.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                {note.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
