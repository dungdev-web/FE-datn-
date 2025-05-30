"use client";
import { useEffect, useState } from "react";
import productSale from "../component/product_sale";
import ProductSale from "../component/product_sale";

export default function SalePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 2); // Đặt thời gian kết thúc +2h

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

return (
    <div className="w-[90%] mx-auto"> {/* Bọc toàn bộ nội dung */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh]">
        {/* LEFT SIDE */}
        <div className="relative h-full w-full flex items-center justify-center text-white bg-cover bg-center bg-no-repeat bg-flash-sale">
          <div className="relative z-10 text-center px-4 py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ưu đãi lớn sắp kết thúc
            </h2>
            <div className="grid grid-cols-4 gap-4 bg-white text-black rounded-lg px-6 py-4 mb-6 max-w-md mx-auto">
              {/* Time left */}
              {["days", "hours", "minutes", "seconds"].map((key, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold">{timeLeft[key]}</div>
                  <div className="text-sm">
                    {["Ngày", "Giờ", "Phút", "Giây"][i]}
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-lg">
              MUA SẮM NGAY
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center items-center text-center px-6 py-8">
          <div className="slider-wrapper">
            <div className="product-slider-track">
              <ProductSale />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
