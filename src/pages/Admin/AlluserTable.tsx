import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  useBlockUserMutation,
  useGetAlluserQuery,
  useUnBlockUserMutation,
} from "@/components/Redux/Features/Auth/auth.api";
import PaginationFiLtering from "@/util/Pagination/Pagination";
import Loader from "@/components/ui/Loader";
import type { IUser } from "@/types";

export default function AlluserTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [statusRol, setStatusRol] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data, isLoading } = useGetAlluserQuery({
    searchTerm: searchQuery,
    page: currentPage,
    isActive: filter === "all" ? undefined : filter || undefined,
    role: statusRol === "all" ? undefined : statusRol || undefined,
  });
  /* block user */
  const [blockUser] = useBlockUserMutation();
  const [unBlockUser] = useUnBlockUserMutation();

  const allUsers = data?.data?.userData;
  const totalPage = data?.data?.meta?.totalPage;

  // If loading users loading indicator
  if (isLoading) {
    return <Loader />;
  }

  const handleAction = async (userId: string,currentStatus:string) => {
    try {
      if (selectedStatus === "BLOCKED") {
        const res = await blockUser(userId).unwrap();
        if (res.success) {
          toast.success(`${res.message}`);
        }
      }
       else if(selectedStatus ===currentStatus ){
        toast.error(`user is already${currentStatus}`)
       }

      else if (selectedStatus === "ACTIVE") {
        const res = await unBlockUser(userId).unwrap();
        if (res.success) {
          toast.success(`${res.message}`);
        }
      }
    } catch (error: unknown) {
      toast.error(`${error?.data?.message}`)
    }
  };

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

      {/* Filters for status */}
      <div className="flex items-center justify-between mb-4">
        {/* Status Filter */}
        <div className="w-auto">
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

        {/* Role Filter */}
        <div className="w-auto">
          <Select
            value={statusRol}
            onValueChange={(role) => setStatusRol(role)}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent className="z-20 bg-white dark:bg-gray-800 border border-gray-300">
              <SelectItem value="all">All Roles</SelectItem>
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
                {/* Add a dropdown to select status */}
                <div className="flex flex-col items-center justify-center space-y-5">
                  <Select
                    value={selectedStatus}
                    onValueChange={(value) => setSelectedStatus(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300">
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleAction(user._id,user.isActive)}
                    className="bg-primary w-full"
                    disabled={!selectedStatus}
                  >
                    Action
                  </Button>
                </div>
                {/* Action Button, disable if no status is selected */}
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
