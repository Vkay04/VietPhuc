import React from 'react';
import { CulturalWarning } from '../types';
import { AlertTriangle, Lightbulb, Info, Check, X } from 'lucide-react';

interface CulturalWarningModalProps {
  warnings: CulturalWarning[];
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalWarningModal: React.FC<CulturalWarningModalProps> = ({
  warnings,
  isOpen,
  onClose,
}) => {
  if (!isOpen || warnings.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#FFEE58] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FFF9C4] to-[#FFF176] border-b border-[#FFEE58]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F57F17] text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#E65100]">
                Cảnh Báo Phối Đồ Văn Hóa
              </h3>
              <p className="text-xs text-[#BF360C]">
                Phát hiện {warnings.length} lưu ý cần tinh chỉnh để đúng quy thức
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E65100] hover:bg-[#FFF59D] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warnings List */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {warnings.map((warn) => (
            <div
              key={warn.id}
              className="p-4 rounded-2xl bg-[#FFFDE7] border border-[#FFF59D] space-y-2.5"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <h4 className="font-bold text-sm text-[#E65100]">
                    {warn.title}
                  </h4>
                  <p className="text-xs text-[#5D4037] font-medium leading-relaxed mt-0.5">
                    {warn.message}
                  </p>
                </div>
              </div>

              {/* Rationale / Giải thích văn hóa */}
              <div className="text-xs text-[#6D4C41] bg-white/70 p-3 rounded-xl border border-[#FFF9C4] leading-relaxed">
                <span className="font-bold text-[#E65100]">Giải thích di sản: </span>
                {warn.reason}
              </div>

              {/* Suggestion / Gợi ý thay thế */}
              <div className="flex items-start gap-2 text-xs text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-xl border border-[#C8E6C9] font-medium">
                <Lightbulb className="w-4 h-4 shrink-0 text-[#2E7D32] mt-0.5" />
                <div>
                  <span className="font-bold">Gợi ý sửa đổi: </span>
                  {warn.suggestion}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF5EF] border-t border-[#E8DFC8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#E65100] hover:bg-[#BF360C] text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            Đã hiểu & Tiếp tục phối
          </button>
        </div>
      </div>
    </div>
  );
};
