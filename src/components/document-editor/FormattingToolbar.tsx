"use client";

import {
  useFontStore,
  AVAILABLE_FONTS,
  FONT_SIZES,
} from "@/stores/font-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormattingToolbar() {
  const fontFamily = useFontStore((s) => s.fontFamily);
  const fontSize = useFontStore((s) => s.fontSize);
  const setFontFamily = useFontStore((s) => s.setFontFamily);
  const setFontSize = useFontStore((s) => s.setFontSize);

  return (
    <div className="sticky top-[41px] z-40 bg-gray-50 border-b border-gray-200">
      <div className="mx-auto max-w-[816px] flex items-center gap-3 px-4 py-1.5">
        <label className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Font
        </label>
        <Select value={fontFamily} onValueChange={(v) => v && setFontFamily(v)}>
          <SelectTrigger className="h-7 w-[180px] text-xs bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[320px]">
            {AVAILABLE_FONTS.map((font) => (
              <SelectItem
                key={font.name}
                value={font.name}
                className="text-xs"
                style={{ fontFamily: font.family }}
              >
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-5 bg-gray-300" />

        <label className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Size
        </label>
        <Select
          value={String(fontSize)}
          onValueChange={(v) => v && setFontSize(Number(v))}
        >
          <SelectTrigger className="h-7 w-[70px] text-xs bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)} className="text-xs">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
