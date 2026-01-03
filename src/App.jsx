import React, { useState } from 'react';
import { 
  Terminal, ShieldCheck, Database, Layout, Smartphone, Zap, 
  FileText, Code, GitCommit, ChevronDown, ChevronUp, Globe,
  Server, Lock, Search, Users, Activity, Cpu, HardDrive,
  Clock, Hash, FileCode, AlertCircle, CheckCircle2, MessageSquare, Bell
} from 'lucide-react';

// --- Data Configuration ---

const globalStats = [
  { label: "Total Builds", value: "40", icon: <GitCommit size={16} />, color: "text-blue-400" },
  { label: "Major Versions", value: "7", icon: <Hash size={16} />, color: "text-purple-400" },
  { label: "Files Managed", value: "16", icon: <FileCode size={16} />, color: "text-emerald-400" },
  { label: "Uptime", value: "100%", icon: <Activity size={16} />, color: "text-rose-400" },
];

const changelogData = [
  {
    majorVersion: "4.0",
    releaseName: "Command & Communication Center",
    date: "Jan 03, 2026",
    time: "08:15 IST",
    description: "Establishment of a unified internal messaging hub with real-time chat, role-based channels, and advanced notification systems.",
    stats: [
      { label: "Channels", value: "3", desc: "Global/Team/Priv" },
      { label: "Latency", value: "Realtime", desc: "Firestore Listeners" },
      { label: "Storage", value: "24h TTL", desc: "Auto-Cleanup" }
    ],
    highlightColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    subVersions: [
      {
        version: "4.5.0",
        title: "Final Polish & Fixes",
        type: "UX",
        severity: "Enhancement",
        icon: <CheckCircle2 size={16} />,
        changes: [
          { tag: "Fix", desc: "Swipe Sensitivity", detail: "Added >50px threshold to prevent accidental reply triggers." },
          { tag: "UX", desc: "Quote Navigation", detail: "Clicking a quote scrolls to original message with pulse effect." },
          { tag: "Refactor", desc: "Audio Assets", detail: "Updated notification sound path to /chime.mp3." }
        ]
      },
      {
        version: "4.4.0",
        title: "Channel List Architecture",
        type: "Feature",
        severity: "Major",
        icon: <Layout size={16} />,
        changes: [
          { tag: "UI", desc: "Split View Inbox", detail: "Separated Channel List and Active Chat windows." },
          { tag: "Logic", desc: "Data Bucketing", detail: "Messages sorted in memory to generate inbox previews." },
          { tag: "Auth", desc: "Admin Directory", detail: "Auto-fetches all usernames for Admin contact book." },
          { tag: "Security", desc: "Strict Filtering", detail: "Ensures Global/Private cross-talk prevention." }
        ]
      },
      {
        version: "4.3.0",
        title: "Advanced Interactions",
        type: "Feature",
        severity: "Major",
        icon: <Smartphone size={16} />,
        changes: [
          { tag: "UX", desc: "Swipe-to-Reply", detail: "Touch gestures added for mobile reply quoting." },
          { tag: "UI", desc: "Context Menu", detail: "Custom Right-click/Long-press menu (Reply/Copy/Edit/Delete)." },
          { tag: "Database", desc: "Message Editing", detail: "UpdateDoc support with 'isEdited' flag tracking." }
        ]
      },
      {
        version: "4.2.0",
        title: "Notification Center",
        type: "UI",
        severity: "Enhancement",
        icon: <Bell size={16} />,
        changes: [
          { tag: "UI", desc: "Alert Dropdown", detail: "Bell icon toggles glass-panel dropdown instead of drawer." },
          { tag: "UX", desc: "State Management", detail: "Separated Chat vs Notification open states." },
          { tag: "Logic", desc: "Badge Clearing", detail: "Opening dropdown clears red unread count." }
        ]
      },
      {
        version: "4.1.0",
        title: "UI Refinements & Grouping",
        type: "UI",
        severity: "Enhancement",
        icon: <Users size={16} />,
        changes: [
          { tag: "UI", desc: "Stacked Dropdown", detail: "Added <optgroup> to visually group users by Team." },
          { tag: "Logic", desc: "Instant Audio", detail: "Detached sound logic from UI state for immediate chime." }
        ]
      },
      {
        version: "4.0.0",
        title: "Core Infrastructure",
        type: "Database",
        severity: "Critical",
        icon: <MessageSquare size={16} />,
        changes: [
          { tag: "Database", desc: "Communications", detail: "Created Firestore collection with Channel logic." },
          { tag: "Feature", desc: "Chat Drawer", detail: "Added side-drawer UI with Global/Team/Private routing." },
          { tag: "Logic", desc: "Auto-Cleanup", detail: "Script deletes messages >24h old on send." }
        ]
      }
    ]
  },
  {
    majorVersion: "3.0",
    releaseName: "Enterprise Tiers & Data Integrity",
    date: "Dec 31, 2025",
    time: "21:36 IST",
    description: "Final polish introducing tiered ticketing (VIP/Gold), robust data import/export cycles, and persistent session management.",
    stats: [
      { label: "Tiers", value: "3", desc: "Classic/VIP/Gold" },
      { label: "Formats", value: "4", desc: "CSV/XLSX/TXT/JSON" },
      { label: "Safety", value: "100%", desc: "Atomic Deletion" }
    ],
    highlightColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    subVersions: [
      {
        version: "3.3.1",
        title: "The Final Polish",
        type: "UX",
        severity: "Enhancement",
        icon: <CheckCircle2 size={16} />,
        changes: [
          { tag: "UX", desc: "Deletion Progress Bar", detail: "Added visual progress bar for batch deletions." },
          { tag: "Logic", desc: "Excel Date Parsing", detail: "Fixed date parsing for Excel serial numbers." }
        ]
      },
      {
        version: "3.3.0",
        title: "File Compatibility Core",
        type: "Codebase",
        severity: "Major",
        icon: <FileCode size={16} />,
        changes: [
          { tag: "Fix", desc: "MIME Type Support", detail: "Added support for .csv and .txt file picking." },
          { tag: "Algorithm", desc: "Regex Parser", detail: "Auto-detects delimiters (comma, pipe, tab)." },
          { tag: "Feature", desc: "Safe Stop", detail: "Added Stop button to halt batch deletions safely." }
        ]
      },
      {
        version: "3.2.2",
        title: "Layout & Import Logic",
        type: "UI",
        severity: "Enhancement",
        icon: <Layout size={16} />,
        changes: [
          { tag: "UI", desc: "Responsive Header", detail: "Flexbox fix for Guest List buttons on mobile." },
          { tag: "Logic", desc: "Import Status", detail: "Preserves 'Arrived' status during import." },
          { tag: "UX", desc: "Button Order", detail: "Reordered to [Import] [Delete] [Select]." }
        ]
      },
      {
        version: "3.2.1",
        title: "Data Integrity Patch",
        type: "Fix",
        severity: "Critical",
        icon: <Database size={16} />,
        changes: [
          { tag: "Logic", desc: "Time Preservation", detail: "Ensured Arrival Time is kept during Export/Import." },
          { tag: "Fix", desc: "Button Alignment", detail: "Fixed misalignment in Guest List header." }
        ]
      },
      {
        version: "3.2.0",
        title: "Persistence & Bulk Tools",
        type: "Feature",
        severity: "Major",
        icon: <HardDrive size={16} />,
        changes: [
          { tag: "UX", desc: "Persistent Lock", detail: "Lock popup now persists on page refresh." },
          { tag: "Auth", desc: "Session Restore", detail: "Staff username persists across reloads." },
          { tag: "Feature", desc: "Bulk Import", detail: "Added CSV/XLSX import with duplicate checks." },
          { tag: "Logic", desc: "Data Normalization", detail: "Exports show 'VIP' instead of 'Diamond'." }
        ]
      },
      {
        version: "3.1.0",
        title: "Tier Refinement",
        type: "UI",
        severity: "Enhancement",
        icon: <Code size={16} />,
        changes: [
          { tag: "Refactor", desc: "Theme Renaming", detail: "Renamed internal values VIP->Diamond, VVIP->Gold." },
          { tag: "Database", desc: "Ticket Type Column", detail: "Added 'Type' column to Guest List and Exports." },
          { tag: "UI", desc: "Header Standardization", detail: "Standardized headers to 'ENTRY PASS - VVIP'." }
        ]
      },
      {
        version: "3.0.0",
        title: "Tiers & Notifications",
        type: "Feature",
        severity: "Major",
        icon: <Zap size={16} />,
        changes: [
          { tag: "Feature", desc: "Ticket Tiers", detail: "Added Classic, VIP (Silver), and VVIP (Gold) themes." },
          { tag: "UX", desc: "Lock Reasons", detail: "Added Maintenance/Suspension reasons for locks." },
          { tag: "UI", desc: "Enter Key Support", detail: "Added global Enter key handler for forms." }
        ]
      }
    ]
  },
  {
    majorVersion: "2.5",
    releaseName: "AI Intelligence & Scanner UX",
    date: "Dec 31, 2025",
    time: "21:15 IST",
    description: "Integration of Gemini AI for insights, advanced activity logging, and scanner hardware optimizations.",
    stats: [
      { label: "AI Models", value: "Gemini", desc: "Status Reports" },
      { label: "Scan Buffer", value: "4s", desc: "Anti-Double" },
      { label: "Easter Egg", value: "1", desc: "Music Trigger" }
    ],
    highlightColor: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    subVersions: [
      {
        version: "2.8.1",
        title: "Admin UI Cleanup",
        type: "UI",
        severity: "Enhancement",
        icon: <Users size={16} />,
        changes: [
          { tag: "UI", desc: "User Cards", detail: "Simplified cards to show 'Count Active' only." },
          { tag: "UX", desc: "Online Indicators", detail: "Added Green Dot to user selection chips." },
          { tag: "Logic", desc: "Auto-Sort", detail: "Online users sorted to top of list." }
        ]
      },
      {
        version: "2.8.0",
        title: "Scanner UX Upgrade",
        type: "Performance",
        severity: "Major",
        icon: <Smartphone size={16} />,
        changes: [
          { tag: "Hardware", desc: "Extended Cooldown", detail: "Increased scanner lock to 4s." },
          { tag: "UI", desc: "Result Animation", detail: "Added 'Hold and Fade' effect for results." },
          { tag: "Feedback", desc: "Color Coding", detail: "Green (Success), Orange (Dup), Red (Invalid)." }
        ]
      },
      {
        version: "2.7.2",
        title: "The Easter Egg",
        type: "UI",
        severity: "Enhancement",
        icon: <Activity size={16} />,
        changes: [
          { tag: "Feature", desc: "Music Trigger", detail: "Added audio trigger to Export Data badge." },
          { tag: "UI", desc: "Dance Animation", detail: "Added CSS wiggle animation on click." },
          { tag: "Logic", desc: "State Toggle", detail: "Toggles between Green and Rainbow states." }
        ]
      },
      {
        version: "2.7.1",
        title: "Visual Differentiation",
        type: "UI",
        severity: "Enhancement",
        icon: <Layout size={16} />,
        changes: [
          { tag: "UI", desc: "Rainbow Badge", detail: "Added gradient badge for EXPORT_DATA." },
          { tag: "UI", desc: "Wavy Text", detail: "Prepared CSS for wavy text animation." },
          { tag: "Logic", desc: "Filter Expansion", detail: "Added TICKET_DELETE, FACTORY_RESET to filters." }
        ]
      },
      {
        version: "2.7.0",
        title: "AI Integration",
        type: "Feature",
        severity: "Major",
        icon: <Cpu size={16} />,
        changes: [
          { tag: "Feature", desc: "Gemini AI", detail: "Integrated AI for Status Reports & Drafting." },
          { tag: "Feature", desc: "Batch Logs", detail: "Added Select & Delete tools for Activity Logs." },
          { tag: "Codebase", desc: "History Access", detail: "Removed fetch limits for full log history." }
        ]
      },
      {
        version: "2.6.1",
        title: "Enhanced Logging",
        type: "Security",
        severity: "Major",
        icon: <FileText size={16} />,
        changes: [
          { tag: "Data", desc: "Granular Logs", detail: "Logs now record specific usernames." },
          { tag: "UI", desc: "Danger Badges", detail: "Red styling for Delete/Reset actions." },
          { tag: "Security", desc: "Settings Lock", detail: "Restricted Event Settings to Admin only." }
        ]
      }
    ]
  },
  {
    majorVersion: "2.0",
    releaseName: "Command Center Architecture",
    date: "Dec 31, 2025",
    time: "21:05 IST",
    description: "Transformation into a multi-user system with remote device locking, shared database, and activity auditing.",
    stats: [
      { label: "Heartbeat", value: "Realtime", desc: "Presence" },
      { label: "Lock Scope", value: "User", desc: "Granular" },
      { label: "DB Type", value: "Shared", desc: "Global Sync" }
    ],
    highlightColor: "text-rose-400",
    borderColor: "border-rose-500/20",
    subVersions: [
      {
        version: "2.6.0",
        title: "Granular Access Control",
        type: "Security",
        severity: "Major",
        icon: <ShieldCheck size={16} />,
        changes: [
          { tag: "Security", desc: "Username Locking", detail: "Lock specific users sharing an email." },
          { tag: "Feature", desc: "Activity Logs", detail: "Added audit system for logins/scans." },
          { tag: "UI", desc: "Log Badges", detail: "Color-coded badges for log types." }
        ]
      },
      {
        version: "2.5.1",
        title: "Gatekeeper & Network",
        type: "Auth",
        severity: "Major",
        icon: <Globe size={16} />,
        changes: [
          { tag: "Auth", desc: "Username Gatekeeper", detail: "Secondary login for staff identification." },
          { tag: "Network", desc: "Offline Dot", detail: "Red indicator on network loss." },
          { tag: "Tool", desc: "Bulk Create", detail: "Script for mass staff user creation." }
        ]
      },
      {
        version: "2.5.0",
        title: "Shared Database Migration",
        type: "Database",
        severity: "Critical",
        icon: <Database size={16} />,
        changes: [
          { tag: "Migration", desc: "Global Schema", detail: "Moved to 'shared_event_db' for sync." },
          { tag: "Security", desc: "Factory Reset", detail: "Added database-backed wipe function." },
          { tag: "Automation", desc: "Auto-Absent", detail: "Increased sync to 30s for global reliability." }
        ]
      },
      {
        version: "2.0.3",
        title: "Dashboard Refinement",
        type: "Fix",
        severity: "Enhancement",
        icon: <Layout size={16} />,
        changes: [
          { tag: "Fix", desc: "Loading Bug", detail: "Fixed infinite loading on user list." },
          { tag: "UI", desc: "Email Layout", detail: "Fixed long emails breaking layout." },
          { tag: "UX", desc: "Password Toggle", detail: "Added eye icon for Admin password." }
        ]
      },
      {
        version: "2.0.2",
        title: "Security Rules & Heartbeat",
        type: "Security",
        severity: "Major",
        icon: <Lock size={16} />,
        changes: [
          { tag: "Database", desc: "Rule Update", detail: "Allowed Admin to read staff presence." },
          { tag: "Performance", desc: "Realtime Listeners", detail: "Switched presence to onSnapshot." },
          { tag: "UX", desc: "Selection Fix", detail: "Fixed lag in Admin selection." }
        ]
      },
      {
        version: "2.0.1",
        title: "Remote Device Control",
        type: "Security",
        severity: "Critical",
        icon: <Server size={16} />,
        changes: [
          { tag: "Security", desc: "Remote Locking", detail: "Admins can lock tabs remotely." },
          { tag: "Logic", desc: "Lock Listeners", detail: "Devices listen for lock commands." },
          { tag: "UI", desc: "Lock Banner", detail: "Added 'System Locked' overlay." }
        ]
      },
      {
        version: "2.0.0",
        title: "Admin Dashboard",
        type: "Feature",
        severity: "Major",
        icon: <Users size={16} />,
        changes: [
          { tag: "Feature", desc: "Admin Panel", detail: "Dedicated dashboard for Admins." },
          { tag: "Logic", desc: "Heartbeat", detail: "Real-time staff presence tracking." },
          { tag: "UI", desc: "User Roster", detail: "Cards showing device counts/status." }
        ]
      }
    ]
  },
  {
    majorVersion: "1.5",
    releaseName: "Feature Expansion",
    date: "Dec 31, 2025",
    time: "20:50 IST",
    description: "Introduction of biometrics, advanced filtering, focus modes, and modular code structure.",
    stats: [
      { label: "Biometric", value: "WebAuthn", desc: "Fingerprint" },
      { label: "Modules", value: "ES6", desc: "Structure" },
      { label: "Filters", value: "Adv", desc: "Gender/Serial" }
    ],
    highlightColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    subVersions: [
      {
        version: "1.7.0",
        title: "UX & Data Precision",
        type: "Feature",
        severity: "Enhancement",
        icon: <Search size={16} />,
        changes: [
          { tag: "Feature", desc: "Dynamic S.No", detail: "Serial numbers recalculate on filter." },
          { tag: "UX", desc: "Selection Mode", detail: "Checkboxes hidden until needed." },
          { tag: "Data", desc: "Timestamps", detail: "Added exact arrival time display." }
        ]
      },
      {
        version: "1.6.0",
        title: "Help Tray & Focus Mode",
        type: "UI",
        severity: "Enhancement",
        icon: <Layout size={16} />,
        changes: [
          { tag: "UI", desc: "Help Tray", detail: "Added contact tray with Focus Mode." },
          { tag: "UX", desc: "Focus Blur", detail: "Background blurs when tray is open." },
          { tag: "UI", desc: "Tooltips", detail: "Standardized tooltip direction." }
        ]
      },
      {
        version: "1.5.1",
        title: "Global Security Enhancements",
        type: "Security",
        severity: "Major",
        icon: <Lock size={16} />,
        changes: [
          { tag: "Security", desc: "Global Password", detail: "Single Admin password for all." },
          { tag: "Feature", desc: "Session Timeout", detail: "Auto-lock after 15m inactivity." },
          { tag: "UI", desc: "View Modal", detail: "Preview tickets without leaving tab." }
        ]
      },
      {
        version: "1.5.0",
        title: "Security Architecture",
        type: "Security",
        severity: "Critical",
        icon: <ShieldCheck size={16} />,
        changes: [
          { tag: "Security", desc: "Master Password", detail: "Moved password to Firestore." },
          { tag: "Logic", desc: "Device Locking", detail: "LocalStorage based device locking." },
          { tag: "UX", desc: "Nav Interceptor", detail: "Blocks access to restricted tabs." }
        ]
      },
      {
        version: "1.4.0",
        title: "Biometrics & Filters",
        type: "Feature",
        severity: "Major",
        icon: <Smartphone size={16} />,
        changes: [
          { tag: "Feature", desc: "Biometrics", detail: "Fingerprint/FaceID Login support." },
          { tag: "Feature", desc: "Gender Filter", detail: "Added Gender filtering/sorting." },
          { tag: "Hardware", desc: "Continuous Scan", detail: "Added 1.5s buffer for scanning." }
        ]
      },
      {
        version: "1.3.0",
        title: "State Persistence",
        type: "Codebase",
        severity: "Enhancement",
        icon: <Code size={16} />,
        changes: [
          { tag: "Codebase", desc: "Modularization", detail: "Split into html/css/js modules." },
          { tag: "Logic", desc: "Checkbox Memory", detail: "Selection persists during refresh." },
          { tag: "UX", desc: "Refresh Spin", detail: "Added custom spin animation." }
        ]
      }
    ]
  },
  {
    majorVersion: "1.2",
    releaseName: "Real-Time Sync Engine",
    date: "Dec 31, 2025",
    time: "20:40 IST",
    description: "Implementation of hybrid synchronization using active polling and WebSocket listeners.",
    stats: [
      { label: "Latency", value: "<250ms", desc: "Debounced" },
      { label: "Interval", value: "15s", desc: "Active Poll" },
      { label: "Feedback", value: "Visual", desc: "Spin/Flash" }
    ],
    highlightColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    subVersions: [
      {
        version: "1.2.5",
        title: "Hybrid Sync System",
        type: "Performance",
        severity: "Critical",
        icon: <Activity size={16} />,
        changes: [
          { tag: "Performance", desc: "Hybrid Sync", detail: "Combined onSnapshot with Polling." },
          { tag: "UI", desc: "Sync Badge", detail: "Added 'SYNCING...' indicator." },
          { tag: "Fix", desc: "Reliability", detail: "Guarantees sync if sockets stall." }
        ]
      },
      {
        version: "1.2.4",
        title: "Sync Reliability Patch",
        type: "Fix",
        severity: "Major",
        icon: <Zap size={16} />,
        changes: [
          { tag: "Codebase", desc: "getDocs Import", detail: "Enable active data pulling." },
          { tag: "Logic", desc: "Force Sync", detail: "Wipe and repopulate local list." },
          { tag: "Refactor", desc: "Timer Logic", detail: "Updated timer to use Force Sync." }
        ]
      },
      {
        version: "1.2.3",
        title: "Multi-Device Optimization",
        type: "Performance",
        severity: "Enhancement",
        icon: <Server size={16} />,
        changes: [
          { tag: "Performance", desc: "Debouncing", detail: "250ms delay for burst updates." },
          { tag: "Database", desc: "Conditional Write", detail: "Reduced database costs." },
          { tag: "UI", desc: "Green Flash", detail: "Highlighted new ticket rows." }
        ]
      },
      {
        version: "1.2.2",
        title: "Animated Feedback",
        type: "UX",
        severity: "Enhancement",
        icon: <Activity size={16} />,
        changes: [
          { tag: "Codebase", desc: "Auto-Rotate", detail: "Coupled animation with data fetch." },
          { tag: "UX", desc: "Pulse Effect", detail: "Icon spins every 15s automatically." },
          { tag: "Database", desc: "Deadline Check", detail: "Integrated deadline check in loop." }
        ]
      },
      {
        version: "1.2.1",
        title: "Manual Sync Logic",
        type: "Codebase",
        severity: "Enhancement",
        icon: <Zap size={16} />,
        changes: [
          { tag: "Codebase", desc: "Manual Trigger", detail: "Button click triggers AutoAbsent." },
          { tag: "Feedback", desc: "Instant Update", detail: "Reflects Absent status immediately." },
          { tag: "UX", desc: "Toast", detail: "Added notification for updates." }
        ]
      },
      {
        version: "1.2.0",
        title: "The Sync Update",
        type: "UI",
        severity: "Enhancement",
        icon: <Clock size={16} />,
        changes: [
          { tag: "UI", desc: "Refresh Button", detail: "Added circular refresh action." },
          { tag: "UX", desc: "Spin Animation", detail: "Added fa-spin class." },
          { tag: "Database", desc: "Interval", detail: "Reduced check to 15s." }
        ]
      }
    ]
  },
  {
    majorVersion: "1.0",
    releaseName: "Foundation",
    date: "Dec 31, 2025",
    time: "18:22 IST",
    description: "Migration to cloud backend, PWA implementation, and the signature 'Midnight Glass' aesthetic.",
    stats: [
      { label: "Storage", value: "Cloud", desc: "Firestore" },
      { label: "Theme", value: "Dark", desc: "Midnight Glass" },
      { label: "Export", value: "PDF/XLS", desc: "SheetJS" }
    ],
    highlightColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    subVersions: [
      {
        version: "1.1.0",
        title: "Visuals & Export Expansion",
        type: "UI",
        severity: "Major",
        icon: <Layout size={16} />,
        changes: [
          { tag: "UI", desc: "Starry Night", detail: "Dynamic background with parallax." },
          { tag: "Feature", desc: "Adv. Export", detail: "SheetJS/jsPDF integration." },
          { tag: "Platform", desc: "PWA", detail: "Manifest & Service Worker." }
        ]
      },
      {
        version: "1.0.0",
        title: "The Cloud Foundation",
        type: "Database",
        severity: "Critical",
        icon: <Database size={16} />,
        changes: [
          { tag: "Database", desc: "Firestore", detail: "Replaced localStorage with Cloud." },
          { tag: "Auth", desc: "Login System", detail: "Email/Password authentication." },
          { tag: "Automation", desc: "Auto-Absent", detail: "60s deadline check logic." }
        ]
      }
    ]
  }
];

