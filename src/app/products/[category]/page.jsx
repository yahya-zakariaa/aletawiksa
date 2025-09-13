"use client";

import React, { useEffect, useState } from "react";
import phones from "@/data/phones.json";
export default function page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const allProducts = Object.values(phones).reduce((p, c) => p.concat(c), []);
    setProducts(allProducts);
  }, []);
  return <div>{products}</div>;
}
