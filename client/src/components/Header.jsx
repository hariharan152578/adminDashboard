import React from 'react';

// --- Icon Components ---
// (You can replace these with a library like react-icons)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>
);

const UserAvatar = () => (
  <img
    className="w-8 h-8 rounded-full object-cover"
    src="https://via.placeholder.com/150" // Placeholder
    alt="User Avatar"
  />
);
// --- End Icons ---


const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Side: Hamburger Menu (Mobile) + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 lg:hidden"
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700" aria-label="Toggle dark mode">
            <MoonIcon />
          </button>
          <button className="text-gray-500 hover:text-gray-700" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="flex items-center" aria-label="User menu">
            <UserAvatar />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;