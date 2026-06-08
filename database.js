// database.js - Chứa 214 bộ thủ và thuật toán phân tích
const TM_Radicals_Dict = {
    "一": "Bộ Nhất (Số 1) - Khởi đầu.", "丨": "Bộ Cổn - Nét sổ.", "丶": "Bộ Chủ - Điểm chấm.", "丿": "Bộ Phiệt - Nét phẩy.",
    "乙": "Bộ Ất - Thứ 2 thiên can.", "亅": "Bộ Quyết - Nét móc.", "二": "Bộ Nhị - Số 2.", "亠": "Bộ Đầu - Nét chấm trên.",
    "人": "Bộ Nhân - Con người.", "亻": "Bộ Nhân đứng.", "儿": "Bộ Nhi - Đứa trẻ.", "入": "Bộ Nhập - Đi vào.",
    "八": "Bộ Bát - Số 8, chia tách.", "冂": "Bộ Quynh - Vùng biên giới.", "冖": "Bộ Mịch - Khăn trùm.",
    "冫": "Bộ Băng - Nước đá.", "几": "Bộ Kỷ - Ghế tựa.", "凵": "Bộ Khảm - Hố lõm.", "刀": "Bộ Đao - Con dao.",
    "刂": "Bộ Đao đứng.", "力": "Bộ Lực - Sức mạnh, lao động.", "勹": "Bộ Bao - Bao bọc.", "匕": "Bộ Chủy - Cái thìa.",
    "匚": "Bộ Phương - Tủ đựng.", "匸": "Bộ Hệ - Che giấu.", "十": "Bộ Thập - Số 10.", "卜": "Bộ Bốc - Bói toán.",
    "卩": "Bộ Tiết - Đốt tre.", "厂": "Bộ Hán - Sườn núi.", "厶": "Bộ Tư - Riêng tư.", "口": "Bộ Khẩu - Miệng, ngôn ngữ.",
    "囗": "Bộ Vi - Bao vây.", "土": "Bộ Thổ - Đất đai.", "士": "Bộ Sĩ - Kẻ sĩ.", "夂": "Bộ Truy - Theo sau.",
    "夕": "Bộ Tịch - Đêm tối.", "大": "Bộ Đại - To lớn.", "女": "Bộ Nữ - Phụ nữ.", "子": "Bộ Tử - Con cái.",
    "宀": "Bộ Miên - Mái nhà.", "寸": "Bộ Thốn - Tấc đo.", "小": "Bộ Tiểu - Nhỏ bé.", "尢": "Bộ Uông - Chân khập khiễng.",
    "尸": "Bộ Thi - Thân xác.", "屮": "Bộ Triệt - Mầm cây.", "山": "Bộ Sơn - Núi non.", "川": "Bộ Xuyên - Sông ngòi.",
    "工": "Bộ Công - Người thợ.", "己": "Bộ Kỷ - Bản thân.", "巾": "Bộ Cân - Khăn vải.", "干": "Bộ Can - Thiên can.",
    "幺": "Bộ Yêu - Nhỏ nhắn.", "广": "Bộ Quảng - Nhà lớn.", "廴": "Bộ Dẫn - Bước chân dài.", "廾": "Bộ Củng - Hai tay chắp.",
    "弋": "Bộ Dực - Cái cọc.", "弓": "Bộ Cung - Cái cung.", "彐": "Bộ Ký - Mõm heo.", "彡": "Bộ Sâm - Hoa văn.",
    "彳": "Bộ Xích - Bước chân.", "心": "Bộ Tâm - Quả tim.", "忄": "Bộ Tâm đứng.", "戈": "Bộ Qua - Binh khí.",
    "户": "Bộ Hộ - Cửa nhà.", "手": "Bộ Thủ - Bàn tay.", "扌": "Bộ Thủ đứng.", "支": "Bộ Chi - Cành cây.",
    "攴": "Bộ Phác - Đánh khẽ.", "文": "Bộ Văn - Chữ viết.", "斗": "Bộ Đẩu - Đấu đong.", "斤": "Bộ Cân - Cái rìu.",
    "方": "Bộ Phương - Phương hướng.", "无": "Bộ Vô - Không có.", "日": "Bộ Nhật - Mặt trời.", "曰": "Bộ Viết - Nói rằng.",
    "月": "Bộ Nguyệt - Mặt trăng.", "木": "Bộ Mộc - Cây cối.", "欠": "Bộ Khiếm - Thiếu thốn.", "止": "Bộ Chỉ - Dừng lại.",
    "歹": "Bộ Tịch - Xương tàn.", "殳": "Bộ Thù - Binh khí.", "毋": "Bộ Vô - Đừng.", "比": "Bộ Tỷ - So sánh.",
    "毛": "Bộ Mao - Lông thú.", "氏": "Bộ Thị - Họ.", "气": "Bộ Khí - Hơi nước.", "水": "Bộ Thủy - Nước.",
    "氵": "Bộ Thủy đứng.", "火": "Bộ Hỏa - Lửa.", "灬": "Bộ Hỏa dưới.", "爪": "Bộ Trảo - Móng vuốt.", "父": "Bộ Phụ - Người cha.",
    "爻": "Bộ Hào - Đan xen.", "爿": "Bộ Tường - Giường nằm.", "片": "Bộ Phiến - Mảnh lát.", "牙": "Bộ Nha - Răng.",
    "牛": "Bộ Ngưu - Con trâu.", "犬": "Bộ Khuyển - Con chó.", "犭": "Bộ Khuyển đứng.", "玄": "Bộ Huyền - Màu đen.",
    "玉": "Bộ Ngọc - Viên ngọc.", "王": "Bộ Vương - Vua chúa.", "甘": "Bộ Cam - Vị ngọt.", "生": "Bộ Sinh - Sinh trưởng.",
    "用": "Bộ Dụng - Sử dụng.", "田": "Bộ Điền - Ruộng đất.", "疒": "Bộ Tật - Bệnh tật.", "癶": "Bộ Bát - Chân ngược.",
    "白": "Bộ Bạch - Màu trắng.", "皮": "Bộ Bì - Da.", "皿": "Bộ Mãnh - Bát đĩa.", "目": "Bộ Mục - Mắt.",
    "矛": "Bộ Mâu - Mâu đâm.", "矢": "Bộ Thỉ - Mũi tên.", "石": "Bộ Thạch - Đá.", "示": "Bộ Thị - Thần linh.",
    "禸": "Bộ Nhựu - Dấu chân.", "禾": "Bộ Hòa - Lúa.", "穴": "Bộ Huyệt - Hang ổ.", "立": "Bộ Lập - Đứng.",
    "竹": "Bộ Trúc - Tre.", "米": "Bộ Mễ - Gạo.", "糸": "Bộ Mịch - Tơ.", "纟": "Bộ Mịch giản thể.",
    "缶": "Bộ Phẫu - Bình gốm.", "网": "Bộ Võng - Lưới.", "羊": "Bộ Dương - Dê.", "羽": "Bộ Vũ - Lông chim.",
    "老": "Bộ Lão - Già.", "而": "Bộ Nhi - Râu cằm.", "耒": "Bộ Lỗi - Cái cày.", "耳": "Bộ Nhĩ - Tai.",
    "聿": "Bộ Duật - Bút lông.", "肉": "Bộ Nhục - Thịt.", "臣": "Bộ Thần - Bầy tôi.", "自": "Bộ Tự - Mũi.",
    "至": "Bộ Chí - Đến.", "臼": "Bộ Cối - Cối giã.", "舌": "Bộ Thiệt - Lưỡi.", "舟": "Bộ Chu - Thuyền.",
    "艮": "Bộ Cấn - Dừng.", "色": "Bộ Sắc - Màu.", "艹": "Bộ Thảo - Cỏ.", "虍": "Bộ Hô - Cọp.",
    "虫": "Bộ Trùng - Côn trùng.", "血": "Bộ Huyết - Máu.", "行": "Bộ Hành - Đi.", "衣": "Bộ Y - Áo.",
    "衤": "Bộ Y đứng.", "襾": "Bộ Á - Khăn che.", "见": "Bộ Kiến - Thấy.", "角": "Bộ Giác - Sừng.",
    "言": "Bộ Ngôn - Lời.", "讠": "Bộ Ngôn giản.", "谷": "Bộ Cốc - Thung lũng.", "豆": "Bộ Đậu - Hạt đậu.",
    "豕": "Bộ Thỉ - Heo.", "豸": "Bộ Trị - Thú dài.", "贝": "Bộ Bối - Vỏ sò.", "赤": "Bộ Xích - Đỏ.",
    "走": "Bộ Tẩu - Chạy.", "足": "Bộ Túc - Chân.", "身": "Bộ Thân - Thân thể.", "车": "Bộ Xa - Xe.",
    "辛": "Bộ Tân - Cay đắng.", "辰": "Bộ Thần - Thời gian.", "辵": "Bộ Chợt - Bước đi.", "辶": "Bộ Sai.",
    "邑": "Bộ Ấp - Vùng đất.", "酉": "Bộ Dậu - Rượu.", "采": "Bộ Thải - Hái.", "里": "Bộ Lý - Dặm.",
    "金": "Bộ Kim - Kim loại.", "钅": "Bộ Kim giản.", "长": "Bộ Trường - Dài.", "门": "Bộ Môn - Cổng.",
    "阜": "Bộ Phụ - Gò đất.", "隶": "Bộ Lệ - Theo đuổi.", "隹": "Bộ Chuy - Chim.", "雨": "Bộ Vũ - Mưa.",
    "青": "Bộ Thanh - Xanh.", "非": "Bộ Phi - Sai.", "面": "Bộ Diện - Mặt.", "革": "Bộ Cách - Da.",
    "韦": "Bộ Vi - Da dẻ.", "韭": "Bộ Cửu - Rau hẹ.", "音": "Bộ Âm - Âm thanh.", "页": "Bộ Hiệt - Đầu.",
    "风": "Bộ Phong - Gió.", "飞": "Bộ Phi - Bay.", "食": "Bộ Thực - Ăn.", "饣": "Bộ Thực giản.",
    "首": "Bộ Thủ - Đầu.", "香": "Bộ Hương - Thơm.", "马": "Bộ Mã - Ngựa.", "骨": "Bộ Cốt - Xương.",
    "高": "Bộ Cao - Cao.", "髟": "Bộ Tiêu - Tóc.", "鬥": "Bộ Đấu - Đấu.", "鬯": "Bộ Sướng - Rượu.",
    "鬲": "Bộ Cách - Đỉnh.", "鬼": "Bộ Quỷ - Ma.", "鱼": "Bộ Ngư - Cá.", "鸟": "Bộ Điểu - Chim.",
    "鹿": "Bộ Lộc - Hươu.", "麦": "Bộ Mạch - Lúa mì.", "麻": "Bộ Ma - Gai.", "黄": "Bộ Hoàng - Vàng.",
    "黍": "Bộ Thử - Kê.", "黑": "Bộ Hắc - Đen.", "黹": "Bộ Chỉ - Thêu.", "黽": "Bộ Mãnh - Ếch.",
    "鼎": "Bộ Đỉnh - Vạc.", "鼓": "Bộ Cổ - Trống.", "鼠": "Bộ Thử - Chuột.", "鼻": "Bộ Tị - Mũi.",
    "齐": "Bộ Tề - Đều.", "齿": "Bộ Sỉ - Răng.", "龙": "Bộ Long - Rồng.", "龟": "Bộ Quy - Rùa.", "龠": "Bộ Dược - Sáo."
};

function executeAIRadicalAnalyzer(char) {
    const box = document.getElementById('panel-radical-analysis');
    let html = "";
    Object.keys(TM_Radicals_Dict).forEach(r => {
        if (char.includes(r)) {
            html += `<p class="radical-item-text">➔ <strong>Bộ thủ [ ${r} ]:</strong> ${TM_Radicals_Dict[r]}</p>`;
        }
    });
    box.innerHTML = `<div class="radical-header-title">🤖 AI Tra Cứu Bộ Thủ: "${char}"</div>${html || "<p>Không tìm thấy bộ thủ gốc.</p>"}`;
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth' });
}