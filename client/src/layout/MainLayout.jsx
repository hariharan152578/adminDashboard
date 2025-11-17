// import React from 'react'
// import { Outlet } from 'react-router-dom';
// import SideNavbar from '../components/Navbar';
// const MainLayout = () => {    
//     return (
//         <div className="relative min-h-screen bg-gray-50">
//             <SideNavbar/>
//             <main className='absolute top-0 left-0 w-full lg:pl-64 min-h-screen'>
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default MainLayout;

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import SideNavbar from '../components/Navbar'; // Ensure path matches your file structure

// const MainLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="relative min-h-screen bg-gray-50">
      
//       {/* Mobile Header - Only visible on small screens */}
//       <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0D47A1] text-white z-20 p-4 flex items-center shadow-md h-16">
//         <button 
//           onClick={() => setIsSidebarOpen(true)}
//           className="p-1 rounded hover:bg-[#1976D2] focus:outline-none"
//         >
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//         <span className="ml-4 text-lg font-bold">IC-ECBE 2025</span>
//       </div>

//       {/* Sidebar Component */}
//       <SideNavbar 
//         isSidebarOpen={isSidebarOpen} 
//         setIsSidebarOpen={setIsSidebarOpen} 
//       />

//       {/* Main Content Area */}
//       <main className="w-full min-h-screen transition-all duration-300 lg:pl-64 pt-16 lg:pt-0">
//         <div className="p-4 lg:p-6">
//           <Outlet />
//         </div>
//       </main>

//     </div>
//   );
// };

// export default MainLayout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../components/Navbar'; // Ensure path matches your file structure

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Set a light background color for the content area
    <div className="relative min-h-screen bg-gray-100">
      
      {/* Mobile Header - Compacted */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0D47A1] text-white z-20 px-4 flex items-center shadow-md h-14">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 rounded -ml-1 hover:bg-[#1976D2] focus:outline-none"
        >
          {/* Icon size reduced */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Spacing reduced */}
        <span className="ml-3 text-lg font-bold">IC-ECBE 2025</span>
      </div>

      {/* Sidebar Component */}
      <SideNavbar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* Main Content Area - Updated Padding */}
      <main className="w-full min-h-screen transition-all duration-300 lg:pl-56 pt-14 lg:pt-0">
        {/* Content padding reduced */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default MainLayout;