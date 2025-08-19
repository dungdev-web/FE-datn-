"use client"
import "./globals.css";
import "./css/style.css";
import "./css/product.css";

import Header from "./component/Header";
import Footer from "./component/Footer";
import ButtonToTop from "./component/ButtonToTop";
import { CompareProvider } from "./component/ProductCompare/CompareContext";
import { LoaderProvider } from "./component/LinkWithLoader";
import ContactFloatingButton from "./component/ContactFloatingButton";
import { ToastContainer } from "react-toastify";
import TawkToWidget from "./component/TawkToWidget";
import FloatChatBot from "./component/FloatChatBot";
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
        <FloatChatBot />
      </body>
    </html>
  );
}
