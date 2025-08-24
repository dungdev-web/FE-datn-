"use client";
import "./admin.css";
import Header_admin from "@/app/admin/component_admin/Header_admin";
import SideBar from "@/app/admin/component_admin/Sidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  return (
    <html lang="en">
      <body>
        <div className="container1">
          <div
            className={`dashboard-layout ${
              isSidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
          >
            <SideBar
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />

            <main className="main-content">
              <Header_admin toggleSidebar={toggleSidebar}></Header_admin>
              <Toaster position="top-right" />

              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
