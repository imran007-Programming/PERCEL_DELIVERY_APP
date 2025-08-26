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
  useGetPercelByReceiverQuery,
  usePercelConfirmationByReceiverMutation,
} from "@/components/Redux/Features/Percel/percel.api";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { IPercel } from "@/types";
import Loader from "@/components/ui/Loader";
import PaginationFiLtering from "@/util/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PercelHistoryModal from "./PercelHistoryModal";
import { CircleX, ClosedCaptionIcon, CroissantIcon, CrossIcon, LucideCross, X } from "lucide-react";

export default function ReceiverPercelTable() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmThePercel] = usePercelConfirmationByReceiverMutation();
  const [selectedParcel, setSelectedParcel] = useState<IPercel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const receiverId = data?.data?._id;

  const { data: getIncomeingPercel, isLoading: isLoadingPercels } =
    useGetPercelByReceiverQuery({
      receiverId,
      params: {
        searchTerm: searchQuery || undefined,
        status: filter === "all" ? undefined : filter || undefined,
        limit: 1,
        page: currentPage,
      },
    });

  if (isLoading || isLoadingPercels) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleStatusChange = async (
    percelId: string,
    lastStatus: string,
    existConformation: boolean
  ) => {
    try {
      if (existConformation) {
        toast.error("The percel is already confirmed");
      } else if (lastStatus === "DELIVERED") {
        const res = await confirmThePercel(percelId);
        if (res.data.success) {
          toast.success("percel confirmed successfully");
        }
      } else {
        toast.success("You can't confirm the percel until it is delivered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewHistory = (percel: IPercel) => {
    setSelectedParcel(percel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 gap-x-4 flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Tracking ID"
          className="p-2 border rounded w-[50%]"
        />
      </div>

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
        <TableCaption>All Receiver Parcels Retrieved Successfully</TableCaption>
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
            {/* <TableHead className="border border-gray-300">
              Current Location
            </TableHead> */}
            <TableHead className="border border-gray-300">
              Pickup Address
            </TableHead>
            <TableHead className="border border-gray-300">
              Dispatch Location
            </TableHead>
            <TableHead className="border border-gray-300">
              Tracking Events
            </TableHead>
            <TableHead className="border border-gray-300">
              Confirm The percel
            </TableHead>
            <TableHead className="border border-gray-300">
              view the history
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getIncomeingPercel?.percelData?.map(
            (percel: IPercel, index: number) => {
              const lastEventStatus = percel.trackingEvents.length
                ? percel.trackingEvents[percel.trackingEvents.length - 1].status
                : null;

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
                  {/* <TableCell className="border border-gray-300">
                    {percel.currentLocation}
                  </TableCell> */}
                  <TableCell className="border border-gray-300">
                    {percel.pickupAddress}
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {percel.dispatchLocation}
                  </TableCell>

                  <TableCell className="border border-gray-300">
                    {percel.trackingEvents.length
                      ? percel.trackingEvents
                          .slice(-1)
                          .map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="mb-2 flex flex-col-reverse gap-y-2"
                            >
                              <Badge
                                variant={
                                  event.status === "CANCELED"
                                    ? "primary"
                                    : "secondary"
                                }
                                className={
                                  event.status === "CANCELED"
                                    ? "bg-red-500 text-white"
                                    : "bg-green-500 text-white dark:bg-green-600"
                                }
                              >
                                <strong>Status:</strong> {event.status}
                              </Badge>
                              <p>
                                <strong>current Location:</strong>{" "}
                                {event.location}
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
                        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() =>
                        handleStatusChange(
                          percel._id,
                          lastEventStatus,
                          percel.isConfirm
                        )
                      }
                      className="mt-2 bg-chart-2"
                      disabled={!selectedStatus}
                    >
                      Update Status
                    </Button>
                  </TableCell>

                  <TableCell className="border border-gray-300">
                    <Button
                      onClick={() => handleViewHistory(percel)}
                      className="mt-2"
                    >
                      View Delivery History
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex">
        <div className="ml-auto">
          <PaginationFiLtering
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            senderAllPercels={getIncomeingPercel}
          />
        </div>
      </div>

        {/* Modal for Delivery History */}
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center justify-between bg-white dark:bg-gray-900 relative p-4 rounded-md shadow-lg w-[70%] h-[80%]">
         

            {/* Parcel Tracking History Section */}
            <div className="w-2/3 p-4 overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tracking ID: <strong className="text-primary">{selectedParcel.trackingId}</strong></h3>
              {selectedParcel.trackingEvents.map((event, index) => (
                <PercelHistoryModal key={index} event={event} index={index} />
              ))}
            </div>

               {/* User Details Section */}
            <div className="flex flex-col items-start w-[50%] p-6 space-y-3  rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Receiver Details</h3>
              <p><strong>Name:</strong> {data?.data?.name}</p>
              <p><strong>Email:</strong> {data?.data?.email}</p>
              <p><strong>Phone:</strong> {data?.data?.phone}</p>
              <p><strong>Address:</strong> {data?.data?.address}</p>
            </div>

            {/* Close Button */}
            <Button onClick={closeModal} className="absolute top-4 right-4  dark:bg-transparent dark:hover:bg-transparent cursor-pointer ">
         
               <CircleX size={34}/>
          
            </Button>
          </div>
         
        </div>
        
      )}
    </div>
  );
}
