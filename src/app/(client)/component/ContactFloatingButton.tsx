// components/FloatingContactButtons.tsx
"use client";

import { useState } from "react";
import {
  Globe,
  MessageCircle,
  MessageSquareText,
  Phone,
  X,
} from "lucide-react";

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3 group">
      {isOpen && (
        <div className="flex flex-col items-center gap-3 transition-all duration-300">
          <a
            href="https://www.facebook.com/share/1Ro1xU7Bbw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full !bg-blue-700 flex items-center justify-center shadow-lg hover:scale-110 transition"
            aria-label="Facebook"
          >
            <Globe size={24} className="text-white" />
          </a>
          <a
            href="tel:0338538203"
            className="w-14 h-14 rounded-full !bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition"
            aria-label="Gọi điện"
          >
            <Phone size={24} className="text-white" />
          </a>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition relative"
          aria-label="Mở menu liên hệ"
        >
          {!isOpen && (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            </>
          )}

          {isOpen ? (
            <X size={26} className="text-white z-10" />
          ) : (
            <MessageCircle size={24} className="text-white z-10" />
          )}
        </button>

        {!isOpen && (
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white text-black !px-3 !py-1 rounded shadow text-sm whitespace-nowrap">
            Liên hệ ngay
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-white shadow-sm"></div>
          </div>
        )}
      </div>
    </div>
  );
}
