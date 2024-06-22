import Navbar from "@/components/navbar";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage";
import { User } from "@/utils/types";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export type ContextType = {
  user: User | null;
  setUserToContext: (user: User) => void;
  removeUserFromContext: () => void;
};

const getUserFromLocalStorage = () => {
  const user = getLocalStorageItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

const Root: React.FC = () => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  const setUserToContext = (user: User) => {
    setUser(user);
    setLocalStorageItem("user", JSON.stringify(user));
  };

  const removeUserFromContext = () => {
    removeLocalStorageItem("user");
    setUser(null);
  };

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <Navbar user={user} removeUser={removeUserFromContext} />
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center">
        <Outlet
          context={
            {
              user: user,
              removeUserFromContext: removeUserFromContext,
              setUserToContext: setUserToContext,
            } satisfies ContextType
          }
        />
      </div>
    </div>
  );
};
export default Root;

export function useUser() {
  return useOutletContext<ContextType>();
}
