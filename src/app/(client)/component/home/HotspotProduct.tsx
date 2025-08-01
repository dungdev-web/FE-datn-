"use client";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { getBestSellingMockProducts } from "@/services/productService";
import { API_BASE_URL } from "@/config/env";

interface Props {
  openIndex: string | null;
  setOpenIndex: (index: string | null) => void;
  togglePopup: (index: string, e: React.MouseEvent) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}


export default function HotspotLookbook({
  openIndex,
  setOpenIndex,
  togglePopup,
  containerRef,
}: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getBestSellingMockProducts(4);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const renderProductPopup = (index: number) => {
    const product = products[index];

    if (!product) {
      console.warn(` Không tìm thấy sản phẩm ở index ${index}`);
      return (
        <div className="product-info">
          <p>Sản phẩm không khả dụng</p>
        </div>
      );
    }

    const variantImage = product.product_variants?.[0]?.color?.images;
    const mainImage = product.images?.find((img) => img.type === "main")?.url;
    const fallbackImage = product.images?.[0]?.url;

    const imageUrl = variantImage
      ? `${API_BASE_URL}/uploads/${variantImage}`
      : mainImage
      ? `${API_BASE_URL}/uploads/${mainImage}`
      : fallbackImage
      ? `${API_BASE_URL}/uploads/${fallbackImage}`
      : "/images/noimage.webp";

    return (
      <>
        <a href={`/product/${product.slug}`}>
          <img src={imageUrl} alt={product.name} />
        </a>
        <div className="product-info">
          <h4>{product.name}</h4>
          <p>
            {Number(product.sale_price || product.price).toLocaleString("vi-VN")}₫
          </p>
        </div>
        <span className="close-popup" onClick={() => setOpenIndex(null)}>
          &times;
        </span>
      </>
    );
  };

  return (
    <div className="lookbook-images" ref={containerRef}>
      {/* Image 1 */}
      <div className="image-container">
        <img src="/images/blog/section_home_banner1.webp" alt="Giày nam" />
        <div
          className="product-hotspot"
          style={{ top: "71%", left: "71%", position: "absolute" }}
        >
          <button
            className="hotspot-btn"
            onClick={(e) => togglePopup("1-1", e)}
          >
            +
          </button>
          {openIndex === "1-1" && (
            <div className="product-popup">{renderProductPopup(0)}</div>
          )}
        </div>
        <div
          className="product-hotspot"
          style={{ top: "86%", left: "30%", position: "absolute" }}
        >
          <button
            className="hotspot-btn"
            onClick={(e) => togglePopup("1-2", e)}
          >
            +
          </button>
          {openIndex === "1-2" && (
            <div className="product-popup">{renderProductPopup(1)}</div>
          )}
        </div>
      </div>

      {/* Image 2 */}
      <div className="image-container">
        <img src="/images/blog/section_home_banner2.webp" alt="Giày nữ" />
        <div
          className="product-hotspot"
          style={{ top: "90%", left: "85%", position: "absolute" }}
        >
          <button
            className="hotspot-btn"
            onClick={(e) => togglePopup("2-1", e)}
          >
            +
          </button>
          {openIndex === "2-1" && (
            <div className="product-popup">{renderProductPopup(2)}</div>
          )}
        </div>
        <div
          className="product-hotspot"
          style={{ top: "70%", left: "46%", position: "absolute" }}
        >
          <button
            className="hotspot-btn"
            onClick={(e) => togglePopup("2-2", e)}
          >
            +
          </button>
          {openIndex === "2-2" && (
            <div className="product-popup">{renderProductPopup(3)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
