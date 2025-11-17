// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import * as XLSX from "xlsx";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
//   Area,
//   AreaChart,
// } from "recharts";
// import {
//   Loader,
//   Download,
//   Users,
//   CheckCircle,
//   XCircle,
//   FileText,
//   DollarSign,
//   Globe,
//   TrendingUp,
//   RefreshCw,
//   ChevronRight,
//   Calendar,
//   BarChart3,
//   Filter,
// } from "lucide-react";

// /* ----------------------------- Styles ----------------------------- */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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
//     background: linear-gradient(135deg, var(--text-primary) 0%, #4a5568 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .metric-trend {
//     display: inline-flex;
//     align-items: center;
//     gap: 4px;
//     padding: 4px 8px;
//     border-radius: 6px;
//     font-size: 0.75rem;
//     font-weight: 600;
//     background: rgba(16, 185, 129, 0.1);
//     color: #059669;
//   }

//   .chart-container {
//     background: white;
//     border-radius: 24px;
//     border: 1px solid rgba(0, 0, 0, 0.06);
//     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
//     overflow: hidden;
//     transition: all 0.4s ease;
//     position: relative; /* Add this */
//   }

//   .chart-container:hover {
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
//   }

//   .chart-header {
//     padding: 24px 28px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.06);
//     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
//     position: relative; /* Add this */
//     z-index: 5; /* Add this */
//   }

//   .chart-body {
//     padding: 28px;
//   }

//   .btn {
//     position: relative;
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 12px 24px;
//     border: none;
//     border-radius: 12px;
//     font-size: 0.9375rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
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
//     background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
//   }

//   .btn-primary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-secondary {
//     background: linear-gradient(135deg, var(--brand-blue-primary) 0%, var(--brand-blue-dark) 100%);
//     color: white;
//     box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//   }

//   .btn-secondary:hover:not(:disabled) {
//     box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
//     transform: translateY(-2px);
//   }

//   .btn-outline {
//     background: transparent;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     color: var(--text-primary);
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
//   }

//   .btn-sm {
//     padding: 8px 16px;
//     font-size: 0.875rem;
//   }

//   .table-modern {
//     width: 100%;
//     border-collapse: separate;
//     border-spacing: 0;
//   }

//   .table-modern thead {
//     background: linear-gradient(180deg, #fafbfc 0%, #f5f7fa 100%);
//   }

//   .table-modern th {
//     padding: 16px 20px;
//     font-size: 0.8125rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: var(--text-secondary);
//     border-bottom: 2px solid rgba(0, 0, 0, 0.06);
//   }

//   .table-modern tbody tr {
//     transition: all 0.2s ease;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.04);
//   }

//   .table-modern tbody tr:hover {
//     background: linear-gradient(90deg, var(--brand-blue-light) 0%, transparent 100%);
//     transform: translateX(4px);
//   }

//   .table-modern td {
//     padding: 18px 20px;
//     color: var(--text-primary);
//   }

//   .badge-modern {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     min-width: 52px;
//     padding: 6px 14px;
//     border-radius: 12px;
//     font-weight: 600;
//     font-size: 0.875rem;
//     background: linear-gradient(135deg, var(--brand-blue-light) 0%, #E3F2FD 100%);
//     color: var(--brand-blue-dark);
//     box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
//   }

//   .progress-bar {
//     height: 6px;
//     background: rgba(0, 0, 0, 0.06);
//     border-radius: 3px;
//     overflow: hidden;
//   }

//   .progress-fill {
//     height: 100%;
//     background: linear-gradient(90deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
//     border-radius: 3px;
//     transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .modal-backdrop {
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.6);
//     backdrop-filter: blur(8px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1000;
//     animation: fadeIn 0.2s ease;
//   }

//   .modal-content {
//     background: white;
//     border-radius: 24px;
//     box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
//     animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   .header-gradient {
//     background: linear-gradient(135deg, var(--brand-blue-dark) 0%, var(--brand-blue-primary) 50%, var(--brand-orange) 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .filter-dropdown {
//     position: relative;
//     display: inline-block;
//   }

//   .filter-menu {
//     position: absolute;
//     top: 100%;
//     right: 0;
//     margin-top: 8px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     padding: 16px;
//     min-width: 280px; /* Increased width */
//     max-height: 400px; /* Added max height */
//     overflow-y: auto; /* Added scroll */
//     z-index: 1000; /* Increased z-index */
//   }

//   /* Custom scrollbar for filter menu */
//   .filter-menu::-webkit-scrollbar {
//     width: 6px;
//   }

//   .filter-menu::-webkit-scrollbar-track {
//     background: #f1f1f1;
//     border-radius: 3px;
//   }

//   .filter-menu::-webkit-scrollbar-thumb {
//     background: #c1c1c1;
//     border-radius: 3px;
//   }

//   .filter-menu::-webkit-scrollbar-thumb:hover {
//     background: #a8a8a8;
//   }

//   .date-input {
//     padding: 8px 12px;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     border-radius: 6px;
//     font-size: 0.875rem;
//     width: 100%;
//     margin-bottom: 12px;
//   }

//   .date-input:focus {
//     outline: none;
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
//   }

//   .filter-actions {
//     display: flex;
//     gap: 8px;
//     margin-top: 12px;
//   }

//   /* Ensure the dropdown stays above other content */
//   .chart-header > * {
//     position: relative;
//     z-index: 10;
//   }
// `;

// /* ----------------------------- Components ----------------------------- */

