import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./root";

const AdminRoutesLayout: React.FC = () => {
  const { user } = useUser();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/my-tasks" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default AdminRoutesLayout;
