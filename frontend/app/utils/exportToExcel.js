/**
 * Convert array of objects to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header objects with key and label
 * @returns {string} - CSV string
 */
export function convertToCSV(data, headers) {
  if (!data || data.length === 0) {
    return "";
  }

  // Create header row
  const headerRow = headers.map((h) => h.label).join(",");

  // Create data rows
  const dataRows = data.map((item) => {
    return headers
      .map((header) => {
        let value = item[header.key] || "";
        
        // Format dates for Excel (YYYY-MM-DD format)
        if (header.key.includes("Date") && value) {
          try {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              value = date.toISOString().split("T")[0];
            }
          } catch (e) {
            // Keep original value if date parsing fails
          }
        }
        
        // Format numbers
        if (typeof value === "number") {
          value = value.toString();
        }
        
        // Escape commas and quotes in values
        if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
}

/**
 * Download CSV file
 * @param {string} csvContent - CSV string content
 * @param {string} filename - Name of the file
 */
export function downloadCSV(csvContent, filename) {
  // Add BOM for Excel UTF-8 support
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export applications to Excel/CSV
 * @param {Array} applications - Array of application objects
 */
export function exportApplicationsToExcel(applications) {
  const headers = [
    { key: "company", label: "Company" },
    { key: "position", label: "Position" },
    { key: "location", label: "Location" },
    { key: "workType", label: "Work Type" },
    { key: "applicationDate", label: "Application Date" },
    { key: "method", label: "Method" },
    { key: "status", label: "Status" },
    { key: "interviewDate", label: "Interview Date" },
    { key: "link", label: "Link" },
    { key: "notes", label: "Notes" },
  ];

  const csvContent = convertToCSV(applications, headers);
  const filename = `OJT-Applications-${new Date().toISOString().split("T")[0]}.csv`;
  downloadCSV(csvContent, filename);
}

/**
 * Export time logs to Excel/CSV
 * @param {Array} timeLogs - Array of time log objects
 */
export function exportTimeLogsToExcel(timeLogs) {
  const headers = [
    { key: "date", label: "Date" },
    { key: "week", label: "Week" },
    { key: "timeIn", label: "Time In" },
    { key: "timeOut", label: "Time Out" },
    { key: "hours", label: "Hours" },
    { key: "task", label: "Task / Activity" },
    { key: "status", label: "Status" },
  ];

  // Format hours to 2 decimal places
  const formattedLogs = timeLogs.map((log) => ({
    ...log,
    hours: log.hours ? parseFloat(log.hours).toFixed(2) : "0.00",
  }));

  const csvContent = convertToCSV(formattedLogs, headers);
  const filename = `OJT-TimeLogs-${new Date().toISOString().split("T")[0]}.csv`;
  downloadCSV(csvContent, filename);
}

/**
 * Export all data to Excel/CSV (combined)
 * @param {Array} applications - Array of application objects
 * @param {Array} timeLogs - Array of time log objects
 */
export function exportAllToExcel(applications, timeLogs) {
  // Create a combined CSV with both sheets as separate sections
  let csvContent = "=== INTERNSHIP APPLICATIONS ===\n\n";
  
  const appHeaders = [
    { key: "company", label: "Company" },
    { key: "position", label: "Position" },
    { key: "location", label: "Location" },
    { key: "workType", label: "Work Type" },
    { key: "applicationDate", label: "Application Date" },
    { key: "method", label: "Method" },
    { key: "status", label: "Status" },
    { key: "interviewDate", label: "Interview Date" },
    { key: "link", label: "Link" },
    { key: "notes", label: "Notes" },
  ];
  
  csvContent += convertToCSV(applications, appHeaders);
  csvContent += "\n\n=== OJT TIME LOGS ===\n\n";
  
  const logHeaders = [
    { key: "date", label: "Date" },
    { key: "week", label: "Week" },
    { key: "timeIn", label: "Time In" },
    { key: "timeOut", label: "Time Out" },
    { key: "hours", label: "Hours" },
    { key: "task", label: "Task / Activity" },
    { key: "status", label: "Status" },
  ];
  
  const formattedLogs = timeLogs.map((log) => ({
    ...log,
    hours: log.hours ? parseFloat(log.hours).toFixed(2) : "0.00",
  }));
  
  csvContent += convertToCSV(formattedLogs, logHeaders);
  
  const filename = `OJT-Tracker-Complete-${new Date().toISOString().split("T")[0]}.csv`;
  downloadCSV(csvContent, filename);
}

