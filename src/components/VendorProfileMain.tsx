import { useEffect, useState } from "react";
import { fetchVendorDetails2, fetchVendorProductsByStoreId } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import ProductBox from "./ProductBox";

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

  console.log(vendor)

  return (
    <div className="container mx-auto px-4">
      {/* Vendor Profile Section */}
      <div className="flex flex-col items-center mt-6">
        {/* Vendor Profile Image */}
        {vendor?.image && (
          <img
            src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${vendor.image}`}
            alt="Vendor Profile"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-gray-300"
            onError={(e) => (e.currentTarget.src = "/default-profile.png")}
          />
        )}

        {/* Vendor Details */}
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{vendor?.store_name}</h1>
        <p className="text-lg text-gray-600">{vendor?.address1 || "Address not available"}</p>
        <p className="text-md text-gray-600">
          📧 {vendor?.email || "Email not available"} | 📞 {vendor?.phone || "Phone not available"}
        </p>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">About {vendor?.store_name}</h2>
        <p className="text-gray-600">
          {vendor?.description}
        </p>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-semibold text-gray-700 my-6 text-center">Products</h2>
      <div className="row">
        {loading || status === "loading" ? (
          <div className="col-12 text-center">
            <p>Loading products...</p>
          </div>
        ) : vendorItems.length === 0 ? (
          <div className="col-12 text-center">
            <p>No products available.</p>
          </div>
        ) : (
          vendorItems.map((product, index) => (
            <div className="col-md-4 pt-4 px-2" key={index}>
              <ProductBox productDetail={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorProfileMain;