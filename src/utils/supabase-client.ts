'use client';

import { createClient } from '@supabase/supabase-js';

// For client components, we need to use environment variables that are exposed to the browser
// These need to be prefixed with NEXT_PUBLIC_ in the .env file
// Since we currently have variables without this prefix, we'll need to update our .env
// For now, we'll create a client with empty values that will need to be updated
let supabaseUrl = '';
let supabaseKey = '';

// In browsers, environment variables are accessible through window.ENV or process.env.NEXT_PUBLIC_*
if (typeof window !== 'undefined') {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABSE_URL || '';
  supabaseKey = process.env.NEXT_PUBLIC_SUPABSE_PUBLIC_KEY || '';
}

// Create the client for use in client components
export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
}); 