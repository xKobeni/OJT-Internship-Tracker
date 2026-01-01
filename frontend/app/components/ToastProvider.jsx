"use client";

import { useToast } from "../hooks/useToast";
import { ToastContainer } from "./Toast";

export default function ToastProvider({ children }) {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

