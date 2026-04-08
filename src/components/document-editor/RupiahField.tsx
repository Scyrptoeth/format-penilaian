"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import type { UniqueFieldKey } from "@/types/nota-dinas";
import { UNIQUE_FIELD_LABELS } from "@/types/nota-dinas";
import { formatRupiah, parseRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RupiahFieldProps {
  fieldKey: UniqueFieldKey;
  className?: string;
}

export default function RupiahField({ fieldKey, className }: RupiahFieldProps) {
  const value = useNotaDinasStore((s) => s.uniqueFields[fieldKey]);
  const setUniqueField = useNotaDinasStore((s) => s.setUniqueField);
  const isBouncing = useNotaDinasStore((s) => s.bouncingFields.includes(fieldKey));
  const stopBounce = useNotaDinasStore((s) => s.stopBounce);
  const label = UNIQUE_FIELD_LABELS[fieldKey];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRupiah(e.target.value);
    setUniqueField(fieldKey, raw);
  };

  const handleFocus = () => {
    if (isBouncing) stopBounce(fieldKey);
  };

  const displayValue = value ? formatRupiah(value) : "";
  const placeholderW = label.length * 7.5 + 28;
  const contentW = (displayValue.length + 1) * 8;
  const fieldWidth = Math.min(Math.max(placeholderW, contentW, 140), 500);

  return (
    <span className={cn("inline-flex items-baseline", isBouncing && "animate-bounce-field")}>
      <span className="mr-0.5">Rp</span>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={label}
        title={label}
        className={cn(
          "inline px-1.5 py-0.5 text-sm",
          "border-b-2 border-foreground/40 rounded-sm outline-none transition-all",
          "hover:border-foreground/60 focus:border-foreground focus:ring-2 focus:ring-ring focus:ring-offset-1",
          "bg-transparent text-right max-w-full",
          className
        )}
        style={{ width: `${fieldWidth}px` }}
      />
    </span>
  );
}
