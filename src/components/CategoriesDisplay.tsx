import { useState } from 'react';
import styles from '../style/CategoriesDisplay.module.css';
import { Link } from 'react-router-dom';
import { categories } from './data';

// ✅ Import images from src/assets/images/
import livingRoomDecorImg from '../assets/images/16882.jpg';
import paintImg from '../assets/images/red-paint-can-brush.jpg';
import artImg from '../assets/images/pexels-shonejai-445753-1227497.jpg';
import tilesImg from '../assets/images/square-interior-floor-tiling-background.jpg';
import outdoorLightsImg from '../assets/images/pexels-jayoke-1146562.jpg';
import appliancesImg from '../assets/images/pexels-charlotte-may-5824883.jpg';

import residentialImg from '../assets/images/pexels-bohlemedia-1330753.jpg';
import rentalImg from '../assets/images/pexels-kindelmedia-7578977.jpg';
import luxuryAptImg from '../assets/images/pexels-joao-gustavo-rezende-15265-68389.jpg';

// ✅ Map images to category names
const categoryImages: Record<string, string> = {
    "Living Room Decor": livingRoomDecorImg,
    "Paint": paintImg,
    "Art": artImg,
    "Tiles & Sanitary": tilesImg,
    "Outdoor & Lights Decoration": outdoorLightsImg,
    "Home Appliances": appliancesImg,

    "Residential": residentialImg,
    "Rental": rentalImg,
    "Luxury Appartments": luxuryAptImg,
};

// ✅ Assign images to categories dynamically
const updatedCategories = categories.map(category => ({
    ...category,
    img: categoryImages[category.buttonText] || "", // Use mapped image or leave empty
}));

function CategoriesDisplay() {
    const [activeCategory, setActiveCategory] = useState("Real Estate");

    const categoryBtns = [
        { name: "Real Estate", id: "real-estate-categories" },
        { name: "Home Products", id: "home-product-categories" },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className={`${styles.categoriesDisplay} mb-0 text-center`}>Explore Categories</h3>
                </div>
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
                <div className="col-md-12 pt-4">
                    <div className="row">
                        {updatedCategories
                            .filter(category => category.category === activeCategory)
                            .map((item, index) => (
                                <div className="col-md-4 mb-4" key={index}>
                                    <div className={`${styles.categoryBox} position-relative`}>
                                        {item.img && <img src={item.img} alt={item.buttonText} className={`${styles.categoryImg}`} />}
                                        <Link to={item.src || "#"} className={`${styles.categoryBoxHeading} text-decoration-none`}>
                                            {item.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesDisplay;
