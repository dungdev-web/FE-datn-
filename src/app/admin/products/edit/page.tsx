"use client";
import dynamic from "next/dynamic";
// Import component qua dynamic với ssr: false
const EditProduct = dynamic(() => import("../../component_admin/product/edit_pro"), {
  ssr: false,
});

export default function EditProductPage() {
  return <EditProduct />;
}
