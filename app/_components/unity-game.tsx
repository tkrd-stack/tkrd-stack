"use client";
import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

interface UnityGameProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function UnityGame({
  className = "",
  width = "100%",
  height = "600px",
}: UnityGameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Unity WebGLビルドファイルのパス
  // 実際のUnityビルドファイルに合わせて調整してください
  const {
    unityProvider,
    isLoaded: unityIsLoaded,
    loadingProgression,
    requestFullscreen,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "/unity/Build/RefeelEmotionSphere.loader.js",
    dataUrl: "/unity/Build/RefeelEmotionSphere.data",
    frameworkUrl: "/unity/Build/RefeelEmotionSphere.framework.js",
    codeUrl: "/unity/Build/RefeelEmotionSphere.wasm",
  });

  // クライアントサイドでのみマウント
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsLoaded(unityIsLoaded);
    }
  }, [unityIsLoaded, isMounted]);

  useEffect(() => {
    if (isMounted) {
      setLoadingProgress(loadingProgression);
    }
  }, [loadingProgression, isMounted]);

  // Unityからのメッセージを受信する例
  useEffect(() => {
    if (!isMounted) return;

    const handleGameReady = () => {
      console.log("Unity game is ready!");
    };

    addEventListener("GameReady", handleGameReady);

    return () => {
      removeEventListener("GameReady", handleGameReady);
    };
  }, [addEventListener, removeEventListener, isMounted]);

  const handleFullscreen = () => {
    if (isMounted) {
      requestFullscreen(true);
    }
  };

  // サーバーサイドでは何も表示しない
  if (!isMounted) {
    return (
      <div className={`unity-container ${className}`}>
        <div className="unity-loading flex flex-col items-center justify-center space-y-4 p-8 h-96">
          <div className="loading-bar w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="loading-progress h-full bg-blue-500"
              style={{ width: "0%" }}
            />
          </div>
          <p className="text-sm text-gray-600">Initializing Unity Game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`unity-container ${className}`}>
      {!isLoaded && (
        <div className="unity-loading flex flex-col items-center justify-center space-y-4 p-8">
          <div className="loading-bar w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="loading-progress h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${loadingProgress * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Loading Unity Game... {Math.round(loadingProgress * 100)}%
          </p>
        </div>
      )}

      <div className={`unity-canvas ${!isLoaded ? "hidden" : ""}`}>
        <Unity
          unityProvider={unityProvider}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        {isLoaded && (
          <div className="unity-controls mt-4 flex justify-center space-x-4">
            <button
              onClick={handleFullscreen}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              フルスクリーン
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
