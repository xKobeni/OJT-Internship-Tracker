"use client";

import Modal from "./Modal";

export default function TimeLogViewModal({ isOpen, onClose, timeLog }) {
  if (!timeLog) return null;

  const getStatusColor = (status) => {
    return status === "Done"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Time Log Details" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Date
            </label>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {timeLog.date
                ? new Date(timeLog.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Week
            </label>
            <p className="text-sm text-gray-900 dark:text-white">Week {timeLog.week}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Time In
            </label>
            <p className="text-sm font-mono text-gray-900 dark:text-white">
              {timeLog.timeIn || "-"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Time Out
            </label>
            <p className="text-sm font-mono text-gray-900 dark:text-white">
              {timeLog.timeOut || "-"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Hours Rendered
            </label>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {timeLog.hours?.toFixed(2) || "0.00"} hours
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Status
            </label>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                timeLog.status
              )}`}
            >
              {timeLog.status}
            </span>
          </div>

          {timeLog.task && (
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Task / Activity
              </label>
              <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                {timeLog.task}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all shadow-sm hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

