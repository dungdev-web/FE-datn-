"use client";
import "../css/css.css";
import { Settings } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScrollingNotification from "./ThongBao_dashboard";
import { useState,useEffect,useRef } from "react";
interface HeaderAdminProps {
  toggleSidebar: () => void;
}
export default function Header_admin({ toggleSidebar }: HeaderAdminProps) {
  const [showDarkMenu, setShowDarkMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // Toggle menu hiển thị
    const toggleDarkMenu = () => {
    setShowDarkMenu((prev) => !prev);
  };
  // Toggle dark/light mode
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Auto đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDarkMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Khôi phục chế độ từ localStorage khi load trang
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    document.body.classList.toggle("dark", isDark);
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <button
            className="mobile-toggle"
            id="mobileToggle"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
        <div className="header-right">
          <div className="header-icon" onClick={toggleDarkMenu}>
            <i className="fa-solid fa-sun"></i>
          </div>
        {/* Submenu dark/light */}
        <ul
          ref={menuRef}
          className={`submenu-dark-mode ${showDarkMenu ? "show" : ""}`}
        >
          <li onClick={toggleTheme}>
            {isDarkMode ? (
              <>
                <i className="fa-solid fa-sun"></i> Bật chế độ sáng
              </>
            ) : (
              <>
                <i className="fa-solid fa-moon"></i> Bật chế độ tối
              </>
            )}
          </li>
        </ul>
          <div className="header-icon">
            <i className="fa-solid fa-gear"></i>
          </div>
          <div className="header-icon notification-badge">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="header-icon">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
      {/* <div className="sub-header">
        <div className="sub-header-left">
          <Settings />
        </div>
         
        <div className="sub-header-right">
          
          <span className="home-icon">
            <i className="fa-solid fa-house"></i>
          </span>{" "}
          / <span> Trang dashboard</span>
        </div>
      </div> */}
    </>
  );
}
