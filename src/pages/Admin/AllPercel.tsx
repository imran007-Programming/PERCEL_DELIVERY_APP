import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetPercelByAdminQuery,
  useUpdatePercelStatusByAdminMutation,
} from "@/components/Redux/Features/Percel/percel.api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/Loader";
import PaginationFiLtering from "@/util/Pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IPercel } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function PercelTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentPercel, setCurrentPercel] = useState<IPercel | null>(null);
  const [changePercelStatus] = useUpdatePercelStatusByAdminMutation();
  // Fetch parcels data
  const { data: senderAllPercels, isLoading: isLoadingPercels } =
    useGetPercelByAdminQuery({
      searchTerm: searchQuery || undefined,
      status: filter === "all" ? undefined : filter || undefined,
      limit: 2,
      page: currentPage,
    });

  const totalPage = senderAllPercels?.meta?.totalPage;

  /* Current percelId */

  const FormSchema = z.object({
    location: z
      .string()
      .min(6, { message: "Location must be at least 6 characters." }),
    status: z.enum(
      [
        "PENDING",
        "CANCELED",
        "PICKED",
        "IN_TRANSIT",
        "DELIVERED",
        "RETURNED_REQUEST",
      ] as const,
      "Please select a valid status"
    ), // <-- second param is the error message
    note: z.string().min(6, { message: "Note must be at least 6 characters." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: "",
      status: "PENDING",
      note: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const percelId = currentPercel?._id;

    const lastStatus =
      currentPercel?.trackingEvents[currentPercel.trackingEvents.length - 1]
        .status;
    const selectedStatus = data.status;
    const existingStatus = currentPercel?.trackingEvents.map(
      (value) => value.status
    );

    // Check if the selected status already exists in the parcel's existing statuses
    const isStatusAlreadyExists = existingStatus?.includes(selectedStatus);

    if (isStatusAlreadyExists) {
      toast.error(`Parcel is already ${selectedStatus}`);
    } else if (lastStatus === selectedStatus) {
      toast.error(`percel is already ${lastStatus}`);
    } else {
      const changestatusData = {
        trackingEvents: [
          {
            status: data.status,
            location: data.location,
            note: data.note,
          },
        ],
      };

      try {
        const res = await changePercelStatus({
          percelId,
          statusData: changestatusData,
        });
        if (res?.data?.success) {
          toast.success(
            `percel status successfully change from ${lastStatus} to ${selectedStatus}`
          );
        }

        form.reset();
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // If loading, show loader
  if (isLoadingPercels) {
    return <Loader />;
  }

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

      {/* Parcels Table */}
      <Table className="table-auto border-collapse border border-gray-300">
        <TableCaption>All Parcels Retrieved Successfully</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-200 dark:bg-gray-800">
            <TableHead className="border border-gray-300">
              Parcel Type
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
                    {percel.trackingEvents.length
                      ? percel.trackingEvents
                          .slice(-1)
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
                    <Button
                      onClick={() => {
                        setCurrentPercel(percel);

                        setShowModal(true);
                      }}
                      className="bg-chart-2"
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

      {/* Modal for Updating Status */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black opacity-95">
          <div className="p-6  rounded border-5 shadow-lg max-w-md w-full">
            <h2 className="text-xl text-center mb-4">Update Parcel Status</h2>
            <div className="flex justify-center items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  {/* status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                            <SelectItem value="CANCELED">CANCELED</SelectItem>
                            <SelectItem value="PICKED">PICKED</SelectItem>
                            <SelectItem value="IN_TRANSIT">
                              IN_TRANSIT
                            </SelectItem>
                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                            <SelectItem value="RETURNED_REQUEST">
                              RETURNED_REQUEST
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Note */}
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Input placeholder="add a note here" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={() => setShowModal(false)} className="mr-2">
                    Close
                  </Button>
                  <Button type="submit">Update Status</Button>
                </form>
              </Form>

              {/* <label className="block mb-2">Select Status:</label> */}

              {/* <Select
                value={selectedStatus}
                onValueChange={(newStatus) => setSelectedStatus(newStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300">
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CANCELED">CANCELED</SelectItem>
                  <SelectItem value="PICKED">PICKED</SelectItem>
                  <SelectItem value="IN_TRANSIT">IN_TRANSIT</SelectItem>
                  <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                  <SelectItem value="RETURNED_REQUEST">
                    RETURNED_REQUEST
                  </SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            {/* <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowModal(false)} className="mr-2">
                Close
              </Button>
              <Button
                onClick={() => {
                  if (currentPercel) {
                    handleStatusChange(
                      currentPercel._id,
                      currentPercel.dispatchLocation
                    );
                    setShowModal(false);
                  }
                }}
                className="bg-chart-2"
              >
                Update Status
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
