"use client";

import Modal from "./Modal";

export default function ApplicationViewModal({ isOpen, onClose, application }) {
  if (!application) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      case "Interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
    }
  };

  const getWorkTypeColor = (workType) => {
    if (!workType) return "";
    switch (workType) {
      case "Remote":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200";
      case "Hybrid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
      case "Onsite":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200";
      default:
        return "";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Details" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Company / Organization
            </label>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {application.company}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Position
            </label>
            <p className="text-sm text-gray-900 dark:text-white">{application.position}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Location
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {application.location || "-"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Work Type
            </label>
            {application.workType ? (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getWorkTypeColor(
                  application.workType
                )}`}
              >
                {application.workType}
              </span>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Application Date
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {application.applicationDate
                ? new Date(application.applicationDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Method / Source
            </label>
            <p className="text-sm text-gray-900 dark:text-white">{application.method}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Status
            </label>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                application.status
              )}`}
            >
              {application.status}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Interview Date
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {application.interviewDate
                ? new Date(application.interviewDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Link
            </label>
            {application.link ? (
              <a
                href={application.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline break-all"
              >
                {application.link}
              </a>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>

          {application.notes && (
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Notes
              </label>
              <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                {application.notes}
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

