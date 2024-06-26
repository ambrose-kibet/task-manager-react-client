import CountStats from "@/components/stats/count-stats";
import ProductivityStats from "@/components/stats/my-stats";
import customAxios from "@/lib/axios-config";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const getProductivityStatsQuery = (
  duration: "daily" | "weekly" | "monthly",
) => ({
  queryKey: ["productivity-stats", duration],
  queryFn: () =>
    customAxios.get(`/tasks/productivity-stats?duration=${duration}`).then(
      (
        res: AxiosResponse<
          Array<{
            date: string;
            completed: number;
            created: number;
          }>
        >,
      ) => res.data,
    ),
  onError: (error: Error) => {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error(error.message || "An error occurred");
  },
});
export const getMyStatsQuery = () => ({
  queryKey: ["stats"],
  queryFn: () =>
    customAxios.get(`/tasks/stats`).then(
      (
        res: AxiosResponse<{
          completed: number;
          total: number;
          longestStreak: number;
        }>,
      ) => res.data,
    ),

  onError: (error: Error) => {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw new Error(error.message || "An error occurred");
  },
});

export const loader = (queryClient: QueryClient) => () => {
  const productivityStats = queryClient.ensureQueryData(
    getProductivityStatsQuery("daily"),
  );
  const myStats = queryClient.ensureQueryData(getMyStatsQuery());
  return { myStats, productivityStats };
};

const StatsPage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <h1 className="mb-4 text-3xl font-bold">
        My Tasks <span className="text-primary">Stats</span>{" "}
      </h1>
      <CountStats />
      <h2 className="my-8 text-2xl font-bold">Productivity Stats </h2>
      <ProductivityStats />
    </div>
  );
};
export default StatsPage;
