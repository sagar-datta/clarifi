# Key Information for Backend Implementation

## Frontend Status

- Next.js frontend with Clerk authentication implemented
- Users can sign up/sign in with custom styled pages
- After auth, users are forced to redirect to /dashboard
- Dark mode support implemented

## Required Backend Setup

1. Express + TypeScript backend needs Clerk middleware for:

   - Validating Clerk tokens from frontend requests
   - Protecting API routes
   - Accessing user data from tokens

2. Environment Configuration Needed:

   - CLERK_SECRET_KEY (already set in frontend, will need in backend)
   - CORS configuration to allow frontend requests
   - API endpoint base URL configuration
   - Supabase connection details and keys

3. Database Setup (Supabase)

   - Need to create initial schema for:
     - User profiles (linked to Clerk user IDs)
     - Financial data (transactions, budgets, etc.)
     - Categories and tags
   - Set up Row Level Security (RLS) policies
   - Configure Supabase client with proper auth

4. Planned API Routes:

   - All routes should be protected except public endpoints
   - Need to access user ID and session data from Clerk tokens
   - Will be handling financial data, so security is crucial
   - Routes should validate data before Supabase operations

5. TypeScript Types:

   - Need shared types between frontend/backend for:
     - User data from Clerk
     - Database models
     - API request/response shapes
     - Error handling structures

6. Current Frontend Environment:
   - Running on localhost during development
   - Will be deployed to GitHub Pages
   - Using Clerk's free tier for auth
   - Will need to connect to Supabase's free tier
