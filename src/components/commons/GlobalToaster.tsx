"use client";

import { Toaster } from "react-hot-toast";

export function GlobalToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#FFFFFF",
          color: "#111827",
          borderRadius: "12px",
          fontSize: "15px",
          padding: "16px 20px",
          minWidth: "360px",
          maxWidth: "480px",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
          border: "1px solid #E5E7EB",
        },
        success: {
          iconTheme: {
            primary: "#16A34A",
            secondary: "#ECFDF5",
          },
        },
        error: {
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
          },
        },
      }}
    />
  );
}