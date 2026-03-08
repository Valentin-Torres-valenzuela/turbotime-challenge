"use client";

import { Category } from "@/services/category.service";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function Sidebar({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: SidebarProps) {
  return (
    <div className="w-64 flex flex-col h-full bg-[#FDF7F0] p-8 border-r border-[#846E54]/10">
      <h2 className="text-sm font-bold text-[#2D2D2D]/60 uppercase tracking-widest mb-6">
        All Categories
      </h2>
      <nav className="space-y-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2 rounded-full transition-all text-sm font-semibold",
            selectedCategoryId === null
              ? "bg-[#EFE7DB] text-[#2D2D2D]"
              : "text-[#2D2D2D]/60 hover:bg-[#EFE7DB]/50"
          )}
        >
          <div className="w-3 h-3 rounded-full bg-[#2D2D2D]/20" />
          All Notes
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 rounded-full transition-all text-sm font-semibold",
              selectedCategoryId === category.id
                ? "bg-[#EFE7DB] text-[#2D2D2D]"
                : "text-[#2D2D2D]/60 hover:bg-[#EFE7DB]/50"
            )}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
