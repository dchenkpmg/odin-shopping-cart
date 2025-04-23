import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import StorePage from "../StorePage/StorePage";

const setCartItems = vi.fn();
const setCartItemCount = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({
      cartItems: [],
      setCartItems,
      setCartItemCount,
    }),
  };
});

const routes = [
  {
    path: "/store",
    element: <StorePage />,
    loader: () => [
      {
        id: 1,
        title: "Test Product",
        price: 9.99,
        description: "This is a test product.",
        category: "electronics",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
];

describe("StorePage", () => {
  it("renders the StorePage component", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
    render(<RouterProvider router={router} />);
    const productTitle = await screen.findByText(/Test Product/i);
    expect(productTitle).toBeInTheDocument();
  });

  it("increases the quantity when the button is clicked", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/store"] });
    render(<RouterProvider router={router} />);
    const addButton = await screen.findByTitle(/add items/i);

    await userEvent.click(addButton);

    const quantityInput = await screen.findByDisplayValue("2");
    expect(quantityInput).toBeInTheDocument();
  });

  it("adds an item to the cart when the button is clicked", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/store"] });

    render(<RouterProvider router={router} />);

    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    await userEvent.click(addToCartButton);

    expect(setCartItems).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Test Product",
        price: 9.99,
        quantity: 1,
        image: "https://via.placeholder.com/150",
      },
    ]);
  });
});
