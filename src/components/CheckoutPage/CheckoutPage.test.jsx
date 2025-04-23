import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "./CheckoutPage";

const mockCartItems = [
  {
    id: 1,
    title: "Item 1",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    title: "Item 2",
    price: 20,
    quantity: 2,
  },
];

const mockSetCartItems = vi.fn();
const mockSetCartItemCount = vi.fn();
const mockUseOutletContext = vi.fn(() => ({
  cartItems: mockCartItems,
  setCartItems: mockSetCartItems,
  setCartItemCount: mockSetCartItemCount,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => mockUseOutletContext(),
  };
});

const mockRouter = createMemoryRouter(
  [{ path: "/", element: <CheckoutPage /> }],
  {
    initialEntries: ["/"],
  },
);

describe("CheckoutPage", () => {
  beforeEach(() => {
    render(<RouterProvider router={mockRouter} />);
  });

  it("renders the checkout page", () => {
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("displays the cart items", () => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("displays the correct quantity for each item", () => {
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
    expect(screen.getByDisplayValue(2)).toBeInTheDocument();
  });

  it("successfully changes the input of the first item in the cart", async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText("quantity-1");

    await user.type(input, "5");

    expect(mockSetCartItems).toHaveBeenCalledWith([
      { id: 1, title: "Item 1", price: 10, quantity: 15 },
      { id: 2, title: "Item 2", price: 20, quantity: 2 },
    ]);
  });

  it("removes an item from the cart when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const removeButton = screen.getAllByRole("button", { name: /remove/i })[0];
    await user.click(removeButton);
    expect(mockSetCartItems).toHaveBeenCalledWith([
      { id: 2, title: "Item 2", price: 20, quantity: 2 },
    ]);
    expect(mockSetCartItemCount).toHaveBeenCalledWith(1);
  });
});
