import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Socials from "../socials";

const initiateOAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/helpers", () => {
  return {
    initiateOAuth: initiateOAuthMock,
  };
});

describe("Socials", () => {
  it("should render socials", () => {
    const screen = render(<Socials />);
    const googleButton = screen.getByTestId("google-oauth");
    const githubButton = screen.getByTestId("github-oauth");

    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });

  it("should initiate google OAuth", () => {
    const screen = render(<Socials />);
    const googleButton = screen.getByTestId("google-oauth");

    googleButton.click();
    expect(initiateOAuthMock).toHaveBeenCalledWith("google");
  });

  it("should initiate github OAuth", () => {
    const screen = render(<Socials />);
    const githubButton = screen.getByTestId("github-oauth");

    githubButton.click();
    expect(initiateOAuthMock).toHaveBeenCalledWith("github");
  });
});
