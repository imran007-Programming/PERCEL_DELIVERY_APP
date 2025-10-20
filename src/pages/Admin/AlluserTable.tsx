import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import type { IUser } from "@/types";
import { Send } from "lucide-react";

export default function AlluserTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");
  const [statusRol, setStatusRol] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [activeButton, setActiveButton] = useState("");

  const { data } = useGetAlluserQuery({
    searchTerm: searchQuery === "" ? undefined : searchQuery,
    page: currentPage,
    isActive: filter === "all" ? undefined : filter || undefined,
    role: statusRol === "all" ? undefined : statusRol || undefined,
  });

  const [blockUser] = useBlockUserMutation();
  const [unBlockUser] = useUnBlockUserMutation();

  const allUsers = data?.data?.userData || [];
  const totalPage = data?.data?.meta?.totalPage;

  const handleAction = async (userId: string, currentStatus: string) => {
    try {
      if (selectedStatus === "BLOCKED") {
        const res = await blockUser(userId).unwrap();
        if (res.success) toast.success(`${res.message}`);
      } else if (selectedStatus === currentStatus) {
        toast.error(`User is already ${currentStatus}`);
      } else if (selectedStatus === "ACTIVE") {
        const res = await unBlockUser(userId).unwrap();
        if (res.success) toast.success(`${res.message}`);
      }
    } catch (error: any) {
      toast.error(`${error?.data?.message}`);
    }
  };
  

  const images = [
    {
      id: 1,
      title: "RECEIVER",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9iwbzRDoi37ijJETrQi95eMWT6CxYF0oi6a5YQoho_nzpMAUteXXpptSYNtd9Hnnrzw&usqp=CAU",
    },
    {
      id: 2,
      title: "SENDER",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRHY8jG8Rp413NKenVYJi98Ir7lTsepNAerQ&s",
    },
    {
      id: 3,
      title: "ADMIN",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zeA7kD_wUpvkOs0eSJNuBpglkobDqrB66g&s",
    },
  ];

  

  const handlesearchAction = () => {
    setSearchQuery(search);
  };

  useEffect(() => {
    if (search === "") {
      setSearchQuery("");
    }
  }, [search]);

 
  return (
    <div className="max-w-[80vw] w-full ">
      <div className="pt-5 overflow-auto ">
        {/* Filters */}
        <div className="ml-5! mb-6 flex justify-between items-center ">
          <div className="relative w-[40%] flex">
            {/* Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name"
              className="pl-10 pr-[60px] py-2 w-full rounded-l-lg! border-2! border-primary! focus:outline-none!"
            />

            {/* Search button */}
            <div
              onClick={handlesearchAction}
              className="bg-primary p-3 cursor-pointer rounded-r-lg! flex items-center justify-center"
            >
              <Send />
            </div>
          </div>

          <div className="flex gap-4 pr-2">
            <Select
              value={filter}
              onValueChange={(newStatus) => setFilter(newStatus)}
            >
              <SelectTrigger className="w-40 rounded-lg! border-2! border-primary!">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="BLOCKED">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusRol}
              onValueChange={(role) => setStatusRol(role)}
            >
              <SelectTrigger className="w-40 rounded-lg! border-2! border-primary!">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SENDER">Sender</SelectItem>
                <SelectItem value="RECEIVER">Receiver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl overflow-x-auto shadow-md border transition-colors p-2 ">
          <Table className="table-auto w-full  ">
            <TableHeader className="sticky top-0  bg-gray-100 dark:bg-gray-800">
              <TableRow className="bg-gray-50 dark:bg-gray-700 ">
                <TableHead className="">Employee ID</TableHead>
                <TableHead className="  text-gray-700 dark:text-gray-200">
                  Avatar
                </TableHead>
                <TableHead className="  text-gray-700 dark:text-gray-200">
                  Role
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">
                  Shop Name
                </TableHead>

                <TableHead className="p-4 text-gray-700 dark:text-gray-200">
                  Email Address
                </TableHead>
                <TableHead className="p-4 text-gray-700 dark:text-gray-200">
                  Contact Number
                </TableHead>
                {/* <TableHead className="p-4 text-gray-700 dark:text-gray-200">
                  Gender
                </TableHead> */}
                <TableHead className="p-4 text-gray-700 dark:text-gray-200">
                  Location
                </TableHead>
                <TableHead className="p-4 text-gray-700 dark:text-gray-200">
                  Status
                </TableHead>
                <TableHead className="p-4 text-center text-gray-700 dark:text-gray-200">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {allUsers.length > 0 ? (
                allUsers.map((user: IUser, index: number) => {
                  const matchImage = images.find(
                    (img) => img.title === user.role
                  );

                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50  dark:hover:bg-gray-900 transition-colors"
                    >
                      {/* Employee ID */}
                      <TableCell className=" font-medium text-gray-600 dark:text-gray-300">
                        {1 + index}
                      </TableCell>

                      {/* Avatar + Name */}
                      <TableCell className="p-4">
                        <div className="flex flex-col items-center ">
                          {/* Avatar */}

                          <img
                            className="w-15 h-15 rounded-full"
                            src={matchImage?.img}
                            alt=""
                          />
                          <span className="font-medium   text-gray-800 dark:text-gray-200">
                            {user.name}
                          </span>

                          {/* Texts */}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`text-xs p-2 rounded ${
                            user.role === "SENDER" &&
                            "text-gray-800 bg-primary uppercase dark:text-gray-50"
                          }
                       ${
                         user.role === "ADMIN" &&
                         "text-gray-800 bg-red-600 uppercase dark:text-gray-50"
                       }
                       ${
                         user.role === "RECEIVER" &&
                         "text-gray-800 bg-green-600 uppercase dark:text-gray-50"
                       }
                       
                       
                       `}
                        >
                          {user.role}
                        </div>
                      </TableCell>

                      {/* Fake Department for UI */}
                      <TableCell className="p-4 text-gray-700 dark:text-gray-300">
                        {user.shopName ? user.shopName : "No shop"}
                      </TableCell>

                      {/* Email */}
                      <TableCell className="p-4 text-md font-bold ">
                        {user.email}
                      </TableCell>

                      {/* Contact */}
                      <TableCell className="p-4 text-gray-700 dark:text-gray-300">
                        +88{user.phone}
                      </TableCell>

                      {/* Gender */}
                      {/* <TableCell className="p-4 text-gray-700 dark:text-gray-300">
                        {index % 2 === 0 ? "Male" : "Female"}
                      </TableCell> */}

                      {/* Location */}
                      <TableCell className="p-4 text-gray-700 dark:text-gray-300">
                        {user.address}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="p-4">
                        <div
                          className={`h-7 w-15 flex justify-center items-center rounded-md text-xs font-medium ${
                            user.isActive === "ACTIVE"
                              ? "bg-green-100 text-green-700 dark:bg-green-[#E6F6F0] dark:text-green-800"
                              : "bg-red-100 text-red-600 dark:bg-red-300 dark:text-red-800"
                          }`}
                        >
                          <p>
                            {" "}
                            {user.isActive === "ACTIVE" ? "Active" : "Blocked"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="p-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <Select
                            onValueChange={(value) => setSelectedStatus(value)}
                            onOpenChange={() => setActiveButton(user._id)}
                          >
                            <SelectTrigger className="w-32  shadow-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg!">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border rounded-lg shadow-md text-gray-800 dark:text-gray-200">
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="BLOCKED">Block</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() =>
                              handleAction(user._id, user.isActive)
                            }
                            className="bg-primary w-32 rounded-lg! shadow hover:scale-105 transition-transform"
                            disabled={activeButton !== user._id}
                          >
                            {activeButton === user._id
                              ? selectedStatus
                              : "Apply"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-xl py-6">
                    No user found!!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {allUsers.length >= 10 && (
          <div className="mt-6 ml-auto w-fit">
            <PaginationFiLtering
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
