import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <>
      <NavBar itemCount={cartItemCount} />
      <Outlet context={{ cartItems, setCartItems, setCartItemCount }} />
      <Footer />
    </>
  );
}
