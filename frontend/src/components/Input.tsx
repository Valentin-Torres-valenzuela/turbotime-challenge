"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "dashboard" | "auth";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, variant = "dashboard", ...props }, ref) => {
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
            "w-full transition-all outline-none",
            variant === "dashboard" && "rounded-full border border-[#846E54]/30 bg-[#EFE7DB]/20 px-6 py-3 text-[#2D2D2D] focus:border-[#846E54] focus:bg-white placeholder:text-gray-400",
            variant === "auth" && "h-[39px] w-[384px] rounded-[6px] border border-[#957139] bg-transparent px-[15px] py-[7px] text-sm text-black placeholder:text-[#000000] placeholder:text-[12px] placeholder:font-normal",
            className
          )}
          {...props}
        />
        {error && <p className="text-[11px] text-[#d61717] mt-1.5 ml-1 font-medium font-sans italic text-left w-full">*{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
