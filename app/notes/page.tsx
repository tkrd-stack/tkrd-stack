import { getAllNotes } from "@/lib/get-notes";
import {NotesList} from "@/app/_components/notes-list";

export default async function NotesIndexPage() {
  const notes = await getAllNotes();

  return (
    <main className="w-full px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">技術ノート一覧</h1>
      <NotesList notes={notes} />
    </main>
  );
}
