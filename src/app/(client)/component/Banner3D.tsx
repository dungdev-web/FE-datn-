"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { ShoeModel } from "./ShoesModel";

type GLTFResult = {
  scene: Group;
};

function RotatingShoe({ url }: { url: string }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url) as GLTFResult;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // auto rotate nhẹ
    }
  });

  return <primitive object={scene} ref={ref} scale={2.5} />;
}

useGLTF.preload("/models/shoes1.glb");
const slides = [
  {
    title: "Giày thời trang mới nhất 2025",
    description: "Công nghệ tiên tiến, chất liệu cao cấp, phong cách hiện đại.",
  },
  {
    title: "Thoải mái và bền bỉ",
    description: "Thích hợp cho mọi hoạt động hàng ngày và thể thao.",
  },
  {
    title: "Phong cách dẫn đầu xu hướng",
    description: "Thiết kế tinh tế, hiện đại, dễ phối đồ.",
  },
];
export default function Banner3D() {
  const [index, setIndex] = useState(0);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full h-screen text-blue-900 flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/banner/2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12">
        <div className="flex flex-col items-center !text-center space-y-6 transition-all duration-500 ease-in-out">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold !leading-[1.3] sm:leading-snug md:leading-tight">
            {slides[index].title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-600 max-w-md !leading-[1.8] sm:leading-relaxed md:leading-loose">
            {slides[index].description}
          </p>
          <div className="flex justify-center">
            <button className="border border-[#021688] text-[#021688] font-semibold text-base sm:text-lg !px-8 !py-2 rounded-full hover:bg-green-500 transition-all">
              Mua ngay
            </button>
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-transparent px-6 sm:px-8 md:px-12">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 2, 5]} intensity={2} />
            <ShoeModel url="/models/shoes1.glb" scale={0.7} />
            <Environment preset="city" background={false} />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.2}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
