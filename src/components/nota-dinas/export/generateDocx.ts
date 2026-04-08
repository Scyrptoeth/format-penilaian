import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Tab,
  TabStopType,
  LineRuleType,
  convertMillimetersToTwip,
} from "docx";
import type {
  ParagraphSelections,
  SharedFields,
  UniqueFields,
} from "@/types/nota-dinas";
import { getHIStatus } from "@/types/nota-dinas";
import { formatRupiah } from "@/lib/utils";

// --- Font: Arial 11pt (22 half-points) ---
const FONT = "Arial";
const SIZE = 22; // 11pt in half-points

// --- Spacing: single (1.0), no before/after ---
const LINE_SPACING = {
  line: 240,
  lineRule: LineRuleType.AUTO,
  before: 0,
  after: 0,
} as const;

// --- Hanging indent for label:value rows (50mm) ---
const LABEL_INDENT_TWIP = convertMillimetersToTwip(50);

function text(t: string): TextRun {
  return new TextRun({ text: t, font: FONT, size: SIZE });
}

function bold(t: string): TextRun {
  return new TextRun({ text: t, bold: true, font: FONT, size: SIZE });
}

function italic(t: string): TextRun {
  return new TextRun({ text: t, italics: true, font: FONT, size: SIZE });
}

function tab(): TextRun {
  return new TextRun({ children: [new Tab()], font: FONT, size: SIZE });
}

function val(v: string): TextRun {
  return text(v || "___________");
}

function rupiah(value: string): string {
  if (!value) return "___________";
  return `Rp${formatRupiah(value)}`;
}

// Justified paragraph with no indent (body text)
function bodyParagraph(children: TextRun[]): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: LINE_SPACING,
    children,
  });
}

// Empty paragraph (line break between sections)
function emptyLine(): Paragraph {
  return new Paragraph({
    spacing: LINE_SPACING,
    children: [],
  });
}

// Section header (bold, no numbering)
function sectionHeader(title: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: LINE_SPACING,
    children: [bold(title)],
  });
}

// Label : Value row with hanging indent and tab stop
function labelValueRow(label: string, valueRuns: TextRun[]): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: LINE_SPACING,
    indent: { left: LABEL_INDENT_TWIP, hanging: LABEL_INDENT_TWIP },
    tabStops: [{ type: TabStopType.LEFT, position: LABEL_INDENT_TWIP }],
    children: [
      text(label),
      tab(),
      text(": "),
      ...valueRuns,
    ],
  });
}

// --- Paragraph builders ---

function buildParagraf1(
  sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  if (sel.paragraf1 === 1) {
    return [
      bodyParagraph([
        text(
          "Sehubungan dengan Nota Dinas Direktur Potensi, Kepatuhan, dan Penerimaan selaku Ketua Pelaksana Harian Komite Kepatuhan Wajib Pajak KPDJP Nomor ND-311/PJ.08/2026 tanggal 2 Februari 2026 tentang Penetapan Daftar Sasaran Prioritas Pengamanan Penerimaan Pajak (DSP4) Kolaboratif Semester I Tahun 2026 dan Nota Dinas "
        ),
        val(uf.nama_kpp),
        text(" Nomor "),
        val(uf.nomor_nd),
        text(" Tanggal "),
        val(uf.tanggal_nd),
        text(" tentang "),
        val(uf.perihal_nd),
        text(" (dengan Unit Pelaksana Penilaian (UPPn) adalah "),
        val(uf.nama_kanwil_uppn),
        text(")."),
      ]),
    ];
  }

  return [
    bodyParagraph([
      text("Nota Dinas "),
      val(uf.nama_kpp),
      text(" Nomor "),
      val(uf.nomor_nd),
      text(" Tanggal "),
      val(uf.tanggal_nd),
      text(" tentang "),
      val(uf.perihal_nd),
      text(" (dengan Unit Pelaksana Penilaian (UPPn) adalah "),
      val(uf.nama_kanwil_uppn),
      text(")."),
    ]),
  ];
}

function buildParagraf2(
  sel: ParagraphSelections,
  sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  const p2 = sel.paragraf2;
  const isAHU = p2 === 1 || p2 === 3;
  const isHI = p2 === 1 || p2 === 2;

  const sourceRuns: TextRun[] = isAHU
    ? [
        text(
          "Berdasarkan data internal Direktorat Jenderal Pajak (DJP) dan dokumen Administrasi Hukum Umum (AHU) Nomor "
        ),
        val(uf.nomor_ahu),
        text(" tanggal "),
        val(uf.tanggal_ahu),
        text(", diketahui telah terjadi transaksi pengalihan "),
        val(sf.jumlah_lembar_saham),
        text(" lembar saham "),
      ]
    : [
        text(
          "Berdasarkan data internal Direktorat Jenderal Pajak (DJP), diketahui telah terjadi transaksi pengalihan "
        ),
        val(sf.persentase_kepemilikan),
        text(" kepemilikan saham "),
      ];

  const hiRuns: TextRun[] = isHI
    ? [
        text(
          " memiliki hubungan istimewa dengan pihak lawan transaksi tersebut, maka sesuai Pasal 18 ayat (3) Undang-Undang Pajak Penghasilan (PPh), nilai pengalihan harta harus dilakukan berdasarkan Nilai Pasar/Wajar dan bukan semata-mata berdasarkan Nilai Buku atau harga transaksi yang disepakati."
        ),
      ]
    : [
        text(" memiliki pengendalian atau penyertaan modal pada "),
        val(sf.nama_pihak_lawan),
        text(
          ", maka sesuai Pasal 10 ayat (1) Undang-Undang Pajak Penghasilan (UU PPh), nilai pengalihan harta harus dilakukan berdasarkan jumlah yang sesungguhnya."
        ),
      ];

  return [
    bodyParagraph([
      ...sourceRuns,
      val(sf.nama_perusahaan),
      text(" milik Wajib Pajak "),
      val(sf.nama_wp),
      text(" kepada "),
      val(sf.nama_pihak_lawan),
      text(". Mengingat Wajib Pajak "),
      val(sf.nama_wp),
      ...hiRuns,
    ]),
  ];
}

