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
import NoteModal from "@/components/NoteModal";

export default function Dashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let cats = await categoryService.getCategories();
      
      // Seed default categories if none exist
      if (cats.length === 0) {
        const defaults = Object.values(CategoryType);
        for (const name of defaults) {
          await categoryService.createCategory({
            name,
            color: CATEGORY_COLORS[name] || "#CBD6B3",
          });
        }
        cats = await categoryService.getCategories();
      }
      
      setCategories(cats);
      const fetchedNotes = await noteService.getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (data: Partial<Note>) => {
    try {
      if (editingNote) {
        await noteService.updateNote(editingNote.id, data);
      } else {
        await noteService.createNote(data);
      }
      const fetchedNotes = await noteService.getNotes();
      setNotes(fetchedNotes);
      setEditingNote(null);
    } catch (err) {
      console.error("Failed to save note", err);
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
    const matchesCategory =
      selectedCategoryId === null || note.category === selectedCategoryId;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDF7F0]">
        <p className="text-[#846E54] font-semibold animate-pulse">Loading your charm...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#FDF7F0] overflow-hidden">
      <Sidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar
          onNewNote={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          {filteredNotes.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-6">
              <div className="h-48 w-48 bg-[#EFE7DB]/30 rounded-full flex items-center justify-center text-5xl">
                🧋
              </div>
              <p className="text-[#846E54] text-xl font-medium max-w-xs">
                I'm just here waiting for your charming notes...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNotes.map((note) => (
                <div key={note.id} onClick={() => {
                  setEditingNote(note);
                  setIsModalOpen(true);
                }}>
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

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        categories={categories}
        initialData={editingNote}
      />
    </div>
  );
}
