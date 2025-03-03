import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  selectedCategory: string;
  featureImage: string; // Main image
  selectedImages: string[]; // Additional images
}

interface ProductGridProps {
  category: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/productsby?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  return (
    <div className="container">
      <div className="row">
        {products.length === 0 ? (
          <div className="col-md-12 text-center">
            <p>No products found in this category.</p>
          </div>
        ) : (
          products.map((product) => {
            // ✅ Generate category path
            const categoryType = product.selectedCategory.toLowerCase().includes("real estate")
              ? "real-estate"
              : "home-products";

            // ✅ Convert product name to URL-friendly format
            const productSlug = product.productName.toLowerCase().replace(/\s+/g, "-");

            return (
              <div key={product.id} className="col-md-4 mb-4">
                {/* ✅ Use productSlug in URL */}
                <Link to={`/products/${categoryType}/${productSlug}`} className="text-decoration-none">
                  <div className="card">
                    {/* Display feature image */}
                    <img
                      src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${product.selectedImages}`}
                      alt={product.productName}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">Price: ${product.productPrice}</p>
                      <p className="text-muted">Category: {product.selectedCategory}</p>

                      {/* Display additional images */}
                      {product.selectedImages.length > 0 && (
                        <div className="d-flex mt-2">
                          {product.selectedImages.slice(0, 3).map((img, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000/${img}`}
                              alt={`Image ${index + 1}`}
                              className="me-2"
                              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
