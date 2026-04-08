"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import type { SharedFieldKey } from "@/types/nota-dinas";
import { SHARED_FIELD_COLORS, SHARED_FIELD_LABELS } from "@/types/nota-dinas";
import { cn } from "@/lib/utils";

const COLOR_CLASSES: Record<string, { bg: string; border: string; ring: string }> = {
  yellow: { bg: "bg-yellow-100", border: "border-yellow-400", ring: "ring-yellow-300" },
  cyan: { bg: "bg-cyan-100", border: "border-cyan-400", ring: "ring-cyan-300" },
  green: { bg: "bg-green-100", border: "border-green-400", ring: "ring-green-300" },
  magenta: { bg: "bg-pink-100", border: "border-pink-400", ring: "ring-pink-300" },
  blue: { bg: "bg-blue-100", border: "border-blue-400", ring: "ring-blue-300" },
  red: { bg: "bg-red-100", border: "border-red-400", ring: "ring-red-300" },
};

interface SharedFieldProps {
  fieldKey: SharedFieldKey;
  className?: string;
}

export default function SharedField({ fieldKey, className }: SharedFieldProps) {
  const value = useNotaDinasStore((s) => s.sharedFields[fieldKey]);
  const setSharedField = useNotaDinasStore((s) => s.setSharedField);

  const color = SHARED_FIELD_COLORS[fieldKey];
  const label = SHARED_FIELD_LABELS[fieldKey];
  const colors = COLOR_CLASSES[color];

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setSharedField(fieldKey, e.target.value)}
      placeholder={label}
      title={label}
      className={cn(
        "inline min-w-[80px] px-1.5 py-0.5 text-sm",
        "border-b-2 rounded-sm outline-none transition-all",
        "focus:ring-2 focus:ring-offset-1",
        "max-w-full",
        colors.bg,
        colors.border,
        colors.ring,
        className
      )}
      style={{ width: `${Math.max(80, Math.min((value.length + 1) * 8, 500))}px` }}
    />
  );
}
