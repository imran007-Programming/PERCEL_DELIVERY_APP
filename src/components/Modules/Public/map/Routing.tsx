//@ts-nocheck
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function Routing({ userLocation, nearestHub }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !nearestHub) return;
    const routing = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(nearestHub.lat, nearestHub.lng),
      ],
      lineOptions: { styles: [{ color: "#2563eb", weight: 5 }] },
      addWaypoints: false,
      show: false,
    }).addTo(map);

    return () => map.removeControl(routing);
  }, [map, userLocation, nearestHub]);

  return null;
}
