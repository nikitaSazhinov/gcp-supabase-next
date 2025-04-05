import Link from 'next/link';
import { createServerActionClient } from '@/utils/supabase-server';

export default async function Home() {
  const supabase = await createServerActionClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <h1 className="text-3xl font-bold">Next.js with Supabase Auth</h1>
      
      <div className="max-w-2xl text-center">
        <p className="text-lg text-gray-600 mb-8">
          This example demonstrates authentication with Supabase in Next.js 15, using server-side components and server actions.
        </p>
        
        {session ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
              <p className="text-green-700">
                You are logged in as <strong>{session.user.email}</strong>
              </p>
            </div>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
