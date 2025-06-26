import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "./_components/hero";
import NotesHighlight from "./_components/notes-highlight";
import { getAllNotes } from "@/lib/get-notes"; // ノートの取得関数

export default async function HomePage() {
  const notes = await getAllNotes();
  const latestNotes = notes.slice(0, 3); // 最新3件だけ
  return (
    <main className="w-full mx-auto">
      {/* Hero セクション */}
      <Hero />

      {/* セクション間のスペーシング */}
      <div className="pt-16 pb-8 bg-gradient-to-b from-white to-slate-50">
        {/* 技術ノートハイライト */}
        <div className="container mx-auto px-4">
          <NotesHighlight notes={latestNotes} />
        </div>
      </div>

      {/* アプリ紹介 */}
      <section className="container mx-auto px-4 py-12 bg-slate-50">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          制作アプリ
        </h2>
        <div className="flex flex-wrap gap-4">
          <Card className="w-full sm:w-[calc(50%-0.5rem)] bg-white border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-800">SkillFlow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                学習履歴に基づいて次の教材を提案するアプリ(制作中)
              </p>
            </CardContent>
          </Card>
          <Card className="w-full sm:w-[calc(50%-0.5rem)] bg-white border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-slate-800">Refeel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                感情を可視化して内面を振り返るアプリ(制作中)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 最後のCTA */}
      <section className="container mx-auto px-4 py-16 text-center space-y-4 bg-gradient-to-b from-slate-50 to-white">
        <p className="text-slate-600 text-sm">もっと詳しく知りたい方へ</p>
        <Button asChild>
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </section>
    </main>
  );
}
