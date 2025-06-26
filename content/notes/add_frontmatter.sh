#!/bin/bash

# frontmatterを追加するスクリプト

add_frontmatter() {
    local file="$1"
    local title="$2"
    local description="$3"
    local slug="$4"
    
    # 一時ファイルを作成
    local temp_file=$(mktemp)
    
    # frontmatterを追加
    cat > "$temp_file" << EOF
---
title: "$title"
description: "$description"
slug: "$slug"
date: "2025-06-26"
---

EOF
    
    # 元のファイル内容を追加
    cat "$file" >> "$temp_file"
    
    # 元のファイルを置き換え
    mv "$temp_file" "$file"
}

# frontmatterがないファイルに追加
files_to_process=(
    "Azure.mdx:Microsoft Azure:Microsoft Azureクラウドサービスの基本概念と主要サービス:azure"
    "Docker.mdx:Docker コンテナ技術:Dockerの基本概念、コンテナ操作、Dockerfileの作成方法:docker"
    "Git.mdx:Git バージョン管理:Gitの基本操作、ブランチ管理、協業のベストプラクティス:git"
    "NodeJs.mdx:Node.js サーバーサイド開発:Node.jsを使ったサーバーサイド開発の基礎から応用まで:nodejs"
    "CSS.mdx:CSS スタイリング完全ガイド:CSSの基本からFlexbox、Grid、アニメーションまで:css"
    "Python.mdx:Python プログラミング:Pythonの基本構文からライブラリ活用まで:python"
    "MongoDB.mdx:MongoDB NoSQLデータベース:MongoDBの基本操作、スキーマ設計、パフォーマンス最適化:mongodb"
    "PostgreSQL.mdx:PostgreSQL リレーショナルデータベース:PostgreSQLの基本操作、SQL、データベース設計:postgresql"
    "Linux.mdx:Linux システム管理:Linuxの基本コマンド、システム管理、シェルスクリプト:linux"
)

for item in "${files_to_process[@]}"; do
    IFS=':' read -r file title description slug <<< "$item"
    if [ -f "$file" ]; then
        # frontmatterがあるかチェック
        if ! grep -q "^---" "$file"; then
            echo "Adding frontmatter to $file"
            add_frontmatter "$file" "$title" "$description" "$slug"
        else
            echo "Frontmatter already exists in $file"
        fi
    fi
done

echo "Frontmatter addition completed!"
