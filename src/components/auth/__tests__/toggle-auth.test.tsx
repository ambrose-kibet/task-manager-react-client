import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleAuth from "../toggle-auth";

describe("Toggle Auth", () => {
  it("should render the toggle auth component", () => {
    const screen = render(<ToggleAuth isLogin toggleAuth={vi.fn()} />);

    const loginButton = screen.getByText("Create an account?");

    expect(loginButton).toBeInTheDocument();
  });

  it("should render the toggle auth component", () => {
    const screen = render(<ToggleAuth isLogin={false} toggleAuth={vi.fn()} />);
    const loginButton = screen.getByText("Already have an account?");
    expect(loginButton).toBeInTheDocument();
  });

  it("should call the toggleAuth function", () => {
    const toggleAuth = vi.fn();
    const screen = render(<ToggleAuth isLogin toggleAuth={toggleAuth} />);
    const loginButton = screen.getByText("Create an account?");

    loginButton.click();
    expect(toggleAuth).toHaveBeenCalled();
  });
});
