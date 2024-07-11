import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { testingQueryClient } from "@/tests/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "../login-form";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("@/routes/auth-routes-layout", async () => {
  return {
    useAuthContext: () => ({
      setUser: vi.fn(),
    }),
  };
});

describe("LoginForm component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render login form", async () => {
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(screen.getByText(/show password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("navigate to forgot password page", async () => {
    const ForgotPasswordMock: React.FC = () => <div>Forgot Password</div>;
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordMock />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.getByText("Forgot Password?").click();

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
  });

  it("should show password", async () => {
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await screen.getByText(/show password/i).click();

    expect(screen.getByLabelText("Password").getAttribute("type")).toBe("text");
  });

  it("should hide password", async () => {
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await screen.getByText(/show password/i).click();
    await screen.getByText(/show password/i).click();

    expect(screen.getByLabelText("Password").getAttribute("type")).toBe(
      "password",
    );
  });

  it("should accept input", async () => {
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "janedoe@mail.com" },
    });
    await fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "password@!1" },
    });

    expect(screen.getByLabelText("Email").getAttribute("value")).toBe(
      "janedoe@mail.com",
    );
    expect(screen.getByLabelText("Password").getAttribute("value")).toBe(
      "password@!1",
    );
  });

  it("should submit form", async () => {
    const testProps = {
      email: "janedoe@mail.com",
      password: "password@!1",
    };
    const screen = render(
      <QueryClientProvider client={testingQueryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: testProps.email },
    });
    await fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: testProps.password },
    });
    await screen.getByText(/login/i).click();
  });
});
