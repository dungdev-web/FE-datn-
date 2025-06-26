"use client";
import React, { useEffect, useRef } from "react";

export default function ScrollingNotification() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const clone = el.innerHTML;
    el.innerHTML += clone; // Lặp lại nội dung để tạo hiệu ứng vô hạn
  }, []);

  return (
    <div className="marquee-wrapper bg-yellow-100 h-12 flex items-center ">
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee-content font-semibold text-red-600">
          <span className="mx-4">⚡ GIẢM 15% CHO ĐH ĐẦU TIÊN TỪ 699K</span>
          <span className="mx-4">⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH</span>
          <span className="mx-4">⚡ GIẢM 20% CHO ĐH TỪ 1.500K</span>
          <span className="mx-4">⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH 599K</span>
          <span className="mx-4">⚡ GIẢM 15% CHO ĐH ĐẦU TIÊN TỪ 699K</span>
          <span className="mx-4">⚡ MIỄN PHÍ VẬN CHUYỂN TỪ ĐH 599K ⚡</span>
        </div>
      </div>
    </div>
  );
}
