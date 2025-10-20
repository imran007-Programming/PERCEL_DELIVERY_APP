import socket from "@/components/Hooks/socket";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import typing from "../../assets/lottie/Typing (1).json";
import { useTyping } from "@/util/useTyping";
type ChatMessage = {
  user: string;
  text: string;
  time?: string | number | Date;
};
export default function AdminChat({
  selectedUserId,
  selectedUserName,
  activeUserTyping,
}: {
  selectedUserId: string;
  selectedUserName: string;
  activeUserTyping: null;
}) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const roomId = selectedUserId;
  const { handleTyping, handleStopTyping } = useTyping(roomId, "Admin");
  useEffect(() => {
    socket.emit("join-room", { roomId, userName: "Admin" });
    socket.on("chat-history", (msg) => setChat(msg));
    socket.on("message", (msg) => setChat((prev) => [...prev, msg]));

    return () => {
      socket.off("chat-history");
      socket.off("message");
    };
  }, [roomId]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  /* send Message */
  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, user: "Admin", text: message });
    setMessage("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat,activeUserTyping]);

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    handleTyping();
    handleStopTyping();
  };




  return (
   <div className="flex justify-center items-center p-4">
  <div className="flex flex-col h-[40rem] w-full max-w-2xl border rounded-3xl shadow-lg bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between p-5 bg-white shadow-inner rounded-t-3xl border-b border-gray-200">
      <h3 className="font-bold text-lg text-gray-700">
        Chat with <span className="text-red-400">{selectedUserName}</span>
      </h3>
      <span className="text-sm text-gray-500">Online</span>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-200 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100 rounded-2xl">
      {chat.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.user === "Admin" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-[70%] break-words shadow-md transform transition duration-200 hover:scale-[1.02] ${
              msg.user === "Admin"
                ? "bg-primary text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex justify-between items-end mb-1">
              <span className="font-semibold text-sm">{msg.user}</span>
              <span className="text-xs text-gray-50 ml-2">
                {new Date(msg.time || new Date()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="text-sm">{msg.text}</div>
          </div>
        </div>
      ))}

      {activeUserTyping && (
        <div className="flex items-center space-x-2 animate-pulse">
          <Lottie animationData={typing} loop className="w-10 h-10" />
          <span className="text-gray-500 text-sm italic">typing...</span>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>

    {/* Input Field */}
    <div className="flex p-4 bg-white dark:text-black border-t border-gray-200 rounded-b-3xl shadow-inner">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 rounded-l-2xl! border border-gray-300 focus:outline-none shadow-sm transition duration-200 placeholder-gray-400"
      />
      <button
        onClick={sendMessage}
        className="bg-primary rounded-r-2xl! text-white px-6 py-3 hover:bg-green-600 transition-colors shadow-md"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
}
