"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ParagraphSelectorProps {
  label: string;
  options: Record<number, string>;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function ParagraphSelector({
  label,
  options,
  value,
  onChange,
  disabled,
}: ParagraphSelectorProps) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2 border border-slate-200">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
        {label}
      </span>
      <Select
        value={String(value)}
        onValueChange={(v) => onChange(Number(v))}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 text-xs flex-1 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([k, v]) => (
            <SelectItem key={k} value={k} className="text-xs">
              Pilihan {k}: {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
