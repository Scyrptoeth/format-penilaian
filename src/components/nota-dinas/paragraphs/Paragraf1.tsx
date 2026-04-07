"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import UniqueField from "@/components/document-editor/UniqueField";
import { PARAGRAF1_OPTIONS } from "@/types/nota-dinas";

export default function Paragraf1() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf1);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 1 — Latar Belakang"
        options={PARAGRAF1_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf1", v as 1 | 2)}
      />

      <div className="text-justify indent-8">
        {selection === 1 ? (
          <p>
            Sehubungan dengan Nota Dinas Direktur Potensi, Kepatuhan, dan
            Penerimaan selaku Ketua Pelaksana Harian Komite Kepatuhan Wajib
            Pajak KPDJP Nomor ND-311/PJ.08/2026 tanggal 2 Februari 2026
            tentang Penetapan Daftar Sasaran Prioritas Pengamanan Penerimaan
            Pajak (DSP4) Kolaboratif Semester I Tahun 2026 dan Nota Dinas
            Kepala Kantor Pelayanan Pajak{" "}
            <UniqueField fieldKey="nama_kpp" /> Nomor{" "}
            <UniqueField fieldKey="nomor_nd" /> Tanggal{" "}
            <UniqueField fieldKey="tanggal_nd" /> tentang{" "}
            <UniqueField fieldKey="perihal_nd" /> (dengan Unit Pelaksana
            Penilaian (UPPn) adalah Kantor Wilayah Sumatera Utara I).
          </p>
        ) : (
          <p>
            Sehubungan dengan Nota Dinas Kepala Kantor Pelayanan Pajak{" "}
            <UniqueField fieldKey="nama_kpp" /> Nomor{" "}
            <UniqueField fieldKey="nomor_nd" /> Tanggal{" "}
            <UniqueField fieldKey="tanggal_nd" /> tentang{" "}
            <UniqueField fieldKey="perihal_nd" /> (dengan Unit Pelaksana
            Penilaian (UPPn) adalah Kantor Wilayah Sumatera Utara I).
          </p>
        )}
      </div>
    </section>
  );
}
