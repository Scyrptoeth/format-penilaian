"use client";

import { useNotaDinasStore } from "@/stores/nota-dinas-store";
import { generateNotaDinasDocx } from "./export/generateDocx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotaDinasToolbar() {
  const store = useNotaDinasStore();

  const handleDownload = async () => {
    await generateNotaDinasDocx(store.selections, store.sharedFields, store.uniqueFields);
  };

  const handleReset = () => {
    if (confirm("Reset semua isian? Data yang sudah diisi akan hilang.")) {
      store.resetAll();
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-[816px] flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            &larr; Kembali
          </Link>
          <span className="text-sm font-semibold text-slate-700">
            Nota Dinas Penyampaian Laporan Penilaian
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button size="sm" onClick={handleDownload}>
            Download .docx
          </Button>
        </div>
      </div>
    </div>
  );
}
