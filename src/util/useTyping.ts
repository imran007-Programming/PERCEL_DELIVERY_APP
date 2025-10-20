import socket from "@/components/Hooks/socket";
import { useRef } from "react";


export function useTyping(roomId: string, userName: string) {
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Called whenever the user/admin types a key
  const handleTyping = () => {
    if (!isTypingRef.current) {
      socket.emit("typing", { roomId, userName });
      isTypingRef.current = true;
    }

    // reset timer for “stop typing”
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { roomId, userName });
      isTypingRef.current = false;
    }, 500); 
  };

  // ✅ Force “stop typing” after longer idle period (safety)
  const handleStopTyping = () => {
    if (userTypingTimeoutRef.current)
      clearTimeout(userTypingTimeoutRef.current);

    userTypingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { roomId, userName });
      isTypingRef.current = false;
    }, 2000);
  };

  return { handleTyping, handleStopTyping };
}
