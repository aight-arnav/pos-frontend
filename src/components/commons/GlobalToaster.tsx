"use client";

import { Toaster } from "react-hot-toast";

export function GlobalToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#111827",
          color: "#F9FAFB",
          borderRadius: "8px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#16A34A", // green
            secondary: "#ECFDF5",
          },
        },
        error: {
          iconTheme: {
            primary: "#DC2626", // red
            secondary: "#FEF2F2",
          },
        },
      }}
    />
  );
}