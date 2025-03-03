import { BsCart4 } from "react-icons/bs";
import styles from "./Header.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import proHomezLogo from "../../assets/images/prohomez-logo.webp";
import { useState, useEffect } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <>
      <header className={`${styles.head}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-5">
              <nav className={`${styles.navbar}`}>
                <ul className={`${styles.unOrderList} d-flex list-unstyled mb-0`}>
                  <li className={`${styles.navbarListItem}`}>
                    <NavLink
                      to="/real-estate"
                      className={`${styles.navbarNavLink} text-decoration-none`}
                    >
                      Real Estate
                    </NavLink>
                  </li>
                  <li className={`${styles.navbarListItem}`}>
                    <NavLink
                      to="/home-products"
                      className={`${styles.navbarNavLink} text-decoration-none`}
                    >
                      Home Products
                    </NavLink>
                  </li>
                  <li className={`${styles.navbarListItem}`}>
                    <NavLink
                      to="/vendors"
                      className={`${styles.navbarNavLink} text-decoration-none`}
                    >
                      Vendors
                    </NavLink>
                  </li>
                  <li className={`${styles.navbarListItem}`}>
                    <NavLink
                      to="/contact"
                      className={`${styles.navbarNavLink} text-decoration-none`}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <Link to="/">
                <img
                  src={proHomezLogo}
                  alt="Sigma 6 Digital Logo"
                  className={`${styles.headerLogo}`}
                />
              </Link>
            </div>
            <div className="col-5">
              <ul
                className={`${styles.unOrderList} d-flex list-unstyled mb-0 justify-content-end`}
              >
                {!isLoggedIn ? (
                  <>
                    <li className={`${styles.navbarListItem}`}>
                      <NavLink
                        to="/login"
                        className={`${styles.navbarNavLink} text-decoration-none`}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className={`${styles.navbarListItem}`}>
                      <NavLink
                        to="/vendor-registration"
                        className={`${styles.navbarNavLink} text-decoration-none`}
                      >
                        Become Vendor
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={`${styles.navbarListItem}`}>
                      <NavLink
                        to="/vendor-dashboard"
                        className={`${styles.navbarNavLink} text-decoration-none border-0`}
                      >
                        vendor Dashboard
                      </NavLink>
                    </li>
                    <li className={`${styles.navbarListItem}`}>
                      <button
                        onClick={handleLogout}
                        className={`${styles.navbarNavLink} text-decoration-none border-0`}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                <li className={`${styles.navbarListItem}`}>
                  <NavLink
                    to="/"
                    className={`${styles.navbarNavLink} text-decoration-none`}
                  >
                    <FaRegHeart />
                  </NavLink>
                </li>
                <li className={`${styles.navbarListItem}`}>
                  <NavLink
                    to="/cart"
                    className={`${styles.navbarNavLink} text-decoration-none`}
                  >
                    <BsCart4 />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
