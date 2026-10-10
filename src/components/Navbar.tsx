import React from 'react';
import {
  Sparkles,
  Bookmark,
  Download,
  Info,
  Sliders,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface NavbarProps {
  wardrobeOpen: boolean;
  onToggleWardrobe: () => void;
  onOpenLookbook: () => void;
  onOpenGuide: () => void;
  onExportImage: () => void;
  isExporting: boolean;
  lookbookCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  wardrobeOpen,
  onToggleWardrobe,
  onOpenLookbook,
  onOpenGuide,
  onExportImage,
  isExporting,
  lookbookCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EF]/90 backdrop-blur-md border-b border-[#E8DFC8] px-4 py-3 sm:px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E88C8C] to-[#C93B3B] flex items-center justify-center text-white shadow-sm ring-2 ring-[#FAF5EF]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Playfair_Display'] text-xl sm:text-2xl font-black text-[#5C2424] tracking-tight">
                Việt Phục Remix
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-[#F5DEB3]/60 text-[#8B4513] rounded-full border border-[#DEB887]">
                Paper Doll
              </span>
            </div>
            <p className="text-xs text-[#7D6B58] hidden md:block">
              Phối cổ phục Việt búp bê giấy • Sáng tạo cùng Gen Z
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Guide Modal Trigger */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#66503B] hover:text-[#2D2A26] bg-[#F3ECE1] hover:bg-[#EAE0D1] rounded-xl transition border border-[#DECDB8] active:scale-95 cursor-pointer"
            title="Hướng dẫn thay ảnh thật"
          >
            <BookOpen className="w-4 h-4 text-[#A8644A]" />
            <span className="hidden sm:inline">Thay ảnh thật</span>
          </button>

          {/* Lookbook Button */}
          <button
            onClick={onOpenLookbook}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#543826] bg-[#F7EFE4] hover:bg-[#EDE1D1] rounded-xl transition border border-[#DBCAB5] active:scale-95 relative cursor-pointer"
            title="Bộ sưu tập đã lưu"
          >
            <Bookmark className="w-4 h-4 text-[#C93B3B]" />
            <span className="hidden sm:inline">Lookbook</span>
            {lookbookCount > 0 && (
              <span className="bg-[#C93B3B] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {lookbookCount}
              </span>
            )}
          </button>

          {/* Export PNG Button */}
          <button
            onClick={onExportImage}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#B22222] to-[#D9534F] hover:from-[#961C1C] hover:to-[#C9302C] rounded-xl shadow-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang xuất...' : 'Xuất ảnh PNG'}</span>
          </button>

          {/* Toggle Wardrobe Button */}
          <button
            onClick={onToggleWardrobe}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition active:scale-95 border cursor-pointer ${
              wardrobeOpen
                ? 'bg-[#5C2424] text-white border-[#5C2424] shadow-xs'
                : 'bg-[#F2E8DC] text-[#4A3222] border-[#DECAB2] hover:bg-[#E7DCCE]'
            }`}
            title={wardrobeOpen ? 'Đóng tủ đồ' : 'Mở tủ đồ'}
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">
              {wardrobeOpen ? 'Đóng tủ đồ' : 'Mở tủ đồ'}
            </span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                wardrobeOpen ? 'rotate-90 sm:rotate-0' : 'rotate-0 sm:rotate-180'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
