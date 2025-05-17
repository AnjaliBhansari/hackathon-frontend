import React from 'react';
import { LoginForm } from '@/components/login-form';

/**
 * LoginView component that represents the login page view.
 * This component follows clean architecture principles by focusing on
 * presentation concerns only.
 */
export const LoginView: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/50 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}; 