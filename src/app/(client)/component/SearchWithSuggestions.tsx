import React, { useState, useEffect, useRef } from "react";
import { searchProducts } from "@/services/productService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/env";
import { IProduct } from "@/types/product";

const SearchWithSuggestions = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setShowSuggestions(false);
    router.push(`/product?q=${encodeURIComponent(keyword)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  
  return (
    <div className="search-container relative" ref={searchRef}>
      <div className="seach-nav relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="input-search-nav !text-black w-full"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
        />
        <i
          className="fa-solid fa-magnifying-glass cursor-pointer"
          onClick={handleSearch}
        />

        {isLoading && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          </div>
        )}
      </div>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div
          ref={suggestionsRef}
          className="search-suggestions absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
          style={{
            marginTop: "2px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <i className="fa fa-spinner fa-spin mr-2"></i>
              Đang tìm kiếm...
            </div>
          ) : (
            <>
              {suggestions.map((product) => (
                <Link
                  key={product.products_id}
                  href={`/product/${product.slug}`}
                  className="suggestion-item block !p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img
                        src={
                          `${API_BASE_URL}/uploads/${product.images?.[0]?.url}` ||
                          "/images/default.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/default.png";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-base font-medium text-gray-900 truncate leading-relaxed">
                        {product.name}
                      </p>
                      <div className="flex items-center space-x-3">
                        <p className="text-base font-semibold text-red-600">
                          {formatPrice(product.price)}
                        </p>
                        {product.price && product.price > product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>
                      {product.brand && (
                        <p className="text-sm text-gray-600 font-medium">
                          {product.brand.name}
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <i className="fa fa-chevron-right text-gray-400 text-sm"></i>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="!p-3 bg-gray-50 border-t">
                <button
                  onClick={handleSearch}
                  className="w-full text-center text-blue-600 hover:text-blue-800 text-base font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Xem tất cả{" "}
                  {suggestions.length > 0
                    ? `kết quả cho "${keyword}"`
                    : "kết quả"}
                  <i className="fa fa-arrow-right ml-2"></i>
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
          <div
            ref={suggestionsRef}
            className="search-suggestions absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50"
            style={{
              marginTop: "2px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="p-6 text-center text-gray-500">
              <i className="fa fa-search !mr-2 text-lg"></i>
              <p className="text-base">
                Không tìm thấy sản phẩm nào cho "{keyword}"
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchWithSuggestions;
