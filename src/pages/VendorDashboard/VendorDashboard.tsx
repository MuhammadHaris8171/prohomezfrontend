import { Route, Routes } from 'react-router-dom';
import VendorSidebarMain from '../../components/VendorSidebarMain';
import VendorDashboardProducts from '../../components/VendorDashboardProducts';
import CreateProduct from '../../components/CreateProduct';
import DisplayMedia from '../../components/DisplayMedia';
import EditProduct from '../../components/EditProduct';
import Orders from '../orders/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { fetchVendorDetails } from '../../features/products/productSlice';
import VendorDashboardVendors from '../../components/VendorDashboardVendors';
import VendorProfile from '../../components/VendorProfile';

function VendorDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const vendor = useSelector((state: RootState) => state.products.vendorDetails);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(fetchVendorDetails());
      setLoading(false);
    };
    fetchDetails();
  }, [dispatch]);

  useEffect(() => {
    if (vendor?.isAdmin === 1) {
      setIsAdmin(true);
    }
  }, [vendor]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 px-0">
          <VendorSidebarMain isAdmin={isAdmin} />
        </div>
        <div className="col-10">
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="overview" element={<VendorDashboardProducts isAdmin={isAdmin} />} />
              <Route path="media" element={<DisplayMedia isAdmin={isAdmin} />} />
              <Route path="products" element={<VendorDashboardProducts isAdmin={isAdmin} />} />
              <Route path="vendors" element={<VendorDashboardVendors/>} />
              <Route path="orders" element={<Orders isAdmin={isAdmin} />} />
              <Route path="payment" element={<VendorDashboardProducts isAdmin={isAdmin} />} />
              <Route path="profile" element={<VendorProfile />} />
              {!isAdmin && <Route path="products/create" element={<CreateProduct />} />}
              <Route path="products/edit/:slug" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
