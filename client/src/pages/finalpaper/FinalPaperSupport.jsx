
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   Eye,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   RefreshCw,
//   BarChart3,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// /* ----------------------------- Updated Styles ----------------------------- */
// const finalPaperStyles = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//   * {
//     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//   }

//   :root {
//     --brand-orange: #F57C00;
//     --brand-orange-dark: #E65100;
//     --brand-blue-dark: #0D47A1;
//     --brand-blue-primary: #1976D2;
//     --brand-blue-light: #E3F2FD;
//     --brand-red: #D32F2F;
//     --text-primary: #111318;
//     --text-secondary: #6c757d;
//     --surface-light: #f8f9fa;
//     --surface-dark: #e9ecef;
//     --white: #FFFFFF;
//     --border-light: #e2e8f0;
//   }

//   body {
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }

//   .glass-card {
//     background: rgba(255, 255, 255, 0.95);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(255, 255, 255, 0.8);
//     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .glass-card:hover {
//     box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
//     transform: translateY(-4px);
//   }

//   .stat-card {
//     position: relative;
//     overflow: hidden;
//     background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
//     border: 1px solid rgba(0, 0, 0, 0.06);
//   }

//   .stat-card::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .stat-card:hover::before {
//     opacity: 1;
//   }

//   .stat-icon-wrapper {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 56px;
//     height: 56px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   }

//   .stat-icon-wrapper::after {
//     content: '';
//     position: absolute;
//     inset: -2px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     opacity: 0.2;
//     filter: blur(8px);
//   }

//   .metric-value {
//     font-size: 2rem;
//     font-weight: 700;
//     letter-spacing: -0.02em;
//     background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .chart-container {
//     background: white;
//     border-radius: 24px;
//     border: 1px solid rgba(0, 0, 0, 0.06);
//     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//     transition: all 0.4s ease;
//   }

//   .chart-container:hover {
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
//   }

//   .chart-header {
//     padding: 24px 28px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.06);
//     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
//   }

//   .chart-body {
//     padding: 28px;
//   }

//   .btn {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     padding: 12px 24px;
//     border: none;
//     border-radius: 12px;
//     font-size: 0.9375rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
//     text-decoration: none;
//   }

//   .btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .btn:hover::before {
//     opacity: 1;
//   }

//   .btn-primary {
//     background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
//   }

//   .btn-primary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-secondary {
//     background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//   }

//   .btn-secondary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-success {
//     background: linear-gradient(135deg, #10B981 0%, #059669 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
//   }

//   .btn-success:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-outline {
//     background: transparent;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     color: #111318;
//     box-shadow: none;
//   }

//   .btn-outline:hover:not(:disabled) {
//     background: rgba(0, 0, 0, 0.02);
//     border-color: rgba(0, 0, 0, 0.2);
//     transform: translateY(-1px);
//   }

//   .btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none !important;
//     box-shadow: none !important;
//   }

//   .btn-sm {
//     padding: 8px 16px;
//     font-size: 0.875rem;
//   }

//   .header-gradient {
//     background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   /* Enhanced Table Styles */
//   .table-container {
//     background: white;
//     border-radius: 16px;
//     border: 1px solid var(--border-light);
//     box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//   }

//   .table-modern {
//     width: 100%;
//     border-collapse: separate;
//     border-spacing: 0;
//     background: white;
//   }

//   .table-modern thead {
//     background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }

//   .table-modern th {
//     padding: 16px 20px;
//     font-size: 0.75rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: #64748b;
//     border-bottom: 2px solid #e2e8f0;
//     background: inherit;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     user-select: none;
//   }

//   .table-modern th:hover {
//     background: rgba(241, 245, 249, 0.8);
//   }

//   .table-modern th.sortable {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .table-modern th .sort-icon {
//     opacity: 0.4;
//     transition: opacity 0.2s ease;
//   }

//   .table-modern th:hover .sort-icon {
//     opacity: 0.7;
//   }

//   .table-modern th.sorted .sort-icon {
//     opacity: 1;
//     color: var(--brand-blue-primary);
//   }

//   .table-modern tbody tr {
//     border-bottom: 1px solid #f1f5f9;
//     position: relative;
//   }

//   .table-modern tbody tr:last-child {
//     border-bottom: none;
//   }

//   .table-modern td {
//     padding: 18px 20px;
//     color: #334155;
//     font-size: 0.875rem;
//     font-weight: 500;
//     border-bottom: 1px solid #f8fafc;
//   }

//   .table-modern tbody tr:last-child td {
//     border-bottom: none;
//   }

//   .status-indicator {
//     display: inline-flex;
//     align-items: center;
//     padding: 4px 10px;
//     border-radius: 9999px;
//     font-weight: 600;
//     font-size: 0.75rem;
//     text-transform: capitalize;
//     background-color: #E5E7EB;
//     color: #374151;
//     cursor: default;
//     pointer-events: none;
//   }

//   .status-indicator-approved {
//     background-color: #D1FAE5;
//     color: #065F46;
//   }
  
//   .status-indicator-rejected {
//     background-color: #FEE2E2;
//     color: #991B1B;
//   }
  
//   .status-indicator-pending {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }
  
//   .status-indicator-under-review {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-correction-required {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }

//   .status-indicator-submitted {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-no-paper {
//     background-color: #E5E7EB;
//     color: #374151;
//   }

//   .table-toolbar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 20px 24px;
//     background: white;
//     border-bottom: 1px solid var(--border-light);
//   }

//   .table-info {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     font-size: 0.875rem;
//     color: var(--text-secondary);
//   }

//   .table-actions {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .search-box {
//     position: relative;
//     display: flex;
//     align-items: center;
//     background: white;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     padding: 8px 16px;
//     transition: all 0.3s ease;
//     min-width: 300px;
//   }

//   .search-box:focus-within {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px;
//     width: 100%;
//     font-size: 0.875rem;
//     background: transparent;
//   }

//   .filter-select {
//     padding: 10px 16px;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     font-size: 0.875rem;
//     background: white;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     min-width: 150px;
//   }

//   .filter-select:focus {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .empty-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//     text-align: center;
//   }

//   .empty-state-icon {
//     width: 80px;
//     height: 80px;
//     background: #f8fafc;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 20px;
//   }

//   .loading-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//   }

//   .loading-spinner {
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }

//   /* Improved Modal Styles */
//   .modal-backdrop {
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.7);
//     backdrop-filter: blur(12px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1000;
//     animation: fadeIn 0.2s ease;
//     padding: 20px;
//   }

//   .modal-content {
//     background: white;
//     border-radius: 24px;
//     box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
//     animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     display: flex;
//     flex-direction: column;
//     max-height: 90vh;
//     width: 100%;
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(30px) scale(0.95);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0) scale(1);
//     }
//   }

//   .chart-header-actions {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//   }

//   .chart-title-section {
//     flex: 1;
//   }

//   .chart-controls {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .team-button {
//     background: linear-gradient(135deg, #10B981, #059669);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .team-button:hover {
//     background: linear-gradient(135deg, #059669, #047857);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
//   }

//   .manage-button {
//     background: linear-gradient(135deg, #8B5CF6, #7C3AED);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .manage-button:hover {
//     background: linear-gradient(135deg, #7C3AED, #6D28D9);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
//   }

//   /* Chart specific styles */
//   .recharts-wrapper {
//     font-family: 'Inter', sans-serif;
//   }

//   .recharts-legend-wrapper {
//     padding-top: 20px !important;
//   }

//   .recharts-legend-item-text {
//     font-size: 14px !important;
//     font-weight: 500 !important;
//     color: #111318 !important;
//   }

//   .recharts-tooltip-wrapper {
//     z-index: 1000;
//   }

//   .custom-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 12px;
//     padding: 12px 16px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   }

//   .custom-tooltip p {
//     margin: 4px 0;
//     font-size: 14px;
//     font-weight: 500;
//   }

//   /* Donut Chart Styles */
//   .donut-chart-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 24px;
//   }

//   .donut-chart-wrapper {
//     position: relative;
//     width: 200px;
//     height: 200px;
//   }

//   .donut-center-text {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     text-align: center;
//   }

//   .donut-total {
//     font-size: 2rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 4px;
//   }

//   .donut-legend {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     width: 100%;
//     max-width: 300px;
//   }

//   .donut-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 12px 16px;
//     background: #f8fafc;
//     border-radius: 12px;
//     border-left: 4px solid;
//   }

//   .donut-legend-color {
//     width: 16px;
//     height: 16px;
//     border-radius: 4px;
//   }

//   .donut-legend-content {
//     flex: 1;
//   }

//   .donut-legend-value {
//     font-size: 1.25rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-legend-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 2px;
//   }

//   .donut-legend-percentage {
//     font-size: 1rem;
//     font-weight: 600;
//     color: #111318;
//   }

//   .donut-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     padding: 12px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }

//   .donut-tooltip-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .donut-tooltip-color {
//     width: 12px;
//     height: 12px;
//     border-radius: 2px;
//   }

//   .donut-tooltip-text {
//     font-size: 0.875rem;
//     font-weight: 500;
//     color: #111318;
//   }

//   /* Responsive improvements */
//   @media (max-width: 768px) {
//     .table-toolbar {
//       flex-direction: column;
//       gap: 16px;
//       align-items: stretch;
//     }
    
//     .table-actions {
//       flex-direction: column;
//       width: 100%;
//     }
    
//     .search-box {
//       min-width: auto;
//       width: 100%;
//     }
    
//     .filter-select {
//       width: 100%;
//     }
    
//     .table-modern {
//       font-size: 0.75rem;
//     }
    
