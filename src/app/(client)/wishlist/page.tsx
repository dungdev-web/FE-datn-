"use client";
import { useEffect, useState } from "react";
import { getWishlistByUserId } from "@/services/wishlistService";
import { IWishlistItemWithProduct } from "@/types/wishlist";
import "../css/product.css";
import "../css/wishlist.css";
import { useAuthUser } from "@/hooks/useAuthUser";
import ProductIcons from "../component/products/ProductIcons";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<IWishlistItemWithProduct[]>([]);
  const { user } = useAuthUser();

  useEffect(() => {
    if (!user?.id) return; //

    const fetchWishlist = async () => {
      try {
        const data = await getWishlistByUserId(user.id);
        setWishlist(data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };

    fetchWishlist();
  }, [user?.id]); //
  if (!user) {
    return (
      <>
        <section
          className="bread-crumb background-cover relative"
          style={{
            backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>
          <div className="breadcrumb-container">
            <div className="title-page">
              <h2>Sản phẩm yêu thích</h2>
            </div>
            <ul className="breadcrumb">
              <li className="home">
                <a href="/" title="Trang chủ">
                  <span>Trang chủ</span>
                </a>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </li>
              <li>
                <strong>
                  <span>Sản phẩm yêu thích</span>
                </strong>
              </li>
            </ul>
          </div>
        </section>
        <div className="container1 py-10 px-4 text-center !mt-6 !mb-6">
          <div className="inline-flex flex-col items-center justify-center gap-3 bg-red-50 border border-red-300 p-6 rounded-md shadow-sm">
            <i className="fa-solid fa-circle-exclamation text-red-500 text-4xl"></i>
            <p className="text-lg font-medium text-red-600">
              Vui lòng{" "}
              <a href="/login" className="underline hover:text-red-800">
                đăng nhập
              </a>{" "}
              để xem sản phẩm yêu thích.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <section
        className="bread-crumb background-cover relative"
        style={{
          backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>
        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Sản phẩm yêu thích</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Sản phẩm yêu thích</span>
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <main>
        <div className="container1">
          <div className="row">
            {/* Desktop */}
            <div className="product-grid-wishlist">
              {wishlist.map((item) => {
                const product = item.product;
                const variant = product.product_variants?.[0];

                // Nếu không có variant thì bỏ qua
                if (!variant) {
                  console.warn("Không có variant cho sản phẩm:", product.name);
                  return null;
                }
                const image = product.images.find(
                  (img) => img.type === "main"
                )?.url;

                return (
                  <div
                    key={item.wishlist_items_id}
                    className="product-itemlist-main !block"
                  >
                    <div className="product-card" style={{ width: "238px" }}>
                      <div className="product-image">
                        <img src={image} alt={product.name} />
                        <ProductIcons
                          productId={product.products_id}
                          variant_id={
                            product.product_variants?.[0]
                              ?.product_variants_id ?? null
                          }
                          price={product.sale_price}
                        />

                        {product.price > product.sale_price && (
                          <span className="discount-tag">
                            -
                            {Math.round(
                              ((product.price - product.sale_price) /
                                product.price) *
                                100
                            )}
                            %
                          </span>
                        )}
                      </div>
                      <h4 className="product-title">{product.name}</h4>
                      <div className="product-price">
                        {product.price !== product.sale_price && (
                          <span className="old-price">
                            <del>{product.price.toLocaleString()}₫</del>
                          </span>
                        )}
                        <span className="new-price">
                          {product.sale_price.toLocaleString()}₫
                        </span>
                      </div>
                      <div className="product-rating">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <i
                            key={i}
                            className={`fa-${
                              i <= 4 ? "solid" : "regular"
                            } fa-star`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile */}
            <div className="product-grid-wishlist-list">
              {wishlist.map((item) => {
                const product = item.product;
                const image = product.images.find(
                  (img) => img.type === "main"
                )?.url;

                return (
                  <div
                    key={item.wishlist_items_id}
                    className="product-itemlist-main"
                  >
                    <div className="product-card">
                      <div className="product-image">
                        <img src={image} alt={product.name} />
                        <ProductIcons
                          productId={product.product_id}
                          variant_id={
                            product.product_variants?.[0]
                              ?.product_variants_id ?? null
                          }
                          price={product.sale_price}
                        />

                        {product.price > product.sale_price && (
                          <span className="discount-tag">
                            -
                            {Math.round(
                              ((product.price - product.sale_price) /
                                product.price) *
                                100
                            )}
                            %
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="product-content w-full">
                      <h4 className="product-title">{product.name}</h4>
                      <div className="product-price">
                        {product.price !== product.sale_price && (
                          <span className="old-price">
                            <del>{product.price.toLocaleString()}₫</del>
                          </span>
                        )}
                        <span className="new-price">
                          {product.sale_price.toLocaleString()}₫
                        </span>
                      </div>
                      <div className="product-rating">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <i
                            key={i}
                            className={`fa-${
                              i <= 4 ? "solid" : "regular"
                            } fa-star`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
