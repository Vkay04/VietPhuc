import React from 'react';
import { CostumeData } from '../types';
import { BookOpen, ShieldCheck, AlertCircle, Bookmark, Compass } from 'lucide-react';

interface CulturalCardProps {
  costume: CostumeData;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({ costume }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-4">
      {/* Title & Verification Status Header */}
      <div className="flex items-start justify-between gap-3 border-b border-[#F0E6D8] pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B22222]">
            Nguồn gốc & Ý nghĩa
          </span>
          <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#422C1D]">
            {costume.ten}
          </h3>
          <p className="text-xs text-[#7A6451] flex items-center gap-1.5 mt-0.5">
            <Compass className="w-3.5 h-3.5 text-[#C93B3B]" />
            <span>{costume.thoi_ky}</span> • <span>{costume.vung_mien}</span>
          </p>
        </div>

        {/* Verification Status Badge */}
        {costume.can_xac_minh ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#FFF9C4] text-[#F57F17] border border-[#FFEE58] shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Cần xác minh thêm</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Đã xác minh lịch sử</span>
          </span>
        )}
      </div>

      {/* Origin / Nguồn gốc */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8D6E63] mb-1">
          Nguồn gốc lịch sử
        </h4>
        <p className="text-xs text-[#4E342E] leading-relaxed text-justify">
          {costume.nguon_goc}
        </p>
      </div>

      {/* Philosophical Meaning / Ý nghĩa */}
      <div className="bg-[#FAF5EF] p-3.5 rounded-2xl border border-[#EFE5D8]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#A85836] mb-1 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-[#C93B3B]" />
          Triết lý & Giá trị văn hóa
        </h4>
        <p className="text-xs text-[#422C1D] leading-relaxed">
          {costume.y_nghia}
        </p>
      </div>

      {/* References / Nguồn tham khảo */}
      {costume.nguon_tham_khao && costume.nguon_tham_khao.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8D6E63] mb-1.5 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#8D6E63]" />
            Nguồn tài liệu tham khảo:
          </h4>
          <ul className="space-y-1">
            {costume.nguon_tham_khao.map((src, idx) => (
              <li
                key={idx}
                className="text-[11px] text-[#6D5441] pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#C93B3B]"
              >
                {src}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Disclaimer Footnote */}
      <div className="pt-2 border-t border-[#F0E6D8] text-[10px] text-[#A89481] italic leading-tight text-center">
        * Nội dung văn hóa dựa trên nguồn tham khảo, mục đánh dấu cần xác minh có thể chưa đầy đủ.
      </div>
    </div>
  );
};
