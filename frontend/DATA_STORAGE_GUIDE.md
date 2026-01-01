# Data Storage Guide - OJT Tracker

## 📦 How Your Data is Stored

Your OJT Tracker application uses **localStorage** to store all your data directly in your web browser. This means your data is saved locally on your device and persists between sessions.

## 🔄 Automatic Data Persistence

### When Data is Saved
Your data is **automatically saved** whenever you:
- ✅ Add a new application
- ✅ Edit an application
- ✅ Delete an application
- ✅ Add a new time log
- ✅ Edit a time log
- ✅ Delete a time log

**No manual save is needed!** The app saves automatically in the background.

### When Data is Loaded
Your data is **automatically loaded** when you:
- ✅ Open the application
- ✅ Refresh the page
- ✅ Navigate between pages

## 📍 Storage Location

### Browser localStorage
Your data is stored in your browser's localStorage with these keys:
- `ojt-applications` - All your internship applications
- `ojt-timeLogs` - All your OJT time logs

### How to View Your Stored Data

1. **Open Browser Developer Tools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)

2. **Go to Application/Storage Tab:**
   - Click on "Application" tab (Chrome/Edge)
   - Click on "Storage" tab (Firefox)
   - Expand "Local Storage"
   - Click on your website URL

3. **View Your Data:**
   - You'll see `ojt-applications` and `ojt-timeLogs`
   - Click on them to see the JSON data

## 💾 Data Backup & Restore

### Export Your Data (Recommended)
1. Go to the Dashboard page
2. Scroll down to "Data Management" section
3. Click "📥 Export Data"
4. A JSON file will be downloaded to your computer
5. **Keep this file safe!** It contains all your data.

### Import Your Data
1. Go to the Dashboard page
2. Click "📤 Import Data"
3. Either:
   - Upload your backup JSON file, OR
   - Paste the JSON data directly
4. Click "Import Data"
5. Refresh the page to see your restored data

## ⚠️ Important Notes

### Data Persistence
- ✅ **Data persists** when you close the browser
- ✅ **Data persists** when you refresh the page
- ✅ **Data persists** when you navigate between pages
- ✅ **Data is saved automatically** - no manual save needed

### Data Limitations
- ⚠️ **Browser-specific**: Data is stored per browser
  - Chrome data ≠ Firefox data
  - Different browsers = different storage
  
- ⚠️ **Device-specific**: Data is stored per device
  - Desktop data ≠ Mobile data
  - Different devices = different storage

- ⚠️ **Private/Incognito Mode**: Data may be cleared when you close the window

- ⚠️ **Clearing Browser Data**: If you clear browser data/cache, your data will be lost

### Storage Limits
- localStorage typically has a **5-10MB limit** per domain
- For most users, this is more than enough
- If you exceed the limit, you'll see an error

## 🛡️ How to Protect Your Data

### 1. Regular Backups
- **Export your data weekly** or after important updates
- Store backup files in a safe place (cloud storage, external drive)

### 2. Multiple Browsers
- If you use multiple browsers, export/import to sync data

### 3. Before Clearing Browser Data
- **Always export your data first** before clearing browser cache/cookies

### 4. Browser Updates
- Data usually persists through browser updates
- But it's good practice to have a backup

## 🔍 Verifying Your Data is Saved

### Method 1: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Type: `localStorage.getItem('ojt-applications')`
4. You should see your applications data

### Method 2: Check Application Tab
1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Check Local Storage
4. You should see `ojt-applications` and `ojt-timeLogs`

### Method 3: Test It
1. Add a new application or time log
2. Refresh the page
3. Your data should still be there!

## 📊 Data Format

Your data is stored as JSON (JavaScript Object Notation):

```json
{
  "applications": [
    {
      "id": 1234567890,
      "company": "Google",
      "position": "Software Engineer Intern",
      "location": "Remote",
      "applicationDate": "2024-01-15",
      "method": "Email",
      "status": "Pending",
      "interviewDate": "",
      "link": "https://..."
    }
  ],
  "timeLogs": [
    {
      "id": 1234567891,
      "date": "2024-01-15",
      "week": 1,
      "timeIn": "09:00",
      "timeOut": "17:00",
      "hours": 8.0,
      "task": "Worked on project",
      "status": "Done"
    }
  ]
}
```

## 🚀 Best Practices

1. **Export regularly** - Weekly or monthly backups
2. **Store backups safely** - Cloud storage (Google Drive, Dropbox, etc.)
3. **Name backups clearly** - Include date in filename
4. **Test your backups** - Occasionally import to verify they work
5. **Don't rely on one browser** - Export if switching browsers

## ❓ Troubleshooting

### Data Not Saving?
- Check browser console for errors
- Ensure localStorage is enabled
- Check if you're in private/incognito mode
- Verify browser storage isn't full

### Data Lost?
- Check if you cleared browser data
- Check if you're using a different browser
- Check if you're using a different device
- Restore from your latest backup file

### Can't Import?
- Verify the JSON file is valid
- Check file format matches export format
- Ensure file isn't corrupted
- Try pasting JSON directly instead of uploading file

## 📝 Summary

✅ **Your data is automatically saved** to browser localStorage  
✅ **Data persists** between sessions  
✅ **Export regularly** for backup  
✅ **Import** to restore from backup  
✅ **Data is browser/device specific** - use export/import to sync

Your data is safe as long as you:
- Don't clear browser data
- Export backups regularly
- Keep backup files in a safe place