function buildParagraf3(
  _sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  return [
    bodyParagraph([
      text("Oleh karena itu, Tim Penilai "),
      val(uf.nama_kanwil_penilai),
      text(
        " telah melaksanakan tugas penilaian berdasarkan Surat Perintah Penilaian Nomor "
      ),
      val(uf.nomor_prin),
      text(" tanggal "),
      val(uf.tanggal_prin),
      text(" untuk menentukan kewajaran nilai transaksi dimaksud."),
    ]),
  ];
}

function buildParagraf4(
  sel: ParagraphSelections,
  sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  const isAHU = sel.paragraf4 === 1 || sel.paragraf4 === 3;
  const isHI = sel.paragraf4 === 1 || sel.paragraf4 === 2;

  const deskripsiRuns: TextRun[] = isAHU
    ? [
        val(sf.jumlah_lembar_saham),
        text(" lembar saham (setara "),
        val(uf.persentase_setara_kepemilikan),
        text(" kepemilikan) yang dialihkan kepada "),
        ...(isHI
          ? [text("pihak afiliasi ("), val(sf.nama_pihak_lawan), text(") (p. 1)")]
          : [val(sf.nama_pihak_lawan), text(" (p. 1)")]),
      ]
    : [
        val(sf.persentase_kepemilikan),
        text(" kepemilikan saham yang dialihkan kepada "),
        ...(isHI
          ? [text("pihak afiliasi ("), val(sf.nama_pihak_lawan), text(") (p. 1)")]
          : [val(sf.nama_pihak_lawan), text(" (p. 1)")]),
      ];

  return [
    labelValueRow("Wajib Pajak (Subjek)", [
      val(sf.nama_wp),
      text(" (NPWP: "),
      val(uf.npwp_wp),
      text(")"),
    ]),
    labelValueRow("Perusahaan (Objek)", [
      val(sf.nama_perusahaan),
      text(" (NPWP: "),
      val(uf.npwp_perusahaan),
      text(") (p. 1)"),
    ]),
    labelValueRow("Deskripsi Objek", deskripsiRuns),
    labelValueRow("Tanggal Penilaian", [
      val(uf.tanggal_penilaian),
      text(" (p. 1)"),
    ]),
  ];
}

function buildParagraf5(
  sel: ParagraphSelections,
  sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  const isHI = sel.paragraf5 === 1;
  const tujuan = isHI
    ? "Menentukan indikasi Nilai Wajar atas pengalihan saham sehubungan dengan transaksi yang dipengaruhi hubungan istimewa (Pasal 18 ayat (3) UU PPh) (p. 1)"
    : "Menentukan indikasi Nilai Sesungguhnya atas pengalihan saham (Pasal 10 ayat (1) UU PPh) (p. 1)";

  return [
    labelValueRow("Tujuan", [text(tujuan)]),
    labelValueRow("Metode Penilaian", [
      text("Pendekatan "),
      val(uf.pendekatan_penilaian),
      text(" dengan Metode "),
      val(uf.metode_penilaian),
      text(" ("),
      val(uf.halaman_metode),
      text(")"),
    ]),
    // Parameter Penyesuaian with first bullet on same line
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: LINE_SPACING,
      indent: { left: LABEL_INDENT_TWIP, hanging: LABEL_INDENT_TWIP },
      tabStops: [{ type: TabStopType.LEFT, position: LABEL_INDENT_TWIP }],
      children: [
        text("Parameter Penyesuaian"),
        tab(),
        text(": - "),
        italic("Discount for Lack of Marketability"),
        text(" (DLOM): "),
        val(uf.dlom_value),
        text(" (p. "),
        val(sf.halaman_parameter),
        text(")"),
      ],
    }),
    // Second bullet (DLOC) — indented continuation
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: LINE_SPACING,
      indent: { left: LABEL_INDENT_TWIP, hanging: LABEL_INDENT_TWIP },
      tabStops: [{ type: TabStopType.LEFT, position: LABEL_INDENT_TWIP }],
      children: [
        tab(),
        text("  - "),
        italic("Discount for Lack of Control"),
        text(" (DLOC): "),
        val(uf.dloc_value),
        text(" (p. "),
        val(sf.halaman_parameter),
        text(")"),
      ],
    }),
  ];
}

