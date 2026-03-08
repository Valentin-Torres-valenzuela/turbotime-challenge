"use client";

import { isToday, isYesterday, format } from "date-fns";
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
  
  let formattedDate = "";
  if (isToday(date)) {
    formattedDate = "today";
  } else if (isYesterday(date)) {
    formattedDate = "yesterday";
  } else {
    formattedDate = format(date, "MMMM d");
  }

  const isDraft = !title.trim() && !content.trim();
  
  const displayTitle = isDraft ? "Draft" : title;
  const displayContent = isDraft 
    ? "This draft will be deleted in 7 days." 
    : content.length > 350 
      ? content.substring(0, 350) + "..." 
      : content;

  return (
    <div
      style={{ 
        backgroundColor: color,
        borderColor: color
      }}
      className={cn(
        "group relative flex flex-col w-full h-[246px] rounded-[11px] p-[16px] gap-[12px] border-[3px] shadow-[1px_1px_2px_0px_#00000040] transition-transform hover:-translate-y-1 cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Header: Date and Category */}
      <div className="flex items-center gap-2 leading-[100%] h-[12px]">
        <span className="text-[12px] font-bold font-sans text-black">
          {formattedDate}
        </span>
        <span className="text-[12px] font-normal font-sans text-black">
          {categoryName}
        </span>
      </div>

      {/* Title */}
      <h3 className={cn(
        "text-[24px] font-bold font-serif text-black leading-[100%] line-clamp-2",
        isDraft && "italic opacity-60"
      )}>
        {displayTitle}
      </h3>

      {/* Description */}
      <p className={cn(
        "text-[12px] font-normal font-sans text-black leading-[100%] line-clamp-[10]",
        isDraft && "italic opacity-50"
      )}>
        {displayContent}
      </p>
    </div>
  );
}
