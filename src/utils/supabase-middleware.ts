import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// This function can be used in Server Components and Route Handlers
export async function createServerComponentClient() {
  // Get cookies from the request
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.SUPABSE_URL || '',
    process.env.SUPABSE_PUBLIC_KEY || '',
    {
      cookies: {
        get(name) {
          // Using synchronous cookie access
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
      },
    }
  );
}

// Middleware function for route.ts files or middleware.ts
export async function createMiddlewareClient(request: NextRequest) {
  const response = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.SUPABSE_URL || '',
    process.env.SUPABSE_PUBLIC_KEY || '',
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.delete({ name, ...options });
        },
      },
    }
  );
  
  return { supabase, response };
} 