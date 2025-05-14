import React, { useEffect, useRef, useState } from "react";

const messages = [
  "🎉 Chào mừng bạn đến với trang quản trị!",
  "🚀 Tính năng mới đã ra mắt!",
  "🛠️ Hệ thống sẽ bảo trì lúc 22h hôm nay!",
  "📢 Đừng quên kiểm tra các bài viết mới!",
];

export default function ScrollingNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    // Reset vị trí
    el.style.transition = "none";
    el.style.transform = "translateX(100%)";

    // Hiển thị và bắt đầu chạy
    setVisible(true);
    const start = setTimeout(() => {
      const width = el.scrollWidth;
      el.style.transition = "transform 8s linear";
      el.style.transform = `translateX(-${width}px)`;
    }, 100);

    // Sau khi chạy xong, chuyển thông báo khác
    const end = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 500);
    }, 8500);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden h-12 bg-yellow-100 text-black px-4 flex items-center">
      {visible && (
        <div
          ref={messageRef}
          className="whitespace-nowrap font-semibold text-sm"
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            zIndex: 10,
            color: "#dc2626", // red-600
          }}
        >
          {messages[currentIndex]}
        </div>
      )}
    </div>
  );
}
