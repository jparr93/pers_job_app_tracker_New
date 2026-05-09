# Google OAuth Setup Guide

To enable Google Sign-In and Calendar features, you need to set up Google OAuth.

## Steps:

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name: `chore-tracker`
5. Click "CREATE"
6. Wait for the project to be created, then select it

### 2. Enable Google Calendar API
1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google Calendar API"
3. Click on it
4. Click "ENABLE"

### 3. Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click "CREATE CREDENTIALS" and select "OAuth client ID"
3. If prompted, click "CONFIGURE CONSENT SCREEN" first:
   - Choose **External** user type
   - Fill in app name: `Chore Tracker`
   - Add your email as support and developer contact
   - Click "SAVE AND CONTINUE" through all pages
4. Back to Credentials, click "CREATE CREDENTIALS" → "OAuth client ID" again
5. Select **Web application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (for local development)
   - `http://localhost:3000` (for local production)
   - Your Azure domain (for deployment)
7. Add authorized redirect URIs:
   - `http://localhost:5173` 
   - `http://localhost:3000`
   - Your Azure domain
8. Click "CREATE"
9. **Copy your Client ID** from the popup

### 4. Add to Environment Variables
1. In the `client/` directory, copy `.env.local.example` to `.env.local`
2. Paste your Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
   VITE_GOOGLE_CALENDAR_ID=primary
   ```
3. **Never commit `.env.local`** to git (it's already in .gitignore)

## Local Development
- Make sure `.env.local` has your Client ID
- Run `npm install` in `client/`
- Run `npm run dev` in `client/`
- App should show "Sign in with Google" button
- Click to sign in with your Google account
- Calendar will appear on the right

## Deployment (Azure)
1. Get your Client ID from Google Cloud
2. Add your Azure App Service domain to Google Cloud Console:
   - **Authorized JavaScript origins**: `https://app-jdtrack-wcus-001.azurewebsites.net`
   - **Authorized redirect URIs**: `https://app-jdtrack-wcus-001.azurewebsites.net`
3. In Azure App Service, add an App Setting:
   - **Name**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: Your Client ID
4. Redeploy your app

## Testing
1. Start the dev server
2. Click "Sign in with Google"
3. Sign in with your Gmail account
4. You should see your profile
5. Calendar should appear on the right side
6. Click "Sign Out" to disconnect

## Troubleshooting

**"One or more invalid origins were found"**
- In Google Cloud Console → Credentials → Edit the OAuth 2.0 Client ID
- Check your authorized JavaScript origins and redirect URIs match your URL
- For localhost: include both `http://localhost:5173` and `http://localhost:3000`

**"The Oauth client was not found"**
- Go to Google Cloud Console → Credentials
- Make sure your OAuth 2.0 Client ID is set up correctly
- Re-copy the Client ID to `.env.local`

**"Sign in button not appearing"**
- Check browser console for errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set in `.env.local`
- Make sure `.env.local` is in the `client/` directory

**Calendar not showing after sign-in**
- Make sure Google Calendar API is enabled in Google Cloud Console
- Try refreshing the page
- Check if your Google account has Google Calendar set up
- Check browser console for CORS errors

**"CORS error" in console**
- Add your domain to Google Cloud Console:
  - Go to **APIs & Services** → **Credentials**
  - Edit your OAuth 2.0 Client ID
  - Add your domain to **Authorized JavaScript origins**

