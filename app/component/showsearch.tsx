import React, { useRef } from "react";
import "../css/home.css";
import "../css/style.css";

interface SearchProps {
  isSearchOpen: boolean;
  closeSearch: () => void;
}

export default function Search({ isSearchOpen, closeSearch }: SearchProps) {
  const bocRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = () => {
    if (bocRef.current) {
      bocRef.current.style.animation = "slideUp 0.5s ease forwards";
    }

    setTimeout(() => {
      closeSearch();
    }, 500);
  };

  return (
    <div>
      {/* Tạo modal search */}
      {isSearchOpen && (
        <div
          className="boc"
          id="boc"
          ref={bocRef}
          style={{ animation: "slideDown 0.5s ease forwards" }}
        >
          <div className="search-bar" id="searchBar">
            <input type="text" placeholder="Tìm kiếm sản phẩm, tin tức..." />
            <i className="fa fa-search"></i>
          </div>
        </div>
      )}

      {/* Tạo overlay */}
      {isSearchOpen && (
        <div
          className="overlay1"
          id="overlay1"
          onClick={handleOverlayClick}
          style={{ display: "block" }}
        ></div>
      )}
    </div>
  );
}
