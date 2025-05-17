import React from 'react';
import { LoginForm } from '@/components/login-form';

/**
 * HomeContent molecule component that displays the main content section of the home page.
 * This component follows the atomic design pattern and is responsible for
 * displaying the login form and any other content sections.
 */
export const HomeContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <LoginForm />
    </div>
  );
}; 