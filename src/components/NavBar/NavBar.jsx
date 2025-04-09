import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarStart}>
        <Link to="/" className={styles.navLinkHome}>
          Blah Goods
        </Link>
      </div>
      <div className={styles.navbarCenter}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/store" className={styles.navLink}>
          Store
        </Link>
        <Link to="/checkout" className={styles.navLink}>
          <Icon path={mdiCart} size={1.5} title="Shopping Cart" />
          {/* TODO: include a number of items in the cart icon */}
        </Link>
      </div>
    </div>
  );
}
