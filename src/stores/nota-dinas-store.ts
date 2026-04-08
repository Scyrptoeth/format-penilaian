import { create } from "zustand";
import type {
  ParagraphSelections,
  SharedFields,
  UniqueFields,
  SharedFieldKey,
  UniqueFieldKey,
  Paragraf2Option,
  Paragraf7Option,
} from "@/types/nota-dinas";
import { getHIStatus } from "@/types/nota-dinas";

interface NotaDinasState {
  selections: ParagraphSelections;
  sharedFields: SharedFields;
  uniqueFields: UniqueFields;

  // Actions
  setSelection: <K extends keyof ParagraphSelections>(
    key: K,
    value: ParagraphSelections[K]
  ) => void;
  setSharedField: (key: SharedFieldKey, value: string) => void;
  setUniqueField: (key: UniqueFieldKey, value: string) => void;
  resetAll: () => void;
}

const initialSelections: ParagraphSelections = {
  paragraf1: 1,
  paragraf2: 1,
  paragraf4: 1,
  paragraf5: 1,
  paragraf6: 1,
  paragraf7: 1,
};

const initialSharedFields: SharedFields = {
  nama_wp: "",
  nama_perusahaan: "",
  nama_pihak_lawan: "",
  jumlah_lembar_saham: "",
  persentase_kepemilikan: "",
  halaman_parameter: "",
};

const initialUniqueFields: UniqueFields = {
  nama_kpp: "",
  nomor_nd: "",
  tanggal_nd: "",
  perihal_nd: "",
  nama_kanwil_uppn: "",
  nomor_ahu: "",
  tanggal_ahu: "",
  nama_kanwil_penilai: "",
  nomor_prin: "",
  tanggal_prin: "",
  npwp_wp: "",
  npwp_perusahaan: "",
  persentase_setara_kepemilikan: "",
  tanggal_penilaian: "",
  pendekatan_penilaian: "",
  metode_penilaian: "",
  halaman_metode: "",
  dlom_value: "",
  dloc_value: "",
  temuan_administrasi: "",
  halaman_simpulan: "",
  pasal_pph: "",
  nilai_buku: "",
  nilai_wajar: "",
  koreksi: "",
  pkp: "",
  pph_terutang: "",
  potensi_pajak: "",
};

// Cascade logic: when P2 changes, auto-set P4, P5, and constrain P7
function applyCascade(
  p2: Paragraf2Option,
  currentP7: Paragraf7Option
): Pick<ParagraphSelections, "paragraf4" | "paragraf5" | "paragraf7"> {
  const hiStatus = getHIStatus(p2);

  // P2 → P4 mirror
  const paragraf4 = p2;

  // P2 → P5 auto-set
  const paragraf5 = hiStatus === "hubungan_istimewa" ? 1 : 2;

  // P2 → P7 filter: HI → [1,2,3], Tidak HI → [4,5,6]
  let paragraf7 = currentP7;
  if (hiStatus === "hubungan_istimewa" && currentP7 > 3) {
    paragraf7 = 1;
  } else if (hiStatus === "tidak_hubungan_istimewa" && currentP7 < 4) {
    paragraf7 = 4;
  }

  return {
    paragraf4: paragraf4 as ParagraphSelections["paragraf4"],
    paragraf5: paragraf5 as ParagraphSelections["paragraf5"],
    paragraf7: paragraf7 as ParagraphSelections["paragraf7"],
  };
}

export const useNotaDinasStore = create<NotaDinasState>((set) => ({
  selections: initialSelections,
  sharedFields: initialSharedFields,
  uniqueFields: initialUniqueFields,

  setSelection: (key, value) =>
    set((state) => {
      const newSelections = { ...state.selections, [key]: value };

      // Apply cascade when P2 changes
      if (key === "paragraf2") {
        const cascaded = applyCascade(
          value as Paragraf2Option,
          state.selections.paragraf7
        );
        Object.assign(newSelections, cascaded);
      }

      return { selections: newSelections };
    }),

  setSharedField: (key, value) =>
    set((state) => ({
      sharedFields: { ...state.sharedFields, [key]: value },
    })),

  setUniqueField: (key, value) =>
    set((state) => ({
      uniqueFields: { ...state.uniqueFields, [key]: value },
    })),

  resetAll: () =>
    set({
      selections: initialSelections,
      sharedFields: initialSharedFields,
      uniqueFields: initialUniqueFields,
    }),
}));
