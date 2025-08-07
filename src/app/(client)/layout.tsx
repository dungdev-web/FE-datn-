import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./css/style.css";
import "./css/product.css";


import ButtonToTop from "./component/ButtonToTop";
import { CompareProvider } from "./component/product_compare/compare_context";
import { LoaderProvider } from "./component/LinkWithLoader";
import ContactFloatingButton from "./component/ContactFloatingButton";
import { ToastContainer } from "react-toastify";
import Footer from "./component/footer";
import Header from "./component/header";
// import TawkToWidget from "./component/TawkToWidget";
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
            <CompareProvider>
              <Header />
              {children}
              <Footer></Footer>
              <ButtonToTop />
              <ContactFloatingButton />
            </CompareProvider>
          </LoaderProvider>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
        {/* <TawkToWidget /> */}
      </body>
    </html>
  );
}
