import { useLoaderData } from "react-router-dom";
import styles from "./StorePage.module.css";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

export default function StorePage({ cartItems, setCartItems }) {
  const items = useLoaderData();
  const cartItemCounts = items.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {});
  const [itemCount, setItemCount] = useState(cartItemCounts);
  const handleChange = (e) => {};
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
              value={itemCount[item.id]}
              onChange={(e) => handleChange(e)}
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
          <button className={styles.storeAddToCartButton}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
