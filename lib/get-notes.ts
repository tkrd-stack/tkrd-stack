import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NoteMeta } from "./types";

  /**
   * Gets all notes from the content/notes directory.
   *
   * @returns A sorted array of note metadata.
   */
export async function getAllNotes(): Promise<NoteMeta[]> {
  const notesDir = path.join(process.cwd(), "content/notes");
  const files = await fs.readdir(notesDir);

  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(notesDir, file);
        const content = await fs.readFile(filePath, "utf8");
        const { data } = matter(content);

        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || null,
          tags: data.tags || [],
        };
      })
  );

  return notes.sort((a, b) =>
    a.date && b.date ? b.date.localeCompare(a.date) : 0
  );
}
