import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleProduct, fetchProductsByCategory } from '../../features/products/productSlice';
import { RootState, AppDispatch } from '../../store/store';
import { createSelector } from '@reduxjs/toolkit';
import GalleryBox from '../../components/GalleryBox';
import styles from './RealEstateProductDetail.module.css';
import { IoBed } from 'react-icons/io5';
import { GiBathtub } from 'react-icons/gi';
import { MdOutlineArrowDropUp, MdSquareFoot } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import RealEstateListingAgentSidebar from '../../components/RealEstateListingAgentSidebar';
import FetchedImage from '../../components/FetchedImage';

// Memoized Redux selectors
const selectProductState = (state: RootState) => state.products;

const selectSingleProduct = createSelector(selectProductState, (products) => products.singleProduct);
// const selectSuggestedProducts = createSelector(selectProductState, (products) => products.suggestedProducts);

function RealEstateProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector(selectSingleProduct);
  // const suggestedProducts = useSelector(selectSuggestedProducts);
  const productStatus = useSelector((state: RootState) => state.products.status);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (product && product.category) {
      dispatch(fetchProductsByCategory(product?.category));
    }
  }, [product, dispatch]);

  if (productStatus === 'loading' || !product) {
    return <div>Loading...</div>;
  }

  // Parse JSON safely
  const realEstateDetails = product.realEstateDetails ? JSON.parse(product?.realEstateDetails) : {};
  const selectedImages = Array.isArray(product.selectedImages)
    ? product.selectedImages
    : product.selectedImages
    ? JSON.parse(product.selectedImages)
    : [];
  const vendorDetails = product.vendorDetails ? JSON.parse(product?.vendorDetails) : {};
  const amenities = product.amenities ? JSON.parse(product?.amenities) : [];

  // Description truncation
  const truncateDescription = (description: string | null, maxWords: number) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
  };

  return (
    <>
      {/* Product Details */}
      <section className={`${styles.propertyBasics} pt-5 pb-4`}>
        <div className="container">
          {realEstateDetails && (
            <div className="column-gap-5 d-flex justify-content-center">
              {realEstateDetails.productBeds && (
                <div className={`${styles.propertyDetail}`}>
                  <p className={`${styles.propertyDetailIcon}`}><IoBed /></p>
                  <h5 className={`${styles.propertyDetailHeading}`}>{realEstateDetails.productBeds} Beds</h5>
                </div>
              )}
              {realEstateDetails.productBaths && (
                <div className={`${styles.propertyDetail}`}>
                  <p className={`${styles.propertyDetailIcon}`}><GiBathtub /></p>
                  <h5 className={`${styles.propertyDetailHeading}`}>{realEstateDetails.productBaths} Baths</h5>
                </div>
              )}
              {realEstateDetails.propertyArea && (
                <div className={`${styles.propertyDetail}`}>
                  <p className={`${styles.propertyDetailIcon}`}><MdSquareFoot /></p>
                  <h5 className={`${styles.propertyDetailHeading}`}>{realEstateDetails.propertyArea} SQFT</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={`${styles.galleryBox}`}>
        <GalleryBox featureImage={product.featureImage} images={selectedImages} />
      </section>

      <section className={`${styles.productDetailBox}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-xxl-7">
              <div className="row">
                <div className="col-9">
                  <h3 className={`${styles.productName} mb-0`}>{product.productName}</h3>
                </div>
                <div className="col-3">
                  <h4 className={`${styles.productPrice} mb-0`}>$ {product.productPrice}</h4>
                </div>
                <div className="col-12">
                  <p className={`${styles.productDescription} mb-0`}>
                    {isDescriptionExpanded ? product.productDescription : truncateDescription(product.productDescription, 90)} 
                    {product.productDescription?.split(' ').length > 90 && (
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className={`${styles.readMoreButton}`}
                      >
                        {isDescriptionExpanded ? (<>Show Less<MdOutlineArrowDropUp /></>) : (<>Read More<IoMdArrowDropdown /></>)}
                      </button>
                    )}
                  </p>
                </div>
                {amenities.length > 0 && (
                  <div className="col-12">
                    <div className={`${styles.amenities}`}>
                      <h3 className={`${styles.amenitiesHeading}`}>Amenities</h3>
                      <div className="row pt-3">
                        {amenities.map((item: string, index: number) => (
                          <div className="col-md-4 mb-3" key={index}>
                            <div className={`${styles.amenitiesBox}`}>
                              <p className={`${styles.amenitiesDetail} mb-0`}>{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-4 col-xxl-5">
              {product.vendorDetails && (
                <div className={`${styles.realEstateListingAgent} px-4`}>
                  <RealEstateListingAgentSidebar vendorDetail={vendorDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Products Section */}
      {/* <section className={`${styles.suggestedProducts} pt-5 pb-4`}>
        <div className="container">
          <h3 className="mb-4">You May Also Like</h3>
          <div className="row">
            {suggestedProducts?.length > 0 ? (
              suggestedProducts.map((suggested) => (
                <div className="col-md-4 mb-4" key={suggested.id}>
                  <div className={`${styles.suggestedProductCard}`}>
                    <FetchedImage featureImage={suggested.featureImage} images={typeof suggested.selectedImages === 'string' ? JSON.parse(suggested.selectedImages) : suggested.selectedImages} />
                    <h5 className={`${styles.suggestedProductName}`}>{suggested.productName}</h5>
                    <p className={`${styles.suggestedProductPrice}`}>$ {suggested.productPrice}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No related properties found.</p>
            )}
          </div>
        </div>
      </section> */}
    </>
  );
}

export default RealEstateProductDetail;
