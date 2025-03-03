import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and Close Icons
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import proHomezLogo from "../../assets/images/prohomez-logo.webp";
import { useState, useEffect } from "react";
import styles from "./Header.module.css"; // Import CSS Module

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if token exists
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <header className={styles.head}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src={proHomezLogo} alt="ProHomez Logo" className={styles.headerLogo} />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navLinks}>
            <NavLink to="/real-estate" className={styles.navbarNavLink}>
              Real Estate
            </NavLink>
            <NavLink to="/home-products" className={styles.navbarNavLink}>
              Home Products
            </NavLink>
            <NavLink to="/vendors" className={styles.navbarNavLink}>
              Vendors
            </NavLink>
            <NavLink to="/contact" className={styles.navbarNavLink}>
              Contact
            </NavLink>
          </nav>

          {/* Right Side (Icons + Login) */}
          <div className={styles.rightSection}>
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={styles.navbarNavLink}>
                  Login
                </NavLink>
                <NavLink to="/vendor-registration" className={styles.navbarNavLink}>
                  Become Vendor
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/vendor-dashboard" className={styles.navbarNavLink}>
                  Vendor Dashboard
                </NavLink>
                <button onClick={handleLogout} className={styles.navbarNavLink}>
                  Logout
                </button>
              </>
            )}
            <NavLink to="/" className={styles.navbarNavLink}>
              <FaRegHeart />
            </NavLink>
            <NavLink to="/cart" className={styles.navbarNavLink}>
              <BsCart4 />
            </NavLink>

            {/* Hamburger Icon for Mobile */}
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars/>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
{menuOpen && (
  <div className={styles.mobileMenu}>
    <NavLink to="/real-estate" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
      Real Estate
    </NavLink>
    <NavLink to="/home-products" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
      Home Products
    </NavLink>
    <NavLink to="/vendors" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
      Vendors
    </NavLink>
    <NavLink to="/contact" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
      Contact
    </NavLink>

    {!isLoggedIn ? (
      <>
        <NavLink to="/login" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
          Login
        </NavLink>
        <NavLink to="/vendor-registration" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
          Become Vendor
        </NavLink>
      </>
    ) : (
      <>
        <NavLink to="/vendor-dashboard" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
          Vendor Dashboard
        </NavLink>
        <button onClick={handleLogout} className={styles.mobileNavLink}>
          Logout
        </button>
      </>
    )}

    {/* 🛒 Cart & Wishlist Icons in Mobile Menu */}
    <div className={styles.mobileIcons}>
      <NavLink to="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
        <FaRegHeart />
      </NavLink>
      <NavLink to="/cart" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
        <BsCart4 />
      </NavLink>
    </div>
  </div>
)}

      </div>
    </header>
  );
}

export default Header;
