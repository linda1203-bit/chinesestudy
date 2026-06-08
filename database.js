// database.js - Cơ sở dữ liệu và thuật toán AI phân tích bộ thủ
const TM_Radicals_Dict = {
    "一": "Bộ Nhất (Số 1) - Khởi đầu.", "丨": "Bộ Cổn - Nét sổ.", "丶": "Bộ Chủ - Điểm chấm.", "丿": "Bộ Phiệt - Nét phẩy.",
    "人": "Bộ Nhân - Con người.", "口": "Bộ Khẩu - Miệng.", "女": "Bộ Nữ - Phụ nữ.", "子": "Bộ Tử - Con cái.",
    "木": "Bộ Mộc - Cây cối.", "水": "Bộ Thủy - Nước.", "钅": "Bộ Kim giản - Thép, kim loại.", "讠": "Bộ Ngôn giản - Ngôn ngữ.",
    "立": "Bộ Lập - Đứng, vị trí.", "耳": "Bộ Nhĩ - Tai.", "日": "Bộ Nhật - Mặt trời.", "月": "Bộ Nguyệt - Trăng.",
    "力": "Bộ Lực - Sức mạnh.", "宀": "Bộ Miên - Mái nhà.", "艹": "Bộ Thảo - Cỏ cây.", "戈": "Bộ Qua - Binh khí.",
    "手": "Bộ Thủ - Bàn tay.", "土": "Bộ Thổ - Đất đai.", "山": "Bộ Sơn - Núi non.", "雨": "Bộ Vũ - Mưa."
};

const AI_Decomposition_Map = {
    "我": ["手", "戈"], "同": ["冂", "口"], "好": ["女", "子"], "劳": ["宀", "艹", "力"],
    "钢": ["钅", "冈"], "板": ["木", "反"], "彩": ["爪", "木", "彡"], "等": ["竹", "土", "寸"],
    "位": ["亻", "立"], "证": ["讠", "正"], "理": ["王", "里"], "经": ["纟", "工"]
};

function executeAIRadicalAnalyzer(char) {
    const box = document.getElementById('panel-radical-analysis');
    if (!box) return;
    let html = "";
    let parts = AI_Decomposition_Map[char] || [];
    
    if(parts.length > 0) {
        parts.forEach(p => { if(TM_Radicals_Dict[p]) html += `<p>➔ <strong>Bộ thủ [ ${p} ]:</strong> ${TM_Radicals_Dict[p]}</p>`; });
    } else {
        Object.keys(TM_Radicals_Dict).forEach(r => {
            if (char.includes(r)) html += `<p>➔ Chứa <strong>Bộ thủ [ ${r} ]:</strong> ${TM_Radicals_Dict[r]}</p>`;
        });
    }
    box.innerHTML = `<div class="radical-header-title">🤖 AI Phân Tích: "${char}"</div>${html || "<p>Nét bút thuận đơn lẻ.</p>"}`;
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth' });
}