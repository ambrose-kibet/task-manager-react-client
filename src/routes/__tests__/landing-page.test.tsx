import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import LandingPage from "@/routes/landing-page";

describe("Landing Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
  });

  it("should render the landing page", () => {
    const heading = screen.getByText("Welcome to Task Manger");
    const paragraph = screen.getByText(
      "The best way to manage your tasks and get things done.",
    );
    const image = screen.getByAltText("Hero");
    const button = screen.getByText("Get Started");

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
