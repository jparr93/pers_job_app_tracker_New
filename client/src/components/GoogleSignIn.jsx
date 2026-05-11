import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleSignIn({ user, onUserChange }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Fetch user info with the access token
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        
        const userInfo = await response.json();
        
        const userData = {
          email: userInfo.email,
          displayName: userInfo.name,
          photoURL: userInfo.picture,
          token: tokenResponse.access_token,
        };
        
        setError(null);
        onUserChange(userData);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Failed to sign in. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Login failed');
    },
    scope: 'openid profile email https://www.googleapis.com/auth/calendar.readonly',
  });

  const handleSignOut = () => {
    onUserChange(null);
    setError(null);
  };

  return (
    <div className="google-signin">
      {user ? (
        <div className="user-info">
          <div className="user-profile">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="user-avatar"
              />
            )}
            <div className="user-details">
              <span className="user-name">{user.displayName}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
          <button 
            className="signin-btn sign-out"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          className="signin-btn"
          onClick={() => login()}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      )}
      {error && <div className="signin-error">{error}</div>}
    </div>
  );
}

