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
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { IError, IPercel } from "@/types";
import Loader from "@/components/ui/Loader";

import PaginationFiLtering from "@/util/Pagination/Pagination";

export default function PercelTable() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const senderId = data?.data?._id;

  const [cancelStatus] = useCancelPercelStatusBySenderMutation();

  // Fetch sender's parcels using the senderId, search query, and filter
  const { data: senderAllPercels, isLoading: isLoadingPercels } =
    useGetPercelBySenderQuery({
      senderId,
      params: {
        searchTerm: searchQuery || undefined,
        status: filter === "all" ? undefined : filter || undefined,
        limit: 2,
        page: currentPage,
      },
    });

  // If loading parcels or error occurred, display loading/error messages
  if (isLoading || isLoadingPercels) {
    return (
      <div>
        <Loader />
      </div>
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
      <div className="mb-4 gap-x-4 flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Tracking ID"
          className="p-2 border rounded w-[50%]"
        />
      </div>

      {/* Filters for status */}
      <div className="mb-4 flex items-center">
        <Select
          value={filter}
          onValueChange={(newStatus) => setFilter(newStatus)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300">
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

      <Table className="table-auto border-collapse border border-gray-300">
        <TableCaption>All Parcels Retrieved Successfully</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-200 dark:bg-gray-800">
            <TableHead className="border border-gray-300">
              Percel_Type
            </TableHead>
            <TableHead className="border border-gray-300">Weight</TableHead>
            <TableHead className="border border-gray-300">Fee</TableHead>
            <TableHead className="border border-gray-300">
              Tracking ID
            </TableHead>
            <TableHead className="border border-gray-300">
              Current Location
            </TableHead>
            <TableHead className="border border-gray-300">
              Pickup Address
            </TableHead>
            <TableHead className="border border-gray-300">
              Dispatch Location
            </TableHead>
            <TableHead className="border border-gray-300">
              Tracking Events
            </TableHead>
            <TableHead className="border border-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {senderAllPercels?.percelData?.map(
            (percel: IPercel, index: number) => {
              // Get the last event's status
              const lastEventStatus = percel.trackingEvents.length
                ? percel.trackingEvents[percel.trackingEvents.length - 1].status
                : null;

              // Only display the parcel if the last event status matches the filter
              if (filter && lastEventStatus !== filter && filter !== "all") {
                return null;
              }

              return (
                <TableRow
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TableCell className="border border-gray-300">
                    {percel.percelType}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.weight.value} {percel.weight.unit}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.fee} Taka
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.trackingId}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.currentLocation}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.pickupAddress}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.dispatchLocation}
                  </TableCell>

                  <TableCell className="border border-gray-300">
                    {/* Display the last event's status */}
                    {percel.trackingEvents.length
                      ? percel.trackingEvents
                          .slice(-1) // Get the last event
                          .map((event, eventIndex) => (
                            <div key={eventIndex} className="mb-2">
                              <Badge
                                className={
                                  event.status === "CANCELED"
                                    ? "bg-red-500 text-white"
                                    : "bg-green-500 text-white dark:bg-green-600"
                                }
                              >
                                <strong>Status:</strong> {event.status}
                              </Badge>
                              <p>
                                <strong>Location:</strong> {event.location}
                              </p>
                              <p>
                                <strong>Note:</strong> {event.note}
                              </p>
                              <p>
                                <strong>Time:</strong>{" "}
                                {new Date(event.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))
                      : "No tracking event found"}
                  </TableCell>

                  <TableCell className="border border-gray-300">
                    <Select
                      value={selectedStatus}
                      onValueChange={(newStatus) =>
                        setSelectedStatus(newStatus)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300">
                        <SelectItem value="CANCELED">CANCELED</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() =>
                        handleStatusChange(percel._id, percel.dispatchLocation)
                      }
                      className="mt-2 bg-chart-2"
                      disabled={!selectedStatus}
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      <PaginationFiLtering
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
}
