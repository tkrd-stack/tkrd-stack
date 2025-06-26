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
    <section>
      <h2 className="text-2xl font-semibold mb-4">最近のノート</h2>
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <Card
            key={note.slug}
            className="bg-slate-50 hover:shadow-md transition-all"
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
              <p className="text-muted-foreground text-sm">
                {note.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
