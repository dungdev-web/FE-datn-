"use client";
import React, { useRef, useState } from "react";
import "../css/detail.css"; // hoặc nhúng vào global.css

interface ZoomImageProps {
  src: string;
  alt: string;
}

export default function ZoomImage({ src, alt }: ZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } = containerRef.current!.getBoundingClientRect();
    let x = e.clientX - left - 50;
    let y = e.clientY - top - 50;

    x = Math.max(0, Math.min(x, width - 100));
    y = Math.max(0, Math.min(y, height - 100));

    setLensPosition({ x, y });
  };

  return (
    <div
      className="image-zoom-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img src={src} alt={alt} className="main-image" />
      {showZoom && (
        <>
          <div
            className="zoom-lens"
            style={{ left: lensPosition.x, top: lensPosition.y }}
          />
          <div
            className="zoom-result"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `-${lensPosition.x * 2}px -${lensPosition.y * 2}px`,
              backgroundSize: `800px 800px`,
            }}
          />
        </>
      )}
    </div>
  );
}
