'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Direct authenticated server client that doesn't rely on cookies for auth
// This is the best way to handle auth in server actions where we can't use cookies properly
const supabaseAdmin = createClient(
  process.env.SUPABSE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Login user and sync with the 'users' table in Supabase
export async function loginUser(email: string, password: string) {
  try {
    // Use the admin client to authenticate
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return { error: error.message };
    }

    if (!data.user) {
      return { error: 'User not found' };
    }

    // Check if the user is in our 'users' table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('auth_id', data.user.id)
      .single();

    // If not found in the users table, create a new entry
    if (userError || !userData) {
      const { error: insertError } = await supabaseAdmin
        .from('users')
        .insert({
          auth_id: data.user.id,
          email: data.user.email,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        // Continue anyway since auth worked
      }
    }

    // The token will be sent directly to the client via LoginForm
    return { 
      success: true,
      session: data.session
    };
  } catch (error) {
    console.error('Unexpected login error:', error);
    return { error: 'Authentication failed. Please try again.' };
  }
}

// Sign up a new user and create entry in 'users' table
export async function signUpUser(email: string, password: string) {
  try {
    // Use the admin client to sign up
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (!data.user) {
      return { error: 'Failed to create user' };
    }

    // Create user in our custom 'users' table
    const { error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        auth_id: data.user.id,
        email: data.user.email,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error creating user profile:', insertError);
      return { error: 'Account created but profile setup failed. Please contact support.' };
    }

    // Revalidate paths
    revalidatePath('/');
    revalidatePath('/login');

    return { 
      success: true,
      session: data.session,
      message: data.session ? 'Account created' : 'Verification email sent. Please check your inbox.'
    };
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return { error: 'Registration failed. Please try again.' };
  }
}

// Log out user
export async function logoutUser() {
  try {
    // This action will be handled from client-side
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: 'Logout failed. Please try again.' };
  }
}

// Get current user with profile from 'users' table
export async function getCurrentUser(userId: string) {
  try {
    if (!userId) {
      return { user: null };
    }

    // Get user profile from 'users' table using the admin client
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('auth_id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching user profile:', error);
      // Return basic user info
      return { 
        user: {
          id: userId,
        }
      };
    }

    return { user: data };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null, error: 'Failed to fetch user data' };
  }
} 