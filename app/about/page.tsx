import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">tkrd dch</CardTitle>
          <p className="text-muted-foreground">
            Webエンジニア／教育者。上流から下流、子どもから大人までをつなぐ技術者。
          </p>
  和歌山を拠点に、Web技術・教育・創作をテーマに活動中のポートフォリオ兼実験場です。
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">得意領域</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>JavaによるWebアプリケーション開発</li>
              <li>基本設計〜テストまでの一貫対応</li>
              <li>文教業界の業務知識</li>
              <li>React/Next.jsによるモダンUI構築（個人開発ベース）</li>
              <li>教育における教材作成・授業・保護者対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">職歴</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold">スタジオノモス（2016〜）</p>
                <p className="text-muted-foreground">大学向けWebシステムやEC製品の受託開発。HTML, CSS, JavaScript, PHP, Java, Oracle, PostgreSQLなどを使用。</p>

              </div>
              <div>
                <p className="font-semibold">Sky株式会社（2020〜2021）</p>
                <p className="text-muted-foreground">自動車メーカー社内システム開発。要件定義〜テストまで担当。</p>
              </div>
              <div>
                <p className="font-semibold">アントレキッズ和歌山校（2024〜）</p>
                <p className="text-muted-foreground">小中学生向けにMinecraft／Scratch／Robloxを用いた教育を担当。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">技術スタック</h2>
            <h3 className="text-sm font-medium mb-1">業務・運用経験あり</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>HTML</Badge>
              <Badge>CSS</Badge>
              <Badge>JavaScript</Badge>
              <Badge>Java</Badge>
              <Badge>PHP</Badge>
              <Badge>MySQL</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Oracle</Badge>
            </div>
            <h3 className="text-sm font-medium mb-1">個人開発・学習・継続使用</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>React</Badge>
              <Badge>Next.js</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Unity</Badge>
              <Badge>Vercel</Badge>
              <Badge>Firebase（検証・構想レベル）</Badge>
              <Badge>GSAP</Badge>
              <Badge>Framer Motion</Badge>
              <Badge>Expo（個人開発アプリで使用中）</Badge>
            </div>
            <h3 className="text-sm font-medium mb-1">使用ツール・サービス</h3>
            <div className="flex flex-wrap gap-2 mb-4">
            <Badge>GitHub</Badge>
            <Badge>Docker Desktop</Badge>
            <Badge>Figma</Badge>
            <Badge>Canva</Badge>
            <Badge>Docker Desktop</Badge>
            <Badge>Vercel</Badge>
            <Badge>Firebase Console</Badge>
            <Badge>VS Code</Badge>
            <Badge>Postman</Badge>
            <Badge>Notion</Badge>
            </div>
          </section>


        </CardContent>
      </Card>
    </main>
  );
}
