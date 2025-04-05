'use client';

interface UserProfileProps {
  user: {
    id?: string;
    auth_id?: string;
    email?: string;
    created_at?: string;
    [key: string]: any; // For any additional fields in the users table
  } | null;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <p className="text-yellow-700">No user profile found</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl font-medium text-blue-600">
            {user.email ? user.email.charAt(0).toUpperCase() : '?'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {user.email || 'Anonymous User'}
          </h3>
          <p className="text-sm text-gray-500">
            {user.created_at 
              ? `Member since ${new Date(user.created_at).toLocaleDateString()}`
              : 'New member'}
          </p>
        </div>
      </div>
    </div>
  );
} 