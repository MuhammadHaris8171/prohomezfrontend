import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css";

interface Order {
  order_id: string;
  client_details: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  cart_items: Array<{
    productName: string;
    quantity: number;
    productPrice: number;
    discountedPrice?: number;
  }>;
  total_cost: number;
  order_date: string;
}

interface VendorSidebarMainProps {
  isAdmin: boolean;
}


function Orders({ isAdmin }: VendorSidebarMainProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
            params: { isAdmin },
          }
        );
        setOrders(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || "Failed to fetch orders");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <h2 className={`mb-4 ${styles.ordersHeading}`}>Your Orders</h2>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.order_id} className={styles.orderCard}>
            <h4 className={styles.orderId}>Order ID: {order.order_id}</h4>
            <p className={styles.orderDate}>Date: {new Date(order.order_date).toLocaleDateString()}</p>
            <h5 className={`${styles.orderDetailHeading}`}>Customer Details:</h5>
            <p>
              <strong>Name: </strong>{JSON.parse(`${order.client_details}`).name}
              <br />
              <strong>Email: </strong>{JSON.parse(`${order.client_details}`).email}
              <br />
              <strong>Number: </strong>{JSON.parse(`${order.client_details}`).phone}
              <br />
              <strong>Address: </strong>{JSON.parse(`${order.client_details}`).address}, {JSON.parse(`${order.client_details}`).city}, {JSON.parse(`${order.client_details}`).state}, {JSON.parse(`${order.client_details}`).country} - {JSON.parse(`${order.client_details}`).postalCode}
            </p>
            <h5 className={`${styles.orderDetailHeading}`}>Order Items:</h5>
            <ul>
              {JSON.parse(`${order.cart_items}`).map((item:any, index:number) => (
                <li key={index}>
                  {item.productName} (x{item.quantity}) - $
                  {((item.discountedPrice || item.productPrice) * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <h5 className={`${styles.orderDetailHeading}`}>Total Cost: ${order.total_cost.toFixed(2)}</h5>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
