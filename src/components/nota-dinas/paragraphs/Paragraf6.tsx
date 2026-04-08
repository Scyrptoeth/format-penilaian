"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import UniqueField from "@/components/document-editor/UniqueField";
import { PARAGRAF6_OPTIONS } from "@/types/nota-dinas";
import type { Paragraf6Option } from "@/types/nota-dinas";

export default function Paragraf6() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf6);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 6 — Temuan Administrasi"
        options={PARAGRAF6_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf6", v as Paragraf6Option)}
      />

      <div className="text-justify">
        {selection === 1 ? (
          <UniqueField fieldKey="temuan_administrasi" multiline />
        ) : (
          <p className="text-muted-foreground">—</p>
        )}
      </div>
    </section>
  );
}
