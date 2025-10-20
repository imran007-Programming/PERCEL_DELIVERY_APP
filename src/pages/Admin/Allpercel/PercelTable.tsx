import { Badge } from "@/components/ui/badge";
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
import type { IPercel } from "@/types";
import {  Trash2Icon } from "lucide-react";

interface IPercelTable {
  senderAllPercels: {
    statusCode: number;
    success: boolean;
    message: string;
    percelData: IPercel[];
  };
  filter: string;
  setCurrentPercel: React.Dispatch<React.SetStateAction<IPercel | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteClick: (id: string) => void;
}


export default function PercelTableData({
  senderAllPercels,
  filter,
  setCurrentPercel,
  setShowModal,
  handleDeleteClick,
}: IPercelTable) {
  return (
    <div>
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
          All Parcels Retrieved Successfully
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Parcel Type
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Weight
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Fee
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Tracking ID
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Current Location
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Pickup Address
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Dispatch Location
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Tracking Events
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Action
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {senderAllPercels?.percelData?.map(
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
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <TableCell>{percel.percelType}</TableCell>
                  <TableCell>
                    {percel.weight.value} {percel.weight.unit}
                  </TableCell>
                  <TableCell>{percel.fee} Taka</TableCell>
                  <TableCell className="font-mono text-sm">
                    {percel.trackingId}
                  </TableCell>
                  <TableCell>{percel.currentLocation}</TableCell>
                  <TableCell>{percel.pickupAddress}</TableCell>
                  <TableCell>{percel.dispatchLocation}</TableCell>

                  <TableCell>
                    {percel.trackingEvents.length ? (
                      percel.trackingEvents.slice(-1).map((event, i) => (
                        <div
                          key={i}
                          className="p-2 rounded bg-gray-50 dark:bg-gray-700"
                        >
                          <Badge
                            className={`mb-2 ${
                              event.status === "CANCELED"
                                ? "bg-red-500"
                                : "bg-green-500 dark:bg-green-600"
                            } text-white`}
                          >
                            {event.status}
                          </Badge>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            <strong>Loc:</strong> {event.location}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            <strong>Note:</strong> {event.note}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">
                        No tracking event
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        setCurrentPercel(percel);
                        setShowModal(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 shadow-sm transition"
                    >
                      Update Status
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(percel._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 shadow-sm transition"
                    >
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
