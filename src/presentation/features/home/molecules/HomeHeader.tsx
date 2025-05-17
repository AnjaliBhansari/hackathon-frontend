import React from 'react';

/**
 * HomeHeader molecule component that displays the header section of the home page.
 * This component follows the atomic design pattern and is responsible for
 * displaying the title and subtitle of the home page.
 */
export const HomeHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome to Hackathon</h1>
    </div>
  );
}; 