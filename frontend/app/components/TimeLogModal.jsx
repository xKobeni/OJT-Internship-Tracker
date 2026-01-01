"use client";

import { useState, useEffect } from "react";
import { calculateHours } from "../utils/calculateHours";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";

export default function TimeLogModal({ isOpen, onClose, onAdd, editingTimeLog = null }) {
  const { success } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    week: 1,
    timeIn: "",
    timeOut: "",
    task: "",
    status: "Done",
  });

  useEffect(() => {
    if (editingTimeLog) {
      setFormData(editingTimeLog);
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        week: 1,
        timeIn: "",
        timeOut: "",
        task: "",
        status: "Done",
      });
    }
  }, [editingTimeLog, isOpen]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.timeIn) {
      newErrors.timeIn = "Time In is required";
    }
    if (!formData.timeOut) {
      newErrors.timeOut = "Time Out is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const hours = calculateHours(formData.timeIn, formData.timeOut);

    const timeLog = {
      id: editingTimeLog ? editingTimeLog.id : Date.now(),
      ...formData,
      hours: hours,
    };

    onAdd(timeLog);
    success(
      editingTimeLog
        ? "Time log updated successfully!"
        : "Time log added successfully!"
    );
    onClose();

    // Reset form if not editing
    if (!editingTimeLog) {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        week: 1,
        timeIn: "",
        timeOut: "",
        task: "",
        status: "Done",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Calculate hours preview
  const previewHours =
    formData.timeIn && formData.timeOut
      ? calculateHours(formData.timeIn, formData.timeOut)
      : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTimeLog ? "Edit Time Log" : "Add OJT Daily Log"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition ${
                errors.date
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Week Number
            </label>
            <input
              type="number"
              name="week"
              value={formData.week}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time In <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="timeIn"
              value={formData.timeIn}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition ${
                errors.timeIn
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.timeIn && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.timeIn}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Out <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="timeOut"
              value={formData.timeOut}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition ${
                errors.timeOut
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.timeOut && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.timeOut}
              </p>
            )}
          </div>

          {formData.timeIn && formData.timeOut && (
            <div className="md:col-span-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-medium">Calculated Hours:</span>{" "}
                  {previewHours} hours
                </p>
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task / Activity Description
            </label>
            <textarea
              name="task"
              value={formData.task}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="Describe what you worked on today..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition"
            >
              <option value="Done">Done</option>
              <option value="Not Done">Not Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover"
          >
            {editingTimeLog ? "✏️ Update" : "✨ Add"} Time Log
          </button>
        </div>
      </form>
    </Modal>
  );
}

