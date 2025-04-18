import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>Blah Goods</div>
        <div className={styles.links}>
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
        <div className={styles.footerDescription}>
          Blah Goods is a leading online store offering a wide range of products
          at unbeatable prices. Our mission is to provide customers with the
          best shopping experience possible. Come and visit our store to find
          the best deals of all time - money back guaranteed!
        </div>
        <div className={styles.footerCopyright}>
          Copyright © 2025 Blah Goods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
