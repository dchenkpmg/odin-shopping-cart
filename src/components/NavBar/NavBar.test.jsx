import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders the correct heading", () => {
    render(
      <MemoryRouter>
        <NavBar itemCount={0} />
      </MemoryRouter>,
    );
    const heading = screen.getByRole("link", {
      name: /blah goods/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("routes to the correct page", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar itemCount={0} />
      </Router>,
    );
    await userEvent.click(screen.getByText(/Store/i));
    expect(history.location.pathname).toBe("/store");

    await userEvent.click(screen.getByText(/Home/i));
    expect(history.location.pathname).toBe("/");

    await userEvent.click(
      screen.getByRole("link", {
        name: /Shopping Cart/i,
      }),
    );
    expect(history.location.pathname).toBe("/checkout");
  });

  it("displays the correct item count", () => {
    render(
      <MemoryRouter>
        <NavBar itemCount={5} />
      </MemoryRouter>,
    );
    const itemCount = screen.getByText(/5/i);
    expect(itemCount).toBeInTheDocument();
  });
});
