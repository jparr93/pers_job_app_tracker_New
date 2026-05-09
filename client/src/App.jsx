import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSignIn from './components/GoogleSignIn';
import Calendar from './components/Calendar';

const CHORES = [
  { id: 'bins', name: 'Empty Bins' },
  { id: 'dishwasher', name: 'Empty and Load Dishwasher' },
  { id: 'litterTray', name: 'Litter Tray' },
  { id: 'feedAnimals', name: 'Feed Animals' }
];

const PEOPLE = ['Joe', 'Zoe'];
const COLORS = ['#6366f1', '#f59e0b']; // Indigo for Joe, Amber for Zoe

// Migrate old data structure to new one
function migrateChoreData(data) {
  if (!data) return null;
  
  const migrated = {};
  for (const choreId in data) {
    const oldChore = data[choreId];
    migrated[choreId] = {
      person: oldChore.person || 'Joe',
      personIndex: oldChore.personIndex !== undefined ? oldChore.personIndex : 0,
      colorIndex: oldChore.colorIndex !== undefined ? oldChore.colorIndex : 0,
      completions: oldChore.completions || { Joe: 0, Zoe: 0 },
      skips: oldChore.skips || { Joe: 0, Zoe: 0 }
    };
  }
  return migrated;
}

export default function App() {
  const [chores, setChores] = useState(() => {
    const saved = localStorage.getItem('chores');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        return migrateChoreData(parsedData);
      } catch (e) {
        console.error('Error parsing stored chores:', e);
      }
    }
    
    return CHORES.reduce((acc, chore) => {
      acc[chore.id] = {
        person: 'Joe',
        personIndex: 0,
        colorIndex: 0,
        completions: { Joe: 0, Zoe: 0 },
        skips: { Joe: 0, Zoe: 0 }
      };
      return acc;
    }, {});
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save to localStorage whenever chores change
  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  const handleChoreClick = (choreId) => {
    setChores(prev => {
      const currentPerson = prev[choreId].person;
      const nextPersonIndex = (prev[choreId].personIndex + 1) % PEOPLE.length;
      const nextPerson = PEOPLE[nextPersonIndex];
      
      return {
        ...prev,
        [choreId]: {
          ...prev[choreId],
          personIndex: nextPersonIndex,
          colorIndex: (prev[choreId].colorIndex + 1) % COLORS.length,
          person: nextPerson,
          completions: {
            ...prev[choreId].completions,
            [currentPerson]: (prev[choreId].completions[currentPerson] || 0) + 1
          }
        }div className="header-content">
          <h1>🏠 Chore Tracker</h1>
          <GoogleSignIn user={user} onUserChange={setUser} />
        </div>
      </header>

      <main className="main-content">
        <div className="chores-section">
          <div className="chores-container">
            <div className="chores-grid">
              {CHORES.map(chore => {
                const state = chores[chore.id];
                const bgColor = COLORS[state.colorIndex];
                const currentPersonCompletions = state.completions[state.person] || 0;

                return (
                  <button
                    key={chore.id}
                    className="chore-button"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => handleChoreClick(chore.id)}
                  >
                    <div className="chore-button-row">
                      <div className="chore-info">
                        <div className="chore-name">{chore.name}</div>
                        <div className="chore-person">{state.person}</div>
                        <div className="chore-count">✓ {currentPersonCompletions}</div>
                      </div>
                      <button
                        className="skip-btn"
                        onClick={(e) => handleSkip(e, chore.id)}
                      >
                        Skip
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-section">
          <Calendar user={user} />onst state = chores[chore.id];
            const bgColor = COLORS[state.colorIndex];
            const currentPersonCompletions = state.completions[state.person] || 0;

            return (
              <button
                key={chore.id}
                className="chore-button"
                style={{ backgroundColor: bgColor }}
                onClick={() => handleChoreClick(chore.id)}
              >
                <div className="chore-button-row">
                  <div className="chore-info">
                    <div className="chore-name">{chore.name}</div>
                    <div className="chore-person">{state.person}</div>
                    <div className="chore-count">✓ {currentPersonCompletions}</div>
                  </div>
                  <button
                    className="skip-btn"
                    onClick={(e) => handleSkip(e, chore.id)}
                  >
                    Skip
                  </button>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
