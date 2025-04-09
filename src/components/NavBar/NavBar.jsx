import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

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
          Checkout
        </Link>
      </div>
    </div>
  );
}
