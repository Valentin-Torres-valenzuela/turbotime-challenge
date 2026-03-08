"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-[#2D2D2D] ml-4">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-full border border-[#846E54]/30 bg-[#EFE7DB]/20 px-6 py-3 text-[#2D2D2D] outline-none transition-all focus:border-[#846E54] focus:bg-white placeholder:text-gray-400",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1 ml-4">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
