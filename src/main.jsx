import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import StorePage from "./components/StorePage/StorePage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { loader as storeLoader } from "./components/StorePage/StorePageUtils.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "store",
        loader: storeLoader,
        element: <StorePage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
