"use client";

import { useState, useEffect } from "react";
import { useData } from "./context/DataContext";
import Dashboard from "./components/Dashboard";
import DataManagement from "./components/DataManagement";
import WelcomeModal from "./components/WelcomeModal";

export default function Home() {
  const { applications, timeLogs, requiredHours, updateRequiredHours, mounted } = useData();
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (mounted) {
      // Check if user has completed onboarding
      const savedName = localStorage.getItem("ojt-user-name");
      const tutorialCompleted = localStorage.getItem("ojt-tutorial-completed");
      
      if (!savedName || tutorialCompleted !== "true") {
        setShowWelcome(true);
      } else {
        setUserName(savedName);
      }
    }
  }, [mounted]);

  const handleWelcomeComplete = (name) => {
    setUserName(name);
    setShowWelcome(false);
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

        {/* Dashboard */}
        <Dashboard
          applications={applications}
          timeLogs={timeLogs}
          requiredHours={requiredHours}
          userName={userName}
          onUpdateRequiredHours={updateRequiredHours}
        />

        {/* Data Management */}
        <div className="mt-8">
          <DataManagement />
        </div>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal isOpen={showWelcome} onComplete={handleWelcomeComplete} />
    </div>
  );
}
