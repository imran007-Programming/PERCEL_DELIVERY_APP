import { use, useEffect, useState } from "react";
import socket from "@/components/Hooks/socket";
import { User } from "lucide-react";
import AdminChat from "./AdminChat";

interface ActiveUser {
  _id?: string;
  userName: string;
  roomId: string;
  socketId?: string;

  lastSeen?: Date;
}

export default function AdminChatList() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [activeUserTyping, setActiveUserTyping] = useState(null);
  const hideTheChatbox=activeUsers.filter((user)=>user.userName!=="Admin")
 

  useEffect(() => {
    // Connect socket
    socket.connect();

    // Listen for active user updates from backend
    socket.on("active-users", (users: ActiveUser[]) => {
      setActiveUsers(users);
    });

    // Ask server for active users when admin opens chat
    socket.emit("getActiveUserForAdmin");
    socket.on("typing", ({ userName }) => {
      setActiveUserTyping(userName);
    });
    socket.on("stop-typing", () => {
      setActiveUserTyping(null);
    });

    return () => {
      socket.off("active-users");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, []);

  return (
    <div className="flex flex-col  items-start w-full min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          👥 Active Users
        </h1>

        {/* Active User Avatars Row */}
        <div className="flex items-center gap-4 flex-wrap">
          {activeUsers.length > 0 ? (
            activeUsers
              .filter((u) => u.userName !== "Admin")
              .map((user, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  {/* Avatar circle */}
                  <div
                    onClick={() => {
                      setSelectedUserId(user.roomId as string);
                      setSelectedUserName(user.userName as string);
                    }}
                    className="relative w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold shadow-md"
                  >
                    {user.userName ? (
                      user.userName.charAt(0).toUpperCase()
                    ) : (
                      <User size={24} />
                    )}
                    {/* Green dot for online status */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>

                  {/* Username */}
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

      {/* USer chat component */}
      <div className="w-full">
        { selectedUserId && hideTheChatbox.length>0 ?  (
          <AdminChat
            activeUserTyping={activeUserTyping}
            selectedUserId={selectedUserId}
            selectedUserName={selectedUserName}
          />
        ) : (
          <div>
            <p className="text-2xl text-center">Select a user to chat 🗨️</p>
          </div>
        )}
      </div>
    </div>
  );
}
