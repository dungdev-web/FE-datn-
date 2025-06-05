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
        bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700
        text-white !p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95
        focus:outline-none text-2xl`}
      title="Lên đầu trang"
    >
      <i className="fa fa-level-up" />
    </button>
  );
}
