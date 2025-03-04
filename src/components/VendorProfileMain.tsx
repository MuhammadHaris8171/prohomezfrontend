import { useEffect, useState } from "react";
import { fetchVendorDetails2, fetchVendorProductsByStoreId } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import ProductBox from "./ProductBox";
import styles from "../style/VendorProfileMain.module.css"; // Import CSS Module

const VendorProfileMain = () => {
  const vendor = useSelector((state: RootState) => state.products.vendorDetails);
  const { vendorItems, status } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      dispatch(fetchVendorDetails2({ store_id: slug }));
      dispatch(fetchVendorProductsByStoreId({ store_id: slug }))
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, [slug, dispatch]);

  return (
    <div className={styles.container}>
      {/* Vendor Profile Section */}
      <div className={styles.profileSection}>
        {/* Vendor Profile Image */}
        {vendor?.image && (
          <img
            src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${vendor.image}`}
            alt="Vendor Profile"
            className={styles.profileImage}
            onError={(e) => (e.currentTarget.src = "/default-profile.png")}
          />
        )}

        {/* Vendor Details */}
        <h1 className={styles.vendorName}>{vendor?.store_name}</h1>
        <p className={styles.vendorInfo}>{vendor?.address1 || "Address not available"}</p>
        <p className={styles.vendorInfo}>
          📧 {vendor?.email || "Email not available"} | 📞 {vendor?.phone || "Phone not available"}
        </p>
      </div>

      {/* About Section */}
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>About {vendor?.store_name}</h2>
        <p className={styles.description}>{vendor?.description || "No description available."}</p>
      </div>

      {/* Products Section */}
      <h2 className={styles.productsTitle}>Products</h2>
      <div className={styles.productsGrid}>
        {loading || status === "loading" ? (
          <p className={styles.vendorInfo}>Loading products...</p>
        ) : vendorItems.length === 0 ? (
          <p className={styles.vendorInfo}>No products available.</p>
        ) : (
          vendorItems.map((product, index) => (
            <div className={styles.productItem} key={index}>
              <ProductBox productDetail={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorProfileMain;
