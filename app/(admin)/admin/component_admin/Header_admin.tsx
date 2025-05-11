"use client";
import "../css/dashboard.css";
import "../css/css.css";
import { Settings } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Hoặc NotificationsNone

export default function Header_admin() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-wrapper">
            <img src="/images/logo/logo-den.png" alt="Logo" className="logo" />
          </div>
        </div>

        <div className="header-right">
          <input type="text" />
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Vòng sóng 1 */}
            <span className="pulse-ring absolute w-full h-full rounded-full bg-red-400/40"></span>
            {/* Vòng sóng 2 (delay để tạo hiệu ứng liên tục) */}
            <span className="pulse-ring absolute w-full h-full rounded-full bg-red-400/40 animation-delay"></span>

            {/* Icon chuông nằm trên cùng */}
            <div className="relative z-10 bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white animate-bell">
              <NotificationsIcon />
            </div>
          </div>
          <div className="user-info">
            <img src="/images/logo/anhdep.jpg" alt="Admin" className="avatar" />
            <div className="email-role">
              <div className="email">admin@gmail.com</div>
              <div className="role">Administrator</div>
            </div>
          </div>
        </div>
      </header>
      <div className="sub-header">
        <div className="sub-header-left">
          <div className="user-info">
            <img src="/images/logo/anhdep.jpg" alt="Admin" className="avatar" />
            <div className="email-role">
              <div className="email">admin@gmail.com</div>
              <div className="role">Administrator</div>
            </div>
          </div>
          <Settings />
        </div>
        <div className="sub-header-right">
          <span className="home-icon">
            <i className="fa-solid fa-house"></i>
          </span>{" "}
          / <span>Danh sách bài viết</span>
        </div>
      </div>
    </>
  );
}
