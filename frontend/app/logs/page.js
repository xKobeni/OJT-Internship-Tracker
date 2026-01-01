"use client";

import { useData } from "../context/DataContext";
import TimeLogTable from "../components/TimeLogTable";

export default function LogsPage() {
  const { timeLogs, mounted, addTimeLog, editTimeLog, deleteTimeLog } =
    useData();

  const handleModalSubmit = (timeLog) => {
    if (timeLog.id && timeLogs.find((log) => log.id === timeLog.id)) {
      editTimeLog(timeLog);
    } else {
      addTimeLog(timeLog);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
              ⏰
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                OJT Daily Logs
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
                Track your daily OJT hours and activities
              </p>
            </div>
          </div>
        </header>

        <TimeLogTable
          timeLogs={timeLogs}
          onEdit={handleModalSubmit}
          onDelete={deleteTimeLog}
        />
      </div>
    </div>
  );
}
