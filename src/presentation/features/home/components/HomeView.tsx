import React from 'react';
import { LoginForm } from '@/components/login-form';

/**
 * HomeView component that represents the main view of the home page.
 * This component follows clean architecture principles by focusing on
 * presentation concerns only.
 */
export const HomeView: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome to hackathon</h1>
          </div>
          <div className="space-y-6">
          </div>
        </div>
      </div>
    </main>
  );
}; 