//     .table-modern th,
//     .table-modern td {
//       padding: 12px 8px;
//     }
//   }
// `;

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approvedPaper: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   pendingPaper: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   noPaper: (
//     <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
//     </svg>
//   ),
// };

// // Reusable Modal Component
// const Modal = ({ children, onClose, size = "md" }) => {
//   const sizeClasses = { 
//     sm: "max-w-md", 
//     md: "max-w-2xl", 
//     lg: "max-w-4xl", 
//     xl: "max-w-6xl",
//     full: "max-w-7xl" 
//   };
  
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div 
//         className={`modal-content w-full ${sizeClasses[size]}`} 
//         onClick={e => e.stopPropagation()}
//       >
//         <button 
//           onClick={onClose} 
//           className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         <div className="flex-1 overflow-hidden rounded-2xl bg-white">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Team Modal with improved design
// const TeamModal = ({ teamData, onClose }) => {
//   const [currentView, setCurrentView] = useState('team');
//   const [currentProof, setCurrentProof] = useState(null);
//   const [proofMember, setProofMember] = useState(null);

//   const handleViewProof = (proofUrl, member) => {
//     setCurrentProof(proofUrl);
//     setProofMember(member);
//     setCurrentView('proof');
//   };

//   const handleBackToTeam = () => {
//     setCurrentView('team');
//     setCurrentProof(null);
//     setProofMember(null);
//   };

//   if (currentView === 'proof') {
//     return (
//       <Modal onClose={onClose} size="xl">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleBackToTeam}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Back to Team
//             </button>
//             <h3 className="text-xl font-bold text-gray-900 flex-1 text-center">
//               Proof Document - {proofMember?.name}
//             </h3>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {currentProof ? (
//             <>
//               <img 
//                 src={currentProof} 
//                 alt="Proof Document" 
//                 className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain mx-auto"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   const errorDiv = e.target.parentNode.querySelector('.image-error');
//                   if (errorDiv) errorDiv.style.display = 'block';
//                 }}
//               />
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{currentProof}</p>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-500 mb-2">Proof URL:</p>
//                 <p className="text-xs break-all">{currentProof}</p>
//               </div>
//               <div className="mt-6 text-center">
//                 <button 
//                   onClick={() => window.open(currentProof, '_blank')}
//                   className="btn btn-primary"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Open in New Tab
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//               <p>No proof document available</p>
//             </div>
//           )}
//         </div>
//       </Modal>
//     );
//   }

//   return (
//     <Modal onClose={onClose} size="xl">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900">
//           Team Members for "{teamData.title}"
//         </h3>
//         <p className="text-sm text-gray-600 mt-1">
//           {Array.isArray(teamData.team) ? `${teamData.team.length} team members` : 'No team members'}
//         </p>
//       </div>
      
//       {Array.isArray(teamData.team) && teamData.team.length ? (
//         <div className="p-1">
//           <div className="overflow-auto max-h-96">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {teamData.team.map((member, i) => (
//                   <tr key={i} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {member.name || "Unnamed"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.email || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.phone || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.designation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.organisation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.gender || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.proofUrl ? (
//                         <button
//                           onClick={() => handleViewProof(member.proofUrl, member)}
//                           className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                           <Eye className="w-3 h-3 mr-1" />
//                           View Proof
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="p-8 text-center text-gray-500">
//           <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//           <p className="text-lg font-medium mb-2">No team members available</p>
//           <p className="text-sm">This paper doesn't have any team members associated with it.</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// // Stat Card
// const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
//   <div 
//     className="stat-card glass-card rounded-2xl p-6"
//     style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
//   >
//     <div className="flex items-start justify-between mb-4">
//       <div className="flex-1">
//         <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6c757d' }}>
//           {title}
//         </p>
//         <div className="metric-value">{value}</div>
//       </div>
//       <div className="stat-icon-wrapper">
//         <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
//           {icon}
//         </div>
//       </div>
//     </div>
//     <p className="text-xs" style={{ color: '#6c757d' }}>{hint}</p>
//   </div>
// );

// // Chart Card
// const ChartCard = ({ title, subtitle, children, controls }) => (
//   <div className="chart-container">
//     <div className="chart-header">
//       <div className="chart-header-actions">
//         <div className="chart-title-section">
//           <h3 className="text-lg font-bold mb-1" style={{ color: '#111318' }}>{title}</h3>
//           {subtitle && <p className="text-xs" style={{ color: '#6c757d' }}>{subtitle}</p>}
//         </div>
//         {controls && (
//           <div className="chart-controls">
//             {controls}
//           </div>
//         )}
//       </div>
//     </div>
//     <div className="chart-body">
//       {children}
//     </div>
//   </div>
// );

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
//   const maxVisiblePages = 5;
  
//   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
//   if (endPage - startPage + 1 < maxVisiblePages) {
//     startPage = Math.max(1, endPage - maxVisiblePages + 1);
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
//       <div className="text-sm" style={{ color: '#6c757d' }}>
//         Showing page {currentPage} of {totalPages}
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsLeft className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>
        
//         {pages.map(page => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`btn btn-sm ${
//               currentPage === page
//                 ? 'btn-primary'
//                 : 'btn-outline'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
        
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Sortable Table Header Component
// const SortableHeader = ({ children, field, sortConfig, onSort }) => {
//   const isSorted = sortConfig.key === field;
//   const isAscending = sortConfig.direction === 'asc';

//   const handleClick = () => {
//     onSort(field);
//   };

//   return (
//     <th 
//       className={isSorted ? 'sorted' : ''}
//       onClick={handleClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className="sortable flex items-center gap-2">
//         {children}
//         <span className="sort-icon">
//           {isSorted ? (
//             isAscending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//           ) : (
//             <ArrowUpDown className="w-4 h-4" />
//           )}
//         </span>
//       </div>
//     </th>
//   );
// };

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;
  
//   return (
//     <div className="custom-tooltip">
//       <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
//       {payload.map((entry, index) => (
//         <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
//           {entry.name}: {entry.value}
//         </p>
//       ))}
//     </div>
//   );
// };

// // Donut Chart Component
// const DonutChart = ({ data, title, subtitle }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
  
//   const CustomTooltip = ({ active, payload }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const data = payload[0].payload;
//     return (
//       <div className="donut-tooltip">
//         <div className="donut-tooltip-item">
//           <div 
//             className="donut-tooltip-color" 
//             style={{ backgroundColor: data.color }}
//           />
//           <span className="donut-tooltip-text">
//             {data.name}: {data.value} ({((data.value / total) * 100).toFixed(1)}%)
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const renderLegend = () => (
//     <div className="donut-legend">
//       {data.map((entry, index) => (
//         <div 
//           key={entry.name}
//           className="donut-legend-item"
//           style={{ borderLeftColor: entry.color }}
//         >
//           <div 
//             className="donut-legend-color"
//             style={{ backgroundColor: entry.color }}
//           />
//           <div className="donut-legend-content">
//             <div className="donut-legend-value">{entry.value}</div>
//             <div className="donut-legend-label">{entry.name}</div>
//           </div>
//           <div className="donut-legend-percentage">
//             {((entry.value / total) * 100).toFixed(1)}%
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <ChartCard title={title} subtitle={subtitle}>
//       <div className="donut-chart-container">
//         <div className="donut-chart-wrapper">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={70}
//                 outerRadius={90}
//                 paddingAngle={2}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={450}
//               >
//                 {data.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.color}
//                     stroke="white"
//                     strokeWidth={2}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="donut-center-text">
//             <div className="donut-total">{total}</div>
//             <div className="donut-label">Total</div>
//           </div>
//         </div>
//         {renderLegend()}
//       </div>
//     </ChartCard>
//   );
// };

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <ChartCard title="Paper Submission Trend" subtitle="Daily paper submission pattern">
//     {data.length > 0 ? (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//           <XAxis 
//             dataKey="date" 
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <YAxis 
//             allowDecimals={false}
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Line
//             type="monotone"
//             dataKey="count"
//             name="Papers"
//             stroke="#1976D2"
//             strokeWidth={3}
//             dot={{ r: 4, strokeWidth: 2, stroke: '#1976D2', fill: 'white' }}
//             activeDot={{ r: 6, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     ) : (
//       <div className="flex items-center justify-center h-64">
//         <p style={{ color: '#6c757d' }}>No trend data available</p>
//       </div>
//     )}
//   </ChartCard>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <ChartCard title="Paper Status Snapshot" subtitle="Current status overview">
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={[
//           {
//             name: "Papers",
//             approvedPaper: stats.approvedPaper,
//             pending: stats.pending,
//             rejected: stats.rejected,
//             noPaper: stats.noPaper,
//           },
//         ]}
//         margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//         <XAxis 
//           dataKey="name" 
//           hide 
//         />
//         <YAxis 
//           allowDecimals={false}
//           tick={{ fill: '#6c757d', fontSize: 12 }}
//           axisLine={{ stroke: '#e2e8f0' }}
//           tickLine={false}
//         />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" radius={[4, 4, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   </ChartCard>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const FinalPaperSupport = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approvedPaper: 0,
//     noPaper: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [paperModalData, setPaperModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//   const [isDiscountApplied, setIsDiscountApplied] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [downloading, setDownloading] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     if (url.startsWith('/uploads/')) {
//       return `https://s3conference.ksrce.ac.in${url}`;
//     }
    
//     if (url.includes('proof_')) {
//       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
//     }
    
//     if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
//       return `https://${url.replace(/^\/+/, '')}`;
//     }
    
//     return url;
//   };

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     const submittedOrPending = ["submitted", "correction required"]; 
//     setStats({
//       total: data.length,
//       approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
//       noPaper: data.filter((d) => d.paperStatus === "no paper").length,
//       rejected: data.filter((d) => d.paperStatus === "rejected").length,
//       pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
//     });
//   }, []);

//   /**
//    * Computes the submission trend based on the creation date.
//    */
//   const computeTrend = useCallback((data) => {
//     const groups = {};
//     data.forEach((d) => {
//       const date = new Date(d.createdAt).toISOString().split("T")[0];
//       groups[date] = (groups[date] || 0) + 1;
//     });
//     const arr = Object.entries(groups)
//       .map(([date, count]) => ({ date, count }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTrend(arr);
//   }, []);

//   // Format each user with proper proof URL formatting
//   const formatUser = (item) => {
//     const isDiscount =
//       item.workflow?.discountApplied === true ||
//       item.workflow?.discount === true ||
//       item.workflow?.discountApplied === "true" ||
//       item.workflow?.discount === "true" ||
//       (item.workflow?.discount || 0) > 0;

//     const finalPaperLink = 
//       item.workflow?.finalPaperUrl ||
//       item.registration?.paperUrl ||
//       null;

//     // Format ALL team members including the main author
//     const formattedTeam = Array.isArray(item.registration?.participants) 
//       ? item.registration.participants.map(member => ({
//           name: member.name || "Unknown",
//           email: member.email || "-",
//           phone: member.phone || "-",
//           designation: member.designation || "-",
//           organisation: member.organisation || "-",
//           gender: member.gender || "-",
//           proofUrl: formatProofUrl(member.proofUrl),
//         }))
//       : [];

//     return {
//       id: item._id,
//       userId: item.userId || "N/A",
//       authorName: item.name || "Unknown",
//       email: item.registration?.participants?.[0]?.email || "-",
//       mobile: item.registration?.participants?.[0]?.phone || "-",
//       uniqueId: item.registration?.uniqueId || "-",
//       track: item.registration?.track || "-",
//       presentationMode: item.registration?.presentationMode || "-",
//       title: item.registration?.abstractTitle || "No Title",
//       content: item.registration?.abstractContent || "No content available",
//       abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
//       paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
//       amountPaid: Number(item.workflow?.amountPaid || 0),
//       discount: item.workflow?.discount ?? 0,
//       discountApplied: isDiscount,
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//       team: formattedTeam,
//       finalPaperUrl: finalPaperLink,
//       country: item.registration?.country || "-",
//     };
//   };

//   // Fetch approved abstracts
//   const fetchRows = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatUser);
//       console.log("Formatted final paper data:", formatted);
      
//       // Filter only approved abstracts
//       const approved = formatted.filter((f) => 
//         f.abstractStatus === "approved"
//       );
      
//       setRows(approved);
//       computeStats(approved);
//       computeTrend(approved);
//       setCurrentPage(1); // Reset to first page when data changes
//     } catch (err) {
//       console.error("Error fetching:", err);
//       setRows([]);
//       setStats({
//         total: 0,
//         approvedPaper: 0,
//         noPaper: 0,
//         rejected: 0,
//         pending: 0,
//       });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchRows();
//   }, [fetchRows, refreshTrigger]);

//   // Update local state after successful API call
//   const updatePaperLocal = useCallback((id, newStatus, discountBoolean) => {
//     setRows((prevRows) => {
//       const updatedRows = prevRows.map((row) => {
//         if (row.id === id) {
//           return {
//             ...row,
//             paperStatus: newStatus.toLowerCase(),
//             discountApplied: discountBoolean,
//             discount: discountBoolean ? 1 : 0,
//           };
//         }
//         return row;
//       });
      
//       computeStats(updatedRows);
//       computeTrend(updatedRows);

//       return updatedRows;
//     });
//   }, [computeStats, computeTrend]);

//   // Sorting function
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     let filtered = rows.filter((r) => {
//       const matchesSearch =
//         r.authorName.toLowerCase().includes(q) ||
//         r.email.toLowerCase().includes(q) ||
//         r.uniqueId.toLowerCase().includes(q) ||
//         r.title.toLowerCase().includes(q) ||
//         r.userId.toLowerCase().includes(q) ||
//         r.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];

//         if (sortConfig.key === 'createdAt') {
//           aValue = new Date(aValue);
//           bValue = new Date(bValue);
//         } else {
//           aValue = String(aValue || '').toLowerCase();
//           bValue = String(bValue || '').toLowerCase();
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   }, [rows, searchTerm, statusFilter, sortConfig]);

//   // Pagination logic
//   const paginatedRows = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSearchedRows.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSearchedRows, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredAndSearchedRows.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Status Badge Component
//   const getStatusBadge = (status) => {
//     const statusMap = {
//       approved: { class: "status-indicator-approved", label: "Approved" },
//       rejected: { class: "status-indicator-rejected", label: "Rejected" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//       "correction required": { class: "status-indicator-correction-required", label: "Correction Required" },
//       submitted: { class: "status-indicator-submitted", label: "Submitted" },
//       "no paper": { class: "status-indicator-no-paper", label: "No Paper" },
//       "under review": { class: "status-indicator-under-review", label: "Under Review" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedRows.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedRows.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.abstractStatus,
//       "Paper Status": abs.paperStatus,
//       "Payment Status": abs.paymentStatus,
//       "Amount Paid": abs.amountPaid,
//       "Discount Applied": abs.discountApplied ? "Yes" : "No",
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//       "Final Paper Link": abs.finalPaperUrl || "N/A",
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
//     XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Download function to prevent corruption
//   const handleForceDownload = async (fileUrl, userId) => {
//     if (!fileUrl) return alert("No file found to download.");

//     try {
//       setDownloading(true);
      
//       // Format the download URL properly
//       let downloadUrl = fileUrl;
//       if (!fileUrl.startsWith('http')) {
//         downloadUrl = `https://s3conference.ksrce.ac.in${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
//       }
      
//       console.log("⬇️ Downloading:", downloadUrl);

//       const customFileName = `Final_Paper_${userId}.docx`;

//       const response = await fetch(downloadUrl);
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = customFileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("❌ Download error:", err);
//       alert("Failed to download file. Please try again or check the file URL.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // Handle View Proof with robust error handling
//   const handleViewProof = async (proofUrl) => {
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     let finalUrl = proofUrl;
    
//     if (proofUrl.startsWith('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
//     }
    
//     if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
//     }

//     console.log("Attempting to load proof from:", finalUrl);

//     try {
//       const response = await fetch(finalUrl, { method: 'HEAD' });
//       if (response.ok) {
//         setImagePreviewUrl(finalUrl);
//       } else {
//         throw new Error(`HTTP ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Failed to load proof image:", error);
//       setImagePreviewUrl(finalUrl);
      
//       setTimeout(() => {
//         const errorDiv = document.querySelector('.image-error');
//         if (errorDiv && errorDiv.style.display === 'block') {
//           alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
//         }
//       }, 500);
//     }
//   };

//   // FIXED: Handle Paper Status Update with CORRECT field names matching backend
//   const handlePaperStatusUpdate = async (newStatus, reason = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData for all requests
//       const formData = new FormData();
      
//       // CRITICAL FIX: Use the EXACT field names that backend expects
//       formData.append("paperAction", newStatus.toLowerCase()); // Backend expects "paperAction" not "paperStatus"
      
//       // Handle discount - use the correct field names
//       const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
//       formData.append("discountApplied", finalDiscount);
//       formData.append("discount", finalDiscount);
      
//       // Add rejection reason if provided - use correct field name (lowercase 'r')
//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         formData.append("paperrejectedReason", reason); // Note: lowercase 'r' in backend
//       }
      
//       // Add file if provided
//       if (file) {
//         formData.append("file", file);
//       }

//       console.log("📤 Sending update with:", {
//         paperAction: newStatus.toLowerCase(),
//         discountApplied: finalDiscount,
//         discount: finalDiscount,
//         paperrejectedReason: newStatus.toLowerCase() === "rejected" && reason ? reason : "none",
//         hasFile: !!file
//       });

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

//       const response = await axios.put(API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("📥 Server response:", response.data);

//       if (response.data?.success) {
//         alert(`✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " with discount removed."}`);
//         updatePaperLocal(paperModalData.id, newStatus, finalDiscount);
//         setPaperModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setSelectedFile(null);
//         setIsDiscountApplied(false);
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating paper status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update paper status.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle Rejection Submit
//   const handleRejectionSubmit = () => {
//     if (!rejectionReason.trim()) {
//       alert("Please provide a reason for rejection.");
//       return;
//     }
//     handlePaperStatusUpdate("rejected", rejectionReason.trim(), isDiscountApplied, selectedFile);
//   };

//   // Open Paper Management Modal - FIXED: Initialize discount state properly
//   const openPaperModal = (row) => {
//     setPaperModalData(row);
//     setIsDiscountApplied(row.discountApplied || false);
//     setSelectedFile(null);
//   };

//   // Donut Chart Data
//   const donutChartData = [
//     { name: "Approved", value: stats.approvedPaper, color: "#10B981" },
//     { name: "Rejected", value: stats.rejected, color: "#EF4444" },
//     { name: "Pending/Correction", value: stats.pending, color: "#F59E0B" },
//     { name: "No Paper", value: stats.noPaper, color: "#6B7280" },
//   ].filter(item => item.value > 0);

//   return (
//     <>
//       <style>{finalPaperStyles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Final Paper Support
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
//                 <BarChart3 className="w-4 h-4" />
//                 Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//               </p>
//             </div>
//             <button
//               onClick={fetchRows}
//               className="btn btn-secondary self-start lg:self-auto"
//               disabled={loading}
//             >
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//               Refresh Data
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             <StatCard 
//               icon={icons.total}
//               title="Total Abstracts (Approved)" 
//               value={stats.total.toLocaleString()}
//               hint="All approved abstracts"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//             <StatCard 
//               icon={icons.approvedPaper}
//               title="Papers Approved" 
//               value={stats.approvedPaper.toLocaleString()}
//               hint="Final papers approved"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={icons.pendingPaper}
//               title="Submitted/Correction" 
//               value={stats.pending.toLocaleString()}
//               hint="Awaiting review or correction"
//               color="#F59E0B"
//               colorDark="#D97706"
//             />
//             <StatCard 
//               icon={icons.rejected}
//               title="Papers Rejected" 
//               value={stats.rejected.toLocaleString()}
//               hint="Papers not accepted"
//               color="#EF4444"
//               colorDark="#DC2626"
//             />
//             <StatCard 
//               icon={icons.noPaper}
//               title="No Paper Uploaded" 
//               value={stats.noPaper.toLocaleString()}
//               hint="No paper submitted yet"
//               color="#6B7280"
//               colorDark="#4B5563"
//             />
//           </div>

//           {/* Charts - Updated to match AbstractSupport styling */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <DonutChart 
//               title="Paper Status Distribution"
//               subtitle="Breakdown of paper submission statuses"
//               data={donutChartData}
//             />
//             <StatusSnapshotChart stats={stats} />
//           </div>

//           {/* Trend Chart */}
//           <PaperTrendChart data={trend} />

//           {/* Enhanced Table Section */}
//           <div className="table-container">
//             {/* Table Header */}
//             <div className="table-toolbar">
//               <div className="table-info">
//                 <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
//                   Final Paper Submissions
//                 </h3>
//                 <span style={{ color: '#6c757d' }}>
//                   {filteredAndSearchedRows.length} records found
//                 </span>
//               </div>
//               <div className="table-actions">
//                 <div className="search-box">
//                   <Search className="w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by ID, name, email, or title..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="filter-select"
//                 >
//                   <option value="All">All Paper Statuses</option>
//                   <option value="submitted">Submitted</option>
//                   <option value="correction required">Correction Required</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="no paper">No Paper</option>
//                 </select>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-success btn-sm"
//                   disabled={filteredAndSearchedRows.length === 0}
//                 >
//                   <Download className="w-4 h-4" />
//                   Export
//                 </button>
//               </div>
//             </div>

//             {/* Table Content */}
//             {loading ? (
//               <div className="loading-state">
//                 <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1976D2' }} />
//                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading papers...</span>
//               </div>
//             ) : filteredAndSearchedRows.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
//                   {rows.length === 0 ? 'No papers found' : 'No matching papers'}
//                 </h4>
//                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
//                   {rows.length === 0 
//                     ? 'There are no paper submissions yet.' 
//                     : 'Try adjusting your search or filter criteria.'
//                   }
//                 </p>
//                 {rows.length === 0 && (
//                   <button 
//                     onClick={fetchRows}
//                     className="btn btn-primary"
//                   >
//                     <RefreshCw className="w-4 h-4 mr-2" />
//                     Refresh Data
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="table-modern">
//                     <thead>
//                       <tr>
//                         <SortableHeader field="userId" sortConfig={sortConfig} onSort={handleSort}>
//                           User ID
//                         </SortableHeader>
//                         <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
//                           Author Name
//                         </SortableHeader>
//                         <th>Email</th>
//                         <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
//                           Title
//                         </SortableHeader>
//                         <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
//                           Track
//                         </SortableHeader>
//                         <SortableHeader field="paperStatus" sortConfig={sortConfig} onSort={handleSort}>
//                           Paper Status
//                         </SortableHeader>
//                         <th>Discount</th>
//                         <th>Team</th>
//                         <th style={{ textAlign: 'center' }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedRows.map((r) => (
//                         <tr key={r.id}>
//                           <td className="font-mono text-xs" style={{ color: '#475569' }}>
//                             {r.userId}
//                           </td>
//                           <td>
//                             <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
//                               {r.authorName}
//                             </div>
//                           </td>
//                           <td>
//                             <div className="text-sm" style={{ color: '#475569' }}>
//                               {r.email}
//                             </div>
//                           </td>
//                           <td>
//                             <div 
//                               className="font-medium"
//                               title={r.title}
//                               style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
//                             >
//                               {r.title}
//                             </div>
//                           </td>
//                           <td>
//                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                               {r.track}
//                             </span>
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {getStatusBadge(r.paperStatus)}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {r.discountApplied ? (
//                               <span className="text-emerald-600 font-semibold text-sm">
//                                 Yes
//                               </span>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>No</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {Array.isArray(r.team) && r.team.length ? (
//                               <button
//                                 onClick={() => setTeamModalData(r)}
//                                 className="team-button"
//                               >
//                                 <Users className="w-4 h-4" /> 
//                                 View ({r.team.length})
//                               </button>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             <button
//                               onClick={() => openPaperModal(r)}
//                               className="manage-button"
//                             >
//                               <FileText className="w-4 h-4" />
//                               Manage
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Team Modal */}
//       {teamModalData && (
//         <TeamModal 
//           teamData={teamModalData} 
//           onClose={() => setTeamModalData(null)}
//         />
//       )}

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">
//               Paper Management: {paperModalData.authorName}
//             </h2>
//           </div>
          
//           <div className="flex-1 overflow-y-auto max-h-96">
//             <div className="p-6 space-y-6">
//               <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
//                 <span className="font-semibold">Current Paper Status:</span>
//                 {getStatusBadge(paperModalData.paperStatus)}
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-bold mb-3 text-gray-900">Paper Details</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Track:</strong> {paperModalData.track}</div>
//                   <div><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</div>
//                   <div><strong>Email:</strong> {paperModalData.email}</div>
//                   <div><strong>Mobile:</strong> {paperModalData.mobile}</div>
//                   <div><strong>Country:</strong> {paperModalData.country}</div>
//                   <div className="flex items-center gap-2">
//                     <strong>Abstract Status:</strong> 
//                     {getStatusBadge(paperModalData.abstractStatus)}
//                   </div>
//                   <div><strong>Current Discount:</strong> 
//                     <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                       {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Final Paper Download */}
//               <div className="p-4 border rounded-xl flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Uploaded Paper:</span>
//                 {paperModalData.finalPaperUrl ? (
//                   <button
//                     onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                     disabled={downloading}
//                     className="btn btn-primary btn-sm"
//                   >
//                     {downloading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <>
//                         <Download className="w-4 h-4" /> Download Paper
//                       </>
//                     )}
//                   </button>
//                 ) : (
//                   <span className="text-red-500 text-sm">No Paper Uploaded</span>
//                 )}
//               </div>

//               {/* Discount Section */}
//               <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Discount Status
//                 </label>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="discountApplied"
//                     checked={isDiscountApplied}
//                     onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                     className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                   />
//                   <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                     Apply Discount
//                   </label>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {isDiscountApplied ? 
//                     "Discount will be applied when you update the status." : 
//                     "No discount will be applied when you update the status."
//                   }
//                 </p>
//               </div>

//               {/* File Upload Section */}
//               <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Upload Correction/Approval File (Optional)
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                   className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                   accept=".doc,.docx,.pdf"
//                 />
//                 {selectedFile && (
//                   <p className="text-xs text-gray-500 mt-2">File selected: {selectedFile.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Actions Footer - Fixed at bottom */}
//           <div className="p-6 border-t bg-gray-50">
//             <div className="flex flex-col sm:flex-row justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="btn btn-outline"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="btn btn-outline"
//               >
//                 <Clock className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Correction Required"}
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="btn btn-success"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Provide Rejection Reason</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//                 <FileText className="w-8 h-8 text-orange-500" />
//               </div>
//               <p className="text-gray-500">
//                 Please provide a reason for rejecting this paper.
//               </p>
//             </div>
            
//             <textarea
//               rows="4"
//               className="w-full border rounded-xl p-4 mb-6 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="btn btn-outline flex-1"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="btn btn-primary flex-1"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Paper
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <Modal onClose={() => setImagePreviewUrl(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Proof Document Preview</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="max-h-96 overflow-auto flex justify-center">
//               {imagePreviewUrl ? (
//                 <img 
//                   src={imagePreviewUrl} 
//                   alt="Proof Document" 
//                   className="max-w-full h-auto rounded-lg shadow-md object-contain"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     const errorDiv = e.target.parentNode.querySelector('.image-error');
//                     if (errorDiv) errorDiv.style.display = 'block';
//                   }}
//                 />
//               ) : (
//                 <div className="text-center text-gray-500 py-8">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   No image available
//                 </div>
//               )}
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{imagePreviewUrl}</p>
//               </div>
//             </div>
//             <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <span className="text-sm text-gray-500 break-all flex-1 text-center sm:text-left">
//                 {imagePreviewUrl}
//               </span>
//               <button 
//                 onClick={() => window.open(imagePreviewUrl, '_blank')}
//                 className="btn btn-primary whitespace-nowrap"
//               >
//                 <Eye className="w-4 h-4" />
//                 Open in New Tab
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default FinalPaperSupport;

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   Eye,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   RefreshCw,
//   BarChart3,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
//   MessageSquare,
// } from "lucide-react";

// /* ----------------------------- Updated Styles ----------------------------- */
// const finalPaperStyles = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//   * {
//     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//   }

//   :root {
//     --brand-orange: #F57C00;
//     --brand-orange-dark: #E65100;
//     --brand-blue-dark: #0D47A1;
//     --brand-blue-primary: #1976D2;
//     --brand-blue-light: #E3F2FD;
//     --brand-red: #D32F2F;
//     --text-primary: #111318;
//     --text-secondary: #6c757d;
//     --surface-light: #f8f9fa;
//     --surface-dark: #e9ecef;
//     --white: #FFFFFF;
//     --border-light: #e2e8f0;
//   }

//   body {
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }

//   .glass-card {
//     background: rgba(255, 255, 255, 0.95);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(255, 255, 255, 0.8);
//     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .glass-card:hover {
//     box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
//     transform: translateY(-4px);
//   }

//   .stat-card {
//     position: relative;
//     overflow: hidden;
//     background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
//     border: 1px solid rgba(0, 0, 0, 0.06);
//   }

//   .stat-card::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .stat-card:hover::before {
//     opacity: 1;
//   }

//   .stat-icon-wrapper {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 56px;
//     height: 56px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   }

//   .stat-icon-wrapper::after {
//     content: '';
//     position: absolute;
//     inset: -2px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     opacity: 0.2;
//     filter: blur(8px);
//   }

//   .metric-value {
//     font-size: 2rem;
//     font-weight: 700;
//     letter-spacing: -0.02em;
//     background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .chart-container {
//     background: white;
//     border-radius: 24px;
//     border: 1px solid rgba(0, 0, 0, 0.06);
//     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//     transition: all 0.4s ease;
//   }

//   .chart-container:hover {
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
//   }

//   .chart-header {
//     padding: 24px 28px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.06);
//     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
//   }

//   .chart-body {
//     padding: 28px;
//   }

//   .btn {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     padding: 12px 24px;
//     border: none;
//     border-radius: 12px;
//     font-size: 0.9375rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
//     text-decoration: none;
//   }

//   .btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .btn:hover::before {
//     opacity: 1;
//   }

//   .btn-primary {
//     background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
//   }

//   .btn-primary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-secondary {
//     background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//   }

//   .btn-secondary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-success {
//     background: linear-gradient(135deg, #10B981 0%, #059669 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
//   }

//   .btn-success:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-outline {
//     background: transparent;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     color: #111318;
//     box-shadow: none;
//   }

//   .btn-outline:hover:not(:disabled) {
//     background: rgba(0, 0, 0, 0.02);
//     border-color: rgba(0, 0, 0, 0.2);
//     transform: translateY(-1px);
//   }

//   .btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none !important;
//     box-shadow: none !important;
//   }

//   .btn-sm {
//     padding: 8px 16px;
//     font-size: 0.875rem;
//   }

//   .header-gradient {
//     background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   /* Enhanced Table Styles */
//   .table-container {
//     background: white;
//     border-radius: 16px;
//     border: 1px solid var(--border-light);
//     box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//   }

//   .table-modern {
//     width: 100%;
//     border-collapse: separate;
//     border-spacing: 0;
//     background: white;
//   }

//   .table-modern thead {
//     background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }

//   .table-modern th {
//     padding: 16px 20px;
//     font-size: 0.75rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: #64748b;
//     border-bottom: 2px solid #e2e8f0;
//     background: inherit;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     user-select: none;
//   }

//   .table-modern th:hover {
//     background: rgba(241, 245, 249, 0.8);
//   }

//   .table-modern th.sortable {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .table-modern th .sort-icon {
//     opacity: 0.4;
//     transition: opacity 0.2s ease;
//   }

//   .table-modern th:hover .sort-icon {
//     opacity: 0.7;
//   }

//   .table-modern th.sorted .sort-icon {
//     opacity: 1;
//     color: var(--brand-blue-primary);
//   }

//   .table-modern tbody tr {
//     border-bottom: 1px solid #f1f5f9;
//     position: relative;
//   }

//   .table-modern tbody tr:last-child {
//     border-bottom: none;
//   }

//   .table-modern td {
//     padding: 18px 20px;
//     color: #334155;
//     font-size: 0.875rem;
//     font-weight: 500;
//     border-bottom: 1px solid #f8fafc;
//   }

//   .table-modern tbody tr:last-child td {
//     border-bottom: none;
//   }

//   .status-indicator {
//     display: inline-flex;
//     align-items: center;
//     padding: 4px 10px;
//     border-radius: 9999px;
//     font-weight: 600;
//     font-size: 0.75rem;
//     text-transform: capitalize;
//     background-color: #E5E7EB;
//     color: #374151;
//     cursor: default;
//     pointer-events: none;
//   }

//   .status-indicator-approved {
//     background-color: #D1FAE5;
//     color: #065F46;
//   }
  
//   .status-indicator-rejected {
//     background-color: #FEE2E2;
//     color: #991B1B;
//   }
  
//   .status-indicator-pending {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }
  
//   .status-indicator-under-review {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-correction-required {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }

//   .status-indicator-submitted {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-no-paper {
//     background-color: #E5E7EB;
//     color: #374151;
//   }

//   .table-toolbar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 20px 24px;
//     background: white;
//     border-bottom: 1px solid var(--border-light);
//   }

//   .table-info {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     font-size: 0.875rem;
//     color: var(--text-secondary);
//   }

//   .table-actions {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .search-box {
//     position: relative;
//     display: flex;
//     align-items: center;
//     background: white;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     padding: 8px 16px;
//     transition: all 0.3s ease;
//     min-width: 300px;
//   }

//   .search-box:focus-within {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px;
//     width: 100%;
//     font-size: 0.875rem;
//     background: transparent;
//   }

//   .filter-select {
//     padding: 10px 16px;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     font-size: 0.875rem;
//     background: white;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     min-width: 150px;
//   }

//   .filter-select:focus {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .empty-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//     text-align: center;
//   }

//   .empty-state-icon {
//     width: 80px;
//     height: 80px;
//     background: #f8fafc;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 20px;
//   }

//   .loading-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//   }

//   .loading-spinner {
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }

//   /* Improved Modal Styles */
//   .modal-backdrop {
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.7);
//     backdrop-filter: blur(12px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1000;
//     animation: fadeIn 0.2s ease;
//     padding: 20px;
//   }

//   .modal-content {
//     background: white;
//     border-radius: 24px;
//     box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
//     animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     display: flex;
//     flex-direction: column;
//     max-height: 90vh;
//     width: 100%;
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(30px) scale(0.95);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0) scale(1);
//     }
//   }

//   .chart-header-actions {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//   }

//   .chart-title-section {
//     flex: 1;
//   }

//   .chart-controls {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .team-button {
//     background: linear-gradient(135deg, #10B981, #059669);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .team-button:hover {
//     background: linear-gradient(135deg, #059669, #047857);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
//   }

//   .manage-button {
//     background: linear-gradient(135deg, #8B5CF6, #7C3AED);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .manage-button:hover {
//     background: linear-gradient(135deg, #7C3AED, #6D28D9);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
//   }

//   /* Chart specific styles */
//   .recharts-wrapper {
//     font-family: 'Inter', sans-serif;
//   }

//   .recharts-legend-wrapper {
//     padding-top: 20px !important;
//   }

//   .recharts-legend-item-text {
//     font-size: 14px !important;
//     font-weight: 500 !important;
//     color: #111318 !important;
//   }

//   .recharts-tooltip-wrapper {
//     z-index: 1000;
//   }

//   .custom-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 12px;
//     padding: 12px 16px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   }

//   .custom-tooltip p {
//     margin: 4px 0;
//     font-size: 14px;
//     font-weight: 500;
//   }

//   /* Donut Chart Styles */
//   .donut-chart-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 24px;
//   }

//   .donut-chart-wrapper {
//     position: relative;
//     width: 200px;
//     height: 200px;
//   }

//   .donut-center-text {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     text-align: center;
//   }

//   .donut-total {
//     font-size: 2rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 4px;
//   }

//   .donut-legend {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     width: 100%;
//     max-width: 300px;
//   }

//   .donut-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 12px 16px;
//     background: #f8fafc;
//     border-radius: 12px;
//     border-left: 4px solid;
//   }

//   .donut-legend-color {
//     width: 16px;
//     height: 16px;
//     border-radius: 4px;
//   }

//   .donut-legend-content {
//     flex: 1;
//   }

//   .donut-legend-value {
//     font-size: 1.25rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-legend-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 2px;
//   }

//   .donut-legend-percentage {
//     font-size: 1rem;
//     font-weight: 600;
//     color: #111318;
//   }

//   .donut-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     padding: 12px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }

//   .donut-tooltip-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .donut-tooltip-color {
//     width: 12px;
//     height: 12px;
//     border-radius: 2px;
//   }

//   .donut-tooltip-text {
//     font-size: 0.875rem;
//     font-weight: 500;
//     color: #111318;
//   }

//   /* Responsive improvements */
//   @media (max-width: 768px) {
//     .table-toolbar {
//       flex-direction: column;
//       gap: 16px;
//       align-items: stretch;
//     }
    
//     .table-actions {
//       flex-direction: column;
//       width: 100%;
//     }
    
//     .search-box {
//       min-width: auto;
//       width: 100%;
//     }
    
//     .filter-select {
//       width: 100%;
//     }
    
//     .table-modern {
//       font-size: 0.75rem;
//     }
    
//     .table-modern th,
//     .table-modern td {
//       padding: 12px 8px;
//     }
//   }
// `;

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approvedPaper: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   pendingPaper: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   noPaper: (
//     <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
//     </svg>
//   ),
// };

// // Reusable Modal Component
// const Modal = ({ children, onClose, size = "md" }) => {
//   const sizeClasses = { 
//     sm: "max-w-md", 
//     md: "max-w-2xl", 
//     lg: "max-w-4xl", 
//     xl: "max-w-6xl",
//     full: "max-w-7xl" 
//   };
  
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div 
//         className={`modal-content w-full ${sizeClasses[size]}`} 
//         onClick={e => e.stopPropagation()}
//       >
//         <button 
//           onClick={onClose} 
//           className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         <div className="flex-1 overflow-hidden rounded-2xl bg-white">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Team Modal with improved design
// const TeamModal = ({ teamData, onClose }) => {
//   const [currentView, setCurrentView] = useState('team');
//   const [currentProof, setCurrentProof] = useState(null);
//   const [proofMember, setProofMember] = useState(null);

//   const handleViewProof = (proofUrl, member) => {
//     setCurrentProof(proofUrl);
//     setProofMember(member);
//     setCurrentView('proof');
//   };

//   const handleBackToTeam = () => {
//     setCurrentView('team');
//     setCurrentProof(null);
//     setProofMember(null);
//   };

//   if (currentView === 'proof') {
//     return (
//       <Modal onClose={onClose} size="xl">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleBackToTeam}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Back to Team
//             </button>
//             <h3 className="text-xl font-bold text-gray-900 flex-1 text-center">
//               Proof Document - {proofMember?.name}
//             </h3>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {currentProof ? (
//             <>
//               <img 
//                 src={currentProof} 
//                 alt="Proof Document" 
//                 className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain mx-auto"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   const errorDiv = e.target.parentNode.querySelector('.image-error');
//                   if (errorDiv) errorDiv.style.display = 'block';
//                 }}
//               />
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{currentProof}</p>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-500 mb-2">Proof URL:</p>
//                 <p className="text-xs break-all">{currentProof}</p>
//               </div>
//               <div className="mt-6 text-center">
//                 <button 
//                   onClick={() => window.open(currentProof, '_blank')}
//                   className="btn btn-primary"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Open in New Tab
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//               <p>No proof document available</p>
//             </div>
//           )}
//         </div>
//       </Modal>
//     );
//   }

//   return (
//     <Modal onClose={onClose} size="xl">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900">
//           Team Members for "{teamData.title}"
//         </h3>
//         <p className="text-sm text-gray-600 mt-1">
//           {Array.isArray(teamData.team) ? `${teamData.team.length} team members` : 'No team members'}
//         </p>
//       </div>
      
//       {Array.isArray(teamData.team) && teamData.team.length ? (
//         <div className="p-1">
//           <div className="overflow-auto max-h-96">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {teamData.team.map((member, i) => (
//                   <tr key={i} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {member.name || "Unnamed"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.email || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.phone || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.designation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.organisation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.gender || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.proofUrl ? (
//                         <button
//                           onClick={() => handleViewProof(member.proofUrl, member)}
//                           className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                           <Eye className="w-3 h-3 mr-1" />
//                           View Proof
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="p-8 text-center text-gray-500">
//           <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//           <p className="text-lg font-medium mb-2">No team members available</p>
//           <p className="text-sm">This paper doesn't have any team members associated with it.</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// // Stat Card
// const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
//   <div 
//     className="stat-card glass-card rounded-2xl p-6"
//     style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
//   >
//     <div className="flex items-start justify-between mb-4">
//       <div className="flex-1">
//         <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6c757d' }}>
//           {title}
//         </p>
//         <div className="metric-value">{value}</div>
//       </div>
//       <div className="stat-icon-wrapper">
//         <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
//           {icon}
//         </div>
//       </div>
//     </div>
//     <p className="text-xs" style={{ color: '#6c757d' }}>{hint}</p>
//   </div>
// );

// // Chart Card
// const ChartCard = ({ title, subtitle, children, controls }) => (
//   <div className="chart-container">
//     <div className="chart-header">
//       <div className="chart-header-actions">
//         <div className="chart-title-section">
//           <h3 className="text-lg font-bold mb-1" style={{ color: '#111318' }}>{title}</h3>
//           {subtitle && <p className="text-xs" style={{ color: '#6c757d' }}>{subtitle}</p>}
//         </div>
//         {controls && (
//           <div className="chart-controls">
//             {controls}
//           </div>
//         )}
//       </div>
//     </div>
//     <div className="chart-body">
//       {children}
//     </div>
//   </div>
// );

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
//   const maxVisiblePages = 5;
  
//   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
//   if (endPage - startPage + 1 < maxVisiblePages) {
//     startPage = Math.max(1, endPage - maxVisiblePages + 1);
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
//       <div className="text-sm" style={{ color: '#6c757d' }}>
//         Showing page {currentPage} of {totalPages}
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsLeft className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>
        
//         {pages.map(page => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`btn btn-sm ${
//               currentPage === page
//                 ? 'btn-primary'
//                 : 'btn-outline'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
        
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Sortable Table Header Component
// const SortableHeader = ({ children, field, sortConfig, onSort }) => {
//   const isSorted = sortConfig.key === field;
//   const isAscending = sortConfig.direction === 'asc';

//   const handleClick = () => {
//     onSort(field);
//   };

//   return (
//     <th 
//       className={isSorted ? 'sorted' : ''}
//       onClick={handleClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className="sortable flex items-center gap-2">
//         {children}
//         <span className="sort-icon">
//           {isSorted ? (
//             isAscending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//           ) : (
//             <ArrowUpDown className="w-4 h-4" />
//           )}
//         </span>
//       </div>
//     </th>
//   );
// };

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;
  
//   return (
//     <div className="custom-tooltip">
//       <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
//       {payload.map((entry, index) => (
//         <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
//           {entry.name}: {entry.value}
//         </p>
//       ))}
//     </div>
//   );
// };

// // Donut Chart Component
// const DonutChart = ({ data, title, subtitle }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
  
//   const CustomTooltip = ({ active, payload }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const data = payload[0].payload;
//     return (
//       <div className="donut-tooltip">
//         <div className="donut-tooltip-item">
//           <div 
//             className="donut-tooltip-color" 
//             style={{ backgroundColor: data.color }}
//           />
//           <span className="donut-tooltip-text">
//             {data.name}: {data.value} ({((data.value / total) * 100).toFixed(1)}%)
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const renderLegend = () => (
//     <div className="donut-legend">
//       {data.map((entry, index) => (
//         <div 
//           key={entry.name}
//           className="donut-legend-item"
//           style={{ borderLeftColor: entry.color }}
//         >
//           <div 
//             className="donut-legend-color"
//             style={{ backgroundColor: entry.color }}
//           />
//           <div className="donut-legend-content">
//             <div className="donut-legend-value">{entry.value}</div>
//             <div className="donut-legend-label">{entry.name}</div>
//           </div>
//           <div className="donut-legend-percentage">
//             {((entry.value / total) * 100).toFixed(1)}%
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <ChartCard title={title} subtitle={subtitle}>
//       <div className="donut-chart-container">
//         <div className="donut-chart-wrapper">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={70}
//                 outerRadius={90}
//                 paddingAngle={2}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={450}
//               >
//                 {data.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.color}
//                     stroke="white"
//                     strokeWidth={2}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="donut-center-text">
//             <div className="donut-total">{total}</div>
//             <div className="donut-label">Total</div>
//           </div>
//         </div>
//         {renderLegend()}
//       </div>
//     </ChartCard>
//   );
// };

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <ChartCard title="Paper Submission Trend" subtitle="Daily paper submission pattern">
//     {data.length > 0 ? (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//           <XAxis 
//             dataKey="date" 
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <YAxis 
//             allowDecimals={false}
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Line
//             type="monotone"
//             dataKey="count"
//             name="Papers"
//             stroke="#1976D2"
//             strokeWidth={3}
//             dot={{ r: 4, strokeWidth: 2, stroke: '#1976D2', fill: 'white' }}
//             activeDot={{ r: 6, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     ) : (
//       <div className="flex items-center justify-center h-64">
//         <p style={{ color: '#6c757d' }}>No trend data available</p>
//       </div>
//     )}
//   </ChartCard>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <ChartCard title="Paper Status Snapshot" subtitle="Current status overview">
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={[
//           {
//             name: "Papers",
//             approvedPaper: stats.approvedPaper,
//             pending: stats.pending,
//             rejected: stats.rejected,
//             noPaper: stats.noPaper,
//           },
//         ]}
//         margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//         <XAxis 
//           dataKey="name" 
//           hide 
//         />
//         <YAxis 
//           allowDecimals={false}
//           tick={{ fill: '#6c757d', fontSize: 12 }}
//           axisLine={{ stroke: '#e2e8f0' }}
//           tickLine={false}
//         />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" radius={[4, 4, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   </ChartCard>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const FinalPaperSupport = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approvedPaper: 0,
//     noPaper: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [paperModalData, setPaperModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [correctionModalData, setCorrectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [correctionFeedback, setCorrectionFeedback] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//   const [isDiscountApplied, setIsDiscountApplied] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [downloading, setDownloading] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     if (url.startsWith('/uploads/')) {
//       return `https://s3conference.ksrce.ac.in${url}`;
//     }
    
//     if (url.includes('proof_')) {
//       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
//     }
    
//     if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
//       return `https://${url.replace(/^\/+/, '')}`;
//     }
    
//     return url;
//   };

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     const submittedOrPending = ["submitted", "correction required"]; 
//     setStats({
//       total: data.length,
//       approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
//       noPaper: data.filter((d) => d.paperStatus === "no paper").length,
//       rejected: data.filter((d) => d.paperStatus === "rejected").length,
//       pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
//     });
//   }, []);

//   /**
//    * Computes the submission trend based on the creation date.
//    */
//   const computeTrend = useCallback((data) => {
//     const groups = {};
//     data.forEach((d) => {
//       const date = new Date(d.createdAt).toISOString().split("T")[0];
//       groups[date] = (groups[date] || 0) + 1;
//     });
//     const arr = Object.entries(groups)
//       .map(([date, count]) => ({ date, count }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTrend(arr);
//   }, []);

//   // Format each user with proper proof URL formatting
//   const formatUser = (item) => {
//     const isDiscount =
//       item.workflow?.discountApplied === true ||
//       item.workflow?.discount === true ||
//       item.workflow?.discountApplied === "true" ||
//       item.workflow?.discount === "true" ||
//       (item.workflow?.discount || 0) > 0;

//     const finalPaperLink = 
//       item.workflow?.finalPaperUrl ||
//       item.registration?.paperUrl ||
//       null;

//     // Format ALL team members including the main author
//     const formattedTeam = Array.isArray(item.registration?.participants) 
//       ? item.registration.participants.map(member => ({
//           name: member.name || "Unknown",
//           email: member.email || "-",
//           phone: member.phone || "-",
//           designation: member.designation || "-",
//           organisation: member.organisation || "-",
//           gender: member.gender || "-",
//           proofUrl: formatProofUrl(member.proofUrl),
//         }))
//       : [];

//     return {
//       id: item._id,
//       userId: item.userId || "N/A",
//       authorName: item.name || "Unknown",
//       email: item.registration?.participants?.[0]?.email || "-",
//       mobile: item.registration?.participants?.[0]?.phone || "-",
//       uniqueId: item.registration?.uniqueId || "-",
//       track: item.registration?.track || "-",
//       presentationMode: item.registration?.presentationMode || "-",
//       title: item.registration?.abstractTitle || "No Title",
//       content: item.registration?.abstractContent || "No content available",
//       abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
//       paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
//       amountPaid: Number(item.workflow?.amountPaid || 0),
//       discount: item.workflow?.discount ?? 0,
//       discountApplied: isDiscount,
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//       team: formattedTeam,
//       finalPaperUrl: finalPaperLink,
//       country: item.registration?.country || "-",
//       correctioncontent: item.workflow?.correctioncontent || "",
//     };
//   };

//   // Fetch approved abstracts
//   const fetchRows = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatUser);
//       console.log("Formatted final paper data:", formatted);
      
//       // Filter only approved abstracts
//       const approved = formatted.filter((f) => 
//         f.abstractStatus === "approved"
//       );
      
//       setRows(approved);
//       computeStats(approved);
//       computeTrend(approved);
//       setCurrentPage(1); // Reset to first page when data changes
//     } catch (err) {
//       console.error("Error fetching:", err);
//       setRows([]);
//       setStats({
//         total: 0,
//         approvedPaper: 0,
//         noPaper: 0,
//         rejected: 0,
//         pending: 0,
//       });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchRows();
//   }, [fetchRows, refreshTrigger]);

//   // Update local state after successful API call
//   const updatePaperLocal = useCallback((id, newStatus, discountBoolean, correctionContent = "") => {
//     setRows((prevRows) => {
//       const updatedRows = prevRows.map((row) => {
//         if (row.id === id) {
//           return {
//             ...row,
//             paperStatus: newStatus.toLowerCase(),
//             discountApplied: discountBoolean,
//             discount: discountBoolean ? 1 : 0,
//             correctioncontent: correctionContent || row.correctioncontent,
//           };
//         }
//         return row;
//       });
      
//       computeStats(updatedRows);
//       computeTrend(updatedRows);

//       return updatedRows;
//     });
//   }, [computeStats, computeTrend]);

//   // Sorting function
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     let filtered = rows.filter((r) => {
//       const matchesSearch =
//         r.authorName.toLowerCase().includes(q) ||
//         r.email.toLowerCase().includes(q) ||
//         r.uniqueId.toLowerCase().includes(q) ||
//         r.title.toLowerCase().includes(q) ||
//         r.userId.toLowerCase().includes(q) ||
//         r.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];

//         if (sortConfig.key === 'createdAt') {
//           aValue = new Date(aValue);
//           bValue = new Date(bValue);
//         } else {
//           aValue = String(aValue || '').toLowerCase();
//           bValue = String(bValue || '').toLowerCase();
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   }, [rows, searchTerm, statusFilter, sortConfig]);

//   // Pagination logic
//   const paginatedRows = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSearchedRows.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSearchedRows, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredAndSearchedRows.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Status Badge Component
//   const getStatusBadge = (status) => {
//     const statusMap = {
//       approved: { class: "status-indicator-approved", label: "Approved" },
//       rejected: { class: "status-indicator-rejected", label: "Rejected" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//       "correction required": { class: "status-indicator-correction-required", label: "Correction Required" },
//       submitted: { class: "status-indicator-submitted", label: "Submitted" },
//       "no paper": { class: "status-indicator-no-paper", label: "No Paper" },
//       "under review": { class: "status-indicator-under-review", label: "Under Review" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedRows.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedRows.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.abstractStatus,
//       "Paper Status": abs.paperStatus,
//       "Payment Status": abs.paymentStatus,
//       "Amount Paid": abs.amountPaid,
//       "Discount Applied": abs.discountApplied ? "Yes" : "No",
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//       "Final Paper Link": abs.finalPaperUrl || "N/A",
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
//     XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Download function to prevent corruption
//   const handleForceDownload = async (fileUrl, userId) => {
//     if (!fileUrl) return alert("No file found to download.");

//     try {
//       setDownloading(true);
      
//       // Format the download URL properly
//       let downloadUrl = fileUrl;
//       if (!fileUrl.startsWith('http')) {
//         downloadUrl = `https://s3conference.ksrce.ac.in${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
//       }
      
//       console.log("⬇️ Downloading:", downloadUrl);

//       const customFileName = `Final_Paper_${userId}.docx`;

//       const response = await fetch(downloadUrl);
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = customFileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("❌ Download error:", err);
//       alert("Failed to download file. Please try again or check the file URL.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // Handle View Proof with robust error handling
//   const handleViewProof = async (proofUrl) => {
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     let finalUrl = proofUrl;
    
//     if (proofUrl.startsWith('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
//     }
    
//     if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
//     }

//     console.log("Attempting to load proof from:", finalUrl);

//     try {
//       const response = await fetch(finalUrl, { method: 'HEAD' });
//       if (response.ok) {
//         setImagePreviewUrl(finalUrl);
//       } else {
//         throw new Error(`HTTP ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Failed to load proof image:", error);
//       setImagePreviewUrl(finalUrl);
      
//       setTimeout(() => {
//         const errorDiv = document.querySelector('.image-error');
//         if (errorDiv && errorDiv.style.display === 'block') {
//           alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
//         }
//       }, 500);
//     }
//   };

//   // FIXED: Handle Paper Status Update with CORRECT field names matching backend
//   const handlePaperStatusUpdate = async (newStatus, reason = "", feedback = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData for all requests
//       const formData = new FormData();
      
//       // CRITICAL FIX: Use the EXACT field names that backend expects
//       formData.append("paperAction", newStatus.toLowerCase()); // Backend expects "paperAction" not "paperStatus"
      
//       // Handle discount - use the correct field names
//       const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
//       if (finalDiscount !== null) {
//         formData.append("discount", finalDiscount.toString());
//       }
      
//       // Add rejection reason if provided - use correct field name (lowercase 'r')
//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         formData.append("paperrejectedReason", reason); // Note: lowercase 'r' in backend
//       }
      
//       // Add correction feedback if provided
//       if (newStatus.toLowerCase() === "correction required" && feedback) {
//         formData.append("correctioncontent", feedback);
//       }
      
//       // Add file if provided
//       if (file) {
//         formData.append("file", file);
//       }

//       console.log("📤 Sending update with:", {
//         paperAction: newStatus.toLowerCase(),
//         discount: finalDiscount,
//         paperrejectedReason: newStatus.toLowerCase() === "rejected" && reason ? reason : "none",
//         correctioncontent: newStatus.toLowerCase() === "correction required" && feedback ? feedback : "none",
//         hasFile: !!file
//       });

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

//       const response = await axios.put(API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log("📥 Server response:", response.data);

//       if (response.data?.success || response.data?.message) {
//         alert(`✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " with discount removed."}`);
//         updatePaperLocal(paperModalData.id, newStatus, finalDiscount, feedback);
//         setPaperModalData(null);
//         setRejectionModalData(null);
//         setCorrectionModalData(null);
//         setRejectionReason("");
//         setCorrectionFeedback("");
//         setSelectedFile(null);
//         setIsDiscountApplied(false);
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating paper status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update paper status.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle Rejection Submit
//   const handleRejectionSubmit = () => {
//     if (!rejectionReason.trim()) {
//       alert("Please provide a reason for rejection.");
//       return;
//     }
//     handlePaperStatusUpdate("rejected", rejectionReason.trim(), "", isDiscountApplied, selectedFile);
//   };

//   // Handle Correction Submit
//   const handleCorrectionSubmit = () => {
//     if (!correctionFeedback.trim()) {
//       alert("Please provide feedback for required corrections.");
//       return;
//     }
//     if (!selectedFile) {
//       alert("Please upload a corrected file for the user.");
//       return;
//     }
//     handlePaperStatusUpdate("correction required", "", correctionFeedback.trim(), isDiscountApplied, selectedFile);
//   };

//   // Open Paper Management Modal - FIXED: Initialize discount state properly
//   const openPaperModal = (row) => {
//     setPaperModalData(row);
//     setIsDiscountApplied(row.discountApplied || false);
//     setSelectedFile(null);
//     setCorrectionFeedback(row.correctioncontent || "");
//   };

//   // Donut Chart Data
//   const donutChartData = [
//     { name: "Approved", value: stats.approvedPaper, color: "#10B981" },
//     { name: "Rejected", value: stats.rejected, color: "#EF4444" },
//     { name: "Pending/Correction", value: stats.pending, color: "#F59E0B" },
//     { name: "No Paper", value: stats.noPaper, color: "#6B7280" },
//   ].filter(item => item.value > 0);

//   return (
//     <>
//       <style>{finalPaperStyles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Final Paper Support
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
//                 <BarChart3 className="w-4 w-4" />
//                 Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//               </p>
//             </div>
//             <button
//               onClick={fetchRows}
//               className="btn btn-secondary self-start lg:self-auto"
//               disabled={loading}
//             >
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//               Refresh Data
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             <StatCard 
//               icon={icons.total}
//               title="Total Abstracts (Approved)" 
//               value={stats.total.toLocaleString()}
//               hint="All approved abstracts"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//             <StatCard 
//               icon={icons.approvedPaper}
//               title="Papers Approved" 
//               value={stats.approvedPaper.toLocaleString()}
//               hint="Final papers approved"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={icons.pendingPaper}
//               title="Submitted/Correction" 
//               value={stats.pending.toLocaleString()}
//               hint="Awaiting review or correction"
//               color="#F59E0B"
//               colorDark="#D97706"
//             />
//             <StatCard 
//               icon={icons.rejected}
//               title="Papers Rejected" 
//               value={stats.rejected.toLocaleString()}
//               hint="Papers not accepted"
//               color="#EF4444"
//               colorDark="#DC2626"
//             />
//             <StatCard 
//               icon={icons.noPaper}
//               title="No Paper Uploaded" 
//               value={stats.noPaper.toLocaleString()}
//               hint="No paper submitted yet"
//               color="#6B7280"
//               colorDark="#4B5563"
//             />
//           </div>

//           {/* Charts - Updated to match AbstractSupport styling */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <DonutChart 
//               title="Paper Status Distribution"
//               subtitle="Breakdown of paper submission statuses"
//               data={donutChartData}
//             />
//             <StatusSnapshotChart stats={stats} />
//           </div>

//           {/* Trend Chart */}
//           <PaperTrendChart data={trend} />

//           {/* Enhanced Table Section */}
//           <div className="table-container">
//             {/* Table Header */}
//             <div className="table-toolbar">
//               <div className="table-info">
//                 <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
//                   Final Paper Submissions
//                 </h3>
//                 <span style={{ color: '#6c757d' }}>
//                   {filteredAndSearchedRows.length} records found
//                 </span>
//               </div>
//               <div className="table-actions">
//                 <div className="search-box">
//                   <Search className="w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by ID, name, email, or title..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="filter-select"
//                 >
//                   <option value="All">All Paper Statuses</option>
//                   <option value="submitted">Submitted</option>
//                   <option value="correction required">Correction Required</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="no paper">No Paper</option>
//                 </select>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-success btn-sm"
//                   disabled={filteredAndSearchedRows.length === 0}
//                 >
//                   <Download className="w-4 h-4" />
//                   Export
//                 </button>
//               </div>
//             </div>

//             {/* Table Content */}
//             {loading ? (
//               <div className="loading-state">
//                 <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1976D2' }} />
//                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading papers...</span>
//               </div>
//             ) : filteredAndSearchedRows.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
//                   {rows.length === 0 ? 'No papers found' : 'No matching papers'}
//                 </h4>
//                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
//                   {rows.length === 0 
//                     ? 'There are no paper submissions yet.' 
//                     : 'Try adjusting your search or filter criteria.'
//                   }
//                 </p>
//                 {rows.length === 0 && (
//                   <button 
//                     onClick={fetchRows}
//                     className="btn btn-primary"
//                   >
//                     <RefreshCw className="w-4 h-4 mr-2" />
//                     Refresh Data
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="table-modern">
//                     <thead>
//                       <tr>
//                         <SortableHeader field="userId" sortConfig={sortConfig} onSort={handleSort}>
//                           User ID
//                         </SortableHeader>
//                         <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
//                           Author Name
//                         </SortableHeader>
//                         <th>Email</th>
//                         <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
//                           Title
//                         </SortableHeader>
//                         <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
//                           Track
//                         </SortableHeader>
//                         <SortableHeader field="paperStatus" sortConfig={sortConfig} onSort={handleSort}>
//                           Paper Status
//                         </SortableHeader>
//                         <th>Discount</th>
//                         <th>Team</th>
//                         <th style={{ textAlign: 'center' }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedRows.map((r) => (
//                         <tr key={r.id}>
//                           <td className="font-mono text-xs" style={{ color: '#475569' }}>
//                             {r.userId}
//                           </td>
//                           <td>
//                             <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
//                               {r.authorName}
//                             </div>
//                           </td>
//                           <td>
//                             <div className="text-sm" style={{ color: '#475569' }}>
//                               {r.email}
//                             </div>
//                           </td>
//                           <td>
//                             <div 
//                               className="font-medium"
//                               title={r.title}
//                               style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
//                             >
//                               {r.title}
//                             </div>
//                           </td>
//                           <td>
//                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                               {r.track}
//                             </span>
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {getStatusBadge(r.paperStatus)}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {r.discountApplied ? (
//                               <span className="text-emerald-600 font-semibold text-sm">
//                                 Yes
//                               </span>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>No</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {Array.isArray(r.team) && r.team.length ? (
//                               <button
//                                 onClick={() => setTeamModalData(r)}
//                                 className="team-button"
//                               >
//                                 <Users className="w-4 h-4" /> 
//                                 View ({r.team.length})
//                               </button>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             <button
//                               onClick={() => openPaperModal(r)}
//                               className="manage-button"
//                             >
//                               <FileText className="w-4 h-4" />
//                               Manage
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Team Modal */}
//       {teamModalData && (
//         <TeamModal 
//           teamData={teamModalData} 
//           onClose={() => setTeamModalData(null)}
//         />
//       )}

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">
//               Paper Management: {paperModalData.authorName}
//             </h2>
//           </div>
          
//           <div className="flex-1 overflow-y-auto max-h-96">
//             <div className="p-6 space-y-6">
//               <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
//                 <span className="font-semibold">Current Paper Status:</span>
//                 {getStatusBadge(paperModalData.paperStatus)}
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-bold mb-3 text-gray-900">Paper Details</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Track:</strong> {paperModalData.track}</div>
//                   <div><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</div>
//                   <div><strong>Email:</strong> {paperModalData.email}</div>
//                   <div><strong>Mobile:</strong> {paperModalData.mobile}</div>
//                   <div><strong>Country:</strong> {paperModalData.country}</div>
//                   <div className="flex items-center gap-2">
//                     <strong>Abstract Status:</strong> 
//                     {getStatusBadge(paperModalData.abstractStatus)}
//                   </div>
//                   <div><strong>Current Discount:</strong> 
//                     <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                       {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                     </span>
//                   </div>
//                   {paperModalData.correctioncontent && (
//                     <div className="col-span-2">
//                       <strong>Previous Feedback:</strong>
//                       <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-sm text-yellow-800">{paperModalData.correctioncontent}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Final Paper Download */}
//               <div className="p-4 border rounded-xl flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Uploaded Paper:</span>
//                 {paperModalData.finalPaperUrl ? (
//                   <button
//                     onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                     disabled={downloading}
//                     className="btn btn-primary btn-sm"
//                   >
//                     {downloading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <>
//                         <Download className="w-4 h-4" /> Download Paper
//                       </>
//                     )}
//                   </button>
//                 ) : (
//                   <span className="text-red-500 text-sm">No Paper Uploaded</span>
//                 )}
//               </div>

//               {/* Discount Section */}
//               <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Discount Status
//                 </label>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="discountApplied"
//                     checked={isDiscountApplied}
//                     onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                     className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                   />
//                   <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                     Apply Discount (Only for Students)
//                   </label>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {isDiscountApplied ? 
//                     "Discount will be applied when you update the status." : 
//                     "No discount will be applied when you update the status."
//                   }
//                 </p>
//               </div>

//               {/* File Upload Section */}
//               <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Upload Correction/Approval File (Optional)
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                   className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                   accept=".doc,.docx,.pdf"
//                 />
//                 {selectedFile && (
//                   <p className="text-xs text-gray-500 mt-2">File selected: {selectedFile.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Actions Footer - Fixed at bottom */}
//           <div className="p-6 border-t bg-gray-50">
//             <div className="flex flex-col sm:flex-row justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="btn btn-outline"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => {
//                   setCorrectionModalData(paperModalData);
//                   setCorrectionFeedback(paperModalData.correctioncontent || "");
//                 }}
//                 disabled={actionLoading}
//                 className="btn btn-outline"
//               >
//                 <MessageSquare className="w-4 h-4" /> 
//                 Correction Required
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="btn btn-success"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Provide Rejection Reason</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto w-fit bg-red-100 rounded-full p-4 mb-4">
//                 <XCircle className="w-8 h-8 text-red-500" />
//               </div>
//               <p className="text-gray-500">
//                 Please provide a reason for rejecting this paper.
//               </p>
//             </div>
            
//             <textarea
//               rows="4"
//               className="w-full border rounded-xl p-4 mb-6 focus:ring-2 focus:ring-red-400 outline-none resize-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="btn btn-outline flex-1"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="btn btn-primary flex-1"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Paper
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Correction Required Modal */}
//       {correctionModalData && (
//         <Modal onClose={() => setCorrectionModalData(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Provide Correction Feedback</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto w-fit bg-yellow-100 rounded-full p-4 mb-4">
//                 <MessageSquare className="w-8 h-8 text-yellow-600" />
//               </div>
//               <p className="text-gray-500 mb-4">
//                 Please provide detailed feedback for the required corrections and upload the corrected file.
//               </p>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Correction Feedback
//               </label>
//               <textarea
//                 rows="6"
//                 className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
//                 placeholder="Provide detailed feedback about what corrections are needed..."
//                 value={correctionFeedback}
//                 onChange={(e) => setCorrectionFeedback(e.target.value)}
//               ></textarea>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Corrected File (Required)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
//                 accept=".doc,.docx,.pdf"
//                 required
//               />
//               {selectedFile && (
//                 <p className="text-sm text-gray-600 mt-2">Selected file: {selectedFile.name}</p>
//               )}
//               {!selectedFile && (
//                 <p className="text-sm text-red-500 mt-2">Please upload a corrected file</p>
//               )}
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setCorrectionModalData(null)}
//                 className="btn btn-outline flex-1"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCorrectionSubmit}
//                 disabled={actionLoading || !correctionFeedback.trim() || !selectedFile}
//                 className="btn btn-primary flex-1"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <MessageSquare className="w-4 h-4" />
//                 )}
//                 Submit Correction Request
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <Modal onClose={() => setImagePreviewUrl(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Proof Document Preview</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="max-h-96 overflow-auto flex justify-center">
//               {imagePreviewUrl ? (
//                 <img 
//                   src={imagePreviewUrl} 
//                   alt="Proof Document" 
//                   className="max-w-full h-auto rounded-lg shadow-md object-contain"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     const errorDiv = e.target.parentNode.querySelector('.image-error');
//                     if (errorDiv) errorDiv.style.display = 'block';
//                   }}
//                 />
//               ) : (
//                 <div className="text-center text-gray-500 py-8">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   No image available
//                 </div>
//               )}
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{imagePreviewUrl}</p>
//               </div>
//             </div>
//             <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <span className="text-sm text-gray-500 break-all flex-1 text-center sm:text-left">
//                 {imagePreviewUrl}
//               </span>
//               <button 
//                 onClick={() => window.open(imagePreviewUrl, '_blank')}
//                 className="btn btn-primary whitespace-nowrap"
//               >
//                 <Eye className="w-4 h-4" />
//                 Open in New Tab
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default FinalPaperSupport;

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   Eye,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   RefreshCw,
//   BarChart3,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
//   MessageSquare,
// } from "lucide-react";

// /* ----------------------------- Styles (keep the same) ----------------------------- */
// /* ----------------------------- Updated Styles ----------------------------- */
// const finalPaperStyles = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//   * {
//     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//   }

//   :root {
//     --brand-orange: #F57C00;
//     --brand-orange-dark: #E65100;
//     --brand-blue-dark: #0D47A1;
//     --brand-blue-primary: #1976D2;
//     --brand-blue-light: #E3F2FD;
//     --brand-red: #D32F2F;
//     --text-primary: #111318;
//     --text-secondary: #6c757d;
//     --surface-light: #f8f9fa;
//     --surface-dark: #e9ecef;
//     --white: #FFFFFF;
//     --border-light: #e2e8f0;
//   }

//   body {
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }

//   .glass-card {
//     background: rgba(255, 255, 255, 0.95);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(255, 255, 255, 0.8);
//     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .glass-card:hover {
//     box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
//     transform: translateY(-4px);
//   }

//   .stat-card {
//     position: relative;
//     overflow: hidden;
//     background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
//     border: 1px solid rgba(0, 0, 0, 0.06);
//   }

//   .stat-card::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .stat-card:hover::before {
//     opacity: 1;
//   }

//   .stat-icon-wrapper {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 56px;
//     height: 56px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//   }

//   .stat-icon-wrapper::after {
//     content: '';
//     position: absolute;
//     inset: -2px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
//     opacity: 0.2;
//     filter: blur(8px);
//   }

//   .metric-value {
//     font-size: 2rem;
//     font-weight: 700;
//     letter-spacing: -0.02em;
//     background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .chart-container {
//     background: white;
//     border-radius: 24px;
//     border: 1px solid rgba(0, 0, 0, 0.06);
//     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//     transition: all 0.4s ease;
//   }

//   .chart-container:hover {
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
//   }

//   .chart-header {
//     padding: 24px 28px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.06);
//     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
//   }

//   .chart-body {
//     padding: 28px;
//   }

//   .btn {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     padding: 12px 24px;
//     border: none;
//     border-radius: 12px;
//     font-size: 0.9375rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
//     text-decoration: none;
//   }

//   .btn::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   .btn:hover::before {
//     opacity: 1;
//   }

//   .btn-primary {
//     background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
//   }

//   .btn-primary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-secondary {
//     background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//   }

//   .btn-secondary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-success {
//     background: linear-gradient(135deg, #10B981 0%, #059669 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
//   }

//   .btn-success:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-outline {
//     background: transparent;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     color: #111318;
//     box-shadow: none;
//   }

//   .btn-outline:hover:not(:disabled) {
//     background: rgba(0, 0, 0, 0.02);
//     border-color: rgba(0, 0, 0, 0.2);
//     transform: translateY(-1px);
//   }

//   .btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none !important;
//     box-shadow: none !important;
//   }

//   .btn-sm {
//     padding: 8px 16px;
//     font-size: 0.875rem;
//   }

//   .header-gradient {
//     background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   /* Enhanced Table Styles */
//   .table-container {
//     background: white;
//     border-radius: 16px;
//     border: 1px solid var(--border-light);
//     box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//   }

//   .table-modern {
//     width: 100%;
//     border-collapse: separate;
//     border-spacing: 0;
//     background: white;
//   }

//   .table-modern thead {
//     background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }

//   .table-modern th {
//     padding: 16px 20px;
//     font-size: 0.75rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: #64748b;
//     border-bottom: 2px solid #e2e8f0;
//     background: inherit;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     user-select: none;
//   }

//   .table-modern th:hover {
//     background: rgba(241, 245, 249, 0.8);
//   }

//   .table-modern th.sortable {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .table-modern th .sort-icon {
//     opacity: 0.4;
//     transition: opacity 0.2s ease;
//   }

//   .table-modern th:hover .sort-icon {
//     opacity: 0.7;
//   }

//   .table-modern th.sorted .sort-icon {
//     opacity: 1;
//     color: var(--brand-blue-primary);
//   }

//   .table-modern tbody tr {
//     border-bottom: 1px solid #f1f5f9;
//     position: relative;
//   }

//   .table-modern tbody tr:last-child {
//     border-bottom: none;
//   }

//   .table-modern td {
//     padding: 18px 20px;
//     color: #334155;
//     font-size: 0.875rem;
//     font-weight: 500;
//     border-bottom: 1px solid #f8fafc;
//   }

//   .table-modern tbody tr:last-child td {
//     border-bottom: none;
//   }

//   .status-indicator {
//     display: inline-flex;
//     align-items: center;
//     padding: 4px 10px;
//     border-radius: 9999px;
//     font-weight: 600;
//     font-size: 0.75rem;
//     text-transform: capitalize;
//     background-color: #E5E7EB;
//     color: #374151;
//     cursor: default;
//     pointer-events: none;
//   }

//   .status-indicator-approved {
//     background-color: #D1FAE5;
//     color: #065F46;
//   }
  
//   .status-indicator-rejected {
//     background-color: #FEE2E2;
//     color: #991B1B;
//   }
  
//   .status-indicator-pending {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }
  
//   .status-indicator-under-review {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-correction-required {
//     background-color: #FEF3C7;
//     color: #92400E;
//   }

//   .status-indicator-submitted {
//     background-color: #DBEAFE;
//     color: #1E40AF;
//   }

//   .status-indicator-no-paper {
//     background-color: #E5E7EB;
//     color: #374151;
//   }

//   .table-toolbar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 20px 24px;
//     background: white;
//     border-bottom: 1px solid var(--border-light);
//   }

//   .table-info {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     font-size: 0.875rem;
//     color: var(--text-secondary);
//   }

//   .table-actions {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .search-box {
//     position: relative;
//     display: flex;
//     align-items: center;
//     background: white;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     padding: 8px 16px;
//     transition: all 0.3s ease;
//     min-width: 300px;
//   }

//   .search-box:focus-within {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px;
//     width: 100%;
//     font-size: 0.875rem;
//     background: transparent;
//   }

//   .filter-select {
//     padding: 10px 16px;
//     border: 1px solid var(--border-light);
//     border-radius: 12px;
//     font-size: 0.875rem;
//     background: white;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     min-width: 150px;
//   }

//   .filter-select:focus {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .empty-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//     text-align: center;
//   }

//   .empty-state-icon {
//     width: 80px;
//     height: 80px;
//     background: #f8fafc;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 20px;
//   }

//   .loading-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 60px 20px;
//   }

//   .loading-spinner {
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }

//   /* Improved Modal Styles */
//   .modal-backdrop {
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.7);
//     backdrop-filter: blur(12px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1000;
//     animation: fadeIn 0.2s ease;
//     padding: 20px;
//   }

//   .modal-content {
//     background: white;
//     border-radius: 24px;
//     box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
//     animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     display: flex;
//     flex-direction: column;
//     max-height: 90vh;
//     width: 100%;
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(30px) scale(0.95);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0) scale(1);
//     }
//   }

//   .chart-header-actions {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//   }

//   .chart-title-section {
//     flex: 1;
//   }

//   .chart-controls {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .team-button {
//     background: linear-gradient(135deg, #10B981, #059669);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .team-button:hover {
//     background: linear-gradient(135deg, #059669, #047857);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
//   }

//   .manage-button {
//     background: linear-gradient(135deg, #8B5CF6, #7C3AED);
//     color: white;
//     border: none;
//     padding: 10px 16px;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     transition: all 0.2s ease;
//   }

//   .manage-button:hover {
//     background: linear-gradient(135deg, #7C3AED, #6D28D9);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
//   }

//   /* Chart specific styles */
//   .recharts-wrapper {
//     font-family: 'Inter', sans-serif;
//   }

//   .recharts-legend-wrapper {
//     padding-top: 20px !important;
//   }

//   .recharts-legend-item-text {
//     font-size: 14px !important;
//     font-weight: 500 !important;
//     color: #111318 !important;
//   }

//   .recharts-tooltip-wrapper {
//     z-index: 1000;
//   }

//   .custom-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 12px;
//     padding: 12px 16px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   }

//   .custom-tooltip p {
//     margin: 4px 0;
//     font-size: 14px;
//     font-weight: 500;
//   }

//   /* Donut Chart Styles */
//   .donut-chart-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 24px;
//   }

//   .donut-chart-wrapper {
//     position: relative;
//     width: 200px;
//     height: 200px;
//   }

//   .donut-center-text {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     text-align: center;
//   }

//   .donut-total {
//     font-size: 2rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 4px;
//   }

//   .donut-legend {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     width: 100%;
//     max-width: 300px;
//   }

//   .donut-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 12px 16px;
//     background: #f8fafc;
//     border-radius: 12px;
//     border-left: 4px solid;
//   }

//   .donut-legend-color {
//     width: 16px;
//     height: 16px;
//     border-radius: 4px;
//   }

//   .donut-legend-content {
//     flex: 1;
//   }

//   .donut-legend-value {
//     font-size: 1.25rem;
//     font-weight: 700;
//     color: #111318;
//     line-height: 1;
//   }

//   .donut-legend-label {
//     font-size: 0.875rem;
//     color: #6c757d;
//     margin-top: 2px;
//   }

//   .donut-legend-percentage {
//     font-size: 1rem;
//     font-weight: 600;
//     color: #111318;
//   }

//   .donut-tooltip {
//     background: white;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     padding: 12px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }

//   .donut-tooltip-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .donut-tooltip-color {
//     width: 12px;
//     height: 12px;
//     border-radius: 2px;
//   }

//   .donut-tooltip-text {
//     font-size: 0.875rem;
//     font-weight: 500;
//     color: #111318;
//   }

//   /* Responsive improvements */
//   @media (max-width: 768px) {
//     .table-toolbar {
//       flex-direction: column;
//       gap: 16px;
//       align-items: stretch;
//     }
    
//     .table-actions {
//       flex-direction: column;
//       width: 100%;
//     }
    
//     .search-box {
//       min-width: auto;
//       width: 100%;
//     }
    
//     .filter-select {
//       width: 100%;
//     }
    
//     .table-modern {
//       font-size: 0.75rem;
//     }
    
//     .table-modern th,
//     .table-modern td {
//       padding: 12px 8px;
//     }
//   }
// `;

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approvedPaper: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   pendingPaper: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   noPaper: (
//     <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
//     </svg>
//   ),
// };

// // Reusable Modal Component
// const Modal = ({ children, onClose, size = "md" }) => {
//   const sizeClasses = { 
//     sm: "max-w-md", 
//     md: "max-w-2xl", 
//     lg: "max-w-4xl", 
//     xl: "max-w-6xl",
//     full: "max-w-7xl" 
//   };
  
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div 
//         className={`modal-content w-full ${sizeClasses[size]}`} 
//         onClick={e => e.stopPropagation()}
//       >
//         <button 
//           onClick={onClose} 
//           className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         <div className="flex-1 overflow-hidden rounded-2xl bg-white">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Team Modal with improved design
// const TeamModal = ({ teamData, onClose }) => {
//   const [currentView, setCurrentView] = useState('team');
//   const [currentProof, setCurrentProof] = useState(null);
//   const [proofMember, setProofMember] = useState(null);

//   const handleViewProof = (proofUrl, member) => {
//     setCurrentProof(proofUrl);
//     setProofMember(member);
//     setCurrentView('proof');
//   };

//   const handleBackToTeam = () => {
//     setCurrentView('team');
//     setCurrentProof(null);
//     setProofMember(null);
//   };

//   if (currentView === 'proof') {
//     return (
//       <Modal onClose={onClose} size="xl">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleBackToTeam}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Back to Team
//             </button>
//             <h3 className="text-xl font-bold text-gray-900 flex-1 text-center">
//               Proof Document - {proofMember?.name}
//             </h3>
//           </div>
//         </div>
        
//         <div className="p-6">
//           {currentProof ? (
//             <>
//               <img 
//                 src={currentProof} 
//                 alt="Proof Document" 
//                 className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain mx-auto"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   const errorDiv = e.target.parentNode.querySelector('.image-error');
//                   if (errorDiv) errorDiv.style.display = 'block';
//                 }}
//               />
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{currentProof}</p>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-500 mb-2">Proof URL:</p>
//                 <p className="text-xs break-all">{currentProof}</p>
//               </div>
//               <div className="mt-6 text-center">
//                 <button 
//                   onClick={() => window.open(currentProof, '_blank')}
//                   className="btn btn-primary"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Open in New Tab
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//               <p>No proof document available</p>
//             </div>
//           )}
//         </div>
//       </Modal>
//     );
//   }

//   return (
//     <Modal onClose={onClose} size="xl">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900">
//           Team Members for "{teamData.title}"
//         </h3>
//         <p className="text-sm text-gray-600 mt-1">
//           {Array.isArray(teamData.team) ? `${teamData.team.length} team members` : 'No team members'}
//         </p>
//       </div>
      
//       {Array.isArray(teamData.team) && teamData.team.length ? (
//         <div className="p-1">
//           <div className="overflow-auto max-h-96">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {teamData.team.map((member, i) => (
//                   <tr key={i} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {member.name || "Unnamed"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.email || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.phone || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.designation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.organisation || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.gender || "-"}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                       {member.proofUrl ? (
//                         <button
//                           onClick={() => handleViewProof(member.proofUrl, member)}
//                           className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                           <Eye className="w-3 h-3 mr-1" />
//                           View Proof
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="p-8 text-center text-gray-500">
//           <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//           <p className="text-lg font-medium mb-2">No team members available</p>
//           <p className="text-sm">This paper doesn't have any team members associated with it.</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// // Stat Card
// const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
//   <div 
//     className="stat-card glass-card rounded-2xl p-6"
//     style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
//   >
//     <div className="flex items-start justify-between mb-4">
//       <div className="flex-1">
//         <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6c757d' }}>
//           {title}
//         </p>
//         <div className="metric-value">{value}</div>
//       </div>
//       <div className="stat-icon-wrapper">
//         <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
//           {icon}
//         </div>
//       </div>
//     </div>
//     <p className="text-xs" style={{ color: '#6c757d' }}>{hint}</p>
//   </div>
// );

// // Chart Card
// const ChartCard = ({ title, subtitle, children, controls }) => (
//   <div className="chart-container">
//     <div className="chart-header">
//       <div className="chart-header-actions">
//         <div className="chart-title-section">
//           <h3 className="text-lg font-bold mb-1" style={{ color: '#111318' }}>{title}</h3>
//           {subtitle && <p className="text-xs" style={{ color: '#6c757d' }}>{subtitle}</p>}
//         </div>
//         {controls && (
//           <div className="chart-controls">
//             {controls}
//           </div>
//         )}
//       </div>
//     </div>
//     <div className="chart-body">
//       {children}
//     </div>
//   </div>
// );

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
//   const maxVisiblePages = 5;
  
//   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
//   if (endPage - startPage + 1 < maxVisiblePages) {
//     startPage = Math.max(1, endPage - maxVisiblePages + 1);
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
//       <div className="text-sm" style={{ color: '#6c757d' }}>
//         Showing page {currentPage} of {totalPages}
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsLeft className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>
        
//         {pages.map(page => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`btn btn-sm ${
//               currentPage === page
//                 ? 'btn-primary'
//                 : 'btn-outline'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
        
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="btn btn-outline btn-sm"
//         >
//           <ChevronsRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Sortable Table Header Component
// const SortableHeader = ({ children, field, sortConfig, onSort }) => {
//   const isSorted = sortConfig.key === field;
//   const isAscending = sortConfig.direction === 'asc';

//   const handleClick = () => {
//     onSort(field);
//   };

//   return (
//     <th 
//       className={isSorted ? 'sorted' : ''}
//       onClick={handleClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className="sortable flex items-center gap-2">
//         {children}
//         <span className="sort-icon">
//           {isSorted ? (
//             isAscending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//           ) : (
//             <ArrowUpDown className="w-4 h-4" />
//           )}
//         </span>
//       </div>
//     </th>
//   );
// };

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;
  
//   return (
//     <div className="custom-tooltip">
//       <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
//       {payload.map((entry, index) => (
//         <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
//           {entry.name}: {entry.value}
//         </p>
//       ))}
//     </div>
//   );
// };

// // Donut Chart Component
// const DonutChart = ({ data, title, subtitle }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
  
//   const CustomTooltip = ({ active, payload }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const data = payload[0].payload;
//     return (
//       <div className="donut-tooltip">
//         <div className="donut-tooltip-item">
//           <div 
//             className="donut-tooltip-color" 
//             style={{ backgroundColor: data.color }}
//           />
//           <span className="donut-tooltip-text">
//             {data.name}: {data.value} ({((data.value / total) * 100).toFixed(1)}%)
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const renderLegend = () => (
//     <div className="donut-legend">
//       {data.map((entry, index) => (
//         <div 
//           key={entry.name}
//           className="donut-legend-item"
//           style={{ borderLeftColor: entry.color }}
//         >
//           <div 
//             className="donut-legend-color"
//             style={{ backgroundColor: entry.color }}
//           />
//           <div className="donut-legend-content">
//             <div className="donut-legend-value">{entry.value}</div>
//             <div className="donut-legend-label">{entry.name}</div>
//           </div>
//           <div className="donut-legend-percentage">
//             {((entry.value / total) * 100).toFixed(1)}%
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <ChartCard title={title} subtitle={subtitle}>
//       <div className="donut-chart-container">
//         <div className="donut-chart-wrapper">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={70}
//                 outerRadius={90}
//                 paddingAngle={2}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={450}
//               >
//                 {data.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.color}
//                     stroke="white"
//                     strokeWidth={2}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="donut-center-text">
//             <div className="donut-total">{total}</div>
//             <div className="donut-label">Total</div>
//           </div>
//         </div>
//         {renderLegend()}
//       </div>
//     </ChartCard>
//   );
// };

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <ChartCard title="Paper Submission Trend" subtitle="Daily paper submission pattern">
//     {data.length > 0 ? (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//           <XAxis 
//             dataKey="date" 
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <YAxis 
//             allowDecimals={false}
//             tick={{ fill: '#6c757d', fontSize: 12 }}
//             axisLine={{ stroke: '#e2e8f0' }}
//             tickLine={false}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Line
//             type="monotone"
//             dataKey="count"
//             name="Papers"
//             stroke="#1976D2"
//             strokeWidth={3}
//             dot={{ r: 4, strokeWidth: 2, stroke: '#1976D2', fill: 'white' }}
//             activeDot={{ r: 6, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     ) : (
//       <div className="flex items-center justify-center h-64">
//         <p style={{ color: '#6c757d' }}>No trend data available</p>
//       </div>
//     )}
//   </ChartCard>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <ChartCard title="Paper Status Snapshot" subtitle="Current status overview">
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={[
//           {
//             name: "Papers",
//             approvedPaper: stats.approvedPaper,
//             pending: stats.pending,
//             rejected: stats.rejected,
//             noPaper: stats.noPaper,
//           },
//         ]}
//         margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//         <XAxis 
//           dataKey="name" 
//           hide 
//         />
//         <YAxis 
//           allowDecimals={false}
//           tick={{ fill: '#6c757d', fontSize: 12 }}
//           axisLine={{ stroke: '#e2e8f0' }}
//           tickLine={false}
//         />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" radius={[4, 4, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   </ChartCard>
// );

// /* ----------------------------- Main Component with DEBUG FIXES ----------------------------- */

// const FinalPaperSupport = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approvedPaper: 0,
//     noPaper: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [paperModalData, setPaperModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [correctionModalData, setCorrectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [correctionFeedback, setCorrectionFeedback] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//   const [isDiscountApplied, setIsDiscountApplied] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [downloading, setDownloading] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   // Debug: Log discount state changes
//   useEffect(() => {
//     console.log("🔄 Discount state updated:", { isDiscountApplied });
//   }, [isDiscountApplied]);

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     if (url.startsWith('/uploads/')) {
//       return `https://s3conference.ksrce.ac.in${url}`;
//     }
    
//     if (url.includes('proof_')) {
//       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
//     }
    
//     if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
//       return `https://${url.replace(/^\/+/, '')}`;
//     }
    
//     return url;
//   };

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     const submittedOrPending = ["submitted", "correction required"]; 
//     setStats({
//       total: data.length,
//       approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
//       noPaper: data.filter((d) => d.paperStatus === "no paper").length,
//       rejected: data.filter((d) => d.paperStatus === "rejected").length,
//       pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
//     });
//   }, []);

//   /**
//    * Computes the submission trend based on the creation date.
//    */
//   const computeTrend = useCallback((data) => {
//     const groups = {};
//     data.forEach((d) => {
//       const date = new Date(d.createdAt).toISOString().split("T")[0];
//       groups[date] = (groups[date] || 0) + 1;
//     });
//     const arr = Object.entries(groups)
//       .map(([date, count]) => ({ date, count }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTrend(arr);
//   }, []);

//   // Format each user with proper proof URL formatting
//   const formatUser = (item) => {
//     console.log("🔍 Formatting user data:", { 
//       id: item._id, 
//       name: item.name,
//       workflow: item.workflow,
//       registration: item.registration 
//     });

//     const isDiscount =
//       item.workflow?.discountApplied === true ||
//       item.workflow?.discount === true ||
//       item.workflow?.discountApplied === "true" ||
//       item.workflow?.discount === "true" ||
//       (item.workflow?.discount || 0) > 0;

//     console.log("💰 Discount calculation:", {
//       discountApplied: item.workflow?.discountApplied,
//       discount: item.workflow?.discount,
//       finalDiscount: isDiscount
//     });

//     const finalPaperLink = 
//       item.workflow?.finalPaperUrl ||
//       item.registration?.paperUrl ||
//       null;

//     // Format ALL team members including the main author
//     const formattedTeam = Array.isArray(item.registration?.participants) 
//       ? item.registration.participants.map(member => ({
//           name: member.name || "Unknown",
//           email: member.email || "-",
//           phone: member.phone || "-",
//           designation: member.designation || "-",
//           organisation: member.organisation || "-",
//           gender: member.gender || "-",
//           proofUrl: formatProofUrl(member.proofUrl),
//         }))
//       : [];

//     return {
//       id: item._id,
//       userId: item.userId || "N/A",
//       authorName: item.name || "Unknown",
//       email: item.registration?.participants?.[0]?.email || "-",
//       mobile: item.registration?.participants?.[0]?.phone || "-",
//       uniqueId: item.registration?.uniqueId || "-",
//       track: item.registration?.track || "-",
//       presentationMode: item.registration?.presentationMode || "-",
//       title: item.registration?.abstractTitle || "No Title",
//       content: item.registration?.abstractContent || "No content available",
//       abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
//       paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
//       amountPaid: Number(item.workflow?.amountPaid || 0),
//       discount: item.workflow?.discount ?? 0,
//       discountApplied: isDiscount,
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//       team: formattedTeam,
//       finalPaperUrl: finalPaperLink,
//       country: item.registration?.country || "-",
//       correctioncontent: item.workflow?.correctioncontent || "",
//     };
//   };

//   // Fetch approved abstracts
//   const fetchRows = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       console.log("📡 Fetching data from API...");
      
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("✅ Raw API response:", data);
      
//       const formatted = (Array.isArray(data) ? data : []).map(formatUser);
//       console.log("📊 Formatted final paper data:", formatted);
      
//       // Filter only approved abstracts
//       const approved = formatted.filter((f) => 
//         f.abstractStatus === "approved"
//       );
      
//       console.log("🎯 Approved abstracts only:", approved);
      
//       setRows(approved);
//       computeStats(approved);
//       computeTrend(approved);
//       setCurrentPage(1); // Reset to first page when data changes
//     } catch (err) {
//       console.error("❌ Error fetching:", err);
//       setRows([]);
//       setStats({
//         total: 0,
//         approvedPaper: 0,
//         noPaper: 0,
//         rejected: 0,
//         pending: 0,
//       });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchRows();
//   }, [fetchRows, refreshTrigger]);

//   // Update local state after successful API call
//   const updatePaperLocal = useCallback((id, newStatus, discountBoolean, correctionContent = "") => {
//     console.log("🔄 Updating local state:", { id, newStatus, discountBoolean, correctionContent });
    
//     setRows((prevRows) => {
//       const updatedRows = prevRows.map((row) => {
//         if (row.id === id) {
//           const updatedRow = {
//             ...row,
//             paperStatus: newStatus.toLowerCase(),
//             discountApplied: discountBoolean,
//             discount: discountBoolean ? 1 : 0,
//             correctioncontent: correctionContent || row.correctioncontent,
//           };
//           console.log("📝 Updated row:", updatedRow);
//           return updatedRow;
//         }
//         return row;
//       });
      
//       computeStats(updatedRows);
//       computeTrend(updatedRows);

//       return updatedRows;
//     });
//   }, [computeStats, computeTrend]);

//   // Sorting function
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     let filtered = rows.filter((r) => {
//       const matchesSearch =
//         r.authorName.toLowerCase().includes(q) ||
//         r.email.toLowerCase().includes(q) ||
//         r.uniqueId.toLowerCase().includes(q) ||
//         r.title.toLowerCase().includes(q) ||
//         r.userId.toLowerCase().includes(q) ||
//         r.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];

//         if (sortConfig.key === 'createdAt') {
//           aValue = new Date(aValue);
//           bValue = new Date(bValue);
//         } else {
//           aValue = String(aValue || '').toLowerCase();
//           bValue = String(bValue || '').toLowerCase();
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   }, [rows, searchTerm, statusFilter, sortConfig]);

//   // Pagination logic
//   const paginatedRows = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSearchedRows.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSearchedRows, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredAndSearchedRows.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Status Badge Component
//   const getStatusBadge = (status) => {
//     const statusMap = {
//       approved: { class: "status-indicator-approved", label: "Approved" },
//       rejected: { class: "status-indicator-rejected", label: "Rejected" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//       "correction required": { class: "status-indicator-correction-required", label: "Correction Required" },
//       submitted: { class: "status-indicator-submitted", label: "Submitted" },
//       "no paper": { class: "status-indicator-no-paper", label: "No Paper" },
//       "under review": { class: "status-indicator-under-review", label: "Under Review" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedRows.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedRows.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.abstractStatus,
//       "Paper Status": abs.paperStatus,
//       "Payment Status": abs.paymentStatus,
//       "Amount Paid": abs.amountPaid,
//       "Discount Applied": abs.discountApplied ? "Yes" : "No",
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//       "Final Paper Link": abs.finalPaperUrl || "N/A",
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
//     XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Download function to prevent corruption
//   const handleForceDownload = async (fileUrl, userId) => {
//     if (!fileUrl) return alert("No file found to download.");

//     try {
//       setDownloading(true);
      
//       // Format the download URL properly
//       let downloadUrl = fileUrl;
//       if (!fileUrl.startsWith('http')) {
//         downloadUrl = `https://s3conference.ksrce.ac.in${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
//       }
      
//       console.log("⬇️ Downloading:", downloadUrl);

//       const customFileName = `Final_Paper_${userId}.docx`;

//       const response = await fetch(downloadUrl);
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = customFileName;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("❌ Download error:", err);
//       alert("Failed to download file. Please try again or check the file URL.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // FIXED: Handle Paper Status Update with COMPREHENSIVE DEBUGGING
//   const handlePaperStatusUpdate = async (newStatus, reason = "", feedback = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
    
//     // Use the provided discountBoolean or fallback to current state
//     const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
    
//     console.log("🚀 STARTING PAPER STATUS UPDATE:", {
//       paperModalData: paperModalData,
//       newStatus,
//       reason,
//       feedback,
//       discountBoolean,
//       finalDiscount,
//       isDiscountApplied,
//       hasFile: !!file,
//       file: file?.name
//     });

//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData for all requests
//       const formData = new FormData();
      
//       // CRITICAL FIX: Use the EXACT field names that backend expects
//       formData.append("paperAction", newStatus.toLowerCase());
      
//       // Handle discount - FIXED: Use correct field name and ensure boolean conversion
//       console.log("💰 DISCOUNT DEBUG:", {
//         discountBoolean,
//         isDiscountApplied,
//         finalDiscount,
//         type: typeof finalDiscount
//       });
      
//       formData.append("discount", finalDiscount.toString());
      
//       // Add rejection reason if provided
//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         formData.append("paperrejectedReason", reason);
//       }
      
//       // Add correction feedback if provided
//       if (newStatus.toLowerCase() === "correction required" && feedback) {
//         formData.append("correctioncontent", feedback);
//       }
      
//       // Add file if provided
//       if (file) {
//         formData.append("file", file);
//       }

//       // DEBUG: Log all form data entries
//       console.log("📦 FORM DATA CONTENTS:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`  ${key}:`, value);
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;
//       console.log("🌐 API URL:", API_URL);

//       const response = await axios.put(API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log("✅ SERVER RESPONSE:", response.data);

//       if (response.data?.success || response.data?.message) {
//         const successMessage = `✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " without discount."}`;
//         console.log("🎉 SUCCESS:", successMessage);
//         alert(successMessage);
        
//         // Update local state
//         updatePaperLocal(paperModalData.id, newStatus, finalDiscount, feedback);
        
//         // Reset all states
//         setPaperModalData(null);
//         setRejectionModalData(null);
//         setCorrectionModalData(null);
//         setRejectionReason("");
//         setCorrectionFeedback("");
//         setSelectedFile(null);
//         setIsDiscountApplied(false);
//         setRefreshTrigger(prev => !prev);
//       } else {
//         console.warn("⚠️ Unexpected server response:", response.data);
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ ERROR updating paper status:", {
//         error: err.message,
//         response: err.response?.data,
//         status: err.response?.status
//       });
//       alert(err.response?.data?.message || "Failed to update paper status.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle Rejection Submit
//   const handleRejectionSubmit = () => {
//     if (!rejectionReason.trim()) {
//       alert("Please provide a reason for rejection.");
//       return;
//     }
//     console.log("🗑️ Submitting rejection:", { reason: rejectionReason, discount: isDiscountApplied });
//     handlePaperStatusUpdate("rejected", rejectionReason.trim(), "", isDiscountApplied, selectedFile);
//   };

//   // Handle Correction Submit
//   const handleCorrectionSubmit = () => {
//     if (!correctionFeedback.trim()) {
//       alert("Please provide feedback for required corrections.");
//       return;
//     }
//     if (!selectedFile) {
//       alert("Please upload a corrected file for the user.");
//       return;
//     }
//     console.log("✏️ Submitting correction:", { feedback: correctionFeedback, discount: isDiscountApplied });
//     handlePaperStatusUpdate("correction required", "", correctionFeedback.trim(), isDiscountApplied, selectedFile);
//   };

//   // Open Paper Management Modal - FIXED: Initialize discount state properly
//   const openPaperModal = (row) => {
//     console.log("📄 Opening paper modal for:", {
//       author: row.authorName,
//       currentDiscount: row.discountApplied,
//       paperStatus: row.paperStatus
//     });
    
//     setPaperModalData(row);
//     setIsDiscountApplied(row.discountApplied || false);
//     setSelectedFile(null);
//     setCorrectionFeedback(row.correctioncontent || "");
    
//     console.log("🔧 Modal state initialized:", {
//       isDiscountApplied: row.discountApplied || false,
//       hasCorrectionContent: !!row.correctioncontent
//     });
//   };

//   // Handle direct approval with discount
//   const handleDirectApprove = () => {
//     console.log("✅ Direct approval with discount:", isDiscountApplied);
//     handlePaperStatusUpdate("approved", "", "", isDiscountApplied, selectedFile);
//   };

//   // Donut Chart Data
//   const donutChartData = [
//     { name: "Approved", value: stats.approvedPaper, color: "#10B981" },
//     { name: "Rejected", value: stats.rejected, color: "#EF4444" },
//     { name: "Pending/Correction", value: stats.pending, color: "#F59E0B" },
//     { name: "No Paper", value: stats.noPaper, color: "#6B7280" },
//   ].filter(item => item.value > 0);

//   return (
//     <>
//       <style>{finalPaperStyles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Final Paper Support
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
//                 <BarChart3 className="w-4 h-4" />
//                 Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//               </p>
//             </div>
//             <button
//               onClick={fetchRows}
//               className="btn btn-secondary self-start lg:self-auto"
//               disabled={loading}
//             >
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//               Refresh Data
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             <StatCard 
//               icon={icons.total}
//               title="Total Abstracts (Approved)" 
//               value={stats.total.toLocaleString()}
//               hint="All approved abstracts"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//             <StatCard 
//               icon={icons.approvedPaper}
//               title="Papers Approved" 
//               value={stats.approvedPaper.toLocaleString()}
//               hint="Final papers approved"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={icons.pendingPaper}
//               title="Submitted/Correction" 
//               value={stats.pending.toLocaleString()}
//               hint="Awaiting review or correction"
//               color="#F59E0B"
//               colorDark="#D97706"
//             />
//             <StatCard 
//               icon={icons.rejected}
//               title="Papers Rejected" 
//               value={stats.rejected.toLocaleString()}
//               hint="Papers not accepted"
//               color="#EF4444"
//               colorDark="#DC2626"
//             />
//             <StatCard 
//               icon={icons.noPaper}
//               title="No Paper Uploaded" 
//               value={stats.noPaper.toLocaleString()}
//               hint="No paper submitted yet"
//               color="#6B7280"
//               colorDark="#4B5563"
//             />
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <DonutChart 
//               title="Paper Status Distribution"
//               subtitle="Breakdown of paper submission statuses"
//               data={donutChartData}
//             />
//             <StatusSnapshotChart stats={stats} />
//           </div>

//           {/* Trend Chart */}
//           <PaperTrendChart data={trend} />

//           {/* Enhanced Table Section */}
//           <div className="table-container">
//             {/* Table Header */}
//             <div className="table-toolbar">
//               <div className="table-info">
//                 <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
//                   Final Paper Submissions
//                 </h3>
//                 <span style={{ color: '#6c757d' }}>
//                   {filteredAndSearchedRows.length} records found
//                 </span>
//               </div>
//               <div className="table-actions">
//                 <div className="search-box">
//                   <Search className="w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by ID, name, email, or title..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="filter-select"
//                 >
//                   <option value="All">All Paper Statuses</option>
//                   <option value="submitted">Submitted</option>
//                   <option value="correction required">Correction Required</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="no paper">No Paper</option>
//                 </select>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-success btn-sm"
//                   disabled={filteredAndSearchedRows.length === 0}
//                 >
//                   <Download className="w-4 h-4" />
//                   Export
//                 </button>
//               </div>
//             </div>

//             {/* Table Content */}
//             {loading ? (
//               <div className="loading-state">
//                 <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1976D2' }} />
//                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading papers...</span>
//               </div>
//             ) : filteredAndSearchedRows.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
//                   {rows.length === 0 ? 'No papers found' : 'No matching papers'}
//                 </h4>
//                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
//                   {rows.length === 0 
//                     ? 'There are no paper submissions yet.' 
//                     : 'Try adjusting your search or filter criteria.'
//                   }
//                 </p>
//                 {rows.length === 0 && (
//                   <button 
//                     onClick={fetchRows}
//                     className="btn btn-primary"
//                   >
//                     <RefreshCw className="w-4 h-4 mr-2" />
//                     Refresh Data
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="table-modern">
//                     <thead>
//                       <tr>
//                         <SortableHeader field="userId" sortConfig={sortConfig} onSort={handleSort}>
//                           User ID
//                         </SortableHeader>
//                         <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
//                           Author Name
//                         </SortableHeader>
//                         <th>Email</th>
//                         <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
//                           Title
//                         </SortableHeader>
//                         <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
//                           Track
//                         </SortableHeader>
//                         <SortableHeader field="paperStatus" sortConfig={sortConfig} onSort={handleSort}>
//                           Paper Status
//                         </SortableHeader>
//                         <th>Discount</th>
//                         <th>Team</th>
//                         <th style={{ textAlign: 'center' }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedRows.map((r) => (
//                         <tr key={r.id}>
//                           <td className="font-mono text-xs" style={{ color: '#475569' }}>
//                             {r.userId}
//                           </td>
//                           <td>
//                             <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
//                               {r.authorName}
//                             </div>
//                           </td>
//                           <td>
//                             <div className="text-sm" style={{ color: '#475569' }}>
//                               {r.email}
//                             </div>
//                           </td>
//                           <td>
//                             <div 
//                               className="font-medium"
//                               title={r.title}
//                               style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
//                             >
//                               {r.title}
//                             </div>
//                           </td>
//                           <td>
//                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                               {r.track}
//                             </span>
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {getStatusBadge(r.paperStatus)}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {r.discountApplied ? (
//                               <span className="text-emerald-600 font-semibold text-sm">
//                                 Yes
//                               </span>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>No</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {Array.isArray(r.team) && r.team.length ? (
//                               <button
//                                 onClick={() => setTeamModalData(r)}
//                                 className="team-button"
//                               >
//                                 <Users className="w-4 h-4" /> 
//                                 View ({r.team.length})
//                               </button>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             <button
//                               onClick={() => openPaperModal(r)}
//                               className="manage-button"
//                             >
//                               <FileText className="w-4 h-4" />
//                               Manage
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Team Modal */}
//       {teamModalData && (
//         <TeamModal 
//           teamData={teamModalData} 
//           onClose={() => setTeamModalData(null)}
//         />
//       )}

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-bold text-gray-900">
//               Paper Management: {paperModalData.authorName}
//             </h2>
//             <div className="text-sm text-gray-600 mt-1">
//               User ID: {paperModalData.userId} | Discount State: {isDiscountApplied ? "Applied" : "Not Applied"}
//             </div>
//           </div>
          
//           <div className="flex-1 overflow-y-auto max-h-96">
//             <div className="p-6 space-y-6">
//               <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
//                 <span className="font-semibold">Current Paper Status:</span>
//                 {getStatusBadge(paperModalData.paperStatus)}
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-bold mb-3 text-gray-900">Paper Details</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Track:</strong> {paperModalData.track}</div>
//                   <div><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</div>
//                   <div><strong>Email:</strong> {paperModalData.email}</div>
//                   <div><strong>Mobile:</strong> {paperModalData.mobile}</div>
//                   <div><strong>Country:</strong> {paperModalData.country}</div>
//                   <div className="flex items-center gap-2">
//                     <strong>Abstract Status:</strong> 
//                     {getStatusBadge(paperModalData.abstractStatus)}
//                   </div>
//                   <div><strong>Current Discount:</strong> 
//                     <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                       {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                     </span>
//                   </div>
//                   {paperModalData.correctioncontent && (
//                     <div className="col-span-2">
//                       <strong>Previous Feedback:</strong>
//                       <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                         <p className="text-sm text-yellow-800">{paperModalData.correctioncontent}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Final Paper Download */}
//               <div className="p-4 border rounded-xl flex justify-between items-center">
//                 <span className="font-medium text-gray-700">Uploaded Paper:</span>
//                 {paperModalData.finalPaperUrl ? (
//                   <button
//                     onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                     disabled={downloading}
//                     className="btn btn-primary btn-sm"
//                   >
//                     {downloading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <>
//                         <Download className="w-4 h-4" /> Download Paper
//                       </>
//                     )}
//                   </button>
//                 ) : (
//                   <span className="text-red-500 text-sm">No Paper Uploaded</span>
//                 )}
//               </div>

//               {/* Discount Section */}
//               <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Discount Status (Current: {isDiscountApplied ? "Applied" : "Not Applied"})
//                 </label>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="discountApplied"
//                     checked={isDiscountApplied}
//                     onChange={(e) => {
//                       console.log("🎯 Discount checkbox changed:", e.target.checked);
//                       setIsDiscountApplied(e.target.checked);
//                     }}
//                     className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                   />
//                   <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                     Apply Discount (Only for Students)
//                   </label>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {isDiscountApplied ? 
//                     "Discount will be applied when you update the status." : 
//                     "No discount will be applied when you update the status."
//                   }
//                 </p>
//               </div>

//               {/* File Upload Section */}
//               {/* <div className="border p-4 rounded-xl">
//                 <label className="text-sm font-semibold text-gray-700 block mb-3">
//                   Upload Correction/Approval File (Optional)
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                   className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                   accept=".doc,.docx,.pdf"
//                 />
//                 {selectedFile && (
//                   <p className="text-xs text-gray-500 mt-2">File selected: {selectedFile.name}</p>
//                 )}
//               </div> */}
//             </div>
//           </div>

//           {/* Actions Footer - Fixed at bottom */}
//           <div className="p-6 border-t bg-gray-50">
//             <div className="flex flex-col sm:flex-row justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="btn btn-outline"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => {
//                   setCorrectionModalData(paperModalData);
//                   setCorrectionFeedback(paperModalData.correctioncontent || "");
//                 }}
//                 disabled={actionLoading}
//                 className="btn btn-outline"
//               >
//                 <MessageSquare className="w-4 h-4" /> 
//                 Correction Required
//               </button>

//               <button
//                 onClick={handleDirectApprove}
//                 disabled={actionLoading}
//                 className="btn btn-success"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Provide Rejection Reason</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto w-fit bg-red-100 rounded-full p-4 mb-4">
//                 <XCircle className="w-8 h-8 text-red-500" />
//               </div>
//               <p className="text-gray-500">
//                 Please provide a reason for rejecting this paper.
//               </p>
//             </div>
            
//             <textarea
//               rows="4"
//               className="w-full border rounded-xl p-4 mb-6 focus:ring-2 focus:ring-red-400 outline-none resize-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="btn btn-outline flex-1"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="btn btn-primary flex-1"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Paper
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Correction Required Modal */}
//       {correctionModalData && (
//         <Modal onClose={() => setCorrectionModalData(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Provide Correction Feedback</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="text-center mb-6">
//               <div className="mx-auto w-fit bg-yellow-100 rounded-full p-4 mb-4">
//                 <MessageSquare className="w-8 h-8 text-yellow-600" />
//               </div>
//               <p className="text-gray-500 mb-4">
//                 Please provide detailed feedback for the required corrections and upload the corrected file.
//               </p>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Correction Feedback
//               </label>
//               <textarea
//                 rows="6"
//                 className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
//                 placeholder="Provide detailed feedback about what corrections are needed..."
//                 value={correctionFeedback}
//                 onChange={(e) => setCorrectionFeedback(e.target.value)}
//               ></textarea>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Corrected File (Required)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
//                 accept=".doc,.docx,.pdf"
//                 required
//               />
//               {selectedFile && (
//                 <p className="text-sm text-gray-600 mt-2">Selected file: {selectedFile.name}</p>
//               )}
//               {!selectedFile && (
//                 <p className="text-sm text-red-500 mt-2">Please upload a corrected file</p>
//               )}
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setCorrectionModalData(null)}
//                 className="btn btn-outline flex-1"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCorrectionSubmit}
//                 disabled={actionLoading || !correctionFeedback.trim() || !selectedFile}
//                 className="btn btn-primary flex-1"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <MessageSquare className="w-4 h-4" />
//                 )}
//                 Submit Correction Request
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <Modal onClose={() => setImagePreviewUrl(null)} size="lg">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900">Proof Document Preview</h3>
//           </div>
          
//           <div className="p-6">
//             <div className="max-h-96 overflow-auto flex justify-center">
//               {imagePreviewUrl ? (
//                 <img 
//                   src={imagePreviewUrl} 
//                   alt="Proof Document" 
//                   className="max-w-full h-auto rounded-lg shadow-md object-contain"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     const errorDiv = e.target.parentNode.querySelector('.image-error');
//                     if (errorDiv) errorDiv.style.display = 'block';
//                   }}
//                 />
//               ) : (
//                 <div className="text-center text-gray-500 py-8">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   No image available
//                 </div>
//               )}
//               <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//                 <p>Failed to load image.</p>
//                 <p className="text-sm text-gray-600 break-all mt-2">{imagePreviewUrl}</p>
//               </div>
//             </div>
//             <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <span className="text-sm text-gray-500 break-all flex-1 text-center sm:text-left">
//                 {imagePreviewUrl}
//               </span>
//               <button 
//                 onClick={() => window.open(imagePreviewUrl, '_blank')}
//                 className="btn btn-primary whitespace-nowrap"
//               >
//                 <Eye className="w-4 h-4" />
//                 Open in New Tab
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default FinalPaperSupport;



import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Loader2,
  Download,
  X,
  Users,
  Search,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  RefreshCw,
  BarChart3,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

/* ----------------------------- Styles (Compacted) ----------------------------- */
const finalPaperStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :root {
    --brand-orange: #F57C00;
    --brand-orange-dark: #E65100;
    --brand-blue-dark: #0D47A1;
    --brand-blue-primary: #1976D2;
    --brand-blue-light: #E3F2FD;
    --brand-red: #D32F2F;
    --text-primary: #111318;
    --text-secondary: #6c757d;
    --surface-light: #f8f9fa;
    --surface-dark: #e9ecef;
    --white: #FFFFFF;
    --border-light: #e2e8f0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px; /* Base font size */
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .stat-card {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 12px; /* Reduced */
    padding: 16px; /* Reduced */
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .stat-card:hover::before {
    opacity: 1;
  }

  .stat-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px; /* Reduced */
    height: 42px; /* Reduced */
    border-radius: 12px; /* Reduced */
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-icon-wrapper::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    opacity: 0.2;
    filter: blur(8px);
  }

  .metric-value {
    font-size: 1.5rem; /* Reduced */
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .chart-container {
    background: white;
    border-radius: 16px; /* Reduced */
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .chart-container:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  .chart-header {
    padding: 16px 20px; /* Reduced */
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  }

  .chart-body {
    padding: 16px; /* Reduced */
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px; /* Reduced */
    padding: 8px 16px; /* Reduced */
    border: none;
    border-radius: 8px; /* Reduced */
    font-size: 0.85rem; /* Reduced */
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    text-decoration: none;
  }

  .btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn:hover::before {
    opacity: 1;
  }

  .btn-primary {
    background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }

  .btn-secondary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
    transform: translateY(-2px);
  }

  .btn-success {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .btn-success:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #111318;
    box-shadow: none;
  }

  .btn-outline:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  .btn-sm {
    padding: 6px 12px; /* Reduced */
    font-size: 0.75rem; /* Reduced */
  }

  .header-gradient {
    background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Enhanced Table Styles */
  .table-container {
    background: white;
    border-radius: 12px; /* Reduced */
    border: 1px solid var(--border-light);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .table-modern {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
  }

  .table-modern thead {
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .table-modern th {
    padding: 10px 16px; /* Reduced */
    font-size: 0.7rem; /* Reduced */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    border-bottom: 2px solid #e2e8f0;
    background: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }

  .table-modern th:hover {
    background: rgba(241, 245, 249, 0.8);
  }

  .table-modern th.sortable {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .table-modern th .sort-icon {
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }

  .table-modern th:hover .sort-icon {
    opacity: 0.7;
  }

  .table-modern th.sorted .sort-icon {
    opacity: 1;
    color: var(--brand-blue-primary);
  }

  .table-modern tbody tr {
    border-bottom: 1px solid #f1f5f9;
    position: relative;
  }

  .table-modern tbody tr:last-child {
    border-bottom: none;
  }

  .table-modern td {
    padding: 10px 16px; /* Reduced */
    color: #334155;
    font-size: 0.85rem; /* Reduced */
    font-weight: 500;
    border-bottom: 1px solid #f8fafc;
  }

  .table-modern tbody tr:last-child td {
    border-bottom: none;
  }

  .status-indicator {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px; /* Reduced */
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.7rem; /* Reduced */
    text-transform: capitalize;
    background-color: #E5E7EB;
    color: #374151;
    cursor: default;
    pointer-events: none;
  }

  .status-indicator-approved {
    background-color: #D1FAE5;
    color: #065F46;
  }
  
  .status-indicator-rejected {
    background-color: #FEE2E2;
    color: #991B1B;
  }
  
  .status-indicator-pending {
    background-color: #FEF3C7;
    color: #92400E;
  }
  
  .status-indicator-under-review {
    background-color: #DBEAFE;
    color: #1E40AF;
  }

  .status-indicator-correction-required {
    background-color: #FEF3C7;
    color: #92400E;
  }

  .status-indicator-submitted {
    background-color: #DBEAFE;
    color: #1E40AF;
  }

  .status-indicator-no-paper {
    background-color: #E5E7EB;
    color: #374151;
  }

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px; /* Reduced */
    background: white;
    border-bottom: 1px solid var(--border-light);
  }

  .table-info {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .table-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 8px; /* Reduced */
    padding: 6px 12px; /* Reduced */
    transition: all 0.3s ease;
    min-width: 250px; /* Reduced */
  }

  .search-box:focus-within {
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  .search-box input {
    border: none;
    outline: none;
    padding: 4px; /* Reduced */
    width: 100%;
    font-size: 0.85rem; /* Reduced */
    background: transparent;
  }

  .filter-select {
    padding: 8px 12px; /* Reduced */
    border: 1px solid var(--border-light);
    border-radius: 8px; /* Reduced */
    font-size: 0.85rem; /* Reduced */
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 150px;
  }

  .filter-select:focus {
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px; /* Reduced */
    text-align: center;
  }

  .empty-state-icon {
    width: 60px; /* Reduced */
    height: 60px; /* Reduced */
    background: #f8fafc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px; /* Reduced */
  }

  .loading-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Improved Modal Styles */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px); /* Reduced */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
    padding: 16px; /* Reduced */
  }

  .modal-content {
    background: white;
    border-radius: 16px; /* Reduced */
    box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    width: 100%;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .chart-header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .chart-title-section {
    flex: 1;
  }

  .chart-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .team-button {
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    border: none;
    padding: 6px 12px; /* Reduced */
    border-radius: 8px; /* Reduced */
    font-size: 0.8rem; /* Reduced */
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px; /* Reduced */
    transition: all 0.2s ease;
  }

  .team-button:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  }

  .manage-button {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
    color: white;
    border: none;
    padding: 6px 12px; /* Reduced */
    border-radius: 8px; /* Reduced */
    font-size: 0.8rem; /* Reduced */
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px; /* Reduced */
    transition: all 0.2s ease;
  }

  .manage-button:hover {
    background: linear-gradient(135deg, #7C3AED, #6D28D9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  }

  /* Chart specific styles */
  .recharts-wrapper {
    font-family: 'Inter', sans-serif;
  }

  .recharts-legend-wrapper {
    padding-top: 20px !important;
  }

  .recharts-legend-item-text {
    font-size: 13px !important; /* Reduced */
    font-weight: 500 !important;
    color: #111318 !important;
  }

  .recharts-tooltip-wrapper {
    z-index: 1000;
  }

  .custom-tooltip {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .custom-tooltip p {
    margin: 4px 0;
    font-size: 13px; /* Reduced */
    font-weight: 500;
  }

  /* Donut Chart Styles */
  .donut-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px; /* Reduced */
  }

  .donut-chart-wrapper {
    position: relative;
    width: 160px; /* Reduced */
    height: 160px; /* Reduced */
  }

  .donut-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .donut-total {
    font-size: 1.75rem; /* Reduced */
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-label {
    font-size: 0.8rem; /* Reduced */
    color: #6c757d;
    margin-top: 4px;
  }

  .donut-legend {
    display: flex;
    flex-direction: column;
    gap: 8px; /* Reduced */
    width: 100%;
    max-width: 300px;
  }

  .donut-legend-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px; /* Reduced */
    background: #f8fafc;
    border-radius: 8px; /* Reduced */
    border-left: 4px solid;
  }

  .donut-legend-color {
    width: 12px; /* Reduced */
    height: 12px; /* Reduced */
    border-radius: 4px;
  }

  .donut-legend-content {
    flex: 1;
  }

  .donut-legend-value {
    font-size: 1rem; /* Reduced */
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-legend-label {
    font-size: 0.8rem; /* Reduced */
    color: #6c757d;
    margin-top: 2px;
  }

  .donut-legend-percentage {
    font-size: 0.9rem; /* Reduced */
    font-weight: 600;
    color: #111318;
  }

  .donut-tooltip {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .donut-tooltip-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .donut-tooltip-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .donut-tooltip-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111318;
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    .table-toolbar {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    
    .table-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .search-box {
      min-width: auto;
      width: 100%;
    }
    
    .filter-select {
      width: 100%;
    }
    
    .table-modern {
      font-size: 0.75rem;
    }
    
    .table-modern th,
    .table-modern td {
      padding: 12px 8px;
    }
  }
`;

/* ----------------------------- Small Components & Utils ----------------------------- */

// Icon map
const icons = {
  total: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
    </svg>
  ),
  approvedPaper: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  pendingPaper: (
    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  rejected: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  noPaper: (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
    </svg>
  ),
};

// Reusable Modal Component
const Modal = ({ children, onClose, size = "md" }) => {
  const sizeClasses = { 
    sm: "max-w-md", 
    md: "max-w-2xl", 
    lg: "max-w-4xl", 
    xl: "max-w-6xl",
    full: "max-w-7xl" 
  };
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className={`modal-content w-full ${sizeClasses[size]}`} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-hidden rounded-xl bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

// Team Modal with improved design
const TeamModal = ({ teamData, onClose }) => {
  const [currentView, setCurrentView] = useState('team');
  const [currentProof, setCurrentProof] = useState(null);
  const [proofMember, setProofMember] = useState(null);

  const handleViewProof = (proofUrl, member) => {
    setCurrentProof(proofUrl);
    setProofMember(member);
    setCurrentView('proof');
  };

  const handleBackToTeam = () => {
    setCurrentView('team');
    setCurrentProof(null);
    setProofMember(null);
  };

  if (currentView === 'proof') {
    return (
      <Modal onClose={onClose} size="xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToTeam}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <h3 className="text-base font-semibold text-gray-900 flex-1 text-center">
              Proof - {proofMember?.name}
            </h3>
          </div>
        </div>
        
        <div className="p-4">
          {currentProof ? (
            <>
              <img 
                src={currentProof} 
                alt="Proof Document" 
                className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const errorDiv = e.target.parentNode.querySelector('.image-error');
                  if (errorDiv) errorDiv.style.display = 'block';
                }}
              />
              <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
                <p>Failed to load image.</p>
                <p className="text-sm text-gray-600 break-all mt-2">{currentProof}</p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Proof URL:</p>
                <p className="text-xs break-all">{currentProof}</p>
              </div>
              <div className="mt-6 text-center">
                <button 
                  onClick={() => window.open(currentProof, '_blank')}
                  className="btn btn-primary btn-sm"
                >
                  <Eye className="w-4 h-4" />
                  Open in New Tab
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No proof document available</p>
            </div>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} size="xl">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">
          Team Members for "{teamData.title}"
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {Array.isArray(teamData.team) ? `${teamData.team.length} team members` : 'No team members'}
        </p>
      </div>
      
      {Array.isArray(teamData.team) && teamData.team.length ? (
        <div className="p-1">
          <div className="overflow-auto max-h-96">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-3 py-2 text-left text-[0.7rem] font-medium text-gray-500 uppercase tracking-wider">Proof</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamData.team.map((member, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                      {member.name || "Unnamed"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {member.email || "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {member.phone || "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {member.designation || "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowtwrap text-xs text-gray-500">
                      {member.organisation || "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {member.gender || "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                      {member.proofUrl ? (
                        <button
                          onClick={() => handleViewProof(member.proofUrl, member)}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-[0.7rem] font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Proof
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-base font-medium mb-2">No team members available</p>
          <p className="text-xs">This paper doesn't have any team members associated with it.</p>
        </div>
      )}
    </Modal>
  );
};

// Stat Card
const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
  <div 
    className="stat-card"
    style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider mb-1" style={{ color: '#6c757d' }}>
          {title}
        </p>
        <div className="metric-value">{value}</div>
      </div>
      <div className="stat-icon-wrapper">
        <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
          {icon}
        </div>
      </div>
    </div>
    <p className="text-[0.7rem]" style={{ color: '#6c757d' }}>{hint}</p>
  </div>
);

// Chart Card
const ChartCard = ({ title, subtitle, children, controls }) => (
  <div className="chart-container">
    <div className="chart-header">
      <div className="chart-header-actions">
        <div className="chart-title-section">
          <h3 className="text-base font-bold mb-0.5" style={{ color: '#111318' }}>{title}</h3>
          {subtitle && <p className="text-xs" style={{ color: '#6c757d' }}>{subtitle}</p>}
        </div>
        {controls && (
          <div className="chart-controls">
            {controls}
          </div>
        )}
      </div>
    </div>
    <div className="chart-body">
      {children}
    </div>
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
      <div className="text-xs" style={{ color: '#6c757d' }}>
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="btn btn-outline btn-sm"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline btn-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm ${
              currentPage === page
                ? 'btn-primary'
                : 'btn-outline'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline btn-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="btn btn-outline btn-sm"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Sortable Table Header Component
const SortableHeader = ({ children, field, sortConfig, onSort }) => {
  const isSorted = sortConfig.key === field;
  const isAscending = sortConfig.direction === 'asc';

  const handleClick = () => {
    onSort(field);
  };

  return (
    <th 
      className={isSorted ? 'sorted' : ''}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="sortable flex items-center gap-2">
        {children}
        <span className="sort-icon">
          {isSorted ? (
            isAscending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4" />
          )}
        </span>
      </div>
    </th>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="custom-tooltip">
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// Donut Chart Component
const DonutChart = ({ data, title, subtitle }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    
    const data = payload[0].payload;
    return (
      <div className="donut-tooltip">
        <div className="donut-tooltip-item">
          <div 
            className="donut-tooltip-color" 
            style={{ backgroundColor: data.color }}
          />
          <span className="donut-tooltip-text">
            {data.name}: {data.value} ({((data.value / total) * 100).toFixed(1)}%)
          </span>
        </div>
      </div>
    );
  };

  const renderLegend = () => (
    <div className="donut-legend">
      {data.map((entry, index) => (
        <div 
          key={entry.name}
          className="donut-legend-item"
          style={{ borderLeftColor: entry.color }}
        >
          <div 
            className="donut-legend-color"
            style={{ backgroundColor: entry.color }}
          />
          <div className="donut-legend-content">
            <div className="donut-legend-value">{entry.value}</div>
            <div className="donut-legend-label">{entry.name}</div>
          </div>
          <div className="donut-legend-percentage">
            {((entry.value / total) * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ChartCard title={title} subtitle={subtitle}>
      <div className="donut-chart-container">
        <div className="donut-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55} /* Reduced */
                outerRadius={75} /* Reduced */
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center-text">
            <div className="donut-total">{total}</div>
            <div className="donut-label">Total</div>
          </div>
        </div>
        {renderLegend()}
      </div>
    </ChartCard>
  );
};

// Paper Trend Chart Component
const PaperTrendChart = ({ data }) => (
  <ChartCard title="Paper Submission Trend" subtitle="Daily paper submission pattern">
    {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6c757d', fontSize: 10 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            allowDecimals={false}
            tick={{ fill: '#6c757d', fontSize: 10 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            name="Papers"
            stroke="#1976D2"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, stroke: '#1976D2', fill: 'white' }}
            activeDot={{ r: 5, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex items-center justify-center h-[240px]">
        <p className="text-sm" style={{ color: '#6c757d' }}>No trend data available</p>
      </div>
    )}
  </ChartCard>
);

// Status Snapshot Chart Component
const StatusSnapshotChart = ({ stats }) => (
  <ChartCard title="Paper Status Snapshot" subtitle="Current status overview">
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={[
          {
            name: "Papers",
            approvedPaper: stats.approvedPaper,
            pending: stats.pending,
            rejected: stats.rejected,
            noPaper: stats.noPaper,
          },
        ]}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis 
          dataKey="name" 
          hide 
        />
        <YAxis 
          allowDecimals={false}
          tick={{ fill: '#6c757d', fontSize: 10 }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

/* ----------------------------- Main Component with DEBUG FIXES ----------------------------- */

const FinalPaperSupport = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approvedPaper: 0,
    noPaper: 0,
    rejected: 0,
    pending: 0,
  });
  const [trend, setTrend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [teamModalData, setTeamModalData] = useState(null);
  const [paperModalData, setPaperModalData] = useState(null);
  const [rejectionModalData, setRejectionModalData] = useState(null);
  const [correctionModalData, setCorrectionModalData] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [correctionFeedback, setCorrectionFeedback] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Debug: Log discount state changes
  useEffect(() => {
    console.log("🔄 Discount state updated:", { isDiscountApplied });
  }, [isDiscountApplied]);

  /**
   * Formats proof URL to ensure it's a complete, valid URL
   */
  const formatProofUrl = (url) => {
    if (!url) return null;
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (url.startsWith('/uploads/')) {
      return `https://s3conference.ksrce.ac.in${url}`;
    }
    
    if (url.includes('proof_')) {
      return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
    }
    
    if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
      return `https://${url.replace(/^\/+/, '')}`;
    }
    
    return url;
  };

  /**
   * Computes statistics for the dashboard cards.
   */
  const computeStats = useCallback((data) => {
    const submittedOrPending = ["submitted", "correction required"]; 
    setStats({
      total: data.length,
      approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
      noPaper: data.filter((d) => d.paperStatus === "no paper").length,
      rejected: data.filter((d) => d.paperStatus === "rejected").length,
      pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
    });
  }, []);

  /**
   * Computes the submission trend based on the creation date.
   */
  const computeTrend = useCallback((data) => {
    const groups = {};
    data.forEach((d) => {
      const date = new Date(d.createdAt).toISOString().split("T")[0];
      groups[date] = (groups[date] || 0) + 1;
    });
    const arr = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrend(arr);
  }, []);

  // Format each user with proper proof URL formatting
  const formatUser = (item) => {
    console.log("🔍 Formatting user data:", { 
      id: item._id, 
      name: item.name,
      workflow: item.workflow,
      registration: item.registration 
    });

    const isDiscount =
      item.workflow?.discountApplied === true ||
      item.workflow?.discount === true ||
      item.workflow?.discountApplied === "true" ||
      item.workflow?.discount === "true" ||
      (item.workflow?.discount || 0) > 0;

    console.log("💰 Discount calculation:", {
      discountApplied: item.workflow?.discountApplied,
      discount: item.workflow?.discount,
      finalDiscount: isDiscount
    });

    const finalPaperLink = 
      item.workflow?.finalPaperUrl ||
      item.registration?.paperUrl ||
      null;

    // Format ALL team members including the main author
    const formattedTeam = Array.isArray(item.registration?.participants) 
      ? item.registration.participants.map(member => ({
          name: member.name || "Unknown",
          email: member.email || "-",
          phone: member.phone || "-",
          designation: member.designation || "-",
          organisation: member.organisation || "-",
          gender: member.gender || "-",
          proofUrl: formatProofUrl(member.proofUrl),
        }))
      : [];

    return {
      id: item._id,
      userId: item.userId || "N/A",
      authorName: item.name || "Unknown",
      email: item.registration?.participants?.[0]?.email || "-",
      mobile: item.registration?.participants?.[0]?.phone || "-",
      uniqueId: item.registration?.uniqueId || "-",
      track: item.registration?.track || "-",
      presentationMode: item.registration?.presentationMode || "-",
      title: item.registration?.abstractTitle || "No Title",
      content: item.registration?.abstractContent || "No content available",
      abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
      paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
      paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
      amountPaid: Number(item.workflow?.amountPaid || 0),
      discount: item.workflow?.discount ?? 0,
      discountApplied: isDiscount,
      createdAt: item.workflow?.createdAt || new Date().toISOString(),
      team: formattedTeam,
      finalPaperUrl: finalPaperLink,
      country: item.registration?.country || "-",
      correctioncontent: item.workflow?.correctioncontent || "",
    };
  };

  // Fetch approved abstracts
  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("📡 Fetching data from API...");
      
      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Raw API response:", data);
      
      const formatted = (Array.isArray(data) ? data : []).map(formatUser);
      console.log("📊 Formatted final paper data:", formatted);
      
      // Filter only approved abstracts
      const approved = formatted.filter((f) => 
        f.abstractStatus === "approved"
      );
      
      console.log("🎯 Approved abstracts only:", approved);
      
      setRows(approved);
      computeStats(approved);
      computeTrend(approved);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setRows([]);
      setStats({
        total: 0,
        approvedPaper: 0,
        noPaper: 0,
        rejected: 0,
        pending: 0,
      });
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows, refreshTrigger]);

  // Update local state after successful API call
  const updatePaperLocal = useCallback((id, newStatus, discountBoolean = null, correctionContent = "") => {
    console.log("🔄 Updating local state:", { id, newStatus, discountBoolean, correctionContent });
    
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          const updatedRow = {
            ...row,
            paperStatus: newStatus.toLowerCase(),
            // Only update discount if it was explicitly passed
            discountApplied: discountBoolean !== null ? discountBoolean : row.discountApplied,
            discount: discountBoolean !== null ? (discountBoolean ? 1 : 0) : row.discount,
            correctioncontent: correctionContent || row.correctioncontent,
          };
          console.log("📝 Updated row:", updatedRow);
          return updatedRow;
        }
        return row;
      });
      
      computeStats(updatedRows);
      computeTrend(updatedRows);

      return updatedRows;
    });
  }, [computeStats, computeTrend]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Search & Filter (Memoized)
  const filteredAndSearchedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = statusFilter.toLowerCase() === "all";

    let filtered = rows.filter((r) => {
      const matchesSearch =
        r.authorName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.uniqueId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.userId.toLowerCase().includes(q) ||
        r.track.toLowerCase().includes(q);

      const matchesFilter =
        isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [rows, searchTerm, statusFilter, sortConfig]);

  // Pagination logic
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedRows.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSearchedRows, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSearchedRows.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Status Badge Component
  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { class: "status-indicator-approved", label: "Approved" },
      rejected: { class: "status-indicator-rejected", label: "Rejected" },
      pending: { class: "status-indicator-pending", label: "Pending" },
      "correction required": { class: "status-indicator-correction-required", label: "Correction" },
      submitted: { class: "status-indicator-submitted", label: "Submitted" },
      "no paper": { class: "status-indicator-no-paper", label: "No Paper" },
      "under review": { class: "status-indicator-under-review", label: "Review" },
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
    return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    if (!filteredAndSearchedRows.length) return alert("No data to export!");

    const exportData = filteredAndSearchedRows.map((abs) => ({
      "Unique ID": abs.uniqueId,
      "User ID": abs.userId,
      "Author Name": abs.authorName,
      Email: abs.email,
      "Mobile": abs.mobile,
      Title: abs.title,
      Track: abs.track,
      "Presentation Mode": abs.presentationMode,
      "Abstract Status": abs.abstractStatus,
      "Paper Status": abs.paperStatus,
      "Payment Status": abs.paymentStatus,
      "Amount Paid": abs.amountPaid,
      "Discount Applied": abs.discountApplied ? "Yes" : "No",
      "Country": abs.country,
      "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
      "Final Paper Link": abs.finalPaperUrl || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
    XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Download function to prevent corruption
  const handleForceDownload = async (fileUrl, userId) => {
    if (!fileUrl) return alert("No file found to download.");

    try {
      setDownloading(true);
      
      // Format the download URL properly
      let downloadUrl = fileUrl;
      if (!fileUrl.startsWith('http')) {
        downloadUrl = `https://s3conference.ksrce.ac.in${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
      }
      
      console.log("⬇️ Downloading:", downloadUrl);

      const customFileName = `Final_Paper_${userId}.docx`;

      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = customFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("❌ Download error:", err);
      alert("Failed to download file. Please try again or check the file URL.");
    } finally {
      setDownloading(false);
    }
  };

  // FIXED: Handle Paper Status Update with COMPREHENSIVE DEBUGGING
  const handlePaperStatusUpdate = async (newStatus, reason = "", feedback = "", discountBoolean = null, file = null) => {
    if (!paperModalData) return;

    setActionLoading(true);
    
    // Use the provided discountBoolean or fallback to current state
    const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
    
    console.log("🚀 STARTING PAPER STATUS UPDATE:", {
      paperModalData: paperModalData,
      newStatus,
      reason,
      feedback,
      discountBoolean,
      finalDiscount,
      isDiscountApplied,
      hasFile: !!file,
      file: file?.name
    });

    try {
      const token = localStorage.getItem("token");
      
      // Use FormData for all requests
      const formData = new FormData();
      
      // CRITICAL FIX: Use the EXACT field names that backend expects
      formData.append("paperAction", newStatus.toLowerCase());
      
      // Handle discount - FIXED: Use correct field name and ensure boolean conversion
      console.log("💰 DISCOUNT DEBUG:", {
        discountBoolean,
        isDiscountApplied,
        finalDiscount,
        type: typeof finalDiscount
      });
      
      formData.append("discount", finalDiscount.toString());
      
      // Add rejection reason if provided
      if (newStatus.toLowerCase() === "rejected" && reason) {
        formData.append("paperrejectedReason", reason);
      }
      
      // Add correction feedback if provided
      if (newStatus.toLowerCase() === "correction required" && feedback) {
        formData.append("correctioncontent", feedback);
      }
      
      // Add file if provided
      if (file) {
        formData.append("file", file);
      }

      // DEBUG: Log all form data entries
      console.log("📦 FORM DATA CONTENTS:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;
      console.log("🌐 API URL:", API_URL);

      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("✅ SERVER RESPONSE:", response.data);

      if (response.data?.success || response.data?.message) {
        const successMessage = `✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " without discount."}`;
        console.log("🎉 SUCCESS:", successMessage);
        alert(successMessage);
        
        // Update local state
        updatePaperLocal(paperModalData.id, newStatus, finalDiscount, feedback);
        
        // Reset all states
        setPaperModalData(null);
        setRejectionModalData(null);
        setCorrectionModalData(null);
        setRejectionReason("");
        setCorrectionFeedback("");
        setSelectedFile(null);
        setIsDiscountApplied(false);
        setRefreshTrigger(prev => !prev);
      } else {
        console.warn("⚠️ Unexpected server response:", response.data);
        alert(response.data?.message || "Unexpected server response.");
      }
    } catch (err) {
      console.error("❌ ERROR updating paper status:", {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      alert(err.response?.data?.message || "Failed to update paper status.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Rejection Submit
  const handleRejectionSubmit = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    console.log("🗑️ Submitting rejection:", { reason: rejectionReason, discount: isDiscountApplied });
    handlePaperStatusUpdate("rejected", rejectionReason.trim(), "", isDiscountApplied, selectedFile);
  };

  // Handle Correction Submit
  const handleCorrectionSubmit = () => {
    if (!correctionFeedback.trim()) {
      alert("Please provide feedback for required corrections.");
      return;
    }
    if (!selectedFile) {
      alert("Please upload a corrected file for the user.");
      return;
    }
    console.log("✏️ Submitting correction:", { feedback: correctionFeedback, discount: isDiscountApplied });
    handlePaperStatusUpdate("correction required", "", correctionFeedback.trim(), isDiscountApplied, selectedFile);
  };

  // Open Paper Management Modal - FIXED: Initialize discount state properly
  const openPaperModal = (row) => {
    console.log("📄 Opening paper modal for:", {
      author: row.authorName,
      currentDiscount: row.discountApplied,
      paperStatus: row.paperStatus
    });
    
    setPaperModalData(row);
    setIsDiscountApplied(row.discountApplied || false);
    setSelectedFile(null);
    setCorrectionFeedback(row.correctioncontent || "");
    
    console.log("🔧 Modal state initialized:", {
      isDiscountApplied: row.discountApplied || false,
      hasCorrectionContent: !!row.correctioncontent
    });
  };

  // Handle direct approval with discount
  const handleDirectApprove = () => {
    console.log("✅ Direct approval with discount:", isDiscountApplied);
    handlePaperStatusUpdate("approved", "", "", isDiscountApplied, selectedFile);
  };

  // Donut Chart Data
  const donutChartData = [
    { name: "Approved", value: stats.approvedPaper, color: "#10B981" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "No Paper", value: stats.noPaper, color: "#6B7280" },
  ].filter(item => item.value > 0);

  return (
    <>
      <style>{finalPaperStyles}</style>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '20px' }}>
        <div className="max-w-7xl mx-auto space-y-5">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 header-gradient leading-tight">
                Final Paper Support
              </h1>
              <p className="text-xs flex items-center gap-2" style={{ color: '#6c757d' }}>
                <BarChart3 className="w-4 h-4" />
                Manage final papers for approved abstracts.
              </p>
            </div>
            <button
              onClick={fetchRows}
              className="btn btn-secondary btn-sm self-start lg:self-auto"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh Data
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard 
              icon={icons.total}
              title="Total Approved Abstracts" 
              value={stats.total.toLocaleString()}
              hint="All approved abstracts"
              color="#1976D2"
              colorDark="#0D47A1"
            />
            <StatCard 
              icon={icons.approvedPaper}
              title="Papers Approved" 
              value={stats.approvedPaper.toLocaleString()}
              hint="Final papers approved"
              color="#10B981"
              colorDark="#059669"
            />
            <StatCard 
              icon={icons.pendingPaper}
              title="Submitted" 
              value={stats.pending.toLocaleString()}
              hint="Awaiting review/correction"
              color="#F59E0B"
              colorDark="#D97706"
            />
            <StatCard 
              icon={icons.rejected}
              title="Papers Rejected" 
              value={stats.rejected.toLocaleString()}
              hint="Papers not accepted"
              color="#EF4444"
              colorDark="#DC2626"
            />
            <StatCard 
              icon={icons.noPaper}
              title="No Paper Uploaded" 
              value={stats.noPaper.toLocaleString()}
              hint="No paper submitted yet"
              color="#6B7280"
              colorDark="#4B5563"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DonutChart 
              title="Paper Status Distribution"
              subtitle="Breakdown of paper statuses"
              data={donutChartData}
            />
            <StatusSnapshotChart stats={stats} />
          </div>

          {/* Trend Chart */}
          <PaperTrendChart data={trend} />

          {/* Enhanced Table Section */}
          <div className="table-container">
            {/* Table Header */}
            <div className="table-toolbar">
              <div className="table-info">
                <h3 className="text-base font-bold" style={{ color: '#111318' }}>
                  Final Paper Submissions
                </h3>
                <span className="text-xs" style={{ color: '#6c757d' }}>
                  {filteredAndSearchedRows.length} records found
                </span>
              </div>
              <div className="table-actions">
                <div className="search-box">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Paper Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="correction required">Correction Required</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="no paper">No Paper</option>
                </select>
                <button
                  onClick={handleExportExcel}
                  className="btn btn-success btn-sm"
                  disabled={filteredAndSearchedRows.length === 0}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Table Content */}
            {loading ? (
              <div className="loading-state">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1976D2' }} />
                <span className="mt-3 text-sm" style={{ color: '#6c757d' }}>Loading papers...</span>
              </div>
            ) : filteredAndSearchedRows.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-base font-semibold" style={{ color: '#111318', marginBottom: '8px' }}>
                  {rows.length === 0 ? 'No papers found' : 'No matching papers'}
                </h4>
                <p className="text-sm" style={{ color: '#6c757d', marginBottom: '20px' }}>
                  {rows.length === 0 
                    ? 'There are no paper submissions yet.' 
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
                {rows.length === 0 && (
                  <button 
                    onClick={fetchRows}
                    className="btn btn-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="table-modern">
                    <thead>
                      <tr>
                        <SortableHeader field="userId" sortConfig={sortConfig} onSort={handleSort}>
                          User ID
                        </SortableHeader>
                        <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
                          Author
                        </SortableHeader>
                        <th>Email</th>
                        <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
                          Title
                        </SortableHeader>
                        <SortableHeader field="paperStatus" sortConfig={sortConfig} onSort={handleSort}>
                          Paper Status
                        </SortableHeader>
                        <th>Discount</th>
                        <th>Team</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRows.map((r) => (
                        <tr key={r.id}>
                          <td className="font-mono text-xs" style={{ color: '#475569' }}>
                            {r.userId}
                          </td>
                          <td>
                            <div className="font-semibold" style={{ color: '#111318', fontSize: '0.8rem' }}>
                              {r.authorName}
                            </div>
                          </td>
                          <td>
                            <div className="text-xs" style={{ color: '#475569' }}>
                              {r.email}
                            </div>
                          </td>
                          <td>
                            <div 
                              className="font-medium text-xs"
                              title={r.title}
                              style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '200px' }}
                            >
                              {r.title}
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {getStatusBadge(r.paperStatus)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {r.discountApplied ? (
                              <span className="text-emerald-600 font-semibold text-xs">
                                Yes
                              </span>
                            ) : (
                              <span className="text-xs" style={{ color: '#6c757d' }}>No</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {Array.isArray(r.team) && r.team.length ? (
                              <button
                                onClick={() => setTeamModalData(r)}
                                className="team-button"
                              >
                                <Users className="w-3 h-3" /> 
                                ({r.team.length})
                              </button>
                            ) : (
                              <span className="text-xs" style={{ color: '#6c757d' }}>-</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              onClick={() => openPaperModal(r)}
                              className="manage-button"
                            >
                              <FileText className="w-3 h-3" />
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Team Modal */}
      {teamModalData && (
        <TeamModal 
          teamData={teamModalData} 
          onClose={() => setTeamModalData(null)}
        />
      )}

      {/* Paper Management Modal */}
      {paperModalData && (
        <Modal onClose={() => setPaperModalData(null)} size="lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Paper Management: {paperModalData.authorName}
            </h2>
            <div className="text-xs text-gray-600 mt-1">
              User ID: {paperModalData.userId} | Discount: {isDiscountApplied ? "Applied" : "Not Applied"}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-96">
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <span className="font-semibold text-sm">Current Paper Status:</span>
                {getStatusBadge(paperModalData.paperStatus)}
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-bold mb-3 text-sm text-gray-900">Paper Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div><strong>Track:</strong> {paperModalData.track}</div>
                  <div><strong>Mode:</strong> {paperModalData.presentationMode}</div>
                  <div><strong>Email:</strong> {paperModalData.email}</div>
                  <div><strong>Mobile:</strong> {paperModalData.mobile}</div>
                  <div><strong>Country:</strong> {paperModalData.country}</div>
                  <div className="flex items-center gap-2">
                    <strong>Abstract:</strong> 
                    {getStatusBadge(paperModalData.abstractStatus)}
                  </div>
                  <div><strong>Current Discount:</strong> 
                    <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
                      {paperModalData.discountApplied ? "Applied" : "Not Applied"}
                    </span>
                  </div>
                  {paperModalData.correctioncontent && (
                    <div className="col-span-2">
                      <strong>Previous Feedback:</strong>
                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-800">{paperModalData.correctioncontent}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 border rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700 text-sm">Uploaded Paper:</span>
                {paperModalData.finalPaperUrl ? (
                  <button
                    onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
                    disabled={downloading}
                    className="btn btn-primary btn-sm"
                  >
                    {downloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-4 h-4" /> Download
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-red-500 text-sm">No Paper Uploaded</span>
                )}
              </div>

              <div className="border p-3 rounded-lg">
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Discount Status (Current: {isDiscountApplied ? "Applied" : "Not Applied"})
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="discountApplied"
                    checked={isDiscountApplied}
                    onChange={(e) => {
                      console.log("🎯 Discount checkbox changed:", e.target.checked);
                      setIsDiscountApplied(e.target.checked);
                    }}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
                    Apply Discount (Only for Students)
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {isDiscountApplied ? 
                    "Discount will be applied when you update status." : 
                    "No discount will be applied."
                  }
                </p>
              </div>

            </div>
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => {
                  setRejectionModalData(paperModalData);
                  setRejectionReason("");
                }}
                className="btn btn-outline btn-sm"
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              
              <button
                onClick={() => {
                  setCorrectionModalData(paperModalData);
                  setCorrectionFeedback(paperModalData.correctioncontent || "");
                }}
                disabled={actionLoading}
                className="btn btn-outline btn-sm"
              >
                <MessageSquare className="w-4 h-4" /> 
                Correction
              </button>

              <button
                onClick={handleDirectApprove}
                disabled={actionLoading}
                className="btn btn-success btn-sm"
              >
                <CheckCircle className="w-4 h-4" /> 
                {actionLoading ? "..." : "Approve"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Rejection Modal */}
      {rejectionModalData && (
        <Modal onClose={() => setRejectionModalData(null)} size="md">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Provide Rejection Reason</h3>
          </div>
          
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="mx-auto w-fit bg-red-100 rounded-full p-3 mb-3">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-500 text-sm">
                Please provide a reason for rejecting this paper.
              </p>
            </div>
            
            <textarea
              rows="4"
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-red-400 outline-none resize-none text-sm"
              placeholder="Write rejection reason here..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            
            <div className="flex gap-3">
              <button
                onClick={() => setRejectionModalData(null)}
                className="btn btn-outline flex-1"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleRejectionSubmit}
                disabled={actionLoading || !rejectionReason.trim()}
                className="btn btn-primary flex-1"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Reject Paper
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Correction Required Modal */}
      {correctionModalData && (
        <Modal onClose={() => setCorrectionModalData(null)} size="lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Provide Correction Feedback</h3>
          </div>
          
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="mx-auto w-fit bg-yellow-100 rounded-full p-3 mb-3">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-gray-500 mb-4 text-sm">
                Provide feedback and upload the corrected file.
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correction Feedback
              </label>
              <textarea
                rows="6"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none resize-none text-sm"
                placeholder="Provide detailed feedback..."
                value={correctionFeedback}
                onChange={(e) => setCorrectionFeedback(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Corrected File (Required)
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                accept=".doc,.docx,.pdf"
                required
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedFile.name}</p>
              )}
              {!selectedFile && (
                <p className="text-sm text-red-500 mt-2">Please upload a corrected file</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setCorrectionModalData(null)}
                className="btn btn-outline flex-1"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleCorrectionSubmit}
                disabled={actionLoading || !correctionFeedback.trim() || !selectedFile}
                className="btn btn-primary flex-1"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
                Submit Correction
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Image Preview Modal */}
      {imagePreviewUrl && (
        <Modal onClose={() => setImagePreviewUrl(null)} size="lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Proof Document Preview</h3>
          </div>
          
          <div className="p-4">
            <div className="max-h-96 overflow-auto flex justify-center">
              {imagePreviewUrl ? (
                <img 
                  src={imagePreviewUrl} 
                  alt="Proof Document" 
                  className="max-w-full h-auto rounded-lg shadow-md object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const errorDiv = e.target.parentNode.querySelector('.image-error');
                    if (errorDiv) errorDiv.style.display = 'block';
                  }}
                />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  No image available
                </div>
              )}
              <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
                <p>Failed to load image.</p>
                <p className="text-sm text-gray-600 break-all mt-2">{imagePreviewUrl}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-gray-500 break-all flex-1 text-center sm:text-left">
                {imagePreviewUrl}
              </span>
              <button 
                onClick={() => window.open(imagePreviewUrl, '_blank')}
                className="btn btn-primary whitespace-nowrap btn-sm"
              >
                <Eye className="w-4 h-4" />
                Open in New Tab
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FinalPaperSupport;