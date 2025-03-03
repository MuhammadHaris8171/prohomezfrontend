import { useState } from 'react';
import styles from '../style/VendorsList.module.css';
import { Vendor } from './types';
import vendorImage from '../assets/images/vendor-temporary.webp';
import { fetchAllVendors, updateVendorAccess } from '../features/products/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

interface ProductListProp {
  content: Vendor;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function VendorsList({ content, setMessage }: ProductListProp) {
  // Only vendors should be toggleable, not admins
  const [isVendorActive, setIsVendorActive] = useState(content.vendor_status === 1);
  const dispatch = useDispatch<AppDispatch>();

  const handleAccessToggle = async () => {
    if (content.isAdmin === 1) {
      setMessage("Admins cannot be deactivated!");
      return;
    }

    try {
      const newStatus = isVendorActive ? 0 : 1;

      const response = await dispatch(updateVendorAccess({ vendorId: content.store_id, newStatus }));

      if (response.payload) { // Ensure API success
        setIsVendorActive(newStatus === 1);
        await dispatch(fetchAllVendors());

        setMessage(newStatus === 1 ? 'Vendor Granted Successfully' : 'Vendor Revoked Successfully');
      }
    } catch (error) {
      console.error('Failed to update access status:', error);
      setMessage('Failed to update vendor access');
    }
  };

  const truncateDescription = (description?: string, maxWords: number = 40): string => {
    if (!description) {
      return 'No description available.';
    }
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className={`${styles.productList} d-flex`}>
      <div className={styles.imgBox}>
        <img
          src={content.image ? `${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${content.image}` : vendorImage}
          alt={content.store_name || 'Pro Homez'}
        />
      </div>
      <div className={styles.productInfoBox}>
        <h3 className={`${styles.productInfoBoxName} mb-0`}>{content.store_name}</h3>
        <p className={`${styles.productInfoBoxDescription} mb-0`}>
          {truncateDescription(content.address1, 35)}
        </p>

        {content.isAdmin === 0 ? (
          <button
            className={`${isVendorActive ? styles.removeAccessButton : styles.accessButton} mt-3`}
            onClick={handleAccessToggle}
          >
            {isVendorActive ? 'Revoke Access' : 'Grant Access'}
          </button>
        ) : (
          <span className={styles.adminBadge}>Admin</span> // Shows "Admin" tag instead of button
        )}
      </div>
    </div>
  );
}

export default VendorsList;
