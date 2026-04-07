import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  TabStopPosition,
  TabStopType,
  convertMillimetersToTwip,
} from "docx";
import type {
  ParagraphSelections,
  SharedFields,
  UniqueFields,
} from "@/types/nota-dinas";
import { getHIStatus } from "@/types/nota-dinas";
import { formatRupiah } from "@/lib/utils";

function bold(text: string): TextRun {
  return new TextRun({ text, bold: true, font: "Times New Roman", size: 24 });
}

function normal(text: string): TextRun {
  return new TextRun({ text, font: "Times New Roman", size: 24 });
}

function italic(text: string): TextRun {
  return new TextRun({ text, italics: true, font: "Times New Roman", size: 24 });
}

function underline(text: string): TextRun {
  return new TextRun({
    text: text || "___________",
    underline: { type: "single" },
    font: "Times New Roman",
    size: 24,
  });
}

function shared(text: string): TextRun {
  return new TextRun({
    text: text || "___________",
    bold: true,
    font: "Times New Roman",
    size: 24,
  });
}

function rupiah(value: string): string {
  if (!value) return "___________";
  return formatRupiah(value);
}

function labelValueParagraph(label: string, value: TextRun[]): Paragraph {
  return new Paragraph({
    children: [normal(`${label} : `), ...value],
    spacing: { after: 80 },
    indent: { left: convertMillimetersToTwip(15) },
    tabStops: [
      { type: TabStopType.LEFT, position: TabStopPosition.MAX },
    ],
  });
}

function buildParagraf1(
  sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  if (sel.paragraf1 === 1) {
    return [
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: convertMillimetersToTwip(12) },
        spacing: { after: 200 },
        children: [
          normal(
            "Sehubungan dengan Nota Dinas Direktur Potensi, Kepatuhan, dan Penerimaan selaku Ketua Pelaksana Harian Komite Kepatuhan Wajib Pajak KPDJP Nomor ND-311/PJ.08/2026 tanggal 2 Februari 2026 tentang Penetapan Daftar Sasaran Prioritas Pengamanan Penerimaan Pajak (DSP4) Kolaboratif Semester I Tahun 2026 dan Nota Dinas Kepala Kantor Pelayanan Pajak "
          ),
          underline(uf.nama_kpp),
          normal(" Nomor "),
          underline(uf.nomor_nd),
          normal(" Tanggal "),
          underline(uf.tanggal_nd),
          normal(" tentang "),
          underline(uf.perihal_nd),
          normal(
            " (dengan Unit Pelaksana Penilaian (UPPn) adalah Kantor Wilayah Sumatera Utara I)."
          ),
        ],
      }),
    ];
  }

  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: convertMillimetersToTwip(12) },
      spacing: { after: 200 },
      children: [
        normal("Nota Dinas Kepala Kantor Pelayanan Pajak "),
        underline(uf.nama_kpp),
        normal(" Nomor "),
        underline(uf.nomor_nd),
        normal(" Tanggal "),
        underline(uf.tanggal_nd),
        normal(" tentang "),
        underline(uf.perihal_nd),
        normal(
          " (dengan Unit Pelaksana Penilaian (UPPn) adalah Kantor Wilayah Sumatera Utara I)."
        ),
      ],
    }),
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
        normal(
          "Berdasarkan data internal Direktorat Jenderal Pajak (DJP) dan dokumen Administrasi Hukum Umum (AHU) Nomor "
        ),
        underline(uf.nomor_ahu),
        normal(" tanggal "),
        underline(uf.tanggal_ahu),
        normal(", diketahui telah terjadi transaksi pengalihan "),
        shared(sf.jumlah_lembar_saham),
        normal(" lembar saham "),
      ]
    : [
        normal(
          "Berdasarkan data internal Direktorat Jenderal Pajak (DJP), diketahui telah terjadi transaksi pengalihan "
        ),
        shared(sf.persentase_kepemilikan),
        normal(" kepemilikan saham "),
      ];

  const hiRuns: TextRun[] = isHI
    ? [
        normal(
          " memiliki hubungan istimewa dengan pihak lawan transaksi tersebut, maka sesuai Pasal 18 ayat (3) Undang-Undang Pajak Penghasilan (PPh), nilai pengalihan harta harus dilakukan berdasarkan Nilai Pasar/Wajar dan bukan semata-mata berdasarkan Nilai Buku atau harga transaksi yang disepakati."
        ),
      ]
    : [
        normal(" memiliki pengendalian atau penyertaan modal pada "),
        shared(sf.nama_pihak_lawan),
        normal(
          ", maka sesuai Pasal 10 ayat (1) Undang-Undang Pajak Penghasilan (UU PPh), nilai pengalihan harta harus dilakukan berdasarkan jumlah yang sesungguhnya."
        ),
      ];

  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: convertMillimetersToTwip(12) },
      spacing: { after: 200 },
      children: [
        ...sourceRuns,
        shared(sf.nama_perusahaan),
        normal(" milik Wajib Pajak "),
        shared(sf.nama_wp),
        normal(" kepada "),
        shared(sf.nama_pihak_lawan),
        normal(". Mengingat Wajib Pajak "),
        shared(sf.nama_wp),
        ...hiRuns,
      ],
    }),
  ];
}