// const Modal = ({ children, onClose, size = "md" }) => {
//   const sizeClasses = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className={`modal-content w-full ${sizeClasses[size]} p-8 m-4`} onClick={e => e.stopPropagation()}>
//         <button 
//           onClick={onClose} 
//           className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
//         >
//           <XCircle className="w-6 h-6" />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon, title, value, hint, color, colorDark, trend }) => (
//   <div 
//     className="stat-card glass-card rounded-2xl p-6"
//     style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
//   >
//     <div className="flex items-start justify-between mb-4">
//       <div className="flex-1">
//         <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
//           {title}
//         </p>
//         <div className="metric-value">{value}</div>
//         {trend && (
//           <div className="metric-trend mt-2">
//             <TrendingUp className="w-3 h-3" />
//             <span>{trend}</span>
//           </div>
//         )}
//       </div>
//       <div className="stat-icon-wrapper">
//         <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
//           {icon}
//         </div>
//       </div>
//     </div>
//     <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{hint}</p>
//   </div>
// );

// const ChartCard = ({ title, subtitle, children, action }) => (
//   <div className="chart-container">
//     <div className="chart-header">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
//           {subtitle && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
//         </div>
//         {action}
//       </div>
//     </div>
//     <div className="chart-body">
//       {children}
//     </div>
//   </div>
// );

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;
  
//   return (
//     <div style={{
//       background: 'white',
//       border: '1px solid rgba(0,0,0,0.1)',
//       borderRadius: '12px',
//       padding: '12px 16px',
//       boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
//     }}>
//       <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
//       {payload.map((entry, index) => (
//         <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
//           {entry.name}: {entry.value}
//         </p>
//       ))}
//     </div>
//   );
// };

// const DateFilter = ({ onDateRangeChange, currentRange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const quickRanges = [
//     { label: "Last 7 days", days: 7 },
//     { label: "Last 30 days", days: 30 },
//     { label: "Last 90 days", days: 90 },
//     { label: "Last 6 months", days: 180 },
//     { label: "Last year", days: 365 },
//     { label: "All time", days: null }
//   ];

//   const handleQuickRange = (days) => {
//     if (days === null) {
//       // Show all data
//       setStartDate("");
//       setEndDate("");
//       onDateRangeChange(null, null);
//     } else {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(start.getDate() - days);
      
//       setStartDate(start.toISOString().split('T')[0]);
//       setEndDate(end.toISOString().split('T')[0]);
//       onDateRangeChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
//     }
//     setIsOpen(false);
//   };

//   const handleCustomRange = () => {
//     if (startDate && endDate) {
//       onDateRangeChange(startDate, endDate);
//       setIsOpen(false);
//     }
//   };

//   const handleClearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//     onDateRangeChange(null, null);
//     setIsOpen(false);
//   };

//   const formatDateRange = () => {
//     if (!currentRange.startDate || !currentRange.endDate) return "All Time";
    
//     const start = new Date(currentRange.startDate).toLocaleDateString();
//     const end = new Date(currentRange.endDate).toLocaleDateString();
//     return `${start} - ${end}`;
//   };

//   return (
//     <div className="filter-dropdown">
//       <button
//         className="btn btn-outline btn-sm"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Filter className="w-4 h-4" />
//         {formatDateRange()}
//         <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="filter-menu">
//           <div className="mb-4">
//             <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
//               Quick Ranges
//             </h4>
//             <div className="space-y-2">
//               {quickRanges.map((range) => (
//                 <button
//                   key={range.label}
//                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   onClick={() => handleQuickRange(range.days)}
//                 >
//                   {range.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="border-t pt-4">
//             <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
//               Custom Range
//             </h4>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   className="date-input"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   className="date-input"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="filter-actions">
//               <button
//                 className="btn btn-primary btn-sm flex-1"
//                 onClick={handleCustomRange}
//                 disabled={!startDate || !endDate}
//               >
//                 Apply
//               </button>
//               <button
//                 className="btn btn-outline btn-sm flex-1"
//                 onClick={handleClearFilter}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ----------------------------- Main Component ----------------------------- */

// const MainDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     abstractApproved: 0,
//     abstractRejected: 0,
//     paperApproved: 0,
//     paperRejected: 0,
//     paperPending: 0,
//     revenue: 0,
//     totalCountries: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [filteredTrend, setFilteredTrend] = useState([]);
//   const [countryCounts, setCountryCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [countryModalData, setCountryModalData] = useState(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null
//   });

//   const safeNumber = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   };

//   const fetchRegistrations = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const res = await fetch("https://s3conference.ksrce.ac.in/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
//       const data = await res.json();
//       const allUsers = Array.isArray(data) ? data : [];
//       const validRegistrations = allUsers.filter((user) => user?.registration || user?.userId);

//       updateStats(validRegistrations);
//       updateTrend(validRegistrations);
//       updateCountryCounts(validRegistrations);
//     } catch (err) {
//       console.error("Error:", err);
//       setStats({ total: 0, abstractApproved: 0, abstractRejected: 0, paperApproved: 0, paperRejected: 0, paperPending: 0, revenue: 0, totalCountries: 0 });
//       setTrend([]);
//       setFilteredTrend([]);
//       setCountryCounts({});
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRegistrations();
//   }, [fetchRegistrations]);

//   const updateStats = (data) => {
//     const total = data.length;
//     let abstractApproved = 0;
//     let abstractRejected = 0;
//     let paperApproved = 0;
//     let paperRejected = 0;
//     let paperPending = 0;
//     let revenue = 0;

