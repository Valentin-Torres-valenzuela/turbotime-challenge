"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "auth" | "action";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-[#846E54] text-white hover:bg-[#6D5A45]",
      secondary: "bg-[#EFE7DB] text-[#846E54] border border-[#846E54] hover:bg-[#E5DBC7]",
      outline: "bg-transparent border border-[#846E54] text-[#846E54] hover:bg-[#FDF7F0]",
      ghost: "bg-transparent text-[#846E54] hover:bg-[#EFE7DB]",
      auth: "h-[43px] w-[384px] rounded-[46px] border border-[#957139] bg-transparent text-[#957139] font-bold text-[16px] hover:bg-[#957139]/5",
      action: "rounded-[46px] border border-[#957139] bg-transparent text-[#957139] font-bold text-[16px] hover:bg-[#957139]/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base font-medium",
      lg: "px-8 py-3 text-lg font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "auth" || variant === "action" ? "" : "rounded-full",
          variants[variant],
          variant === "auth" || variant === "action" ? "px-[16px] py-[12px]" : sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
