import { Link, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeProductDetail.module.css';
import FetchedImage from '../../components/FetchedImage'
import { MdArrowBackIosNew, MdArrowForwardIos, MdOutlineArrowDropUp } from 'react-icons/md';
import star from '../../assets/svg/star.svg';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AppDispatch, RootState } from '../../store/store';
// import { fetchSingleProduct, fetchCategoryProducts } from '../../features/products/productSlice';
import { Product } from '../../components/types';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleProduct, fetchProductsByCategory } from "../../features/products/productSlice";
// import { RootState, AppDispatch } from "../../store/store";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetchSingleProduct, fetchProductsByCategory } from "../../features/products/productSlice";
// import { RootState, AppDispatch } from "../../store/store";
import GalleryBox from "../../components/GalleryBox";
// import styles from "./RealEstateProductDetail.module.css";
import { IoBed } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
// import { MdOutlineArrowDropUp, MdSquareFoot } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
import RealEstateListingAgentSidebar from "../../components/RealEstateListingAgentSidebar";
// import { Link } from "react-router-dom";

function HomeProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  
  const productStatus = useSelector((state: RootState) => state.products.status);
  const categoryProducts = useSelector((state: RootState) => state.products.categoryProducts);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
  const [value, setValue] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // const [currency, setCurrency] = useState("USD");
 

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (product?.selectedCategory) {
      dispatch(fetchProductsByCategory("Home Products"));
      console.log(product)
    }
  }, [product?.selectedCategory, dispatch]);

  useEffect(() => {
    if (categoryProducts.length > 0) {
      const productsWithReviews = categoryProducts.filter((p: any) => p.reviews?.length > 0);


      if (productsWithReviews.length > 0) {
        const highestReviewedProduct = productsWithReviews.sort((a, b) => (b as any).reviews.length - (a as any).reviews.length)[0];
        setSuggestedProducts([highestReviewedProduct]);
      } else {
        const shuffledProducts = [...categoryProducts].sort(() => 0.5 - Math.random()).slice(0, 3);
        setSuggestedProducts(shuffledProducts);
      }
    }
  }, [categoryProducts]);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const exchangeRates = {
    USD: 1,
    PKR: 280,
    AED: 3.67,
    GBP: 0.78,
  };
  
  const convertPrice = (price: number) => {
    return (price * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2);
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/images/default.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${imagePath}`;
  };

  if (productStatus === 'loading' || !product) {
    return <div>Loading...</div>;
  }
  const selectedImages = Array.isArray(product?.selectedImages)
  ? product.selectedImages
  : JSON.parse(product?.selectedImages || "[]");
  return (
    <>
      <section className={`${styles.homeProductDetailMainBox} py-5`}>
        
      {/* <GalleryBox featureImage={product.featureImage} images={selectedImages} /> */}
        <div className="container">
          <div className="row">
          <FetchedImage featureImage={product.featureImage} images={selectedImages} />
            <div className="col-md-6 px-4">
              <div className={`${styles.productDetailContentMainBox} py-3`}>
                <h2 className={`${styles.productName}`}>{product.productName}</h2>
                <h4 className={`${styles.vendorName}`}>
                  BY <Link to="#">{JSON.parse(`${product.vendorDetails}`)?.store_name}</Link>
                </h4>
                <div className={`${styles.reviewBox} d-flex py-1`}>
                  {product.numberOfReviews > 0 &&
                    Array.from({ length: product.numberOfReviews }).map((_, index) => (
                      <img key={index} src={star} alt="Pro Homez" className={`${styles.reviewStar}`} />
                    ))}
                </div>
                <div className={`${styles.productPriceBox} d-flex py-3 align-items-end`}>
                <h4 className={`${styles.productDiscountedPrice} mb-0`}>
                {currency} {convertPrice(product.discountedPrice ?? product.productPrice)}
</h4>

{product.discountedPrice !== undefined && product.discountedPrice > 0 && (
  <h4 className={`${styles.productPrice} mb-0`}>${product.productPrice}</h4>
)}
</div>
                <div className="currency-selector mt-2.5 mb-5">
  <label>Select Currency: </label>
  <select value={currency} onChange={handleCurrencyChange} className='font-extrabold'>
    <option value="USD">USD ($)</option>
    <option value="PKR">PKR (₨)</option>
    <option value="AED">AED (د.إ)</option>
    <option value="GBP">GBP (£)</option>
  </select>
</div>

                <div className={`d-flex gap-3 align-items-center my-3`}>
                  <div className={`${styles.cartValueBox} d-flex align-items-center`}>
                    <span className={`${styles.cartvalueController}`} onClick={() => setValue((prev) => Math.max(1, prev - 1))}>
                      <TiMinus />
                    </span>
                    <input
                      type="number"
                      className={`${styles.cartValueDisplay}`}
                      value={value}
                      onChange={(e) => setValue(Math.max(1, Math.min(15, parseInt(e.target.value, 10) || 1)))}
                    />
                    <span className={`${styles.cartvalueController}`} onClick={() => setValue((prev) => Math.min(15, prev + 1))}>
                      <TiPlus />
                    </span>
                  </div>
                  <button className={`${styles.addToCartBtn} btn`} onClick={() => {
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([
                          ...cart.filter((item: Product) => item.id !== product.id),
                          { ...product, quantity: value },
                      ])
                  );
                  alert('Product added to cart successfully!');
                  }}>
                    Add To Cart
                  </button>
                </div>
                <div className={`${styles.descriptionBox} pb-3`}>
                  <h5 className={`${styles.productDetailHeading}`}>Description</h5>
                  <p className={`${styles.productDetailPara} mb-0`}>
                    {isDescriptionExpanded ? product.productDescription : `${product.productDescription.split(' ').slice(0, 90).join(' ')}...`}
                    {product.productDescription.split(' ').length > 90 && (
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className={`${styles.readMoreButton}`}
                      >
                        {isDescriptionExpanded ? <>Show Less <MdOutlineArrowDropUp /></> : <>Read More <IoMdArrowDropdown /></>}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {suggestedProducts.length > 0 && (
    <section className="container my-5">
        <h1 className="md:text-6xl text-3xl">Suggested Products</h1>
        <div className="row">
            {suggestedProducts.map((suggestedProduct) => (
                <div key={suggestedProduct.id} className="col-12 col-sm-6 col-md-4 mb-4">
                    <Link
                        to={`/products/Real Estate/${suggestedProduct.productName.replace(/\s+/g, "-")}`}
                        className="text-decoration-none"
                    >
                        <div className="card shadow-sm">
                            <img
                                src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${suggestedProduct.featureImage}`}
                                alt={suggestedProduct.productName}
                                className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h1 className="text-6xl">{suggestedProduct.productName}</h1>
                                <h2 className="md:text-2xl text-6xl">Price: <h2 className='md:text-2xl text-6xl'>${suggestedProduct.productPrice}</h2></h2>
                                <h3 className="md:text-2xl text-6xl">Category: {suggestedProduct.selectedCategory}</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </section>
)}

      
    </>
  );
}

export default HomeProductDetail;
