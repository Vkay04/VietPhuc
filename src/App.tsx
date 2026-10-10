import React, { useState, useEffect, useMemo } from 'react';
import costumesData from './data/costumes.json';
import {
  CurrentOutfitState,
  CostumeData,
  ColorPreset,
  LookbookEntry,
} from './types';
import { COLOR_PRESETS, calculateColorHarmony } from './utils/colorHarmony';
import { detectCulturalWarnings } from './utils/warningDetector';
import { exportOutfitToCanvas, downloadPngFile } from './utils/imageExporter';
import { Navbar } from './components/Navbar';
import { PaperDollCanvas } from './components/PaperDollCanvas';
import { WardrobePanel } from './components/WardrobePanel';
import { CulturalCard } from './components/CulturalCard';
import { CulturalWarningModal } from './components/CulturalWarningModal';
import { GeminiAdvisorCard } from './components/GeminiAdvisorCard';
import { ColorHarmonyCard } from './components/ColorHarmonyCard';
import { LookbookModal } from './components/LookbookModal';
import { AssetGuideModal } from './components/AssetGuideModal';
import {
  AlertTriangle,
  ChevronRight,
  Compass,
  Sliders,
  Sparkles,
} from 'lucide-react';

const INITIAL_OUTFIT: CurrentOutfitState = {
  gender: 'nu',
  costumeId: 'ao_tac',
  styleMode: 'truyen_thong',
  occasion: 'all',
  hairId: 'hair_nu_bun',
  pantsId: 'pants_white',
  innerId: 'inner_white_collar',
  selectedAccessories: ['acc_khan_dong', 'acc_kieng_bac'],
  backgroundId: 'bg_paper',
  colorPresetId: 'do_chu_sa',
  customHue: 0,
  customSaturation: 100,
  customBrightness: 100,
};

