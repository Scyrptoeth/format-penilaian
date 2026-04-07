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
  const label = UNIQUE_FIELD_LABELS[fieldKey];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRupiah(e.target.value);
    setUniqueField(fieldKey, raw);
  };

  return (
    <span className="inline-flex items-baseline">
      <span className="mr-0.5">Rp</span>
      <input
        type="text"
        value={value ? formatRupiah(value) : ""}
        onChange={handleChange}
        placeholder={label}
        title={label}
        className={cn(
          "inline-block min-w-[140px] px-1.5 py-0.5 text-sm",
          "border-b-2 border-gray-400 rounded-sm outline-none transition-all",
          "hover:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1",
          "bg-transparent text-right",
          className
        )}
        style={{ width: `${Math.max(140, (formatRupiah(value).length + 1) * 8)}px` }}
      />
    </span>
  );
}
