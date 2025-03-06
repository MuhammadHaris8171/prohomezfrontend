import { useState } from "react";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { TbShoppingCartCheck } from "react-icons/tb";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


interface CartProduct {
  id: number;
  productName: string;
  productPrice: number;
  discountedPrice?: number;
  quantity: number;
  slug: "";
  store_id:string;
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
  const [popupVisible, setPopupVisible] = useState(false); 
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Store your API key in .env

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
            store_id:item.store_id
          })),
          totalCost: calculateTotal(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
      const data = response.data; 
      console.log(response)
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
    <div className={`container py-5 px-5`}>
      <h2 className={`text-center mb-4 ${styles.checkoutPrimaryHeading}`}>Complete Your Purchase</h2>
      <div className="row">
        {/* Client Details Form */}
        <div className="col-md-6">
          <h4 className={styles.sectionTitle}>Shipping Information</h4>
          <form className={styles.checkoutForm}>
            <input
              type="text"
              name="name"
              placeholder="Full Name*"
              value={clientDetails.name}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={clientDetails.email}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              value={clientDetails.phone}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="address"
              placeholder="Address*"
              value={clientDetails.address}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="city"
              placeholder="City*"
              value={clientDetails.city}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="state"
              placeholder="State*"
              value={clientDetails.state}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            <input
              type="text"
              name="country"
              placeholder="Country*"
              value={clientDetails.country}
              onChange={handleInputChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code*"
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
      {/* Google Map */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", marginTop: "10px" }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.1880738890477!2d73.14565107330503!3d33.57446578390745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed29312b725d%3A0xed42137e02f8517a!2sEducare%20Direct%20International!5e0!3m2!1sen!2s!4v1741204028366!5m2!1sen!2s" 
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

        </div>
      </div>



    </div>
  );
}

export default Checkout;
