"use client";

import { Plus } from "lucide-react";
import Button from "./Button";

interface TopBarProps {
  onNewNote: () => void;
}

export default function TopBar({
  onNewNote,
}: TopBarProps) {
  return (
    <div className="relative h-[100px] w-full flex items-center justify-end px-4 md:px-10">
      <Button 
        onClick={onNewNote} 
        variant="action" 
        className="w-[133px] h-[43px] flex items-center gap-[6px] !px-4 !py-3 whitespace-nowrap"
      >
        <Plus className="h-5 w-5" />
        New Note
      </Button>
    </div>
  );
}
