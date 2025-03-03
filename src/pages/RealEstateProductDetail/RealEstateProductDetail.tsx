import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../../features/products/productSlice';
import { RootState, AppDispatch } from '../../store/store';
import GalleryBox from '../../components/GalleryBox';
import styles from './RealEstateProductDetail.module.css';
import { IoBed } from 'react-icons/io5';
import { GiBathtub } from 'react-icons/gi';
import { MdOutlineArrowDropUp, MdSquareFoot } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import RealEstateListingAgentSidebar from '../../components/RealEstateListingAgentSidebar';
import FetchedImage from '../../components/FetchedImage';

function RealEstateProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  const productStatus = useSelector((state: RootState) => state.products.status);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const selectedImages = Array.isArray(product?.selectedImages)
    ? product.selectedImages
    : JSON.parse(product?.selectedImages || "[]");
  const vendorDetails = Array.isArray(product?.vendorDetails)
    ? product.vendorDetails
    : JSON.parse(product?.vendorDetails || "{}");
  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  if (productStatus === 'loading' || !product) {
    return <div>Loading...</div>;
  }

    const truncateDescription = (description: string, maxWords: number) => {
        const words = description.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
    };

    return (
        <>
        <section className={`${styles.propertyBasics} pt-5 pb-4`}>
          <div className="container">
            {product.realEstateDetails && (
                <div className="column-gap-5 d-flex justify-content-center">
                  {JSON.parse(`${product.realEstateDetails}`).productBeds && (
                      <div className={`${styles.propertyDetail}`}>
                        <p className={`${styles.propertyDetailIcon}`}><IoBed /></p>
                        <h5 className={`${styles.propertyDetailHeading}`}>{JSON.parse(`${product.realEstateDetails}`).productBeds} Beds</h5>
                      </div>
                  )}
                  {JSON.parse(`${product.realEstateDetails}`).productBaths && (
                      <div className={`${styles.propertyDetail}`}>
                        <p className={`${styles.propertyDetailIcon}`}><GiBathtub /></p>
                        <h5 className={`${styles.propertyDetailHeading}`}>{JSON.parse(`${product.realEstateDetails}`).productBaths} Baths</h5>
                      </div>
                  )}
                  {JSON.parse(`${product.realEstateDetails}`).propertyArea && (
                      <div className={`${styles.propertyDetail}`}>
                        <p className={`${styles.propertyDetailIcon}`}><MdSquareFoot /></p>
                        <h5 className={`${styles.propertyDetailHeading}`}>{JSON.parse(`${product.realEstateDetails}`).propertyArea} SQFT</h5>
                      </div>
                  )}
                </div>
              )
            }
          </div>
        </section>
        {/* <FetchedImage featureImage={product.featureImage} images={selectedImages} /> */}
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
                        {product.productDescription.split(' ').length > 90 && (
                          <button
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className={`${styles.readMoreButton}`}
                          >
                            {isDescriptionExpanded ? (<>Show Less<MdOutlineArrowDropUp /></>) : (<>Read More<IoMdArrowDropdown /></>)}
                          </button>
                        )}
                      </p>
                    </div>
                    <div className="col-12">
                      {
                        product.amenities &&
                          <div className={`${styles.amenities}`}>
                            <h3 className={`${styles.amenitiesHeading}`}>Amenities</h3>
                            <div className="row pt-3">
                              {
                                JSON.parse(`${product.amenities}`).map((item: string, index: number) => (
                                  <div className="col-md-4 mb-3" key={index}>
                                    <div className={`${styles.amenitiesBox}`}>
                                      <p className={`${styles.amenitiesDetail} mb-0`}>{item}</p>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-xxl-5">
                  {
                    product.vendorDetails && 
                      <div className={`${styles.realEstateListingAgent} px-4`}>
                        <RealEstateListingAgentSidebar vendorDetail={vendorDetails}  />
                      </div>
                  }
                </div>
              </div>
            </div>
        </section>
        </>
    );
}

export default RealEstateProductDetail;
