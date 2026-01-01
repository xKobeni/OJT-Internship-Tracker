"use client";

import { useState, useMemo } from "react";
import TimeLogModal from "./TimeLogModal";
import TimeLogViewModal from "./TimeLogViewModal";
import ActionMenu from "./ActionMenu";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export default function TimeLogTable({ timeLogs, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTimeLog, setEditingTimeLog] = useState(null);
  const [viewingTimeLog, setViewingTimeLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const handleView = (timeLog) => {
    setViewingTimeLog(timeLog);
    setIsViewModalOpen(true);
  };

  const handleEdit = (timeLog) => {
    setEditingTimeLog(timeLog);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTimeLog(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTimeLog(null);
  };

  const handleModalSubmit = (timeLog) => {
    onEdit(timeLog);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    return status === "Done"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
  };

  // Filter, search, and sort time logs
  const filteredTimeLogs = useMemo(() => {
    let filtered = timeLogs.filter((log) => {
      const matchesSearch =
        searchQuery === "" ||
        (log.task && log.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
        log.date.includes(searchQuery);
      
      const matchesStatus = statusFilter === null || log.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle dates
        if (sortConfig.key === "date") {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        }

        // Handle numbers
        if (sortConfig.key === "hours" || sortConfig.key === "week") {
          aValue = aValue || 0;
          bValue = bValue || 0;
        }

        // Handle strings
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = (bValue || "").toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [timeLogs, searchQuery, statusFilter, sortConfig]);

  const statusOptions = [
    { value: "Done", label: "Done" },
    { value: "Not Done", label: "Not Done" },
  ];

  if (timeLogs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            OJT Daily Logs
          </h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span className="text-lg">+</span> Add Time Log
          </button>
        </div>
        <div className="text-center py-16 animate-fade-in">
          <div className="text-7xl mb-6 animate-pulse-slow">⏰</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No time logs yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
            Start tracking your OJT hours by adding your first daily log! Monitor your progress towards your required hours.
          </p>
          <button
            onClick={handleAdd}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-500 ease-out font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-2 btn-hover"
          >
            ✨ Add Your First Time Log
          </button>
        </div>
        <TimeLogModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAdd={handleModalSubmit}
          editingTimeLog={editingTimeLog}
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              OJT Daily Logs
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {filteredTimeLogs.length} of {timeLogs.length} {timeLogs.length === 1 ? "log" : "logs"}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-500 ease-out font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl font-bold">+</span> Add Time Log
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by task or date..."
            />
          </div>
          <div className="w-full sm:w-48">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              allLabel="All Statuses"
            />
          </div>
        </div>

        {filteredTimeLogs.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              No time logs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            {(searchQuery || statusFilter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter(null);
                }}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-all shadow-md hover:shadow-lg"
              >
                🔄 Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th
                        onClick={() => handleSort("date")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortConfig.key === "date" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("week")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Week
                          {sortConfig.key === "week" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        In
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Out
                      </th>
                      <th
                        onClick={() => handleSort("hours")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Hours
                          {sortConfig.key === "hours" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Task
                      </th>
                      <th
                        onClick={() => handleSort("status")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Status
                          {sortConfig.key === "status" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTimeLogs.map((log, index) => (
                      <tr
                        key={log.id}
                        className={`transition-all duration-300 ease-out ${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50/50 dark:bg-gray-800/50"
                        } hover:bg-green-50/50 dark:hover:bg-gray-700/70 hover:shadow-sm`}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs font-semibold text-gray-900 dark:text-white">
                            {log.date
                              ? new Date(log.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs text-gray-700 dark:text-gray-300">
                            <span className="font-medium">W{log.week}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
                            {log.timeIn || <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
                            {log.timeOut || <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            {log.hours?.toFixed(2) || "0.00"}h
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="text-xs text-gray-700 dark:text-gray-300 max-w-[200px]">
                            {log.task ? (
                              <p
                                className="truncate cursor-help"
                                title={log.task}
                              >
                                {log.task}
                              </p>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(
                              log.status
                            )}`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap relative">
                          <ActionMenu
                            onView={() => handleView(log)}
                            onEdit={() => handleEdit(log)}
                            onDelete={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this time log?"
                                )
                              ) {
                                onDelete(log.id);
                              }
                            }}
                          />
                        </td>
                  </tr>
                ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <TimeLogModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleModalSubmit}
        editingTimeLog={editingTimeLog}
      />
      <TimeLogViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingTimeLog(null);
        }}
        timeLog={viewingTimeLog}
      />
    </>
  );
}
