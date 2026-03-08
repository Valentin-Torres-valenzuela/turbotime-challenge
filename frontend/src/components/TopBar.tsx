"use client";

import { Plus, Search } from "lucide-react";
import Button from "./Button";

interface TopBarProps {
  onNewNote: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TopBar({
  onNewNote,
  searchQuery,
  onSearchChange,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between py-6 px-10">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#846E54]/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for notes..."
          className="w-full rounded-full border border-[#846E54]/10 bg-transparent px-12 py-3 text-sm focus:border-[#846E54]/30 outline-none"
        />
      </div>
      <Button onClick={onNewNote} variant="secondary" className="flex items-center gap-2">
        <Plus className="h-5 w-5" />
        New Note
      </Button>
    </div>
  );
}
