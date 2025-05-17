import React from 'react';
import { HomeView } from '../organisms/HomeView';

/**
 * Home page component that serves as the container for the home feature.
 * This component follows the presentation layer pattern and is responsible for
 * coordinating the home page's presentation components.
 */
export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HomeView /> 
    </main>
  );
};

export default HomePage; 