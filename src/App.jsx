import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

export default function App() {
  // Sample cart items to be removed later
  const defaultCartItems = [
    {
      id: 1,
      name: "Product 1",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 10.0,
      quantity: 1,
    },
    {
      id: 4,
      name: "Product 2",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 20.0,
      quantity: 2,
    },
    {
      id: 6,
      name: "Product 3",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 30.0,
      quantity: 1,
    },
  ];
  const [cartItems, setCartItems] = useState(defaultCartItems);
  const [cartItemCount, setCartItemCount] = useState(3);

  return (
    <>
      <NavBar itemCount={cartItemCount} />
      <Outlet context={{ cartItems, setCartItems }} />
      <Footer />
    </>
  );
}
