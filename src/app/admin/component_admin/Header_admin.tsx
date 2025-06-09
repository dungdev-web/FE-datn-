"use client";
import "../css/dashboard.css";
import "../css/css.css";
import { Settings } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Hoặc NotificationsNone
import ScrollingNotification from "./ThongBao_dashboard";
export default function Header_admin() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-wrapper">
            <img src="/images/logo/logo-den.png" alt="Logo" className="logo" />
          </div>
        </div>
       <div className="hi !ml-[300px]">
          <ScrollingNotification />
        </div>
        <div className="header-right flex gap-[10px] items-center !mr-[37px]">
          <input
            type="text"
            className="h-[40px] w-full px-4 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm placeholder-gray-400"
          />
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Sóng 1 */}
            <span className="absolute w-full h-full rounded-full bg-red-400/40 animate-[radar-ping_2s_ease-out_infinite] pointer-events-none"></span>

            {/* Sóng 2 có delay */}
            <span className="absolute w-full h-full rounded-full bg-red-400/40 animate-[radar-ping_2s_ease-out_infinite] delay-[1s] pointer-events-none"></span>

            {/* Biểu tượng chuông (chỉ phần này rung) */}
            <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white bg-red-500 ">
              <NotificationsIcon className="animate-bell" />
              {/* Badge hiển thị số lượng thông báo */}
              <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs font-bold rounded-full px-1.5 h-5 min-w-[1.25rem] flex items-center justify-center shadow-md">
                3
              </span>
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
          <Settings />
        </div>
         
        <div className="sub-header-right">
          
          <span className="home-icon">
            <i className="fa-solid fa-house"></i>
          </span>{" "}
          / <span> Trang dashboard</span>
        </div>
      </div>
    </>
  );
}
