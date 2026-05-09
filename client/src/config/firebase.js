// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const getGoogleCalendarUrl = (token) => {
  if (!token) return null;
  return `https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231a1f35&ctz=UTC&showTitle=1&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=1&mode=1&src=${encodeURIComponent(import.meta.env.VITE_GOOGLE_CALENDAR_ID || 'primary')}`;
};

