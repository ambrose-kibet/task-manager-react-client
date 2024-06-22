import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./columns";
import SearchEmailComponent from "./search-by-email";
import { DataTable } from "../data-table";
import SortComponent from "./sort-filter";
import { getAllUsersQuery } from "@/routes/admin-page";

export type filterSortTypes = {
  page: number;
  email?: string;
  sort:
    | "email asc"
    | "email desc"
    | "role asc"
    | "role desc"
    | "createdAt asc"
    | "createdAt desc";
};

const Users = () => {
  const [filterSort, setFilterSort] = useState<filterSortTypes>({
    page: 1,
    email: undefined,
    sort: "createdAt+asc" as filterSortTypes["sort"],
  });

  const { data } = useQuery({
    ...getAllUsersQuery(filterSort),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setFilterSort((prev) => ({ ...prev, page }));
  };

  const handleEmailChange = (email: string) => {
    if (email === "") {
      setFilterSort((prev) => ({ ...prev, email: undefined }));
      return;
    }
    setFilterSort((prev) => ({ ...prev, email }));
  };

  const handleSortChange = (sort: string) => {
    setFilterSort((prev) => ({
      ...prev,
      sort: sort as filterSortTypes["sort"],
    }));
  };

  return (
    <div className="px-2">
      <div className="relative mx-auto flex w-fit items-center">
        <h1 className="mb-2 text-center text-3xl font-semibold">Users</h1>
      </div>
      <div className="container mx-auto w-full pb-10">
        <DataTable
          columns={columns}
          data={data.users || []}
          rowCount={data.total || 1}
          handlePageChange={handlePageChange}
          currentPage={filterSort.page}
          sortFilter={
            <SortComponent
              value={filterSort.sort}
              handleChange={handleSortChange}
            />
          }
          statusFilter={
            <SearchEmailComponent
              email={filterSort.email}
              setEmail={handleEmailChange}
            />
          }
        />
      </div>
    </div>
  );
};
export default Users;
