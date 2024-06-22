import UserStats from "@/components/admin/user-stats";
import Users, { filterSortTypes } from "@/components/admin/users";
import customAxios from "@/lib/axios-config";
import { QueryClient } from "@tanstack/react-query";

export const getSignUpStatsQuery = (
  duration: "daily" | "weekly" | "monthly",
) => ({
  queryKey: ["sign-up-stats", duration],
  queryFn: () =>
    customAxios
      .get(`/users/signup-stats?duration=${duration}`)
      .then((res) => res.data),
});

export const getAllUsersQuery = ({ page, email, sort }: filterSortTypes) => ({
  queryKey: ["users", page, email ?? "", sort],
  queryFn: () =>
    customAxios
      .get(
        `/users?page=${page}&sortby=${sort}${email ? `&email=${email}` : ""}`,
      )
      .then((res) => res.data),
});

export const loader = (queryClient: QueryClient) => () => {
  const userStats = queryClient.ensureQueryData(getSignUpStatsQuery("daily"));
  const allUsers = queryClient.ensureQueryData(
    getAllUsersQuery({ page: 1, sort: "createdAt+asc" as "createdAt asc" }),
  );
  return { userStats, allUsers };
};

const AdminPage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <h1 className="text-2xl font-bold">User sign up stats</h1>
      <UserStats />
      <Users />
    </div>
  );
};
export default AdminPage;
