'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Client-side Supabase instance for logout handling
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABSE_URL || '',
  process.env.NEXT_PUBLIC_SUPABSE_PUBLIC_KEY || ''
);

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      
      // Sign out using the client-side Supabase instance
      const { error } = await supabaseClient.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        alert('Failed to log out. Please try again.');
      } else {
        // Redirect to home after logout
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
    >
      {loading ? 'Logging out...' : 'Log out'}
    </button>
  );
} 