# Next.js 15 with Supabase Integration

This project demonstrates how to use Supabase with Next.js 15, supporting both client-side and server-side Supabase operations.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase project credentials.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Supabase Integration

This project includes several utilities for working with Supabase:

### Server-Side Clients

Located in `src/utils/supabase-server.ts`:

- `supabaseServer`: For general database operations in server components.
- `createServerActionClient()`: For authenticated operations in server actions.

### Client-Side Client

Located in `src/utils/supabase-client.ts`:

- `supabaseClient`: For use in client components.

### Middleware

The project includes a middleware implementation in `src/middleware.ts` that handles authentication session refreshing.

## Usage Examples

### In Server Components

```tsx
import { supabaseServer } from '@/utils/supabase-server';

export default async function ServerComponent() {
  const { data } = await supabaseServer
    .from('your_table')
    .select('*')
    .limit(10);

  return <div>{/* Render your data */}</div>;
}
```

### In Server Actions

```tsx
'use server'

import { createServerActionClient } from '@/utils/supabase-server';

export async function serverAction() {
  const supabase = await createServerActionClient();
  
  // Get user session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // Perform authenticated operations
    return { success: true };
  }
  
  return { success: false, message: 'Not authenticated' };
}
```

### In Client Components

```tsx
'use client'

import { supabaseClient } from '@/utils/supabase-client';
import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  return <div>{/* Your component */}</div>;
}
```

## Environment Variables

This project requires the following environment variables:

```
# For server-side operations
SUPABSE_URL=your_supabase_url
SUPABSE_PROJECT_ID=your_project_id
SUPABSE_PUBLIC_KEY=your_anon_key

# For client-side operations (must be prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABSE_URL=your_supabase_url
NEXT_PUBLIC_SUPABSE_PUBLIC_KEY=your_anon_key
```

## Known Issues

The environment variables have a typo in their prefix ("SUPABSE" instead of "SUPABASE"). This is maintained for consistency with the existing .env file but could be corrected in a future update.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
