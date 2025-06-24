import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./css/style.css";
import Header from "./component/header";
import Footer from "./component/footer";
import ButtonToTop from "./component/ButtonToTop";
import { LoaderProvider } from "./component/LinkWithLoader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <LoaderProvider>
            <Header/>
            {children}
            <Footer></Footer>
            <ButtonToTop />
          </LoaderProvider>
        </div>
      </body>
    </html>
  );
}
