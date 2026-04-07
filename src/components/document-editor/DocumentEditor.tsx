"use client";

import { cn } from "@/lib/utils";

interface DocumentEditorProps {
  children: React.ReactNode;
  className?: string;
}

export default function DocumentEditor({ children, className }: DocumentEditorProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div
        className={cn(
          "mx-auto max-w-[816px] bg-white shadow-lg",
          "border border-slate-200 rounded-sm",
          "px-16 py-12",
          "font-serif text-[13px] leading-relaxed text-gray-900",
          className
        )}
        style={{ minHeight: "1056px" }}
      >
        {children}
      </div>
    </div>
  );
}
