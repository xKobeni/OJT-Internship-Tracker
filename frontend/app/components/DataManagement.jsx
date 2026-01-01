"use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import Modal from "./Modal";
import {
  exportApplicationsToExcel,
  exportTimeLogsToExcel,
  exportAllToExcel,
} from "../utils/exportToExcel";

export default function DataManagement() {
  const { applications, timeLogs } = useData();
  const { success, error: showError } = useToast();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importData, setImportData] = useState("");

  const exportToJSON = () => {
    const data = {
      applications,
      timeLogs,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ojt-tracker-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    success("Data exported to JSON successfully!");
    setIsExportModalOpen(false);
  };

  const exportToExcel = (type) => {
    try {
      switch (type) {
        case "applications":
          if (applications.length === 0) {
            showError("No applications to export");
            return;
          }
          exportApplicationsToExcel(applications);
          success("Applications exported to Excel successfully!");
          break;
        case "timeLogs":
          if (timeLogs.length === 0) {
            showError("No time logs to export");
            return;
          }
          exportTimeLogsToExcel(timeLogs);
          success("Time logs exported to Excel successfully!");
          break;
        case "all":
          if (applications.length === 0 && timeLogs.length === 0) {
            showError("No data to export");
            return;
          }
          exportAllToExcel(applications, timeLogs);
          success("All data exported to Excel successfully!");
          break;
      }
      setIsExportModalOpen(false);
    } catch (err) {
      showError("Error exporting to Excel: " + err.message);
      console.error("Export error:", err);
    }
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);

      if (!parsed.applications || !parsed.timeLogs) {
        showError("Invalid backup file format. Missing applications or timeLogs.");
        return;
      }

      // Validate data structure
      if (!Array.isArray(parsed.applications) || !Array.isArray(parsed.timeLogs)) {
        showError("Invalid data format. Applications and timeLogs must be arrays.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("ojt-applications", JSON.stringify(parsed.applications));
      localStorage.setItem("ojt-timeLogs", JSON.stringify(parsed.timeLogs));

      success("Data imported successfully! Refreshing page...");
      setIsImportModalOpen(false);
      setImportData("");

      // Reload page after a short delay to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      showError("Invalid JSON format. Please check your backup file.");
      console.error("Import error:", err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImportData(event.target.result);
    };
    reader.onerror = () => {
      showError("Error reading file");
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
          📊 Data Management
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
          Export your data to Excel/CSV or JSON format, or import from a backup file.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 ease-out font-semibold shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>📥</span> Export Data
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-500 ease-out font-semibold shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>📤</span> Import Data
          </button>
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export Data"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Choose your export format. Excel/CSV files can be opened in Microsoft Excel, Google Sheets, or any spreadsheet application.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Data Summary:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• {applications.length} application{applications.length !== 1 ? "s" : ""}</li>
              <li>• {timeLogs.length} time log{timeLogs.length !== 1 ? "s" : ""}</li>
            </ul>
          </div>

          {/* Excel Export Options */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📊 Export to Excel/CSV
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => exportToExcel("applications")}
                disabled={applications.length === 0}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-500 ease-out font-semibold shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                📝 Applications
              </button>
              <button
                onClick={() => exportToExcel("timeLogs")}
                disabled={timeLogs.length === 0}
                className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-500 ease-out font-semibold shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                ⏰ Time Logs
              </button>
              <button
                onClick={() => exportToExcel("all")}
                disabled={applications.length === 0 && timeLogs.length === 0}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 ease-out font-semibold shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                📊 All Data
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              CSV files can be opened in Excel, Google Sheets, or any spreadsheet app
            </p>
          </div>

          {/* JSON Export Option */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              💾 Export to JSON (Backup)
            </h4>
            <button
              onClick={exportToJSON}
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-500 ease-out font-semibold shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover"
            >
              📦 Download JSON Backup
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              JSON format for backup and restore purposes
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportData("");
        }}
        title="Import Data"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Upload a backup JSON file to restore your applications and time logs.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Backup File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or Paste JSON Data
            </label>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              rows="8"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder='{"applications": [...], "timeLogs": [...]}'
            />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Warning:</strong> Importing will replace all existing data. Make sure to export your current data first!
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsImportModalOpen(false);
                setImportData("");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import Data
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
