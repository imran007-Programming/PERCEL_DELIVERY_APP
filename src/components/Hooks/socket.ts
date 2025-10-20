import { io } from "socket.io-client";

const Base_Url = import.meta.env.VITE_SOCKET_URL;

// conncet the socket

const socket = io(Base_Url, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
