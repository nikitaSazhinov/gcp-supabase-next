import fetch from 'cross-fetch';
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';
import config from '../config';
import { Database } from '../types/supabase';

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.serviceRoleKey;

const options: SupabaseClientOptions<'public'> = {
  db: {
    schema: 'public',
  },
  global: { fetch: fetch.bind(globalThis) },
};

const supabaseClient = createClient<Database, 'public'>(supabaseUrl, supabaseKey, options);

export default supabaseClient;
