"use client";

import DocumentEditor from "@/components/document-editor/DocumentEditor";
import Paragraf1 from "./paragraphs/Paragraf1";
import Paragraf2 from "./paragraphs/Paragraf2";
import Paragraf3 from "./paragraphs/Paragraf3";
import Paragraf4 from "./paragraphs/Paragraf4";
import Paragraf5 from "./paragraphs/Paragraf5";
import Paragraf6 from "./paragraphs/Paragraf6";
import Paragraf7 from "./paragraphs/Paragraf7";

export default function NotaDinasEditor() {
  return (
    <DocumentEditor>
      <header className="text-center mb-8">
        <h1 className="text-base font-bold uppercase tracking-wide">
          Nota Dinas
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Penyampaian Laporan Penilaian
        </p>
      </header>

      <hr className="border-slate-300 mb-6" />

      <Paragraf1 />
      <Paragraf2 />
      <Paragraf3 />
      <Paragraf4 />
      <Paragraf5 />
      <Paragraf6 />
      <Paragraf7 />
    </DocumentEditor>
  );
}
