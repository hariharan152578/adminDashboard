// // import React from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { useAuth } from '../context/useAuth';

// // // --- Icon Components ---
// // const icons = {
// //   logo: (
// //     <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="https://res.cloudinary.com/dllbh1v1m/image/upload/v1755753110/pcytcphmgc1irewg4suw.webp">
// //       <rect width="24" height="24" rx="6" fill="#F57C00"/>
// //       <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //     </svg>
// //   ),
// //   dashboard: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
// //   ),
// //   analysis: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>
// //   ),
// //   documents: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
// //   ),
// //   inbox: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0l-8-4-8 4m16 0l-8 4m8-4v5m-8-4l8 4m-8-4H4m16 0h-2"></path></svg>
// //   ),
// //   history: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
// //   ),
// //   settings: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
// //   ),
// //   logout: (
// //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
// //   ),
// // };

// // const navLinks = [
// //   { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard, href: '/dashboard' },
// //   { id: 'analysis', label: 'Abstract', icon: icons.analysis, href: '/abstract' },
// //   { id: 'documents', label: 'Payment', icon: icons.documents, href: '/payment' },
// //   { id: 'file', label: 'Final paper', icon: icons.documents, href: '/finalpaper' },
// //   { id: 'inbox', label: 'Inbox', icon: icons.inbox, href: '/inbox' },
// //   // { id: 'history', label: 'History', icon: icons.history, href: '/history' },
// //   // { id: 'settings', label: 'Settings', icon: icons.settings, href: '/settings' },
// // ];

// // const SideNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
// //   const { setAuth } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post("https://it-con-backend.onrender.com/api/admin/logout", {}, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //     } catch (err) {
// //       console.error("Logout error:", err);
// //     } finally {
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //       setAuth({ token: null, user: null });
// //       navigate("/login"); // redirect to login
// //     }
// //   };

// //   return (
// //     <>
// //       <aside
// //         className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0D47A1] text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
// //           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
// //         }`}
// //       >
// //         <div className="flex flex-col items-center p-6 border-b  bg-amber-600 border-[#1976D2]">
// //           <div className='grid gap-5'>
// //           {/* <img src="https://res.cloudinary.com/dllbh1v1m/image/upload/v1755753110/pcytcphmgc1irewg4suw.webp" alt="" /> */}
// //          {/* <img src="https://res.cloudinary.com/dllbh1v1m/image/upload/v1755753114/uhlv9wulx2dexlv6bnz2.png" alt="" /> */}
// //           </div>
// //           <h1 className="text-3xl font-bold text-white ml-3">IC-ECBE 2025</h1>
// //           <h1 className="text-xl font-bold text-white ml-3">Admin panal</h1>
          
// //         </div>

// //         <nav className="flex-1 py-6 px-4 space-y-2">
// //           {navLinks.map((item) => (
// //             <NavLink
// //               key={item.id}
// //               to={item.href}
// //               end
// //               className={({ isActive }) => 
// //                 `flex items-center p-3 rounded-lg transition-all duration-200 relative ${
// //                   isActive 
// //                   ? 'bg-[#1976D2] shadow-lg' 
// //                   : 'hover:bg-[#1976D2]/50'
// //                 }`
// //               }
// //             >
// //               {({ isActive }) => (
// //                 <>
// //                   {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#F57C00] rounded-r-full"></span>}
// //                   {item.icon}
// //                   <span className="ml-4 font-semibold">{item.label}</span>
// //                 </>
// //               )}
// //             </NavLink>
// //           ))}
// //         </nav>

// //         <div className="p-4 border-t border-[#1976D2]">
// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center w-full p-3 rounded-lg text-[#E3F2FD] hover:bg-[#1976D2]/50 hover:text-white transition-all duration-200"
// //           >
// //             {icons.logout}
// //             <span className="ml-4 font-semibold">Log out</span>
// //           </button>
// //         </div>
// //       </aside>

// //       {isSidebarOpen && (
// //         <div 
// //           className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
// //           onClick={() => setIsSidebarOpen(false)}
// //         ></div>
// //       )}
// //     </>
// //   );
// // };

// // export default SideNavbar;

// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/useAuth'; // Ensure this path is correct for your project structure

// // --- Icon Components (Kept exactly as you had them) ---
// const icons = {
//   logo: (
//     <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
//       <rect width="24" height="24" rx="6" fill="#F57C00"/>
//       <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   ),
//   dashboard: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
//   analysis: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>,
//   documents: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
//   inbox: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0l-8-4-8 4m16 0l-8 4m8-4v5m-8-4l8 4m-8-4H4m16 0h-2"></path></svg>,
//   history: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
//   settings: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
//   logout: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>,
// };

