"use client";

import { useState } from "react";
import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import { generateNotaDinasDocx } from "./export/generateDocx";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  SHARED_FIELD_LABELS,
  UNIQUE_FIELD_LABELS,
  type SharedFieldKey,
  type UniqueFieldKey,
} from "@/types/nota-dinas";
import Link from "next/link";

// Determine which fields are visible given current paragraph selections
function getVisibleFields(selections: ReturnType<typeof useNotaDinasStore.getState>["selections"]) {
  const shared: SharedFieldKey[] = [];
  const unique: UniqueFieldKey[] = [];

  // Paragraf 1 — always visible
  unique.push("nama_kpp", "nomor_nd", "tanggal_nd", "perihal_nd", "nama_kanwil_uppn");

  // Paragraf 2 — depends on selection
  const p2 = selections.paragraf2;
  const isAHU = p2 === 1 || p2 === 3;
  if (isAHU) {
    unique.push("nomor_ahu", "tanggal_ahu");
    shared.push("jumlah_lembar_saham");
  } else {
    shared.push("persentase_kepemilikan");
  }
  shared.push("nama_perusahaan", "nama_wp", "nama_pihak_lawan");

  // Paragraf 3
  unique.push("nama_kanwil_penilai", "nomor_prin", "tanggal_prin");

  // Paragraf 4
  unique.push("npwp_wp", "npwp_perusahaan", "tanggal_penilaian");
  if (isAHU) {
    unique.push("persentase_setara_kepemilikan");
  }

  // Paragraf 5
  unique.push("pendekatan_penilaian", "metode_penilaian", "halaman_metode");
  unique.push("dlom_value", "dloc_value");
  shared.push("halaman_parameter");

  // Paragraf 6
  if (selections.paragraf6 === 1) {
    unique.push("temuan_administrasi");
  }

  // Paragraf 7
  const p7 = selections.paragraf7;
  const isNilaiRendah = p7 === 3 || p7 === 6;
  const hasPKP = p7 === 1 || p7 === 4;
  unique.push("halaman_simpulan", "pasal_pph", "nilai_buku", "nilai_wajar");
  if (!isNilaiRendah) {
    unique.push("koreksi");
    if (hasPKP) unique.push("pkp");
    unique.push("pph_terutang", "potensi_pajak");
  }

  return { shared, unique };
}

export default function NotaDinasToolbar() {
  const store = useNotaDinasStore();
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [emptyFieldKeys, setEmptyFieldKeys] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDownload = async () => {
    const { shared, unique } = getVisibleFields(store.selections);

    const missingLabels: string[] = [];
    const missingKeys: string[] = [];
    for (const key of shared) {
      if (!store.sharedFields[key].trim()) {
        missingLabels.push(SHARED_FIELD_LABELS[key]);
        missingKeys.push(key);
      }
    }
    for (const key of unique) {
      if (!store.uniqueFields[key].trim()) {
        missingLabels.push(UNIQUE_FIELD_LABELS[key]);
        missingKeys.push(key);
      }
    }

    if (missingLabels.length > 0) {
      setEmptyFields(missingLabels);
      setEmptyFieldKeys(missingKeys);
      setDialogOpen(true);
      return;
    }

    await generateNotaDinasDocx(store.selections, store.sharedFields, store.uniqueFields);
  };

  const handleForceDownload = async () => {
    setDialogOpen(false);
    await generateNotaDinasDocx(store.selections, store.sharedFields, store.uniqueFields);
  };

  const handleGoBack = () => {
    setDialogOpen(false);
    store.setBouncingFields(emptyFieldKeys);
  };

  const handleReset = () => {
    if (confirm("Reset semua isian? Data yang sudah diisi akan hilang.")) {
      store.resetAll();
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="mx-auto max-w-[816px] flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              &larr; Kembali
            </Link>
            <span className="text-sm font-semibold text-foreground">
              Nota Dinas Penyampaian Laporan Penilaian
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500 shrink-0">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-emerald-600">Data Hanya Diproses di Perangkat Anda</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={handleDownload}>
              Download .docx
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="max-w-sm sm:max-w-[640px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-foreground shrink-0">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Terdapat isian yang belum dilengkapi
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Beberapa kolom belum diisi. Kolom yang kosong akan ditampilkan sebagai garis bawah (_) di file yang diunduh. Klik "Mengisi Kembali" dan Anda akan menemukan kolom yang begerak atas-bawah sebagai kolom yang seharusnya diisi.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 px-1">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm max-h-[240px] overflow-y-auto pr-1">
              {emptyFields.map((name) => (
                <li key={name} className="flex items-center gap-2 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  {name}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Apakah Anda yakin ingin melanjutkan mengunduh file ini?
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleGoBack}>Kembali Mengisi</AlertDialogCancel>
            <AlertDialogAction onClick={handleForceDownload}>
              Lanjut Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