//     data.forEach((user) => {
//       const workflow = user?.workflow || {};
      
//       // Get status from workflow or root level
//       const abstractStatus = (workflow.abstractStatus || user.abstractStatus || "").toLowerCase();
//       const paperStatus = (workflow.paperStatus || user.paperStatus || "").toLowerCase();
      
//       // Get payment data from registration.payment
//       const payment = user?.registration?.payment || {};
//       const paymentStatus = (payment.paymentStatus || "unpaid").toLowerCase();
//       const amountPaid = safeNumber(payment.amountPaid || 0);

//       if (abstractStatus === "approved") abstractApproved++;
//       if (abstractStatus === "rejected") abstractRejected++;
      
//       // Paper status tracking
//       if (paperStatus === "approved") paperApproved++;
//       if (paperStatus === "rejected") paperRejected++;
//       if (!paperStatus || paperStatus === "pending" || paperStatus === "submitted") paperPending++;
      
//       if (paymentStatus === "paid") revenue += amountPaid;
//     });

//     setStats({ 
//       total, 
//       abstractApproved, 
//       abstractRejected, 
//       paperApproved, 
//       paperRejected,
//       paperPending,
//       revenue,
//       totalCountries: 0 // This will be updated in updateCountryCounts
//     });
//   };

//   const updateTrend = (data) => {
//     const groups = {};
//     data.forEach((user) => {
//       const date = new Date(user?.createdAt || user?.workflow?.createdAt || new Date()).toISOString().split("T")[0];
//       groups[date] = (groups[date] || 0) + 1;
//     });
//     const arr = Object.entries(groups)
//       .map(([date, count]) => ({ date, count }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTrend(arr);
//     setFilteredTrend(arr); // Initialize filtered trend with all data
//   };

//   const updateCountryCounts = (data) => {
//     const counts = {};
    
//     data.forEach((user) => {
//       // Extract country from payment object inside registration
//       const country = user?.registration?.payment?.country;
      
//       if (country && country !== "-" && country !== "" && country !== null && country !== undefined) {
//         // Clean and normalize the country name
//         const cleanCountry = country.toString().trim();
//         if (cleanCountry) {
//           counts[cleanCountry] = (counts[cleanCountry] || 0) + 1;
//         }
//       }
//     });

//     setCountryCounts(counts);
//     setStats(prev => ({ ...prev, totalCountries: Object.keys(counts).length }));
//   };

//   // Improved date filtering function
//   const filterTrendData = useCallback((startDate, endDate, trendData) => {
//     if (!startDate || !endDate) {
//       return trendData; // Return all data if no filter
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);
    
//     // Set time to beginning and end of day for proper comparison
//     start.setHours(0, 0, 0, 0);
//     end.setHours(23, 59, 59, 999);

//     return trendData.filter(item => {
//       const itemDate = new Date(item.date);
//       itemDate.setHours(12, 0, 0, 0); // Set to noon for consistent comparison
//       return itemDate >= start && itemDate <= end;
//     });
//   }, []);

//   const handleDateRangeChange = useCallback((startDate, endDate) => {
//     setDateRange({ startDate, endDate });
    
//     const filtered = filterTrendData(startDate, endDate, trend);
//     setFilteredTrend(filtered);
//   }, [trend, filterTrendData]);

//   // Update filtered trend when main trend data changes
//   useEffect(() => {
//     const filtered = filterTrendData(dateRange.startDate, dateRange.endDate, trend);
//     setFilteredTrend(filtered);
//   }, [trend, dateRange.startDate, dateRange.endDate, filterTrendData]);

//   const handleExportExcel = () => {
//     const exportData = Object.entries(countryCounts).map(([country, count]) => ({
//       Country: country,
//       Participants: count,
//     }));

//     if (exportData.length === 0) return alert("No data to export!");

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "CountryDistribution");
//     XLSX.writeFile(wb, `country_distribution_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Paper submission data for donut chart
//   const paperSubmissionData = [
//     { name: "Approved", value: stats.paperApproved },
//     { name: "Rejected", value: stats.paperRejected },
//     { name: "Pending", value: stats.paperPending },
//   ].filter(d => d.value > 0);

//   const countryData = useMemo(() => {
//     return Object.entries(countryCounts)
//       .map(([country, count]) => ({ country, count }))
//       .sort((a, b) => b.count - a.count);
//   }, [countryCounts]);

