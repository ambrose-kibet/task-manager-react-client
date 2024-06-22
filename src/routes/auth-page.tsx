import CardWrapper from "@/components/auth/card-wrapper";
import LoginForm from "@/components/auth/login-form";
import RegistrationForm from "@/components/auth/registration-form";
import ToggleAuth from "@/components/auth/toggle-auth";

import { setLocalStorageItem } from "@/utils/local-storage";
import { User } from "@/utils/types";
import axios from "axios";
import { useState } from "react";
import { redirect, type LoaderFunction } from "react-router-dom";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const token = searchParams.get("token");

  if (token) {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}` + "/auth/validate-auth-token",
      {
        token,
      },
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      setLocalStorageItem("user", JSON.stringify(response.data as User));
      redirect("/my-tasks");
      return {
        success: "Authentication successful, redirecting to dashboard...",
        user: response.data,
        error: null,
      };
    } else {
      throw new Response(response.statusText, { status: 400 });
    }
  }
  return {
    success: null,
    user: null,
    error: null,
  };
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin((prev) => !prev);

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <CardWrapper
        showSocials
        toggleAuth={<ToggleAuth isLogin={isLogin} toggleAuth={toggleAuth} />}
        headerLabel={isLogin ? "Welcome back" : "Create an account"}
      >
        {isLogin ? <LoginForm /> : <RegistrationForm />}
      </CardWrapper>
    </div>
  );
};
export default AuthPage;
