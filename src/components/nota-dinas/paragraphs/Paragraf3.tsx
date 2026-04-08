"use client";

import UniqueField from "@/components/document-editor/UniqueField";

export default function Paragraf3() {
  return (
    <section className="mb-6">
      <div className="mb-2 rounded-md bg-gray-50 px-3 py-2 border border-gray-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Paragraf 3 — Dasar Penugasan (Berlaku untuk Semua)
        </span>
      </div>

      <div className="text-justify">
        <p>
          Oleh karena itu, Tim Penilai{" "}
          <UniqueField fieldKey="nama_kanwil_penilai" /> telah
          melaksanakan tugas penilaian berdasarkan Surat Perintah Penilaian
          Nomor <UniqueField fieldKey="nomor_prin" /> tanggal{" "}
          <UniqueField fieldKey="tanggal_prin" /> untuk menentukan kewajaran
          nilai transaksi dimaksud.
        </p>
      </div>
    </section>
  );
}
