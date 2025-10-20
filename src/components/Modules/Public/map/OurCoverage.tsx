/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
// Extend the Window interface to include custom Leaflet properties
declare global {
  interface Window {
    _leaflet_map?: any;
    _nearest_user_marker?: never;
    _nearest_hub_marker?: any;
    _search_marker?: any;
  }
}

import { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import { MapPin } from "lucide-react";
import { locations } from "@/assets/locationData/locationData";
import MapHandler from "./MapHandler";
import FitBounds from "./FitBounds";
import SearchLocation from "./SearchLocation";
import LocateUserButton from "./LocateUserButton";
import Routing from "./Routing";

import "leaflet/dist/leaflet.css";
import { createIcon } from "./helper";
import { toast } from "sonner";

export default function BeautifulFreeMap({ dark = false }) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHub, setNearestHub] = useState(null);

  const tileUrl = dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  const points = useMemo(() => locations.map((l) => [l.lat, l.lng]), []);

  // Same handleFindNearest function (keep it as-is)
  const handleFindNearest = () => {
    const map = window._leaflet_map;
    if (!map) return;

    const toastId = toast.loading("📍 Finding nearest hub...");

    // Helper function to process location
    const processLocation = (
      latitude: number,
      longitude: number,
      source: string,
      label: string
    ) => {
      setUserLocation([latitude, longitude]);

      let nearest = null;
      let minDistance = Infinity;

      locations.forEach((loc) => {
        const dist = Math.hypot(loc.lat - latitude, loc.lng - longitude);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = loc;
        }
      });

      toast.dismiss(toastId);

      if (nearest) {
        const distanceKm = (minDistance * 111).toFixed(2);
        toast.success(
          `✅ Nearest Hub: ${nearest.name} (${distanceKm} km from ${label})`
        );

        setNearestHub({
          lat: nearest.lat,
          lng: nearest.lng,
          name: nearest.name,
        });

        // Remove previous markers if they exist
        if (window._nearest_user_marker) {
          try {
            map.removeLayer(window._nearest_user_marker);
          } catch {}
        }
        if (window._nearest_hub_marker) {
          try {
            map.removeLayer(window._nearest_hub_marker);
          } catch {}
        }

        // Add marker for user's location (or searched point)
        const userMarker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: "user-marker",
            html: `<div style="width:16px;height:16px;background:#2563eb;border-radius:50%;border:3px solid white;box-shadow:0 0 8px rgba(0,0,0,0.4);"></div>`,
          }),
        })
          .addTo(map)
          .bindPopup(`📍 ${label}`)
          .openPopup();

        // Add marker for nearest hub
        const hubMarker = L.marker([nearest.lat, nearest.lng], {
          icon: L.divIcon({
            className: "hub-marker",
            html: `<div style="width:16px;height:16px;background:#22c55e;border-radius:50%;border:3px solid white;box-shadow:0 0 8px rgba(0,0,0,0.4);"></div>`,
          }),
        })
          .addTo(map)
          .bindPopup(`🏢 Nearest Hub: <b>${nearest.name}</b>`);

        window._nearest_user_marker = userMarker;
        window._nearest_hub_marker = hubMarker;

        // Fit both points in view smoothly
        const bounds = L.latLngBounds([
          [latitude, longitude],
          [nearest.lat, nearest.lng],
        ]);
        map.flyToBounds(bounds, { padding: [80, 80], duration: 1.2 });
      }
    };

    // 1️⃣ If user searched a location, use that marker’s position
    if (window._search_marker) {
      const { lat, lng } = window._search_marker.getLatLng();
      processLocation(lat, lng, "searched", "Searched Location");
      return;
    }

    // 2️⃣ Otherwise, fallback to current GPS location
    if (!navigator.geolocation) {
      toast.dismiss(toastId);
      toast.error("❌ Geolocation not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        processLocation(latitude, longitude, "current", "You");
      },
      (err) => {
        toast.dismiss(toastId);
        toast.error("⚠️ Unable to access your location.");
        console.error(err);
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-20 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800">
      <div className="w-full md:w-4/5 h-[500px] md:h-[600px] relative">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={6.5}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
          whenCreated={(map) => (window._leaflet_map = map)}
        >
          <MapHandler />
          <TileLayer url={tileUrl} />
          <FitBounds points={points} />

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createIcon()}
            >
              <Popup>
                <div className="text-black dark:text-white">
                  <h3 className="font-semibold">{loc.name}</h3>
                  <p className="text-sm">{loc.desc}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <SearchLocation query={query} createIcon={createIcon} />
          <LocateUserButton onLocate={() => setQuery("")} />

          {userLocation && nearestHub && (
            <>
              <Polyline
                positions={[userLocation, [nearestHub.lat, nearestHub.lng]]}
                pathOptions={{ color: "#2563eb", weight: 5 }}
              />
              <Routing userLocation={userLocation} nearestHub={nearestHub} />
            </>
          )}
        </MapContainer>
      </div>

      <div className="w-full md:w-1/5 p-6 flex flex-col items-start justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
        <div className="flex gap-3 items-center mb-6">
          <MapPin color="blue" size={32} />
          <p className="text-base md:text-sm font-medium text-gray-800 dark:text-gray-100">
            Our Hub Locations & Coverage
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Search Location
        </h2>

        <input
          type="text"
          placeholder="Enter location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent outline-none text-gray-800 dark:text-white"
        />

        <button
          onClick={() => setQuery(search)}
          className="w-full bg-primary text-white py-2 rounded-md transition"
        >
          Search
        </button>

        <button
          onClick={handleFindNearest}
          className="w-full bg-green-600 text-white py-2 rounded-md transition mt-3"
        >
          Find Nearest Hub
        </button>

        <p className="mt-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Type any city or area to locate it on the map.&nbsp;
          <span className="text-blue-500 font-medium"> Blue markers </span> are
          hubs,&nbsp;
          <span className="text-red-500 font-medium"> red markers </span> show
          searched locations.&nbsp; When you click “Find Nearest Hub”, a&nbsp;
          <span className="text-indigo-500 font-medium"> blue line </span>{" "}
          connects your position to the nearest hub.
        </p>
      </div>
    </div>
  );
}
