import { CurrentOutfitState, ColorPreset } from '../types';

export interface LayerAsset {
  id: string;
  name: string;
  url: string;
  filter?: string;
  zIndex: number;
}

export function getLayersForOutfit(
  outfit: CurrentOutfitState,
  preset: ColorPreset
): LayerAsset[] {
  const layers: LayerAsset[] = [];

  // 1. Phông nền (bg) - Z-index 1
  const bgMap: Record<string, string> = {
    bg_palace: '/assets/bg-palace.svg',
    bg_lotus: '/assets/bg-lotus.svg',
    bg_paper: '/assets/bg-paper.svg',
  };
  layers.push({
    id: 'background',
    name: 'Phông nền',
    url: bgMap[outfit.backgroundId] || '/assets/bg-paper.svg',
    zIndex: 1,
  });

  // 2. Thân người (body-base - từ cổ xuống chân) - Z-index 2
  layers.push({
    id: 'body',
    name: 'Thân người',
    url: outfit.gender === 'nu' ? '/assets/body-nu.svg' : '/assets/body-nam.svg',
    zIndex: 2,
  });

  // 3. Quần / Váy (pants / skirt) - Z-index 3
  const pantsMap: Record<string, string> = {
    pants_white: '/assets/pants-white.svg',
    pants_black: '/assets/pants-black.svg',
    skirt_black: '/assets/skirt-black.svg',
    pants_brown: '/assets/pants-brown.svg',
  };
  if (pantsMap[outfit.pantsId]) {
    layers.push({
      id: 'pants',
      name: 'Quần / Váy',
      url: pantsMap[outfit.pantsId],
      zIndex: 3,
    });
  }

  // 4. Áo trong / Yếm (inner-wear) - Z-index 4
  const innerMap: Record<string, string> = {
    inner_yem_red: '/assets/inner-yem-red.svg',
    inner_yem_cream: '/assets/inner-yem-cream.svg',
    inner_white_collar: '/assets/inner-white-collar.svg',
  };
  if (innerMap[outfit.innerId]) {
    layers.push({
      id: 'inner',
      name: 'Áo trong / Yếm',
      url: innerMap[outfit.innerId],
      zIndex: 4,
    });
  }

  // 5. Áo ngoài (outer-wear) - Z-index 5
  const outerFilter = `hue-rotate(${outfit.customHue ?? preset.hueRotate}deg) saturate(${
    outfit.customSaturation ?? preset.saturate
  }%) brightness(${outfit.customBrightness ?? preset.brightness}%)`;

  const outerMap: Record<string, string> = {
    ao_tac:
      outfit.gender === 'nu'
        ? '/assets/outer-aotac-nu.svg'
        : '/assets/outer-aotac-nam.svg',
    ao_ngu_than_tay_chen:
      outfit.gender === 'nu'
        ? '/assets/outer-nguthan-nu.svg'
        : '/assets/outer-nguthan-nam.svg',
    ao_tu_than: '/assets/outer-tuthan.svg',
    ao_ba_ba:
      outfit.gender === 'nu'
        ? '/assets/outer-baba-nu.svg'
        : '/assets/outer-baba-nam.svg',
    ao_dai_tan_thoi_hoc_sinh:
      outfit.gender === 'nu'
        ? '/assets/outer-aodai-nu.svg'
        : '/assets/outer-nguthan-nam.svg',
    ao_giao_linh_hoc_si: '/assets/outer-giaolinh.svg',
  };

  if (outerMap[outfit.costumeId]) {
    layers.push({
      id: 'outer',
      name: 'Áo ngoài',
      url: outerMap[outfit.costumeId],
      filter: outerFilter,
      zIndex: 5,
    });
  }

  // 6. Đầu nhân vật (head-base) - Z-index 6 (Tách riêng trên áo ngoài)
  layers.push({
    id: 'head',
    name: 'Đầu nhân vật',
    url: outfit.gender === 'nu' ? '/assets/head-nu.svg' : '/assets/head-nam.svg',
    zIndex: 6,
  });

  // 7. Tóc & Phụ kiện đầu (hair & headwear) - Z-index 7
  const hairMap: Record<string, string> = {
    hair_nu_bun: '/assets/hair-nu-bun.svg',
    hair_nu_long: '/assets/hair-nu-long.svg',
    hair_nam_short: '/assets/hair-nam-short.svg',
    hair_nam_topknot: '/assets/hair-nam-topknot.svg',
  };
  if (hairMap[outfit.hairId]) {
    layers.push({
      id: 'hair',
      name: 'Tóc',
      url: hairMap[outfit.hairId],
      zIndex: 7,
    });
  }

  // Phụ kiện đội đầu: Khăn đóng, nón lá, nón quai thao, khăn mỏ quạ, khăn rằn
  const headwearMap: Record<string, { url: string; name: string }> = {
    acc_khan_dong: { url: '/assets/acc-khan-dong.svg', name: 'Khăn Đóng' },
    acc_non_quai_thao: {
      url: '/assets/acc-non-quai-thao.svg',
      name: 'Nón Quai Thao',
    },
    acc_non_la: { url: '/assets/acc-non-la.svg', name: 'Nón Lá' },
    acc_khan_mo_qua: { url: '/assets/acc-khan-mo-qua.svg', name: 'Khăn Mỏ Quạ' },
    acc_khan_ran: { url: '/assets/acc-khan-ran.svg', name: 'Khăn Rằn' },
  };

  outfit.selectedAccessories.forEach((accId) => {
    if (headwearMap[accId]) {
      layers.push({
        id: accId,
        name: headwearMap[accId].name,
        url: headwearMap[accId].url,
        zIndex: 7,
      });
    }
  });

  // 8. Phụ kiện cầm tay / Khác (hand accessories, jewelry, streetwear) - Z-index 8
  const otherAccMap: Record<string, { url: string; name: string }> = {
    acc_kieng_bac: { url: '/assets/acc-kieng-bac.svg', name: 'Kiềng Bạc' },
    acc_quat_giay: { url: '/assets/acc-quat-giay.svg', name: 'Quạt Trầm Hương' },
    acc_kinh_ram: { url: '/assets/acc-kinh-ram.svg', name: 'Kính Râm Gen Z' },
    acc_sneaker: { url: '/assets/acc-sneaker.svg', name: 'Sneaker Gen Z' },
    acc_tui_tote: { url: '/assets/acc-tui-tote.svg', name: 'Túi Tote Canvas' },
  };

  outfit.selectedAccessories.forEach((accId) => {
    if (otherAccMap[accId]) {
      layers.push({
        id: accId,
        name: otherAccMap[accId].name,
        url: otherAccMap[accId].url,
        zIndex: 8,
      });
    }
  });

  // Sort strictly by z-index
  return layers.sort((a, b) => a.zIndex - b.zIndex);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export async function exportOutfitToCanvas(
  outfit: CurrentOutfitState,
  preset: ColorPreset,
  costumeName: string
): Promise<{ dataUrl: string; blob: Blob }> {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get canvas 2d context');

  // Fill canvas base background
  ctx.fillStyle = '#FAF5EF';
  ctx.fillRect(0, 0, 1000, 1500);

  const layers = getLayersForOutfit(outfit, preset);

  // Render each layer in sequence onto the canvas
  for (const layer of layers) {
    try {
      const img = await loadImage(layer.url);
      ctx.save();
      if (layer.filter) {
        ctx.filter = layer.filter;
      }
      ctx.drawImage(img, 0, 0, 1000, 1500);
      ctx.restore();
    } catch (err) {
      console.warn(`Could not load layer ${layer.name} (${layer.url}):`, err);
    }
  }

  // Elegant Watermark Seal
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(45, 42, 38, 0.75)';
  ctx.font = "bold 24px 'Playfair Display', serif";
  ctx.fillText('VIỆT PHỤC REMIX', 500, 1420);

  ctx.fillStyle = 'rgba(120, 80, 50, 0.7)';
  ctx.font = "16px 'Comfortaa', sans-serif";
  ctx.fillText(`${costumeName} • Búp Bê Giấy Dân Tộc`, 500, 1450);

  // Timestamp
  const now = new Date().toLocaleDateString('vi-VN');
  ctx.font = "12px 'Comfortaa', sans-serif";
  ctx.fillStyle = 'rgba(160, 140, 120, 0.8)';
  ctx.fillText(`Phối ngày: ${now}`, 500, 1475);
  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/png')
  );

  return { dataUrl, blob };
}

export function downloadPngFile(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
