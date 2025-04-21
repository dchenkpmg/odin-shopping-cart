import { useLoaderData } from "react-router-dom";
import styles from "./StorePage.module.css";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";
import { useOutletContext } from "react-router-dom";

// refactor this to use item card component so as not to rerender the entire page
export default function StorePage() {
  const { cartItems, setCartItems, setCartItemCount } = useOutletContext();
  const items = useLoaderData();
  const cartItemCounts = items.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {});
  const [itemCount, setItemCount] = useState(cartItemCounts);
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newItemCount = { ...itemCount, [id]: parseInt(value) };
    setItemCount(newItemCount);
  };
  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (value < 1) {
      const newItemCount = { ...itemCount, [id]: 1 };
      setItemCount(newItemCount);
    } else if (value > 10) {
      const newItemCount = { ...itemCount, [id]: 10 };
      setItemCount(newItemCount);
    }
  };
  const handleAddItem = (id) => {
    if (itemCount[id] >= 10) {
      return;
    }
    const newItemCount = { ...itemCount, [id]: itemCount[id] + 1 };
    setItemCount(newItemCount);
  };
  const handleRemoveItem = (id) => {
    if (itemCount[id] <= 1) {
      return;
    }
    const newItemCount = { ...itemCount, [id]: itemCount[id] - 1 };
    setItemCount(newItemCount);
  };
  const handleAddToCart = (id, title, price, image) => {
    const itemToAdd = cartItems.find((item) => item.id === id);
    if (itemToAdd === undefined) {
      const newCartItems = [
        ...cartItems,
        {
          id: id,
          title: title,
          price: price,
          quantity: itemCount[id],
          image: image,
        },
      ];
      setCartItems(newCartItems);
      setCartItemCount(() => newCartItems.length);
    } else {
      const newCartItems = cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + itemCount[id],
          };
        }
      });
      setCartItems(newCartItems);
    }
  };
  return (
    <div className={styles.gridContainer}>
      {items.map((item) => (
        <div key={item.id} className={styles.storeItem}>
          <img src={item.image} alt={item.title} />
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <div className={styles.storeAddToCart}>
            <Icon
              path={mdiMinus}
              size={1}
              title="Remove Items"
              className={styles.quantityIcon}
              onClick={() => {
                handleRemoveItem(item.id);
              }}
            />
            <input
              type="number"
              min="1"
              id={item.id}
              value={itemCount[item.id]}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
            />
            <Icon
              path={mdiPlus}
              size={1}
              title="Add Items"
              className={styles.quantityIcon}
              onClick={() => {
                handleAddItem(item.id);
              }}
            />
          </div>
          <button
            className={styles.storeAddToCartButton}
            onClick={() =>
              handleAddToCart(item.id, item.title, item.price, item.image)
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
