import React, { useEffect, useState } from "react";

interface DelayedSuspenseProps {
  delay?: number; // milliseconds
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const DelayedSuspense = ({ delay = 1500, fallback, children }: DelayedSuspenseProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <>{showContent ? children : fallback}</>;
};
