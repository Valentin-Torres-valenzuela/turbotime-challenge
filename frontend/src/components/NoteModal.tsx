"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Input from "./Input";
import { Category } from "@/services/category.service";
import { Note } from "@/services/note.service";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Note>) => void;
  categories: Category[];
  initialData?: Note | null;
}

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  categories,
  initialData,
}: NoteModalProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState<number | null>(
    initialData?.category || (categories[0]?.id ?? null)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, category: categoryId });
    onClose();
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl overflow-hidden rounded-[32px] bg-[#FDF7F0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: selectedCategory?.color || "#FDF7F0" }}
          >
            <div className="flex items-center justify-between p-8">
              <div className="flex items-center gap-4">
                <select
                  value={categoryId || ""}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="rounded-full bg-white/50 px-4 py-2 text-sm font-semibold outline-none border border-black/5"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/50 p-2 hover:bg-white/80 transition-colors"
              >
                <X className="h-6 w-6 text-[#2D2D2D]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-12 pb-12 pt-4 space-y-6">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full bg-transparent text-5xl font-bold font-serif text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/20"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Pour your heart out..."
                className="h-64 w-full resize-none bg-transparent text-lg text-[#2D2D2D]/80 outline-none placeholder:text-[#2D2D2D]/20"
              />
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-[#2D2D2D] text-white hover:bg-black">
                  Save Note
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
