import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import productImage1 from "../../assets/product-1.jpg";
import productImage2 from "../../assets/product-2.jpg";
import productImage3 from "../../assets/product-3.jpg";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Blah Goods</h1>
          <p>
            Discover amazing products and deals on a wide range of goods sourced
            from all over the world!
          </p>
          <Link to="/store" className={styles.heroButtonLink}>
            Shop Now
          </Link>
        </div>
      </div>

      <div className={styles.imageBlocks}>
        <div className={styles.block}>
          <img src={productImage1} alt="Discount Sale Image" />
          <div className={styles.blockContent}>
            <h2>Lowest Prices of All Time</h2>
            <p>
              We source the cheapest products from around the world. You won't
              find a better deal anywhere else, with a price-matching guarantee.
            </p>
          </div>
        </div>
        <div className={styles.block}>
          <img src={productImage2} alt="Exclusive Product Range" />
          <div className={styles.blockContent}>
            <h2>Exclusive Product Range</h2>
            <p>
              Explore our exclusive range of products that are handpicked for
              quality and uniqueness. Experience the best in class with our
              premium selection.
            </p>
          </div>
        </div>
        <div className={styles.block}>
          <img src={productImage3} alt="New Arrivals" />
          <div className={styles.blockContent}>
            <h2>New Arrivals</h2>
            <p>
              Stay ahead of the trends with our latest arrivals. Discover the
              newest products that are making waves in the market and be the
              first to own them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
