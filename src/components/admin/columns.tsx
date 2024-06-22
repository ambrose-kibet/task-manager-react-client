import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import UserAction from "./update-user";

export type TUser = {
  id: string;
  role: "USER" | "ADMIN";
  name: string;
  email: string;
  avatar: string;
};

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "avatar",
    header: () => <div className="text-left text-primary">Avatar</div>,
    cell: ({ row }) => {
      const value = row.original.avatar;
      return (
        <Avatar>
          <AvatarImage src={value} />
          <AvatarFallback>
            <FaUser className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left text-primary">Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left text-primary">Email</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left text-primary">Role</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-left text-primary">Actions</div>,
    cell: ({ row }) => {
      const item = row.original;
      return <UserAction userId={item.id} role={item.role} />;
    },
  },
];
