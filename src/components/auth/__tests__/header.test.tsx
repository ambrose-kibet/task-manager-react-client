import { render } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";
import Header from "../header";

vi.mock("@/components/logo", () => {
  return {
    default: () => <div>Logo</div>,
  };
});

describe("Header component", () => {
  it("should render the header", () => {
    const screen = render(<Header label="Header" />);
    const logo = screen.getByText("Logo");
    const label = screen.getByText("Header");

    expect(logo).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
