import UnityGame from "@/app/_components/unity-game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unity Game - tkrd-stack",
  description: "Unity WebGLゲームの表示",
};

export default function UnityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Unity WebGL Game
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <UnityGame className="w-full" width="100%" height="600px" />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Unity WebGLゲームの表示デモです。
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                セットアップが必要:
              </h3>
              <ol className="text-sm text-yellow-700 text-left list-decimal list-inside space-y-1">
                <li>UnityプロジェクトをWebGL形式でビルド</li>
                <li>
                  ビルドファイルを{" "}
                  <code className="bg-yellow-100 px-1 rounded">
                    public/unity/
                  </code>{" "}
                  フォルダに配置
                </li>
                <li>
                  ファイルパスを{" "}
                  <code className="bg-yellow-100 px-1 rounded">
                    unity-game.tsx
                  </code>{" "}
                  で調整
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
