import styles from '../style/RealEstateListingAgentSidebar.module.css'
import vendorLogo from '../assets/images/vendor-temporary.webp'
import { VendorDetail } from './types'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface RealEstateListingProps {
    vendorDetail: VendorDetail
}

function RealEstateListingAgentSidebar({vendorDetail}: RealEstateListingProps) {
    const cleanedPhoneNumber = vendorDetail.store_phone && vendorDetail.store_phone.replace(/[^\d+]/g, '');
    const {singleProduct}=useSelector((state:RootState)=>state.products)
    const navigate=useNavigate()

    console.log(singleProduct)
  return (
    <>
        <div className={`${styles.realEstateListingAgent}`} onClick={()=>navigate(`/vendor/profile/${singleProduct.storeId}`)}>
            <h5  className={`${styles.listingAgentHeading}`}>Listing Agent</h5>
            <div className={`${styles.listingAgentDetailBox} d-flex my-4`}>
                <div className={`${styles.imgBox}`}>
                    <img onClick={()=>navigate(`/vendor/profile/${singleProduct.storeId}`)} src={vendorDetail.image || vendorLogo} alt="ProHomez" />
                </div>
                <div className={`${styles.listingAgentDetail}`}>
                    <h4 className={`${styles.vendorName}`}>{vendorDetail.store_name}</h4>
                    <p className={`${styles.vendorDetail} mb-0`}>{vendorDetail.email}</p>
                    <p className={`${styles.vendorDetail} mb-0`}>{vendorDetail.store_phone}</p>
                </div>
            </div>
                <div className={`${styles.contactButtons} pt-3`}>
                    <a href={`tel:${cleanedPhoneNumber}`} className={`${styles.vendorContactBtn} text-decoration-none btn`}>Speak with Agent</a>
                    <a href={`mailto:${vendorDetail.email}`} className={`${styles.vendorContactBtn} text-decoration-none btn`}>Reach Out via Email</a>
                </div>
        </div>
    </>
  )
}

export default RealEstateListingAgentSidebar