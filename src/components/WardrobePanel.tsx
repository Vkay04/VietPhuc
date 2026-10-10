import React, { useState } from 'react';
import {
  CharacterGender,
  OccasionId,
  StyleMode,
  CostumeData,
  CurrentOutfitState,
  ColorPreset,
} from '../types';
import { COLOR_PRESETS } from '../utils/colorHarmony';
import {
  User,
  Calendar,
  Shirt,
  Palette,
  Sparkles,
  Scissors,
  Check,
  ChevronDown,
  X,
  Compass,
  Sliders,
} from 'lucide-react';

interface WardrobePanelProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: CurrentOutfitState;
  costumes: CostumeData[];
  onUpdateOutfit: (updates: Partial<CurrentOutfitState>) => void;
  selectedColorPreset: ColorPreset;
  onSelectColorPreset: (preset: ColorPreset) => void;
}

const OCCASIONS: { id: OccasionId; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả dịp', icon: '✨' },
  { id: 'tot_nghiep', label: 'Lễ tốt nghiệp', icon: '🎓' },
  { id: 'tet', label: 'Tết cổ truyền', icon: '🌸' },
  { id: 'ky_yeu', label: 'Kỷ yếu học sinh/sinh viên', icon: '📸' },
  { id: 'le_hoi', label: 'Lễ hội đình làng', icon: '🏮' },
  { id: 'dam_cuoi', label: 'Đám cưới / Hỷ sự', icon: '💍' },
  { id: 'dao_pho', label: 'Dạo phố / Trà chiều', icon: '🍵' },
];

