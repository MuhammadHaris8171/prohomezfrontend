import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../style/EditProduct.module.css';
import { MdPermMedia } from 'react-icons/md';
import { categories } from './data';
import ImageSelection from './ImageSelection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, updateProduct, fetchVendorProducts } from '../features/products/productSlice.ts';
import { AppDispatch, RootState } from '../store/store.ts';

const EditProduct: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) => state.products.singleProduct);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isImageSelectionVisible, setImageSelectionVisible] = useState(false);
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [discountedPrice, setDiscountedPrice] = useState<number | undefined>();
  const [productDescription, setProductDescription] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    selectedCategory: '',
    selectedImages: '',
  });

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    console.log(product)
    if (product) {
      setProductName(product.productName || '');
      setProductPrice(`${product.productPrice || ''}`);
      setDiscountedPrice(product.discountedPrice || undefined);
      setProductDescription(product.productDescription || '');
      setSelectedCategory(product.selectedCategory || '');
      setSelectedImages(Array.isArray(product.selectedImages) ? product.selectedImages : JSON.parse(product.selectedImages || '[]'));
    }
  }, [product]);

  const validateFields = () => {
    const newErrors: any = {};

    if (!productName.trim()) newErrors.productName = 'Product name is required.';
    if (!productPrice.trim()) newErrors.productPrice = 'Product price is required.';
    if (!productDescription.trim()) newErrors.productDescription = 'Product description is required.';
    if (!selectedCategory.trim()) newErrors.selectedCategory = 'Product category is required.';
    if (selectedImages.length === 0) newErrors.selectedImages = 'At least one image must be selected.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLabelClick = () => {
    setImageSelectionVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsLoading(true);

    const updatedProductData = {
      slug,
      productName,
      productPrice: parseFloat(productPrice),
      discountedPrice,
      productDescription,
      selectedCategory,
      selectedImages,
    };

    try {
      await dispatch(updateProduct(updatedProductData)).unwrap();
      await dispatch(fetchVendorProducts());
      console.log("Complete")
      navigate('/vendor-dashboard/products', {
        state: { message: 'Product has been updated successfully.' },
      });
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseImageSelection = () => {
    setImageSelectionVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className={styles.createProductMainBox}>
        <form onSubmit={handleSubmit}>
          {isImageSelectionVisible && (
            <div className={styles.imageSelectionContainer}>
              <ImageSelection
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                onClose={handleCloseImageSelection}
              />
            </div>
          )}

          <div className={styles.imgSeclectedBox}>
            <h3 className={`${styles.primaryHeading}`}>
              Select Images<span className={`${styles.importantFilling}`}>*</span>
            </h3>
            <span
              className={`${styles.insertMediaLabel} py-2 px-4 rounded-3`}
              onClick={handleLabelClick}
            >
              <MdPermMedia /> Add Media
            </span>
            <div className={`${styles.imagePreview} d-flex gap-3`}>
              {selectedImages.map((image, index) => (
                <div key={index} className={`${styles.selectedImage}`}>
                  <img
                    src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${image}`}
                    alt={`Preview ${index + 1}`}
                    className={styles.imagePreviewItem}
                  />
                </div>
              ))}
            </div>
            {errors.selectedImages && <div className={styles.errorText}>{errors.selectedImages}</div>}
          </div>

          <div className={`${styles.contentGatheringBox}`}>
            <div className="row">
              <div className="col-12">
                <div className={`${styles.inputBox}`}>
                  <label htmlFor="productName" className={`${styles.secondaryHeading} form-label`}>
                    Product Name<span className={`${styles.importantFilling}`}>*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    className={`${styles.inputTag} form-control`}
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  {errors.productName && <div className={styles.errorText}>{errors.productName}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className={`${styles.inputBox}`}>
                  <label htmlFor="productPrice" className={`${styles.secondaryHeading} form-label`}>
                    Product Price<span className={`${styles.importantFilling}`}>*</span>
                  </label>
                  <input
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    className={`${styles.inputTag} form-control`}
                    placeholder="0"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  {errors.productPrice && <div className={styles.errorText}>{errors.productPrice}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className={`${styles.inputBox}`}>
                  <label
                    htmlFor="discountedPrice"
                    className={`${styles.secondaryHeading} form-label`}
                  >
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    id="discountedPrice"
                    className={`${styles.inputTag} form-control`}
                    placeholder="0"
                    value={discountedPrice || ''}
                    onChange={(e) => setDiscountedPrice(parseFloat(e.target.value) || undefined)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className={`${styles.inputBox}`}>
                  <label
                    htmlFor="productDescription"
                    className={`${styles.secondaryHeading} form-label`}
                  >
                    Product Description<span className={`${styles.importantFilling}`}>*</span>
                  </label>
                  <textarea
                    name="productDescription"
                    id="productDescription"
                    placeholder="Write Here"
                    rows={5}
                    className={`${styles.inputTag} form-control`}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>
                  {errors.productDescription && <div className={styles.errorText}>{errors.productDescription}</div>}
                </div>
              </div>

              <div className="col-12">
                <div className={`${styles.inputBox}`}>
                  <h4 className={`${styles.secondaryHeading}`}>
                    Product Category<span className={`${styles.importantFilling}`}>*</span>
                  </h4>
                  <div className="d-flex flex-wrap row-gap-2 column-gap-4">
                    {categories
                      .filter((item) => item.category === 'Home Products')
                      .map((category, index) => (
                        <div key={index} className="form-check">
                          <input
                            type="radio"
                            name="productCategory"
                            id={`category-${index}`}
                            value={category.buttonText}
                            className="form-check-input"
                            checked={selectedCategory === category.buttonText}
                            onChange={() => setSelectedCategory(category.buttonText)}
                          />
                          <label className="form-check-label" htmlFor={`category-${index}`}>
                            {category.buttonText}
                          </label>
                        </div>
                      ))}
                  </div>
                  {errors.selectedCategory && <div className={styles.errorText}>{errors.selectedCategory}</div>}
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-end py-4">
                  <button
                    type="submit"
                    className={`${styles.createProductBtn} btn`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Update Product'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