// --- Components ---

const Badge = ({ type }) => {
  const styles = {
    Codebase: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    Algorithm: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    Fix: "bg-red-500/10 text-red-400 border-red-500/20",
    Logic: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    UI: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    UX: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Feature: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Database: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Security: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Auth: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Schema: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Migration: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Performance: "bg-lime-500/10 text-lime-400 border-lime-500/20",
    Hardware: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Cache: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Refactor: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    Platform: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    Network: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Feedback: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    Data: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    Tool: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  const defaultStyle = "bg-slate-800 text-slate-300 border-slate-700";

  return (
    <span className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded border ${styles[type] || defaultStyle}`}>
      {type}
    </span>
  );
};

const MetricCard = ({ label, value, icon, color }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition-colors">
    <div className={`p-2.5 rounded-lg bg-slate-950 border border-slate-800 ${color}`}>
      {icon}
    </div>
    <div>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  </div>
);

const ImpactStat = ({ label, value, desc }) => (
  <div className="flex flex-col">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-lg font-mono font-bold text-slate-200">{value}</span>
    <span className="text-[10px] text-slate-600 uppercase tracking-wide">{desc}</span>
  </div>
);

const SubVersionBlock = ({ sub, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative pl-6 sm:pl-8 ${!isLast ? 'pb-8' : ''}`}>
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[19px] top-8 bottom-0 w-px bg-slate-800/50 border-l border-dashed border-slate-700"></div>
      )}
      
      {/* Node Dot */}
      <div className="absolute left-0 sm:left-2 top-2 w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/20">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md bg-slate-950 border border-slate-800 text-slate-400`}>
              {sub.icon}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs font-bold text-indigo-400">v{sub.version}</span>
                <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-800 px-1.5 rounded">{sub.type}</span>
                {sub.severity === 'Critical' && (
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-500/10 px-1.5 rounded flex items-center gap-1">
                    <AlertCircle size={10} /> Critical
                  </span>
                )}
              </div>
              <h4 className="text-slate-200 font-medium text-sm">{sub.title}</h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-slate-600">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </button>
        
        {isOpen && (
          <div className="px-4 pb-4 pt-0">
            <div className="space-y-3 pl-2 sm:pl-[3.25rem] border-t border-slate-800/50 pt-3">
              {sub.changes.map((change, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-baseline gap-2 mb-1">
                    <Badge type={change.tag} />
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-indigo-300 transition-colors">
                      {change.desc}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pl-1 border-l-2 border-slate-800 group-hover:border-slate-600 ml-1 transition-colors leading-relaxed">
                    <span className="pl-2 block">{change.detail}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MajorVersionCard = ({ data, isLatest }) => (
  <div className="relative mb-12 sm:mb-20">
    {/* Version Header Card */}
    <div className={`relative z-20 bg-slate-950 border ${isLatest ? 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-800'} rounded-2xl p-6 sm:p-8 mb-6 overflow-hidden`}>
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-${data.highlightColor.split('-')[1]}-500/5 opacity-50`}></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
        
        {/* Left: Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className={`text-4xl font-bold font-mono tracking-tighter ${data.highlightColor}`}>
              v{data.majorVersion}
            </h2>
            {isLatest && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full uppercase tracking-wider">
                <CheckCircle2 size={12} />
                Latest Stable
              </span>
            )}
            <span className="px-2.5 py-1 bg-slate-900 text-slate-500 border border-slate-800 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
               <Clock size={12} />
               {data.time}
            </span>
          </div>
          
          <h3 className="text-xl text-white font-semibold mb-2">{data.releaseName}</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            {data.description}
          </p>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 lg:border-l lg:border-slate-800 lg:pl-12">
           {data.stats.map((stat, i) => (
             <ImpactStat key={i} {...stat} />
           ))}
        </div>
      </div>
    </div>

    {/* Sub Versions Timeline */}
    <div className="pl-4 sm:pl-8 border-l border-slate-800/50 ml-6 sm:ml-10 space-y-2">
      {data.subVersions.map((sub, idx) => (
        <SubVersionBlock key={idx} sub={sub} isLast={idx === data.subVersions.length - 1} />
      ))}
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header / Global Stats */}
      <div className="border-b border-slate-900 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
               <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
                 <Terminal size={20} className="text-indigo-400" />
               </div>
               <div>
                 <h1 className="text-white font-bold tracking-tight">System Changelog</h1>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Event Ticketing System</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6 sm:gap-12 text-xs font-mono text-slate-500">
               <div className="flex items-center gap-2">
                 <Globe size={14} />
                 <span className="text-emerald-400">Production</span>
               </div>
               <div className="flex items-center gap-2">
                 <HardDrive size={14} />
                 <span>v4.5.0</span>
               </div>
               <div className="flex items-center gap-2">
                 <Cpu size={14} />
                 <span>React + Firestore</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Global Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {globalStats.map((stat, idx) => (
            <MetricCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-[39px] sm:left-[59px] top-0 bottom-0 w-px bg-slate-900"></div>

          <div className="space-y-4">
            {changelogData.map((version, idx) => (
              <MajorVersionCard key={idx} data={version} isLatest={idx === 0} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-900 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-slate-700">
            <Hash size={16} />
            <span className="font-mono text-sm tracking-widest uppercase">End of Log</span>
          </div>
          <p className="text-slate-600 text-xs">
            Generated by Gemini AI • Deployment ID: 8f3a-2b1c • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