export default function App() {
  const [costumes] = useState<CostumeData[]>(costumesData as CostumeData[]);
  const [outfit, setOutfit] = useState<CurrentOutfitState>(() => {
    try {
      const saved = localStorage.getItem('vietphuc_current_outfit');
      return saved ? JSON.parse(saved) : INITIAL_OUTFIT;
    } catch {
      return INITIAL_OUTFIT;
    }
  });

  const [selectedColorPreset, setSelectedColorPreset] = useState<ColorPreset>(
    () => {
      const found = COLOR_PRESETS.find((p) => p.id === outfit.colorPresetId);
      return found || COLOR_PRESETS[0];
    }
  );

  const [wardrobeOpen, setWardrobeOpen] = useState<boolean>(true);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Lookbook persistence in localStorage
  const [lookbookEntries, setLookbookEntries] = useState<LookbookEntry[]>(
    () => {
      try {
        const saved = localStorage.getItem('vietphuc_lookbook');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
  );

  // Persist current outfit
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_current_outfit', JSON.stringify(outfit));
    } catch (e) {
      console.warn('Could not save outfit to localStorage:', e);
    }
  }, [outfit]);

  // Persist lookbook
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_lookbook', JSON.stringify(lookbookEntries));
    } catch (e) {
      console.warn('Could not save lookbook to localStorage:', e);
    }
  }, [lookbookEntries]);

  // Current active costume
  const currentCostume = useMemo(() => {
    return costumes.find((c) => c.id === outfit.costumeId) || costumes[0];
  }, [costumes, outfit.costumeId]);

  // Cultural warnings calculation
  const warnings = useMemo(() => {
    return detectCulturalWarnings(outfit, costumes);
  }, [outfit, costumes]);

  // Color harmony calculation
  const colorHarmony = useMemo(() => {
    return calculateColorHarmony(outfit, selectedColorPreset);
  }, [outfit, selectedColorPreset]);

  // Handlers
  const handleUpdateOutfit = (updates: Partial<CurrentOutfitState>) => {
    setOutfit((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectColorPreset = (preset: ColorPreset) => {
    setSelectedColorPreset(preset);
    handleUpdateOutfit({
      colorPresetId: preset.id,
      customHue: preset.hueRotate,
      customSaturation: preset.saturate,
      customBrightness: preset.brightness,
    });
  };

  const handleResetOutfit = () => {
    setOutfit(INITIAL_OUTFIT);
    setSelectedColorPreset(COLOR_PRESETS[0]);
  };

  const handleSaveCurrentOutfit = (title: string) => {
    const newEntry: LookbookEntry = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      outfitState: outfit,
      harmonyScore: colorHarmony.score,
      costumeName: currentCostume.ten,
    };
    setLookbookEntries((prev) => [newEntry, ...prev]);
  };

  const handleLoadOutfitFromLookbook = (loadedState: CurrentOutfitState) => {
    setOutfit(loadedState);
    const foundPreset = COLOR_PRESETS.find(
      (p) => p.id === loadedState.colorPresetId
    );
    if (foundPreset) setSelectedColorPreset(foundPreset);
  };

  const handleDeleteLookbookEntry = (id: string) => {
    setLookbookEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const { dataUrl } = await exportOutfitToCanvas(
        outfit,
        selectedColorPreset,
        currentCostume.ten
      );
      downloadPngFile(
        dataUrl,
        `viet-phuc-${currentCostume.id}-${Date.now()}.png`
      );
    } catch (err) {
      console.error('Error during image export:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#2D2A26] font-['Nunito',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        wardrobeOpen={wardrobeOpen}
        onToggleWardrobe={() => setWardrobeOpen(!wardrobeOpen)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onExportImage={handleExportImage}
        isExporting={isExporting}
        lookbookCount={lookbookEntries.length}
      />

      {/* Warning Banner Bar if conflict exists */}
      {warnings.length > 0 && (
        <div className="bg-[#FFF9C4] border-b border-[#FFEE58] px-4 py-2 text-xs text-[#BF360C] flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1 truncate">
            <AlertTriangle className="w-4 h-4 text-[#F57F17] shrink-0" />
            <span className="font-bold">Lưu ý văn hóa:</span>
            <span className="truncate">{warnings[0].message}</span>
          </div>
          <button
            onClick={() => setIsWarningModalOpen(true)}
            className="text-[11px] font-bold text-[#E65100] underline hover:text-[#BF360C] shrink-0 cursor-pointer"
          >
            Xem chi tiết ({warnings.length})
          </button>
        </div>
      )}

      {/* Main Workspace Layout (Mannequin & Cards on Left, Collapsible Wardrobe Drawer on Right) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Section: Paper Doll Stage & Info Cards */}
        <section className="flex-1 flex flex-col xl:flex-row overflow-y-auto p-3 sm:p-5 lg:p-6 gap-6 justify-center items-start">
          {/* Mannequin Stage */}
          <div className="w-full xl:w-auto flex-1 flex flex-col items-center">
            <PaperDollCanvas
              outfit={outfit}
              preset={selectedColorPreset}
              currentCostume={currentCostume}
              warnings={warnings}
              onResetOutfit={handleResetOutfit}
              onOpenWarnings={() => setIsWarningModalOpen(true)}
            />

            {/* If wardrobe is closed, show a large floating pill to open it */}
            {!wardrobeOpen && (
              <button
                onClick={() => setWardrobeOpen(true)}
                className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-[#5C2424] hover:bg-[#431818] text-white rounded-full font-bold text-xs shadow-md transition active:scale-95 cursor-pointer animate-pulse"
              >
                <Sliders className="w-4 h-4" />
                <span>Mở tủ đồ để thay đổi trang phục</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cards Column: Cultural Lore, Gemini Advisor & Color Harmony */}
          <div className="w-full xl:w-[420px] flex flex-col gap-4">
            {/* Cultural Origin Card */}
            <CulturalCard costume={currentCostume} />

            {/* AI Advisor Card (Gemini with Gen Z Tone & JSON compliance) */}
            <GeminiAdvisorCard
              outfit={outfit}
              preset={selectedColorPreset}
              warnings={warnings}
            />

            {/* Color Harmony Score (1-5 Stars) */}
            <ColorHarmonyCard harmony={colorHarmony} />
          </div>
        </section>

        {/* Right Section: Collapsible Wardrobe Panel */}
        <WardrobePanel
          isOpen={wardrobeOpen}
          onClose={() => setWardrobeOpen(false)}
          outfit={outfit}
          costumes={costumes}
          onUpdateOutfit={handleUpdateOutfit}
          selectedColorPreset={selectedColorPreset}
          onSelectColorPreset={handleSelectColorPreset}
        />
      </main>

      {/* Modals */}
      <CulturalWarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        warnings={warnings}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        entries={lookbookEntries}
        onSaveCurrentOutfit={handleSaveCurrentOutfit}
        onLoadOutfit={handleLoadOutfitFromLookbook}
        onDeleteEntry={handleDeleteLookbookEntry}
        currentCostumeName={currentCostume.ten}
        preset={selectedColorPreset}
      />

      <AssetGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
