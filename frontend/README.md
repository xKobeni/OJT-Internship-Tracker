# 🎯 OJT Tracker - Internship & OJT Management System

A comprehensive, production-ready web application built with Next.js for tracking internship applications and daily OJT (On-the-Job Training) progress. Perfect for students managing their internship journey with a beautiful, modern UI and smooth user experience.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📝 Internship Application Tracker
- **Complete Application Management**: Track all your internship applications in one place
- **Rich Data Fields**: Company, position, location, application date, method/source, status, interview date, link, notes, and work type (Remote/Onsite/Hybrid)
- **Multiple Application Sources**: Support for LinkedIn, Indeed, Jobstreet, Prospel, Backer, Glassdoor, Monster, ZipRecruiter, CareerBuilder, Company Website, Referral, Career Fair, and more
- **Status Tracking**: Monitor applications through Pending → Interview → Accepted/Rejected pipeline
- **Advanced Filtering**: Filter by status, method, work type, and more
- **Search Functionality**: Quick search across all application fields
- **Sortable Columns**: Sort by date, company, status, and more
- **View/Edit/Delete**: Full CRUD operations with intuitive modals

### ⏰ OJT Daily Time Log Tracker
- **Daily Time Logging**: Record time in, time out, and tasks for each day
- **Automatic Hour Calculation**: Hours are automatically calculated from time in/out
- **Week Tracking**: Organize logs by week number
- **Task Management**: Track what you worked on each day
- **Status Management**: Mark tasks as Done or Not Done
- **Progress Monitoring**: Visual progress tracking toward required hours
- **Search & Filter**: Find specific logs quickly
- **Export Capabilities**: Export logs to Excel (CSV) format

### 📊 Dashboard & Analytics
- **Personalized Welcome**: Greeting with your name
- **Real-time Statistics**: 
  - Total applications submitted
  - Interviews scheduled
  - Total rendered hours
  - Progress percentage toward required hours (default: 600 hours)
- **Visual Progress Bar**: Beautiful progress visualization
- **Quick Actions**: Fast access to add applications and time logs
- **Quick Stats Cards**: At-a-glance overview of your internship journey

### 🎨 User Experience
- **First-Time User Onboarding**: Welcome modal with tutorial for new users
- **Smooth Animations**: Polished hover effects and transitions throughout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support**: Beautiful dark theme for comfortable viewing
- **Toast Notifications**: User-friendly feedback for all actions
- **Modal-Based Forms**: Clean, focused form experience
- **Action Menus**: 3-dots menu for View, Edit, and Delete actions
- **View Modals**: Read-only detailed view of applications and time logs

### 💾 Data Management
- **Automatic Persistence**: All data saved automatically to browser localStorage
- **Export Functionality**: 
  - Export to JSON (full backup)
  - Export to Excel/CSV (Applications, Time Logs, or All Data)
- **Import Functionality**: Restore from JSON backup files
- **Data Safety**: Never lose your progress with automatic saves

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ojt-Tracker/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── applications/          # Internship Applications page
│   │   └── page.js
│   ├── logs/                  # Time Logs page
│   │   └── page.js
│   ├── components/            # React components
│   │   ├── Dashboard.jsx      # Main dashboard with analytics
│   │   ├── ApplicationTable.jsx
│   │   ├── ApplicationModal.jsx
│   │   ├── ApplicationViewModal.jsx
│   │   ├── TimeLogTable.jsx
│   │   ├── TimeLogModal.jsx
│   │   ├── TimeLogViewModal.jsx
│   │   ├── Navigation.jsx
│   │   ├── Modal.jsx
│   │   ├── ActionMenu.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── DataManagement.jsx
│   │   ├── WelcomeModal.jsx
│   │   └── ...
│   ├── context/              # React Context providers
│   │   ├── DataContext.jsx    # Global state management
│   │   └── ToastContext.jsx   # Toast notifications
│   ├── hooks/                 # Custom React hooks
│   │   └── useToast.js
│   ├── utils/                 # Utility functions
│   │   ├── calculateHours.js
│   │   └── exportToExcel.js
│   ├── layout.js              # Root layout
│   ├── page.js                # Dashboard page
│   └── globals.css            # Global styles
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.0
- **State Management**: React Context API
- **Data Persistence**: Browser localStorage
- **Icons**: Emoji-based icons for lightweight design
- **Build Tool**: Next.js built-in bundler

## 🎯 Key Features Breakdown

### Application Tracker
- **Fields**: Company, Position, Location, Application Date, Method/Source, Status, Interview Date, Link, Notes, Work Type
- **Status Options**: Pending, Interview, Accepted, Rejected
- **Method Options**: Email, Portal, LinkedIn, Indeed, Jobstreet, Prospel, Backer, Glassdoor, Monster, ZipRecruiter, CareerBuilder, Company Website, Referral, Career Fair, Other
- **Work Type**: Remote, Onsite, Hybrid

### Time Log Tracker
- **Fields**: Date, Week Number, Time In, Time Out, Hours (auto-calculated), Task Description, Status
- **Status Options**: Done, Not Done
- **Automatic Calculations**: Hours computed from time in/out

### Dashboard
- **Required Hours**: Configurable (default: 600 hours)
- **Real-time Updates**: All statistics update automatically
- **Progress Visualization**: Percentage and progress bar
- **Quick Navigation**: Links to Applications and Time Logs pages

## 💾 Data Storage

All data is stored in browser **localStorage** and persists automatically. See [DATA_STORAGE_GUIDE.md](./DATA_STORAGE_GUIDE.md) for detailed information about:
- How data is stored
- When data is saved/loaded
- How to backup and restore data
- Data limitations and best practices

### Storage Keys
- `ojt-applications`: All internship applications
- `ojt-timeLogs`: All time log entries
- `ojt-user-name`: User's name for personalization
- `ojt-tutorial-completed`: Tutorial completion flag

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient accents
- **Smooth Animations**: Polished hover effects and transitions (500ms duration)
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Dark Mode**: Full dark mode support with automatic theme detection
- **Accessibility**: Keyboard navigation, focus states, and ARIA labels
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Loading States**: Smooth loading indicators

## 📱 Pages

1. **Dashboard** (`/`): Overview with statistics and quick actions
2. **Applications** (`/applications`): Full application management interface
3. **Time Logs** (`/logs`): Daily OJT time tracking interface

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Code Style

- Uses Next.js App Router architecture
- Client components marked with `"use client"` directive
- Functional components with React Hooks
- Tailwind CSS for styling
- No external UI libraries (vanilla React + Tailwind)

## 📦 Export/Import Features

### Export Options
1. **JSON Export**: Full backup of all data
2. **Excel Export (CSV)**:
   - Applications only
   - Time Logs only
   - All data combined

### Import Options
- Upload JSON backup file
- Paste JSON data directly
- Automatic validation and error handling

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

### Other Platforms

This Next.js app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Any Node.js hosting platform**

## 🎓 Learning Resources

This project demonstrates:
- Next.js App Router patterns
- React Context API for state management
- localStorage for client-side persistence
- Form handling and validation
- Modal patterns with React Portal
- Responsive design with Tailwind CSS
- Data export/import functionality
- Search and filter implementation
- Table sorting and pagination

## 📝 Notes

- **No Backend Required**: All data is stored client-side in localStorage
- **No Database**: Perfect for portfolio projects or personal use
- **No External Dependencies**: Uses only Next.js, React, and Tailwind CSS
- **Production Ready**: Clean code, error handling, and user feedback

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from emoji (no external icon library needed)

---

**Made with ❤️ for students tracking their internship journey**
