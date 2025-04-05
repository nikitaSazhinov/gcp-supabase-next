import SignupForm from '@/app/components/SignupForm';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/utils/supabase-server';

export default async function SignupPage() {
  // Check if user is already logged in using the admin client
  const { data } = await supabaseServer.auth.getUser();
  
  // Redirect if already logged in
  if (data.user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">
            Sign up to get started with our application
          </p>
        </div>
        
        <SignupForm />
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 