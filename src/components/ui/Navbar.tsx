import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center space-x-2">
        <span className="text-purple-600 text-2xl">{/* Icon */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#7C3AED" />
            <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="font-bold text-lg text-gray-900">Avesta Kudos</span>
      </div>
      {/* Right: Button and Avatar */}
      <div className="flex items-center space-x-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">+ Give Kudos</button>
        <span className="inline-block w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-gray-200">
          {/* Placeholder avatar */}
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-full h-full object-cover" />
        </span>
      </div>
    </nav>
  );
};

export default Navbar; 