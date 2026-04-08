// Paragraph selection types
export type Paragraf1Option = 1 | 2;
export type Paragraf2Option = 1 | 2 | 3 | 4;
export type Paragraf4Option = 1 | 2 | 3 | 4;
export type Paragraf5Option = 1 | 2;
export type Paragraf6Option = 1 | 2;
export type Paragraf7Option = 1 | 2 | 3 | 4 | 5 | 6;

export interface ParagraphSelections {
  paragraf1: Paragraf1Option;
  paragraf2: Paragraf2Option;
  // paragraf3 has no selection (single template)
  paragraf4: Paragraf4Option;
  paragraf5: Paragraf5Option;
  paragraf6: Paragraf6Option;
  paragraf7: Paragraf7Option;
}

// Shared fields — color-coded, auto-sync across document
export interface SharedFields {
  nama_wp: string;
  nama_perusahaan: string;
  nama_pihak_lawan: string;
  jumlah_lembar_saham: string;
  persentase_kepemilikan: string;
  halaman_parameter: string;
}

export type SharedFieldKey = keyof SharedFields;

export const SHARED_FIELD_COLORS: Record<SharedFieldKey, string> = {
  nama_wp: "yellow",
  nama_perusahaan: "cyan",
  nama_pihak_lawan: "green",
  jumlah_lembar_saham: "magenta",
  persentase_kepemilikan: "blue",
  halaman_parameter: "red",
};

export const SHARED_FIELD_LABELS: Record<SharedFieldKey, string> = {
  nama_wp: "Nama Wajib Pajak",
  nama_perusahaan: "Nama Perusahaan (Objek)",
  nama_pihak_lawan: "Nama Pihak Lawan Transaksi",
  jumlah_lembar_saham: "Jumlah Lembar Saham",
  persentase_kepemilikan: "Persentase Kepemilikan",
  halaman_parameter: "Halaman Parameter",
};

// Unique fields — underline, each exists in one location only
export interface UniqueFields {
  nama_kpp: string;
  nomor_nd: string;
  tanggal_nd: string;
  perihal_nd: string;
  nama_kanwil_uppn: string;
  nomor_ahu: string;
  tanggal_ahu: string;
  nama_kanwil_penilai: string;
  nomor_prin: string;
  tanggal_prin: string;
  npwp_wp: string;
  npwp_perusahaan: string;
  persentase_setara_kepemilikan: string;
  tanggal_penilaian: string;
  pendekatan_penilaian: string;
  metode_penilaian: string;
  halaman_metode: string;
  dlom_value: string;
  dloc_value: string;
  temuan_administrasi: string;
  halaman_simpulan: string;
  pasal_pph: string;
  nilai_buku: string;
  nilai_wajar: string;
  koreksi: string;
  pkp: string;
  pph_terutang: string;
  potensi_pajak: string;
}

export type UniqueFieldKey = keyof UniqueFields;

export const UNIQUE_FIELD_LABELS: Record<UniqueFieldKey, string> = {
  nama_kpp: "Jabatan & Nama KPP",
  nomor_nd: "Nomor ND",
  tanggal_nd: "Tanggal ND",
  perihal_nd: "Perihal ND",
  nama_kanwil_uppn: "Nama Kantor Wilayah (UPPn)",
  nomor_ahu: "Nomor AHU",
  tanggal_ahu: "Tanggal AHU",
  nama_kanwil_penilai: "Nama Kanwil Tim Penilai",
  nomor_prin: "Nomor Surat Perintah Penilaian",
  tanggal_prin: "Tanggal PRIN",
  npwp_wp: "NPWP Wajib Pajak",
  npwp_perusahaan: "NPWP Perusahaan",
  persentase_setara_kepemilikan: "Persentase Setara Kepemilikan",
  tanggal_penilaian: "Tanggal Penilaian",
  pendekatan_penilaian: "Pendekatan Penilaian",
  metode_penilaian: "Metode Penilaian",
  halaman_metode: "Halaman Metode",
  dlom_value: "DLOM Value",
  dloc_value: "DLOC Value",
  temuan_administrasi: "Temuan Administrasi",
  halaman_simpulan: "Halaman Simpulan",
  pasal_pph: "Pasal PPh",
  nilai_buku: "Nilai Buku",
  nilai_wajar: "Nilai Wajar",
  koreksi: "Koreksi",
  pkp: "PKP",
  pph_terutang: "PPh Terutang",
  potensi_pajak: "Potensi Pajak",
};

// Hubungan Istimewa status derived from Paragraf 2
export type HubunganIstimewaStatus = "hubungan_istimewa" | "tidak_hubungan_istimewa";

export function getHIStatus(p2: Paragraf2Option): HubunganIstimewaStatus {
  return p2 <= 2 ? "hubungan_istimewa" : "tidak_hubungan_istimewa";
}

// Paragraph option labels for selector dropdowns
export const PARAGRAF1_OPTIONS: Record<Paragraf1Option, string> = {
  1: "DSP4 + ND Permintaan Bantuan Penilaian",
  2: "Hanya ND Permintaan Bantuan Penilaian",
};

export const PARAGRAF2_OPTIONS: Record<Paragraf2Option, string> = {
  1: "AHU + Jumlah Lembar Saham + Hubungan Istimewa",
  2: "Persentase Saham + Hubungan Istimewa",
  3: "AHU + Jumlah Lembar Saham + Tidak Hubungan Istimewa",
  4: "Persentase Saham + Tidak Hubungan Istimewa",
};

export const PARAGRAF4_OPTIONS: Record<Paragraf4Option, string> = {
  1: "AHU + Jumlah Lembar Saham + Hubungan Istimewa",
  2: "Persentase Saham + Hubungan Istimewa",
  3: "AHU + Jumlah Lembar Saham + Tidak Hubungan Istimewa",
  4: "Persentase Saham + Tidak Hubungan Istimewa",
};

export const PARAGRAF5_OPTIONS: Record<Paragraf5Option, string> = {
  1: "Hubungan Istimewa (Nilai Wajar)",
  2: "Tidak Hubungan Istimewa (Nilai Sesungguhnya)",
};

export const PARAGRAF6_OPTIONS: Record<Paragraf6Option, string> = {
  1: "Ada Temuan",
  2: "Tidak Ada Temuan",
};

export const PARAGRAF7_OPTIONS_HI: Record<number, string> = {
  1: "Nilai Penilaian > Nilai WP + Sudah Dilaporkan SPT",
  2: "Nilai Penilaian > Nilai WP + Tidak Dilaporkan SPT",
  3: "Nilai Penilaian < Nilai WP",
};

export const PARAGRAF7_OPTIONS_TIDAK_HI: Record<number, string> = {
  4: "Nilai Penilaian > Nilai WP + Sudah Dilaporkan SPT",
  5: "Nilai Penilaian > Nilai WP + Tidak Dilaporkan SPT",
  6: "Nilai Penilaian < Nilai WP",
};
