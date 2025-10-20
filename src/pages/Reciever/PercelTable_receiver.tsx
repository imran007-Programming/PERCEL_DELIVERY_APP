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
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { IPercel } from "@/types";
import loaderJson from "../../assets/lottie/Forklift loading truck.json"
import PaginationFiLtering from "@/util/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PercelHistoryModal from "./PercelHistoryModal";
import { CircleX, Send } from "lucide-react";
import LottieLoader from "@/shared/lotttieAnimation";

export default function ReceiverPercelTable() {
  const { data, isFetching:userFetch } = useUserInfoQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
   const [activeButton, setActiveButton] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmThePercel] = usePercelConfirmationByReceiverMutation();
  const [selectedParcel, setSelectedParcel] = useState<IPercel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const receiverId = data?.data?._id;

  const { data: getIncomeingPercel, isFetching: percelFetch } =
    useGetPercelByReceiverQuery({
      receiverId,
      params: {
        searchTerm: searchQuery || undefined,
        status: filter === "all" ? undefined : filter || undefined,
        limit: 10,
        page: currentPage,
      },
    });
  const totalPage = getIncomeingPercel?.meta?.totalPage;

  

  const handleStatusChange = async (
    percelId: string,
    lastStatus: string | null,
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
        toast.error("You can't confirm the percel until it is delivered");
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

    useEffect(() => {
      if (search === "") {
        setSearchQuery("");
      }
    }, [search]);
  
    const handlesearchAction = () => {
      setSearchQuery(search);
    };


    if (percelFetch || userFetch) {
   return (
      <LottieLoader
        animationData={loaderJson}
        size={150}
        ariaLabel="Loading app..."
      />)
  }

  return (
    <div className="overflow-x-auto">
     <div className=" my-6 flex flex-wrap justify-between items-center gap-4">

  {/* Search Input */}
  <div className="relative flex w-[48%] ">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by Tracking ID"
      className="w-full rounded-l-lg! border-2 border-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
    />
    <button
      onClick={handlesearchAction}
      className="bg-primary rounded-r-lg! px-4 py-2 text-white flex items-center justify-center hover:bg-primary/90"
    >
    <Send/>
    </button>
  </div>

  {/* Status Filter */}
  <div className="">
    <Select
      value={filter}
      onValueChange={(newStatus) => setFilter(newStatus)}
    >
      <SelectTrigger className="w-full rounded-lg! border-2 border-primary dark:border-gray-600">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
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
                      // value={selectedStatus}
                      onValueChange={(newStatus) =>
                        setSelectedStatus(newStatus)
                      }
                       onOpenChange={() => setActiveButton(percel._id)}
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
                      disabled={activeButton !== percel._id}
                    >
                    {activeButton === percel._id
                              ? selectedStatus
                              : "Update Status"}
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
      {
        getIncomeingPercel?.percelData?.length>=10 &&<div className="flex">
        <div className="ml-auto">
          <PaginationFiLtering
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </div>
      </div>
      }

      {/* Modal for Delivery History */}
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          
          <div className="bg-white h-[600px] dark:bg-gray-900 relative rounded-md shadow-lg w-full max-w-5xl  overflow-y-auto hide-scrollbar">
            {/* Main content */}
          
            <div className="flex justify-evenly items-center flex-col md:flex-row p-7">
              {/* Timeline */}
              <div className="w-full md:w-2/3 sm:w-6 ">
                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Parcel Delivery History</h2>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Tracking ID:{" "}
                  <strong className="text-primary">
                    {selectedParcel.trackingId}
                  </strong>
                </h3>
                 
                {selectedParcel.trackingEvents.map((event, index: number) => (
                  <PercelHistoryModal key={index} event={event} />
                ))}
              </div>

              {/* Receiver Info */}
              <div className=" w-full md:w-1/3 flex flex-col p-6 space-y-3  border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Receiver Details
                </h3>
                <p>
                  <strong>Name:</strong> {data?.data?.name}
                </p>
                <p>
                  <strong>Email:</strong> {data?.data?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {data?.data?.phone}
                </p>
                <p>
                  <strong>Address:</strong> {data?.data?.address}
                </p>
              </div>
            </div>

            {/* Close Button */}
            {/* <Button
              onClick={closeModal}
              className="absolute top-4 right-4 dark:bg-transparent dark:hover:bg-transparent cursor-pointer"
            >
            
            </Button> */}
              <CircleX 
                 onClick={closeModal}
              className="absolute top-4 right-4 dark:bg-transparent dark:hover:bg-transparent cursor-pointer" size={26} />
          </div>
        </div>
      )}
    </div>
  );
}
