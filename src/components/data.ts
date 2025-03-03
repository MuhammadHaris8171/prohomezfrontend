import categoryImg from "../assets/images/category-temporary.webp";
import { Category, Feature, ParentCategoryPageContent, ProductDetail, ProductList } from './types';
import HomeProductBgImg from '../assets/images/home-product-hero-bg.webp'
import RealEstateBgImg from '../assets/images/real-estate-hero-bg.webp'
import vendorLogo from '../assets/images/vendor-temporary.webp'
import ProductDummyImg from '../assets/images/product-dummy-img.webp'

import realEstateProductONe from '../assets/images/realEstateProduct-1.webp'
import realEstateProductTwo from '../assets/images/realEstateProduct-2.webp'
import realEstateProductThree from '../assets/images/realEstateProduct-3.webp'
import realEstateProductFour from '../assets/images/realEstateProduct-4.webp'
import realEstateProductFive from '../assets/images/realEstateProduct-5.webp'

export const vendors: Feature[] = [
  { name: "Wood In-out", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "KORKMAZ MOBILYA", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "ITTIHAD", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "Damac", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "ZEM Builders", parentCategory: "Real Estate", featureImage: vendorLogo, src: "#", },
  { name: "Landchester", parentCategory: "Real Estate", featureImage: vendorLogo, src: "#", },
  { name: "MGC Develop", parentCategory: "Real Estate", featureImage: vendorLogo, src: "#", },
  { name: "Prism Heights", parentCategory: "Real Estate", featureImage: vendorLogo, src: "#", },
  { name: "Mall Of Korang", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "Danube Properties", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "Sarhad Steel Islamabad", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
  { name: "Art ways", parentCategory: "Home Products", featureImage: vendorLogo, src: "#", },
];
export const categories: Category[] = [
  { img: categoryImg, src: "/category/Living Room Decor", buttonText: "Living Room Decor", category: "Home Products" },
  { img: categoryImg, src: "/category/Paint", buttonText: "Paint", category: "Home Products" },
  { img: categoryImg, src: "/category/Art", buttonText: "Art", category: "Home Products" },
  { img: categoryImg, src: "/category/Tiles & Sanitary", buttonText: "Tiles & Sanitary", category: "Home Products" },
  { img: categoryImg, src: "/category/Outdoor & Lights Decoration", buttonText: "Outdoor & Lights Decoration", category: "Home Products" },
  { img: categoryImg, src: "/category/Home Appliances", buttonText: "Home Appliances", category: "Home Products" },
  { img: categoryImg, src: "/category/Residential", buttonText: "Residential", category: "Real Estate" },
  { img: categoryImg, src: "/category/Rental", buttonText: "Rental", category: "Real Estate" },
  { img: categoryImg, src: "/category/Luxury Apartments", buttonText: "Luxury Apartments", category: "Real Estate" },
  { category: "Electronics", buttonText: "Mobile Phones" },
  { category: "Electronics", buttonText: "Laptops" }
];
export const productList: ProductList[] = [
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 4, productId: "a1"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 3, productId: "a2"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 5, productId: "a3"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 3, productId: "a4"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 4, productId: "a5"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 4, productId: "a6"},
  {featureImage: ProductDummyImg, name: "Irani Achim Nexus Black & White 12×24 Self Adhesive Vinyl Tile", price: 1234, parentCategory: "Home Products", reviews: 4, productId: "a7"},
  {featureImage: realEstateProductONe, name: "Damac Hills", price: 12345, parentCategory: "Real Estate", reviews: 3, productId: "a8"},
  {featureImage: realEstateProductONe, name: "Damac Hills", price: 12345, parentCategory: "Real Estate", reviews: 3, productId: "a9"},
  {featureImage: realEstateProductONe, name: "Damac Hills", price: 12345, parentCategory: "Real Estate", reviews: 4, productId: "a10"},
  {featureImage: realEstateProductONe, name: "Damac Hills", price: 12345, parentCategory: "Real Estate", reviews: 4, productId: "a11"},
]
export const HomeProductPageContent: ParentCategoryPageContent = {
  heroSection: {
    heading: "Bring Your Dream Home to Life with ProHomez",
    description: "Explore our curated collection of premium home products that adds style, warmth, and personality to any space.",
    quickSearches: ['Luxury Homes', 'Furniture', 'Lighting'],
    bgImage: HomeProductBgImg,
  },
  category: "Home Products",
}
export const RealEstatePageContent: ParentCategoryPageContent = {
  heroSection: {
    heading: "Find Your Perfect Property with ProHomez Real Estate",
    description: "Explore our exclusive selection of premium residential properties and luxury apartments, designed for those who seek the finest in home living.",
    quickSearches: ['Luxury Apartments', 'Residential', 'Premium Homes'],
    bgImage: RealEstateBgImg,
  },
  category: "Real Estate",
}