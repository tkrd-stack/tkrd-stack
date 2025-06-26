import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SkillFlowPage() {
  return (
    <main className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        SkillFlow
      </h1>

      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList className="bg-white/30 backdrop-blur-sm">
          <TabsTrigger value="progress">現在のスキル</TabsTrigger>
          <TabsTrigger value="next">次に学ぶ</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <Card className="bg-white/70 dark:bg-black/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle>スキル一覧</CardTitle>
            </CardHeader>
            <CardContent>{/* 進捗バーチャートやリスト */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="next">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle>次に学ぶ教材</CardTitle>
            </CardHeader>
            <CardContent>{/* 書籍・動画などカード表示 */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
