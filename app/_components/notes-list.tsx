"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { NoteMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import gsap from "gsap";

export function NotesList({ notes }: { notes: NoteMeta[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description?.toLowerCase().includes(search.toLowerCase()) ||
        (note.tags || []).some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );
      const matchesTag = selectedTag ? note.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag, notes]);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }
  }, [filteredNotes]);

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">検索</h1>

      <Input
        placeholder="キーワードで検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            #{tag}
          </Button>
        ))}
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNotes.map((note) => (
          <Card
            key={note.slug}
            className="bg-slate-50 border border-slate-200 hover:shadow-lg transition-all p-4"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">
                <Link
                  href={`/notes/${note.slug}`}
                  className="hover:underline text-slate-800"
                >
                  {note.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-slate-600 text-base leading-relaxed">
                {note.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(note.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-slate-500 mt-3">{note.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
