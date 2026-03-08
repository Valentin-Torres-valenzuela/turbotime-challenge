"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  title: string;
  content: string;
  categoryName: string;
  color: string;
  updatedAt: string;
  className?: string;
}

export default function NoteCard({
  title,
  content,
  categoryName,
  color,
  updatedAt,
  className,
}: NoteCardProps) {
  const date = new Date(updatedAt);
  const formattedDate = format(date, "MMMM d");

  return (
    <div
      style={{ backgroundColor: color }}
      className={cn(
        "group relative flex flex-col h-fit min-h-[220px] rounded-3xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between text-xs font-semibold opacity-70 uppercase tracking-wider">
        <span>{formattedDate} {categoryName}</span>
      </div>
      <h3 className="mb-2 text-2xl font-bold leading-tight text-[#2D2D2D] font-serif">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#2D2D2D]/80 line-clamp-6">
        {content}
      </p>
    </div>
  );
}
