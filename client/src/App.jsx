import { useState, useEffect } from 'react';
import './App.css';

const CHORES = [
  { id: 'bins', name: 'Empty Bins' },
  { id: 'dishwasher', name: 'Empty and Load Dishwasher' },
  { id: 'litterTray', name: 'Litter Tray' },
  { id: 'feedAnimals', name: 'Feed Animals' }
];

const PEOPLE = ['Joe', 'Zoe'];
const COLORS = ['#4f46e5', '#ec4899']; // Indigo and Pink

export default function App() {
  const [chores, setChores] = useState(() => {
    const saved = localStorage.getItem('chores');
    if (saved) return JSON.parse(saved);
    
    return CHORES.reduce((acc, chore) => {
      acc[chore.id] = {
        person: 'Joe',
        personIndex: 0,
        colorIndex: 0
      };
      return acc;
    }, {});
  });

  // Save to localStorage whenever chores change
  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  const handleChoreClick = (choreId) => {
    setChores(prev => ({
      ...prev,
      [choreId]: {
        personIndex: (prev[choreId].personIndex + 1) % PEOPLE.length,
        colorIndex: (prev[choreId].colorIndex + 1) % COLORS.length,
        person: PEOPLE[(prev[choreId].personIndex + 1) % PEOPLE.length]
      }
    }));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 Chore Tracker</h1>
      </header>

      <main className="chores-container">
        {CHORES.map(chore => {
          const state = chores[chore.id];
          const bgColor = COLORS[state.colorIndex];

          return (
            <button
              key={chore.id}
              className="chore-button"
              style={{ backgroundColor: bgColor }}
              onClick={() => handleChoreClick(chore.id)}
            >
              <div className="chore-name">{chore.name}</div>
              <div className="chore-person">{state.person}</div>
            </button>
          );
        })}
      </main>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Home from './pages/Home';
import JobTracker from './pages/JobTracker';
import Templates from './pages/Templates';
import UsefulAdvice from './pages/UsefulAdvice';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-lg text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
              <Route path="/jobs" element={<JobTracker user={user} onLogout={handleLogout} />} />
              <Route path="/templates" element={<Templates user={user} onLogout={handleLogout} />} />
              <Route path="/advice" element={<UsefulAdvice user={user} onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
