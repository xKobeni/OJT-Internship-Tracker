"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer } from "../components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => showToast(message, "success", duration),
    [showToast]
  );
  const error = useCallback(
    (message, duration) => showToast(message, "error", duration),
    [showToast]
  );
  const info = useCallback(
    (message, duration) => showToast(message, "info", duration),
    [showToast]
  );
  const warning = useCallback(
    (message, duration) => showToast(message, "warning", duration),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ showToast, removeToast, success, error, info, warning }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

