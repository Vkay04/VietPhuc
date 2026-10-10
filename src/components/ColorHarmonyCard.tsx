import React from 'react';
import { ColorHarmonyScore } from '../types';
import { Star, Palette, Sparkles } from 'lucide-react';

interface ColorHarmonyCardProps {
  harmony: ColorHarmonyScore;
}

export const ColorHarmonyCard: React.FC<ColorHarmonyCardProps> = ({ harmony }) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#C93B3B]" />
          <h4 className="font-['Playfair_Display'] font-bold text-sm sm:text-base text-[#422C1D]">
            Đánh Giá Hài Hòa Màu
          </h4>
        </div>

        {/* 5-Star Rating Visual */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(harmony.score)
                  ? 'fill-[#FFB300] text-[#FFB300]'
                  : 'text-[#E0D3C1]'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-[#E65100] ml-1">
            {harmony.score}/5
          </span>
        </div>
      </div>

      {/* Palette Category Pill & Color Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FAF5EF] p-2.5 rounded-2xl border border-[#F0E6D8]">
        <span className="text-[11px] font-bold text-[#6D5441]">
          {harmony.ratingLabel} ({harmony.paletteType})
        </span>

        {/* Color Chips */}
        <div className="flex items-center gap-1.5">
          {harmony.colorsUsed.map((color, idx) => (
            <div
              key={idx}
              className="w-5 h-5 rounded-full border border-black/15 shadow-inner cursor-pointer"
              style={{ backgroundColor: color.hex }}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Advice note */}
      <p className="text-xs text-[#5D4037] leading-relaxed">
        {harmony.advice}
      </p>
    </div>
  );
};
