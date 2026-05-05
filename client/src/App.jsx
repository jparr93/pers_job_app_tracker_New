import { useState, useEffect } from 'react';

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
        <div className="chores-grid">
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
                <div className="chore-info">
                  <div className="chore-name">{chore.name}</div>
                  <div className="chore-person">{state.person}</div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
