import { Badge } from "@/components/ui/badge";

type Iprops = {
  event: { 
    status: string;
    location: string;
    note: string;
    timestamp: string;
  };

};

export default function PercelHistoryModal({ event }: Iprops) {
 
  // Define status-to-color mapping
  const statusColorMap: Record<string, string> = {
    PENDING: "bg-yellow-500 text-white",
    PICKED: "bg-blue-500 text-white",
    IN_TRANSIT: "bg-indigo-500 text-white",
    DELIVERED: "bg-green-500 text-white",
    CANCELED: "bg-red-500 text-white",
    RETURNED_REQUEST: "bg-purple-500 text-white",
  };

  // Get the color class based on the event status
  const statusColorClass = statusColorMap[event.status] || "bg-gray-500 text-white";

  return (
    <div className="max-w-2xl mx-auto mt-4 p-4">
    
      <ol className="relative space-y-8 before:absolute before:-ml-px before:h-50 before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700">
         
        <li className="relative -ms-1.5 flex items-start gap-4">
          {/* Circle indicator for each event */}
          <span className={`size-3 shrink-0 rounded-full ${statusColorClass}`}></span>

          <div className="-mt-2">
            {/* Timestamp */}
            <time className="text-xs font-medium text-gray-700 dark:text-gray-200">
              {new Date(event.timestamp).toLocaleString()}
            </time>

            {/* Event Status */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {event.status}
            </h3>

            {/* Event Details */}
            <div className="mt-2">
              <Badge variant="secondary" className={statusColorClass}>
                <strong>Status:</strong> {event.status}
              </Badge>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Note:</strong> {event.note}</p>
              <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </li>
      
      </ol>
      
    </div>
  );
}
