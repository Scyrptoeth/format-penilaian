"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import type { UniqueFieldKey } from "@/types/nota-dinas";
import { UNIQUE_FIELD_LABELS } from "@/types/nota-dinas";
import { cn } from "@/lib/utils";

interface UniqueFieldProps {
  fieldKey: UniqueFieldKey;
  multiline?: boolean;
  className?: string;
}

export default function UniqueField({ fieldKey, multiline, className }: UniqueFieldProps) {
  const value = useNotaDinasStore((s) => s.uniqueFields[fieldKey]);
  const setUniqueField = useNotaDinasStore((s) => s.setUniqueField);

  const label = UNIQUE_FIELD_LABELS[fieldKey];

  const baseClasses = cn(
    "inline min-w-[80px] px-1.5 py-0.5 text-sm",
    "border-b-2 border-gray-400 rounded-sm outline-none transition-all",
    "hover:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1",
    "bg-transparent max-w-full",
    className
  );

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => setUniqueField(fieldKey, e.target.value)}
        placeholder={label}
        title={label}
        rows={3}
        className={cn(baseClasses, "block w-full resize-y")}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setUniqueField(fieldKey, e.target.value)}
      placeholder={label}
      title={label}
      className={baseClasses}
      style={{ width: `${Math.max(80, Math.min((value.length + 1) * 8, 500))}px` }}
    />
  );
}
