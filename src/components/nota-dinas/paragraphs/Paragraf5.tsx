"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import SharedField from "@/components/document-editor/SharedField";
import UniqueField from "@/components/document-editor/UniqueField";
import { PARAGRAF5_OPTIONS } from "@/types/nota-dinas";
import type { Paragraf5Option } from "@/types/nota-dinas";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 mb-1">
      <span className="shrink-0 w-44">{label}</span>
      <span className="shrink-0">:</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function Paragraf5() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf5);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  const isHI = selection === 1;

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 5 — Ringkasan Pelaksanaan Penilaian"
        options={PARAGRAF5_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf5", v as Paragraf5Option)}
      />

      <div className="pl-8 space-y-1">
        <DetailRow label="Tujuan">
          {isHI
            ? "Menentukan indikasi Nilai Wajar atas pengalihan saham sehubungan dengan transaksi yang dipengaruhi hubungan istimewa (Pasal 18 ayat (3) UU PPh) (p. 1)"
            : "Menentukan indikasi Nilai Sesungguhnya atas pengalihan saham (Pasal 10 ayat (1) UU PPh) (p. 1)"}
        </DetailRow>

        <DetailRow label="Metode Penilaian">
          Pendekatan <UniqueField fieldKey="pendekatan_penilaian" /> dengan
          Metode <UniqueField fieldKey="metode_penilaian" />{" "}
          <UniqueField fieldKey="halaman_metode" />
        </DetailRow>

        <div className="mt-2">
          <span className="font-medium">Parameter Penyesuaian :</span>
          <ul className="list-disc pl-6 mt-1 space-y-1">
            <li>
              <em>Discount for Lack of Marketability</em> (DLOM):{" "}
              <UniqueField fieldKey="dlom_value" /> (p.{" "}
              <SharedField fieldKey="halaman_parameter" />)
            </li>
            <li>
              <em>Discount for Lack of Control</em> (DLOC):{" "}
              <UniqueField fieldKey="dloc_value" /> (p.{" "}
              <SharedField fieldKey="halaman_parameter" />)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
