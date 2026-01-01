"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function WelcomeModal({ isOpen, onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent closing modal with ESC or clicking outside
  useEffect(() => {
    if (isOpen && mounted) {
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      document.addEventListener("keydown", handleEscape, true);
      return () => document.removeEventListener("keydown", handleEscape, true);
    }
  }, [isOpen, mounted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    // Save name to localStorage
    localStorage.setItem("ojt-user-name", name.trim());
    localStorage.setItem("ojt-tutorial-completed", "false");
    
    // Move to tutorial
    setStep(2);
  };

  const handleTutorialComplete = () => {
    localStorage.setItem("ojt-tutorial-completed", "true");
    onComplete(name.trim());
  };

  const handleSkipTutorial = () => {
    localStorage.setItem("ojt-tutorial-completed", "true");
    onComplete(name.trim());
  };

  if (!mounted) return null;

  if (step === 1) {
    return (
      <Modal isOpen={isOpen} onClose={() => {}} title="Welcome to OJT Tracker! 👋" size="md" hideCloseButton={true}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-600 dark:text-gray-400">
              Let's get started by setting up your profile!
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What's your name? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition ${
                error
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Enter your name"
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-xl"
            >
              Continue →
            </button>
          </div>
        </form>
      </Modal>
    );
  }

  // Tutorial Step
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Quick Tutorial 📚" size="lg" hideCloseButton={true}>
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            👋 Welcome, {name}!
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Let's take a quick tour of your OJT Tracker!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Track Applications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to <strong>Applications</strong> to add and manage your internship applications. Track company, position, status, work type, and more!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl">
              ⏰
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Log Your Hours
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visit <strong>Time Logs</strong> to record your daily OJT hours. The system automatically calculates your total rendered hours!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Monitor Progress
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check your <strong>Dashboard</strong> to see your progress, application statistics, and hours rendered vs. required.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-2xl">
              💾
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Export Your Data
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export your data to Excel (CSV) or JSON format anytime from the Dashboard. Your data is saved automatically!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-2xl">
              ⋮
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Actions Menu
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the <strong>3-dots menu (⋮)</strong> in any table row to view details, edit, or delete entries.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> All your data is stored locally in your browser. No account needed! Your progress is automatically saved.
          </p>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSkipTutorial}
            className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1"
          >
            Skip Tutorial
          </button>
          <button
            onClick={handleTutorialComplete}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover"
          >
            Get Started! 🚀
          </button>
        </div>
      </div>
    </Modal>
  );
}
