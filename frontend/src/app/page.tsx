"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { noteService, Note } from "@/services/note.service";
import { categoryService, Category } from "@/services/category.service";
import { CategoryType, CATEGORY_COLORS } from "@/lib/constants";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import NoteCard from "@/components/NoteCard";
import ErrorMessage from "@/components/ErrorMessage";

export default function Dashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cats = await categoryService.getCategories();
      
      const validCategoryNames = Object.values(CategoryType) as string[];
      const filteredCats = cats.filter(c => validCategoryNames.includes(c.name));
      setCategories(filteredCats);
      
      const fetchedNotes = await noteService.getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      setError("Failed to load your notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const filteredNotes = notes.filter((note) => {
    return selectedCategoryId === null || note.category === selectedCategoryId;
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF1E3]">
        <p className="text-[#846E54] font-semibold animate-pulse">Loading your charm...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#FAF1E3] overflow-hidden">
      <Sidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden lg:ml-[256px]">
        <TopBar
          onNewNote={() => router.push("/note-page")}
        />

        <div className="px-4 md:px-10 pb-4 text-black">
          <ErrorMessage message={error} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 scrollbar-hide">
          {filteredNotes.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-8">
              <img
                src="/assets/coffee.png"
                alt="Coffee"
                className="h-[150px] md:h-[200px] w-auto object-contain"
              />
              <p className="text-[#88642A] text-[20px] md:text-[24px] font-normal font-sans leading-[100%] max-w-sm">
                I'm just here waiting for your charming notes...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[1650px]:grid-cols-4 gap-[10px]">
              {filteredNotes.map((note) => (
                <div key={note.id} onClick={() => router.push(`/note-page?id=${note.id}`)} className="cursor-pointer w-full">
                  <NoteCard
                    title={note.title}
                    content={note.content}
                    categoryName={note.category_name || "Uncategorized"}
                    color={note.category_color || "#EFE7DB"}
                    updatedAt={note.updated_at}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
