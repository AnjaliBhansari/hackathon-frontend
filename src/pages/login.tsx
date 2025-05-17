import React from 'react';
import { LoginView } from '@/presentation/features/auth';

/**
 * Next.js login page that serves as the entry point for the login route.
 * This page uses the LoginView component from our presentation layer.
 */
export default function LoginPage() {
  return <LoginView />;
}
