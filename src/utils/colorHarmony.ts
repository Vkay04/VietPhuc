import { ColorHarmonyScore, CurrentOutfitState, ColorPreset } from '../types';

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'do_chu_sa',
    name: 'Đỏ Chu Sa (Yên Chi)',
    hex: '#D32F2F',
    traditionalName: 'Sắc Hỷ Khí & Cung Đình',
    hueRotate: 0,
    saturate: 100,
    brightness: 100,
  },
  {
    id: 'xanh_ngoc_bich',
    name: 'Xanh Ngọc Bích',
    hex: '#2E7D32',
    traditionalName: 'Sắc Thanh Trúc Quân Tử',
    hueRotate: 120,
    saturate: 110,
    brightness: 100,
  },
  {
    id: 'lam_cham',
    name: 'Lam Chàm Cổ Kính',
    hex: '#1565C0',
    traditionalName: 'Sắc Thâm Trầm Nho Sĩ',
    hueRotate: 215,
    saturate: 115,
    brightness: 95,
  },
  {
    id: 'tim_hue',
    name: 'Tím Hoa Cà Cố Đô',
    hex: '#7B1FA2',
    traditionalName: 'Sắc Mộng Mơ Xứ Huế',
    hueRotate: 275,
    saturate: 110,
    brightness: 95,
  },
  {
    id: 'vang_hoang_yen',
    name: 'Vàng Hoàng Yến',
    hex: '#FBC02D',
    traditionalName: 'Sắc Phú Quý Hoàng Triều',
    hueRotate: 50,
    saturate: 130,
    brightness: 125,
  },
  {
    id: 'hong_canh_sen',
    name: 'Hồng Cánh Sen',
    hex: '#EC407A',
    traditionalName: 'Sắc Duyên Dáng Đồng Quê',
    hueRotate: 330,
    saturate: 110,
    brightness: 105,
  },
  {
    id: 'nau_gụ',
    name: 'Nâu Sồng Đồng Bằng',
    hex: '#5D4037',
    traditionalName: 'Sắc Mộc Mạc Lúa Nước',
    hueRotate: 20,
    saturate: 40,
    brightness: 65,
  },
  {
    id: 'trang_tuyet',
    name: 'Trắng Ngà / Thanh Khiết',
    hex: '#F5F5F5',
    traditionalName: 'Sắc Tinh Khôi Nữ Sinh',
    hueRotate: 0,
    saturate: 10,
    brightness: 180,
  },
  {
    id: 'den_tuyen',
    name: 'Đen Tuyền Cẩm Nhung',
    hex: '#212121',
    traditionalName: 'Sắc Trang Trọng Trầm Mặc',
    hueRotate: 0,
    saturate: 0,
    brightness: 35,
  },
];

