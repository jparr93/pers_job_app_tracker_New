import { useState, useEffect } from 'react';

export default function Calendar({ user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      fetchCalendarEvents();
    }
  }, [user]);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const timeMin = now.toISOString();
      const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Next 7 days

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&orderBy=startTime&singleEvents=true&maxResults=10`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEvents(data.items || []);
      } else {
        console.error('Failed to fetch calendar events:', response.status);
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="calendar-container">
        <div className="calendar-placeholder">
          <p>Sign in with Google to view your calendar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>📅 Upcoming Events</h2>
        <button onClick={fetchCalendarEvents} className="refresh-btn" title="Refresh">🔄</button>
      </div>
      <div className="calendar-events">
        {loading && <p className="loading">Loading events...</p>}
        {!loading && events.length === 0 && (
          <p className="no-events">No upcoming events</p>
        )}
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-time">
              {new Date(event.start.dateTime || event.start.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: event.start.dateTime ? '2-digit' : undefined,
                minute: event.start.dateTime ? '2-digit' : undefined,
                hour12: true,
              })}
            </div>
            <div className="event-title">{event.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
