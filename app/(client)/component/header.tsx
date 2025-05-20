"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./showsearch";
import TopCart from "./top_cart";
import MenuRight from "./menu_right";
import LoginMenu from "./login_regis_forgot_modal";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const cartPopupRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  return (
    <div className="header-nav-bg">
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
          <img src="/images/logo/NBDT__1_-removebg-preview.png" alt="" />
        </div>
        <div className="iconphone-header">
          <div className="iconphon-header1">
            <i className="fa-solid fa-phone"></i> Gọi ngay:
            <span className="sdt-header">0338538203</span>
          </div>
        </div>
        <div className="icon-header">
          <div className="iconuser-header div">
            <div className="login-mini">
              <i className="fa-solid fa-user cursor-pointer"  onClick={() => setShowLogin(true)}></i>
            </div>
          </div>
          <div className="iconheart-header div">
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="iconcompare-header div">
            <i className="fa fa-exchange"></i>
          </div>

          <div className="cart-wrapper">
            <div className="iconcart-header div">
              <i className="fa fa-shopping-bag" ref={cartIconRef}></i>
            </div>
          </div>
        </div>
      </header>
      <Search isSearchOpen={isSearchOpen} closeSearch={closeSearch} />
      <TopCart ref={cartPopupRef} />
      <MenuRight isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <LoginMenu isOpen={showLogin} onClose={() => setShowLogin(false)} />

      <nav>
        <div className="menu-nav">
          <ul>
            <li>
              <a href="/">Trang Chủ</a>
            </li>
            <li>
              <a href="/about.html">Giới thiệu</a>
            </li>
            <li className="has-mega-menu">
              <a href="#">Sản phẩm</a>
              <div className="mega-menu">
                <div className="mega-columns-wrapper">
                  <div className="mega-column">
                    <h4>SẢN PHẨM MỚI NHẤT</h4>
                    <a href="#">Giày chạy bộ</a>
                    <a href="#">Giày Nike</a>
                    <a href="#">Giày Adidas</a>
                    <a href="#">Giày thể thao</a>
                  </div>
                  <div className="mega-column">
                    <h4>SẢN PHẨM NỔI BẬT</h4>
                    <a href="#">Giày cho nam</a>
                    <a href="#">Giày cho nữ</a>
                  </div>
                  <div className="mega-column">
                    <h4>SẢN PHẨM BÁN CHẠY</h4>
                    <a href="#">Giày Puma</a>
                    <a href="#">Nike Air</a>
                  </div>
                </div>

                <div className="mega-images">
                  <img src="/images/banner/mega-menu-images1.webp" alt="" />
                  <img src="/images/banner/mega-menu-images2.webp" alt="" />
                </div>
              </div>
            </li>
            <li>
              <a href="/blog.html">Tin tức</a>
            </li>
            <li>
              <a href="/contact.html">Liên hệ</a>
            </li>
            <li>
              <a href="">Hệ thống cửa hàng</a>
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
    </div>
  );
}
