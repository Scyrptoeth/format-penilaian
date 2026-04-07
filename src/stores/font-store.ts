import { create } from "zustand";

export interface FontDefinition {
  name: string;
  family: string;
  source: "system" | "google";
  category: "serif" | "sans-serif" | "monospace" | "casual";
}

export const AVAILABLE_FONTS: FontDefinition[] = [
  // System fonts
  { name: "Arial", family: "Arial, Helvetica, sans-serif", source: "system", category: "sans-serif" },
  { name: "Times New Roman", family: "'Times New Roman', Times, serif", source: "system", category: "serif" },
  { name: "Georgia", family: "Georgia, 'Times New Roman', serif", source: "system", category: "serif" },
  { name: "Verdana", family: "Verdana, Geneva, sans-serif", source: "system", category: "sans-serif" },
  { name: "Tahoma", family: "Tahoma, Geneva, sans-serif", source: "system", category: "sans-serif" },
  { name: "Trebuchet MS", family: "'Trebuchet MS', Helvetica, sans-serif", source: "system", category: "sans-serif" },
  { name: "Palatino Linotype", family: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", source: "system", category: "serif" },
  { name: "Courier New", family: "'Courier New', Courier, monospace", source: "system", category: "monospace" },
  { name: "Garamond", family: "Garamond, 'Times New Roman', serif", source: "system", category: "serif" },
  { name: "Comic Sans MS", family: "'Comic Sans MS', cursive", source: "system", category: "casual" },
  // Google Fonts
  { name: "Carlito", family: "'Carlito', sans-serif", source: "google", category: "sans-serif" },
  { name: "Noto Sans", family: "'Noto Sans', sans-serif", source: "google", category: "sans-serif" },
  { name: "Nunito", family: "'Nunito', sans-serif", source: "google", category: "sans-serif" },
  { name: "Inter", family: "'Inter', sans-serif", source: "google", category: "sans-serif" },
  { name: "DM Sans", family: "'DM Sans', sans-serif", source: "google", category: "sans-serif" },
  { name: "Roboto", family: "'Roboto', sans-serif", source: "google", category: "sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif", source: "google", category: "sans-serif" },
  { name: "Lato", family: "'Lato', sans-serif", source: "google", category: "sans-serif" },
  { name: "Poppins", family: "'Poppins', sans-serif", source: "google", category: "sans-serif" },
  { name: "Merriweather", family: "'Merriweather', serif", source: "google", category: "serif" },
];

export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36];

interface FontState {
  fontFamily: string;
  fontSize: number;
  loadedGoogleFonts: Set<string>;
  setFontFamily: (name: string) => void;
  setFontSize: (size: number) => void;
}

function loadGoogleFont(fontName: string): void {
  if (typeof document === "undefined") return;

  const id = `google-font-${fontName.replace(/\s/g, "-")}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export const useFontStore = create<FontState>((set, get) => ({
  fontFamily: "Arial",
  fontSize: 11,
  loadedGoogleFonts: new Set<string>(),

  setFontFamily: (name: string) => {
    const font = AVAILABLE_FONTS.find((f) => f.name === name);
    if (!font) return;

    if (font.source === "google" && !get().loadedGoogleFonts.has(name)) {
      loadGoogleFont(name);
      set((s) => ({
        fontFamily: name,
        loadedGoogleFonts: new Set(s.loadedGoogleFonts).add(name),
      }));
    } else {
      set({ fontFamily: name });
    }
  },

  setFontSize: (size: number) => set({ fontSize: size }),
}));

export function getFontCSS(fontName: string): string {
  const font = AVAILABLE_FONTS.find((f) => f.name === fontName);
  return font?.family ?? "Arial, Helvetica, sans-serif";
}
