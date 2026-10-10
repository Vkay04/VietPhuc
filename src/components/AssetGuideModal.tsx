import React from 'react';
import { X, Layers, Image, CheckCircle, Info, Sparkles, Folder } from 'lucide-react';

interface AssetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetGuideModal: React.FC<AssetGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF5EF] border-b border-[#E8DFC8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5C2424] text-white flex items-center justify-center shadow-xs">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#422C1D]">
                Hướng Dẫn Thay Ảnh Thật & Cơ Chế Layer
              </h3>
              <p className="text-xs text-[#8C6D58]">
                Chuẩn búp bê giấy (Paper Doll) tỉ lệ cố định 1000 × 1500 px
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-[#4E342E] leading-relaxed">
          {/* Section 1: Quy chuẩn kích thước */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#B22222]">
              <Sparkles className="w-4 h-4" />
              <span>1. Quy chuẩn kích thước & Tư thế nhân vật</span>
            </div>
            <p>
              Tất cả ảnh đồ họa đều có kích thước cố định{' '}
              <strong className="text-[#B22222]">1000 × 1500 px</strong> với nền
              trong suốt (transparent PNG hoặc SVG). Hai nhân vật Nam và Nữ có
              cùng tư thế đứng thẳng dang nhẹ 2 tay, giữ chuẩn tọa độ mắt, cổ,
              vai, eo và chân để mọi món đồ xếp chồng chính xác 100%.
            </p>
          </div>

          {/* Section 2: Thứ tự Z-Index bắt buộc */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#422C1D]">
              <Layers className="w-4 h-4 text-[#C93B3B]" />
              <span>2. Thứ tự xếp lớp (Z-Index) từ dưới lên trên</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 1 • Phông nền:</strong> Cung
                đình Huế, đầm sen quê, giấy dó vintage.
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 2 • Thân người (Body):</strong>{' '}
                Từ cổ xuống chân (body-base).
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 3 • Quần / Váy:</strong> Quần
                lụa trắng/đen, váy đụp đen, quần nâu gụ.
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 4 • Áo trong / Yếm:</strong> Yếm
                đào thêu sen, áo lót cổ đứng trắng.
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 5 • Áo ngoài:</strong> Áo
                tấc, áo ngũ thân, áo tứ thân, áo bà ba, áo dài.
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 6 • Đầu nhân vật:</strong> Khuôn
                mặt anime & cổ độc lập (head-base).
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 7 • Tóc & Mũ nón:</strong> Búi
                bánh dày, tóc dài, khăn đóng, nón lá, nón quai thao.
              </div>
              <div className="p-2.5 bg-[#FAF5EF] rounded-xl border border-[#EFE5D8]">
                <strong className="text-[#C93B3B]">Z: 8 • Cầm tay / Khác:</strong> Quạt
                trầm hương, túi tote, kính râm, sneaker.
              </div>
            </div>
          </div>

          {/* Section 3: Cách thay ảnh thật */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#2E7D32]">
              <Folder className="w-4 h-4" />
              <span>3. Thư mục chứa tài nguyên ảnh thật</span>
            </div>
            <p>
              Tất cả file ảnh được đặt tại thư mục{' '}
              <code className="bg-[#FAF5EF] px-1.5 py-0.5 rounded-md font-mono text-[#B22222] border border-[#E8DFC8]">
                /public/assets/
              </code>
              . Hiện tại hệ thống sử dụng các file vector SVG sắc nét làm placeholder
              chuẩn xác.
            </p>
            <p>
              Khi bạn có bộ ảnh vẽ tay anime hoặc ảnh chụp trang phục thực tế (PNG
              tách nền trong suốt), bạn chỉ cần xuất file đúng tên tương ứng hoặc
              cập nhật đường dẫn trong{' '}
              <code className="bg-[#FAF5EF] px-1.5 py-0.5 rounded-md font-mono text-[#B22222]">
                src/utils/imageExporter.ts
              </code>
              :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#6D5441]">
              <li>
                Thân: <code>body-nu.png</code>, <code>body-nam.png</code>
              </li>
              <li>
                Áo ngoài: <code>outer-aotac-nu.png</code>,{' '}
                <code>outer-tuthan.png</code>, <code>outer-baba-nu.png</code>, v.v.
              </li>
              <li>
                Phụ kiện: <code>acc-khan-dong.png</code>,{' '}
                <code>acc-non-quai-thao.png</code>, v.v.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF5EF] border-t border-[#E8DFC8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5C2424] hover:bg-[#3D1414] text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            Đã nắm rõ
          </button>
        </div>
      </div>
    </div>
  );
};
