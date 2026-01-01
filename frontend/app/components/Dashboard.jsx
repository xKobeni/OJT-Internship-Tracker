"use client";

import { useEffect, useState } from "react";
import { calculateTotalHours, calculateProgress } from "../utils/calculateHours";
import Link from "next/link";

export default function Dashboard({ applications, timeLogs, requiredHours = 600, userName = "", onUpdateRequiredHours }) {
  const [mounted, setMounted] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [editHoursValue, setEditHoursValue] = useState(requiredHours.toString());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setEditHoursValue(requiredHours.toString());
  }, [requiredHours]);

  const handleSaveHours = () => {
    const hours = parseInt(editHoursValue, 10);
    if (!isNaN(hours) && hours > 0 && onUpdateRequiredHours) {
      onUpdateRequiredHours(hours);
      setIsEditingHours(false);
    }
  };

  const handleCancelEdit = () => {
    setEditHoursValue(requiredHours.toString());
    setIsEditingHours(false);
  };

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  const totalRenderedHours = calculateTotalHours(timeLogs);
  const progress = calculateProgress(totalRenderedHours, requiredHours);
  const applicationsCount = applications.length;
  const interviewsCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const statCards = [
    {
      label: "Required Hours",
      value: isEditingHours ? (
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            value={editHoursValue}
            onChange={(e) => setEditHoursValue(e.target.value)}
            className="w-24 sm:w-28 px-3 py-2 text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-100 border-2 border-blue-400 dark:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 shadow-sm"
            min="1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveHours();
              } else if (e.key === "Escape") {
                handleCancelEdit();
              }
            }}
          />
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSaveHours}
              className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
              title="Save (Enter)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
              title="Cancel (Esc)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline">Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 group">
          <span>{requiredHours}</span>
          {onUpdateRequiredHours && (
            <button
              onClick={() => setIsEditingHours(true)}
              className="ml-1 p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              title="Edit required hours"
              aria-label="Edit required hours"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>
      ),
      icon: "🎯",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      darkBg: "dark:from-blue-900/30 dark:to-blue-800/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      valueText: "text-blue-900 dark:text-blue-100",
    },
    {
      label: "Rendered Hours",
      value: totalRenderedHours.toFixed(2),
      icon: "✅",
      color: "green",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      darkBg: "dark:from-green-900/30 dark:to-green-800/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-300",
      valueText: "text-green-900 dark:text-green-100",
    },
    {
      label: "Applications",
      value: applicationsCount,
      icon: "📝",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      darkBg: "dark:from-purple-900/30 dark:to-purple-800/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-300",
      valueText: "text-purple-900 dark:text-purple-100",
    },
    {
      label: "Interviews",
      value: interviewsCount,
      icon: "💼",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      darkBg: "dark:from-orange-900/30 dark:to-orange-800/20",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-700 dark:text-orange-300",
      valueText: "text-orange-900 dark:text-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.bgGradient} ${stat.darkBg} rounded-xl p-6 border ${stat.border} shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 animate-fade-in card-hover`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-semibold ${stat.text} uppercase tracking-wide`}>
                {stat.label}
              </h3>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6`}>
                {stat.icon}
              </div>
            </div>
            <div className={`text-4xl font-bold ${stat.valueText} mb-1`}>
              {stat.value}
            </div>
            {stat.label === "Rendered Hours" && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {((totalRenderedHours / requiredHours) * 100).toFixed(1)}% of target
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
              {userName ? `${userName}'s OJT Progress` : "OJT Progress"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Track your journey to completion
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {progress.toFixed(1)}%
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete</p>
          </div>
        </div>
        
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-10 shadow-inner overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4 ${
              progress > 0 ? "animate-scale-in" : ""
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {progress > 10 && (
              <span className="text-sm font-bold text-white drop-shadow-lg">
                {progress.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 gap-4 sm:gap-0">
          <div className="text-center flex-1 w-full sm:w-auto">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {totalRenderedHours.toFixed(2)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Hours Completed</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center flex-1 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-2 group">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {requiredHours}
              </p>
              {onUpdateRequiredHours && !isEditingHours && (
                <button
                  onClick={() => setIsEditingHours(true)}
                  className="p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  title="Edit required hours"
                  aria-label="Edit required hours"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Required Hours</p>
            {isEditingHours && (
              <div className="flex flex-col items-center justify-center gap-2 mt-3">
                <input
                  type="number"
                  value={editHoursValue}
                  onChange={(e) => setEditHoursValue(e.target.value)}
                  className="w-28 px-3 py-2 text-base font-bold text-gray-900 dark:text-white border-2 border-blue-400 dark:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 shadow-sm"
                  min="1"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveHours();
                    } else if (e.key === "Escape") {
                      handleCancelEdit();
                    }
                  }}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveHours}
                    className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-xs font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                    title="Save (Enter)"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-xs font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                    title="Cancel (Esc)"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center flex-1 w-full sm:w-auto">
            <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
              {(requiredHours - totalRenderedHours).toFixed(2)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
          </div>
        </div>
      </div>

      {/* Application Status Summary */}
      {applicationsCount > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Application Status
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingCount}</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Pending</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{interviewsCount}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Interviews</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{acceptedCount}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Accepted</p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {applicationsCount - pendingCount - interviewsCount - acceptedCount}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Rejected</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {acceptedCount > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-xl animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🎉</div>
            <div>
              <h4 className="text-xl font-bold mb-1">Congratulations!</h4>
              <p className="text-green-50">
                You have {acceptedCount} accepted {acceptedCount === 1 ? "application" : "applications"}! 
                Keep up the great work! 🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/applications"
          className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-blue-400 dark:hover:border-blue-600 card-hover"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                  📝
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Applications
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                {applicationsCount} {applicationsCount === 1 ? "application" : "applications"} tracked
              </p>
            </div>
            <div className="text-2xl sm:text-3xl text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110">
              →
            </div>
          </div>
        </Link>

        <Link
          href="/logs"
          className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:border-green-400 dark:hover:border-green-600 card-hover"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                  ⏰
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Time Logs
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                {timeLogs.length} {timeLogs.length === 1 ? "log" : "logs"} recorded
              </p>
            </div>
            <div className="text-2xl sm:text-3xl text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110">
              →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
