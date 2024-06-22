import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUser } from "./root";
import { User } from "@/utils/types";
export type ProtectedLayoutContextType = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

const ProtectedRoutesLayout: React.FC = () => {
  const { user, setUserToContext, removeUserFromContext } = useUser();

  const setUser = (user: User) => {
    setUserToContext(user);
  };
  const removeUser = () => {
    removeUserFromContext();
  };
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return (
    <div>
      <Outlet
        context={
          {
            user,
            setUser,
            removeUser,
          } satisfies ProtectedLayoutContextType
        }
      />
    </div>
  );
};
export default ProtectedRoutesLayout;

export const useProtectedUserContext = () => {
  return useOutletContext<ProtectedLayoutContextType>();
};
