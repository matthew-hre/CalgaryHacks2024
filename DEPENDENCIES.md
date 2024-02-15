# Project Dependencies Document

## Core Technologies
- **Next.js**: Framework for React-based web applications.
- **Supabase**: Open-source Firebase alternative, providing database and authentication.
- **PostgreSQL**: Database system used by Supabase.
- **GitHub OAuth**: Authentication method for users to log in with their GitHub accounts.

## NPM Packages
- `next` - Core Next.js framework.
- `react` & `react-dom` - React library for building user interfaces.
- `@supabase/supabase-js` - Supabase client library for JavaScript.
- `@shadcn/ui` - UI component library for React.

## Setup Instructions
- Ensure Node.js and npm are installed.
- Install dependencies via `npm install next react react-dom @supabase/supabase-js @shadcn/ui`.
- Configure Supabase client in `utils/supabaseClient.js` with project URL and anon key.
- Implement GitHub OAuth through Supabase's Authentication settings.
- Utilize `@shadcn/ui` components for styling as needed.

## Additional Notes
- Store sensitive keys and URLs in `.env.local` for local development and securely in your production environment's configuration.
- Consult the official documentation of each technology for detailed implementation guidance.
