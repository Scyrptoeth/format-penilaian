import NotaDinasEditor from "@/components/nota-dinas/NotaDinasEditor";
import NotaDinasToolbar from "@/components/nota-dinas/NotaDinasToolbar";

export const metadata = {
  title: "Nota Dinas — Format Penilaian",
  description: "Buat dokumen Nota Dinas Penyampaian Laporan Penilaian",
};

export default function NotaDinasPage() {
  return (
    <main>
      <NotaDinasToolbar />
      <NotaDinasEditor />
    </main>
  );
}
