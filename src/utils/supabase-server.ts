import { createClient } from '@supabase/supabase-js';

// Create a standard admin Supabase client for server-side operations
// This works with JWT tokens directly, not cookies
export const supabaseServer = createClient(
  process.env.SUPABSE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// For server components that need auth, we use a direct API call approach instead of cookies
export async function createServerActionClient() {
  return createClient(
    process.env.SUPABSE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
} 