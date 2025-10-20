//@ts-nocheck
import { MapPin } from "lucide-react";
import { useMap } from "react-leaflet";
import { toast } from "sonner";
import L from "leaflet";

export default function LocateUserButton() {
  const map = useMap();

  const handleLocate = () => {
    if (window._search_marker) {
      map.removeLayer(window._search_marker);
      window._search_marker = null;
    }

  
    toast.loading("Locating...");
    map.locate();

    const onFound = (e: L.LeafletEvent & { latlng: L.LatLng }) => {
      toast.dismiss();
      const marker = L.marker(e.latlng, {
        icon: L.divIcon({
          className: "user-marker",
          html: `<div style="width:16px;height:16px;background:#2563eb;border-radius:50%;border:3px solid white"></div>`,
        }),
      })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

      window._user_marker = marker;
      map.flyTo(e.latlng, 14);
      toast.success("Location found!");
    };

    const onError = () => {
      toast.dismiss();
      toast.error("Unable to access location.");
    };

    map.once("locationfound", onFound);
    map.once("locationerror", onError);
  };

  return (
    <button
      onClick={handleLocate}
      className="absolute bottom-6 left-6 z-[1000] bg-blue-600 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-700 transition flex gap-2 items-center"
    >
      <MapPin /> Locate Me
    </button>
  );
}
