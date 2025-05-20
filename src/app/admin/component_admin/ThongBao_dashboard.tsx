import React, { useEffect, useRef, useState } from "react";

const messages = [
  "🎉 Chào mừng bạn đến với trang quản trị!",
  "🚀 Tính năng mới đã ra mắt!",
  "🛠️ Hệ thống sẽ bảo trì lúc 22h hôm nay!",
  "📢 Đừng quên kiểm tra các bài viết mới!",
];

export default function ScrollingNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.transform = "translateX(100%)";

    const start = setTimeout(() => {
      const width = el.scrollWidth;
      el.style.transition = "transform 8s linear";
      el.style.transform = `translateX(-${width}px)`;
    }, 100);

    const end = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 8500);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [index]);

  return (
    <div className="relative h-12 bg-yellow-100 text-black px-4 flex items-center">
      {visible && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            zIndex: 100000,
            left: "690px",
            bottom: "50px",
            color: "#dc2626", 
          }}
          className="absolute whitespace-nowrap font-semibold text-red-600"
        >
          {messages[index]}
        </div>
      )}
    </div>
  );
}
