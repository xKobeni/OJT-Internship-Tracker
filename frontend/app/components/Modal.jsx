"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children, size = "md", hideCloseButton = false }) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, mounted, onClose]);

  // Focus management
  useEffect(() => {
    if (!mounted || !isOpen) return;

    previousActiveElement.current = document.activeElement;
    
    // Focus the modal when it opens
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    return () => {
      // Restore focus when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, mounted]);

  // Body scroll lock
  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      setIsAnimating(true);
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, mounted]);

  if (!mounted || !isOpen || typeof document === "undefined") return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Background overlay with blur */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel container */}
      <div className="relative z-10 flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6">
        <div
          ref={modalRef}
          className={`relative w-full mx-2 sm:mx-4 transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all duration-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
            isAnimating
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-4"
          } ${sizeClasses[size]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 flex items-center justify-between">
            <h3
              id="modal-title"
              className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-2"
            >
              {title}
            </h3>
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close modal"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Content with better spacing */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}
