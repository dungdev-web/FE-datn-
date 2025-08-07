"use client";
import "../css/css.css";
import { Settings } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScrollingNotification from "./ThongBao_dashboard";
import { useState, useEffect, useRef } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { logoutUser as apiLogoutUser } from "@/services/authService";
import { API_BASE_URL } from "@/config/env";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface HeaderAdminProps {
  toggleSidebar: () => void;
}
const notifications = [
  {
    id: 1,
    avatar: "/images/logo/anhdep.jpg",
    title: "UI/UX Design",
    time: "2 min ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    date: "today",
  },
  {
    id: 2,
    avatar: "/images/logo/anhdep.jpg",
    title: "Message",
    time: "1 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "today",
  },
  {
    id: 3,
    avatar: "/images/logo/anhdep.jpg",
    title: "Forms",
    time: "2 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "yesterday",
  },
  {
    id: 4,
    avatar: "/images/logo/anhdep.jpg",
    title: "Forms",
    time: "2 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "yesterday",
  },
  {
    id: 5,
    avatar: "/images/logo/anhdep.jpg",
    title: "Forms",
    time: "2 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "yesterday",
  },
  {
    id: 6,
    avatar: "/images/logo/anhdep.jpg",
    title: "Forms",
    time: "2 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "yesterday",
  },
  {
    id: 7,
    avatar: "/images/logo/anhdep.jpg",
    title: "Forms",
    time: "2 hour ago",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500...",
    date: "yesterday",
  },
];
export default function Header_admin({ toggleSidebar }: HeaderAdminProps) {
  const [showDarkMenu, setShowDarkMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuthUser();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef1 = useRef<HTMLDivElement>(null);
const router = useRouter();

  // Đóng khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutsideNote = (e: MouseEvent) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(e.target as Node)
      ) {
        setOpenNote(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideNote);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideNote);
  }, []);
  const handleLogout = async () => {
  try {
    await apiLogoutUser();
    toast.success("Đăng xuất thành công");
    router.push("/login"); // hoặc "/" nếu bạn muốn quay về trang chủ
  } catch (err: any) {
    console.error("Lỗi đăng xuất:", err.message);
    toast.error("Đăng xuất thất bại: " + err.message);
  }
};
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
          <div className="relative" ref={dropdownRef1}>
            <div
              className="header-icon notification-badge cursor-pointer"
              onClick={() => setOpenNote(!openNote)}
            >
              <i className="fa-solid fa-bell "></i>
              <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border border-white"></span>
            </div>

            {openNote && (
              <div className="menunote absolute right-0 !mt-2 w-96 bg-white shadow-lg rounded-md z-50 flex flex-col max-h-[500px]">
                {/* Header */}
                <div className="flex justify-between items-center border-b !px-4 !py-2">
                  <h4 className="text-lg font-semibold">Notifications</h4>
                  <button className="text-blue-500 text-sm">
                    Mark all read
                  </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto !px-4 !py-2 space-y-3">
                  <p className="text-xs text-gray-500">Today</p>
                  {notifications
                    .filter((n) => n.date === "today")
                    .map((n) => (
                      <div key={n.id} className="flex gap-3">
                        <img
                          src={n.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold">{n.title}</h5>
                            <span className="text-xs text-gray-400">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{n.content}</p>
                        </div>
                      </div>
                    ))}

                  <p className="text-xs text-gray-500 mt-4">Yesterday</p>
                  {notifications
                    .filter((n) => n.date === "yesterday")
                    .map((n) => (
                      <div key={n.id} className="flex gap-3">
                        <img
                          src={n.avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold">{n.title}</h5>
                            <span className="text-xs text-gray-400">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{n.content}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Fixed bottom button */}
                <div className="border-t text-center !px-4 !py-2">
                  <button className="text-red-500 text-sm font-medium hover:underline">
                    Clear all Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
              className="header-icon cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <i className="fa-solid fa-user"></i>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
                {/* Header */}
                <div className="bg-sky-500 text-white !p-4 flex items-center gap-3">
                  <img
                    src={`${API_BASE_URL}/uploads/${user?.avatar}`}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                    alt="avatar"
                  />
                  <div>
                    <p className="font-semibold">{user?.name} 👋</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                </div>
                <div className="!px-4 !py-3 space-y-2 text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-sky-500">
                    <i className="fa-solid fa-gear"></i>
                    <span>Settings</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-sky-500">
                    <i className="fa-solid fa-share-nodes"></i>
                    <span>Share</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-sky-500">
                    <i className="fa-solid fa-lock"></i>
                    <span>Change Password</span>
                  </div>
                </div>
                <div className="!px-4 !pb-4 !pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white !py-2 rounded-md flex justify-center items-center gap-2"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Logout
                  </button>
                </div>
              </div>
            )}
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