//   const CHART_COLORS = {
//     approved: "#10B981",
//     rejected: "#D32F2F",
//     pending: "#F59E0B",
//     blue: "#1976D2",
//     purple: "#7C3AED",
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Conference Analytics
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
//                 <BarChart3 className="w-4 h-4" />
//                 Real-time insights and global participation metrics
//               </p>
//             </div>
//             <button
//               onClick={fetchRegistrations}
//               className="btn btn-secondary"
//               disabled={loading}
//               style={{ flexShrink: 0 }}
//             >
//               {loading ? <Loader className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//               Refresh Data
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <StatCard 
//               icon={<Users className="w-6 h-6" />}
//               title="Total Registrations" 
//               value={stats.total.toLocaleString()}
//               hint="All registered participants"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//               <StatCard 
//                 icon={<FileText className="w-6 h-6" />}
//                 title="Papers Approved" 
//                 value={stats.paperApproved.toLocaleString()}
//                 hint="Final papers accepted"
//                 color="#7C3AED"
//                 colorDark="#5B21B6"
//               />
//               <StatCard 
//                 icon={<FileText className="w-6 h-6" />}
//                 title="Papers Pending" 
//                 value={stats.paperPending.toLocaleString()}
//                 hint="Awaiting review"
//                 color="#F59E0B"
//                 colorDark="#D97706"
//               />
//             <StatCard 
//               icon={<XCircle className="w-6 h-6" />}
//               title="Paper Rejected" 
//               value={stats.paperRejected.toLocaleString()}
//               hint="Declined paper submissions"
//               color="#D32F2F"
//               colorDark="#B71C1C"
//             />
//             <StatCard 
//               icon={<DollarSign className="w-6 h-6" />}
//               title="Total Revenue" 
//               value={`₹${stats.revenue.toLocaleString()}`}
//               hint="Confirmed payments received"
//               color="#F57C00"
//               colorDark="#E65100"
//             />
//             <StatCard 
//               icon={<Globe className="w-6 h-6" />}
//               title="Global Reach" 
//               value={stats.totalCountries.toLocaleString()}
//               hint="Participating countries"
//               color="#0D47A1"
//               colorDark="#01579B"
//             />
//           </div>

//           {/* Charts Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
//             {/* Paper Submission Status Distribution */}
//             <ChartCard 
//               title="Paper Submission Status"
//               subtitle="Breakdown of paper submission reviews"
//             >
//               <ResponsiveContainer width="100%" height={320}>
//                 <PieChart>
//                   <defs>
//                     <linearGradient id="approvedGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
//                       <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
//                     </linearGradient>
//                     <linearGradient id="rejectedGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#D32F2F" stopOpacity={1}/>
//                       <stop offset="100%" stopColor="#B71C1C" stopOpacity={1}/>
//                     </linearGradient>
//                     <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
//                       <stop offset="100%" stopColor="#D97706" stopOpacity={1}/>
//                     </linearGradient>
//                   </defs>
//                   <Pie
//                     data={paperSubmissionData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={70}
//                     outerRadius={110}
//                     paddingAngle={4}
//                     dataKey="value"
//                   >
//                     {paperSubmissionData.map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={entry.name === 'Approved' ? 'url(#approvedGrad)' : 
//                               entry.name === 'Rejected' ? 'url(#rejectedGrad)' : 
//                               'url(#pendingGrad)'} 
//                         stroke="white"
//                         strokeWidth={3}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend 
//                     verticalAlign="bottom" 
//                     height={50}
//                     iconType="circle"
//                     formatter={(value) => <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{value}</span>}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartCard>

//             {/* Registration Trend */}
//             <ChartCard 
//               title="Registration Trend"
//               subtitle={`Daily participant registrations (${filteredTrend.length} days shown)`}
//               action={
//                 <DateFilter 
//                   onDateRangeChange={handleDateRangeChange}
//                   currentRange={dateRange}
//                 />
//               }
//             >
//               {filteredTrend.length === 0 ? (
//                 <div className="flex items-center justify-center h-80">
//                   <div className="text-center">
//                     <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
//                     <p style={{ color: 'var(--text-secondary)' }}>No data available for selected date range</p>
//                   </div>
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={320}>
//                   <AreaChart data={filteredTrend}>
//                     <defs>
//                       <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#1976D2" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
//                     <XAxis 
//                       dataKey="date" 
//                       tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
//                       stroke="rgba(0,0,0,0.1)"
//                       tickLine={false}
//                     />
//                     <YAxis 
//                       allowDecimals={false}
//                       tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
//                       stroke="rgba(0,0,0,0.1)"
//                       tickLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Area
//                       type="monotone"
//                       dataKey="count"
//                       name="Registrations"
//                       stroke="#1976D2"
//                       strokeWidth={3}
//                       fill="url(#trendGradient)"
//                       dot={{ r: 4, strokeWidth: 2, stroke: '#1976D2', fill: 'white' }}
//                       activeDot={{ r: 6, strokeWidth: 2, stroke: 'white' }}
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               )}
//             </ChartCard>
//           </div>

//           {/* Registration Overview Bar Chart */}
//           <ChartCard 
//             title="Registration Overview"
//             subtitle="Comparative analysis of registration stages"
//           >
//             <ResponsiveContainer width="100%" height={340}>
//               <BarChart
//                 data={[
//                   {
//                     name: "Registration Metrics",
//                     total: stats.total,
//                     abstractApproved: stats.abstractApproved,
//                     paperApproved: stats.paperApproved,
//                   },
//                 ]}
//                 barGap={12}
//               >
//                 <defs>
//                   <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#1976D2" stopOpacity={1}/>
//                     <stop offset="100%" stopColor="#0D47A1" stopOpacity={1}/>
//                   </linearGradient>
//                   <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
//                     <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
//                   </linearGradient>
//                   <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#7C3AED" stopOpacity={1}/>
//                     <stop offset="100%" stopColor="#5B21B6" stopOpacity={1}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
//                 <XAxis 
//                   dataKey="name" 
//                   tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
//                   stroke="rgba(0,0,0,0.1)"
//                   tickLine={false}
//                 />
//                 <YAxis 
//                   allowDecimals={false}
//                   tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
//                   stroke="rgba(0,0,0,0.1)"
//                   tickLine={false}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend 
//                   verticalAlign="top" 
//                   height={50}
//                   iconType="rect"
//                   formatter={(value) => <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{value}</span>}
//                 />
//                 <Bar 
//                   dataKey="total" 
//                   name="Total Registrations" 
//                   fill="url(#blueGrad)" 
//                   radius={[12, 12, 0, 0]}
//                   maxBarSize={80}
//                 />
//                 <Bar 
//                   dataKey="abstractApproved" 
//                   name="Abstracts Approved" 
//                   fill="url(#greenGrad)"
//                   radius={[12, 12, 0, 0]}
//                   maxBarSize={80}
//                 />
//                 <Bar 
//                   dataKey="paperApproved" 
//                   name="Papers Approved" 
//                   fill="url(#purpleGrad)"
//                   radius={[12, 12, 0, 0]}
//                   maxBarSize={80}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           {/* Country Distribution Table */}
//           <div className="chart-container">
//             <div className="chart-header">
//               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
//                     Country-wise Distribution
//                   </h3>
//                   <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                     Real participant breakdown by country
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-primary"
//                 >
//                   <Download className="w-4 h-4" />
//                   Export Data
//                 </button>
//               </div>
//             </div>

