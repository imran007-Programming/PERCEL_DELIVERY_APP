import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useUserInfoQuery } from "../Redux/Features/Auth/auth.api";
import socket from "@/components/Hooks/socket"; // ✅ if you have socket instance

export const CustomerId = () => {
  const { data } = useUserInfoQuery(undefined);
  const [customerId, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");

  const userId = data?.data?._id;
  const userName = data?.data?.name;

  useEffect(() => {
    if (userId) {
      // ✅ User is logged in
      const oldGuestId = localStorage.getItem("guestId");

      if (oldGuestId) {
        // optional: notify backend to merge guest -> user
        socket.emit("merge-guest-to-user", { guestId: oldGuestId, userId });

        // remove guestId from localStorage
        localStorage.removeItem("guestId");
      }

      // set logged-in user as the active customer
      setCustomerID(userId);
      setCustomerName(userName || "User");

      // reconnect socket as the new user
      socket.disconnect();
      socket.connect();
      socket.emit("join-room", { roomId: userId, userName });
    } else {
      // ✅ Handle guest user
      let id = localStorage.getItem("guestId");
      if (!id) {
        id = uuidv4();
        localStorage.setItem("guestId", id);
      }
      setCustomerID(id);
      setCustomerName("Guest");

      // connect socket as guest
      socket.emit("join-room", { roomId: id, userName: "Guest" });
    }
  }, [userId, userName]);

  return { customerId, customerName };
};