export const WardrobePanel: React.FC<WardrobePanelProps> = ({
  isOpen,
  onClose,
  outfit,
  costumes,
  onUpdateOutfit,
  selectedColorPreset,
  onSelectColorPreset,
}) => {
  const [activeTab, setActiveTab] = useState<
    'event_character' | 'costume' | 'colors' | 'inner_bottom' | 'accessories'
  >('costume');

  if (!isOpen) return null;

  // Filter costumes by occasion and gender
  const filteredCostumes = costumes.filter((c) => {
    // Gender check
    const matchGender = c.gioi === 'ca_hai' || c.gioi === outfit.gender;
    if (!matchGender) return false;

    // Occasion check
    if (outfit.occasion === 'all') return true;
    const occLabel = OCCASIONS.find((o) => o.id === outfit.occasion)?.label;
    if (!occLabel) return true;
    return c.dip_mac.some((dip) =>
      dip.toLowerCase().includes(occLabel.toLowerCase().slice(0, 5))
    );
  });

  return (
    <div className="w-full lg:w-[460px] h-full flex flex-col bg-[#FDFBF7] border-l border-[#E8DFC8] shadow-2xl z-30 transition-all duration-300">
      {/* Header with Title and Close Drawer Button */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFC8] bg-[#F7EFE4]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C93B3B] text-white flex items-center justify-center font-bold text-sm">
            🪭
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-lg font-bold text-[#422C1D]">
              Tủ Đồ Cổ Phục
            </h2>
            <p className="text-[11px] text-[#7A6451]">
              Chọn & phối phục trang theo phong cách của bạn
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#7A6451] hover:text-[#2D2A26] hover:bg-[#EAE0D1] rounded-xl transition cursor-pointer"
          title="Đóng khay chọn đồ"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs (Big touch friendly buttons) */}
      <div className="grid grid-cols-5 border-b border-[#E8DFC8] bg-[#FAF5EF] text-[11px] font-bold text-[#6D5441]">
        <button
          onClick={() => setActiveTab('event_character')}
          className={`py-2.5 px-1 flex flex-col items-center gap-1 border-b-2 transition cursor-pointer ${
            activeTab === 'event_character'
              ? 'border-[#C93B3B] text-[#C93B3B] bg-white'
              : 'border-transparent hover:bg-[#F2E8DC]'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="truncate">Nhân vật</span>
        </button>

        <button
          onClick={() => setActiveTab('costume')}
          className={`py-2.5 px-1 flex flex-col items-center gap-1 border-b-2 transition cursor-pointer ${
            activeTab === 'costume'
              ? 'border-[#C93B3B] text-[#C93B3B] bg-white'
              : 'border-transparent hover:bg-[#F2E8DC]'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span className="truncate">Trang phục</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`py-2.5 px-1 flex flex-col items-center gap-1 border-b-2 transition cursor-pointer ${
            activeTab === 'colors'
              ? 'border-[#C93B3B] text-[#C93B3B] bg-white'
              : 'border-transparent hover:bg-[#F2E8DC]'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="truncate">Màu sắc</span>
        </button>

        <button
          onClick={() => setActiveTab('inner_bottom')}
          className={`py-2.5 px-1 flex flex-col items-center gap-1 border-b-2 transition cursor-pointer ${
            activeTab === 'inner_bottom'
              ? 'border-[#C93B3B] text-[#C93B3B] bg-white'
              : 'border-transparent hover:bg-[#F2E8DC]'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span className="truncate">Quần & Lót</span>
        </button>

        <button
          onClick={() => setActiveTab('accessories')}
          className={`py-2.5 px-1 flex flex-col items-center gap-1 border-b-2 transition cursor-pointer ${
            activeTab === 'accessories'
              ? 'border-[#C93B3B] text-[#C93B3B] bg-white'
              : 'border-transparent hover:bg-[#F2E8DC]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="truncate">Phụ kiện</span>
        </button>
      </div>

      {/* Tab Contents Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* =========================================================================
            TAB 1: NHÂN VẬT, SỰ KIỆN & PHONG CÁCH
           ========================================================================= */}
        {activeTab === 'event_character' && (
          <div className="space-y-6">
            {/* Choose Gender */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                1. Chọn Nhân vật nền
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    onUpdateOutfit({
                      gender: 'nu',
                      hairId: 'hair_nu_bun',
                      pantsId:
                        outfit.costumeId === 'ao_tu_than'
                          ? 'skirt_black'
                          : 'pants_white',
                    })
                  }
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition cursor-pointer active:scale-95 ${
                    outfit.gender === 'nu'
                      ? 'border-[#E91E63] bg-[#FCE4EC] text-[#AD1457] shadow-xs'
                      : 'border-[#E8DFC8] bg-white text-[#543826] hover:bg-[#FAF5EF]'
                  }`}
                >
                  <span className="text-xl">🌸</span>
                  <span>Nhân vật Nữ</span>
                  {outfit.gender === 'nu' && <Check className="w-4 h-4 ml-1" />}
                </button>

                <button
                  onClick={() =>
                    onUpdateOutfit({
                      gender: 'nam',
                      hairId: 'hair_nam_short',
                      innerId: 'inner_white_collar',
                      pantsId: 'pants_white',
                    })
                  }
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition cursor-pointer active:scale-95 ${
                    outfit.gender === 'nam'
                      ? 'border-[#1976D2] bg-[#E3F2FD] text-[#0D47A1] shadow-xs'
                      : 'border-[#E8DFC8] bg-white text-[#543826] hover:bg-[#FAF5EF]'
                  }`}
                >
                  <span className="text-xl">🎋</span>
                  <span>Nhân vật Nam</span>
                  {outfit.gender === 'nam' && <Check className="w-4 h-4 ml-1" />}
                </button>
              </div>
            </div>

            {/* Choose Style: Traditional vs Gen Z */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                2. Định hình Phong cách
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onUpdateOutfit({ styleMode: 'truyen_thong' })}
                  className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer active:scale-95 ${
                    outfit.styleMode === 'truyen_thong'
                      ? 'border-[#B22222] bg-[#FDF0ED] shadow-xs'
                      : 'border-[#E8DFC8] bg-white hover:bg-[#FAF5EF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#5C2424]">
                      Truyền thống
                    </span>
                    {outfit.styleMode === 'truyen_thong' && (
                      <Check className="w-4 h-4 text-[#B22222]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#7A6451] leading-tight">
                    Chuẩn chỉnh quy thức, trang nghiêm và nguyên bản.
                  </p>
                </button>

                <button
                  onClick={() => onUpdateOutfit({ styleMode: 'cach_tan' })}
                  className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer active:scale-95 ${
                    outfit.styleMode === 'cach_tan'
                      ? 'border-[#0288D1] bg-[#E1F5FE] shadow-xs'
                      : 'border-[#E8DFC8] bg-white hover:bg-[#FAF5EF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#01579B]">
                      Cách tân Gen Z
                    </span>
                    {outfit.styleMode === 'cach_tan' && (
                      <Check className="w-4 h-4 text-[#0288D1]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#546E7A] leading-tight">
                    Phối sneaker, kính râm, túi tote trẻ trung, năng động.
                  </p>
                </button>
              </div>
            </div>

            {/* Choose Occasion */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                3. Dịp / Sự kiện tham gia
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {OCCASIONS.map((occ) => {
                  const isSelected = outfit.occasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      onClick={() => onUpdateOutfit({ occasion: occ.id })}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer text-xs font-semibold ${
                        isSelected
                          ? 'border-[#C93B3B] bg-[#FDF2F0] text-[#B22222] font-bold shadow-xs'
                          : 'border-[#E8DFC8] bg-white text-[#543826] hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <span className="text-base">{occ.icon}</span>
                      <span className="truncate">{occ.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Background */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                4. Phông nền không gian
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: 'bg_paper',
                    name: 'Giấy dó vintage',
                    desc: 'Búp bê giấy',
                  },
                  {
                    id: 'bg_palace',
                    name: 'Cung đình Huế',
                    desc: 'Hoàng thành',
                  },
                  { id: 'bg_lotus', name: 'Đầm sen quê', desc: 'Thanh bình' },
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => onUpdateOutfit({ backgroundId: bg.id })}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer text-xs ${
                      outfit.backgroundId === bg.id
                        ? 'border-[#8D6E63] bg-[#EFEBE9] font-bold text-[#4E342E]'
                        : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="font-bold truncate">{bg.name}</div>
                    <div className="text-[10px] text-[#A1887F]">{bg.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: TRANG PHỤC (ÁO NGOÀI)
           ========================================================================= */}
        {activeTab === 'costume' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#6D5441]">
                Chọn Mẫu Cổ Phục ({filteredCostumes.length} mẫu)
              </label>
              <span className="text-[11px] text-[#9E8B79]">
                Dành cho {outfit.gender === 'nu' ? 'Nữ' : 'Nam'}
              </span>
            </div>

            <div className="space-y-3">
              {filteredCostumes.map((costume) => {
                const isSelected = outfit.costumeId === costume.id;

                return (
                  <button
                    key={costume.id}
                    onClick={() => {
                      // Smart defaults when picking costume
                      const updates: Partial<CurrentOutfitState> = {
                        costumeId: costume.id,
                      };
                      if (costume.id === 'ao_tu_than') {
                        updates.pantsId = 'skirt_black';
                        updates.innerId = 'inner_yem_red';
                      } else if (
                        costume.id === 'ao_tac' ||
                        costume.id === 'ao_ngu_than_tay_chen'
                      ) {
                        updates.innerId = 'inner_white_collar';
                        updates.pantsId = 'pants_white';
                      } else if (costume.id === 'ao_ba_ba') {
                        updates.pantsId =
                          outfit.gender === 'nam'
                            ? 'pants_brown'
                            : 'pants_black';
                      }
                      onUpdateOutfit(updates);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition cursor-pointer relative ${
                      isSelected
                        ? 'border-[#C93B3B] bg-[#FFF8F6] shadow-sm'
                        : 'border-[#E8DFC8] bg-white hover:border-[#D5C2AA] hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h3 className="font-bold text-sm text-[#422C1D]">
                          {costume.ten}
                        </h3>
                        <p className="text-xs text-[#8D6E63] font-medium">
                          {costume.thoi_ky} • {costume.vung_mien}
                        </p>
                      </div>

                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-[#C93B3B] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-[#A89481] border border-[#E0D3C1] px-1.5 py-0.5 rounded-md">
                          Chọn
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#66503B] line-clamp-2 mb-2 leading-relaxed">
                      {costume.y_nghia}
                    </p>

                    {/* Occasions badges */}
                    <div className="flex flex-wrap gap-1">
                      {costume.dip_mac.slice(0, 3).map((dip, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#F2E8DC] text-[#6D5441] px-2 py-0.5 rounded-md font-medium"
                        >
                          {dip}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: MÀU SẮC (BẢNG MÀU TRUYỀN THỐNG & CSS FILTERS)
           ========================================================================= */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2">
                1. Sắc màu Truyền Thống
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = selectedColorPreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onSelectColorPreset(preset)}
                      className={`p-2.5 rounded-2xl border text-center transition cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'border-[#C93B3B] ring-2 ring-[#C93B3B]/30 bg-white shadow-xs'
                          : 'border-[#E8DFC8] bg-white hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-1.5 shadow-inner border border-black/10 flex items-center justify-center text-white"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <div className="font-bold text-[11px] text-[#422C1D] truncate">
                        {preset.name}
                      </div>
                      <div className="text-[9px] text-[#8C6D58] truncate">
                        {preset.traditionalName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom CSS Filter sliders (hue-rotate, saturate, brightness) */}
            <div className="bg-[#FAF5EF] p-4 rounded-2xl border border-[#E8DFC8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#422C1D] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#C93B3B]" />
                  Tinh chỉnh bằng CSS Filter
                </span>
                <button
                  onClick={() =>
                    onUpdateOutfit({
                      customHue: selectedColorPreset.hueRotate,
                      customSaturation: selectedColorPreset.saturate,
                      customBrightness: selectedColorPreset.brightness,
                    })
                  }
                  className="text-[10px] font-bold text-[#8C6D58] hover:text-[#C93B3B] cursor-pointer underline"
                >
                  Mặc định preset
                </button>
              </div>

              {/* Hue Rotate Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#66503B] mb-1">
                  <span>Sắc độ (Hue-Rotate)</span>
                  <span>{outfit.customHue}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={outfit.customHue}
                  onChange={(e) =>
                    onUpdateOutfit({ customHue: parseInt(e.target.value, 10) })
                  }
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 via-blue-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Saturation Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#66503B] mb-1">
                  <span>Độ đậm đà (Saturate)</span>
                  <span>{outfit.customSaturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={outfit.customSaturation}
                  onChange={(e) =>
                    onUpdateOutfit({
                      customSaturation: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C93B3B]"
                />
              </div>

              {/* Brightness Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#66503B] mb-1">
                  <span>Độ sáng (Brightness)</span>
                  <span>{outfit.customBrightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={outfit.customBrightness}
                  onChange={(e) =>
                    onUpdateOutfit({
                      customBrightness: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C93B3B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: QUẦN, ÁO TRONG & KIỂU TÓC
           ========================================================================= */}
        {activeTab === 'inner_bottom' && (
          <div className="space-y-6">
            {/* Pants / Skirts */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                1. Quần / Váy xếp nếp
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'pants_white',
                    name: 'Quần Lụa Trắng',
                    sub: 'Ống rộng thanh tao',
                  },
                  {
                    id: 'pants_black',
                    name: 'Quần Lụa Đen',
                    sub: 'Xuyến đen truyền thống',
                  },
                  {
                    id: 'skirt_black',
                    name: 'Váy Đụp Đen',
                    sub: 'Kinh Bắc (Áo tứ thân)',
                  },
                  {
                    id: 'pants_brown',
                    name: 'Quần Nâu Gụ',
                    sub: 'Vải ú (Áo bà ba)',
                  },
                ].map((item) => {
                  const isSelected = outfit.pantsId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onUpdateOutfit({ pantsId: item.id })}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-[#C93B3B] bg-[#FFF8F6] font-bold text-[#422C1D]'
                          : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <div className="text-xs truncate">{item.name}</div>
                      <div className="text-[10px] text-[#9E8B79]">{item.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inner Bodice / Shirt */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                2. Áo trong / Yếm đào
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'inner_yem_red',
                    name: 'Yếm Đào Thắm',
                    sub: 'Thêu sen (Tứ thân)',
                  },
                  {
                    id: 'inner_yem_cream',
                    name: 'Yếm Trắng Ngà',
                    sub: 'Thanh khiết',
                  },
                  {
                    id: 'inner_white_collar',
                    name: 'Áo Lót Cổ Đứng',
                    sub: 'Nội phục ngũ thân',
                  },
                  { id: 'none', name: 'Không dùng', sub: 'Mặc định' },
                ].map((item) => {
                  const isSelected = outfit.innerId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onUpdateOutfit({ innerId: item.id })}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'border-[#C93B3B] bg-[#FFF8F6] font-bold text-[#422C1D]'
                          : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <div className="text-xs truncate">{item.name}</div>
                      <div className="text-[10px] text-[#9E8B79]">{item.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hairstyles */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6D5441] mb-2.5">
                3. Kiểu tóc Anime
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {outfit.gender === 'nu'
                  ? [
                      {
                        id: 'hair_nu_bun',
                        name: 'Búi bánh dày',
                        sub: 'Cài trâm hoa',
                      },
                      {
                        id: 'hair_nu_long',
                        name: 'Tóc dài suôn mượt',
                        sub: 'Duyên dáng xõa vai',
                      },
                    ].map((hair) => (
                      <button
                        key={hair.id}
                        onClick={() => onUpdateOutfit({ hairId: hair.id })}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          outfit.hairId === hair.id
                            ? 'border-[#C93B3B] bg-[#FFF8F6] font-bold text-[#422C1D]'
                            : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                        }`}
                      >
                        <div className="text-xs">{hair.name}</div>
                        <div className="text-[10px] text-[#9E8B79]">
                          {hair.sub}
                        </div>
                      </button>
                    ))
                  : [
                      {
                        id: 'hair_nam_short',
                        name: 'Tóc ngắn tỉa gọn',
                        sub: 'Thanh lịch hiện đại',
                      },
                      {
                        id: 'hair_nam_topknot',
                        name: 'Bới củ tỏi',
                        sub: 'Nho sinh cổ truyền',
                      },
                    ].map((hair) => (
                      <button
                        key={hair.id}
                        onClick={() => onUpdateOutfit({ hairId: hair.id })}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          outfit.hairId === hair.id
                            ? 'border-[#C93B3B] bg-[#FFF8F6] font-bold text-[#422C1D]'
                            : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                        }`}
                      >
                        <div className="text-xs">{hair.name}</div>
                        <div className="text-[10px] text-[#9E8B79]">
                          {hair.sub}
                        </div>
                      </button>
                    ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: PHỤ KIỆN TRUYỀN THỐNG & GEN Z
           ========================================================================= */}
        {activeTab === 'accessories' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#6D5441]">
                  Phụ Kiện Cổ Truyền
                </label>
                <span className="text-[11px] text-[#A1887F]">Bấm để chọn/bỏ</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'acc_khan_dong',
                    name: 'Khăn Đóng / Xếp',
                    icon: '👑',
                    sub: 'Ngũ thân, Áo tấc',
                  },
                  {
                    id: 'acc_non_quai_thao',
                    name: 'Nón Quai Thao',
                    icon: '👒',
                    sub: 'Liền chị Kinh Bắc',
                  },
                  {
                    id: 'acc_non_la',
                    name: 'Nón Lá Bài Thơ',
                    icon: '🌾',
                    sub: 'Áo dài, Áo bà ba',
                  },
                  {
                    id: 'acc_khan_ran',
                    name: 'Khăn Rằn Nam Bộ',
                    icon: '🧣',
                    sub: 'Miệt vườn sông nước',
                  },
                  {
                    id: 'acc_khan_mo_qua',
                    name: 'Khăn Mỏ Quạ',
                    icon: '🦅',
                    sub: 'Kinh Bắc truyền thống',
                  },
                  {
                    id: 'acc_kieng_bac',
                    name: 'Kiềng Bạc Hoa Mai',
                    icon: '✨',
                    sub: 'Trang sức cổ đeo cổ',
                  },
                  {
                    id: 'acc_quat_giay',
                    name: 'Quạt Trầm Hương',
                    icon: '🪭',
                    sub: 'Cầm tay tao nhã',
                  },
                ].map((item) => {
                  const isChecked = outfit.selectedAccessories.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const next = isChecked
                          ? outfit.selectedAccessories.filter((x) => x !== item.id)
                          : [...outfit.selectedAccessories, item.id];
                        onUpdateOutfit({ selectedAccessories: next });
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition cursor-pointer active:scale-95 ${
                        isChecked
                          ? 'border-[#C93B3B] bg-[#FFF8F6] text-[#422C1D] shadow-xs'
                          : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs truncate flex items-center justify-between">
                          <span>{item.name}</span>
                          {isChecked && (
                            <Check className="w-3.5 h-3.5 text-[#C93B3B]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#9E8B79] truncate">
                          {item.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gen Z Modern Accessories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#0277BD]">
                  Phụ Kiện Cách Tân Gen Z
                </label>
                <span className="text-[10px] bg-[#E1F5FE] text-[#0288D1] px-2 py-0.5 rounded-full font-bold">
                  Streetwear
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'acc_sneaker',
                    name: 'Sneaker',
                    icon: '👟',
                    desc: 'Thể thao trắng',
                  },
                  {
                    id: 'acc_kinh_ram',
                    name: 'Kính Râm',
                    icon: '🕶️',
                    desc: 'Cool ngầu',
                  },
                  {
                    id: 'acc_tui_tote',
                    name: 'Túi Tote',
                    icon: '👜',
                    desc: 'Canvas trẻ trung',
                  },
                ].map((item) => {
                  const isChecked = outfit.selectedAccessories.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const next = isChecked
                          ? outfit.selectedAccessories.filter((x) => x !== item.id)
                          : [...outfit.selectedAccessories, item.id];
                        onUpdateOutfit({ selectedAccessories: next });
                      }}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer active:scale-95 ${
                        isChecked
                          ? 'border-[#0288D1] bg-[#E1F5FE] text-[#01579B] font-bold shadow-xs'
                          : 'border-[#E8DFC8] bg-white text-[#6D5441] hover:bg-[#FAF5EF]'
                      }`}
                    >
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-xs font-bold truncate">{item.name}</div>
                      <div className="text-[9px] text-[#78909C]">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info inside Drawer */}
      <div className="p-3 bg-[#FAF5EF] border-t border-[#E8DFC8] text-center text-[10px] text-[#A89481]">
        Gợi ý: Nhấn "Đóng tủ đồ" để xem toàn cảnh búp bê giấy kích thước lớn.
      </div>
    </div>
  );
};
