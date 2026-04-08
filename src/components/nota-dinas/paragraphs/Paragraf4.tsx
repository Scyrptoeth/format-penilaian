"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import SharedField from "@/components/document-editor/SharedField";
import UniqueField from "@/components/document-editor/UniqueField";
import { PARAGRAF4_OPTIONS } from "@/types/nota-dinas";
import type { Paragraf4Option } from "@/types/nota-dinas";

function IdentityRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 mb-1">
      <span className="shrink-0 w-52">{label}</span>
      <span className="shrink-0">:</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function Paragraf4() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf4);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  const isAHU = selection === 1 || selection === 3;
  const isHI = selection === 1 || selection === 2;

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 4 — Identitas Subjek dan Objek"
        options={PARAGRAF4_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf4", v as Paragraf4Option)}
      />

      <div className="space-y-1">
        <IdentityRow label="Wajib Pajak (Subjek)">
          <SharedField fieldKey="nama_wp" /> (NPWP:{" "}
          <UniqueField fieldKey="npwp_wp" />)
        </IdentityRow>

        <IdentityRow label="Perusahaan (Objek)">
          <SharedField fieldKey="nama_perusahaan" /> (NPWP:{" "}
          <UniqueField fieldKey="npwp_perusahaan" />) (p. 1)
        </IdentityRow>

        <IdentityRow label="Deskripsi Objek">
          {isAHU ? (
            <>
              <SharedField fieldKey="jumlah_lembar_saham" /> lembar saham
              (setara{" "}
              <UniqueField fieldKey="persentase_setara_kepemilikan" />{" "}
              kepemilikan) yang dialihkan kepada{" "}
              {isHI ? "pihak afiliasi (" : ""}
              <SharedField fieldKey="nama_pihak_lawan" />
              {isHI ? ")" : ""} (p. 1)
            </>
          ) : (
            <>
              <SharedField fieldKey="persentase_kepemilikan" /> kepemilikan
              saham yang dialihkan kepada{" "}
              {isHI ? "pihak afiliasi (" : ""}
              <SharedField fieldKey="nama_pihak_lawan" />
              {isHI ? ")" : ""} (p. 1)
            </>
          )}
        </IdentityRow>

        <IdentityRow label="Tanggal Penilaian">
          <UniqueField fieldKey="tanggal_penilaian" /> (p. 1)
        </IdentityRow>
      </div>
    </section>
  );
}
