import { useEffect } from "react";
import socket from "./socket";
import { v4 as uuidv4 } from "uuid";

export default function SocketManager() {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    // Generate persistent guest ID
    let userId = localStorage.getItem("guestId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("guestId", userId);
    }
    const userName = "Guest-" + userId.slice(0, 5);

    // Notify backend globally
    socket.emit("user-online", { userId, userName });

    // Re-emit on reconnect
    socket.on("connect", () => {
      socket.emit("user-online", { userId, userName });
    });

    return () => {
      // ❌ DO NOT disconnect — user stays online
    };
  }, []);

  return null;
}
