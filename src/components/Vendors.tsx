import { useState, useEffect } from "react";
import styles from "../style/ExploreProducts.module.css";
import VendorCard from "./VendorCard";
import { fetchAllVendors } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

interface ExploreProductProps {
    category?: string;
}

function Vendors({ category }: ExploreProductProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const dispatch = useDispatch<AppDispatch>();

    const { vendors } = useSelector((state: RootState) => state.products);


    useEffect(() => {
        dispatch(fetchAllVendors());
    }, [dispatch]);

    // useEffect(() => {
    //     setActiveCategory(category);
    // }, [category]);

    const categoryBtns = [
        { name: "All", id: "all-categories" },
        { name: "Real Estate", id: "real-estate-categories" },
        { name: "Home Products", id: "home-product-categories" },
    ];

    const filteredVendors = activeCategory === "All" 
        ? vendors 
        : vendors.filter(vendor => vendor.brand_type === activeCategory);
    
    console.log(filteredVendors);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className={`${styles.exploreProductHeading} mb-0 text-center`}>Explore Our Trusted Partners in Real Estate & Home Products</h3>
                    </div>
                    {category === "All" && (
                        <div className="col-md-12 mt-4">
                            <div className="d-flex justify-content-center">
                                {categoryBtns.map((item, index) => (
                                    <button
                                        id={item.id}
                                        className={`${styles.categoriesDisplayBtn} btn ${activeCategory === item.name ? styles.categoryActive : ''}`}
                                        key={index}
                                        onClick={() => setActiveCategory(item.name)}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="col-md-12">
                        <div className="row">
                            {filteredVendors.length === 0 ? (
                                <div className="col-md-12 text-center">
                                    <p>No Vendors found in this category.</p>
                                </div>
                            ) : (
                                filteredVendors.map((vendor,index) => (
                                    <div className="col-md-3 pt-4 px-2" key={index}>
                   <VendorCard key={vendor.store_id} vendor={vendor} />
                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vendors;
