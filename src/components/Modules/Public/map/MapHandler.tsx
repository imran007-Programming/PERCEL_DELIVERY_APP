import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapHandler() {
  const map = useMap();
  useEffect(() => {
    window._leaflet_map = map;
  }, [map]);
  return null;
}
