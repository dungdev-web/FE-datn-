"use client";

import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../../component_admin/blog/QuillEditorEdit"), {
  ssr: false,
});
export default function EditlogPage() {
  return (
    <div>
      <QuillEditor />
    </div>
  );
}