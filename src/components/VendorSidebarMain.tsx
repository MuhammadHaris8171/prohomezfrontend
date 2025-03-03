import styles from '../style/VendorSidebarMain.module.css'
import logo from '../assets/images/prohomez-logo.webp'
import { NavLink } from 'react-router-dom'
import { BsFillGridFill } from 'react-icons/bs'
import { FaShoppingBag } from 'react-icons/fa'
import { GiShoppingCart } from 'react-icons/gi'
import { MdOutlinePayment } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { IoIosAddCircle } from 'react-icons/io'
import { FaPerson } from 'react-icons/fa6'

interface VendorSidebarMainProps {
  isAdmin: boolean;
}

function VendorSidebarMain({ isAdmin }: VendorSidebarMainProps) {
  return (
    <>
    <div className={`${styles.vendorSidebarMainBox}`}>
        <div className={`${styles.sidebarLogoBox} d-flex justify-content-center`}>
            <img src={logo} alt="Pro Homez" className={`${styles.sidebarLogo}`} />
        </div>
        <div className={`${styles.sidebarMenuBox}`}>
            <h4 className={`${styles.sidebarMenuHeading}`}>Menu</h4>
            <ul className={`${styles.sidebarlistContainer} list-unstyled`}>
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/overview" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><BsFillGridFill /> Overview</NavLink></li>
                {isAdmin && <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/vendors" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><FaPerson /> All Vendors</NavLink></li>}
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/media" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><BsFillGridFill /> Media</NavLink></li>
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/products" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><FaShoppingBag /> Products</NavLink></li>
                {!isAdmin && <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/products/create" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><IoIosAddCircle /> Add New Product</NavLink></li>}
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/orders" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><GiShoppingCart /> Orders</NavLink></li>
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/payment" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><MdOutlinePayment /> Payment</NavLink></li>
                <li className={`${styles.sidebarMenuList}`}><NavLink to="/vendor-dashboard/profile" className={({ isActive }) => isActive ? `${styles.activeMenu}` : ''} ><CgProfile /> Profile</NavLink></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default VendorSidebarMain