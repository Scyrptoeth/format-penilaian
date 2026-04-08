"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import UniqueField from "@/components/document-editor/UniqueField";
import RupiahField from "@/components/document-editor/RupiahField";
import { PARAGRAF7_OPTIONS } from "@/types/nota-dinas";
import type { Paragraf7Option } from "@/types/nota-dinas";

function NilaiRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 mb-1">
      <span className="shrink-0 w-96">{label}</span>
      <span className="shrink-0">:</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function Paragraf7() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf7);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  const isHI = selection <= 3;

  const isNilaiLebihRendah = selection === 3 || selection === 6;
  const hasPKP = selection === 1 || selection === 4;
  const nilaiLabel = isHI ? "Nilai Pasar/Wajar" : "Nilai Sesungguhnya";
  const introText = isNilaiLebihRendah
    ? `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih rendah dibandingkan nilai yang dilaporkan Wajib Pajak:`
    : `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih tinggi dibandingkan nilai yang dilaporkan Wajib Pajak:`;

  const koreksiLabel = (
    <>Koreksi Tambahan Penghasilan (PPh Pasal <UniqueField fieldKey="pasal_pph" />)</>
  );

  const pphLabel = (
    <>PPh Terutang (Tarif Pasal <UniqueField fieldKey="pasal_pph" />)</>
  );

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 7 — Simpulan Nilai dan Potensi Pajak"
        options={PARAGRAF7_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf7", v as Paragraf7Option)}
      />

      <div className="text-justify mb-3">
        <p>{introText}</p>
      </div>

      <div className="space-y-1">
        <p className="font-medium mb-2">
          Uraian Nilai (p. <UniqueField fieldKey="halaman_simpulan" />)
        </p>

        <NilaiRow label="Nilai Objek Menurut Wajib Pajak (Nilai Buku)">
          <RupiahField fieldKey="nilai_buku" />
        </NilaiRow>

        <NilaiRow label={`Nilai Objek Menurut Penilai (${nilaiLabel})`}>
          <RupiahField fieldKey="nilai_wajar" />
        </NilaiRow>

        <NilaiRow label={koreksiLabel}>
          {isNilaiLebihRendah ? (
            <span className="text-muted-foreground">—</span>
          ) : (
            <RupiahField fieldKey="koreksi" />
          )}
        </NilaiRow>

        {!isNilaiLebihRendah && (
          <>
            {hasPKP && (
              <>
                <p className="font-medium mt-3 mb-2">
                  Perhitungan Potensi Pajak Terutang (p.{" "}
                  <UniqueField fieldKey="halaman_simpulan" />)
                </p>
                <NilaiRow label="Total Penghasilan Kena Pajak (setelah Koreksi)">
                  <RupiahField fieldKey="pkp" />
                </NilaiRow>
              </>
            )}

            <NilaiRow label={pphLabel}>
              <RupiahField fieldKey="pph_terutang" />
            </NilaiRow>

            <NilaiRow label="Total Potensi Pajak yang Masih Harus Dibayar">
              <RupiahField fieldKey="potensi_pajak" />
            </NilaiRow>
          </>
        )}

        {isNilaiLebihRendah && (
          <NilaiRow label={pphLabel}>
            <span className="text-muted-foreground">—</span>
          </NilaiRow>
        )}
      </div>
    </section>
  );
}
