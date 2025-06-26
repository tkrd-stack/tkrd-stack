'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import { NoteMeta } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import gsap from "gsap";

export function NotesList({ notes }: { notes: NoteMeta[] }) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description?.toLowerCase().includes(search.toLowerCase()) ||
        (note.tags || []).some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = selectedTag ? note.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

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
        }
      );
    }
  }, [filteredNotes]);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">技術ノート</h1>

      <Input
        placeholder="キーワードで検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
            <Button variant={selectedTag === tag ? "default" : "outline"}>#{tag}</Button>

        ))}
      </div>

      <div ref={containerRef} className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.slug} className="bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>
                <Link href={`/notes/${note.slug}`} className="hover:underline text-slate-800">
                  {note.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-600 text-sm">{note.description}</p>
              <div className="flex flex-wrap gap-2">
                {(note.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-slate-500">{note.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
