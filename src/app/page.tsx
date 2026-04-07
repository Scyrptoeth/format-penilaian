import Link from "next/link";

const documents = [
  {
    id: "nota-dinas",
    title: "Nota Dinas Penyampaian Laporan Penilaian",
    description:
      "Dokumen formal yang menyampaikan hasil laporan penilaian saham untuk keperluan perpajakan DJP.",
    status: "Tersedia" as const,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Format Penilaian
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Aplikasi pembuatan dokumen-dokumen Penilaian Pajak oleh Penilai
            Direktorat Jenderal Pajak (DJP) Indonesia. Pilih jenis dokumen di
            bawah untuk mulai.
          </p>
        </div>
      </header>

      {/* Document list */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Jenis Dokumen
        </h2>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/${doc.id}`}
              className="group block rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {doc.description}
                  </p>
                </div>
                <span className="shrink-0 ml-4 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {doc.status}
                </span>
              </div>
              <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                Buat Dokumen &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <p className="text-xs text-slate-400 text-center">
            Format Penilaian &mdash; Tools untuk Penilai DJP Indonesia
          </p>
        </div>
      </footer>
    </main>
  );
}
