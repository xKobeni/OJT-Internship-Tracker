"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [requiredHours, setRequiredHours] = useState(600);
  const [mounted, setMounted] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedApplications = localStorage.getItem("ojt-applications");
    const savedTimeLogs = localStorage.getItem("ojt-timeLogs");
    const savedRequiredHours = localStorage.getItem("ojt-requiredHours");

    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications));
      } catch (error) {
        console.error("Error loading applications:", error);
      }
    }

    if (savedTimeLogs) {
      try {
        setTimeLogs(JSON.parse(savedTimeLogs));
      } catch (error) {
        console.error("Error loading time logs:", error);
      }
    }

    if (savedRequiredHours) {
      try {
        const hours = parseInt(savedRequiredHours, 10);
        if (!isNaN(hours) && hours > 0) {
          setRequiredHours(hours);
        }
      } catch (error) {
        console.error("Error loading required hours:", error);
      }
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ojt-applications", JSON.stringify(applications));
    }
  }, [applications, mounted]);

  // Save time logs to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ojt-timeLogs", JSON.stringify(timeLogs));
    }
  }, [timeLogs, mounted]);

  // Save required hours to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ojt-requiredHours", requiredHours.toString());
    }
  }, [requiredHours, mounted]);

  const addApplication = (application) => {
    setApplications((prev) => [...prev, application]);
  };

  const editApplication = (editedApplication) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === editedApplication.id ? editedApplication : app
      )
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const addTimeLog = (timeLog) => {
    setTimeLogs((prev) => [...prev, timeLog]);
  };

  const editTimeLog = (editedTimeLog) => {
    setTimeLogs((prev) =>
      prev.map((log) => (log.id === editedTimeLog.id ? editedTimeLog : log))
    );
  };

  const deleteTimeLog = (id) => {
    setTimeLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const updateRequiredHours = (hours) => {
    const parsedHours = parseInt(hours, 10);
    if (!isNaN(parsedHours) && parsedHours > 0) {
      setRequiredHours(parsedHours);
    }
  };

  return (
    <DataContext.Provider
      value={{
        applications,
        timeLogs,
        requiredHours,
        mounted,
        addApplication,
        editApplication,
        deleteApplication,
        addTimeLog,
        editTimeLog,
        deleteTimeLog,
        updateRequiredHours,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

