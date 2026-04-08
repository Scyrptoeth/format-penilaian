"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import ParagraphSelector from "@/components/document-editor/ParagraphSelector";
import SharedField from "@/components/document-editor/SharedField";
import UniqueField from "@/components/document-editor/UniqueField";
import { PARAGRAF2_OPTIONS } from "@/types/nota-dinas";
import type { Paragraf2Option } from "@/types/nota-dinas";

export default function Paragraf2() {
  const selection = useNotaDinasStore((s) => s.selections.paragraf2);
  const setSelection = useNotaDinasStore((s) => s.setSelection);

  return (
    <section className="mb-6">
      <ParagraphSelector
        label="Paragraf 2 — Uraian Transaksi"
        options={PARAGRAF2_OPTIONS}
        value={selection}
        onChange={(v) => setSelection("paragraf2", v as Paragraf2Option)}
      />

      <div className="text-justify">
        {selection === 1 && (
          <p>
            Berdasarkan data internal Direktorat Jenderal Pajak (DJP) dan
            dokumen Administrasi Hukum Umum (AHU) Nomor{" "}
            <UniqueField fieldKey="nomor_ahu" /> tanggal{" "}
            <UniqueField fieldKey="tanggal_ahu" />, diketahui telah terjadi
            transaksi pengalihan{" "}
            <SharedField fieldKey="jumlah_lembar_saham" /> lembar saham{" "}
            <SharedField fieldKey="nama_perusahaan" /> milik Wajib Pajak{" "}
            <SharedField fieldKey="nama_wp" /> kepada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />. Mengingat Wajib
            Pajak <SharedField fieldKey="nama_wp" /> memiliki hubungan
            istimewa dengan pihak lawan transaksi tersebut, maka sesuai Pasal
            18 ayat (3) Undang-Undang Pajak Penghasilan (PPh), nilai
            pengalihan harta harus dilakukan berdasarkan Nilai Pasar/Wajar
            dan bukan semata-mata berdasarkan Nilai Buku atau harga transaksi
            yang disepakati.
          </p>
        )}

        {selection === 2 && (
          <p>
            Berdasarkan data internal Direktorat Jenderal Pajak (DJP),
            diketahui telah terjadi transaksi pengalihan{" "}
            <SharedField fieldKey="persentase_kepemilikan" /> kepemilikan
            saham <SharedField fieldKey="nama_perusahaan" /> milik Wajib
            Pajak <SharedField fieldKey="nama_wp" /> kepada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />. Mengingat Wajib
            Pajak <SharedField fieldKey="nama_wp" /> memiliki hubungan
            istimewa dengan pihak lawan transaksi tersebut, maka sesuai Pasal
            18 ayat (3) Undang-Undang Pajak Penghasilan (PPh), nilai
            pengalihan harta harus dilakukan berdasarkan Nilai Pasar/Wajar
            dan bukan semata-mata berdasarkan Nilai Buku atau harga transaksi
            yang disepakati.
          </p>
        )}

        {selection === 3 && (
          <p>
            Berdasarkan data internal Direktorat Jenderal Pajak (DJP) dan
            dokumen Administrasi Hukum Umum (AHU) Nomor{" "}
            <UniqueField fieldKey="nomor_ahu" /> tanggal{" "}
            <UniqueField fieldKey="tanggal_ahu" />, diketahui telah terjadi
            transaksi pengalihan{" "}
            <SharedField fieldKey="jumlah_lembar_saham" /> lembar saham{" "}
            <SharedField fieldKey="nama_perusahaan" /> milik Wajib Pajak{" "}
            <SharedField fieldKey="nama_wp" /> kepada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />. Mengingat Wajib
            Pajak <SharedField fieldKey="nama_wp" /> memiliki pengendalian
            atau penyertaan modal pada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />, maka sesuai Pasal 10
            ayat (1) Undang-Undang Pajak Penghasilan (UU PPh), nilai
            pengalihan harta harus dilakukan berdasarkan jumlah yang
            sesungguhnya.
          </p>
        )}

        {selection === 4 && (
          <p>
            Berdasarkan data internal Direktorat Jenderal Pajak (DJP),
            diketahui telah terjadi transaksi pengalihan{" "}
            <SharedField fieldKey="persentase_kepemilikan" /> kepemilikan
            saham <SharedField fieldKey="nama_perusahaan" /> milik Wajib
            Pajak <SharedField fieldKey="nama_wp" /> kepada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />. Mengingat Wajib
            Pajak <SharedField fieldKey="nama_wp" /> memiliki pengendalian
            atau penyertaan modal pada{" "}
            <SharedField fieldKey="nama_pihak_lawan" />, maka sesuai Pasal 10
            ayat (1) Undang-Undang Pajak Penghasilan (UU PPh), nilai
            pengalihan harta harus dilakukan berdasarkan jumlah yang
            sesungguhnya.
          </p>
        )}
      </div>
    </section>
  );
}