export function calculateColorHarmony(
  outfit: CurrentOutfitState,
  preset: ColorPreset
): ColorHarmonyScore {
  const costumeId = outfit.costumeId;
  const pantsId = outfit.pantsId;
  const innerId = outfit.innerId;

  // Evaluation criteria
  let score = 4;
  let paletteType: ColorHarmonyScore['paletteType'] = 'Harmonious';
  let ratingLabel = 'Hài hòa tao nhã';
  let advice =
    'Cách phối màu tương đối dễ chịu, tôn lên nét duyên dáng của trang phục.';

  const colorsUsed: { label: string; hex: string }[] = [
    { label: `Áo ngoài (${preset.name})`, hex: preset.hex },
  ];

  // Pants color
  if (pantsId === 'pants_white') {
    colorsUsed.push({ label: 'Quần lụa trắng', hex: '#FFFFFF' });
  } else if (pantsId === 'pants_black' || pantsId === 'skirt_black') {
    colorsUsed.push({ label: 'Quần/Váy lụa đen', hex: '#1C1A19' });
  } else if (pantsId === 'pants_brown') {
    colorsUsed.push({ label: 'Quần nâu gụ', hex: '#4E3629' });
  }

  // Inner color
  if (innerId === 'inner_yem_red') {
    colorsUsed.push({ label: 'Yếm đỏ chu sa', hex: '#D32F2F' });
  } else if (innerId === 'inner_yem_cream') {
    colorsUsed.push({ label: 'Yếm trắng ngà', hex: '#FDFBF7' });
  } else if (innerId === 'inner_white_collar') {
    colorsUsed.push({ label: 'Áo lót cổ đứng trắng', hex: '#FFFFFF' });
  }

  // Special cultural harmony rules
  // 1. Áo Dài trắng + Quần trắng hoặc đen = 5/5 kinh điển
  if (
    costumeId === 'ao_dai_tan_thoi_hoc_sinh' &&
    preset.id === 'trang_tuyet' &&
    (pantsId === 'pants_white' || pantsId === 'pants_black')
  ) {
    score = 5;
    paletteType = 'Monochromatic';
    ratingLabel = 'Kinh điển thuần khiết';
    advice =
      'Sắc trắng ngà phối quần lụa là biểu tượng vượt thời gian của nữ sinh Việt Nam, đạt điểm tối đa!';
    return { score, ratingLabel, paletteType, advice, colorsUsed };
  }

  // 2. Áo Tứ Thân nâu gụ + Váy đen + Yếm đỏ = Ngũ sắc Kinh Bắc 5/5
  if (
    costumeId === 'ao_tu_than' &&
    (preset.id === 'nau_gụ' || preset.id === 'do_chu_sa') &&
    pantsId === 'skirt_black' &&
    innerId === 'inner_yem_red'
  ) {
    score = 5;
    paletteType = 'Traditional Nuanced';
    ratingLabel = 'Đậm chất Kinh Bắc';
    advice =
      'Sự hòa quyện giữa sắc nâu mộc mạc bên ngoài và yếm thắm bên trong cùng dải thắt lưng xanh nõn chuối tạo nên nét duyên Quan họ tuyệt đỉnh!';
    return { score, ratingLabel, paletteType, advice, colorsUsed };
  }

  // 3. Áo Tấc đỏ chu sa hoặc vàng hoàng yến + Quần trắng + Khăn đóng
  if (
    (costumeId === 'ao_tac' || costumeId === 'ao_ngu_than_tay_chen') &&
    (preset.id === 'do_chu_sa' ||
      preset.id === 'vang_hoang_yen' ||
      preset.id === 'lam_cham') &&
    pantsId === 'pants_white'
  ) {
    score = 5;
    paletteType = 'Harmonious';
    ratingLabel = 'Cung đình trang nhã';
    advice =
      'Tà áo ngũ thân rực rỡ nổi bật trên nền quần lụa trắng tạo nên phong thái đài các, tôn nghiêm đúng chuẩn lễ phục triều đình.';
    return { score, ratingLabel, paletteType, advice, colorsUsed };
  }

  // 4. Áo Bà Ba hồng sen + Quần lụa đen
  if (
    costumeId === 'ao_ba_ba' &&
    (preset.id === 'hong_canh_sen' || preset.id === 'nau_gụ') &&
    (pantsId === 'pants_black' || pantsId === 'pants_brown')
  ) {
    score = 5;
    paletteType = 'Harmonious';
    ratingLabel = 'Ngọt ngào Miệt Vườn';
    advice =
      'Màu áo tươi tắn phối cùng quần lụa đen/nâu bóng mộc mạc tái hiện trọn vẹn nét thanh tao phóng khoáng của cô gái sông nước phương Nam.';
    return { score, ratingLabel, paletteType, advice, colorsUsed };
  }

  // 5. Gen Z bold colors
  if (outfit.styleMode === 'cach_tan') {
    if (preset.id === 'vang_hoang_yen' || preset.id === 'hong_canh_sen') {
      score = 4.5;
      paletteType = 'Bold Modern';
      ratingLabel = 'Thời thượng phá cách';
      advice =
        'Tông màu rực rỡ mang hơi thở Gen Z tươi vui, rất hợp để chụp kỷ yếu và dạo phố mùa xuân!';
      return { score, ratingLabel, paletteType, advice, colorsUsed };
    }
  }

  // Default good score
  return {
    score,
    ratingLabel,
    paletteType,
    advice,
    colorsUsed,
  };
}
