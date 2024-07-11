import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import ErrorPage from "@/routes/error-page";
import { MemoryRouter } from "react-router-dom";

const mockedArgs = vi.hoisted(() => ({
  isRouteErrorResponse: vi.fn(),
  useRouteError: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ...mockedArgs,
  };
});

describe("Error Page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the error page", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    const heading = screen.getByText("Oops!");
    const paragraph = screen.getByText(
      "Sorry, an unexpected error has occurred.",
    );
    const errorText = screen.getByText("Unknown error");

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });

  it("should render the error message", async () => {
    mockedArgs.useRouteError.mockReturnValue(new Error("An error occurred"));

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const errorText = await screen.findByText("An error occurred");
    expect(errorText).toBeInTheDocument();
  });

  it("should render the error message from route error response", async () => {
    mockedArgs.useRouteError.mockReturnValue({
      data: { message: "A response error occurred" },
    });
    mockedArgs.isRouteErrorResponse.mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const errorText = await screen.findByText("A response error occurred");
    expect(errorText).toBeInTheDocument();
  });

  it("should render the a string error message", async () => {
    mockedArgs.useRouteError.mockReturnValue("A string error occurred");
    mockedArgs.isRouteErrorResponse.mockReturnValue(false);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const errorText = await screen.findByText("A string error occurred");
    expect(errorText).toBeInTheDocument();
  });

  it("should render the error 'Unknown error' when error is not recognized", async () => {
    mockedArgs.useRouteError.mockReturnValue({});

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const errorText = await screen.findByText("Unknown error");
    expect(errorText).toBeInTheDocument();
  });
});
