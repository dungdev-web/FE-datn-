"use client"
import "./globals.css";
import "./css/style.css";
import "./css/product.css";


import ButtonToTop from "./component/ButtonToTop";
import { CompareProvider } from "@/app/(client)/component/ProductCompare/CompareContext";
import { LoaderProvider } from "@/app/(client)/component/LinkWithLoader";
import ContactFloatingButton from "@/app/(client)/component/ContactFloatingButton";
import { ToastContainer } from "react-toastify";
import TawkToWidget from "@/app/(client)/component/TawkToWidget";
import FloatChatBot from "@/app/(client)/component/FloatChatBot";
import Header from "./component/Header";
import Footer from "./component/Footer";
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
