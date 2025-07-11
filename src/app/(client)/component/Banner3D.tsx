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

useGLTF.preload("/models/shoe1.glb");

export default function Banner3D() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#021688] to-[#0642a4] text-white flex flex-col justify-center items-center">
      <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 py-12">
        {/* LEFT: TEXT */}
        <div className="space-y-6 text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Giày thời trang mới nhất 2025
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Công nghệ tiên tiến, chất liệu cao cấp, phong cách hiện đại.
          </p>
          <button className="border border-white text-white !mt-3 font-semibold text-lg !px-12 !py-2 rounded-full hover:bg-green-500 transition-all">
            Mua ngay
          </button>
        </div>

        {/* RIGHT: 3D */}
        <div className="h-[500px] w-full bg-transparent">
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
