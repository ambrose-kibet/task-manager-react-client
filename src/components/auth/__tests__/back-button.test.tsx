import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BackButton from "../back-button";

describe("Back Button", () => {
  const buttonProps = {
    backButtonHref: "/",
    backButtonLabel: "Back",
  };

  it("should render the back button", () => {
    const screen = render(
      <BrowserRouter>
        <BackButton {...buttonProps} />
      </BrowserRouter>,
    );
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
  });

  it("should render the back button with correct href", () => {
    const screen = render(
      <BrowserRouter>
        <BackButton {...buttonProps} />
      </BrowserRouter>,
    );
    const backButton = screen.getByText("Back");
    expect(backButton).toHaveAttribute("href", "/");
  });

  it("should navigate to the correct href", async () => {
    const HomeElement = () => <div>Home</div>;
    const screen = render(
      <MemoryRouter initialEntries={["/button"]}>
        <Routes>
          <Route path="/" element={<HomeElement />} />
          <Route path="/button" element={<BackButton {...buttonProps} />} />
        </Routes>
      </MemoryRouter>,
    );
    const backButton = screen.getByText("Back");
    backButton.click();

    const home = await screen.findByText("Home");
    expect(home).toBeInTheDocument();
    expect(screen.queryByText("Back")).not.toBeInTheDocument();
  });
});
