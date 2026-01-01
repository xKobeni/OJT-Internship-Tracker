"use client";

import { useState } from "react";
import { calculateHours } from "../utils/calculateHours";

export default function TimeLogForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    week: 1,
    timeIn: "",
    timeOut: "",
    task: "",
    status: "Done",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.timeIn || !formData.timeOut) {
      alert("Please fill in required fields: Date, Time In, and Time Out");
      return;
    }

    const hours = calculateHours(formData.timeIn, formData.timeOut);

    const newTimeLog = {
      id: Date.now(),
      ...formData,
      hours: hours,
    };

    onAdd(newTimeLog);

    // Reset form (keep date and week)
    setFormData((prev) => ({
      ...prev,
      timeIn: "",
      timeOut: "",
      task: "",
      status: "Done",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate hours preview
  const previewHours =
    formData.timeIn && formData.timeOut
      ? calculateHours(formData.timeIn, formData.timeOut)
      : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Add OJT Daily Log
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Week Number
            </label>
            <input
              type="number"
              name="week"
              value={formData.week}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time In <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="timeIn"
              value={formData.timeIn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Out <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="timeOut"
              value={formData.timeOut}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task / Activity Description
            </label>
            <textarea
              name="task"
              value={formData.task}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe what you worked on today..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Done">Done</option>
              <option value="Not Done">Not Done</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
        >
          Add Time Log
        </button>
      </form>
    </div>
  );
}

