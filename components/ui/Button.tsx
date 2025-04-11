"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

export default function Button({
  className,
  variant = "primary",
  backgroundColor,
  textColor,
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-80";

  const variants = {
    primary:
      "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/80",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    outline: "border border-white text-white hover:bg-white hover:text-black",
    ghost: "text-white hover:bg-gray-800",
  };

  return (
    <button
      type='button'
      className={cn(
        baseStyles,
        backgroundColor ? `bg-[${backgroundColor}]` : variants[variant],
        textColor ? `text-[${textColor}]` : "",
        className
      )}
      style={{ backgroundColor, color: textColor, cursor: "pointer" }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
