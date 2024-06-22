import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUser } from "./root";
import { User } from "@/utils/types";

export type AuthLayoutContextType = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

const AuthRoutesLayout: React.FC = () => {
  const { user, setUserToContext, removeUserFromContext } = useUser();

  const setUser = (user: User) => {
    setUserToContext(user);
  };
  const removeUser = () => {
    removeUserFromContext();
  };
  if (user) {
    return <Navigate to="/my-tasks" />;
  }
  return (
    <div>
      <Outlet
        context={
          {
            user,
            setUser,
            removeUser,
          } satisfies AuthLayoutContextType
        }
      />
    </div>
  );
};
export default AuthRoutesLayout;

export const useAuthContext = () => {
  return useOutletContext<AuthLayoutContextType>();
};
