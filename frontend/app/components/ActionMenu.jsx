"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ActionMenu({ onView, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right,
        });
      }
    };

    if (isOpen && buttonRef.current) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      updatePosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleView = () => {
    onView();
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  const dropdownContent = isOpen && mounted && (
    <div
      ref={menuRef}
      className="fixed w-36 bg-white dark:bg-gray-800 shadow-2xl rounded-lg py-1 z-[9999] border border-gray-200 dark:border-gray-700 animate-fade-in"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
        position: "fixed",
      }}
    >
      {onView && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView();
          }}
          className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap"
        >
          <span>👁️</span>
          View
        </button>
      )}
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap"
        >
          <span>✏️</span>
          Edit
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
              className="w-full text-left px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap"
        >
          <span>🗑️</span>
          Delete
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Actions"
          aria-label="Actions menu"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      {mounted && document.body && createPortal(dropdownContent, document.body)}
    </>
  );
}

