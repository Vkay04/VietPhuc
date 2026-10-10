export type CharacterGender = 'nu' | 'nam';

export type OccasionId =
  | 'all'
  | 'tot_nghiep'
  | 'tet'
  | 'ky_yeu'
  | 'le_hoi'
  | 'dam_cuoi'
  | 'dao_pho';

export interface OccasionInfo {
  id: OccasionId;
  label: string;
  iconName: string;
  description: string;
}

export type StyleMode = 'truyen_thong' | 'cach_tan';

export interface CostumeData {
  id: string;
  ten: string;
  gioi: 'nam' | 'nu' | 'ca_hai';
  vung_mien: string;
  thoi_ky: string;
  dip_mac: string[];
  nguon_goc: string;
  y_nghia: string;
  mau_hop: string[];
  phu_kien_hop: string[];
  loi_phoi_can_tranh: string[];
  nguon_tham_khao: string[];
  can_xac_minh: boolean;
}

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  traditionalName: string;
  hueRotate: number; // degrees for CSS filter
  saturate: number; // percentage
  brightness: number; // percentage
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'headwear' | 'neck' | 'hand' | 'modern' | 'feet';
  compatibleWith: string[]; // costume IDs or 'all'
  gender: 'nam' | 'nu' | 'ca_hai';
  style: 'truyen_thong' | 'cach_tan' | 'ca_hai';
  description: string;
}

export interface CurrentOutfitState {
  gender: CharacterGender;
  costumeId: string;
  styleMode: StyleMode;
  occasion: OccasionId;
  hairId: string;
  pantsId: string;
  innerId: string;
  selectedAccessories: string[];
  backgroundId: string;
  colorPresetId: string;
  customHue: number;
  customSaturation: number;
  customBrightness: number;
}

export interface CulturalWarning {
  id: string;
  level: 'warning' | 'info';
  title: string;
  message: string;
  reason: string;
  suggestion: string;
  matchedRule: string;
}

export interface ColorHarmonyScore {
  score: number; // 1 to 5
  ratingLabel: string;
  paletteType: 'Monochromatic' | 'Harmonious' | 'Complementary' | 'Traditional Nuanced' | 'Bold Modern';
  advice: string;
  colorsUsed: { label: string; hex: string }[];
}

export interface GeminiAdvisorResponse {
  goi_y: string;
  giai_thich: string;
  nguon: string[];
  muc_do_chac_chan: 'cao' | 'trung_binh' | 'thap';
}

export interface LookbookEntry {
  id: string;
  title: string;
  createdAt: string;
  outfitState: CurrentOutfitState;
  thumbnailDataUrl?: string;
  harmonyScore: number;
  costumeName: string;
}
