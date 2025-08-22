"use client";

import dynamic from "next/dynamic";
const QuillEditor = dynamic(
  () => import("@/app/admin/component_admin/Blog/QuillEditorEdit"),
  {
    ssr: false,
  }
);
export default function EditlogPage() {
  return (
    <div>
      <QuillEditor />
    </div>
  );
}
