import React from 'react';
import { Link } from 'react-router-dom';

interface QuickSearchLinksProps {
  quickSearches: string[];
}

const QuickSearchLinks: React.FC<QuickSearchLinksProps> = ({ quickSearches }) => {
  return (
    <div className='text-amber-300'>
      {quickSearches.map((term, index) => {
        const isGeneralCategory = term === "Real Estate" || term === "Home Products";
        const linkPath = isGeneralCategory ? `/${term}` : `/category/${term}`; // 🔹 Conditionally remove category

        return (
          <Link 
            key={index} 
            to={linkPath}
            style={{ marginRight: '2.2rem',textDecoration: "none",color: "white",backgroundColor: "rgba(196,153,81,255)" ,fontWeight: "700",fontSize: "1.7rem",paddingTop: "1rem",paddingBottom: "1rem",paddingLeft:"1rem",paddingRight:"1rem",fontFamily: "fantasy" }}
            className='text-amber-400'
          >
            {term}
          </Link>
        );
      })}
    </div>
  );
};

export default QuickSearchLinks;
