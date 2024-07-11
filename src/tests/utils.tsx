import { QueryClient } from "@tanstack/react-query";

export const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
