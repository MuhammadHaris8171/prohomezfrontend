import { Link } from 'react-router-dom';
import styles from '../style/VendorCard.module.css';
import { useEffect, useState } from 'react';

interface Vendor {
  featureImage?: string;
  src?: string;
  name?: string;
  store_id?:string,
  store_name?:string,
  image?:string | null
}

interface ProductCardProps {
  vendor?: Vendor;
}

function VendorCard({ vendor }: ProductCardProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // const navigate=useNavigate()
  // const dispatch=useDispatch()
  // const handleClick=async()=>{
  //   navigate(`/vendor/profile/${vendor.store_id}`);
    
  //  }
  useEffect(() => {
    if (vendor?.image) {
      setPreviewImage(`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${vendor.image}`);
    }
  }, [vendor?.image]);
  

    console.log(vendor)
  return (
    <>
        <Link to={`/vendor/profile/${vendor?.store_id ?? ""}`} className='text-decoration-none'>
          <div className={styles.cardBox}>
            {
                <div className={`${styles.imgBox}`}>
                    {previewImage && (
                            <div className="flex justify-center mb-6">
                              <img src={previewImage} alt="Profile" className="w-full h-32 shadow-md" />
                            </div>
                          )}                
                    </div>
            }
             <h5 className={`${styles.cardBoxName}`}>{vendor?.store_name || "No Store Name"}</h5>
          </div>
        </Link>
    </>
  );
}

export default VendorCard;
