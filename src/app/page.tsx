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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Format Penilaian
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Aplikasi pembuatan dokumen-dokumen Penilaian Pajak oleh Penilai
            Direktorat Jenderal Pajak (DJP) Indonesia. Pilih jenis dokumen di
            bawah untuk mulai.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-600 shrink-0">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-emerald-700">
              100% aman — semua data diproses di perangkat Anda, tidak ada yang dikirim atau disimpan di server.
            </span>
          </div>
        </div>
      </header>

      {/* Document list */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Jenis Dokumen
        </h2>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/${doc.id}`}
              className="group block rounded-lg border border-border bg-background p-6 hover:border-foreground transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/60 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
                <span className="shrink-0 ml-4 inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground">
                  {doc.status}
                </span>
              </div>
              <div className="mt-4 text-sm font-medium text-foreground group-hover:text-foreground/60">
                Buat Dokumen &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <p className="text-xs text-muted-foreground text-center">
            Format Penilaian &mdash; Tools untuk Penilai DJP Indonesia
          </p>
        </div>
      </footer>
    </main>
  );
}
