import { CurrentOutfitState, CulturalWarning, CostumeData } from '../types';

export function detectCulturalWarnings(
  outfit: CurrentOutfitState,
  costumes: CostumeData[]
): CulturalWarning[] {
  const warnings: CulturalWarning[] = [];
  const costume = costumes.find((c) => c.id === outfit.costumeId);
  const accs = outfit.selectedAccessories;

  // 1. Áo Bà Ba kết hợp Nón Quai Thao Bắc Bộ
  if (
    outfit.costumeId === 'ao_ba_ba' &&
    accs.includes('acc_non_quai_thao')
  ) {
    warnings.push({
      id: 'baba_quai_thao',
      level: 'warning',
      title: 'Lệch vùng miền: Nón quai thao & Áo bà ba',
      message:
        'Nón quai thao là nét văn hóa đặc trưng của các liền chị Kinh Bắc (Bắc Bộ), không kết hợp cùng áo bà ba sông nước Nam Bộ.',
      reason:
        'Khoảng cách địa lý và phong tục hai miền khác biệt sâu sắc. Áo bà ba gắn liền với xuồng ghe miền Tây, nón quai thao gắn liền với làn điệu dân ca Quan họ Bắc Ninh.',
      suggestion:
        'Hãy thay nón quai thao bằng Nón lá Nam Bộ hoặc Khăn rằn sọc ca-rô.',
      matchedRule: 'Không đội nón quai thao Bắc Bộ khi mặc áo bà ba',
    });
  }

  // 2. Áo Tứ Thân không có Áo Yếm bên trong
  if (outfit.costumeId === 'ao_tu_than' && outfit.innerId === 'none') {
    warnings.push({
      id: 'tuthan_no_yem',
      level: 'warning',
      title: 'Thiếu yếm đào trong Áo Tứ Thân',
      message:
        'Áo tứ thân cổ truyền có 2 vạt trước mở rộng, bắt buộc phải có áo yếm (yếm đào, yếm hoa sen) bên trong để kín đáo và đúng phong cách.',
      reason:
        'Cấu trúc của áo tứ thân là áo khoác ngoài xẻ vạt, lớp yếm bên trong vừa ôm ấp cơ thể vừa thể hiện vẻ e ấp, dịu dàng của người phụ nữ Việt.',
      suggestion: 'Chọn thêm Yếm Đào hoặc Yếm Trắng Ngà ở mục Áo Trong.',
      matchedRule: 'Không mặc áo tứ thân mà bỏ qua áo yếm bên trong',
    });
  }

  // 3. Áo Tứ Thân kết hợp Khăn Rằn Nam Bộ
  if (
    outfit.costumeId === 'ao_tu_than' &&
    accs.includes('acc_khan_ran')
  ) {
    warnings.push({
      id: 'tuthan_khan_ran',
      level: 'warning',
      title: 'Lệch vùng miền: Khăn rằn & Áo tứ thân',
      message:
        'Khăn rằn là di sản văn hóa của người dân phương Nam, không xuất hiện trong trang phục Tứ thân Kinh Bắc.',
      reason:
        'Người Kinh Bắc dùng Khăn mỏ quạ hoặc Nón quai thao ba tầm chứ không dùng khăn rằn.',
      suggestion: 'Thay khăn rằn bằng Khăn mỏ quạ hoặc Nón quai thao.',
      matchedRule: 'Không kết hợp với khăn rằn Nam Bộ',
    });
  }

  // 4. Áo Tấc (Lễ phục trang nghiêm) kết hợp Sneaker ở phong cách Truyền Thống
  if (
    (outfit.costumeId === 'ao_tac' || outfit.costumeId === 'ao_ngu_than_tay_chen') &&
    accs.includes('acc_sneaker') &&
    outfit.styleMode === 'truyen_thong'
  ) {
    warnings.push({
      id: 'aotac_sneaker_trad',
      level: 'warning',
      title: 'Sneaker trong không gian lễ phục truyền thống',
      message:
        'Trong không gian nghi lễ truyền thống tôn nghiêm (lễ tế, bái tổ, gia tiên), áo tấc đi cùng giày thể thao sneaker sẽ bị coi là thiếu trang trọng.',
      reason:
        'Áo Tấc là đại lễ phục triều Nguyễn, đòi hỏi sự chỉn chu tuyệt đối từ đầu tóc đến hài thêu / guốc mộc.',
      suggestion:
        'Nếu bạn muốn phối cùng sneaker, hãy chuyển chế độ sang "Cách tân Gen Z" (chụp kỷ yếu, dạo phố), hoặc bỏ sneaker để giữ chuẩn mực truyền thống.',
      matchedRule:
        'Tránh kết hợp với dép lào hoặc giày thể thao quá hầm hố bụi bặm trong không gian thờ tự lễ bái',
    });
  }

  // 5. Áo Bà Ba kết hợp Khăn Đóng triều đình
  if (
    outfit.costumeId === 'ao_ba_ba' &&
    accs.includes('acc_khan_dong')
  ) {
    warnings.push({
      id: 'baba_khan_dong',
      level: 'info',
      title: 'Khăn đóng cung đình với Áo bà ba thôn dã',
      message:
        'Khăn đóng là phụ kiện nghi lễ của áo ngũ thân/áo tấc, ít khi đi cùng áo bà ba dân dã.',
      reason:
        'Áo bà ba chuộng sự nhẹ nhàng, thoáng mát, thường đội nón lá hoặc quấn khăn rằn mộc mạc.',
      suggestion: 'Thử kết hợp với Khăn rằn hoặc Nón lá Nam Bộ để chuẩn vị miệt vườn.',
      matchedRule: 'Không kết hợp với khăn đóng triều đình trong bối cảnh thôn dã',
    });
  }

  // 6. Áo Tứ Thân nhưng chọn quần thay vì váy đụp
  if (
    outfit.costumeId === 'ao_tu_than' &&
    outfit.pantsId !== 'skirt_black' &&
    outfit.styleMode === 'truyen_thong'
  ) {
    warnings.push({
      id: 'tuthan_no_skirt',
      level: 'info',
      title: 'Áo Tứ thân truyền thống thường mặc cùng Váy đụp',
      message:
        'Phụ nữ Bắc Bộ xưa mặc áo tứ thân kết hợp váy đụp xòe đen, ít khi mặc quần suông lụa trắng.',
      reason:
        'Váy đụp giúp phụ nữ lao động nông nghiệp và trẩy hội đình làng thuận tiện đi lại, giữ nếp truyền thống ngàn năm.',
      suggestion:
        'Chọn "Váy đụp đen" ở mục Quần/Váy để tái hiện đúng hình ảnh liền chị Kinh Bắc.',
      matchedRule: 'Không mặc quần tây hiện đại thay cho váy đụp',
    });
  }

  // 7. Cảnh báo chung từ lỗi phối cần tránh của trang phục
  if (costume && costume.can_xac_minh) {
    warnings.push({
      id: 'costume_need_verify',
      level: 'info',
      title: 'Tài liệu đang xác minh bổ sung',
      message:
        `Trang phục ${costume.ten} có một số tư liệu lịch sử đang được nghiên cứu đối chiếu.`,
      reason:
        'Các nguồn phục dựng hiện đại đang tiếp tục khai thác văn bản cổ để chuẩn hóa chính xác.',
      suggestion: 'Bạn có thể tham khảo thêm các sách nghiên cứu chuyên sâu như "Ngàn năm áo mũ".',
      matchedRule: 'can_xac_minh: true',
    });
  }

  return warnings;
}
