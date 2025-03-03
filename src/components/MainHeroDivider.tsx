import styles from '../style/MainHeroDivider.module.css';
import realEstateIllustration from '../assets/images/realestate-icon.webp';
import homeIllustration from '../assets/images/pexels-amar-saleem-15661-70441.jpg';
import anotherIllustration from '../assets/images/still-life-various-cleaning-products.jpg'; // Second image
import { Link } from 'react-router-dom';

function MainHeroDivider() {
  return (
    <section className={`${styles.mainHeroDivider}`}>
      <div className="container-fluid">
        <div className="row">
          {/* Left Section */}
          <div className={`col-md-6 ${styles.heroBoxContainer} ${styles.realestateBackground} position-relative`}>
            <div className={`${styles.heroBox}`}>
              <div className={`${styles.heroBoxContent} position-relative`}>
                <img src={homeIllustration} alt="Pro Homez Property" className={`${styles.mainHeroIllustration}`} />
                <h2 className={`${styles.mainHeroHeading}`}>Your Property, Your Future</h2>
                <p className={`${styles.mainHeroParagraph} text-center`}>Design your lifestyle with beautiful home.</p>
                <Link to="/real-estate" className={`btn ${styles.mainHeroBtn}`}>Browse Properties</Link>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className={`col-md-6 ${styles.heroBoxContainer} ${styles.homeProductBackground} position-relative`}>
            <div className={`${styles.heroBox}`}>
              <div className={`${styles.heroBoxContent} position-relative`}>
                <img src={anotherIllustration} alt="Pro Homez Products" className={`${styles.mainHeroIllustration}`} />
                <h2 className={`${styles.mainHeroHeading}`}>Shop Home Products</h2>
                <p className={`${styles.mainHeroParagraph} text-center`}>Design your lifestyle with beautiful home products.</p>
                <Link to="/home-products" className={`btn ${styles.mainHeroBtn}`}>Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainHeroDivider;
