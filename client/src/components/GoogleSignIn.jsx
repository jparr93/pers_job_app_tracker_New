import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function GoogleSignIn({ user, onUserChange }) {
  const [error, setError] = useState(null);

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        email: decoded.email,
        displayName: decoded.name,
        photoURL: decoded.picture,
        token: credentialResponse.credential
      };
      setError(null);
      onUserChange(userData);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error('Sign-in error:', err);
    }
  };

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
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => setError('Login failed')}
          theme="dark"
        />
      )}
      {error && <div className="signin-error">{error}</div>}
    </div>
  );
}

