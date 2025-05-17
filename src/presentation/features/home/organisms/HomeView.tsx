import React from 'react';
import { HomeHeader } from '../molecules/HomeHeader';;

/**
 * HomeView organism component that composes the main sections of the home page.
 * This component follows the atomic design pattern and is responsible for
 * organizing the layout of the home page's content.
 */
export const HomeView: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <HomeHeader />
      </div>
    </div>
  );
}; 