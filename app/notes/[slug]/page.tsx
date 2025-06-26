import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), "content/notes"));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}



export default async function NotePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content/notes", `${params.slug}.mdx`);
  try {
    const file = await fs.readFile(filePath, "utf8");
    const { content } = matter(file);

    const { MdxContent } = await import("@/components/mdx-content");

    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <MdxContent content={content} />
      </main>
    );
  } catch (e) {
    notFound();
  }
}
