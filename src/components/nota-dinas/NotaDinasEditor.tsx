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
