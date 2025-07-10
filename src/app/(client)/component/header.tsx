"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./showsearch";
import TopCart from "./top_cart";
import MenuRight from "./menu_right";
import LoginMenu from "./login_regis_forgot_modal";
import Link from "next/link";
import LinkWithLoader from "./LinkContext";
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

  const navRef = useRef(0);
  const lastScrollTop = useRef(0);
  const userId = 1;
  let hideTimeout = null;
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
      console.log(
        "scrollY:",
        currentScroll,
        "lastScrollTop:",
        lastScrollTop.current
      );

      if (currentScroll > lastScrollTop.current) {
        console.log("scrolling down -> hide nav");
        setShowNav(false);
      } else {
        if (currentScroll === 0) {
          console.log("scrolling up to top -> show nav");
          setShowNav(true);
        } else {
          console.log("scrolling up but not top -> hide nav");
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
              userId === 1 ? "logged-in" : "logged-out"
            }`}
          >
            <div className="login-mini inline-flex items-center px-2 py-1 rounded">
              {userId === 1 ? (
                <Link
                  href="/account"
                  className="cursor-pointer !text-white text-[14px] whitespace-nowrap"
                >
                  Chào Tan Truc
                </Link>
              ) : (
                <Link href="/login">
                  <i className="fa-solid fa-user cursor-pointer text-white"></i>
                </Link>
              )}
            </div>
          </div>

          <div className="iconheart-header div">
            <Link href="/wishlist">
              <i className="fa-solid fa-heart"></i>
            </Link>
          </div>
          <div className="iconcompare-header div">
            <Link href="/compare_product">
              <i className="fa fa-exchange"></i>
            </Link>
          </div>

          <div className="cart-wrapper">
            <div className="iconcart-header div">
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
                      <h4>SẢN PHẨM MỚI NHẤT</h4>
                      <a href="#">Giày chạy bộ nam</a>
                      <a href="#">Giày Nike Air Zoom</a>
                      <a href="#">Giày Adidas Ultraboost</a>
                      <a href="#">Giày thể thao mùa hè</a>
                    </div>

                    <div className="mega-column">
                      <h4>SẢN PHẨM NỔI BẬT</h4>
                      <a href="#">Giày Sneaker nam</a>
                      <a href="#">Giày cao gót nữ</a>
                      <a href="#">Giày lười thời trang</a>
                    </div>

                    <div className="mega-column">
                      <h4>SẢN PHẨM BÁN CHẠY</h4>
                      <a href="#">Giày Puma Suede</a>
                      <a href="#">Nike Air Max 90</a>
                      <a href="#">Giày Vans Old Skool</a>
                    </div>

                    <div className="mega-column">
                      <h4>DANH MỤC MỚI NHẤT</h4>
                      <a href="#">Giày thời trang nam</a>
                      <a href="#">Giày thể thao nữ</a>
                      <a href="#">Giày đi học</a>
                    </div>

                    <div className="mega-column">
                      <h4>NHÃN HIỆU MỚI NHẤT</h4>
                      <a href="#">Converse</a>
                      <a href="#">New Balance</a>
                      <a href="#">Bitis Hunter</a>
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
            <div className="seach-nav">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="input-search-nav !text-black"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
