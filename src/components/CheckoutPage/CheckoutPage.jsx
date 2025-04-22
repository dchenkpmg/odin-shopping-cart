import styles from "./CheckoutPage.module.css";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";
import PropTypes from "prop-types";

export default function CheckoutPage() {
  const { cartItems, setCartItems, setCartItemCount } = useOutletContext();

  const handleRemoveItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    setCartItemCount(newCartItems.length);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    const newCartItems = cartItems.map((item) => {
      if (item.id.toString() === id) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (value < 1) {
      const newCartItems = cartItems.map((item) => {
        if (item.id.toString() === id) {
          return { ...item, quantity: 1 };
        }
        return item;
      });
      setCartItems(newCartItems);
    } else if (value > 10) {
      const newCartItems = cartItems.map((item) => {
        if (item.id.toString() === id) {
          return { ...item, quantity: 10 };
        }
        return item;
      });
      setCartItems(newCartItems);
    }
  };

  const handleAddQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        if (item.quantity >= 10) {
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleRemoveQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        if (item.quantity <= 1) {
          return item;
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
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
                <p className={styles.quantity}>${item.price}</p>
                <div className={styles.storeAddToCart}>
                  <Icon
                    path={mdiMinus}
                    size={1}
                    title="Remove Items"
                    className={styles.quantityIcon}
                    onClick={() => {
                      handleRemoveQuantity(item.id);
                    }}
                  />
                  <input
                    type="number"
                    min="1"
                    id={item.id}
                    value={item.quantity}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                  <Icon
                    path={mdiPlus}
                    size={1}
                    title="Add Items"
                    className={styles.quantityIcon}
                    onClick={() => {
                      handleAddQuantity(item.id);
                    }}
                  />
                </div>
                <p className={styles.quantity}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
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
              {cartItems
                .reduce((total, item) => {
                  return total + item.price * item.quantity;
                }, 0)
                .toFixed(2)}
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

CheckoutPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  setCartItemCount: PropTypes.func.isRequired,
};
