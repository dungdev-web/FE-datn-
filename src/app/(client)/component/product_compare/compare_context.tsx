"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCompareProduct } from "@/services/productService";
import { checkToken } from "@/services/authService";
interface ICompareProduct {
  product: any;
}

interface CompareContextType {
  compareList: ICompareProduct[];
  count: number;
  refresh: () => Promise<void>;
  setCount: (count: number) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<ICompareProduct[]>([]);
  const [count, setCount] = useState<number>(0);

  const refresh = async () => {
    const tokenData = await checkToken();
    const user_id = tokenData?.user?.id;
    if (!user_id) return;

    try {
      const data = await getCompareProduct(user_id);
      setCompareList(data || []);
      setCount(data?.length || 0);
    } catch (err) {
      console.error("Lỗi khi fetch so sánh:", err);
    }
  };

  useEffect(() => {
    refresh(); // load ban đầ
  }, []);

  return (
    <CompareContext.Provider value={{ compareList, count, refresh, setCount }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
