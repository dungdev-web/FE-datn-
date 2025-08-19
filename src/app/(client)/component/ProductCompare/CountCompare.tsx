"use client";
import React, { useEffect, useState } from "react";
import { getCompareProduct } from "@/services/productService";
import { useCompare } from "./CompareContext";
interface CompareBadgeProps {
  userId: number;
}

export default function CompareBadge({ userId }: CompareBadgeProps) {
  const { count } = useCompare();

  return (
    <>
      <i className="fa fa-exchange"></i>
      {count > 0 && <span className="compare-count-badge">{count}</span>}
    </>
  );
}
