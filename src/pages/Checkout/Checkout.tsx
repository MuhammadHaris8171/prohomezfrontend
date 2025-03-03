import { useState } from "react";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { TbShoppingCartCheck } from "react-icons/tb";
import axios from "axios";

interface CartProduct {
  id: number;
  productName: string;
  productPrice: number;
  discountedPrice?: number;
  quantity: number;
  slug: "";
}

function Checkout() {
  const [cartItems] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [popupVisible, setPopupVisible] = useState(false); // Controls the popup visibility
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const itemTotal = cartItems.reduce((total, item) => {
      const price = item.discountedPrice || item.productPrice;
      return total + price * item.quantity;
    }, 0);
    return (itemTotal).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!clientDetails.name || !clientDetails.address || !clientDetails.phone) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/checkout`,
        {
          clientDetails,
          cartItems: cartItems.map((item) => ({
            slug: item.slug,
            productName: item.productName,
            productPrice: item.productPrice,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity,
          })),
          totalCost: calculateTotal(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // Retrieve response data containing orderId
      setOrderId(data.orderId);
      // If successful, show the popup
      setPopupVisible(true);

      // Clear the cart
      localStorage.removeItem("cart");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error placing order:", error.response?.data.message || error.message);
        alert(error.response?.data.message || "Failed to place order");
      } else {
        console.error("Unknown error occurred:", error);
        alert("An unknown error occurred.");
      }
    }
  };

  const redirectToHome = () => {
    navigate("/"); // Redirect to the homepage
  };
  
  

  return (
    <div className={`container py-5`}>
      <h2 className={`text-center mb-4 ${styles.checkoutPrimaryHeading}`}>Complete Your Purchase</h2>
      <div className="row">
        {/* Client Details Form */}
        <div className="col-md-6">
          <h4 className={styles.sectionTitle}>Shipping Information</h4>
          <form className={styles.checkoutForm}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={clientDetails.name}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={clientDetails.email}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={clientDetails.phone}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={clientDetails.address}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={clientDetails.city}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={clientDetails.state}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={clientDetails.country}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={clientDetails.postalCode}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <h4 className={styles.sectionTitle}>Order Summary</h4>
          <div className={styles.orderSummary}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <span>{item.productName} (x{item.quantity})</span>
                <span>${(item.discountedPrice || item.productPrice) * item.quantity}</span>
              </div>
            ))}
            <div className={styles.totalCost}>
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
          <button
            className={`btn mt-3 w-100 ${styles.placeOrderButton}`}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {/* Popup */}
          {popupVisible && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
              <TbShoppingCartCheck className={`${styles.popupIcon}`} />
              <div className={`${styles.popupContentBox}`}>
                  <h3 className={styles.popupHeading}>Thank You! We’ll Start Processing Your Order!</h3>
                  <p className={styles.popupOrderId}>Save This Order ID for Tracking: <strong>{orderId}</strong></p>
                </div>
                <button onClick={redirectToHome} className={styles.popupButton}>
                  Check Out More Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
