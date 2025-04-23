import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import Footer from "./Footer";

describe("Footer", () => {
  it("routes to the correct page", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>,
    );
    await userEvent.click(screen.getByText(/Home/i));
    expect(history.location.pathname).toBe("/");

    await userEvent.click(screen.getByRole("link", { name: /Store/i }));
    expect(history.location.pathname).toBe("/store");

    await userEvent.click(screen.getByText(/Checkout/i));
    expect(history.location.pathname).toBe("/checkout");
  });
});
