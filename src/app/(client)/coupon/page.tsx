'use client';

export default function CouponPage() {
  const coupons = [
    { code: "FISHOES", percent: "10%", desc: "Mã giảm 13% khi mua 2 sản phẩm" },
    { code: "FISHOES2", percent: "13%", desc: "Mã giảm 13% khi mua 2 sản phẩm" },
    { code: "FISHOES3", percent: "18%", desc: "Mã giảm 18% khi mua 3 sản phẩm" },
    { code: "FISHOES4", percent: "20%", desc: "Mã giảm 20% khi mua 4 sản phẩm" },
  ];

  const openModal = (code: string, desc: string) => {
    const modal = document.getElementById("modal");
    const modalCode = document.getElementById("modal-code");
    const modalCodeDetail = document.getElementById("modal-code-detail");
    const modalDesc = document.getElementById("modal-desc");

    if (modal && modalCode && modalCodeDetail && modalDesc) {
      modal.style.display = "flex";
      modalCode.textContent = code;
      modalCodeDetail.textContent = code;
      modalDesc.textContent = `${desc} - Mỗi khách hàng được sử dụng tối đa 1 lần - Số lượng voucher có hạn`;
    }
  };

  const copyCode = () => {
    const code = document.getElementById("modal-code-detail")?.textContent || "";
    navigator.clipboard.writeText(code).then(() => {
      alert(`Đã sao chép mã: ${code}`);
    });
  };

  const closeModal = () => {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  };

  return (
    <div className="bg-gray-100 p-5">

      <div className="flex flex-wrap gap-5 justify-center w-[90%] mx-auto mt-[500px]">
        {coupons.map((item, i) => (
          <div key={i} className="w-[300px] bg-white border-2 border-dashed border-gray-300 rounded-md shadow-md flex relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[80%] w-[10px] bg-white border-l border-dashed border-gray-300 z-10"></div>

            <div className="w-[80%] p-3">
              <div className="text-red-600 text-sm mb-1">Mã: {item.code}</div>

              <div className="border border-gray-300 text-center p-2 mb-1">
                <div className="bg-red-600 text-white text-xs px-2 py-1 inline-block mb-1">MÃ GIẢM</div>
                <div className="text-xl font-bold">{item.percent}</div>
              </div>

              <div className="text-xs mb-1">{item.desc}</div>

              <div className="flex justify-between items-center gap-2 mt-1">
                <button
                  onClick={() => openModal(item.code, item.desc)}
                  className="text-xs text-blue-600 underline"
                >
                  Điều kiện áp dụng
                </button>
                <button className="bg-blue-950 text-white text-xs px-2 py-1 rounded">Sao chép mã</button>
              </div>
            </div>

            <div className="w-[20%] bg-green-400 text-white font-bold text-sm text-center writing-vertical p-2 tracking-widest">
              PHIẾU GIẢM GIÁ
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div id="modal" style={{ display: "none" }} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000]">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-[450px] text-sm shadow-lg leading-relaxed">
          <h2 className="text-base font-bold">Mã: <span id="modal-code" className="text-orange-600"></span></h2>
          <p><strong>Mã khuyến mãi:</strong> <span id="modal-code-detail"></span></p>
          <p><strong>Điều kiện:</strong></p>
          <p id="modal-desc"></p>
          <div className="text-right mt-4 space-x-2">
            <button onClick={copyCode} className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Sao chép mã</button>
            <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded font-bold">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}
