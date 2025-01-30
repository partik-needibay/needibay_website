"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
function Providers({ children }: Props) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered"))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
