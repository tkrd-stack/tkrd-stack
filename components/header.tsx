import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-4 py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-slate-800">
          tkrd-stack
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/notes" className="hover:underline">
            ノート
          </Link>
          <Link href="/unity" className="hover:underline">
            Unity
          </Link>
          <Link href="/about" className="hover:underline">
            プロフィール
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
