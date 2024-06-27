import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-lg">
        Sorry, an unexpected error has occurred while getting Tasks Per day.
      </p>
      <p className="text-muted-foreground">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorBoundary;
