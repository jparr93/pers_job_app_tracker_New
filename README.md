# 🏠 Household Chore Tracker

A simple, fast React app for tracking who's turn it is to do the chores.

## Features

- **4 Hardcoded Chores:** Empty Bins, Empty and Load Dishwasher, Litter Tray, Feed Animals
- **Person Rotation:** Click button to cycle from Joe → Zoe
- **Color Coding:** Button colors change with each click for visual feedback
- **Local Storage:** Chore state persists across browser refreshes
- **Responsive Design:** Works great on mobile and desktop

## Project Structure

```
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx         # Main chore logic
│   │   ├── index.css       # Styling
│   │   └── main.jsx        # React entry point
│   ├── vite.config.js
│   └── package.json
├── server.js               # Express server (serves React build on cloud)
├── package.json            # Root package with build scripts
└── .github/workflows/      # GitHub Actions CI/CD
```

## Development

### Run locally:
```bash
cd client
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deployment

### Build for production:
```bash
npm run build
```

Creates `client/dist/` with optimized React build.

### Deploy to Azure:
1. Commit to `main` branch
2. GitHub Actions automatically:
   - Builds the React app with Vite
   - Creates deployment package
   - Deploys to Azure App Service (`app-jdtrack-wcus-001`)

The Express server in `server.js` serves the React app on Azure.

## How It Works

1. **Chore State:** 4 chores stored in React state + localStorage
2. **Click Handler:** Each click cycles `person` (Joe → Zoe) and `color`
3. **Colors:** Indigo (#4f46e5) ↔ Pink (#ec4899)
4. **Persistence:** `useEffect` saves state to localStorage on every change
5. **Bootstrap:** App loads state from localStorage on mount

## Future Enhancements

- Add more people to rotate (not just Joe/Zoe)
- Add timestamps for last completed
- Track completion streaks
- Add history view
- Mobile app notifications
