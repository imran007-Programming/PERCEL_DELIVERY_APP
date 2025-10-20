import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CustomerId } from "@/components/Hooks/userSocketDetails";
import socket from "@/components/Hooks/socket";
import typing from "../../../assets/lottie/Typing (1).json";
import Lottie from "lottie-react";
import { useTyping } from "@/util/useTyping";
export default function UserChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  //   const geustId = localStorage.getItem("guestId");

  type ChatMessage = {
    user: string;
    text: string;
    time?: string | number | Date;
  };
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const userDetails = CustomerId();
  const userId = userDetails?.customerId;
  const userName = userDetails?.customerName;
  const roomId = `roomNumber-${userId}`;
  const [activeUserTyping, setActiveUserTyping] = useState(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { handleTyping, handleStopTyping } = useTyping(roomId, userName);
  useEffect(() => {
    // Connect socket once when component mounts
    socket.connect();

    if (userId && userName && roomId) {
    // Mark user active
    socket.emit("user-online", { userId, userName, roomId });

    // Join chat room
    socket.emit("join-room", { roomId, userName });
  }

    // Listen for messages
    socket.on("chat-history", (message) => setChat(message));
    socket.on("message", (msg) => setChat((prev) => [...prev, msg]));

    socket.on("typing", ({ userName }) => {
      setActiveUserTyping(userName);
    });
    socket.on("stop-typing", () => {
      setActiveUserTyping(null);
    });

    // Cleanup when component unmounts or room changes
    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("chat-history");
      socket.off("message");
      socket.off("typing");
      socket.off("stop-typing");
      socket.disconnect();
    };
  }, [roomId, userId, userName]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, user: userName, text: message });
    setMessage("");
  };
  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: isOpen ? "auto" : "smooth",
    });
  }, [chat, isOpen, activeUserTyping]);

  /* handle typing function */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    handleTyping();
    handleStopTyping();
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-26  right-8  z-50 flex h-14 w-14 rounded-full! items-center justify-center  bg-primary text-white shadow-lg hover:bg-primary focus:outline-none"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <MessageCircle size={38} />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Chat Modal Box */}
            <motion.div
              className="relative w-full max-w-7xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-xl rounded-2xl dark:bg-primary bg-white p-5 shadow-2xl mx-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Chat with us 💬
              </h2>
              <div className="mt-3  rounded-md  ">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  👋 Hello!{" "}
                  <span className="dark:bg-white dark:text-black text-black p-2 rounded-md ">
                    {userDetails?.customerName}
                  </span>{" "}
                  How can we help you today?
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 space-y-2 h-72  overflow-y-auto">
                {chat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.user === userName ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
                        msg.user === userName
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span className="font-semibold">{msg.user}:</span>{" "}
                      {msg.text}
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(msg.time ? msg.time : "").toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Typing indicator here */}
                {activeUserTyping === "Admin" && (
                  <div className="flex items-center space-x-2">
                    <Lottie animationData={typing} loop className="w-10 h-10" />
                    <span className="text-white text-sm italic">typing...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  value={message}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg! border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
                <button
                  onClick={sendMessage}
                  className="rounded-lg! bg-white text-black p-2 border "
                >
                  Send
                </button>
              </div>

              {/* Close Button */}
              <button
                className="absolute right-3 top-3 bg-primary text-white dark:bg-white  h-7 w-7 rounded-full! dark:text-black  font-bold "
                onClick={() => setIsOpen(false)}
              >
                <span className="flex justify-center items-center"> ✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
