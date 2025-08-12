"use client";

import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../../component_admin/blog/QuillEditorAdd"), {
  ssr: false,
});
export default function AddBlogPage() {
  return (
    <div>
      <QuillEditor />
    </div>
  );
}