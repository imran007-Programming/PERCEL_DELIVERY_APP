import { useTrackThePercelQuery } from "@/components/Redux/Features/Percel/percel.api";
import Loader from "@/components/ui/Loader";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

import { BoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export type IEvent = {
  status: string;
  curreentLocation: string;
  arrivedAt: string;
  note: string;
};

export default function TrackinPercel() {
  const { trackingId } = useParams();

  const [percelTrackingId, setPerTrackingId] = useState("");
  const {
    data: trackPercel,
    isFetching,
    isError,
  } = useTrackThePercelQuery(percelTrackingId);
 

  // Set the tracking ID when the param changes
  useEffect(() => {
    if (trackingId) {
      setPerTrackingId(trackingId);
    }
  }, [trackingId]);

  if (isError) {
    return (
      <div className="flex flex-col-reverse justify-center items-center min-h-screen gap-y-8">
        <h2 className=" text-3xl">Percel not found</h2>
        <BoxIcon size={100} color="purple" />
      </div>
    );
  }

  // If tracking data is not available, show loading
  if (isFetching) {
    return <Loader />;
  }

  const { reciverInfo, trackingEvents } = trackPercel.data;


  // Reverse the trackingEvents array to show timeline in reverse order
  const reversedTrackingEvents = [...trackingEvents].reverse();

  return (
    <div className="flex flex-col sm:mt-5 mt-30  sm:flex-row items-center justify-between sm:min-h-screen min-h-0 container overflow-auto">
      <Timeline defaultValue={3}>
        {/* Render Tracking Events dynamically in reverse order */}
        {reversedTrackingEvents.map((event: IEvent, index: number) => (
          <TimelineItem
            key={index}
            step={index}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32 "
          >
            <TimelineHeader className="flex justify-between items-center">
              {/* Left Side - Tracking Event */}
              <div className="flex flex-col items-start">
                <TimelineSeparator />
                <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                  {new Date(event.arrivedAt).toLocaleString()}
                </TimelineDate>
                <TimelineTitle className="sm:-mt-0.5">
                  {event.status}
                </TimelineTitle>
              </div>

              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>Details:{event.note}</TimelineContent>
            <TimelineContent>Location:{event.curreentLocation}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Right Side - Sender Information */}
      <div className="flex sm:mt-0 mt-20 ml-4 flex-col items-end">
        <div className="text-foreground">
          <p>
            <strong>Receiver_Name:</strong> {reciverInfo?.name}
          </p>
          <p>
            <strong>Receiver_Email:</strong> {reciverInfo?.email}
          </p>
          <p>
            <strong>Receiver_Phone:</strong> {reciverInfo?.phone}
          </p>
          <p>
            <strong>Receiver_Address:</strong> {reciverInfo?.address}
          </p>
        </div>
      </div>
    </div>
  );
}
