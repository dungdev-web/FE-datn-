"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./showsearch";
import TopCart from "./TopCart";
import MenuRight from "./menu_right";
import Link from "next/link";
import LinkWithLoader from "./LinkContext";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { ICategory } from "@/types/ICategory";
import { IBrand } from "@/types/IBrand";
import { getCategories } from "@/services/categoryService";
import { getBrands } from "@/services/brandService";
import { getCartByUserId } from "@/services/cartService";
import { getWishlistByUserId } from "@/services/wishlistService";
import { getCompareProduct } from "@/services/productService";
import { useGlobalStore } from "@/store/useGlobalStore";
import SearchWithSuggestions from "./SearchWithSuggestions";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const cartPopupRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const navRef = useRef(0);
  const lastScrollTop = useRef(0);
  const { user } = useAuthUser();
  let hideTimeout = null;
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const {
    wishlistCount,
    compareCount,
    cartCount: cartItemCount,
    setWishlistCount,
    setCompareCount,
    setCartCount,
  } = useGlobalStore();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/product?q=${encodeURIComponent(keyword)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  useEffect(() => {
    getBrands().then(setBrands);
  }, []);
  useEffect(() => {
    const cartIcon = cartIconRef.current;
    const cartPopup = cartPopupRef.current;

    if (!cartIcon || !cartPopup) return;

    let hideTimeout: ReturnType<typeof setTimeout>;

    const showPopup = () => {
      clearTimeout(hideTimeout);
      cartPopup.style.display = "block";
    };

    const hidePopup = () => {
      hideTimeout = setTimeout(() => {
        if (!cartIcon.matches(":hover") && !cartPopup.matches(":hover")) {
          cartPopup.style.display = "none";
        }
      }, 200);
    };

    cartIcon.addEventListener("mouseenter", showPopup);
    cartIcon.addEventListener("mouseleave", hidePopup);
    cartPopup.addEventListener("mouseenter", showPopup);
    cartPopup.addEventListener("mouseleave", hidePopup);

    return () => {
      cartIcon.removeEventListener("mouseenter", showPopup);
      cartIcon.removeEventListener("mouseleave", hidePopup);
      cartPopup.removeEventListener("mouseenter", showPopup);
      cartPopup.removeEventListener("mouseleave", hidePopup);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY) {
        // Scroll lên
        setIsScrolledUp(true);
      } else {
        // Scroll xuống
        setIsScrolledUp(false);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user?.id) return;

      try {
        const cartData = await getCartByUserId(user.id);
        const totalItems =
          cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(totalItems);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
      }
    };

    fetchCartCount();
  }, [user]);
  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!user?.id) return;

      try {
        const wishlist = await getWishlistByUserId(user.id);
        setWishlistCount(wishlist.length);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng yêu thích:", error);
      }
    };

    fetchWishlistCount();
  }, [user]);
  useEffect(() => {
    const fetchCompareCount = async () => {
      if (!user?.id) return;

      try {
        const compare = await getCompareProduct(user.id);
        setCompareCount(compare.length);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng yêu thích:", error);
      }
    };

    fetchCompareCount();
  }, [user]);
  // Hàm mở tìm kiếm
  const toggleSearch = () => {
    setIsSearchOpen(true);
  };

  // Hàm đóng tìm kiếm
  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const menu = menuRef.current;
    const megaMenu = megaMenuRef.current;
    if (!menu || !megaMenu) return;

    let hideTimeout: ReturnType<typeof setTimeout>;

    const showMegaMenu = () => {
      clearTimeout(hideTimeout);
      setIsMegaMenuOpen(true);
    };

    const hideMegaMenu = () => {
      hideTimeout = setTimeout(() => {
        // Nếu megaMenu không đang hover thì đóng
        if (!menu.matches(":hover") && !megaMenu.matches(":hover")) {
          setIsMegaMenuOpen(false);
        }
      }, 200);
    };

    menu.addEventListener("mouseenter", showMegaMenu);
    menu.addEventListener("mouseleave", hideMegaMenu);
    megaMenu.addEventListener("mouseleave", () => setIsMegaMenuOpen(false));

    return () => {
      menu.removeEventListener("mouseenter", showMegaMenu);
      menu.removeEventListener("mouseleave", hideMegaMenu);
      megaMenu.removeEventListener("mouseleave", () =>
        setIsMegaMenuOpen(false)
      );
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollTop.current) {
        setShowNav(false);
      } else {
        if (currentScroll === 0) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
      setIsScrolled(currentScroll > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="header-nav-bg ">
      {isScrolledUp && <div className="bg-header-layer"></div>}
      <header className={isScrolled ? "scrolled" : ""}>
        <div
          className="icon-left"
          style={{ display: "none", cursor: "pointer" }}
        >
          <i className="fa fa-bars" onClick={openMenu}></i>
          <div className="icon-search" onClick={toggleSearch}>
            <i className="fa fa-search"></i>
          </div>
        </div>
        <div className="logo-header">
          <Link href={"/"}>
            <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="" />
          </Link>
        </div>
        <div className="iconphone-header">
          <div className="iconphon-header1">
            <i className="fa-solid fa-phone"></i> Gọi ngay:
            <span className="sdt-header">0338538203</span>
          </div>
        </div>
        <div className="icon-header">
          <div
            className={`iconuser-header div1 ${
              user ? "logged-in" : "logged-out"
            }`}
          >
            <div className="login-mini inline-flex items-center px-2 py-1 rounded">
              {user ? (
                <Link
                  href="/account"
                  className="cursor-pointer !text-white text-[14px] whitespace-nowrap"
                >
                  Chào {user.name}
                </Link>
              ) : (
                <Link href="/login">
                  <i className="fa-solid fa-user cursor-pointer text-white"></i>
                </Link>
              )}
            </div>
          </div>

          <div
            className="iconheart-header div data_wishlist"
            data-count={user ? wishlistCount : 0}
          >
            <Link href="/wishlist">
              <i className="fa-solid fa-heart"></i>
            </Link>
          </div>

          <div
            className="iconcompare-header div data_compare_product"
            data-count={user ? compareCount : 0}
          >
            <Link href="/compare_product">
              <i className="fa fa-exchange"></i>
            </Link>
          </div>

          <div className="cart-wrapper">
            <div
              className="iconcart-header div data_cart"
              data-count={user ? cartItemCount : 0}
            >
              <Link href="/cart">
                <i className="fa fa-shopping-bag" ref={cartIconRef}></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Search isSearchOpen={isSearchOpen} closeSearch={closeSearch} />
      <TopCart ref={cartPopupRef} />
      <MenuRight isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      {showNav && (
        <nav className="transition-all duration-300">
          <div className="menu-nav">
            <ul>
              <li>
                <LinkWithLoader href="/">Trang Chủ</LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/about">Giới thiệu</LinkWithLoader>
              </li>
              <li className="has-mega-menu" ref={menuRef}>
                <LinkWithLoader href="/product">Sản phẩm</LinkWithLoader>
                <div
                  className="mega-menu"
                  ref={megaMenuRef}
                  style={{ display: isMegaMenuOpen ? "block" : "none" }}
                >
                  <div className="mega-columns-wrapper">
                    <div className="mega-column">
                      <h4>DANH MỤC MỚI NHẤT</h4>
                      {categories.map((cat) => (
                        <a
                          key={cat.categories_id}
                          href={`/category/${cat.slug}`}
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>

                    <div className="mega-column">
                      <h4>NHÃN HIỆU MỚI NHẤT</h4>
                      <div className="mega-brands">
                        {brands.map((brand) => (
                          <a
                            key={brand.brand_id}
                            href={`/brand/${brand.brand_id}`}
                          >
                            {brand.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mega-images">
                    <img src="/images/banner/mega-menu-images1.webp" alt="" />
                    <img src="/images/banner/mega-menu-images2.webp" alt="" />
                  </div>
                </div>
              </li>

              <li>
                <LinkWithLoader href="/blog">Tin tức</LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/contact">Liên hệ</LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/account">Tài khoản</LinkWithLoader>
              </li>
            </ul>
            <SearchWithSuggestions />
          </div>
        </nav>
      )}
    </div>
  );
}
