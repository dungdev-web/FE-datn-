// Search.tsx
import React, { useState, useEffect, useRef } from "react";
import "../css/home.css";
import "../css/style.css";
import { searchProducts } from "@/services/productService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/env";
import { IProduct } from "@/types/product";

interface SearchProps {
  isSearchOpen: boolean;
  closeSearch: () => void;
}

export default function Search({ isSearchOpen, closeSearch }: SearchProps) {
  const bocRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = () => {
    if (bocRef.current) {
      bocRef.current.style.animation = "slideUp 0.5s ease forwards";
    }
    setTimeout(() => {
      closeSearch();
    }, 500);
  };

  const fetchSuggestions = async (searchKeyword: string) => {
    try {
      setIsLoading(true);
      const result = await searchProducts(searchKeyword, 1, 6);
      setSuggestions(result.products || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm gợi ý:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword.trim() && keyword.length >= 2) {
        fetchSuggestions(keyword);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setShowSuggestions(false);
    closeSearch(); // đóng modal khi nhấn tìm kiếm
    router.push(`/product?q=${encodeURIComponent(keyword)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <>
      {isSearchOpen && (
        <div
          className="boc z-50"
          ref={bocRef}
          style={{ animation: "slideDown 0.5s ease forwards" }}
        >
          <div className="search-bar relative" id="searchBar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, tin tức..."
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
            />
            <i
              className="fa fa-search absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            />

            {/* Gợi ý */}
            {showSuggestions && (suggestions.length > 0 || isLoading) && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 right-0 top-16 bg-white border border-gray-300 rounded-md shadow-lg !mt-2 z-50 max-h-96 overflow-y-auto"
              >
                {isLoading ? (
                  <div className="!p-4 text-center text-gray-500">
                    <i className="fa fa-spinner fa-spin mr-2"></i>
                    Đang tìm kiếm...
                  </div>
                ) : (
                  <>
                    {suggestions.map((product) => (
                      <Link
                        key={product.products_id}
                        href={`/product/${product.slug}`}
                        onClick={() => closeSearch()}
                        className="block !p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              `${API_BASE_URL}/uploads/${product.images?.[0]?.url}` ||
                              "/images/default.png"
                            }
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) =>
                              ((e.target as HTMLImageElement).src =
                                "/images/default.png")
                            }
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-red-600 font-semibold">
                              {formatPrice(product.price)}
                            </p>
                            {product.brand?.name && (
                              <p className="text-sm text-gray-600">
                                {product.brand.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}

                    <div className="!p-3 bg-gray-50 border-t">
                      <button
                        onClick={handleSearch}
                        className="w-full text-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Xem tất cả kết quả cho "{keyword}"
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {showSuggestions &&
              !isLoading &&
              suggestions.length === 0 &&
              keyword.trim() && (
                <div className="absolute left-0 right-0 !mt-30 bg-white border rounded-md shadow-lg z-50 !p-4 text-center text-gray-500">
                  <i className="fa fa-search mr-2" />
                  Không tìm thấy sản phẩm nào cho "{keyword}"
                </div>
              )}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div
          className="overlay1"
          id="overlay1"
          onClick={handleOverlayClick}
          style={{ display: "block" }}
        ></div>
      )}
    </>
  );
}
