"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryService, Category } from "@/services/category.service";
import { noteService, Note } from "@/services/note.service";
import { format } from "date-fns";
import VoiceControl from "@/components/MusicPlayer";
import { authService } from "@/services/auth.service";
import { cn } from "@/lib/utils";

function NotePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlNoteId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialData, setInitialData] = useState<Note | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(urlNoteId ? Number(urlNoteId) : null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastFocusedField, setLastFocusedField] = useState<"title" | "content" | null>(null);

  const lastSavedRef = useRef({ title: "", content: "", categoryId: -1 });

  useEffect(() => {
    setMounted(true);
    if (!authService.isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    fetchInitialData();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchInitialData = async () => {
    try {
      const cats = await categoryService.getCategories();
      setCategories(cats);

      if (currentNoteId) {
        const note = await noteService.getNoteById(currentNoteId);
        setInitialData(note);
        setTitle(note.title);
        setContent(note.content);
        setCategoryId(note.category);
        lastSavedRef.current = { title: note.title, content: note.content, categoryId: note.category || -1 };
      } else if (cats.length > 0) {
        setCategoryId(cats[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch note data", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-save logic
  useEffect(() => {
    const isDifferent = title !== lastSavedRef.current.title ||
      content !== lastSavedRef.current.content ||
      categoryId !== lastSavedRef.current.categoryId;

    if (!loading && mounted && isDifferent) {
      const timer = setTimeout(() => {
        autoSave();
      }, 1000); // 1 second debounce
      return () => clearTimeout(timer);
    }
  }, [title, content, categoryId, loading, mounted]);

  const autoSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const data = { title, content, category: categoryId! };
      if (currentNoteId) {
        const updated = await noteService.updateNote(currentNoteId, data);
        setInitialData(updated);
      } else {
        const newNote = await noteService.createNote(data);
        setCurrentNoteId(newNote.id);
        setInitialData(newNote);
        // Update URL without refreshing
        window.history.replaceState(null, "", `/note-page?id=${newNote.id}`);
      }
      lastSavedRef.current = { title, content, categoryId: categoryId || -1 };
    } catch (err) {
      console.error("Auto-save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = async () => {
    router.push("/");
  };

  const handleManualSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await autoSave();
    router.push("/");
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const bgColor = selectedCategory?.color || "#EF9C66";

  const formattedDate = !mounted ? "" : (initialData
    ? format(new Date(initialData.updated_at), "MMMM d, yyyy 'at' h:mm bb")
    : format(new Date(), "MMMM d, yyyy 'at' h:mm bb"));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF1E3]">
        <p className="text-[#846E54] font-semibold animate-pulse">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF1E3] flex items-start justify-center overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full min-h-screen py-[100px] lg:py-[84px] p-[20px]"
      >
        {/* Header Area */}
        <div className="absolute top-[33px] left-[20px] md:left-[40px] lg:left-[20px] z-50" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative w-[180px] md:w-[225px] h-[39px] flex items-center bg-[#FAF1E3] rounded-[6px] border border-[#957139] px-[10px] md:px-[15px] py-[7px] gap-[8px] cursor-pointer pointer-events-auto shadow-sm"
          >
            <div
              className="w-[11px] h-[11px] rounded-full shrink-0"
              style={{ backgroundColor: bgColor }}
            />
            <span className="flex-1 text-[11px] md:text-[12px] font-sans font-normal text-black truncate">
              {selectedCategory?.name || "Select Category"}
            </span>
            <ChevronDown className={cn(
              "w-5 h-5 md:w-6 md:h-6 text-[#957139] transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )} />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-[44px] left-0 w-[180px] md:w-[225px] bg-[#FAF1E3] rounded-[11px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] border border-[#957139]/20 overflow-hidden pointer-events-auto z-50 text-black"
              >
                {categories.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCategoryId(c.id);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-[8px] px-[15px] py-[10px] hover:bg-black/5 cursor-pointer transition-colors"
                  >
                    <div
                      className="w-[11px] h-[11px] rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-[12px] font-sans font-normal">
                      {c.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-[33px] right-[20px] md:right-[40px] lg:right-[20px] w-8 h-8 flex items-center justify-center cursor-pointer bg-[#FAF1E3] rounded-full lg:bg-transparent shadow-sm lg:shadow-none z-50"
        >
          <X className="w-6 h-6 text-[#957139]" />
        </button>

        {/* Note Area */}
        <div
          className="mx-auto w-full h-[calc(100vh-180px)] md:h-[calc(100vh-140px)] rounded-[11px] border-[3px] shadow-[1px_1px_2px_0px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-colors relative"
          style={{
            backgroundColor: bgColor,
            borderColor: bgColor
          }}
        >
          <div className="flex-1 flex flex-col pt-[39px] px-[24px] md:px-[64px] pb-[64px] relative scrollbar-hide overflow-y-auto text-black">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-8">
              <div className="flex items-center gap-2">
                {isSaving && <span className="text-[10px] text-black/40 italic">Saving...</span>}
              </div>
              <span className="text-[11px] md:text-[12px] font-sans font-normal opacity-100 text-black">
                Last Edited: {formattedDate}
              </span>
            </div>

            <form onSubmit={handleManualSave} className="flex flex-col h-full space-y-[24px]">
              <input
                autoFocus
                value={title}
                onFocus={() => setLastFocusedField("title")}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full bg-transparent text-[20px] md:text-[24px] font-bold font-serif outline-none placeholder:text-black leading-[120%] md:leading-[100%] text-black placeholder:opacity-100 transition-all duration-300"
              />
              <textarea
                value={content}
                onFocus={() => setLastFocusedField("content")}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Pour your heart out..."
                className="flex-1 w-full resize-none bg-transparent text-[14px] md:text-[16px] leading-[27px] font-sans font-normal outline-none placeholder:text-black text-black placeholder:opacity-100 transition-all duration-300"
              />

              <button type="submit" className="hidden" />
            </form>
          </div>

          {/* Voice Control positioned INSIDE the note bottom-right corner */}
          <div className="absolute bottom-6 right-6 z-[100]">
            <VoiceControl 
              onTranscript={(text) => {
                if (lastFocusedField === "title") {
                  setTitle(prev => prev + (prev ? " " : "") + text);
                } else if (lastFocusedField === "content") {
                  setContent(prev => prev + (prev ? " " : "") + text);
                }
              }}
              isDisabled={!lastFocusedField}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function NotePage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#FAF1E3]" />}>
      <NotePageContent />
    </Suspense>
  );
}