//             <div className="px-7 py-7">
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
//                   Country-wise Breakdown
//                 </h4>
//                 <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ 
//                   background: 'var(--brand-blue-light)', 
//                   color: 'var(--brand-blue-primary)' 
//                 }}>
//                   {countryData.length} Countries
//                 </span>
//               </div>
              
//               {countryData.length === 0 ? (
//                 <div className="text-center py-16">
//                   <Globe className="w-12 h-12 mx-auto mb-3 opacity-20" />
//                   <p style={{ color: 'var(--text-secondary)' }}>No country data available</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="table-modern">
//                     <thead>
//                       <tr>
//                         <th style={{ textAlign: 'left' }}>Country</th>
//                         <th style={{ textAlign: 'center' }}>Participants</th>
//                         <th style={{ textAlign: 'right' }}>Distribution</th>
//                         <th style={{ textAlign: 'right' }}>Percentage</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {countryData.map((item, index) => {
//                         const percentage = (item.count / stats.total) * 100;
//                         return (
//                           <tr key={index}>
//                             <td style={{ fontWeight: 600 }}>
//                               <div className="flex items-center gap-2">
//                                 <span style={{
//                                   display: 'inline-block',
//                                   width: '6px',
//                                   height: '6px',
//                                   borderRadius: '50%',
//                                   background: 'linear-gradient(135deg, #F57C00, #E65100)'
//                                 }} />
//                                 {item.country}
//                               </div>
//                             </td>
//                             <td style={{ textAlign: 'center' }}>
//                               <span className="badge-modern">
//                                 {item.count}
//                               </span>
//                             </td>
//                             <td style={{ textAlign: 'right' }}>
//                               <div className="progress-bar" style={{ width: '120px', marginLeft: 'auto' }}>
//                                 <div 
//                                   className="progress-fill"
//                                   style={{ width: `${Math.min(percentage * 2, 100)}%` }}
//                                 />
//                               </div>
//                             </td>
//                             <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--brand-orange)' }}>
//                               {percentage.toFixed(1)}%
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Country Details Modal */}
//           {countryModalData && (
//             <Modal onClose={() => setCountryModalData(null)} size="sm">
//               <div className="text-center py-6">
//                 <div 
//                   style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '50%',
//                     margin: '0 auto 24px',
//                     background: 'linear-gradient(135deg, #F57C00, #E65100)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     boxShadow: '0 12px 32px rgba(245, 124, 0, 0.3)'
//                   }}
//                 >
//                   <Globe className="w-10 h-10" style={{ color: 'white' }} />
//                 </div>
                
//                 <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
//                   {countryModalData.country}
//                 </h3>
                
//                 <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
//                   Participant Analytics
//                 </p>
                
//                 <div 
//                   className="inline-block px-8 py-5 rounded-2xl mb-6"
//                   style={{ 
//                     background: 'linear-gradient(135deg, var(--brand-blue-light) 0%, #E3F2FD 100%)',
//                     border: '1px solid rgba(25, 118, 210, 0.1)'
//                   }}
//                 >
//                   <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
//                     Total Participants
//                   </div>
//                   <div 
//                     className="text-5xl font-bold"
//                     style={{ 
//                       background: 'linear-gradient(135deg, #F57C00, #E65100)',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text'
//                     }}
//                   >
//                     {countryModalData.count}
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-center gap-6 text-sm">
//                   <div>
//                     <div style={{ color: 'var(--text-secondary)' }}>Share of Total</div>
//                     <div className="text-xl font-bold mt-1" style={{ color: 'var(--brand-blue-primary)' }}>
//                       {((countryModalData.count / stats.total) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                   <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.1)' }} />
//                   <div>
//                     <div style={{ color: 'var(--text-secondary)' }}>Rank</div>
//                     <div className="text-xl font-bold mt-1" style={{ color: 'var(--brand-orange)' }}>
//                       #{countryData.findIndex(c => c.country === countryModalData.country) + 1}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainDashboard;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  Loader,
  Download,
  Users,
  XCircle,
  FileText,
  DollarSign,
  Globe,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Calendar,
  BarChart3,
  Filter,
} from "lucide-react";

