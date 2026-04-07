import NotaDinasEditor from "@/components/nota-dinas/NotaDinasEditor";
import NotaDinasToolbar from "@/components/nota-dinas/NotaDinasToolbar";
import FormattingToolbar from "@/components/document-editor/FormattingToolbar";

export const metadata = {
  title: "Nota Dinas — Format Penilaian",
  description: "Buat dokumen Nota Dinas Penyampaian Laporan Penilaian",
};

export default function NotaDinasPage() {
  return (
    <main>
      <NotaDinasToolbar />
      <FormattingToolbar />
      <NotaDinasEditor />
    </main>
  );
}