function buildParagraf6(
  sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  if (sel.paragraf6 === 1) {
    return [
      bodyParagraph([
        val(uf.temuan_administrasi || "(Temuan administrasi)"),
      ]),
    ];
  }

  return [
    bodyParagraph([text("—")]),
  ];
}

function buildParagraf7(
  sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  const p7 = sel.paragraf7;
  const isHI = getHIStatus(sel.paragraf2) === "hubungan_istimewa";
  const isNilaiRendah = p7 === 3 || p7 === 6;
  const hasPKP = p7 === 1 || p7 === 4;

  const nilaiLabel = isHI ? "Nilai Pasar/Wajar" : "Nilai Sesungguhnya";
  const intro = isNilaiRendah
    ? `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih rendah dibandingkan nilai yang dilaporkan Wajib Pajak:`
    : `Berdasarkan hasil analisis, Tim Penilai menyimpulkan ${nilaiLabel} yang lebih tinggi dibandingkan nilai yang dilaporkan Wajib Pajak:`;

  const halPage = val(uf.halaman_simpulan);
  const pasalNum = val(uf.pasal_pph);

  const paragraphs: Paragraph[] = [
    bodyParagraph([text(intro)]),
    emptyLine(),
    bodyParagraph([text("Uraian Nilai (p. "), halPage, text(")")]),
    labelValueRow("Nilai Objek Menurut Wajib Pajak (Nilai Buku)", [
      text(rupiah(uf.nilai_buku)),
    ]),
    labelValueRow(`Nilai Objek Menurut Penilai (${nilaiLabel})`, [
      text(rupiah(uf.nilai_wajar)),
    ]),
    labelValueRow(`Koreksi Tambahan Penghasilan (PPh Pasal ${uf.pasal_pph || "___"})`, [
      text(isNilaiRendah ? "—" : rupiah(uf.koreksi)),
    ]),
  ];

  if (!isNilaiRendah) {
    if (hasPKP) {
      paragraphs.push(
        emptyLine(),
        bodyParagraph([text("Perhitungan Potensi Pajak Terutang (p. "), val(uf.halaman_simpulan), text(")")]),
        labelValueRow(
          "Total Penghasilan Kena Pajak (setelah Koreksi)",
          [text(rupiah(uf.pkp))]
        )
      );
    }

    paragraphs.push(
      labelValueRow(`PPh Terutang (Tarif Pasal ${uf.pasal_pph || "___"})`, [
        text(rupiah(uf.pph_terutang)),
      ]),
      labelValueRow("Total Potensi Pajak yang Masih Harus Dibayar", [
        text(rupiah(uf.potensi_pajak)),
      ])
    );
  } else {
    paragraphs.push(
      labelValueRow(`PPh Terutang (Tarif Pasal ${uf.pasal_pph || "___"})`, [text("—")])
    );
  }

  return paragraphs;
}

export async function generateNotaDinasDocx(
  selections: ParagraphSelections,
  sharedFields: SharedFields,
  uniqueFields: UniqueFields
): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertMillimetersToTwip(25),
              right: convertMillimetersToTwip(25),
              bottom: convertMillimetersToTwip(25),
              left: convertMillimetersToTwip(30),
            },
          },
        },
        children: [
          // Paragraf 1 — Latar Belakang
          sectionHeader("Latar Belakang"),
          ...buildParagraf1(selections, sharedFields, uniqueFields),

          // Empty line between sections
          emptyLine(),

          // Paragraf 2 — NO "Uraian Transaksi" header per ideal
          ...buildParagraf2(selections, sharedFields, uniqueFields),

          // Empty line
          emptyLine(),

          // Paragraf 3 — Dasar Penugasan
          sectionHeader("Dasar Penugasan"),
          ...buildParagraf3(selections, sharedFields, uniqueFields),

          // Empty line
          emptyLine(),

          // Paragraf 4 — Identitas Subjek dan Objek Penilaian
          sectionHeader("Identitas Subjek dan Objek Penilaian"),
          ...buildParagraf4(selections, sharedFields, uniqueFields),

          // Empty line
          emptyLine(),

          // Paragraf 5 — Ringkasan Pelaksanaan Penilaian
          sectionHeader("Ringkasan Pelaksanaan Penilaian"),
          ...buildParagraf5(selections, sharedFields, uniqueFields),

          // Empty line
          emptyLine(),

          // Paragraf 6 — Temuan Administrasi
          sectionHeader("Temuan Administrasi"),
          ...buildParagraf6(selections, sharedFields, uniqueFields),

          // Empty line
          emptyLine(),

          // Paragraf 7 — Simpulan Nilai dan Potensi Pajak
          sectionHeader("Simpulan Nilai dan Potensi Pajak"),
          ...buildParagraf7(selections, sharedFields, uniqueFields),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Nota Dinas Penyampaian Laporan Penilaian.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
