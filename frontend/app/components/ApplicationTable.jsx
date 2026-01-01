"use client";

import { useState, useMemo } from "react";
import ApplicationModal from "./ApplicationModal";
import ApplicationViewModal from "./ApplicationViewModal";
import ActionMenu from "./ActionMenu";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export default function ApplicationTable({ applications, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleView = (application) => {
    setViewingApplication(application);
    setIsViewModalOpen(true);
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingApplication(null);
  };

  const handleModalSubmit = (application) => {
    onEdit(application);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter, search, and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === null || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle dates
        if (sortConfig.key.includes("Date")) {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
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
  }, [applications, searchQuery, statusFilter, sortConfig]);

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

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Interview", label: "Interview" },
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
  ];

  if (applications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Internship Applications
          </h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span className="text-lg">+</span> Add Application
          </button>
        </div>
        <div className="text-center py-16 animate-fade-in">
          <div className="text-7xl mb-6 animate-pulse-slow">📝</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No applications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
            Start tracking your internship applications by adding your first one! Keep all your applications organized in one place.
          </p>
          <button
            onClick={handleAdd}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-500 ease-out font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-2 btn-hover"
          >
            ✨ Add Your First Application
          </button>
        </div>
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAdd={handleModalSubmit}
          editingApplication={editingApplication}
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
              Internship Applications
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {filteredApplications.length} of {applications.length} {applications.length === 1 ? "application" : "applications"}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-500 ease-out font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover text-sm sm:text-base"
            title="Press 'N' to add new application"
          >
            <span className="text-lg sm:text-xl font-bold">+</span> Add Application
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by company, position, or location..."
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

        {filteredApplications.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              No applications found
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
                        onClick={() => handleSort("company")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Company
                          {sortConfig.key === "company" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("position")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          Position
                          {sortConfig.key === "position" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                        Location
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Work Type
                      </th>
                      <th
                        onClick={() => handleSort("applicationDate")}
                        className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-1">
                          App Date
                          {sortConfig.key === "applicationDate" && (
                            <span className="text-gray-500 text-xs">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                        Method
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
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden xl:table-cell">
                        Interview
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                        Link
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden xl:table-cell">
                        Notes
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredApplications.map((app, index) => (
                      <tr
                        key={app.id}
                        className={`transition-all duration-300 ease-out ${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50/50 dark:bg-gray-800/50"
                        } hover:bg-blue-50/50 dark:hover:bg-gray-700/70 hover:shadow-sm`}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs font-semibold text-gray-900 dark:text-white">
                            {app.company}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                            {app.position}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap hidden md:table-cell">
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[120px]">
                            {app.location || <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {app.workType ? (
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                app.workType === "Remote"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                                  : app.workType === "Hybrid"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                                  : "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200"
                              }`}
                            >
                              {app.workType}
                            </span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-xs text-gray-700 dark:text-gray-300">
                            {app.applicationDate
                              ? new Date(app.applicationDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[100px]">
                            {app.method}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap hidden xl:table-cell">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {app.interviewDate
                              ? new Date(app.interviewDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "-"}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap hidden lg:table-cell">
                          {app.link ? (
                            <a
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              title="Open link"
                            >
                              🔗
                            </a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 hidden xl:table-cell">
                          <div className="text-xs text-gray-600 dark:text-gray-400 max-w-[120px]">
                            {app.notes ? (
                              <div
                                className="truncate cursor-help"
                                title={app.notes}
                              >
                                {app.notes}
                              </div>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap relative">
                          <ActionMenu
                            onView={() => handleView(app)}
                            onEdit={() => handleEdit(app)}
                            onDelete={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this application?"
                                )
                              ) {
                                onDelete(app.id);
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
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleModalSubmit}
        editingApplication={editingApplication}
      />
      <ApplicationViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingApplication(null);
        }}
        application={viewingApplication}
      />
    </>
  );
}
