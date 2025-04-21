import styles from "./CheckoutPage.module.css";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, setCartItems, setCartItemCount } = useOutletContext();

  const handleRemoveItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    setCartItemCount(newCartItems.length);
  };

  return (
    <div className={styles.checkoutPage}>
      {cartItems.length > 0 ? (
        <>
          <h1>Your Cart</h1>
          <div className={styles.cartItemsHeader}>
            <div className={styles.itemHeader}>
              <h2>Item</h2>
            </div>
            <div className={styles.itemHeaderOther}>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
              <h2></h2>
            </div>
          </div>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImageName}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.title}</p>
                </div>
                <p>${item.price}</p>
                <p>{item.quantity}</p>
                <p>${item.price * item.quantity}</p>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={styles.checkoutLinks}>
            <h1 className={styles.totalPrice}>
              Total: $
              {cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0)}
            </h1>
            <Link to="/checkout" className={styles.checkoutButton}>
              Checkout
            </Link>
            <Link to="/store" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
}
