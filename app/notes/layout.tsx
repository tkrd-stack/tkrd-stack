import Link from "next/link";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">学習ノート</h1>
        <p className="text-sm text-muted-foreground">自分の理解を深めるための技術メモ</p>
      </header>
      <div className="mb-8">
        <Link href="/notes" className="text-sm text-blue-500 underline">
          ← 一覧に戻る
        </Link>
      </div>
      <article className="leading-7 space-y-6">{children}</article>
    </main>
  );
}
