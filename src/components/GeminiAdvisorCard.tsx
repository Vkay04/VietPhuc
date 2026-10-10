import React, { useState, useEffect } from 'react';
import {
  CurrentOutfitState,
  ColorPreset,
  CulturalWarning,
  GeminiAdvisorResponse,
} from '../types';
import { Sparkles, RefreshCw, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

interface GeminiAdvisorCardProps {
  outfit: CurrentOutfitState;
  preset: ColorPreset;
  warnings: CulturalWarning[];
}

export const GeminiAdvisorCard: React.FC<GeminiAdvisorCardProps> = ({
  outfit,
  preset,
  warnings,
}) => {
  const [adviceData, setAdviceData] = useState<GeminiAdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAdvice = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender: outfit.gender,
          costumeId: outfit.costumeId,
          occasion: outfit.occasion,
          styleMode: outfit.styleMode,
          accessories: outfit.selectedAccessories,
          colorPreset: preset.name,
          detectedWarnings: warnings,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: GeminiAdvisorResponse = await response.json();
      setAdviceData(data);
    } catch (err) {
      console.warn('Gemini Advisor fallback activated:', err);
      // Fallback
      setAdviceData({
        goi_y:
          'Set đồ này trông rất thu hút! Bạn có thể chọn thêm một chiếc quạt giấy hoặc khăn xếp để hoàn thiện phong thái thanh tao.',
        giai_thich:
          'Cổ phục Việt Nam đề cao sự kín đáo, nhã nhặn và cân bằng âm dương trong ngũ sắc.',
        nguon: ['Dữ liệu cổ phục Việt Phục Remix'],
        muc_do_chac_chan: 'trung_binh',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch advice when costume or styleMode or occasion changes
  useEffect(() => {
    fetchAdvice();
  }, [outfit.costumeId, outfit.styleMode, outfit.occasion]);

  return (
    <div className="bg-gradient-to-br from-[#FFF8F6] to-[#FFF1EE] rounded-3xl p-5 sm:p-6 border border-[#F2D7D0] shadow-sm space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E88C8C] to-[#C93B3B] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] font-bold text-base sm:text-lg text-[#5C2424]">
              Stylist AI Gen Z
            </h3>
            <p className="text-[11px] text-[#8C6D58]">
              Gợi ý phối đồ trẻ trung & chuẩn di sản
            </p>
          </div>
        </div>

        <button
          onClick={fetchAdvice}
          disabled={isLoading}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#8C4A4A] hover:text-[#5C2424] bg-white/80 hover:bg-white rounded-xl border border-[#EAC8C1] shadow-2xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
          title="Tạo lại gợi ý"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Hỏi Stylist</span>
        </button>
      </div>

      {/* Content Area with Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-2.5 animate-pulse py-2">
          <div className="h-4 bg-[#EAD4CE]/60 rounded-md w-full"></div>
          <div className="h-4 bg-[#EAD4CE]/60 rounded-md w-5/6"></div>
          <div className="h-3 bg-[#EAD4CE]/40 rounded-md w-2/3"></div>
        </div>
      ) : adviceData ? (
        <div className="space-y-3">
          {/* Main Youthful Advice */}
          <div className="p-3.5 bg-white/90 rounded-2xl border border-[#F5DDD7] shadow-2xs">
            <p className="text-xs sm:text-sm text-[#422C1D] leading-relaxed font-medium">
              "{adviceData.goi_y}"
            </p>
          </div>

          {/* Cultural Rationale */}
          <div className="text-xs text-[#6D5441] leading-relaxed bg-[#FAF4EF] p-3 rounded-xl border border-[#ECE0D3]">
            <span className="font-bold text-[#A85836]">Góc nhìn văn hóa: </span>
            {adviceData.giai_thich}
          </div>

          {/* Confidence Badge & Verified Sources */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#F2D7D0] text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#8C6D58]">Độ chắc chắn:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  adviceData.muc_do_chac_chan === 'cao'
                    ? 'bg-[#E8F5E9] text-[#2E7D32]'
                    : adviceData.muc_do_chac_chan === 'trung_binh'
                    ? 'bg-[#FFF9C4] text-[#F57F17]'
                    : 'bg-[#FFEBEE] text-[#C62828]'
                }`}
              >
                {adviceData.muc_do_chac_chan === 'cao'
                  ? 'Cao (Chuẩn tư liệu)'
                  : adviceData.muc_do_chac_chan === 'trung_binh'
                  ? 'Trung bình'
                  : 'Thấp'}
              </span>
            </div>

            {adviceData.nguon && adviceData.nguon.length > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-[#A17C6B]">
                <BookOpen className="w-3 h-3" />
                <span className="truncate max-w-[200px]">
                  {adviceData.nguon[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
