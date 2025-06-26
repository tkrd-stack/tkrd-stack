import Link from "next/link";
import { Button } from "@/components/ui/button";

import Hero from "./_components/hero";
import NotesHighlight from "./_components/notes-highlight";
import { getAllNotes } from "@/lib/get-notes"; // ノートの取得関数

import { AppShowcase } from "@/components/app-showcase";

export default async function HomePage() {
  const notes = await getAllNotes();
  const latestNotes = notes.slice(0, 10); // 最新3件だけ
  return (
    <main className="w-full mx-auto">
      {/* Hero セクション */}
      <Hero />

      {/* アプリ紹介＋ノートハイライトを共通背景でラップ */}
      <section className="relative min-h-[60vh] bg-black text-white p-6 overflow-hidden mb-12">
        {/* グラデーション背景円 */}
        <div className="absolute top-10 left-[-80px] w-[260px] h-[260px] rounded-full bg-gradient-to-br from-green-400 to-gray-900 opacity-70 blur-2xl z-0 bg-circle transition-transform duration-500" />
        <div className="relative z-10 space-y-12">
          <AppShowcase />
          {/* 技術ノートハイライト */}
          <NotesHighlight notes={latestNotes} />
        </div>
        <div className="container mx-auto px-4 py-16 text-center space-y-4 ">
          <p className="text-slate-600 text-sm">もっと詳しく知りたい方へ</p>
          <Button asChild>
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
      </section>

      {/* 最後のCTA */}
      <section></section>
    </main>
  );
}
