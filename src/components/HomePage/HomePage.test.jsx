import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import HomePage from "./HomePage";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

describe("HomePage", () => {
  it("renders the correct heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const heading = screen.getByRole("heading", {
      name: /welcome to blah goods/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("routes to the store page", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>,
    );

    await userEvent.click(screen.getByText(/Shop Now/i));

    expect(history.location.pathname).toBe("/store");
  });
});
