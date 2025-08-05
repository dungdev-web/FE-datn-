"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GLTFResult = {
  scene: Group;
};

function ShoeModel({ url, scale = 1 }: { url: string; scale?: number }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url) as GLTFResult;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={ref} scale={scale * 2.5} />;
}

const slides = [
  {
    title: "Giày Thể Thao Cao Cấp 2025",
    subtitle: "Công nghệ Air Cushion thế hệ mới",
    description:
      "Trải nghiệm sự thoải mái tuyệt đối với công nghệ đệm khí tiên tiến, chất liệu cao cấp và thiết kế ergonomic. Phù hợp cho mọi hoạt động từ chạy bộ, tập gym đến dạo phố hàng ngày.",
    features: ["Chống thấm nước", "Thoáng khí", "Chống trượt", "Siêu nhẹ"],
    price: "2.499.000₫",
    originalPrice: "3.299.000₫",
  },
  {
    title: "Sneakers Premium Limited Edition",
    subtitle: "Phong cách Urban Street đỉnh cao",
    description:
      "Bộ sưu tập giới hạn với thiết kế độc đáo, phối màu trendy và chất liệu da thật 100%. Thể hiện cá tính mạnh mẽ và phong cách riêng biệt của bạn trên mọi con phố.",
    features: [
      "Da thật 100%",
      "Phiên bản giới hạn",
      "Thiết kế độc quyền",
      "Bảo hành 2 năm",
    ],
    price: "3.999.000₫",
    originalPrice: "4.999.000₫",
  },
  {
    title: "Running Shoes Performance Max",
    subtitle: "Dành riêng cho vận động viên",
    description:
      "Được thiết kế dành riêng cho các runner chuyên nghiệp với công nghệ đệm Energy Return, đế cao su carbon fiber và upper mesh siêu thoáng. Nâng cao hiệu suất chạy bộ của bạn.",
    features: [
      "Energy Return",
      "Carbon Fiber",
      "Ultra Lightweight",
      "Grip Technology",
    ],
    price: "4.299.000₫",
    originalPrice: "5.499.000₫",
  },
];

export default function Banner3D() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full min-h-screen h-auto md:!mt-20 text-blue-900 flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: isMobile
          ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
          : "url('/images/banner/2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 items-center !gap-4 md:!gap-6 lg:!gap-8 !px-4 sm:px-6 lg:!px-8 relative z-10">
        <div className="flex flex-col !space-y-4 lg:!space-y-6 order-2 lg:order-1">
          <div className="relative h-auto min-h-[450px] md:min-h-[400px] lg:min-h-[450px] overflow-hidden">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  i === index
                    ? "transform translate-x-0 opacity-100"
                    : i < index
                    ? "transform -translate-x-full opacity-0"
                    : "transform translate-x-full opacity-0"
                }`}
              >
                <div className="!space-y-1">
                  <div className="inline-block">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white !px-3 !py-1 rounded-full text-xs sm:text-sm font-semibold">
                      NEW ARRIVAL
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600 font-semibold">
                    {slide.subtitle}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slide.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 !px-2 sm:!px-3 !py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center !gap-2 sm:!gap-3">
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">
                      {slide.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through">
                        {slide.originalPrice}
                      </span>
                      <span className="bg-red-500 text-white !px-2 !py-1 rounded text-xs sm:text-sm font-bold">
                        -24%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row !gap-3 !pt-2">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm sm:text-base lg:text-lg !px-10 sm:!px-8 lg:!px-10 !py-2 sm:!py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      MUA NGAY
                    </button>
                    <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm sm:text-base lg:text-lg !px-10 sm:!px-8 lg:!px-10 !py-2 sm:!py-3 rounded-full transition-all duration-300">
                      CHI TIẾT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center !gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] bg-transparent order-1 lg:order-2">
          <Canvas
            camera={{
              position: [0, 1.5, isMobile ? 8 : 6],
              fov: isMobile ? 50 : 45,
            }}
            style={{ touchAction: "none" }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 2, 5]} intensity={2} />
            <ShoeModel url="/models/shoes1.glb" scale={isMobile ? 0.4 : 0.28} />
            <Environment preset="city" background={false} />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={isMobile ? 0.8 : 1.2}
              enablePan={false}
              touches={{
                ONE: 2,
                TWO: 0,
              }}
            />
          </Canvas>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 !p-2 sm:!p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20 text-lg sm:text-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 !p-2 sm:!p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20 text-lg sm:text-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
