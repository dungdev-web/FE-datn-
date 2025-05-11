
import "./admin.css";
import Header_admin from "./component_admin/Header_admin";
import SideBar from "./component_admin/Sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
        <Header_admin></Header_admin>
        {children}
        <SideBar></SideBar>
        </div>
      </body>
    </html>
  );
}