// const navLinks = [
//   { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard, href: '/dashboard' },
//   { id: 'analysis', label: 'Abstract', icon: icons.analysis, href: '/abstract' },
//   { id: 'documents', label: 'Payment', icon: icons.documents, href: '/payment' },
//   { id: 'file', label: 'Final paper', icon: icons.documents, href: '/finalpaper' },
//   { id: 'inbox', label: 'Inbox', icon: icons.inbox, href: '/inbox' },
//   // { id: 'history', label: 'History', icon: icons.history, href: '/history' },
//   // { id: 'settings', label: 'Settings', icon: icons.settings, href: '/settings' },
// ];

// const SideNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const { setAuth } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("https://it-con-backend.onrender.com/api/admin/logout", {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setAuth({ token: null, user: null });
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       <aside
//         className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0D47A1] text-white flex flex-col transform transition-transform duration-300 ease-in-out 
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//         lg:translate-x-0`} // lg:translate-x-0 ensures it is always visible on large screens
//       >
//         <div className="flex flex-col items-center p-6 border-b bg-amber-600 border-[#1976D2]">
//           <div className='grid gap-5'>
//              {/* Uncomment images when needed */}
//              {/* <img src="..." alt="" /> */}
//           </div>
//           <h1 className="text-3xl font-bold text-white ml-3">IC-ECBE 2025</h1>
//           <h1 className="text-xl font-bold text-white ml-3">Admin panel</h1>
//         </div>

//         <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
//           {navLinks.map((item) => (
//             <NavLink
//               key={item.id}
//               to={item.href}
//               end
//               onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when link is clicked
//               className={({ isActive }) => 
//                 `flex items-center p-3 rounded-lg transition-all duration-200 relative ${
//                   isActive 
//                   ? 'bg-[#1976D2] shadow-lg' 
//                   : 'hover:bg-[#1976D2]/50'
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#F57C00] rounded-r-full"></span>}
//                   {item.icon}
//                   <span className="ml-4 font-semibold">{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-[#1976D2]">
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full p-3 rounded-lg text-[#E3F2FD] hover:bg-[#1976D2]/50 hover:text-white transition-all duration-200"
//           >
//             {icons.logout}
//             <span className="ml-4 font-semibold">Log out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default SideNavbar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

// --- Icon Components (Size reduced from w-6 h-6 to w-4 h-4 and w-5 h-5) ---
const icons = {
  logo: (
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#F57C00"/>
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  dashboard: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
  analysis: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>,
  documents: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
  inbox: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0l-8-4-8 4m16 0l-8 4m8-4v5m-8-4l8 4m-8-4H4m16 0h-2"></path></svg>,
  history: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  settings: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  logout: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>,
};

const navLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard, href: '/dashboard' },
  { id: 'analysis', label: 'Abstract', icon: icons.analysis, href: '/abstract' },
  { id: 'file', label: 'Final paper', icon: icons.documents, href: '/finalpaper' },
  { id: 'documents', label: 'Payment', icon: icons.documents, href: '/payment' },
  { id: 'inbox', label: 'Inbox', icon: icons.inbox, href: '/inbox' },
];

const SideNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://s3conference.ksrce.ac.in/api/admin/logout", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuth({ token: null, user: null });
      navigate("/login");
    }
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#0D47A1] text-white flex flex-col transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
        w-56`} /* Reduced width from w-64 to w-56 */
      >
        {/* Compact Header */}
        <div className="flex flex-col items-center justify-center p-4 border-b bg-amber-600 border-[#1976D2] gap-1">
          <div className="flex flex-col items-center">
             {/* Uncomment images when needed, they will fit the new compact width */}
             {/* <img src="..." alt="" className="w-12 h-12 mb-2" /> */}
             <h1 className="text-lg font-bold text-white leading-tight">IC-ECBE 2025</h1>
             <h2 className="text-xs font-medium text-blue-100 uppercase tracking-wider opacity-80">Admin Panel</h2>
          </div>
        </div>

        {/* Compact Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navLinks.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-all duration-200 relative group ${
                  isActive 
                  ? 'bg-[#1976D2] shadow-md' 
                  : 'hover:bg-[#1976D2]/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Thinner active indicator */}
                  {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#F57C00] rounded-r-full"></span>}
                  
                  {/* Icon Wrapper */}
                  <span className={`flex items-center justify-center w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  
                  {/* Smaller Text */}
                  <span className={`ml-3 text-xs font-medium tracking-wide ${isActive ? 'text-white' : 'text-blue-100 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Compact Footer */}
        <div className="p-3 border-t border-[#1976D2]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-blue-200 hover:bg-[#1976D2]/50 hover:text-white transition-all duration-200 group"
          >
            <span className="flex items-center justify-center w-5 h-5 text-blue-300 group-hover:text-white">
              {icons.logout}
            </span>
            <span className="ml-3 text-xs font-medium tracking-wide">Log out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;