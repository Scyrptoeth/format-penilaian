"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import RupiahField from "@/components/document-editor/RupiahField";
import {
  PARAGRAF7_OPTIONS_HI,
  PARAGRAF7_OPTIONS_TIDAK_HI,
  getHIStatus,
} from "@/types/nota-dinas";
import type { Paragraf7Option } from "@/types/nota-dinas";

function NilaiRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 mb-1">
      <span className="shrink-0 w-80">{label}</span>
      <span className="shrink-0">:</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function Paragraf7() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf7);
  const p2 = useNotaDinasStore((s) => s.selections.paragraf2);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  const hiStatus = getHIStatus(p2);
  const isHI = hiStatus === "hubungan_istimewa";
  const options = isHI ? PARAGRAF7_OPTIONS_HI : PARAGRAF7_OPTIONS_TIDAK_HI;

  const isNilaiLebihRendah = selection === 3 || selection === 6;
  const hasPKP = selection === 1 || selection === 4;
  const nilaiLabel = isHI ? "Nilai Pasar/Wajar" : "Nilai Sesungguhnya";
  const introText = isNilaiLebihRendah
    ? `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih rendah dibandingkan nilai yang dilaporkan Wajib Pajak:`
    : `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih tinggi dibandingkan nilai yang dilaporkan Wajib Pajak:`;

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 7 — Simpulan Nilai dan Potensi Pajak"
        options={options}
        value={selection}
        onChange={(v) => setSelection("paragraf7", v as Paragraf7Option)}
      />

      <div className="text-justify indent-8 mb-3">
        <p>{introText}</p>
      </div>

      <div className="pl-8 space-y-1">
        <p className="font-medium mb-2">Uraian Nilai (p. 22)</p>

        <NilaiRow label="Nilai Objek Menurut Wajib Pajak (Nilai Buku)">
          <RupiahField fieldKey="nilai_buku" />
        </NilaiRow>

        <NilaiRow label={`Nilai Objek Menurut Penilai (${nilaiLabel})`}>
          <RupiahField fieldKey="nilai_wajar" />
        </NilaiRow>

        <NilaiRow label="Koreksi Tambahan Penghasilan (PPh Pasal 17)">
          {isNilaiLebihRendah ? (
            <span className="text-gray-500">—</span>
          ) : (
            <RupiahField fieldKey="koreksi" />
          )}
        </NilaiRow>

        {!isNilaiLebihRendah && (
          <>
            {hasPKP && (
              <>
                <p className="font-medium mt-3 mb-2">
                  Perhitungan Potensi Pajak Terutang (p. 22)
                </p>
                <NilaiRow label="Total Penghasilan Kena Pajak (setelah Koreksi)">
                  <RupiahField fieldKey="pkp" />
                </NilaiRow>
              </>
            )}

            <NilaiRow label="PPh Terutang (Tarif Pasal 17)">
              <RupiahField fieldKey="pph_terutang" />
            </NilaiRow>

            <NilaiRow label="Total Potensi Pajak yang Masih Harus Dibayar">
              <RupiahField fieldKey="potensi_pajak" />
            </NilaiRow>
          </>
        )}

        {isNilaiLebihRendah && (
          <NilaiRow label="PPh Terutang (Tarif Pasal 17)">
            <span className="text-gray-500">—</span>
          </NilaiRow>
        )}
      </div>
    </section>
  );
}
