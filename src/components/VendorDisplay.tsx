import { useEffect, useState } from "react";
import styles from "../style/VendorDisplay.module.css";
import vendorLogo from "../assets/images/vendor-temporary.webp";
import VendorCard from "./VendorCard";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface Vendor {
    name: string;
    featureImage?: string;
    src?: string;
}

function VendorDisplay() {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch("http://localhost:5000/fetchAllVendorsPublic");
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                const data = await response.json();

                // Map fetched data to Vendor structure with default image
                const formattedVendors = data.map((vendor: { store_name: string }) => ({
                    name: vendor.store_name,
                    featureImage: vendorLogo, // Default image
                    src: "#",
                }));

                setVendors(formattedVendors);
            } catch (error) {
                console.error("Error fetching vendor details:", error);
            }
        };

        fetchVendors();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className={`${styles.vendorDisplay} mb-0 text-center`}>Top Rated Vendors</h3>
                </div>
                <div className="col-md-12 py-4 position-relative">
                    <div className="row flex-nowrap overflow-hidden py-3">
                        {vendors.map((item, index) => (
                            <div className="col-md-2" key={index}>
                                <VendorCard vendor={item} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.sliderBtnContainer}`}>
                        <div className={`${styles.sliderBtn}`}>
                            <MdArrowBackIosNew />
                        </div>
                        <div className={`${styles.sliderBtn}`}>
                            <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorDisplay;
