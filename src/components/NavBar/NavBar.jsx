import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";
import PropTypes from "prop-types";

export default function NavBar({ itemCount }) {
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
        <Link to="/checkout" className={styles.navLinkCart}>
          <Icon path={mdiCart} size={1.5} title="Shopping Cart" />
          {itemCount > 0 && (
            <span className={styles.cartItemCount}>{itemCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  itemCount: PropTypes.number.isRequired,
};

NavBar.defaultProps = {
  itemCount: 0,
};
