# OJT Tracker Store

This directory contains the Zustand store for managing application state.

## Installation

First, install Zustand:

```bash
npm install zustand
```

## Store Structure

### `useOJTStore.js`
Main store containing:
- **State**: applications, timeLogs, requiredHours, mounted
- **Actions**: CRUD operations for applications and time logs
- **Computed Values**: total hours, progress, counts
- **Persistence**: Automatically saves to localStorage

### `index.js`
Convenience exports and selectors for easier usage.

## Usage

### Basic Usage

```javascript
import { useOJTStore } from "../stores";

// Get state
const applications = useOJTStore((state) => state.applications);
const timeLogs = useOJTStore((state) => state.timeLogs);

// Get actions
const addApplication = useOJTStore((state) => state.addApplication);
const deleteTimeLog = useOJTStore((state) => state.deleteTimeLog);
```

### Using Convenience Hooks

```javascript
import { 
  useApplications, 
  useTimeLogs, 
  useApplicationActions,
  useOJTStats 
} from "../stores";

// Get data
const applications = useApplications();
const timeLogs = useTimeLogs();

// Get actions
const { addApplication, editApplication } = useApplicationActions();

// Get computed stats
const { totalRenderedHours, progress, applicationsCount } = useOJTStats();
```

## Store Features

- ✅ Automatic localStorage persistence
- ✅ Type-safe state management
- ✅ Computed selectors for stats
- ✅ Bulk operations (clear all, export/import)
- ✅ Optimized re-renders (only components using changed state re-render)

## Migration from Context API

The store replaces the previous Context API implementation. All pages have been updated to use the store instead of `useData()` hook.

