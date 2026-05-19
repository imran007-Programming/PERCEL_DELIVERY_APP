import { useEffect, useState } from "react";
import socket from "@/components/Hooks/socket";
import { User } from "lucide-react";
import AdminChat from "./AdminChat";

interface ActiveUser {
  _id?: string;
  userName: string;
  roomId: string;
  userId: string;
  socketId?: string;
  lastSeen?: Date;
}

export default function AdminChatList() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [activeUserTyping, setActiveUserTyping] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.emit("getActiveUserForAdmin");

    socket.on("active-users", (users: ActiveUser[]) => {
      setActiveUsers(users);

      // ✅ if selected user logged out, close chat box
      const stillActive = users.find((u) => u.roomId === selectedUserId);
      if (!stillActive) {
        setSelectedUserId("");
        setSelectedUserName("");
      }
    });

    socket.on("typing", ({ userName }) => setActiveUserTyping(userName));
    socket.on("stop-typing", () => setActiveUserTyping(null));

    return () => {
      socket.off("active-users");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [selectedUserId]);

  return (
    <div className="flex flex-col items-start w-full min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          👥 Active Users
        </h1>

        {/* Active Users */}
        <div className="flex items-center gap-4 flex-wrap">
          {activeUsers.length > 0 ? (
            activeUsers
              .filter((u) => u.userName !== "Admin")
              .map((user) => (
                <div
                  key={user.roomId}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setSelectedUserId(user.roomId);
                    setSelectedUserName(user.userName);
                  }}
                >
                  <div className="relative w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {user.userName ? (
                      user.userName.charAt(0).toUpperCase()
                    ) : (
                      <User size={24} />
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate w-16 text-center">
                    {user.userName}
                  </span>
                </div>
              ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No active users</p>
          )}
        </div>
      </div>

      {/* Chat Box */}
      <div className="w-full">
        {selectedUserId ? (
          <AdminChat
            activeUserTyping={activeUserTyping}
            selectedUserId={selectedUserId}
            selectedUserName={selectedUserName}
          />
        ) : (
          <p className="text-2xl text-center">Select a user to chat 🗨️</p>
        )}
      </div>
    </div>
  );
}
