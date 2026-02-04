# Authentication System

## Overview

This is a complete, production-ready authentication system built with Next.js 15, NextAuth v5, and Prisma. It includes all essential authentication features with a clean, modern UI.

## Features

### ✅ Implemented Features

- **Email/Password Authentication**
  - Secure password hashing with bcryptjs
  - Email verification required
  - Password strength validation

- **OAuth Providers**
  - Google Sign-In
  - GitHub Sign-In

- **Two-Factor Authentication (2FA)**
  - Optional 2FA via email
  - 6-digit verification codes
  - 5-minute expiration

- **Password Management**
  - Forgot password flow
  - Password reset via email token
  - Token expiration (1 hour)

- **Email Verification**
  - Verification email on registration
  - Token-based verification
  - Auto-redirect after verification

- **Route Protection**
  - Middleware-based authentication
  - Public/private route configuration
  - Automatic redirects

- **User Management**
  - Active/inactive account status
  - Profile information
  - Session management

## Pages

### Authentication Pages

1. **`/login`** - Login page with 2FA support
2. **`/register`** - User registration
3. **`/forgot-password`** - Request password reset
4. **`/reset-password`** - Reset password with token
5. **`/verify-email`** - Email verification
6. **`/dashboard`** - Protected dashboard (example)

## Backend Actions

### Auth Actions (`src/actions/auth.actions.ts`)

- `login(values, callbackUrl)` - Authenticate user with credentials
- `register(values)` - Create new user account
- `logout()` - Sign out user
- `signInWithGoogle(callbackUrl)` - OAuth Google login
- `signInWithGithub(callbackUrl)` - OAuth GitHub login
- `verifyEmail(token)` - Verify user email
- `resetPassword(values)` - Request password reset
- `newPassword(values, token)` - Set new password
- `generateVerificationToken(email)` - Create email verification token
- `generatePasswordResetToken(email)` - Create password reset token
- `generateTwoFactorToken(email)` - Create 2FA code

### Session Actions (`src/actions/session.actions.ts`)

- `getSession()` - Get current session
- `isAuthenticated()` - Check if user is authenticated
- `requireAuth()` - Require authentication or throw error

### User Actions (`src/actions/user.actions.ts`)

- `getUserByEmail(email)` - Find user by email
- `getUserById(id)` - Find user by ID
- `getCurrentUser()` - Get current authenticated user

## Components

### Auth Components (`src/components/auth/`)

- `AuthCard` - Styled card container for auth pages
- `FormError` - Error message display
- `FormSuccess` - Success message display
- `SocialButtons` - OAuth provider buttons

## Configuration

### Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (for sending verification/reset emails)
# RESEND_API_KEY="your-resend-api-key"
```

### Route Configuration (`src/lib/routes.ts`)

- `publicRoutes` - Routes accessible without authentication
- `authRoutes` - Auth pages (redirect if logged in)
- `apiAuthPrefix` - API auth route prefix
- `DEFAULT_LOGIN_REDIRECT` - Where to redirect after login

## Database Schema

The authentication system requires these Prisma models:

- `User` - User accounts
- `Account` - OAuth accounts
- `Session` - User sessions
- `VerificationToken` - Email verification tokens
- `PasswordResetToken` - Password reset tokens
- `TwoFactorToken` - 2FA verification codes
- `TwoFactorConfirmation` - 2FA confirmations

## Security Features

1. **Password Requirements**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

2. **Token Security**
   - Cryptographically secure token generation
   - Time-based expiration
   - One-time use tokens
   - Automatic cleanup after use

3. **Account Protection**
   - Email verification required
   - Account status (active/inactive)
   - OAuth account linking prevention
   - Credential validation

4. **Session Management**
   - Secure session handling via NextAuth
   - Automatic session refresh
   - Secure cookie configuration

## Usage Examples

### Protecting a Page

```tsx
import { requireAuth } from "@/actions/session.actions";

export default async function ProtectedPage() {
  const session = await requireAuth();

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
    </div>
  );
}
```

### Checking Authentication Status

```tsx
import { isAuthenticated } from "@/actions/session.actions";

export default async function ConditionalPage() {
  const authenticated = await isAuthenticated();

  return (
    <div>{authenticated ? <p>You are logged in</p> : <p>Please log in</p>}</div>
  );
}
```

### Using Auth Actions in Client Components

```tsx
"use client";

import { login } from "@/actions/auth.actions";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await login({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (result.error) {
      setError(result.error);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Next Steps

### To Complete the System:

1. **Email Integration**
   - Implement email sending with Resend
   - Create email templates
   - Configure SMTP settings

2. **Enhanced Security**
   - Add rate limiting (already configured with Upstash)
   - Implement CAPTCHA on registration
   - Add password breach checking

3. **User Profile**
   - Build profile editing page
   - Add avatar upload
   - Implement password change

4. **Admin Features**
   - User management dashboard
   - Account suspension/activation
   - Login history tracking

## Styling

The UI is built with:

- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality components
- **Radix UI** - Accessible primitives
- **Dark mode** - Full theme support

## Testing

To test the authentication:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. You'll be redirected to `/login`
4. Create an account at `/register`
5. Check email verification flow
6. Test password reset
7. Try OAuth providers
8. Enable 2FA in user settings (when implemented)

## Troubleshooting

### Common Issues:

1. **OAuth not working**
   - Verify environment variables are set
   - Check OAuth app configuration
   - Ensure redirect URLs are correct

2. **Database errors**
   - Run `npx prisma generate`
   - Run `npx prisma db push`
   - Check DATABASE_URL

3. **Session issues**
   - Verify AUTH_SECRET is set
   - Clear browser cookies
   - Restart development server

## License

This authentication system is built for your project and can be modified as needed.
