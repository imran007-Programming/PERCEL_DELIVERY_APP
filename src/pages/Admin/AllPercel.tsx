
import {
  useDeletePercelByAdminMutation,
  useGetPercelByAdminQuery,
  useUpdatePercelStatusByAdminMutation,
} from "@/components/Redux/Features/Percel/percel.api";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import loaderJson from "../../assets/lottie/Forklift loading truck.json"

import PaginationFiLtering from "@/util/Pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IPercel } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import PercelUpdateModal from "./Allpercel/PercelUpdateModal";
import PercelDeleteModal from "./Allpercel/PercelDeleteModal";
import PercelTableData from "./Allpercel/PercelTable";
import { Send } from "lucide-react";
import LottieLoader from "@/shared/lotttieAnimation";

export default function PercelTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentPercel, setCurrentPercel] = useState<IPercel | null>(null);
  const [changePercelStatus] = useUpdatePercelStatusByAdminMutation();
  const [percelDelete] = useDeletePercelByAdminMutation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPercelId, setCurrentPercelId] = useState<string | null>(null);
  // Fetch parcels data
  const { data: senderAllPercels, isFetching } = useGetPercelByAdminQuery({
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

  if (!currentPercel) {
    toast.error("No parcel selected!");
    return;
  }

  const trackingEvents = currentPercel.trackingEvents;
  const lastEvent = trackingEvents[trackingEvents.length - 1];
  const lastStatus = lastEvent?.status;
  const selectedStatus = data.status;
  const existingStatuses = trackingEvents.map((e) => e.status);

  // 🛑 Rule 1: If parcel is canceled — block any update
  if (lastStatus === "CANCELED") {
    toast.error("❌ This parcel has been canceled. You cannot change its status.");
    return;
  }

  // 🛑 Rule 2: If parcel is delivered — block any update
  if (lastStatus === "DELIVERED") {
    toast.error("📦 This parcel has already been delivered. Status cannot be changed.");
    return;
  }

  // 🚫 Rule 3: Prevent duplicate or redundant status updates
  if (existingStatuses.includes(selectedStatus)) {
    toast.error(`⚠️ Parcel already had status: ${selectedStatus}`);
    return;
  }

  if (lastStatus === selectedStatus) {
    toast.error(`⚠️ Parcel is already marked as ${lastStatus}`);
    return;
  }

  // ✅ Rule 4: Create new status change object
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
        `✅ Parcel status successfully changed from ${lastStatus} to ${selectedStatus}`
      );
      form.reset();
      setShowModal(false);
    } else {
      toast.error("Something went wrong while updating the parcel status.");
    }
  } catch (error) {
    console.error(error);
    toast.error("❌ Failed to change parcel status. Please try again.");
  }
}


  /* Delete a percel */

  const handleDeleteClick = (percelId: string) => {
    setCurrentPercelId(percelId);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (currentPercelId) {
      try {
        const res = await percelDelete(currentPercelId).unwrap();
        if (res?.success) {
          toast.success("Parcel deleted successfully");
          setShowConfirmModal(false);
        }
      } catch (error) {
        toast.error("Failed to delete the parcel");
        setShowConfirmModal(false);
        console.log(error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };


   useEffect(() => {
    if (search === "") {
      setSearchQuery("");
    }
  }, [search]);

 
  const handlesearchAction = () => {
    setSearchQuery(search);
  };
  // If loading, show loader

  if (isFetching)
    return (
      <LottieLoader
        animationData={loaderJson}
        size={150}
        ariaLabel="Loading app..."
      />
    );


  return (
    <div className="overflow-x-auto">
      {/* Search & Filters */}
<div className="ml-5!  my-6 flex flex-wrap justify-between items-center gap-y-4">

  {/* Search Input */}
  <div className="relative w-[40%] flex">
    <input
      type="text"
      value={search}
     onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by Tracking ID"
      className="pl-10 pr-[60px] py-2 w-full rounded-l-lg! border-2! border-primary! focus:outline-none!"
    />
    <div
      onClick={handlesearchAction}
      className="bg-primary p-3 cursor-pointer rounded-r-lg! flex items-center justify-center"
    >
      <Send />
    </div>
  </div>

  {/* Status Filter */}
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


      {/* Parcels Table */}
      <PercelTableData
        filter={filter}
        handleDeleteClick={handleDeleteClick}
        senderAllPercels={senderAllPercels}
        setCurrentPercel={setCurrentPercel}
        setShowModal={setShowModal}
      />

      {/* Pagination */}
      <PaginationFiLtering
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />

      {/* Modal for Updating Status */}
       <PercelUpdateModal showModal={showModal}  onSubmit={onSubmit} setShowModal={setShowModal} />

      <div>
        <PercelDeleteModal
          showConfirmModal={showConfirmModal}
            handleDelete={handleDelete}
            handleCancelDelete={handleCancelDelete}
          />
      </div>
    </div>
  );
}
