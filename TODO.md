# Chore Tracker - Feature Roadmap

## Core Enhancements

### 1. Full Screen Layout ✅
- [x] Maximize app viewport for better mobile experience
- [x] Remove unnecessary margins/padding on small screens
- [x] Optimize for 100vh/100vw display

### 2. Google Sign-In Integration (Optional)
- [ ] Install and configure Firebase Authentication
- [ ] Add Google OAuth sign-in button
- [ ] Store user sessions in localStorage
- [ ] Link calendar sync to Google account (optional feature)

### 3. Calendar View
- [ ] Display monthly calendar widget
- [ ] Show chore completion history on calendar dates
- [ ] Color-code calendar entries by person (Joe/Zoe)
- [ ] Click on date to view completed chores that day
- [ ] Optional: Sync calendar events to Google Calendar when signed in

### 4. Skip Turn Feature
- [ ] Add "Skip Turn" button on each chore
- [ ] When skipped, person stays on that chore for next rotation
- [ ] Track skip events in localStorage

### 5. Completion Tracking & Stats
- [ ] Display completion counter per person per chore
- [ ] Show cumulative stats (e.g., "Joe: 24 completions total")
- [ ] Add stats dashboard showing:
  - Times each person completed each chore
  - Average completions per person
  - Skip frequency per person
- [ ] Export stats as CSV (optional)

## Technical Tasks

### Frontend
- [ ] Update App.jsx state to include:
  - Completion counts: `{ choreId: { Joe: 5, Zoe: 3 } }`
  - Skip history: `{ choreId: { Joe: 2, Zoe: 1 } }`
  - Completion dates: Track full history with timestamps
- [ ] Create Calendar.jsx component
- [ ] Create StatsPanel.jsx component
- [ ] Add Firebase configuration for optional Google auth
- [ ] Update index.css for full-screen responsive design

### Backend (Optional)
- [ ] Add `/api/chores` endpoint to persist data to database
- [ ] Add `/api/calendar` endpoint to fetch historical data
- [ ] Add `/api/stats` endpoint for completion analytics

### Testing
- [ ] Test skip turn logic on all browsers
- [ ] Verify calendar displays correctly on mobile
- [ ] Test Google sign-in flow
- [ ] Verify stats calculations are accurate

## Phase 1: MVP (Priority)
- Full screen layout
- Skip turn feature
- Completion counter display

## Phase 2: Calendar & Stats
- Calendar component
- Stats dashboard
- Historical date tracking

## Phase 3: Optional Enhancements
- Google sign-in integration
- Google Calendar sync
- Backend data persistence
- Export functionality
