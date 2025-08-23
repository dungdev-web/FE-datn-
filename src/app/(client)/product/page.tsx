// app/product/page.tsx (server component)
import { Suspense } from "react";
import Product from "@/app/(client)/component/ProductClient";
export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
     <Product />
    </Suspense>
  );
}
