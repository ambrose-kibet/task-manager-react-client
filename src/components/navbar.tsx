import { User } from "@/utils/types";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink, redirect } from "react-router-dom";
import { FaFolderOpen, FaPenToSquare } from "react-icons/fa6";
import { Button } from "./ui/button";
import { TfiStatsUp } from "react-icons/tfi";
import { FaUserEdit } from "react-icons/fa";
import { MdAdminPanelSettings, MdQueryStats } from "react-icons/md";
import { IoPowerSharp } from "react-icons/io5";

import { useMutation } from "@tanstack/react-query";
import customAxios from "@/lib/axios-config";

type NavbarProps = {
  user: User | null;
  removeUser: () => void;
};
const Navbar = ({ user, removeUser }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => {
      return customAxios.delete("/auth/logout");
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      removeUser();
      redirect("/auth");
    },
  });
  const logout = () => {
    mutate();
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen ${isMenuOpen ? "" : "-translate-x-full"} flex flex-col justify-between bg-background transition-transform duration-200 animate-out sm:translate-x-full`}
    >
      <div className="z-0 flex items-center justify-between px-2 py-1">
        <div className="sm:mr-1 sm:-translate-x-full sm:pr-2">
          <ModeToggle />
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`text-bold text-2xl ${isMenuOpen ? "translate-x-0" : "translate-x-full pl-2"} transition-transform duration-100 animate-in`}
        >
          {isMenuOpen ? "✖" : <HamburgerMenuIcon height={28} width={28} />}
        </button>
      </div>
      <div className="z-10 flex w-full flex-col items-start justify-start px-2 py-1">
        <div className="flex w-full flex-col space-y-4 sm:hidden">
          <p className="text-2xl">{user ? `Welcome, ${user.name}` : ""}</p>
          {user && (
            <>
              <NavLink to="/create-tasks" onClick={() => setIsMenuOpen(false)}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "link" : "ghost"}
                    size={"lg"}
                    className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
                  >
                    <FaPenToSquare className="h-8 w-8" />
                    <span className="text-xl">Create Tasks</span>
                  </Button>
                )}
              </NavLink>
              <NavLink to="/my-tasks" onClick={() => setIsMenuOpen(false)}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "link" : "ghost"}
                    size={"lg"}
                    className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
                  >
                    <FaFolderOpen className="h-8 w-8" />
                    <span className="text-xl">My Tasks</span>
                  </Button>
                )}
              </NavLink>
              <NavLink to="/stats" onClick={() => setIsMenuOpen(false)}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "link" : "ghost"}
                    size={"lg"}
                    className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
                  >
                    <TfiStatsUp className="h-8 w-8" />
                    <span className="text-xl">Stats</span>
                  </Button>
                )}
              </NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "link" : "ghost"}
                    size={"lg"}
                    className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
                  >
                    <FaUserEdit className="h-8 w-8" />
                    <span className="text-xl">Profile</span>
                  </Button>
                )}
              </NavLink>
              {user && user?.role === "ADMIN" && (
                <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "link" : "ghost"}
                      size={"lg"}
                      className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
                    >
                      <MdAdminPanelSettings className="h-8 w-8" />
                      <span className="text-xl">Admin</span>
                    </Button>
                  )}
                </NavLink>
              )}
            </>
          )}
          {!user && (
            <NavLink to="/auth">
              <Button
                size={"lg"}
                variant={"default"}
                className="mx-auto flex w-fit justify-center rounded-full text-xl capitalize text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started ?
              </Button>
            </NavLink>
          )}
        </div>
        <div className="hidden flex-col space-y-2 sm:flex">
          {user && (
            <>
              <NavLink to="/create-tasks">
                {({ isActive }) => (
                  <div className="group flex w-fit -translate-x-[56px] items-center">
                    <span
                      className={`z-10 flex items-center justify-center rounded-full p-2 ${isActive ? "bg-primary text-white" : "bg-muted"} text-2xl transition-all duration-200 group-hover:bg-primary`}
                    >
                      <FaPenToSquare
                        className={`${isActive ? "text-white" : "text-primary"} group-hover:text-white`}
                      />
                    </span>
                    <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                      add tasks
                    </span>
                  </div>
                )}
              </NavLink>
              <NavLink to="/my-tasks">
                {({ isActive }) => (
                  <div className="group flex w-fit -translate-x-[56px] items-center">
                    <span
                      className={`z-10 flex items-center justify-center rounded-full p-2 ${isActive ? "bg-primary" : "bg-muted"} text-2xl transition-all duration-200 group-hover:bg-primary`}
                    >
                      <FaFolderOpen
                        className={`${isActive ? "text-white" : "text-primary"} group-hover:text-white`}
                      />
                    </span>
                    <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                      my tasks
                    </span>
                  </div>
                )}
              </NavLink>
              <NavLink to="/stats">
                {({ isActive }) => (
                  <div className="group flex w-fit -translate-x-[56px] items-center">
                    <span
                      className={`z-10 flex items-center justify-center rounded-full p-2 ${isActive ? "bg-primary" : "bg-muted"} text-2xl transition-all duration-200 group-hover:bg-primary`}
                    >
                      <MdQueryStats
                        className={`${isActive ? "text-white" : "text-primary"} group-hover:text-white`}
                      />
                    </span>
                    <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                      stats
                    </span>
                  </div>
                )}
              </NavLink>
              <NavLink to="/profile">
                {({ isActive }) => (
                  <div className="group flex w-fit -translate-x-[56px] items-center">
                    <span
                      className={`z-10 flex items-center justify-center rounded-full p-2 ${isActive ? "bg-primary" : "bg-muted"} text-2xl transition-all duration-200 group-hover:bg-primary`}
                    >
                      <FaUserEdit
                        className={`${isActive ? "text-white" : "text-primary"} group-hover:text-white`}
                      />
                    </span>
                    <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                      profile
                    </span>
                  </div>
                )}
              </NavLink>
            </>
          )}
          {user && user?.role === "ADMIN" && (
            <NavLink to="/admin">
              {({ isActive }) => (
                <div className="group flex w-fit -translate-x-[56px] items-center">
                  <span
                    className={`z-10 flex items-center justify-center rounded-full p-2 ${isActive ? "bg-primary" : "bg-muted"} text-2xl transition-all duration-200 group-hover:bg-primary`}
                  >
                    <MdAdminPanelSettings
                      className={`${isActive ? "text-white" : "text-primary"} group-hover:text-white`}
                    />
                  </span>
                  <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                    admin
                  </span>
                </div>
              )}
            </NavLink>
          )}
        </div>
      </div>
      <div className="z-0 flex w-full items-center justify-start">
        {user && (
          <button
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className="flex justify-start py-1 capitalize sm:hidden"
          >
            <ExitIcon className="mr-2 h-6 w-6" /> Logout
          </button>
        )}
        {user && (
          <div
            className="group relative mb-1 mr-2 hidden h-[28px] w-[28px] -translate-x-full items-center sm:flex"
            onClick={() => logout()}
          >
            <span className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-transparent text-2xl transition-all duration-200 group-hover:bg-primary">
              <IoPowerSharp className="text-current group-hover:text-white" />
            </span>
            <span className="absolute left-full flex transform items-center rounded-full pl-2 pr-[30px] text-xl transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
