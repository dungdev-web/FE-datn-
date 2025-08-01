"use client";
import dynamic from "next/dynamic";
// Import component qua dynamic với ssr: false
const AddProduct = dynamic(() => import("../../component_admin/product/add_pro"), {
  ssr: false,
});

export default function AddProductPage() {
  return <AddProduct />;
}