/* ----------------------------- Styles ----------------------------- */
const styles = `
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
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px; /* Base font size reduced */
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
  }

  .stat-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px; /* Reduced from 56px */
    height: 42px; /* Reduced from 56px */
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .stat-icon-wrapper::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    opacity: 0.2;
    filter: blur(6px);
  }

  .metric-value {
    font-size: 1.5rem; /* Reduced from 2rem */
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--text-primary) 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .metric-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
  }

  .chart-container {
    background: white;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s ease;
    position: relative;
  }

  .chart-header {
    padding: 12px 20px; /* Significantly reduced padding */
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
    position: relative;
    z-index: 5;
  }

  .chart-body {
    padding: 16px; /* Reduced padding */
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px; /* Reduced padding */
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
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
    background: linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: linear-gradient(135deg, var(--brand-blue-primary) 0%, var(--brand-blue-dark) 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }

  .btn-secondary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: var(--text-primary);
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
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  .table-modern {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  .table-modern thead {
    background: linear-gradient(180deg, #fafbfc 0%, #f5f7fa 100%);
  }

  .table-modern th {
    padding: 10px 16px; /* Reduced padding */
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    border-bottom: 2px solid rgba(0, 0, 0, 0.06);
  }

  .table-modern tbody tr {
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }

  .table-modern tbody tr:hover {
    background: linear-gradient(90deg, var(--brand-blue-light) 0%, transparent 100%);
    transform: translateX(2px);
  }

  .table-modern td {
    padding: 10px 16px; /* Reduced padding */
    font-size: 0.85rem;
    color: var(--text-primary);
  }

  .badge-modern {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    padding: 4px 10px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.75rem;
    background: linear-gradient(135deg, var(--brand-blue-light) 0%, #E3F2FD 100%);
    color: var(--brand-blue-dark);
    box-shadow: 0 2px 6px rgba(25, 118, 210, 0.15);
  }

  .progress-bar {
    height: 5px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--brand-orange) 0%, var(--brand-orange-dark) 100%);
    border-radius: 3px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header-gradient {
    background: linear-gradient(135deg, var(--brand-blue-dark) 0%, var(--brand-blue-primary) 50%, var(--brand-orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .filter-dropdown {
    position: relative;
    display: inline-block;
  }

  .filter-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 6px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px;
    min-width: 240px;
    max-height: 360px;
    overflow-y: auto;
    z-index: 1000;
  }

  /* Custom scrollbar for filter menu */
  .filter-menu::-webkit-scrollbar {
    width: 5px;
  }

  .filter-menu::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .filter-menu::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .filter-menu::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  .date-input {
    padding: 6px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    font-size: 0.8rem;
    width: 100%;
    margin-bottom: 8px;
  }

  .date-input:focus {
    outline: none;
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  .filter-actions {
    display: flex;
    gap: 6px;
    margin-top: 10px;
  }

  /* Ensure the dropdown stays above other content */
  .chart-header > * {
    position: relative;
    z-index: 10;
  }
`;

/* ----------------------------- Components ----------------------------- */

