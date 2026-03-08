"use client";

import { useState } from "react";
import { Category } from "@/services/category.service";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-[39px] left-[20px] z-[60] p-2 bg-[#FAF1E3] border border-[#957139] rounded-md text-[#957139] shadow-sm hover:bg-black/5"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={cn(
          "fixed top-0 lg:top-[101px] left-0 lg:left-[23px] w-[256px] h-full lg:h-auto bg-[#FAF1E3] lg:bg-transparent z-[80] lg:z-10 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "p-6 lg:p-0 border-r border-[#957139]/20 lg:border-0"
        )}
      >
        <div className="flex items-center justify-between mb-8 lg:hidden">
           <h2 className="font-sans font-bold text-[16px] text-black">Categories</h2>
           <button onClick={() => setIsOpen(false)} className="text-[#957139]">
              <X className="w-6 h-6" />
           </button>
        </div>

        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => {
              onSelectCategory(null);
              setIsOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 px-4 py-1.5 transition-all text-[12px] font-bold font-sans leading-[100%] cursor-pointer text-left uppercase tracking-normal",
              selectedCategoryId === null ? "text-black" : "text-black/60 hover:text-black"
            )}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-1.5 transition-all text-[12px] font-normal font-sans leading-[100%] cursor-pointer text-left",
                selectedCategoryId === category.id ? "text-black" : "text-black/60 hover:text-black"
              )}
            >
              <div
                className="w-[11px] h-[11px] rounded-full shrink-0"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
