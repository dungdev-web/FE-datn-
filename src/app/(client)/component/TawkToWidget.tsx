"use client"; // nếu bạn dùng Next.js App Router

import { useEffect } from "react";

export default function TawkToWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/68882eb1c99c121929b66360/1j19vcpiu";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
