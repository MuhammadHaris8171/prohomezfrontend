import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styles from '../style/PageCategories.module.css';
import { categories } from './data';
import CategoryCard from './CategoryCard';

function  PageCategories({ category }: { category: string }) {
  const filteredCategories = category === "All"
    ? categories
    : categories.filter(item => item.category === category);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className={`${styles.pageCategoriesHeading} mb-0 text-center`}>
            Which of the following products best matches your style?
          </h3>
        </div>
        <div className="col-md-12 py-4 position-relative">
          <div className="row flex-nowrap justify-content-center overflow-hidden py-3">
            {filteredCategories.map((item, index) => (
              <div className="col-md-3" key={index}>
                <CategoryCard category={item} />
              </div>
            ))}
          </div>
          <div className={`${styles.sliderBtnContainer} position-absolute`}>
            <div className={`${styles.sliderBtn}`}>
              <MdArrowBackIosNew />
            </div>
            <div className={`${styles.sliderBtn}`}>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCategories;
