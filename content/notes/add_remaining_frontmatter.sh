#!/bin/bash

# 残りのファイルにfrontmatterを追加

add_frontmatter() {
    local file="$1"
    local title="$2"
    local description="$3"
    local slug="$4"
    
    local temp_file=$(mktemp)
    
    cat > "$temp_file" << EOF
---
title: "$title"
description: "$description"
slug: "$slug"
date: "2025-06-26"
---

EOF
    
    cat "$file" >> "$temp_file"
    mv "$temp_file" "$file"
}

# ファイル名からタイトルとスラッグを生成する関数
generate_metadata() {
    local filename="$1"
    local basename="${filename%.mdx}"
    
    case "$basename" in
        "astro") echo "Astro フレームワーク:Astroフレームワークによる静的サイトジェネレータの使い方:astro" ;;
        "BestPractices") echo "開発ベストプラクティス:ソフトウェア開発のベストプラクティスとコーディング規約:best-practices" ;;
        "CSR") echo "CSR (Client-Side Rendering):クライアントサイドレンダリングの基本概念と実装方法:csr" ;;
        "CSRF_XSS") echo "CSRF・XSS セキュリティ対策:CSRF攻撃とXSS攻撃の対策方法とセキュリティ実装:csrf-xss" ;;
        "ClientSG") echo "クライアントサイドセキュリティグループ:クライアントサイドのセキュリティ設定と管理:client-sg" ;;
        "CustomSG") echo "カスタムセキュリティグループ:カスタムセキュリティグループの設定と管理:custom-sg" ;;
        "Debugging") echo "デバッグ技法:効率的なデバッグ手法とツールの使い方:debugging" ;;
        "DNS") echo "DNS (Domain Name System):DNSの仕組みと設定、トラブルシューティング:dns" ;;
        "ELK_Stack") echo "ELK Stack ログ管理:Elasticsearch、Logstash、Kibanaを使ったログ管理:elk-stack" ;;
        "eslint") echo "ESLint コード品質管理:ESLintを使ったJavaScriptコード品質の管理:eslint" ;;
        "Firewall") echo "ファイアウォール設定:ネットワークファイアウォールの設定と管理:firewall" ;;
        "format") echo "コードフォーマッティング:コードフォーマッターの設定と使用方法:format" ;;
        "GCP") echo "Google Cloud Platform:GCPの主要サービスとクラウド活用方法:gcp" ;;
        "GitHubActions") echo "GitHub Actions CI/CD:GitHub Actionsを使った継続的インテグレーション:github-actions" ;;
        "Grafana") echo "Grafana 監視ダッシュボード:Grafanaを使った監視とダッシュボード作成:grafana" ;;
        "GraphQL") echo "GraphQL API設計:GraphQLを使ったAPI設計と実装:graphql" ;;
        "HTTP") echo "HTTP プロトコル:HTTPプロトコルの基本と実践的な使い方:http" ;;
        "i18n") echo "国際化 (i18n):ウェブアプリケーションの国際化対応:i18n" ;;
        "IDS_IPS") echo "IDS/IPS 侵入検知・防止:侵入検知システムと侵入防止システム:ids-ips" ;;
        "Islands") echo "Islands アーキテクチャ:Islandsアーキテクチャの概念と実装:islands" ;;
        "Jenkins") echo "Jenkins CI/CD:Jenkinsを使った継続的インテグレーション:jenkins" ;;
        "jest") echo "Jest テスティング:Jestを使ったJavaScriptテスト:jest" ;;
        "Kubernetes") echo "Kubernetes コンテナオーケストレーション:Kubernetesによるコンテナ管理:kubernetes" ;;
        "library") echo "ライブラリ管理:プログラミングライブラリの選択と管理:library" ;;
        "lima") echo "Lima 仮想環境:Limaを使った軽量な仮想環境:lima" ;;
        "Loki") echo "Loki ログ集約:Grafana Lokiを使ったログ集約システム:loki" ;;
        "MPA") echo "MPA (Multi-Page Application):マルチページアプリケーションの設計と開発:mpa" ;;
        "NestJS") echo "NestJS フレームワーク:NestJSを使ったNode.jsアプリケーション開発:nestjs" ;;
        "NoSQL") echo "NoSQL データベース:NoSQLデータベースの種類と活用方法:nosql" ;;
        "npm") echo "npm パッケージ管理:npmを使ったNode.jsパッケージ管理:npm" ;;
        "OWASP_Top10") echo "OWASP Top 10:OWASP Top 10セキュリティリスクと対策:owasp-top10" ;;
        "Prometheus") echo "Prometheus 監視システム:Prometheusを使ったシステム監視:prometheus" ;;
        "README") echo "README ドキュメント:効果的なREADMEの書き方:readme" ;;
        "REST") echo "REST API設計:RESTfulなAPI設計の原則と実装:rest" ;;
        "SecureHeaders") echo "セキュリティヘッダー:HTTPセキュリティヘッダーの設定と活用:secure-headers" ;;
        "SPA") echo "SPA (Single-Page Application):シングルページアプリケーションの設計と開発:spa" ;;
        "SQL") echo "SQL データベース操作:SQLの基本構文とデータベース操作:sql" ;;
        "SSG") echo "SSG (Static Site Generation):静的サイトジェネレーションの概念と実装:ssg" ;;
        "SSR") echo "SSR (Server-Side Rendering):サーバーサイドレンダリングの実装方法:ssr" ;;
        "TCP_IP") echo "TCP/IP ネットワーク:TCP/IPプロトコルスタックの基礎:tcp-ip" ;;
        "TerminalCommands") echo "ターミナルコマンド集:よく使うターミナルコマンドとシェル操作:terminal-commands" ;;
        "Terraform") echo "Terraform インフラ管理:Terraformを使ったInfrastructure as Code:terraform" ;;
        "VPN") echo "VPN 仮想プライベートネットワーク:VPNの設定と活用方法:vpn" ;;
        "WebComponents") echo "Web Components:Web Componentsの作成と活用:web-components" ;;
        "WebSocket") echo "WebSocket リアルタイム通信:WebSocketを使ったリアルタイム通信:websocket" ;;
        "WindowsServer") echo "Windows Server 管理:Windows Serverの設定と管理:windows-server" ;;
        "ZeroTrust") echo "ゼロトラストセキュリティ:ゼロトラストアーキテクチャの概念と実装:zero-trust" ;;
        "グラフ理論") echo "グラフ理論:グラフ理論の基本概念とアルゴリズム:graph-theory" ;;
        "クリーンアーキテクチャ") echo "クリーンアーキテクチャ:クリーンアーキテクチャの設計原則:clean-architecture" ;;
        "ソート") echo "ソートアルゴリズム:各種ソートアルゴリズムの実装と比較:sort" ;;
        "デザインパターン") echo "デザインパターン:ソフトウェア設計パターンの実装と活用:design-patterns" ;;
        "ドメイン駆動設計") echo "ドメイン駆動設計 (DDD):ドメイン駆動設計の概念と実践:domain-driven-design" ;;
        "リバースプロキシ") echo "リバースプロキシ:リバースプロキシの設定と活用:reverse-proxy" ;;
        "ロードバランサ") echo "ロードバランサ:ロードバランシングの概念と実装:load-balancer" ;;
        "暗号化") echo "暗号化技術:暗号化アルゴリズムとセキュリティ実装:encryption" ;;
        "基本アルゴリズム") echo "基本アルゴリズム:プログラミングの基本アルゴリズム:basic-algorithms" ;;
        "脆弱性診断") echo "脆弱性診断:セキュリティ脆弱性の診断と対策:vulnerability-assessment" ;;
        "認証_認可") echo "認証・認可システム:認証と認可の仕組みと実装:auth-authorization" ;;
        "_network") echo "ネットワーク基礎:ネットワークの基本概念とプロトコル:network" ;;
        *) echo "$basename:$basename について:$basename" ;;
    esac
}

# frontmatterがないファイルを処理
for file in *.mdx; do
    if [ -f "$file" ] && ! grep -q "^---" "$file"; then
        metadata=$(generate_metadata "$file")
        IFS=':' read -r title description slug <<< "$metadata"
        echo "Adding frontmatter to $file"
        add_frontmatter "$file" "$title" "$description" "$slug"
    fi
done

echo "All frontmatter additions completed!"
