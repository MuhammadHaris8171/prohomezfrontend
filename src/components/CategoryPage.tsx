// CategoryDisplay.tsx
import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  return (
    <div>
      <h1>Category: {category}</h1>
      <ProductGrid category={category || "luxury appartments"} />
    </div>
  );
};

export default CategoryPage;
