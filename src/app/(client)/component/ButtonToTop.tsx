"use client";
import { useEffect, useState } from "react";

export default function ButtonToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        bg-[#021688] hover:bg-[#031a95] h-[50px] w-[50px] flex items-center justify-center
        text-white !p-5 rounded-[50%] shadow-2xl hover:scale-110 active:scale-95
        focus:outline-none text-2xl`}
      title="Lên đầu trang"
    >
      <i className="fa fa-level-up" />
    </button>
  );
}
