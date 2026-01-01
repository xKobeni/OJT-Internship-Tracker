# 🎯 OJT Tracker

A comprehensive, production-ready web application for tracking internship applications and daily OJT (On-the-Job Training) progress. Built with Next.js, React, and Tailwind CSS.

## 📋 Overview

OJT Tracker is a full-featured application designed to help students manage their internship journey. It provides tools to track internship applications, log daily OJT hours, monitor progress, and export data for reporting.

## ✨ Key Features

- 📝 **Internship Application Tracker** - Manage all your internship applications with detailed information
- ⏰ **Daily Time Log Tracker** - Record and track your OJT hours automatically
- 📊 **Dashboard & Analytics** - Visual progress tracking and statistics
- 💾 **Data Export/Import** - Backup and restore your data (JSON & Excel/CSV)
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 🚀 **Production Ready** - Clean code, error handling, and smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ojt-Tracker/
├── frontend/                 # Next.js application
│   ├── app/                  # App Router pages and components
│   ├── public/               # Static assets
│   ├── package.json
│   └── README.md             # Detailed frontend documentation
└── README.md                 # This file
```

## 🛠️ Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **localStorage** - Client-side data persistence

## 📖 Documentation

For detailed documentation, see:
- **[Frontend README](./frontend/README.md)** - Complete feature documentation
- **[Data Storage Guide](./frontend/DATA_STORAGE_GUIDE.md)** - How data is stored and managed

## 🎯 Features

### Internship Application Tracker
- Track company, position, location, dates
- Multiple application sources (LinkedIn, Indeed, Jobstreet, etc.)
- Status management (Pending, Interview, Accepted, Rejected)
- Work type tracking (Remote, Onsite, Hybrid)
- Notes and interview date tracking
- Search, filter, and sort capabilities

### OJT Time Log Tracker
- Daily time in/out logging
- Automatic hour calculation
- Week-based organization
- Task description tracking
- Status management (Done/Not Done)

### Dashboard
- Real-time statistics
- Progress visualization
- Personalized welcome message
- Quick action buttons

### Data Management
- Automatic localStorage persistence
- JSON export/import
- Excel (CSV) export
- Data backup and restore

## 🎨 UI/UX Features

- Smooth hover animations
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Toast notifications
- Modal-based forms
- First-time user onboarding
- Search and filter functionality

## 📱 Pages

- **Dashboard** (`/`) - Overview and analytics
- **Applications** (`/applications`) - Application management
- **Time Logs** (`/logs`) - Time tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## 📝 Development

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## 💡 Learning Points

This project demonstrates:
- Next.js App Router patterns
- React Context API for state management
- Client-side data persistence
- Form handling and validation
- Modal patterns with React Portal
- Responsive design
- Data export/import
- Search and filter implementation

## 📄 License

Open source for educational purposes.

---

**Built with ❤️ for students tracking their internship journey**

For detailed documentation, see [frontend/README.md](./frontend/README.md)

