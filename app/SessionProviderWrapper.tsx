"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

function SocketManager() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session === null) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {});
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});
    };
  }, []);

  return null;
}

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SocketManager />
      {children}
    </SessionProvider>
  );
}