function buildParagraf3(
  _sel: ParagraphSelections,
  _sf: SharedFields,
  uf: UniqueFields
): Paragraph[] {
  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: convertMillimetersToTwip(12) },
      spacing: { after: 200 },
      children: [
        normal(
          "Oleh karena itu, Tim Penilai Kanwil DJP Sumatera Utara I telah melaksanakan tugas penilaian berdasarkan Surat Perintah Penilaian Nomor "
        ),
        underline(uf.nomor_prin),
        normal(" tanggal "),
        underline(uf.tanggal_prin),
        normal(" untuk menentukan kewajaran nilai transaksi dimaksud."),
      ],
    }),
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
        shared(sf.jumlah_lembar_saham),
        normal(" lembar saham (setara "),
        underline(uf.persentase_setara_kepemilikan),
        normal(" kepemilikan) yang dialihkan kepada "),
        normal(isHI ? "pihak afiliasi (" : ""),
        shared(sf.nama_pihak_lawan),
        normal(isHI ? ") (p. 1)" : " (p. 1)"),
      ]
    : [
        shared(sf.persentase_kepemilikan),
        normal(" kepemilikan saham yang dialihkan kepada "),
        normal(isHI ? "pihak afiliasi (" : ""),
        shared(sf.nama_pihak_lawan),
        normal(isHI ? ") (p. 1)" : " (p. 1)"),
      ];

  return [
    labelValueParagraph("Wajib Pajak (Subjek)", [
      shared(sf.nama_wp),
      normal(" (NPWP: "),
      underline(uf.npwp_wp),
      normal(")"),
    ]),
    labelValueParagraph("Perusahaan (Objek)", [
      shared(sf.nama_perusahaan),
      normal(" (NPWP: "),
      underline(uf.npwp_perusahaan),
      normal(") (p. 1)"),
    ]),
    labelValueParagraph("Deskripsi Objek", deskripsiRuns),
    labelValueParagraph("Tanggal Penilaian", [
      underline(uf.tanggal_penilaian),
      normal(" (p. 1)"),
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
    labelValueParagraph("Tujuan", [normal(tujuan)]),
    labelValueParagraph("Metode Penilaian", [
      normal("Pendekatan "),
      underline(uf.pendekatan_penilaian),
      normal(" dengan Metode "),
      underline(uf.metode_penilaian),
      normal(" "),
      underline(uf.halaman_metode),
    ]),
    new Paragraph({
      children: [normal("Parameter Penyesuaian :")],
      spacing: { before: 120, after: 80 },
      indent: { left: convertMillimetersToTwip(15) },
    }),
    new Paragraph({
      children: [
        normal("- "),
        italic("Discount for Lack of Marketability"),
        normal(" (DLOM): "),
        underline(uf.dlom_value),
        normal(" (p. "),
        shared(sf.halaman_parameter),
        normal(")"),
      ],
      spacing: { after: 80 },
      indent: { left: convertMillimetersToTwip(20) },
    }),
    new Paragraph({
      children: [
        normal("- "),
        italic("Discount for Lack of Control"),
        normal(" (DLOC): "),
        underline(uf.dloc_value),
        normal(" (p. "),
        shared(sf.halaman_parameter),
        normal(")"),
      ],
      spacing: { after: 200 },
      indent: { left: convertMillimetersToTwip(20) },
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
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: convertMillimetersToTwip(12) },
        spacing: { after: 200 },
        children: [underline(uf.temuan_administrasi || "(Temuan administrasi)")],
      }),
    ];
  }

  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: convertMillimetersToTwip(12) },
      spacing: { after: 200 },
      children: [normal("—")],
    }),
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

  const paragraphs: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: convertMillimetersToTwip(12) },
      spacing: { after: 120 },
      children: [normal(intro)],
    }),
    new Paragraph({
      children: [bold("Uraian Nilai (p. 22)")],
      spacing: { before: 120, after: 80 },
      indent: { left: convertMillimetersToTwip(15) },
    }),
    labelValueParagraph("Nilai Objek Menurut Wajib Pajak (Nilai Buku)", [
      normal(`Rp${rupiah(uf.nilai_buku)}`),
    ]),
    labelValueParagraph(`Nilai Objek Menurut Penilai (${nilaiLabel})`, [
      normal(`Rp${rupiah(uf.nilai_wajar)}`),
    ]),
    labelValueParagraph("Koreksi Tambahan Penghasilan (PPh Pasal 17)", [
      normal(isNilaiRendah ? "—" : `Rp${rupiah(uf.koreksi)}`),
    ]),
  ];

  if (!isNilaiRendah) {
    if (hasPKP) {
      paragraphs.push(
        new Paragraph({
          children: [bold("Perhitungan Potensi Pajak Terutang (p. 22)")],
          spacing: { before: 120, after: 80 },
          indent: { left: convertMillimetersToTwip(15) },
        }),
        labelValueParagraph(
          "Total Penghasilan Kena Pajak (setelah Koreksi)",
          [normal(`Rp${rupiah(uf.pkp)}`)]
        )
      );
    }

    paragraphs.push(
      labelValueParagraph("PPh Terutang (Tarif Pasal 17)", [
        normal(`Rp${rupiah(uf.pph_terutang)}`),
      ]),
      labelValueParagraph("Total Potensi Pajak yang Masih Harus Dibayar", [
        normal(`Rp${rupiah(uf.potensi_pajak)}`),
      ])
    );
  } else {
    paragraphs.push(
      labelValueParagraph("PPh Terutang (Tarif Pasal 17)", [normal("—")])
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
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [bold("NOTA DINAS")],
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [normal("Penyampaian Laporan Penilaian")],
          }),

          // Section headers + paragraphs
          sectionHeader("I. Latar Belakang"),
          ...buildParagraf1(selections, sharedFields, uniqueFields),

          sectionHeader("II. Uraian Transaksi"),
          ...buildParagraf2(selections, sharedFields, uniqueFields),

          sectionHeader("III. Dasar Penugasan"),
          ...buildParagraf3(selections, sharedFields, uniqueFields),

          sectionHeader("IV. Identitas Subjek dan Objek Penilaian"),
          ...buildParagraf4(selections, sharedFields, uniqueFields),

          sectionHeader("V. Ringkasan Pelaksanaan Penilaian"),
          ...buildParagraf5(selections, sharedFields, uniqueFields),

          sectionHeader("VI. Temuan Administrasi"),
          ...buildParagraf6(selections, sharedFields, uniqueFields),

          sectionHeader("VII. Simpulan Nilai dan Potensi Pajak"),
          ...buildParagraf7(selections, sharedFields, uniqueFields),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Nota-Dinas-Penyampaian-Laporan-Penilaian.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    children: [bold(text)],
    spacing: { before: 240, after: 120 },
  });
}
