"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
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

export default function Banner3D() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#021688] to-[#0642a4] text-white flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12">
        <div className="space-y-6 text-left !px-12 sm:px-8 md:px-12">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold !leading-snug md:!leading-tight">
            Giày thời trang mới nhất{" "}
            <span className="text-green-400">2025</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md">
            Công nghệ tiên tiến, chất liệu cao cấp, phong cách hiện đại.
          </p>
          <button className="border border-white text-white !mt-2 sm:!mt-3 font-semibold text-base sm:text-lg !px-8 sm:!px-12 !py-2 rounded-full hover:bg-green-500 transition-all">
            Mua ngay
          </button>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-transparent px-6 sm:px-8 md:px-12">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 2, 5]} intensity={2} />
            <ShoeModel url="/models/shoes1.glb" scale={0.5} />
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
