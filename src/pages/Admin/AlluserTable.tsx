import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAlluserQuery } from "@/components/Redux/Features/Auth/auth.api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/Loader";

import PaginationFiLtering from "@/util/Pagination/Pagination";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import type { IUser } from "@/types";

export default function AlluserTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [statusRol, setStatusRol] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAlluserQuery({
    searchTerm:searchQuery,
    page: currentPage,
    isActive: filter === "all" ? undefined : filter||undefined,
    role: statusRol === "all" ? undefined : statusRol||undefined,
  
  });
  

  const allUsers = data?.data?.userData;
  const totalPage = data?.data?.meta?.totalPage;

  // If loading users loading indicator
  if (isLoading) {
    return <Loader />;
  }

//   // Handle filtering and displaying users based on selected filter
//   const filteredUsers = allUsers?.filter((user: IUser) => {
//     if (filter && user.isActive !== filter && filter !== "all") {
//       return false;
//     }
//     if (
//       searchQuery &&
//       !user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });

  return (
    <div className="overflow-x-auto">
      {/* Search Bar */}
      <div className="mb-4 gap-x-4 flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Name"
          className="p-2 border rounded w-[50%]"
        />
      </div>

     <div className="flex items-center justify-between">
         {/* Filters for status */}
      <div className=" w-auto ">
        <Select
          value={filter}
          onValueChange={(newStatus) => setFilter(newStatus)}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="z-20 bg-white dark:bg-gray-800 border border-gray-300">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="BLOCKED">INACTIVE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filters with Role */}

      <div className=" w-auto ">
        <Select
          value={statusRol}
          onValueChange={(role) => setStatusRol(role)}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent className="z-20 bg-white dark:bg-gray-800 border border-gray-300">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="SENDER">SENDER</SelectItem>
            <SelectItem value="RECEIVER">RECEIVER</SelectItem>
          </SelectContent>
        </Select>
      </div>
     </div>

      {/* Users Table */}
      <Table className="table-auto border-collapse border border-gray-300 mt-10">
        <TableCaption>All Users Retrieved Successfully</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-200 dark:bg-gray-800">
            <TableHead className="border border-gray-300">Name</TableHead>
            <TableHead className="border border-gray-300">Email</TableHead>
            <TableHead className="border border-gray-300">Status</TableHead>
            <TableHead className="border border-gray-300">Role</TableHead>
            <TableHead className="border border-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers?.map((user: IUser, index: number) => (
            <TableRow
              key={index}
              className="border-t border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TableCell className="border border-gray-300">
                {user.name}
              </TableCell>
              <TableCell className="border border-gray-300">
                {user.email}
              </TableCell>
              <TableCell className="border border-gray-300">
                <Badge
                  className={
                    user.isActive === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {user.isActive}
                </Badge>
              </TableCell>
              <TableCell className="border border-gray-300">
                {user.role}
              </TableCell>
              <TableCell className="border border-gray-300">
                <Button
                  onClick={() =>
                    toast.success(`User ${user.name} actioned successfully!`)
                  }
                  className="bg-chart-2"
                >
                  Action
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {allUsers.length >= 1 && (
        <PaginationFiLtering
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
