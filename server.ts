import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const costumesData = require('./src/data/costumes.json');

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK with User-Agent as required by skill guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// API endpoint for Costumes Dataset
app.get('/api/costumes', (_req: Request, res: Response) => {
  res.json(costumesData);
});

// API endpoint for Gemini Advisor & Cultural Explanation
app.post('/api/gemini/advisor', async (req: Request, res: Response) => {
  try {
    const {
      gender,
      costumeId,
      occasion,
      styleMode,
      accessories,
      colorPreset,
      detectedWarnings,
    } = req.body;

    const currentCostume = costumesData.find((c: any) => c.id === costumeId);

    // Fallback generator function using verified dataset
    const generateFallback = () => {
      if (!currentCostume) {
        return {
          goi_y: 'Hãy chọn một trang phục truyền thống để nhận gợi ý phối đồ chuẩn nét!',
          giai_thich: 'Chưa có đủ thông tin đã xác minh.',
          nguon: [],
          muc_do_chac_chan: 'trung_binh' as const,
        };
      }

      const styleDesc =
        styleMode === 'cach_tan'
          ? 'Phong cách Cách tân Gen Z trẻ trung, năng động nhưng vẫn giữ trọn linh hồn cổ phục.'
          : 'Phong cách Truyền thống chuẩn mực, thanh lịch và tôn nghiêm.';

      let advice = `Bộ trang phục ${currentCostume.ten} phù hợp tuyệt vời cho dịp ${occasion || 'sinh hoạt văn hóa'}. ${styleDesc}`;

      if (detectedWarnings && detectedWarnings.length > 0) {
        advice += ` Lưu ý: ${detectedWarnings[0].message} Bạn nên ${detectedWarnings[0].suggestion}`;
      } else {
        advice += ` Bạn có thể kết hợp thêm các phụ kiện hợp cách như: ${currentCostume.phu_kien_hop.slice(0, 3).join(', ')}.`;
      }

      return {
        goi_y: advice,
        giai_thich: `${currentCostume.ten}: ${currentCostume.y_nghia} Nguồn gốc: ${currentCostume.nguon_goc}`,
        nguon: currentCostume.nguon_tham_khao || [],
        muc_do_chac_chan: currentCostume.can_xac_minh ? 'trung_binh' : 'cao',
      };
    };

    // If Gemini client is not initialized, return the verified fallback
    if (!ai) {
      return res.json(generateFallback());
    }

    const systemInstruction =
      "Chỉ được dùng thông tin trong dữ liệu JSON được cung cấp. Nếu thiếu thông tin, trả lời 'Chưa có đủ thông tin đã xác minh'. Không bịa nguồn. Dùng giọng trẻ trung, gần gũi (Gen Z/học sinh sinh viên yêu cổ phục).";

    const promptText = `
Dưới đây là cơ sở dữ liệu trang phục truyền thống Việt Nam:
${JSON.stringify(costumesData, null, 2)}

Thông tin người dùng đang phối đồ:
- Nhân vật: ${gender === 'nu' ? 'Nữ' : 'Nam'}
- Trang phục đang chọn: ${currentCostume?.ten || costumeId} (ID: ${costumeId})
- Dịp / Sự kiện: ${occasion}
- Phong cách: ${styleMode === 'cach_tan' ? 'Cách tân Gen Z' : 'Truyền thống chuẩn mực'}
- Tông màu: ${colorPreset || 'Mặc định'}
- Phụ kiện đang đeo: ${accessories ? accessories.join(', ') : 'Không có'}
- Cảnh báo văn hóa ghi nhận được: ${detectedWarnings && detectedWarnings.length > 0 ? JSON.stringify(detectedWarnings) : 'Không có vi phạm'}

Yêu cầu:
Viết lời gợi ý phối đồ và giải thích ngắn gọn, súc tích, mang giọng điệu Gen Z tích cực, yêu quý di sản.
Nếu có cảnh báo vi phạm văn hóa, hãy nhắc nhở nhẹ nhàng, giải thích lý do văn hóa lịch sử và gợi ý cách phối thay thế.
Bắt buộc trả về đúng cấu trúc JSON đã định nghĩa.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goi_y: {
              type: Type.STRING,
              description: 'Lời gợi ý phối đồ bằng giọng trẻ trung, gần gũi.',
            },
            giai_thich: {
              type: Type.STRING,
              description: 'Giải thích ý nghĩa văn hóa hoặc lý do cảnh báo.',
            },
            nguon: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Danh sách nguồn tham khảo xác minh từ dữ liệu JSON.',
            },
            muc_do_chac_chan: {
              type: Type.STRING,
              description: 'cao, trung_binh, hoặc thap',
            },
          },
          required: ['goi_y', 'giai_thich', 'nguon', 'muc_do_chac_chan'],
        },
      },
    });

    const text = response.text?.trim();
    if (text) {
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (e) {
        console.error('Error parsing Gemini JSON response:', e);
      }
    }

    return res.json(generateFallback());
  } catch (error) {
    console.error('Error in /api/gemini/advisor:', error);
    // In case of error, graceful fallback to costumes.json
    const costumeId = req.body?.costumeId;
    const currentCostume = costumesData.find((c: any) => c.id === costumeId);
    return res.json({
      goi_y: currentCostume
        ? `Gợi ý cho ${currentCostume.ten}: Nên phối cùng ${currentCostume.phu_kien_hop.slice(0, 2).join(', ')} và chọn các tông màu như ${currentCostume.mau_hop.slice(0, 2).join(', ')}.`
        : 'Hãy chọn trang phục để xem gợi ý phối đồ!',
      giai_thich: currentCostume?.y_nghia || 'Chưa có đủ thông tin đã xác minh.',
      nguon: currentCostume?.nguon_tham_khao || [],
      muc_do_chac_chan: currentCostume?.can_xac_minh ? 'trung_binh' : 'cao',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
