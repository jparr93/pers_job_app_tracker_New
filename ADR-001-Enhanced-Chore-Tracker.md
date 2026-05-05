# ADR-001: Enhanced Chore Tracker Architecture

**Date:** May 5, 2026  
**Status:** Proposed  
**Authors:** Joe

---

## Problem Statement

The current chore tracker app is minimal—it only tracks whose turn it is to do each chore. Users want enhanced features:
1. Full-screen responsive design
2. Calendar view of chore completion history
3. Skip turn functionality
4. Completion statistics per person
5. Optional Google sign-in for calendar sync

We need to decide how to architect these enhancements while maintaining simplicity and performance.

---

## Decision

We will enhance the chore tracker using the following approach:

### Frontend Architecture
- **State Management:** Continue using React hooks (useState/useEffect) for simplicity
- **Local Storage:** Persist enhanced state including completion counts, skip history, and timestamps
- **Components:** Create modular components (Calendar, Stats, SkipButton) to keep code organized
- **Styling:** Full-screen responsive CSS with mobile-first design

### Data Structure
```javascript
// Current (v1.0)
{
  choreId: {
    person: 'Joe',
    personIndex: 0,
    colorIndex: 0
  }
}

// Enhanced (v2.0)
{
  choreId: {
    person: 'Joe',
    personIndex: 0,
    colorIndex: 0,
    completions: { Joe: 5, Zoe: 3 },      // Track counts
    skips: { Joe: 1, Zoe: 0 },            // Track skips
    history: [                             // Track completion dates
      { person: 'Joe', date: '2026-05-03', skipped: false },
      { person: 'Zoe', date: '2026-05-02', skipped: false }
    ]
  }
}
```

### Feature Decisions

#### 1. Skip Turn Logic
- **Decision:** When a chore is skipped, the person stays assigned to that chore
- **Rationale:** Simpler UX—clicking skip doesn't immediately change who's responsible
- **Implementation:** Add skip flag in state, don't increment personIndex on skip

#### 2. Calendar View
- **Decision:** Use simple HTML calendar (no heavy library like react-big-calendar)
- **Rationale:** Minimal dependencies, fast load time, controls complexity
- **Implementation:** Create custom Calendar component that highlights completion dates

#### 3. Google Sign-In
- **Decision:** Make Google sign-in optional; only required for syncing to Google Calendar
- **Rationale:** Reduce complexity, avoid vendor lock-in, app works offline-first
- **Implementation:** Use Firebase Authentication (simple, no backend needed initially)
- **Future:** Connect signed-in users to Google Calendar API for export

#### 4. Data Persistence
- **Decision:** Continue with localStorage first; backend optional in future
- **Rationale:** App is for household use, no multi-device sync needed yet
- **Implementation:** Migrate state to localStorage on each update
- **Future:** Add Express API endpoints to sync across devices if needed

#### 5. Full Screen Layout
- **Decision:** CSS-only approach; use flexbox for responsive design
- **Rationale:** No layout library overhead, clean semantic HTML
- **Implementation:** Update index.css with viewport-height grid layout

---

## Alternatives Considered

### Alternative 1: Use a State Management Library (Redux/Zustand)
- **Rejected:** Overkill for app complexity; hooks are sufficient
- **Risk:** Added bundle size and learning curve

### Alternative 2: Use React Big Calendar Library
- **Rejected:** External dependency adds complexity
- **Benefit:** Our custom simple calendar fits needs better

### Alternative 3: Backend-First with Database
- **Rejected:** Initial MVP doesn't require multi-device sync
- **Future:** Can add Express API later if needed

### Alternative 4: Make Google Sign-In Required
- **Rejected:** Adds friction; offline experience suffers
- **Decision:** Keep optional to maintain simplicity

---

## Implementation Plan

### Phase 1: Core Enhancements (Week 1)
1. Update App state to include `completions`, `skips`, `history`
2. Add "Skip" button next to chore buttons
3. Add completion counter display on each button
4. Update localStorage serialization

### Phase 2: Calendar & Stats (Week 2)
1. Create Calendar.jsx component
2. Create StatsPanel.jsx component
3. Highlight completed dates in calendar
4. Show stats (totals per person, dates)

### Phase 3: Polish & Optional Features (Week 3)
1. Google sign-in integration (optional)
2. Responsive design refinement
3. Testing across devices

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| localStorage data grows too large | Performance degradation | Implement data cleanup (e.g., keep last 90 days of history) |
| Multiple users on same device | Data conflicts | Add session/person switching feature |
| Google sign-in breaks | Sign-in unusable | Keep as optional; app works without it |
| Accidental skips on mobile | UX frustration | Add confirmation modal for skip action |

---

## Success Criteria

- ✅ App displays in full screen on mobile/desktop
- ✅ Users can skip turns and see skip history
- ✅ Completion counters accurately track per-person stats
- ✅ Calendar displays with completion highlights
- ✅ All data persists across browser refreshes
- ✅ Optional Google sign-in works without breaking app

---

## Rollback Plan

If Phase 2 or 3 fails:
1. Revert to v1.0 chore tracker (Phase 1 is stable)
2. Keep completion counters as core feature (low risk)
3. Remove calendar/stats features
4. Fix issues and re-plan

---

## Future Considerations

1. **Backend Sync:** Add Express API to sync data across devices
2. **Google Calendar Integration:** Export chore dates to Google Calendar
3. **Notifications:** Remind users when it's their turn (browser notifications)
4. **Recurring Tasks:** Extend to handle one-time tasks vs recurring chores
5. **Family App:** Add more than 2 people, customizable chore list
