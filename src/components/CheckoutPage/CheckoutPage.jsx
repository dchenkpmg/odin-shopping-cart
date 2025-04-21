import styles from "./CheckoutPage.module.css";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems } = useOutletContext();
  return (
    <div className={styles.checkoutPage}>
      <h1>Your Cart</h1>
      <div className={styles.cartItemsList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImageName}>
              <img src={item.image} alt={item.name} />
              <p>{item.title}</p>
            </div>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <div className={styles.checkoutLinks}>
        <Link to="/checkout" className={styles.checkoutButton}>
          Checkout
        </Link>
        <Link to="/store" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
