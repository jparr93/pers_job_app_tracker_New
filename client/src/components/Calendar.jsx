export default function Calendar({ user }) {
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
        <h2>📅 Calendar</h2>
      </div>
      <div className="calendar-wrapper">
        <iframe
          src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231a1f35&ctz=UTC&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=1&mode=1`}
          className="google-calendar-iframe"
          allowFullScreen={true}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
