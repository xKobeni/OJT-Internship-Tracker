"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";

export default function ApplicationModal({ isOpen, onClose, onAdd, editingApplication = null }) {
  const { success } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    workType: "",
    applicationDate: "",
    method: "Email",
    status: "Pending",
    interviewDate: "",
    link: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApplication) {
      setFormData(editingApplication);
    } else {
      setFormData({
        company: "",
        position: "",
        location: "",
        workType: "",
        applicationDate: "",
        method: "Email",
        status: "Pending",
        interviewDate: "",
        link: "",
        notes: "",
      });
    }
  }, [editingApplication, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = "Application date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const application = {
      id: editingApplication ? editingApplication.id : Date.now(),
      ...formData,
    };

    onAdd(application);
    success(
      editingApplication
        ? "Application updated successfully!"
        : "Application added successfully!"
    );
    onClose();
    
    // Reset form
    if (!editingApplication) {
      setFormData({
        company: "",
        position: "",
        location: "",
        workType: "",
        applicationDate: "",
        method: "Email",
        status: "Pending",
        interviewDate: "",
        link: "",
        notes: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingApplication ? "Edit Application" : "Add Internship Application"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company / Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition ${
                errors.company
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="e.g., Google, Microsoft"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition ${
                errors.position
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="e.g., Software Engineer Intern"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.position}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="e.g., New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Work Type
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">Select work type</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition ${
                errors.applicationDate
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.applicationDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.applicationDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Method / Source
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            >
              <option value="Email">Email</option>
              <option value="Portal">Company Portal</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="Jobstreet">Jobstreet</option>
              <option value="Prospel">Prospel</option>
              <option value="Backer">Backer</option>
              <option value="Glassdoor">Glassdoor</option>
              <option value="Monster">Monster</option>
              <option value="ZipRecruiter">ZipRecruiter</option>
              <option value="CareerBuilder">CareerBuilder</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Career Fair">Career Fair</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            >
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interview Date (Optional)
            </label>
            <input
              type="date"
              name="interviewDate"
              value={formData.interviewDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Link (Job Post / Company Website)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition resize-y"
              placeholder="Add any additional notes, reminders, or important information about this application..."
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use this field to add reminders, follow-up dates, or any other important information
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 btn-hover"
          >
            {editingApplication ? "✏️ Update" : "✨ Add"} Application
          </button>
        </div>
      </form>
    </Modal>
  );
}

