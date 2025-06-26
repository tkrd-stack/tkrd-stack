// app/contact/page.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">お問い合わせ</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">お名前</label>
          <Input name="name" type="text" placeholder="お名前を入力" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <Input name="email" type="email" placeholder="example@example.com" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">お問い合わせ内容</label>
          <Textarea name="message" placeholder="ご質問やご相談内容をご記入ください" rows={6} required />
        </div>
        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "送信中..." : "送信する"}
        </Button>
        {status === "success" && <p className="text-green-600 text-sm">送信されました。ありがとうございました！</p>}
        {status === "error" && <p className="text-red-600 text-sm">送信に失敗しました。時間をおいてお試しください。</p>}
      </form>
    </main>
  );
}
