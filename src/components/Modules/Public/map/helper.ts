import L from "leaflet";

// Custom icon generator
export const createIcon = (color = "#2563eb") =>
  new L.DivIcon({
    className: "custom-leaflet-marker",
    html: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