const Modal = ({ children, onClose, size = "md" }) => {
  const sizeClasses = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-3xl" };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-content w-full ${sizeClasses[size]} p-6 m-4`} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, hint, color, colorDark, trend }) => (
  <div 
    className="stat-card glass-card rounded-xl p-4"
    style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
          {title}
        </p>
        <div className="metric-value">{value}</div>
        {trend && (
          <div className="metric-trend mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="stat-icon-wrapper">
        <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
      </div>
    </div>
    <p className="text-[0.7rem]" style={{ color: 'var(--text-secondary)' }}>{hint}</p>
  </div>
);

const ChartCard = ({ title, subtitle, children, action }) => (
  <div className="chart-container">
    <div className="chart-header">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          {subtitle && <p className="text-[0.7rem]" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
    <div className="chart-body">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: '8px',
      padding: '8px 12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
    }}>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ fontSize: '0.75rem', fontWeight: 600, color: entry.color, margin: '2px 0' }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const DateFilter = ({ onDateRangeChange, currentRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const quickRanges = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "All time", days: null }
  ];

  const handleQuickRange = (days) => {
    if (days === null) {
      setStartDate("");
      setEndDate("");
      onDateRangeChange(null, null);
    } else {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - days);
      
      setStartDate(start.toISOString().split('T')[0]);
      setEndDate(end.toISOString().split('T')[0]);
      onDateRangeChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    }
    setIsOpen(false);
  };

  const handleCustomRange = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
      setIsOpen(false);
    }
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    onDateRangeChange(null, null);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!currentRange.startDate || !currentRange.endDate) return "All Time";
    
    const start = new Date(currentRange.startDate).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
    const end = new Date(currentRange.endDate).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="filter-dropdown">
      <button
        className="btn btn-outline btn-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter className="w-3 h-3" />
        {formatDateRange()}
        <ChevronRight className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="filter-menu">
          <div className="mb-3">
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Quick Ranges
            </h4>
            <div className="space-y-1">
              {quickRanges.map((range) => (
                <button
                  key={range.label}
                  className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-xs"
                  onClick={() => handleQuickRange(range.days)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Custom Range
            </h4>
            <div className="space-y-2">
              <div>
                <label className="block text-[0.65rem] font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Start
                </label>
                <input
                  type="date"
                  className="date-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[0.65rem] font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  End
                </label>
                <input
                  type="date"
                  className="date-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="filter-actions">
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={handleCustomRange}
                disabled={!startDate || !endDate}
              >
                Apply
              </button>
              <button
                className="btn btn-outline btn-sm flex-1"
                onClick={handleClearFilter}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------- Main Component ----------------------------- */

const MainDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    abstractApproved: 0,
    abstractRejected: 0,
    paperApproved: 0,
    paperRejected: 0,
    paperPending: 0,
    revenue: 0,
    totalCountries: 0,
  });
  const [trend, setTrend] = useState([]);
  const [filteredTrend, setFilteredTrend] = useState([]);
  const [countryCounts, setCountryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [countryModalData, setCountryModalData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("https://s3conference.ksrce.ac.in/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      const allUsers = Array.isArray(data) ? data : [];
      const validRegistrations = allUsers.filter((user) => user?.registration || user?.userId);

      updateStats(validRegistrations);
      updateTrend(validRegistrations);
      updateCountryCounts(validRegistrations);
    } catch (err) {
      console.error("Error:", err);
      setStats({ total: 0, abstractApproved: 0, abstractRejected: 0, paperApproved: 0, paperRejected: 0, paperPending: 0, revenue: 0, totalCountries: 0 });
      setTrend([]);
      setFilteredTrend([]);
      setCountryCounts({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const updateStats = (data) => {
    const total = data.length;
    let abstractApproved = 0;
    let abstractRejected = 0;
    let paperApproved = 0;
    let paperRejected = 0;
    let paperPending = 0;
    let revenue = 0;

    data.forEach((user) => {
      const workflow = user?.workflow || {};
      const abstractStatus = (workflow.abstractStatus || user.abstractStatus || "").toLowerCase();
      const paperStatus = (workflow.paperStatus || user.paperStatus || "").toLowerCase();
      const payment = user?.registration?.payment || {};
      const paymentStatus = (payment.paymentStatus || "unpaid").toLowerCase();
      const amountPaid = safeNumber(payment.amountPaid || 0);

      if (abstractStatus === "approved") abstractApproved++;
      if (abstractStatus === "rejected") abstractRejected++;
      
      if (paperStatus === "approved") paperApproved++;
      if (paperStatus === "rejected") paperRejected++;
      if (!paperStatus || paperStatus === "pending" || paperStatus === "submitted") paperPending++;
      
      if (paymentStatus === "paid") revenue += amountPaid;
    });

    setStats({ 
      total, abstractApproved, abstractRejected, paperApproved, paperRejected, paperPending, revenue, totalCountries: 0 
    });
  };

  const updateTrend = (data) => {
    const groups = {};
    data.forEach((user) => {
      const date = new Date(user?.createdAt || user?.workflow?.createdAt || new Date()).toISOString().split("T")[0];
      groups[date] = (groups[date] || 0) + 1;
    });
    const arr = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrend(arr);
    setFilteredTrend(arr);
  };

  const updateCountryCounts = (data) => {
    const counts = {};
    data.forEach((user) => {
      const country = user?.registration?.payment?.country;
      if (country && country !== "-" && country !== "" && country !== null && country !== undefined) {
        const cleanCountry = country.toString().trim();
        if (cleanCountry) counts[cleanCountry] = (counts[cleanCountry] || 0) + 1;
      }
    });
    setCountryCounts(counts);
    setStats(prev => ({ ...prev, totalCountries: Object.keys(counts).length }));
  };

  const filterTrendData = useCallback((startDate, endDate, trendData) => {
    if (!startDate || !endDate) return trendData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return trendData.filter(item => {
      const itemDate = new Date(item.date);
      itemDate.setHours(12, 0, 0, 0);
      return itemDate >= start && itemDate <= end;
    });
  }, []);

  const handleDateRangeChange = useCallback((startDate, endDate) => {
    setDateRange({ startDate, endDate });
    const filtered = filterTrendData(startDate, endDate, trend);
    setFilteredTrend(filtered);
  }, [trend, filterTrendData]);

  useEffect(() => {
    const filtered = filterTrendData(dateRange.startDate, dateRange.endDate, trend);
    setFilteredTrend(filtered);
  }, [trend, dateRange.startDate, dateRange.endDate, filterTrendData]);

  const handleExportExcel = () => {
    const exportData = Object.entries(countryCounts).map(([country, count]) => ({
      Country: country,
      Participants: count,
    }));
    if (exportData.length === 0) return alert("No data to export!");
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CountryDistribution");
    XLSX.writeFile(wb, `country_distribution_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const paperSubmissionData = [
    { name: "Approved", value: stats.paperApproved },
    { name: "Rejected", value: stats.paperRejected },
    { name: "Pending", value: stats.paperPending },
  ].filter(d => d.value > 0);

  const countryData = useMemo(() => {
    return Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }, [countryCounts]);

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '20px' }}>
        <div className="max-w-[1400px] mx-auto space-y-5">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 header-gradient leading-tight">
                Conference Analytics
              </h1>
              <p className="text-xs flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <BarChart3 className="w-3 h-3" />
                Real-time insights and global participation metrics
              </p>
            </div>
            <button
              onClick={fetchRegistrations}
              className="btn btn-secondary btn-sm"
              disabled={loading}
              style={{ flexShrink: 0 }}
            >
              {loading ? <Loader className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
              Refresh
            </button>
          </div>

          {/* Stats Grid - More Compact */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            <StatCard 
              icon={<Users />}
              title="Registrations" 
              value={stats.total.toLocaleString()}
              hint="Total users"
              color="#1976D2"
              colorDark="#0D47A1"
            />
            <StatCard 
              icon={<FileText />}
              title="Accepted" 
              value={stats.paperApproved.toLocaleString()}
              hint="Papers"
              color="#7C3AED"
              colorDark="#5B21B6"
            />
            <StatCard 
              icon={<FileText />}
              title="Pending" 
              value={stats.paperPending.toLocaleString()}
              hint="Reviews"
              color="#F59E0B"
              colorDark="#D97706"
            />
            <StatCard 
              icon={<XCircle />}
              title="Rejected" 
              value={stats.paperRejected.toLocaleString()}
              hint="Declined"
              color="#D32F2F"
              colorDark="#B71C1C"
            />
            <StatCard 
              icon={<DollarSign />}
              title="Revenue" 
              value={`₹${stats.revenue.toLocaleString()}`}
              hint="Paid amount"
              color="#F57C00"
              colorDark="#E65100"
            />
            <StatCard 
              icon={<Globe />}
              title="Countries" 
              value={stats.totalCountries.toLocaleString()}
              hint="Global reach"
              color="#0D47A1"
              colorDark="#01579B"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Paper Submission Status Distribution */}
            <ChartCard 
              title="Paper Submission Status"
              subtitle="Review breakdown"
            >
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <defs>
                    <linearGradient id="approvedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="rejectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D32F2F" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#B71C1C" stopOpacity={1}/>
                    </linearGradient>
                    <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#D97706" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <Pie
                    data={paperSubmissionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paperSubmissionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === 'Approved' ? 'url(#approvedGrad)' : 
                              entry.name === 'Rejected' ? 'url(#rejectedGrad)' : 
                              'url(#pendingGrad)'} 
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Registration Trend */}
            <ChartCard 
              title="Registration Trend"
              subtitle={`Daily counts (${filteredTrend.length} days)`}
              action={
                <DateFilter 
                  onDateRangeChange={handleDateRangeChange}
                  currentRange={dateRange}
                />
              }
            >
              {filteredTrend.length === 0 ? (
                <div className="flex items-center justify-center h-60">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>No data available</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={filteredTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1976D2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                      stroke="rgba(0,0,0,0.1)"
                      tickLine={false}
                      tickFormatter={(str) => new Date(str).getDate()}
                    />
                    <YAxis 
                      allowDecimals={false}
                      tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                      stroke="rgba(0,0,0,0.1)"
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      name="Registrations"
                      stroke="#1976D2"
                      strokeWidth={2}
                      fill="url(#trendGradient)"
                      dot={{ r: 3, strokeWidth: 1, stroke: '#1976D2', fill: 'white' }}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: 'white' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          {/* Registration Overview Bar Chart */}
          <ChartCard 
            title="Registration Overview"
            subtitle="Comparative analysis"
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={[
                  {
                    name: "Metrics",
                    total: stats.total,
                    abstractApproved: stats.abstractApproved,
                    paperApproved: stats.paperApproved,
                  },
                ]}
                barGap={8}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1976D2" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0D47A1" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#5B21B6" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                  stroke="rgba(0,0,0,0.1)"
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                  stroke="rgba(0,0,0,0.1)"
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="rect"
                  iconSize={10}
                  formatter={(value) => <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{value}</span>}
                />
                <Bar dataKey="total" name="Total" fill="url(#blueGrad)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="abstractApproved" name="Abs. Approved" fill="url(#greenGrad)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="paperApproved" name="Papers Approved" fill="url(#purpleGrad)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Country Distribution Table */}
          <div className="chart-container">
            <div className="chart-header">
              <div className="flex flex-row items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    Country Distribution
                  </h3>
                  <p className="text-[0.7rem]" style={{ color: 'var(--text-secondary)' }}>
                    Participant breakdown
                  </p>
                </div>
                <button
                  onClick={handleExportExcel}
                  className="btn btn-primary btn-sm"
                >
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Breakdown
                </h4>
                <span className="text-[0.65rem] font-semibold px-2 py-1 rounded-md" style={{ 
                  background: 'var(--brand-blue-light)', 
                  color: 'var(--brand-blue-primary)' 
                }}>
                  {countryData.length} Countries
                </span>
              </div>
              
              {countryData.length === 0 ? (
                <div className="text-center py-8">
                  <Globe className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>No country data</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-modern">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }}>Country</th>
                        <th style={{ textAlign: 'center' }}>Count</th>
                        <th style={{ textAlign: 'right' }}>% Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryData.map((item, index) => {
                        const percentage = (item.count / stats.total) * 100;
                        return (
                          <tr key={index}>
                            <td style={{ fontWeight: 600 }}>
                              <div className="flex items-center gap-2">
                                <span style={{
                                  display: 'inline-block',
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: 'linear-gradient(135deg, #F57C00, #E65100)'
                                }} />
                                {item.country}
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span className="badge-modern">
                                {item.count}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--brand-orange)' }}>
                              {percentage.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Country Details Modal */}
          {countryModalData && (
            <Modal onClose={() => setCountryModalData(null)} size="sm">
              <div className="text-center py-4">
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    background: 'linear-gradient(135deg, #F57C00, #E65100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(245, 124, 0, 0.3)'
                  }}
                >
                  <Globe className="w-8 h-8" style={{ color: 'white' }} />
                </div>
                
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {countryModalData.country}
                </h3>
                
                <div 
                  className="inline-block px-6 py-3 rounded-xl mb-4 mt-4"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--brand-blue-light) 0%, #E3F2FD 100%)',
                    border: '1px solid rgba(25, 118, 210, 0.1)'
                  }}
                >
                  <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Total Participants
                  </div>
                  <div 
                    className="text-3xl font-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, #F57C00, #E65100)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {countryModalData.count}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default MainDashboard;