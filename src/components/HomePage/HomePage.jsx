import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.homePage}>
        <div className="hero">
          <div className="hero-content"></div>
        </div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the home page.</p>
      </div>
    </>
  );
}
