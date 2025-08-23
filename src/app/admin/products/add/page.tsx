"use client";
import dynamic from "next/dynamic";
// Import component qua dynamic với ssr: false
const AddProduct = dynamic(
  () => import("@/app/admin/component_admin/Product/AddPro"),
  {
    ssr: false,
  }
);

export default function AddProductPage() {
  return <AddProduct />;
}
