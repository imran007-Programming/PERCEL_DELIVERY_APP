import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserInfoQuery } from "@/components/Redux/Features/Auth/auth.api";
import {
  useCancelPercelStatusBySenderMutation,
  useGetPercelBySenderQuery,
} from "@/components/Redux/Features/Percel/percel.api";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { IError, IPercel } from "@/types";
import loaderJson from "../../assets/lottie/Forklift loading truck.json";

import PaginationFiLtering from "@/util/Pagination/Pagination";
import LottieLoader from "@/shared/lotttieAnimation";
import { Send } from "lucide-react";

export default function PercelTable() {
  const { data, isFetching } = useUserInfoQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState("");
   const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const senderId = data?.data?._id;
  const [search, setSearch] = useState("");
  const [cancelStatus] = useCancelPercelStatusBySenderMutation();

  // Fetch sender's parcels using the senderId, search query, and filter
  const { data: senderAllPercels, isFetching: isFetchingPercels } =
    useGetPercelBySenderQuery({
      senderId,
      params: {
        searchTerm: searchQuery || undefined,
        status: filter === "all" ? undefined : filter || undefined,
        limit: 10,
        page: currentPage,
      },
    });

  

  useEffect(() => {
    if (search === "") {
      setSearchQuery("");
    }
  }, [search]);

  const handlesearchAction = () => {
    setSearchQuery(search);
  };

  // If loading parcels or error occurred, display loading/error messages
  if (isFetching || isFetchingPercels) {
    return (
      <LottieLoader
        animationData={loaderJson}
        size={150}
        ariaLabel="Loading app..."
      />
    );
  }

  // Handle status change and update tracking event
  const handleStatusChange = async (percelId: string, location: string) => {
    const percelCancelation = {
      trackingEvents: [
        {
          status: selectedStatus,
          location: location,
          note: `Parcel is canceled `,
        },
      ],
    };

    try {
      const res = await cancelStatus({
        percelId,
        percelStatus: percelCancelation,
      }).unwrap();

      if (res.success) {
        toast.success("Parcel successfully canceled");
      }
    } catch (err) {
      if (err && (err as IError)?.data?.message) {
        toast.error((err as IError)?.data?.message);
      }
    }
  };
  const totalPage = senderAllPercels?.meta?.totalPage;

  return (
    <div className="overflow-x-auto">
      {/* Search Bar */}
      <div className="my-6 mr-5 flex flex-wrap justify-between items-center ">
        {/* Search Input with Send Button */}
        <div className="relative w-[40%] flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Tracking ID"
            className="pl-10 pr-[60px] py-2 w-full rounded-l-lg! border-2 border-primary focus:outline-none"
          />
          <div
            onClick={handlesearchAction}
            className="bg-primary p-3 cursor-pointer rounded-r-lg flex items-center justify-center"
          >
            <Send />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-4 mr-5">
          <Select
            value={filter}
            onValueChange={(newStatus) => setFilter(newStatus)}
          >
            <SelectTrigger className="w-40 rounded-lg! border-2 border-primary">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl! border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="CANCELED">CANCELED</SelectItem>
              <SelectItem value="PICKED">PICKED</SelectItem>
              <SelectItem value="IN_TRANSIT">IN_TRANSIT</SelectItem>
              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
              <SelectItem value="RETURNED_REQUEST">RETURNED_REQUEST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700">
        <Table className="min-w-full table-auto border-collapse">
          <TableCaption className="text-gray-600 dark:text-gray-300 py-2">
            All Parcels Retrieved Successfully
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <TableHead className="border-b border-gray-300 px-4 py-2 rounded-tl-2xl">
                Percel Type
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Weight
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Fee
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Tracking ID
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Current Location
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Pickup Address
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Dispatch Location
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Tracking Events
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2 rounded-tr-2xl">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {senderAllPercels?.percelData?.map(
              (percel: IPercel, index: number) => {
                const lastEventStatus = percel.trackingEvents.length
                  ? percel.trackingEvents[percel.trackingEvents.length - 1]
                      .status
                  : null;

                if (filter && lastEventStatus !== filter && filter !== "all")
                  return null;

                return (
                  <TableRow
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <TableCell className="px-4 py-2">
                      {percel.percelType}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.weight.value} {percel.weight.unit}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.fee} Taka
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.trackingId}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.currentLocation}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.pickupAddress}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {percel.dispatchLocation}
                    </TableCell>
                    <TableCell className="px-4 py-2 space-y-2">
                      {percel.trackingEvents.length
                        ? percel.trackingEvents
                            .slice(-1)
                            .map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-inner"
                              >
                                <Badge
                                  className={`${
                                    event.status === "CANCELED"
                                      ? "bg-red-500 text-white"
                                      : "bg-green-500 text-white dark:bg-green-600"
                                  } mb-1`}
                                >
                                  <strong>Status:</strong> {event.status}
                                </Badge>
                                <p className="text-sm">
                                  <strong>Location:</strong> {event.location}
                                </p>
                                <p className="text-sm">
                                  <strong>Note:</strong> {event.note}
                                </p>
                                <p className="text-sm">
                                  <strong>Time:</strong>{" "}
                                  {new Date(event.timestamp).toLocaleString()}
                                </p>
                              </div>
                            ))
                        : "No tracking event found"}
                    </TableCell>
                    <TableCell className="px-4 py-2 space-y-2">
                      <Select
                        // value={selectedStatus}
                        onValueChange={(newStatus) =>
                          setSelectedStatus(newStatus)
                        }
                         onOpenChange={() => setActiveButton(percel._id)}
                      >
                        <SelectTrigger className="w-32 rounded-lg border border-gray-300 dark:border-gray-600">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
                          <SelectItem value="CANCELED">CANCELED</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() =>
                          handleStatusChange(
                            percel._id,
                            percel.dispatchLocation
                          )
                        }
                        className="mt-2 bg-chart-2 rounded-lg w-full"
                        disabled={activeButton !== percel._id}
                      >
                         {activeButton === percel._id
                              ? selectedStatus
                              : "Update Status"}
                     
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {senderAllPercels?.percelData?.length >= 10 && (
        <PaginationFiLtering
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
