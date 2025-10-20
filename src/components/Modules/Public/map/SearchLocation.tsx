import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";

interface SearchLocationProps {
  query: string;
  createIcon: (color: string) => L.Icon;
}

export default function SearchLocation({ query, createIcon }: SearchLocationProps) {
  const map = useMap();

  useEffect(() => {
    if (!query) return;
    if (window._search_marker) {
      map.removeLayer(window._search_marker);
      window._search_marker = null;
    }

    const toastId = toast.loading("Searching location...");
    let isCancelled = false;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        toast.dismiss(toastId);
        if (isCancelled || !data?.[0]) {
          toast.error("No results found.");
          return;
        }

        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);
        const marker = L.marker([lat, lon], { icon: createIcon("#ef4444") })
          .addTo(map)
          .bindPopup(`<b>${query}</b>`)
          .openPopup();

        map.flyTo([lat, lon], 11, { duration: 1.2 });
        window._search_marker = marker;
        toast.success(`Found: ${query}`);
      })
      .catch(() => toast.error("Error fetching location."));

    return () => {
      isCancelled = true;
      if (window._search_marker) map.removeLayer(window._search_marker);
    };
  }, [query, map, createIcon]);

  return null;
}
