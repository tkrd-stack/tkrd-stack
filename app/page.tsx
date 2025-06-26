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
    <main className="space-y-16 px-4 py-12 max-w-4xl mx-auto">
      {/* Hero セクション */}
      <Hero />
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">
          Web制作・開発のご依頼も承ります
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          和歌山を拠点に、Webアプリケーションやサイト制作のご相談も受け付けています。
          デザイン・UI/UX設計・React/Next.jsによる開発など、お気軽にお問い合わせください。
        </p>
      </section>
      {/* 技術ノートハイライト（仮） */}
      <NotesHighlight notes={latestNotes} />

      {/* アプリ紹介（仮） */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">制作アプリ</h2>
        <div className="flex flex-wrap gap-4">
          <Card className="w-full sm:w-[calc(50%-0.5rem)]">
            <CardHeader>
              <CardTitle>SkillFlow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                学習履歴に基づいて次の教材を提案するアプリ(制作中)
              </p>
            </CardContent>
          </Card>
          <Card className="w-full sm:w-[calc(50%-0.5rem)]">
            <CardHeader>
              <CardTitle>Refeel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                感情を可視化して内面を振り返るアプリ(制作中)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 最後のCTA */}
      <section className="text-center space-y-2">
        <p className="text-muted-foreground text-sm">
          もっと詳しく知りたい方へ
        </p>
        <Button asChild>
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </section>
    </main>
  );
}
