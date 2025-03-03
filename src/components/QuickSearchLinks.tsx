import React from 'react';
import { Link } from 'react-router-dom';

interface QuickSearchLinksProps {
  quickSearches: string[];
}

const QuickSearchLinks: React.FC<QuickSearchLinksProps> = ({ quickSearches }) => {
  return (
    <div>
      {quickSearches.map((term, index) => {
        const isGeneralCategory = term === "Real Estate" || term === "Home Products";
        const linkPath = isGeneralCategory ? `/${term}` : `/category/${term}`; // 🔹 Conditionally remove category

        return (
          <Link 
            key={index} 
            to={linkPath}
            style={{ marginRight: '2.2rem',textDecoration: "none",color: "white",backgroundColor: "rgba(195, 199, 196,0.3)" ,fontWeight: "700",fontSize: "1.7rem" }}
          >
            {term}
          </Link>
        );
      })}
    </div>
  );
};

export default QuickSearchLinks;
