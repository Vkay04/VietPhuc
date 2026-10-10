import React, { useState } from 'react';
import { LookbookEntry, CurrentOutfitState, ColorPreset } from '../types';
import {
  Bookmark,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  X,
  Calendar,
  Sparkles,
  Star,
} from 'lucide-react';
import { exportOutfitToCanvas, downloadPngFile } from '../utils/imageExporter';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LookbookEntry[];
  onSaveCurrentOutfit: (title: string) => void;
  onLoadOutfit: (state: CurrentOutfitState) => void;
  onDeleteEntry: (id: string) => void;
  currentCostumeName: string;
  preset: ColorPreset;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  entries,
  onSaveCurrentOutfit,
  onLoadOutfit,
  onDeleteEntry,
  currentCostumeName,
  preset,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [isExportingId, setIsExportingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim() || `Bộ phối ${currentCostumeName}`;
    onSaveCurrentOutfit(title);
    setNewTitle('');
  };

  const handleExportEntry = async (entry: LookbookEntry) => {
    setIsExportingId(entry.id);
    try {
      const { dataUrl } = await exportOutfitToCanvas(
        entry.outfitState,
        preset,
        entry.costumeName
      );
      downloadPngFile(
        dataUrl,
        `viet-phuc-${entry.title.toLowerCase().replace(/\s+/g, '-')}.png`
      );
    } catch (err) {
      console.error('Error exporting entry:', err);
    } finally {
      setIsExportingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF5EF] border-b border-[#E8DFC8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C93B3B] text-white flex items-center justify-center shadow-xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#422C1D]">
                Lookbook Cổ Phục Của Bạn
              </h3>
              <p className="text-xs text-[#8C6D58]">
                Lưu giữ và xuất ảnh những bộ trang phục bạn tâm đắc ({entries.length} bộ)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6451] hover:text-[#2D2A26] hover:bg-[#EAE0D1] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save Current Outfit Section */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#F0E6D8]">
          <form onSubmit={handleSave} className="flex gap-2">
            <input
              type="text"
              placeholder={`Lưu set đồ hiện tại: "${currentCostumeName}..."`}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-[#FAF5EF] focus:outline-hidden focus:ring-2 focus:ring-[#C93B3B]/30 focus:border-[#C93B3B]"
              maxLength={40}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C93B3B] hover:bg-[#A92A2A] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Lưu Set Đồ</span>
            </button>
          </form>
        </div>

        {/* Saved Lookbook List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-[#9E8B79] space-y-2">
              <Sparkles className="w-10 h-10 mx-auto text-[#D5C2AA]" />
              <p className="text-sm font-bold">Chưa có bộ phối nào được lưu</p>
              <p className="text-xs max-w-sm mx-auto">
                Hãy tạo nên sự kết hợp bạn yêu thích nhất và nhấn "Lưu Set Đồ" ở trên!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8DFC8] shadow-2xs hover:shadow-xs transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#422C1D] truncate">
                        {entry.title}
                      </h4>
                      <p className="text-[11px] text-[#8C6D58]">
                        {entry.costumeName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#E65100] bg-[#FFF8E1] px-2 py-0.5 rounded-full border border-[#FFE082]">
                      <Star className="w-3 h-3 fill-[#FFB300] text-[#FFB300]" />
                      <span>{entry.harmonyScore}★</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#A89481]">
                    <Calendar className="w-3 h-3" />
                    <span>{entry.createdAt}</span>
                    <span>•</span>
                    <span className="capitalize">
                      {entry.outfitState.styleMode === 'cach_tan'
                        ? 'Cách tân Gen Z'
                        : 'Truyền thống'}
                    </span>
                  </div>

                  {/* Actions for this item */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0E6D8]">
                    <button
                      onClick={() => {
                        onLoadOutfit(entry.outfitState);
                        onClose();
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-[#C93B3B] hover:text-[#9A1C1C] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Mặc lại</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExportEntry(entry)}
                        disabled={isExportingId === entry.id}
                        className="p-1.5 text-[#543826] hover:bg-[#F2E8DC] rounded-lg transition cursor-pointer"
                        title="Tải ảnh PNG bộ này"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1.5 text-[#C62828] hover:bg-[#FFEBEE] rounded-lg transition cursor-pointer"
                        title="Xóa bộ này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
