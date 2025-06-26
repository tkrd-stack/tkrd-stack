# Unity WebGL 統合手順

## 1. Unityプロジェクトの準備

### Unity Editor での設定

1. **File** → **Build Settings** を開く
2. **Platform** を **WebGL** に変更
3. **Player Settings** で以下を設定：
   - **Publishing Settings** → **Compression Format** を **Gzip** に設定
   - **WebGL Template** を **Default** または **Minimal** に設定

### ビルド実行

1. **Build Settings** で **Build** をクリック
2. 出力フォルダを選択（例：`unity-build`）
3. ビルド完了を待つ

## 2. ファイルの配置

ビルド完了後、以下のファイルを `public/unity/Build/` フォルダにコピー：

```
public/unity/Build/
├── unity-build.data
├── unity-build.framework.js
├── unity-build.loader.js
└── unity-build.wasm
```

## 3. ファイル名の調整

`app/_components/unity-game.tsx` の以下の部分を実際のファイル名に合わせて変更：

```typescript
const {
  unityProvider,
  // ...
} = useUnityContext({
  loaderUrl: "/unity/Build/your-actual-filename.loader.js",
  dataUrl: "/unity/Build/your-actual-filename.data",
  frameworkUrl: "/unity/Build/your-actual-filename.framework.js",
  codeUrl: "/unity/Build/your-actual-filename.wasm",
});
```

## 4. Unity C# スクリプトとの通信

### Unity から React にメッセージ送信

```csharp
// Unity C# スクリプト
Application.ExternalCall("ReactFunction", "messageData");
```

### React から Unity にメッセージ送信

```typescript
// React コンポーネント
import { Unity, useUnityContext } from "react-unity-webgl";

const { sendMessage } = useUnityContext({
  // ... config
});

// Unity の GameObject の Method を呼び出し
sendMessage("GameObjectName", "MethodName", "parameter");
```

## 5. 使用方法

1. `/unity` ページにアクセス
2. ゲームの読み込み完了を待つ
3. フルスクリーンボタンでフルスクリーン表示可能

## トラブルシューティング

### よくある問題

1. **ファイルが見つからない**: ファイルパスとファイル名を確認
2. **CORS エラー**: 開発サーバーで正常に動作するはず
3. **読み込みが遅い**: ファイルサイズを確認、圧縮設定を見直し

### パフォーマンス最適化

1. Unity の **Player Settings** で **Code Optimization** を **Master** に設定
2. **Texture Compression** を有効化
3. 不要なアセットを削除
