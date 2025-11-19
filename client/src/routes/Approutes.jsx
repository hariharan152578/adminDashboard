// // Approutes.jsx
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Import your components
// import MainLayout from '../layout/MainLayout';
// import MainDashboard from '../pages/Home/Home';
// import AbstractSupport from '../pages/abstract/AbstractSupport';
// import SignInPage from '../pages/mvpblocks/LoginForm';
// import ProtectedRoute from './ProtectedRoute';
// // import Client from '../pages/clientproject/client';
// import Inbox from '../pages/contactSupport/ContactSupport';
// import PaymentPage from '../pages/payment/PaymentSupport';
// import FinalPaperSupport from '../pages/finalpaper/FinalPaperSupport';
// // import FinalPaperSupport from '../pages/finalpaper/FinalPaperSupport';
// const Approutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/" element={<SignInPage />} />
//         {/* <Route path='/client' element={<Client />} /> */}
//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<MainLayout />}>
//             <Route path="/dashboard" element={<MainDashboard />} /> 
//             <Route path="/abstract" element={<AbstractSupport />} />
//             <Route path='/inbox' element={<Inbox/>}/>
//             <Route path='/payment' element={<PaymentPage/>}/>
//             {/* <Route path='/finalpaper' element={<FinalPaperSupport/>}/> */}
//             <Route path='/finalpaper' element={<FinalPaperSupport/>}></Route>
//           </Route>
//         </Route>

//         {/* Catch-All 404 */}
//         <Route path="*" element={<div>Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Approutes;
// Approutes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components
import MainLayout from '../layout/MainLayout';
import MainDashboard from '../pages/Home/Home';
import AbstractSupport from '../pages/abstract/AbstractSupport';
import SignInPage from '../pages/mvpblocks/LoginForm';
import ProtectedRoute from './ProtectedRoute';
import Inbox from '../pages/contactSupport/ContactSupport';
import PaymentPage from '../pages/payment/PaymentSupport';
import FinalPaperSupport from '../pages/finalpaper/FinalPaperSupport';
import { useAuth } from '../context/useAuth'; // Import your auth hook

// Protected Payment Route Component
const ProtectedPaymentRoute = ({ children }) => {
  const { auth } = useAuth();
  
  // Extract email from auth context
  const userEmail = auth?.user?.email;
  const authorizedEmail = 'hariharan152578@gmail.com';
  
  console.log('Payment Route Access Check:', {
    userEmail,
    authorizedEmail,
    hasAccess: userEmail === authorizedEmail
  });

  // Check if the logged-in user is the authorized email
  if (userEmail === authorizedEmail) {
    return children;
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the Payment Management section.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            This section is restricted to authorized administrators only.
          </p>
          <div className="text-xs text-gray-400">
            Logged in as: {userEmail || 'No email found'}
          </div>
        </div>
      </div>
    );
  }
};

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SignInPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<MainDashboard />} /> 
            <Route path="/abstract" element={<AbstractSupport />} />
            <Route path='/inbox' element={<Inbox/>}/>
            
            {/* Protected Payment Route - Only for hariharan152578@gmail.com */}
            <Route 
              path='/payment' 
              element={
                <ProtectedPaymentRoute>
                  <PaymentPage/>
                </ProtectedPaymentRoute>
              } 
            />
            
            <Route path='/finalpaper' element={<FinalPaperSupport/>}/>
          </Route>
        </Route>

        {/* Catch-All 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
              <p className="text-gray-600">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default Approutes;