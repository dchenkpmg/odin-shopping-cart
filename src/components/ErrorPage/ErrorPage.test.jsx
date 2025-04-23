import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import ErrorPage from "./ErrorPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: () => ({
      statusText: "Not Found",
    }),
  };
});

describe("ErrorPage", () => {
  it("renders the correct error message", () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ErrorPage />
      </Router>,
    );

    const statusText = screen.getByText(/Not Found/i);
    expect(statusText).toBeInTheDocument();
  });

  it("routes to the home page when clicking 'Go back to home'", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ErrorPage />
      </Router>,
    );

    await userEvent.click(
      screen.getByRole("link", { name: /go back to home/i }),
    );
    expect(history.location.pathname).toBe("/");
  });
});
