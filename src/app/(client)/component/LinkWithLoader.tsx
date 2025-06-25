// components/LoaderContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
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
