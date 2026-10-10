import React, { useState } from 'react';
import {
  CurrentOutfitState,
  ColorPreset,
  CostumeData,
  CulturalWarning,
} from '../types';
import { getLayersForOutfit } from '../utils/imageExporter';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Sparkles,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface PaperDollCanvasProps {
  outfit: CurrentOutfitState;
  preset: ColorPreset;
  currentCostume?: CostumeData;
  warnings: CulturalWarning[];
  onResetOutfit: () => void;
  onOpenWarnings: () => void;
}

export const PaperDollCanvas: React.FC<PaperDollCanvasProps> = ({
  outfit,
  preset,
  currentCostume,
  warnings,
  onResetOutfit,
  onOpenWarnings,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showLayerList, setShowLayerList] = useState<boolean>(false);
  const [hiddenLayerIds, setHiddenLayerIds] = useState<string[]>([]);

  const layers = getLayersForOutfit(outfit, preset);

  const toggleLayerVisibility = (id: string) => {
    setHiddenLayerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.4));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Top Floating Badge Bar */}
      <div className="w-full max-w-[620px] flex items-center justify-between gap-2 mb-2 px-1">
        {/* Costume & Style Pill */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-xs border border-[#E8DFC8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C93B3B]" />
            <span className="text-xs font-bold text-[#422C1D] truncate">
              {currentCostume?.ten || 'Trang phục'}
            </span>
          </div>

          <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
              outfit.styleMode === 'cach_tan'
                ? 'bg-[#E1F5FE] text-[#0277BD] border-[#81D4FA]'
                : 'bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]'
            }`}
          >
            {outfit.styleMode === 'cach_tan' ? 'Cách tân Gen Z' : 'Truyền thống'}
          </span>
        </div>

        {/* Warning Indicator Pill if warnings detected */}
        {warnings.length > 0 && (
          <button
            onClick={onOpenWarnings}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF9C4] hover:bg-[#FFF59D] text-[#F57F17] rounded-full text-xs font-bold border border-[#FFEE58] shadow-xs animate-bounce cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{warnings.length} Lưu ý văn hóa</span>
          </button>
        )}
      </div>

      {/* CANVAS MANNEQUIN CONTAINER (1000:1500 Aspect Ratio) */}
      <div className="relative w-full max-w-[560px] max-h-[82vh] aspect-[2/3] bg-[#FDFBF7] rounded-3xl shadow-xl overflow-hidden border-4 border-[#F3ECE1] ring-1 ring-[#DECDB8] flex items-center justify-center transition-transform duration-200">
        <div
          className="relative w-full h-full transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* RENDER ALL STACKED LAYERS */}
          {layers.map((layer) => {
            if (hiddenLayerIds.includes(layer.id)) return null;

            return (
              <img
                key={layer.id}
                src={layer.url}
                alt={layer.name}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-300"
                style={{
                  zIndex: layer.zIndex,
                  filter: layer.filter || 'none',
                }}
                loading="eager"
              />
            );
          })}
        </div>

        {/* Floating Quick Canvas Controls (Zoom & Layer Toggle) */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-md border border-[#E8DFC8]">
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-[#543826] hover:bg-[#F2E8DC] rounded-xl transition cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 text-[#543826] hover:bg-[#F2E8DC] rounded-xl transition cursor-pointer text-xs font-bold"
            title="Kích thước gốc"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-[#543826] hover:bg-[#F2E8DC] rounded-xl transition cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-[#DECDB8] mx-0.5" />
          <button
            onClick={() => setShowLayerList(!showLayerList)}
            className={`p-1.5 rounded-xl transition cursor-pointer ${
              showLayerList
                ? 'bg-[#5C2424] text-white'
                : 'text-[#543826] hover:bg-[#F2E8DC]'
            }`}
            title="Quản lý các lớp đồ (Z-index)"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={onResetOutfit}
            className="p-1.5 text-[#8B4513] hover:bg-[#FEE2E2] rounded-xl transition cursor-pointer"
            title="Đặt lại trang phục mặc định"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Paper doll cutting hint aesthetic */}
        <div className="absolute top-3 left-3 z-30 text-[10px] tracking-wider uppercase font-extrabold text-[#A89481] bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#EADCCB]">
          1000 × 1500 PX
        </div>
      </div>

      {/* Layer Visibility Drawer (Pop-up) */}
      {showLayerList && (
        <div className="absolute bottom-16 right-4 z-40 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E8DFC8] p-3 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0E6D8]">
            <span className="font-bold text-[#422C1D] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C93B3B]" />
              Thứ tự lớp (Z-Index)
            </span>
            <button
              onClick={() => setShowLayerList(false)}
              className="text-[#8B7355] hover:text-[#2D2A26] font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {layers.map((layer) => {
              const isHidden = hiddenLayerIds.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayerVisibility(layer.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left cursor-pointer transition ${
                    isHidden
                      ? 'bg-gray-100 text-gray-400 border-gray-200 line-through'
                      : 'bg-[#FAF5EF] text-[#422C1D] border-[#E8DFC8] font-medium'
                  }`}
                >
                  <span className="truncate">{layer.name}</span>
                  <span className="text-[10px] font-bold text-[#8C6D58] bg-[#F2E8DC] px-1.5 py-0.5 rounded-md ml-1 shrink-0">
                    Z:{layer.zIndex}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
