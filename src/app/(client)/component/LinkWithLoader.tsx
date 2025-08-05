"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import "../css/loading.css"; 

const LoaderContext = createContext({
  show: () => {},
  hide: () => {},
  isVisible: false,
});

export function useLoader() {
  return useContext(LoaderContext);
}

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup khi unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);

  return (
    <LoaderContext.Provider value={{ show, hide, isVisible }}>
      {children}
      {isVisible && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
    </LoaderContext.Provider>
  );
}
