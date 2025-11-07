
// // // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // // import axios from "axios";
// // // import * as XLSX from "xlsx";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   BarChart,
// // //   Bar,
// // //   CartesianGrid,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   Legend,
// // // } from "recharts";
// // // import {
// // //   Loader2,
// // //   Download,
// // //   X,
// // //   Search,
// // //   DollarSign,
// // //   Clock,
// // //   Users,
// // //   CheckCircle,
// // //   UserCheck,
// // //   UserX,
// // //   FileCheck,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   ChevronsLeft,
// // //   ChevronsRight,
// // // } from "lucide-react";

// // // /* ----------------------------- Small Components & Utils ----------------------------- */

// // // // Icon map
// // // const icons = {
// // //   totalRevenue: (
// // //     <DollarSign className="w-6 h-6 text-emerald-600" />
// // //   ),
// // //   pendingAmount: (
// // //     <Clock className="w-6 h-6 text-orange-500" />
// // //   ),
// // //   totalApproved: (
// // //     <FileCheck className="w-6 h-6 text-indigo-600" />
// // //   ),
// // //   paidUsers: (
// // //     <UserCheck className="w-6 h-6 text-green-500" />
// // //   ),
// // //   unpaidUsers: (
// // //     <UserX className="w-6 h-6 text-red-500" />
// // //   ),
// // // };

// // // // Reusable Modal Component
// // // const Modal = ({ children, onClose, size = "md" }) => {
// // //   const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
// // //   return (
// // //     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// // //       <div className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}>
// // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl">
// // //           <X className="w-6 h-6" />
// // //         </button>
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Stat Card
// // // const StatCard = ({ icon, title, value, hint }) => (
// // //   <div className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition">
// // //     <div className="flex items-start justify-between">
// // //       <div>
// // //         <div className="text-sm text-gray-500 font-medium">{title}</div>
// // //         <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
// // //         {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
// // //       </div>
// // //       <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
// // //     </div>
// // //   </div>
// // // );

// // // // Payment Status Snapshot Chart Component
// // // const PaymentStatusChart = ({ stats }) => (
// // //   <div className="bg-white p-4 rounded-2xl shadow">
// // //     <h3 className="text-lg font-semibold mb-3">Payment Status Distribution</h3>
// // //     <ResponsiveContainer width="100%" height={260}>
// // //       <BarChart
// // //         data={[
// // //           {
// // //             name: "Payments",
// // //             paid: stats.paidUsers,
// // //             pending: stats.pendingUsers,
// // //             unpaid: stats.unpaidUsers,
// // //           },
// // //         ]}
// // //       >
// // //         <CartesianGrid strokeDasharray="3 3" />
// // //         <XAxis dataKey="name" hide />
// // //         <YAxis allowDecimals={false} />
// // //         <Tooltip />
// // //         <Legend />
// // //         <Bar dataKey="paid" name="Paid Users" fill="#10B981" />
// // //         <Bar dataKey="pending" name="Pending Payments" fill="#F59E0B" />
// // //         <Bar dataKey="unpaid" name="Unpaid Users" fill="#EF4444" />
// // //       </BarChart>
// // //     </ResponsiveContainer>
// // //   </div>
// // // );

// // // // Revenue Trend Chart Component
// // // const RevenueTrendChart = ({ data }) => (
// // //   <div className="bg-white p-4 rounded-2xl shadow">
// // //     <h3 className="text-lg font-semibold mb-3">Revenue Trends</h3>
// // //     <ResponsiveContainer width="100%" height={260}>
// // //       <LineChart data={data}>
// // //         <CartesianGrid strokeDasharray="3 3" />
// // //         <XAxis dataKey="date" />
// // //         <YAxis tickFormatter={(v) => `₹${v.toLocaleString()}`} />
// // //         <Tooltip 
// // //           formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
// // //           labelFormatter={(label) => `Date: ${label}`}
// // //         />
// // //         <Legend />
// // //         <Line
// // //           type="monotone"
// // //           dataKey="revenue"
// // //           name="Paid Revenue"
// // //           stroke="#10B981"
// // //           strokeWidth={2}
// // //           dot={{ r: 4 }}
// // //         />
// // //         <Line
// // //           type="monotone"
// // //           dataKey="pending"
// // //           name="Pending Amount"
// // //           stroke="#F59E0B"
// // //           strokeWidth={2}
// // //           dot={{ r: 4 }}
// // //         />
// // //       </LineChart>
// // //     </ResponsiveContainer>
// // //   </div>
// // // );

// // // // Pagination Component
// // // const Pagination = ({ currentPage, totalPages, onPageChange }) => {
// // //   const pages = [];
// // //   const maxVisiblePages = 5;
  
// // //   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
// // //   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
// // //   if (endPage - startPage + 1 < maxVisiblePages) {
// // //     startPage = Math.max(1, endPage - maxVisiblePages + 1);
// // //   }

// // //   for (let i = startPage; i <= endPage; i++) {
// // //     pages.push(i);
// // //   }

// // //   return (
// // //     <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
// // //       <div className="text-sm text-gray-700">
// // //         Showing page {currentPage} of {totalPages}
// // //       </div>
// // //       <div className="flex items-center space-x-2">
// // //         <button
// // //           onClick={() => onPageChange(1)}
// // //           disabled={currentPage === 1}
// // //           className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <ChevronsLeft className="w-4 h-4" />
// // //         </button>
// // //         <button
// // //           onClick={() => onPageChange(currentPage - 1)}
// // //           disabled={currentPage === 1}
// // //           className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <ChevronLeft className="w-4 h-4" />
// // //         </button>
        
// // //         {pages.map(page => (
// // //           <button
// // //             key={page}
// // //             onClick={() => onPageChange(page)}
// // //             className={`px-3 py-1 rounded-lg border ${
// // //               currentPage === page
// // //                 ? 'bg-blue-600 text-white border-blue-600'
// // //                 : 'border-gray-300 hover:bg-gray-50'
// // //             }`}
// // //           >
// // //             {page}
// // //           </button>
// // //         ))}
        
// // //         <button
// // //           onClick={() => onPageChange(currentPage + 1)}
// // //           disabled={currentPage === totalPages}
// // //           className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <ChevronRight className="w-4 h-4" />
// // //         </button>
// // //         <button
// // //           onClick={() => onPageChange(totalPages)}
// // //           disabled={currentPage === totalPages}
// // //           className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <ChevronsRight className="w-4 h-4" />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ----------------------------- Main Component ----------------------------- */

// // // const PaymentPage = () => {
// // //   const [approvedUsers, setApprovedUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [stats, setStats] = useState({
// // //     totalRevenue: 0,
// // //     pendingAmount: 0,
// // //     totalApproved: 0,
// // //     paidUsers: 0,
// // //     pendingUsers: 0,
// // //     unpaidUsers: 0,
// // //   });
// // //   const [trend, setTrend] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [paymentFilter, setPaymentFilter] = useState("All");
// // //   const [userModalData, setUserModalData] = useState(null);
// // //   const [teamModalData, setTeamModalData] = useState(null);
  
// // //   // Pagination state
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [itemsPerPage] = useState(10);

// // //   /**
// // //    * Computes statistics for the dashboard cards.
// // //    */
// // //   const computeStats = useCallback((data) => {
// // //     console.log("Computing stats for:", data.length, "approved users");
    
// // //     let totalRevenue = 0;
// // //     let pendingAmount = 0;
// // //     let paidUsers = 0;
// // //     let pendingUsers = 0;
// // //     let unpaidUsers = 0;

// // //     data.forEach(user => {
// // //       const paymentStatus = user.paymentStatus || "unpaid";
// // //       const amountPaid = user.amountPaid || 0;

// // //       console.log(`User: ${user.authorName}, Status: ${paymentStatus}, Amount: ${amountPaid}`);

// // //       if (paymentStatus === "paid") {
// // //         totalRevenue += amountPaid;
// // //         paidUsers++;
// // //       } else if (paymentStatus === "pending") {
// // //         pendingAmount += amountPaid;
// // //         pendingUsers++;
// // //       } else {
// // //         unpaidUsers++;
// // //       }
// // //     });

// // //     const newStats = {
// // //       totalRevenue,
// // //       pendingAmount,
// // //       totalApproved: data.length,
// // //       paidUsers,
// // //       pendingUsers,
// // //       unpaidUsers,
// // //     };

// // //     console.log("Computed stats:", newStats);
// // //     setStats(newStats);
// // //   }, []);

// // //   /**
// // //    * Computes the revenue trend based on creation date.
// // //    */
// // //   const computeTrend = useCallback((data) => {
// // //     const groups = {};
// // //     data.forEach((user) => {
// // //       const date = new Date(user.createdAt).toISOString().split("T")[0];
// // //       if (!groups[date]) {
// // //         groups[date] = { date, revenue: 0, pending: 0 };
// // //       }
      
// // //       const paymentStatus = user.paymentStatus || "unpaid";
// // //       const amountPaid = user.amountPaid || 0;

// // //       if (paymentStatus === "paid") {
// // //         groups[date].revenue += amountPaid;
// // //       } else if (paymentStatus === "pending") {
// // //         groups[date].pending += amountPaid;
// // //       }
// // //     });

// // //     const arr = Object.values(groups).sort((a, b) => new Date(a.date) - new Date(b.date));
// // //     setTrend(arr);
// // //   }, []);

// // //   // Format each user with proper payment data extraction
// // //   const formatUser = (item) => {
// // //     // Extract payment data from multiple possible locations
// // //     const workflowPayment = item.workflow || {};
// // //     const registrationPayment = item.registration?.payment || {};
// // //     const directPayment = item.payment || {};
    
// // //     // Use payment data from workflow first, then registration, then direct
// // //     const paymentData = workflowPayment.amountPaid ? workflowPayment : 
// // //                        registrationPayment.amountPaid ? registrationPayment : 
// // //                        directPayment;

// // //     const paymentStatus = (
// // //       paymentData.paymentStatus || 
// // //       workflowPayment.paymentStatus ||
// // //       registrationPayment.paymentStatus ||
// // //       "unpaid"
// // //     ).toLowerCase();

// // //     const amountPaid = Number(
// // //       paymentData.amountPaid || 
// // //       workflowPayment.amountPaid ||
// // //       registrationPayment.amountPaid || 
// // //       0
// // //     );

// // //     const paymentMethod = (
// // //       paymentData.paymentMethod || 
// // //       workflowPayment.paymentMethod ||
// // //       registrationPayment.paymentMethod ||
// // //       "-"
// // //     );

// // //     // Check for discount from multiple sources
// // //     const discountApplied = 
// // //       paymentData.discountApplied ||
// // //       workflowPayment.discountApplied ||
// // //       registrationPayment.discountApplied ||
// // //       item.registration?.discount ||
// // //       workflowPayment.discount ||
// // //       false;

// // //     const teamMembers = item.registration?.participants?.length
// // //       ? item.registration.participants.slice(1).map((p) => ({
// // //           name: p.name || "Unknown",
// // //           email: p.email || "-",
// // //           phone: p.phone || "-",
// // //           organisation: p.organisation || "-",
// // //           proofUrl: p.proofUrl || null,
// // //         }))
// // //       : [];

// // //     return {
// // //       id: item._id,
// // //       userId: item.userId || "N/A",
// // //       uniqueId: item.registration?.uniqueId || "N/A",
// // //       authorName: item.name || "Unknown",
// // //       email: item.registration?.participants?.[0]?.email || "-",
// // //       mobile: item.registration?.participants?.[0]?.phone || "-",
// // //       track: item.registration?.track || "-",
// // //       title: item.registration?.abstractTitle || "No Title",
// // //       paymentStatus,
// // //       paymentMethod,
// // //       amountPaid,
// // //       discountApplied: Boolean(discountApplied),
// // //       paperStatus: (
// // //         workflowPayment.finalPaperStatus ||
// // //         workflowPayment.paperStatus ||
// // //         item.registration?.paperStatus ||
// // //         "no paper"
// // //       ).toLowerCase(),
// // //       createdAt: item.workflow?.createdAt || item.createdAt || new Date().toISOString(),
// // //       team: teamMembers,
// // //     };
// // //   };

// // //   // Check if user has approved paper status
// // //   const hasApprovedPaper = (user) => {
// // //     const paperStatus = user.paperStatus || "no paper";
// // //     return paperStatus === "approved";
// // //   };

// // //   // Fetch all users and filter only those with approved papers
// // //   const fetchApprovedUsers = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const { data } = await axios.get(
// // //         "https://s3conference.ksrce.ac.in/api/admin/users",
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       console.log("Raw API data:", data);

// // //       const formatted = Array.isArray(data) ? data.map(formatUser) : [];
      
// // //       // Filter only users with approved paper status
// // //       const approvedPaperUsers = formatted.filter(hasApprovedPaper);
      
// // //       console.log("All users:", formatted.length);
// // //       console.log("Approved paper users:", approvedPaperUsers.length);
// // //       console.log("Approved users details:", approvedPaperUsers);

// // //       setApprovedUsers(approvedPaperUsers);
// // //       computeStats(approvedPaperUsers);
// // //       computeTrend(approvedPaperUsers);
// // //       setCurrentPage(1); // Reset to first page when data changes
// // //     } catch (err) {
// // //       console.error("Error fetching payment data:", err);
// // //       setApprovedUsers([]);
// // //       setStats({
// // //         totalRevenue: 0,
// // //         pendingAmount: 0,
// // //         totalApproved: 0,
// // //         paidUsers: 0,
// // //         pendingUsers: 0,
// // //         unpaidUsers: 0,
// // //       });
// // //       setTrend([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [computeStats, computeTrend]);

// // //   useEffect(() => {
// // //     fetchApprovedUsers();
// // //   }, [fetchApprovedUsers]);

// // //   // Search & Filter (Memoized)
// // //   const filteredAndSearchedUsers = useMemo(() => {
// // //     const q = searchTerm.trim().toLowerCase();
// // //     const isAllStatus = paymentFilter.toLowerCase() === "all";

// // //     return approvedUsers.filter((user) => {
// // //       const matchesSearch =
// // //         user.authorName.toLowerCase().includes(q) ||
// // //         user.email.toLowerCase().includes(q) ||
// // //         user.uniqueId.toLowerCase().includes(q) ||
// // //         user.userId.toLowerCase().includes(q) ||
// // //         user.track.toLowerCase().includes(q);

// // //       const matchesFilter =
// // //         isAllStatus || user.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

// // //       return matchesSearch && matchesFilter;
// // //     });
// // //   }, [approvedUsers, searchTerm, paymentFilter]);

// // //   // Pagination logic
// // //   const paginatedUsers = useMemo(() => {
// // //     const startIndex = (currentPage - 1) * itemsPerPage;
// // //     return filteredAndSearchedUsers.slice(startIndex, startIndex + itemsPerPage);
// // //   }, [filteredAndSearchedUsers, currentPage, itemsPerPage]);

// // //   const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);

// // //   // Handle page change
// // //   const handlePageChange = (page) => {
// // //     setCurrentPage(page);
// // //   };

// // //   // Payment Badge Styling
// // //   const getPaymentBadgeClass = (status) => {
// // //     switch (status?.toLowerCase()) {
// // //       case "paid":
// // //         return "bg-green-100 text-green-700";
// // //       case "pending":
// // //         return "bg-yellow-100 text-yellow-700";
// // //       case "unpaid":
// // //         return "bg-red-100 text-red-700";
// // //       default:
// // //         return "bg-gray-100 text-gray-700";
// // //     }
// // //   };

// // //   // Paper Status Badge Styling
// // //   const getPaperStatusBadgeClass = (status) => {
// // //     switch (status?.toLowerCase()) {
// // //       case "approved":
// // //         return "bg-green-100 text-green-700";
// // //       case "submitted":
// // //         return "bg-blue-100 text-blue-700";
// // //       case "correction required":
// // //         return "bg-yellow-100 text-yellow-700";
// // //       case "rejected":
// // //         return "bg-red-100 text-red-700";
// // //       case "no paper":
// // //         return "bg-gray-100 text-gray-700";
// // //       default:
// // //         return "bg-gray-100 text-gray-700";
// // //     }
// // //   };

// // //   // Handle Export to Excel
// // //   const handleExportExcel = () => {
// // //     if (!filteredAndSearchedUsers.length) return alert("No data to export!");

// // //     const exportData = filteredAndSearchedUsers.map((user) => ({
// // //       "Unique ID": user.uniqueId,
// // //       "User ID": user.userId,
// // //       "Author Name": user.authorName,
// // //       Email: user.email,
// // //       "Mobile": user.mobile,
// // //       Track: user.track,
// // //       Title: user.title,
// // //       "Paper Status": user.paperStatus,
// // //       "Payment Status": user.paymentStatus,
// // //       "Payment Method": user.paymentMethod,
// // //       "Amount Paid": user.amountPaid,
// // //       "Discount Applied": user.discountApplied ? "Yes" : "No",
// // //       "Registration Date": new Date(user.createdAt).toLocaleDateString(),
// // //     }));

// // //     const ws = XLSX.utils.json_to_sheet(exportData);
// // //     const wb = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(wb, ws, "Payments");
// // //     XLSX.writeFile(wb, `approved_papers_payments_${new Date().toISOString().split('T')[0]}.xlsx`);
// // //   };

// // //   // Handle View Proof (for team members)
// // //   const handleViewProof = (proofUrl) => {
// // //     if (!proofUrl) return alert("No proof available.");
// // //     if (proofUrl.startsWith("http")) window.open(proofUrl, "_blank");
// // //     else alert("Invalid proof URL: " + proofUrl);
// // //   };

// // //   return (
// // //     <div className="space-y-6 p-4">
// // //       <div>
// // //         <h1 className="text-2xl font-bold">Payment & Financial Overview</h1>
// // //         <p className="text-sm text-gray-500 mt-1">
// // //           Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
// // //         </p>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         <StatCard 
// // //           icon={icons.totalRevenue} 
// // //           title="Total Revenue (Paid)" 
// // //           value={`₹${stats.totalRevenue.toLocaleString()}`}
// // //           hint="Confirmed payments from approved papers"
// // //         />
// // //         {/* <StatCard 
// // //           icon={icons.pendingAmount} 
// // //           title="Pending Amount" 
// // //           value={`₹${stats.pendingAmount.toLocaleString()}`}
// // //           hint="Awaiting confirmation from approved papers"
// // //         /> */}
// // //         <StatCard 
// // //           icon={icons.totalApproved} 
// // //           title="Approved Papers" 
// // //           value={stats.totalApproved}
// // //           hint="Papers with approved status"
// // //         />
// // //         <StatCard 
// // //           icon={icons.paidUsers} 
// // //           title="Paid Users" 
// // //           value={stats.paidUsers}
// // //           hint="Completed payments"
// // //         />
// // //         {/* <StatCard 
// // //           icon={icons.pendingAmount} 
// // //           title="Pending Payments" 
// // //           value={stats.pendingUsers}
// // //           hint="Payment in process"
// // //         /> */}
// // //         <StatCard 
// // //           icon={icons.unpaidUsers} 
// // //           title="Unpaid Users" 
// // //           value={stats.unpaidUsers}
// // //           hint="Payment required"
// // //         />
// // //       </div>

// // //       {/* Charts */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <PaymentStatusChart stats={stats} />
// // //         <RevenueTrendChart data={trend} />
// // //       </div>

// // //       {/* Table Section */}
// // //       <div className="bg-white rounded-2xl shadow border overflow-hidden">
// // //         {/* Toolbar (Search & Filter) */}
// // //         <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
// // //           <div className="flex items-center gap-3 w-full md:w-auto">
// // //             <div className="flex items-center border rounded-lg overflow-hidden bg-white w-full md:w-72">
// // //               <Search className="w-5 h-5 ml-3 text-gray-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search by ID, name, email, or title..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="px-3 py-2 outline-none text-sm w-full"
// // //               />
// // //               <button
// // //                 onClick={() => setSearchTerm("")}
// // //                 className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
// // //               >
// // //                 Clear
// // //               </button>
// // //             </div>

// // //             <select
// // //               value={paymentFilter}
// // //               onChange={(e) => setPaymentFilter(e.target.value)}
// // //               className="border rounded-lg p-2 text-sm w-full md:w-auto"
// // //             >
// // //               <option value="All">All Payment Statuses</option>
// // //               <option value="paid">Paid</option>
// // //               {/* <option value="pending">Pending</option> */}
// // //               <option value="unpaid">Unpaid</option>
// // //             </select>
// // //           </div>

// // //           <div className="flex items-center gap-2 w-full md:w-auto">
// // //             <button
// // //               onClick={fetchApprovedUsers}
// // //               className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full md:w-auto"
// // //               disabled={loading}
// // //             >
// // //               {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh Data'}
// // //             </button>
// // //             <button
// // //               onClick={handleExportExcel}
// // //               className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 w-full md:w-auto"
// // //             >
// // //               <Download className="w-4 h-4" /> Export Excel
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Table */}
// // //         {loading ? (
// // //           <div className="flex items-center justify-center p-10">
// // //             <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
// // //           </div>
// // //         ) : filteredAndSearchedUsers.length === 0 ? (
// // //           <div className="p-8 text-center text-gray-600">
// // //             No users with approved papers match the current filters.
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="overflow-x-auto">
// // //               <table className="min-w-full text-sm divide-y divide-gray-200">
// // //                 <thead className="bg-gray-50 text-xs uppercase text-gray-700">
// // //                   <tr>
// // //                     <th className="p-3">User ID</th>
// // //                     <th className="p-3">Author Name</th>
// // //                     <th className="p-3">Email</th>
// // //                     <th className="p-3">Track</th>
// // //                     <th className="p-3 text-center">Paper Status</th>
// // //                     <th className="p-3 text-center">Payment Status</th>
// // //                     <th className="p-3 text-center">Payment Method</th>
// // //                     <th className="p-3 text-center">Discount</th>
// // //                     <th className="p-3 text-right">Amount Paid</th>
// // //                     {/* <th className="p-3 text-center">Team</th> */}
// // //                     <th className="p-3 text-center">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-gray-100">
// // //                   {paginatedUsers.map((user) => (
// // //                     <tr key={user.id} className="hover:bg-gray-50">
// // //                       <td className="p-3 font-mono text-xs text-gray-600">
// // //                         {user.userId}
// // //                       </td>
// // //                       <td className="p-3 font-medium">{user.authorName}</td>
// // //                       <td className="p-3 text-gray-600">{user.email}</td>
// // //                       <td className="p-3 text-gray-600">{user.track}</td>
// // //                       <td className="p-3 text-center">
// // //                         <span
// // //                           className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(
// // //                             user.paperStatus
// // //                           )}`}
// // //                         >
// // //                           {user.paperStatus.toUpperCase()}
// // //                         </span>
// // //                       </td>
// // //                       <td className="p-3 text-center">
// // //                         <span
// // //                           className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(
// // //                             user.paymentStatus
// // //                           )}`}
// // //                         >
// // //                           {user.paymentStatus.toUpperCase()}
// // //                         </span>
// // //                       </td>
// // //                       <td className="p-3 text-center text-gray-600">
// // //                         {user.paymentMethod}
// // //                       </td>
// // //                       <td className="p-3 text-center">
// // //                         {user.discountApplied ? (
// // //                           <span className="text-emerald-600 font-semibold">Yes</span>
// // //                         ) : (
// // //                           <span className="text-gray-400">No</span>
// // //                         )}
// // //                       </td>
// // //                       <td className="p-3 text-right font-bold text-gray-800">
// // //                         ₹{user.amountPaid.toLocaleString()}
// // //                       </td>
// // //                       {/* <td className="p-3 text-center">
// // //                         {Array.isArray(user.team) && user.team.length ? (
// // //                           <button
// // //                             onClick={() => setTeamModalData(user)}
// // //                             className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
// // //                           >
// // //                             <Users className="w-4 h-4" /> View
// // //                           </button>
// // //                         ) : (
// // //                           "-"
// // //                         )}
// // //                       </td> */}
// // //                       <td className="p-3 text-center">
// // //                         <button
// // //                           onClick={() => setUserModalData(user)}
// // //                           className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
// // //                         >
// // //                           Details
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
            
// // //             {/* Pagination */}
// // //             {totalPages > 1 && (
// // //               <Pagination
// // //                 currentPage={currentPage}
// // //                 totalPages={totalPages}
// // //                 onPageChange={handlePageChange}
// // //               />
// // //             )}
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* User Details Modal */}
// // //       {userModalData && (
// // //         <Modal onClose={() => setUserModalData(null)} size="md">
// // //           <h2 className="text-xl font-bold mb-2">
// // //             Payment Details: {userModalData.authorName}
// // //           </h2>
// // //           <p className="text-gray-600 mb-4">
// // //             {userModalData.title.substring(0, 70)}...
// // //           </p>

// // //           <div className="space-y-4">
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="p-3 bg-gray-50 rounded-lg">
// // //                 <div className="text-sm text-gray-500">User ID</div>
// // //                 <div className="font-mono text-sm">{userModalData.userId}</div>
// // //               </div>
// // //               <div className="p-3 bg-gray-50 rounded-lg">
// // //                 <div className="text-sm text-gray-500">Unique ID</div>
// // //                 <div className="font-mono text-sm">{userModalData.uniqueId}</div>
// // //               </div>
// // //             </div>

// // //             <div className="p-3 border rounded-lg">
// // //               <div className="text-sm text-gray-500 mb-2">Paper & Payment Information</div>
// // //               <div className="space-y-2">
// // //                 <div className="flex justify-between">
// // //                   <span>Paper Status:</span>
// // //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(userModalData.paperStatus)}`}>
// // //                     {userModalData.paperStatus.toUpperCase()}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Payment Status:</span>
// // //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(userModalData.paymentStatus)}`}>
// // //                     {userModalData.paymentStatus.toUpperCase()}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Payment Method:</span>
// // //                   <span>{userModalData.paymentMethod}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Amount Paid:</span>
// // //                   <span className="font-bold">₹{userModalData.amountPaid.toLocaleString()}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Discount Applied:</span>
// // //                   <span>{userModalData.discountApplied ? "Yes" : "No"}</span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="p-3 border rounded-lg">
// // //               <div className="text-sm text-gray-500 mb-2">Contact Information</div>
// // //               <div className="space-y-1 text-sm">
// // //                 <div>Email: {userModalData.email}</div>
// // //                 <div>Mobile: {userModalData.mobile}</div>
// // //                 <div>Track: {userModalData.track}</div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </Modal>
// // //       )}

// // //       {/* Team Modal */}
// // //       {teamModalData && (
// // //         <Modal onClose={() => setTeamModalData(null)} size="lg">
// // //           <h3 className="text-xl font-bold mb-4">
// // //             Team Members for "{teamModalData.title}"
// // //           </h3>
// // //           {Array.isArray(teamModalData.team) && teamModalData.team.length ? (
// // //             <div className="overflow-x-auto max-h-[70vh]">
// // //               <table className="min-w-full divide-y divide-gray-200 text-sm">
// // //                 <thead className="bg-gray-100 sticky top-0">
// // //                   <tr>
// // //                     <th className="p-2 text-left">Name</th>
// // //                     <th className="p-2 text-left">Email</th>
// // //                     <th className="p-2 text-left">Phone</th>
// // //                     <th className="p-2 text-left">Organisation</th>
// // //                     <th className="p-2 text-left">Proof</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-gray-200">
// // //                   {teamModalData.team.map((member, i) => (
// // //                     <tr key={i}>
// // //                       <td className="p-2">{member.name || "Unnamed"}</td>
// // //                       <td className="p-2">{member.email || "-"}</td>
// // //                       <td className="p-2">{member.phone || "-"}</td>
// // //                       <td className="p-2">{member.organisation || "-"}</td>
// // //                       <td className="p-2">
// // //                         {member.proofUrl ? (
// // //                           <button
// // //                             onClick={() => handleViewProof(member.proofUrl)}
// // //                             className="text-blue-500 hover:underline text-xs"
// // //                           >
// // //                             View Proof
// // //                           </button>
// // //                         ) : (
// // //                           "-"
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           ) : (
// // //             <p>No team members available.</p>
// // //           )}
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PaymentPage;

// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import axios from "axios";
// // import * as XLSX from "xlsx";
// // import {
// //   LineChart,
// //   Line,
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend,
// // } from "recharts";
// // import {
// //   Loader2,
// //   Download,
// //   X,
// //   Search,
// //   DollarSign,
// //   Clock,
// //   Users,
// //   CheckCircle,
// //   UserCheck,
// //   UserX,
// //   FileCheck,
// //   ChevronLeft,
// //   ChevronRight,
// //   ChevronsLeft,
// //   ChevronsRight,
// //   Filter,
// //   RefreshCw,
// //   BarChart3,
// //   Eye,
// //   FileText,
// //   ArrowUpDown,
// //   ChevronDown,
// //   ChevronUp,
// // } from "lucide-react";

// // /* ----------------------------- Updated Styles ----------------------------- */
// // const paymentStyles = `
// // @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

// //   * {
// //     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// //   }

// //   :root {
// //     --brand-orange: #F57C00;
// //     --brand-orange-dark: #E65100;
// //     --brand-blue-dark: #0D47A1;
// //     --brand-blue-primary: #1976D2;
// //     --brand-blue-light: #E3F2FD;
// //     --brand-red: #D32F2F;
// //     --text-primary: #111318;
// //     --text-secondary: #6c757d;
// //     --surface-light: #f8f9fa;
// //     --surface-dark: #e9ecef;
// //     --white: #FFFFFF;
// //     --border-light: #e2e8f0;
// //   }

// //   body {
// //     -webkit-font-smoothing: antialiased;
// //     -moz-osx-font-smoothing: grayscale;
// //   }

// //   .glass-card {
// //     background: rgba(255, 255, 255, 0.95);
// //     backdrop-filter: blur(20px);
// //     border: 1px solid rgba(255, 255, 255, 0.8);
// //     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
// //     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// //   }

// //   .glass-card:hover {
// //     box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
// //     transform: translateY(-4px);
// //   }

// //   .stat-card {
// //     position: relative;
// //     overflow: hidden;
// //     background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
// //     border: 1px solid rgba(0, 0, 0, 0.06);
// //   }

// //   .stat-card::before {
// //     content: '';
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     height: 4px;
// //     background: linear-gradient(90deg, var(--accent-color) 0%, transparent 100%);
// //     opacity: 0;
// //     transition: opacity 0.3s ease;
// //   }

// //   .stat-card:hover::before {
// //     opacity: 1;
// //   }

// //   .stat-icon-wrapper {
// //     position: relative;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     width: 56px;
// //     height: 56px;
// //     border-radius: 16px;
// //     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
// //     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
// //   }

// //   .stat-icon-wrapper::after {
// //     content: '';
// //     position: absolute;
// //     inset: -2px;
// //     border-radius: 16px;
// //     background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
// //     opacity: 0.2;
// //     filter: blur(8px);
// //   }

// //   .metric-value {
// //     font-size: 2rem;
// //     font-weight: 700;
// //     letter-spacing: -0.02em;
// //     background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
// //     -webkit-background-clip: text;
// //     -webkit-text-fill-color: transparent;
// //     background-clip: text;
// //   }

// //   .chart-container {
// //     background: white;
// //     border-radius: 24px;
// //     border: 1px solid rgba(0, 0, 0, 0.06);
// //     box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
// //     overflow: hidden;
// //     transition: all 0.4s ease;
// //   }

// //   .chart-container:hover {
// //     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
// //   }

// //   .chart-header {
// //     padding: 24px 28px;
// //     border-bottom: 1px solid rgba(0, 0, 0, 0.06);
// //     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
// //   }

// //   .chart-body {
// //     padding: 28px;
// //   }

// //   .btn {
// //     position: relative;
// //     display: inline-flex;
// //     align-items: center;
// //     gap: 8px;
// //     padding: 12px 24px;
// //     border: none;
// //     border-radius: 12px;
// //     font-size: 0.9375rem;
// //     font-weight: 600;
// //     cursor: pointer;
// //     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// //     overflow: hidden;
// //   }

// //   .btn::before {
// //     content: '';
// //     position: absolute;
// //     inset: 0;
// //     background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
// //     opacity: 0;
// //     transition: opacity 0.3s ease;
// //   }

// //   .btn:hover::before {
// //     opacity: 1;
// //   }

// //   .btn-primary {
// //     background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
// //     color: white;
// //     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
// //   }

// //   .btn-primary:hover:not(:disabled) {
// //     box-shadow: 0 8px 20px rgba(245, 124, 0, 0.4);
// //     transform: translateY(-2px);
// //   }

// //   .btn-secondary {
// //     background: linear-gradient(135deg, #1976D2 0%, #0D47A1 100%);
// //     color: white;
// //     box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
// //   }

// //   .btn-secondary:hover:not(:disabled) {
// //     box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
// //     transform: translateY(-2px);
// //   }

// //   .btn-success {
// //     background: linear-gradient(135deg, #10B981 0%, #059669 100%);
// //     color: white;
// //     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
// //   }

// //   .btn-success:hover:not(:disabled) {
// //     box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
// //     transform: translateY(-2px);
// //   }

// //   .btn-outline {
// //     background: transparent;
// //     border: 1px solid rgba(0, 0, 0, 0.1);
// //     color: #111318;
// //     box-shadow: none;
// //   }

// //   .btn-outline:hover:not(:disabled) {
// //     background: rgba(0, 0, 0, 0.02);
// //     border-color: rgba(0, 0, 0, 0.2);
// //     transform: translateY(-1px);
// //   }

// //   .btn:disabled {
// //     opacity: 0.6;
// //     cursor: not-allowed;
// //   }

// //   .btn-sm {
// //     padding: 8px 16px;
// //     font-size: 0.875rem;
// //   }

// //   .header-gradient {
// //     background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
// //     -webkit-background-clip: text;
// //     -webkit-text-fill-color: transparent;
// //     background-clip: text;
// //   }

// //   /* Enhanced Table Styles */
// //   .table-container {
// //     background: white;
// //     border-radius: 16px;
// //     border: 1px solid var(--border-light);
// //     box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
// //     overflow: hidden;
// //   }

// //   .table-modern {
// //     width: 100%;
// //     border-collapse: separate;
// //     border-spacing: 0;
// //     background: white;
// //   }

// //   .table-modern thead {
// //     background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
// //     position: sticky;
// //     top: 0;
// //     z-index: 10;
// //   }

// //   .table-modern th {
// //     padding: 16px 12px;
// //     font-size: 0.75rem;
// //     font-weight: 700;
// //     text-transform: uppercase;
// //     letter-spacing: 0.05em;
// //     color: #64748b;
// //     border-bottom: 2px solid #e2e8f0;
// //     background: inherit;
// //     cursor: pointer;
// //     transition: all 0.2s ease;
// //     user-select: none;
// //     white-space: nowrap;
// //   }

// //   .table-modern th:hover {
// //     background: rgba(241, 245, 249, 0.8);
// //   }

// //   .table-modern th.sortable {
// //     display: flex;
// //     align-items: center;
// //     gap: 8px;
// //   }

// //   .table-modern th .sort-icon {
// //     opacity: 0.4;
// //     transition: opacity 0.2s ease;
// //   }

// //   .table-modern th:hover .sort-icon {
// //     opacity: 0.7;
// //   }

// //   .table-modern th.sorted .sort-icon {
// //     opacity: 1;
// //     color: var(--brand-blue-primary);
// //   }

// //   .table-modern td {
// //     padding: 16px 12px;
// //     color: #334155;
// //     font-size: 0.875rem;
// //     font-weight: 500;
// //     border-bottom: 1px solid #f8fafc;
// //     vertical-align: middle;
// //   }

// //   .table-modern tbody tr:last-child td {
// //     border-bottom: none;
// //   }

// //   /* Status Indicator Styles */
// //   .status-indicator {
// //     display: inline-flex;
// //     align-items: center;
// //     padding: 6px 12px;
// //     border-radius: 9999px;
// //     font-weight: 600;
// //     font-size: 0.75rem;
// //     text-transform: capitalize;
// //     background-color: #E5E7EB;
// //     color: #374151;
// //     cursor: default;
// //     pointer-events: none;
// //   }

// //   .status-indicator-paid {
// //     background-color: #D1FAE5;
// //     color: #065F46;
// //   }
  
// //   .status-indicator-unpaid {
// //     background-color: #FEE2E2;
// //     color: #991B1B;
// //   }
  
// //   .status-indicator-pending {
// //     background-color: #FEF3C7;
// //     color: #92400E;
// //   }

// //   .status-indicator-approved {
// //     background-color: #D1FAE5;
// //     color: #065F46;
// //   }
  
// //   .status-indicator-rejected {
// //     background-color: #FEE2E2;
// //     color: #991B1B;
// //   }

// //   .table-toolbar {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 20px 24px;
// //     background: white;
// //     border-bottom: 1px solid var(--border-light);
// //   }

// //   .table-info {
// //     display: flex;
// //     align-items: center;
// //     gap: 16px;
// //     font-size: 0.875rem;
// //     color: var(--text-secondary);
// //   }

// //   .table-actions {
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //   }

// //   .search-box {
// //     position: relative;
// //     display: flex;
// //     align-items: center;
// //     background: white;
// //     border: 1px solid var(--border-light);
// //     border-radius: 12px;
// //     padding: 8px 16px;
// //     transition: all 0.3s ease;
// //     min-width: 300px;
// //   }

// //   .search-box:focus-within {
// //     border-color: var(--brand-blue-primary);
// //     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
// //   }

// //   .search-box input {
// //     border: none;
// //     outline: none;
// //     padding: 8px;
// //     width: 100%;
// //     font-size: 0.875rem;
// //     background: transparent;
// //   }

// //   .filter-select {
// //     padding: 10px 16px;
// //     border: 1px solid var(--border-light);
// //     border-radius: 12px;
// //     font-size: 0.875rem;
// //     background: white;
// //     cursor: pointer;
// //     transition: all 0.3s ease;
// //     min-width: 150px;
// //   }

// //   .filter-select:focus {
// //     border-color: var(--brand-blue-primary);
// //     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
// //   }

// //   .empty-state {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     justify-content: center;
// //     padding: 60px 20px;
// //     text-align: center;
// //   }

// //   .empty-state-icon {
// //     width: 80px;
// //     height: 80px;
// //     background: #f8fafc;
// //     border-radius: 50%;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     margin-bottom: 20px;
// //   }

// //   .loading-state {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     justify-content: center;
// //     padding: 60px 20px;
// //   }

// //   .loading-spinner {
// //     animation: spin 1s linear infinite;
// //   }

// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }

// //   /* Improved Modal Styles */
// //   .modal-backdrop {
// //     position: fixed;
// //     inset: 0;
// //     background: rgba(0, 0, 0, 0.7);
// //     backdrop-filter: blur(12px);
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     z-index: 1000;
// //     animation: fadeIn 0.2s ease;
// //     padding: 20px;
// //   }

// //   .modal-content {
// //     background: white;
// //     border-radius: 24px;
// //     box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
// //     animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// //     display: flex;
// //     flex-direction: column;
// //     max-height: 90vh;
// //   }

// //   @keyframes fadeIn {
// //     from { opacity: 0; }
// //     to { opacity: 1; }
// //   }

// //   @keyframes slideUp {
// //     from {
// //       opacity: 0;
// //       transform: translateY(30px) scale(0.95);
// //     }
// //     to {
// //       opacity: 1;
// //       transform: translateY(0) scale(1);
// //     }
// //   }

// //   /* Chart specific styles */
// //   .recharts-wrapper {
// //     font-family: 'Inter', sans-serif;
// //   }

// //   .recharts-legend-wrapper {
// //     padding-top: 20px !important;
// //   }

// //   .recharts-legend-item-text {
// //     font-size: 14px !important;
// //     font-weight: 500 !important;
// //     color: #111318 !important;
// //   }

// //   .recharts-tooltip-wrapper {
// //     z-index: 1000;
// //   }

// //   .custom-tooltip {
// //     background: white;
// //     border: 1px solid #e2e8f0;
// //     border-radius: 12px;
// //     padding: 12px 16px;
// //     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
// //   }

// //   .custom-tooltip p {
// //     margin: 4px 0;
// //     font-size: 14px;
// //     font-weight: 500;
// //   }

// //   /* Donut Chart Styles */
// //   .donut-chart-container {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 24px;
// //   }

// //   .donut-chart-wrapper {
// //     position: relative;
// //     width: 200px;
// //     height: 200px;
// //   }

// //   .donut-center-text {
// //     position: absolute;
// //     top: 50%;
// //     left: 50%;
// //     transform: translate(-50%, -50%);
// //     text-align: center;
// //   }

// //   .donut-total {
// //     font-size: 2rem;
// //     font-weight: 700;
// //     color: #111318;
// //     line-height: 1;
// //   }

// //   .donut-label {
// //     font-size: 0.875rem;
// //     color: #6c757d;
// //     margin-top: 4px;
// //   }

// //   .donut-legend {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 16px;
// //     width: 100%;
// //     max-width: 300px;
// //   }

// //   .donut-legend-item {
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //     padding: 12px 16px;
// //     background: #f8fafc;
// //     border-radius: 12px;
// //     border-left: 4px solid;
// //   }

// //   .donut-legend-color {
// //     width: 16px;
// //     height: 16px;
// //     border-radius: 4px;
// //   }

// //   .donut-legend-content {
// //     flex: 1;
// //   }

// //   .donut-legend-value {
// //     font-size: 1.25rem;
// //     font-weight: 700;
// //     color: #111318;
// //     line-height: 1;
// //   }

// //   .donut-legend-label {
// //     font-size: 0.875rem;
// //     color: #6c757d;
// //     margin-top: 2px;
// //   }

// //   .donut-legend-percentage {
// //     font-size: 1rem;
// //     font-weight: 600;
// //     color: #111318;
// //   }

// //   .chart-header-actions {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     width: 100%;
// //   }

// //   .chart-title-section {
// //     flex: 1;
// //   }

// //   .chart-controls {
// //     display: flex;
// //     align-items: center;
// //     gap: 12px;
// //   }
// // `;

// // /* ----------------------------- Small Components ----------------------------- */

// // const Modal = ({ children, onClose, size = "md" }) => {
// //   const sizeClasses = { 
// //     sm: "max-w-md", 
// //     md: "max-w-2xl", 
// //     lg: "max-w-4xl", 
// //     xl: "max-w-6xl",
// //     full: "max-w-7xl" 
// //   };
  
// //   return (
// //     <div className="modal-backdrop" onClick={onClose}>
// //       <div 
// //         className={`modal-content w-full ${sizeClasses[size]} mx-4 my-6 max-h-[90vh] flex flex-col`} 
// //         onClick={e => e.stopPropagation()}
// //       >
// //         <button 
// //           onClick={onClose} 
// //           className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
// //         >
// //           <X className="w-5 h-5" />
// //         </button>
// //         <div className="flex-1 overflow-hidden rounded-2xl bg-white">
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
// //   <div 
// //     className="stat-card glass-card rounded-2xl p-6"
// //     style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
// //   >
// //     <div className="flex items-start justify-between mb-4">
// //       <div className="flex-1">
// //         <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6c757d' }}>
// //           {title}
// //         </p>
// //         <div className="metric-value">{value}</div>
// //       </div>
// //       <div className="stat-icon-wrapper">
// //         <div style={{ color: 'white', position: 'relative', zIndex: 1 }}>
// //           {icon}
// //         </div>
// //       </div>
// //     </div>
// //     <p className="text-xs" style={{ color: '#6c757d' }}>{hint}</p>
// //   </div>
// // );

// // const ChartCard = ({ title, subtitle, children, controls }) => (
// //   <div className="chart-container">
// //     <div className="chart-header">
// //       <div className="chart-header-actions">
// //         <div className="chart-title-section">
// //           <h3 className="text-lg font-bold mb-1" style={{ color: '#111318' }}>{title}</h3>
// //           {subtitle && <p className="text-xs" style={{ color: '#6c757d' }}>{subtitle}</p>}
// //         </div>
// //         {controls && (
// //           <div className="chart-controls">
// //             {controls}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //     <div className="chart-body">
// //       {children}
// //     </div>
// //   </div>
// // );

// // const Pagination = ({ currentPage, totalPages, onPageChange }) => {
// //   const pages = [];
// //   const maxVisiblePages = 5;
  
// //   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
// //   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
// //   if (endPage - startPage + 1 < maxVisiblePages) {
// //     startPage = Math.max(1, endPage - maxVisiblePages + 1);
// //   }

// //   for (let i = startPage; i <= endPage; i++) {
// //     pages.push(i);
// //   }

// //   return (
// //     <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
// //       <div className="text-sm" style={{ color: '#6c757d' }}>
// //         Showing page {currentPage} of {totalPages}
// //       </div>
// //       <div className="flex items-center space-x-2">
// //         <button
// //           onClick={() => onPageChange(1)}
// //           disabled={currentPage === 1}
// //           className="btn btn-outline btn-sm"
// //         >
// //           <ChevronsLeft className="w-4 h-4" />
// //         </button>
// //         <button
// //           onClick={() => onPageChange(currentPage - 1)}
// //           disabled={currentPage === 1}
// //           className="btn btn-outline btn-sm"
// //         >
// //           <ChevronLeft className="w-4 h-4" />
// //         </button>
        
// //         {pages.map(page => (
// //           <button
// //             key={page}
// //             onClick={() => onPageChange(page)}
// //             className={`btn btn-sm ${
// //               currentPage === page
// //                 ? 'btn-primary'
// //                 : 'btn-outline'
// //             }`}
// //           >
// //             {page}
// //           </button>
// //         ))}
        
// //         <button
// //           onClick={() => onPageChange(currentPage + 1)}
// //           disabled={currentPage === totalPages}
// //           className="btn btn-outline btn-sm"
// //         >
// //           <ChevronRight className="w-4 h-4" />
// //         </button>
// //         <button
// //           onClick={() => onPageChange(totalPages)}
// //           disabled={currentPage === totalPages}
// //           className="btn btn-outline btn-sm"
// //         >
// //           <ChevronsRight className="w-4 h-4" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // const SortableHeader = ({ children, field, sortConfig, onSort }) => {
// //   const isSorted = sortConfig.key === field;
// //   const isAscending = sortConfig.direction === 'asc';

// //   const handleClick = () => {
// //     onSort(field);
// //   };

// //   return (
// //     <th 
// //       className={isSorted ? 'sorted' : ''}
// //       onClick={handleClick}
// //       style={{ cursor: 'pointer' }}
// //     >
// //       <div className="sortable">
// //         {children}
// //         <span className="sort-icon">
// //           {isSorted ? (
// //             isAscending ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
// //           ) : (
// //             <ArrowUpDown className="w-4 h-4" />
// //           )}
// //         </span>
// //       </div>
// //     </th>
// //   );
// // };

// // const DonutChart = ({ data, title, subtitle }) => {
// //   const total = data.reduce((sum, item) => sum + item.value, 0);
  
// //   const CustomTooltip = ({ active, payload }) => {
// //     if (!active || !payload || !payload.length) return null;
    
// //     const data = payload[0].payload;
// //     return (
// //       <div className="custom-tooltip">
// //         <div className="flex items-center gap-2">
// //           <div 
// //             className="w-3 h-3 rounded"
// //             style={{ backgroundColor: data.color }}
// //           />
// //           <span className="font-semibold">
// //             {data.name}: {data.value} ({((data.value / total) * 100).toFixed(1)}%)
// //           </span>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderLegend = () => (
// //     <div className="donut-legend">
// //       {data.map((entry, index) => (
// //         <div 
// //           key={entry.name}
// //           className="donut-legend-item"
// //           style={{ borderLeftColor: entry.color }}
// //         >
// //           <div 
// //             className="donut-legend-color"
// //             style={{ backgroundColor: entry.color }}
// //           />
// //           <div className="donut-legend-content">
// //             <div className="donut-legend-value">{entry.value}</div>
// //             <div className="donut-legend-label">{entry.name}</div>
// //           </div>
// //           <div className="donut-legend-percentage">
// //             {((entry.value / total) * 100).toFixed(1)}%
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   return (
// //     <ChartCard title={title} subtitle={subtitle}>
// //       <div className="donut-chart-container">
// //         <div className="donut-chart-wrapper">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <PieChart>
// //               <Pie
// //                 data={data}
// //                 cx="50%"
// //                 cy="50%"
// //                 innerRadius={70}
// //                 outerRadius={90}
// //                 paddingAngle={2}
// //                 dataKey="value"
// //                 startAngle={90}
// //                 endAngle={450}
// //               >
// //                 {data.map((entry, index) => (
// //                   <Cell 
// //                     key={`cell-${index}`} 
// //                     fill={entry.color}
// //                     stroke="white"
// //                     strokeWidth={2}
// //                   />
// //                 ))}
// //               </Pie>
// //               <Tooltip content={<CustomTooltip />} />
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="donut-center-text">
// //             <div className="donut-total">{total}</div>
// //             <div className="donut-label">Total</div>
// //           </div>
// //         </div>
// //         {renderLegend()}
// //       </div>
// //     </ChartCard>
// //   );
// // };

// // /* ----------------------------- Main Component ----------------------------- */

// // const PaymentPage = () => {
// //   const [approvedUsers, setApprovedUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState({
// //     totalRevenue: 0,
// //     pendingAmount: 0,
// //     totalApproved: 0,
// //     paidUsers: 0,
// //     pendingUsers: 0,
// //     unpaidUsers: 0,
// //   });
// //   const [trend, setTrend] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [paymentFilter, setPaymentFilter] = useState("All");
// //   const [userModalData, setUserModalData] = useState(null);
  
// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(10);

// //   // Sorting state
// //   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

// //   /**
// //    * Computes statistics for the dashboard cards.
// //    */
// //   const computeStats = useCallback((data) => {
// //     console.log("Computing stats for:", data.length, "approved users");
    
// //     let totalRevenue = 0;
// //     let pendingAmount = 0;
// //     let paidUsers = 0;
// //     let pendingUsers = 0;
// //     let unpaidUsers = 0;

// //     data.forEach(user => {
// //       const paymentStatus = user.paymentStatus || "unpaid";
// //       const amountPaid = user.amountPaid || 0;

// //       console.log(`User: ${user.authorName}, Status: ${paymentStatus}, Amount: ${amountPaid}`);

// //       if (paymentStatus === "paid") {
// //         totalRevenue += amountPaid;
// //         paidUsers++;
// //       } else if (paymentStatus === "pending") {
// //         pendingAmount += amountPaid;
// //         pendingUsers++;
// //       } else {
// //         unpaidUsers++;
// //       }
// //     });

// //     const newStats = {
// //       totalRevenue,
// //       pendingAmount,
// //       totalApproved: data.length,
// //       paidUsers,
// //       pendingUsers,
// //       unpaidUsers,
// //     };

// //     console.log("Computed stats:", newStats);
// //     setStats(newStats);
// //   }, []);

// //   /**
// //    * Computes the revenue trend based on creation date.
// //    */
// //   const computeTrend = useCallback((data) => {
// //     const groups = {};
// //     data.forEach((user) => {
// //       const date = new Date(user.createdAt).toISOString().split("T")[0];
// //       if (!groups[date]) {
// //         groups[date] = { date, revenue: 0, pending: 0 };
// //       }
      
// //       const paymentStatus = user.paymentStatus || "unpaid";
// //       const amountPaid = user.amountPaid || 0;

// //       if (paymentStatus === "paid") {
// //         groups[date].revenue += amountPaid;
// //       } else if (paymentStatus === "pending") {
// //         groups[date].pending += amountPaid;
// //       }
// //     });

// //     const arr = Object.values(groups).sort((a, b) => new Date(a.date) - new Date(b.date));
// //     setTrend(arr);
// //   }, []);

// //   // Format each user with proper payment data extraction
// //   const formatUser = (item) => {
// //     // Extract payment data from multiple possible locations
// //     const workflowPayment = item.workflow || {};
// //     const registrationPayment = item.registration?.payment || {};
// //     const directPayment = item.payment || {};
    
// //     // Use payment data from workflow first, then registration, then direct
// //     const paymentData = workflowPayment.amountPaid ? workflowPayment : 
// //                        registrationPayment.amountPaid ? registrationPayment : 
// //                        directPayment;

// //     const paymentStatus = (
// //       paymentData.paymentStatus || 
// //       workflowPayment.paymentStatus ||
// //       registrationPayment.paymentStatus ||
// //       "unpaid"
// //     ).toLowerCase();

// //     const amountPaid = Number(
// //       paymentData.amountPaid || 
// //       workflowPayment.amountPaid ||
// //       registrationPayment.amountPaid || 
// //       0
// //     );

// //     const paymentMethod = (
// //       paymentData.paymentMethod || 
// //       workflowPayment.paymentMethod ||
// //       registrationPayment.paymentMethod ||
// //       "-"
// //     );

// //     // Check for discount from multiple sources
// //     const discountApplied = 
// //       paymentData.discountApplied ||
// //       workflowPayment.discountApplied ||
// //       registrationPayment.discountApplied ||
// //       item.registration?.discount ||
// //       workflowPayment.discount ||
// //       false;

// //     return {
// //       id: item._id,
// //       userId: item.userId || "N/A",
// //       uniqueId: item.registration?.uniqueId || "N/A",
// //       authorName: item.name || "Unknown",
// //       email: item.registration?.participants?.[0]?.email || "-",
// //       mobile: item.registration?.participants?.[0]?.phone || "-",
// //       track: item.registration?.track || "-",
// //       title: item.registration?.abstractTitle || "No Title",
// //       paymentStatus,
// //       paymentMethod,
// //       amountPaid,
// //       discountApplied: Boolean(discountApplied),
// //       paperStatus: (
// //         workflowPayment.finalPaperStatus ||
// //         workflowPayment.paperStatus ||
// //         item.registration?.paperStatus ||
// //         "no paper"
// //       ).toLowerCase(),
// //       createdAt: item.workflow?.createdAt || item.createdAt || new Date().toISOString(),
// //     };
// //   };

// //   // Check if user has approved paper status
// //   const hasApprovedPaper = (user) => {
// //     const paperStatus = user.paperStatus || "no paper";
// //     return paperStatus === "approved";
// //   };

// //   // Fetch all users and filter only those with approved papers
// //   const fetchApprovedUsers = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const { data } = await axios.get(
// //         "https://s3conference.ksrce.ac.in/api/admin/users",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       console.log("Raw API data:", data);

// //       const formatted = Array.isArray(data) ? data.map(formatUser) : [];
      
// //       // Filter only users with approved paper status
// //       const approvedPaperUsers = formatted.filter(hasApprovedPaper);
      
// //       console.log("All users:", formatted.length);
// //       console.log("Approved paper users:", approvedPaperUsers.length);
// //       console.log("Approved users details:", approvedPaperUsers);

// //       setApprovedUsers(approvedPaperUsers);
// //       computeStats(approvedPaperUsers);
// //       computeTrend(approvedPaperUsers);
// //       setCurrentPage(1); // Reset to first page when data changes
// //     } catch (err) {
// //       console.error("Error fetching payment data:", err);
// //       setApprovedUsers([]);
// //       setStats({
// //         totalRevenue: 0,
// //         pendingAmount: 0,
// //         totalApproved: 0,
// //         paidUsers: 0,
// //         pendingUsers: 0,
// //         unpaidUsers: 0,
// //       });
// //       setTrend([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [computeStats, computeTrend]);

// //   useEffect(() => {
// //     fetchApprovedUsers();
// //   }, [fetchApprovedUsers]);

// //   // Sorting function
// //   const handleSort = (key) => {
// //     let direction = 'asc';
// //     if (sortConfig.key === key && sortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }
// //     setSortConfig({ key, direction });
// //   };

// //   // Search & Filter (Memoized)
// //   const filteredAndSearchedUsers = useMemo(() => {
// //     const q = searchTerm.trim().toLowerCase();
// //     const isAllStatus = paymentFilter.toLowerCase() === "all";

// //     let filtered = approvedUsers.filter((user) => {
// //       const matchesSearch =
// //         user.authorName.toLowerCase().includes(q) ||
// //         user.email.toLowerCase().includes(q) ||
// //         user.uniqueId.toLowerCase().includes(q) ||
// //         user.userId.toLowerCase().includes(q) ||
// //         user.track.toLowerCase().includes(q);

// //       const matchesFilter =
// //         isAllStatus || user.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

// //       return matchesSearch && matchesFilter;
// //     });

// //     // Apply sorting
// //     if (sortConfig.key) {
// //       filtered.sort((a, b) => {
// //         let aValue = a[sortConfig.key];
// //         let bValue = b[sortConfig.key];

// //         if (sortConfig.key === 'createdAt' || sortConfig.key === 'amountPaid') {
// //           aValue = new Date(aValue);
// //           bValue = new Date(bValue);
// //         } else {
// //           aValue = String(aValue || '').toLowerCase();
// //           bValue = String(bValue || '').toLowerCase();
// //         }

// //         if (aValue < bValue) {
// //           return sortConfig.direction === 'asc' ? -1 : 1;
// //         }
// //         if (aValue > bValue) {
// //           return sortConfig.direction === 'asc' ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }

// //     return filtered;
// //   }, [approvedUsers, searchTerm, paymentFilter, sortConfig]);

// //   // Pagination logic
// //   const paginatedUsers = useMemo(() => {
// //     const startIndex = (currentPage - 1) * itemsPerPage;
// //     return filteredAndSearchedUsers.slice(startIndex, startIndex + itemsPerPage);
// //   }, [filteredAndSearchedUsers, currentPage, itemsPerPage]);

// //   const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);

// //   // Handle page change
// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   // Payment Status Badge Styling
// //   const getPaymentBadge = (status) => {
// //     const statusMap = {
// //       paid: { class: "status-indicator-paid", label: "Paid" },
// //       unpaid: { class: "status-indicator-unpaid", label: "Unpaid" },
// //       pending: { class: "status-indicator-pending", label: "Pending" },
// //     };
    
// //     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
// //     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
// //   };

// //   // Paper Status Badge Styling
// //   const getPaperStatusBadge = (status) => {
// //     const statusMap = {
// //       approved: { class: "status-indicator-approved", label: "Approved" },
// //       rejected: { class: "status-indicator-rejected", label: "Rejected" },
// //       pending: { class: "status-indicator-pending", label: "Pending" },
// //       "no paper": { class: "", label: "No Paper" },
// //     };
    
// //     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
// //     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
// //   };

// //   // Handle Export to Excel
// //   const handleExportExcel = () => {
// //     if (!filteredAndSearchedUsers.length) return alert("No data to export!");

// //     const exportData = filteredAndSearchedUsers.map((user) => ({
// //       "Unique ID": user.uniqueId,
// //       "User ID": user.userId,
// //       "Author Name": user.authorName,
// //       Email: user.email,
// //       "Mobile": user.mobile,
// //       Track: user.track,
// //       Title: user.title,
// //       "Paper Status": user.paperStatus,
// //       "Payment Status": user.paymentStatus,
// //       "Payment Method": user.paymentMethod,
// //       "Amount Paid": user.amountPaid,
// //       "Discount Applied": user.discountApplied ? "Yes" : "No",
// //       "Registration Date": new Date(user.createdAt).toLocaleDateString(),
// //     }));

// //     const ws = XLSX.utils.json_to_sheet(exportData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "Payments");
// //     XLSX.writeFile(wb, `approved_papers_payments_${new Date().toISOString().split('T')[0]}.xlsx`);
// //   };

// //   // Chart data for donut chart
// //   const paymentDonutData = [
// //     { name: "Paid", value: stats.paidUsers, color: "#10B981" },
// //     { name: "Unpaid", value: stats.unpaidUsers, color: "#EF4444" },
// //     { name: "Pending", value: stats.pendingUsers, color: "#F59E0B" },
// //   ].filter(item => item.value > 0);

// //   // Custom Tooltip Component for charts
// //   const CustomTooltip = ({ active, payload, label }) => {
// //     if (!active || !payload || !payload.length) return null;
    
// //     return (
// //       <div className="custom-tooltip">
// //         <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
// //         {payload.map((entry, index) => (
// //           <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
// //             {entry.name}: ₹{entry.value.toLocaleString()}
// //           </p>
// //         ))}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <style>{paymentStyles}</style>
// //       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
// //         <div className="max-w-7xl mx-auto space-y-8">
          
// //           {/* Header */}
// //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
// //             <div>
// //               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
// //                 Payment & Financial Overview
// //               </h1>
// //               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
// //                 <BarChart3 className="w-4 w-4" />
// //                 Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
// //               </p>
// //             </div>
// //             <button
// //               onClick={fetchApprovedUsers}
// //               className="btn btn-secondary"
// //               disabled={loading}
// //               style={{ flexShrink: 0 }}
// //             >
// //               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
// //               Refresh Data
// //             </button>
// //           </div>

// //           {/* Stats Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             <StatCard 
// //               icon={<DollarSign className="w-6 h-6" />}
// //               title="Total Revenue (Paid)" 
// //               value={`₹${stats.totalRevenue.toLocaleString()}`}
// //               hint="Confirmed payments from approved papers"
// //               color="#10B981"
// //               colorDark="#059669"
// //             />
// //             <StatCard 
// //               icon={<FileCheck className="w-6 h-6" />}
// //               title="Approved Papers" 
// //               value={stats.totalApproved.toLocaleString()}
// //               hint="Papers with approved status"
// //               color="#1976D2"
// //               colorDark="#0D47A1"
// //             />
// //             <StatCard 
// //               icon={<UserCheck className="w-6 h-6" />}
// //               title="Paid Users" 
// //               value={stats.paidUsers.toLocaleString()}
// //               hint="Completed payments"
// //               color="#10B981"
// //               colorDark="#059669"
// //             />
// //             <StatCard 
// //               icon={<UserX className="w-6 h-6" />}
// //               title="Unpaid Users" 
// //               value={stats.unpaidUsers.toLocaleString()}
// //               hint="Payment required"
// //               color="#EF4444"
// //               colorDark="#DC2626"
// //             />
// //           </div>

// //           {/* Charts */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {/* Payment Status Donut Chart */}
// //             <DonutChart 
// //               title="Payment Status Distribution"
// //               subtitle="Breakdown of payment status for approved papers"
// //               data={paymentDonutData}
// //             />

// //             {/* Revenue Trend Chart */}
// //             <ChartCard 
// //               title="Revenue Trends"
// //               subtitle="Daily revenue and pending amount trends"
// //             >
// //               {trend.length > 0 ? (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <LineChart data={trend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
// //                     <XAxis 
// //                       dataKey="date" 
// //                       tick={{ fill: '#6c757d', fontSize: 12 }}
// //                       axisLine={{ stroke: '#e2e8f0' }}
// //                       tickLine={false}
// //                     />
// //                     <YAxis 
// //                       tickFormatter={(v) => `₹${v.toLocaleString()}`}
// //                       tick={{ fill: '#6c757d', fontSize: 12 }}
// //                       axisLine={{ stroke: '#e2e8f0' }}
// //                       tickLine={false}
// //                     />
// //                     <Tooltip content={<CustomTooltip />} />
// //                     <Legend />
// //                     <Line
// //                       type="monotone"
// //                       dataKey="revenue"
// //                       name="Paid Revenue"
// //                       stroke="#10B981"
// //                       strokeWidth={3}
// //                       dot={{ r: 4, strokeWidth: 2, stroke: '#10B981', fill: 'white' }}
// //                       activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
// //                     />
// //                     <Line
// //                       type="monotone"
// //                       dataKey="pending"
// //                       name="Pending Amount"
// //                       stroke="#F59E0B"
// //                       strokeWidth={3}
// //                       dot={{ r: 4, strokeWidth: 2, stroke: '#F59E0B', fill: 'white' }}
// //                       activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: 'white' }}
// //                     />
// //                   </LineChart>
// //                 </ResponsiveContainer>
// //               ) : (
// //                 <div className="flex items-center justify-center h-64">
// //                   <p style={{ color: '#6c757d' }}>No revenue data available</p>
// //                 </div>
// //               )}
// //             </ChartCard>
// //           </div>

// //           {/* Enhanced Table Section */}
// //           <div className="table-container">
// //             {/* Table Header */}
// //             <div className="table-toolbar">
// //               <div className="table-info">
// //                 <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
// //                   Approved Papers Payment Records
// //                 </h3>
// //                 <span style={{ color: '#6c757d' }}>
// //                   {filteredAndSearchedUsers.length} records found
// //                 </span>
// //               </div>
// //               <div className="table-actions">
// //                 <div className="search-box">
// //                   <Search className="w-4 h-4 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by ID, name, email, or title..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                   />
// //                 </div>
// //                 <select
// //                   value={paymentFilter}
// //                   onChange={(e) => setPaymentFilter(e.target.value)}
// //                   className="filter-select"
// //                 >
// //                   <option value="All">All Payment Statuses</option>
// //                   <option value="paid">Paid</option>
// //                   <option value="unpaid">Unpaid</option>
// //                   <option value="pending">Pending</option>
// //                 </select>
// //                 <button
// //                   onClick={handleExportExcel}
// //                   className="btn btn-success btn-sm"
// //                   disabled={filteredAndSearchedUsers.length === 0}
// //                 >
// //                   <Download className="w-4 h-4" />
// //                   Export
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Table Content */}
// //             {loading ? (
// //               <div className="loading-state">
// //                 <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1976D2' }} />
// //                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading payment data...</span>
// //               </div>
// //             ) : filteredAndSearchedUsers.length === 0 ? (
// //               <div className="empty-state">
// //                 <div className="empty-state-icon">
// //                   <FileText className="w-8 h-8 text-gray-400" />
// //                 </div>
// //                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
// //                   {approvedUsers.length === 0 ? 'No approved papers found' : 'No matching records'}
// //                 </h4>
// //                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
// //                   {approvedUsers.length === 0 
// //                     ? 'There are no approved paper submissions yet.' 
// //                     : 'Try adjusting your search or filter criteria.'
// //                   }
// //                 </p>
// //                 {approvedUsers.length === 0 && (
// //                   <button 
// //                     onClick={fetchApprovedUsers}
// //                     className="btn btn-primary"
// //                   >
// //                     <RefreshCw className="w-4 h-4 mr-2" />
// //                     Refresh Data
// //                   </button>
// //                 )}
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="overflow-x-auto">
// //                   <table className="table-modern">
// //                     <thead>
// //                       <tr>
// //                         <SortableHeader field="userId" sortConfig={sortConfig} onSort={handleSort}>
// //                           User ID
// //                         </SortableHeader>
// //                         <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
// //                           Author Name
// //                         </SortableHeader>
// //                         <th>Email</th>
// //                         <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
// //                           Track
// //                         </SortableHeader>
// //                         <th style={{ textAlign: 'center' }}>Paper Status</th>
// //                         <th style={{ textAlign: 'center' }}>Payment Status</th>
// //                         <th style={{ textAlign: 'center' }}>Payment Method</th>
// //                         <th style={{ textAlign: 'center' }}>Discount</th>
// //                         <SortableHeader field="amountPaid" sortConfig={sortConfig} onSort={handleSort}>
// //                           Amount Paid
// //                         </SortableHeader>
// //                         <th style={{ textAlign: 'center' }}>Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {paginatedUsers.map((user) => (
// //                         <tr key={user.id}>
// //                           <td>
// //                             <div className="font-mono text-xs" style={{ color: '#6c757d' }}>
// //                               {user.userId}
// //                             </div>
// //                           </td>
// //                           <td>
// //                             <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
// //                               {user.authorName}
// //                             </div>
// //                           </td>
// //                           <td>
// //                             <div className="text-sm" style={{ color: '#475569' }}>
// //                               {user.email}
// //                             </div>
// //                           </td>
// //                           <td>
// //                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
// //                               {user.track}
// //                             </span>
// //                           </td>
// //                           <td style={{ textAlign: 'center' }}>
// //                             {getPaperStatusBadge(user.paperStatus)}
// //                           </td>
// //                           <td style={{ textAlign: 'center' }}>
// //                             {getPaymentBadge(user.paymentStatus)}
// //                           </td>
// //                           <td style={{ textAlign: 'center' }}>
// //                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
// //                               {user.paymentMethod}
// //                             </span>
// //                           </td>
// //                           <td style={{ textAlign: 'center' }}>
// //                             {user.discountApplied ? (
// //                               <span className="text-emerald-600 font-semibold text-sm">Yes</span>
// //                             ) : (
// //                               <span className="text-gray-400 text-sm">No</span>
// //                             )}
// //                           </td>
// //                           <td style={{ textAlign: 'right' }}>
// //                             <div className="font-bold" style={{ color: '#111318' }}>
// //                               ₹{user.amountPaid.toLocaleString()}
// //                             </div>
// //                           </td>
// //                           <td style={{ textAlign: 'center' }}>
// //                             <button
// //                               onClick={() => setUserModalData(user)}
// //                               className="btn btn-primary btn-sm"
// //                             >
// //                               <Eye className="w-4 h-4" />
// //                               Details
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
                
// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                   <Pagination
// //                     currentPage={currentPage}
// //                     totalPages={totalPages}
// //                     onPageChange={handlePageChange}
// //                   />
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* User Details Modal */}
// //       {userModalData && (
// //         <Modal onClose={() => setUserModalData(null)} size="md">
// //           <div className="p-6">
// //             <h2 className="text-xl font-bold mb-2">
// //               Payment Details: {userModalData.authorName}
// //             </h2>
// //             <p className="text-gray-600 mb-4">
// //               {userModalData.title.substring(0, 70)}...
// //             </p>

// //             <div className="space-y-4">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="p-3 bg-gray-50 rounded-lg">
// //                   <div className="text-sm text-gray-500">User ID</div>
// //                   <div className="font-mono text-sm">{userModalData.userId}</div>
// //                 </div>
// //                 <div className="p-3 bg-gray-50 rounded-lg">
// //                   <div className="text-sm text-gray-500">Unique ID</div>
// //                   <div className="font-mono text-sm">{userModalData.uniqueId}</div>
// //                 </div>
// //               </div>

// //               <div className="p-3 border rounded-lg">
// //                 <div className="text-sm text-gray-500 mb-2">Paper & Payment Information</div>
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between">
// //                     <span>Paper Status:</span>
// //                     {getPaperStatusBadge(userModalData.paperStatus)}
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Payment Status:</span>
// //                     {getPaymentBadge(userModalData.paymentStatus)}
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Payment Method:</span>
// //                     <span>{userModalData.paymentMethod}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Amount Paid:</span>
// //                     <span className="font-bold">₹{userModalData.amountPaid.toLocaleString()}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Discount Applied:</span>
// //                     <span>{userModalData.discountApplied ? "Yes" : "No"}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="p-3 border rounded-lg">
// //                 <div className="text-sm text-gray-500 mb-2">Contact Information</div>
// //                 <div className="space-y-1 text-sm">
// //                   <div>Email: {userModalData.email}</div>
// //                   <div>Mobile: {userModalData.mobile}</div>
// //                   <div>Track: {userModalData.track}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}
// //     </>
// //   );
// // };

// // export default PaymentPage;

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Search,
//   DollarSign,
//   Clock,
//   Users,
//   CheckCircle,
//   UserCheck,
//   UserX,
//   FileCheck,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   RefreshCw,
//   BarChart3,
//   Eye,
//   FileText,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// /* ----------------------------- Updated Styles ----------------------------- */
// const paymentStyles = `
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

//   .table-modern th .sortable {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   /* REMOVED HOVER EFFECTS FROM TABLE ROWS */
//   .table-modern tbody tr {
//     border-bottom: 1px solid #f1f5f9;
//     position: relative;
//   }

//   .table-modern tbody tr:last-child {
//     border-bottom: none;
//   }

//   /* Remove hover effects completely */
//   .table-modern tbody tr:hover {
//     background: inherit;
//     transform: none;
//     box-shadow: none;
//   }

//   .table-modern tbody tr:hover::before {
//     display: none;
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

//   /* REMOVED .badge and .badge-* rules.
//     They are replaced by .status-indicator and .status-indicator-* rules below.
//   */

//   .action-buttons {
//     display: flex;
//     gap: 8px;
//     justify-content: center;
//     align-items: center;
//   }

//   .action-menu {
//     position: relative;
//     display: inline-block;
//   }

//   .action-dropdown {
//     position: absolute;
//     right: 0;
//     top: 100%;
//     margin-top: 8px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//     border: 1px solid var(--border-light);
//     padding: 8px;
//     min-width: 160px;
//     z-index: 20;
//     animation: slideDown 0.2s ease;
//   }

//   .action-dropdown button {
//     width: 100%;
//     justify-content: flex-start;
//     padding: 10px 12px;
//     border-radius: 8px;
//     font-size: 0.875rem;
//     border: none;
//     background: transparent;
//     color: var(--text-primary);
//     cursor: pointer;
//     transition: all 0.2s ease;
//   }

//   .action-dropdown button:hover {
//     background: #f8fafc;
//   }

//   .action-dropdown button.danger {
//     color: #ef4444;
//   }

//   .action-dropdown button.danger:hover {
//     background: #fef2f2;
//   }

//   @keyframes slideDown {
//     from {
//       opacity: 0;
//       transform: translateY(-8px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
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

//   /* --- NEW: Redesigned Status Indicator Styles --- */
//   .status-indicator {
//     display: inline-flex;
//     align-items: center;
//     padding: 4px 10px;
//     border-radius: 9999px; /* pill shape */
//     font-weight: 600;
//     font-size: 0.75rem;
//     text-transform: capitalize;
//     /* Default/fallback style */
//     background-color: #E5E7EB; /* Tailwind gray-200 */
//     color: #374151; /* Tailwind gray-700 */
//     cursor: default;
//     pointer-events: none;
//   }

//   .status-indicator-approved {
//     background-color: #D1FAE5; /* Tailwind green-100 */
//     color: #065F46; /* Tailwind green-800 */
//   }
  
//   .status-indicator-rejected {
//     background-color: #FEE2E2; /* Tailwind red-100 */
//     color: #991B1B; /* Tailwind red-800 */
//   }
  
//   .status-indicator-pending {
//     background-color: #FEF3C7; /* Tailwind yellow-100 */
//     color: #92400E; /* Tailwind yellow-800 */
//   }
  
//   .status-indicator-under-review {
//     background-color: #DBEAFE; /* Tailwind blue-100 */
//     color: #1E40AF; /* Tailwind blue-800 */
//   }

//   .status-indicator-paid {
//     background-color: #D1FAE5; /* Tailwind green-100 */
//     color: #065F46; /* Tailwind green-800 */
//   }
  
//   .status-indicator-unpaid {
//     background-color: #FEE2E2; /* Tailwind red-100 */
//     color: #991B1B; /* Tailwind red-800 */
//   }
//   /* --- END: Redesigned Status Indicator Styles --- */

//   /* UPDATED: New button colors for View Team and Review buttons */
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

//   .review-button {
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

//   .review-button:hover {
//     background: linear-gradient(135deg, #7C3AED, #6D28D9);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
//   }

//   .details-button {
//     background: linear-gradient(135deg, #F57C00, #E65100);
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

//   .details-button:hover {
//     background: linear-gradient(135deg, #E65100, #BF360C);
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
//   }

//   /* Date Filter Styles */
//   .filter-dropdown {
//     position: relative;
//     display: inline-block;
//   }

//   /* FIXED: Updated Date Filter Styles to prevent hiding */
//   .filter-menu {
//     position: absolute;
//     top: 100%;
//     right: 0;
//     margin-top: 8px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//     border: 1px solid var(--border-light);
//     padding: 16px;
//     min-width: 280px;
//     max-height: 400px;
//     overflow-y: auto;
//     z-index: 1000; /* Increased z-index to ensure it appears above other elements */
//     animation: slideDown 0.2s ease;
//   }

//   .filter-menu::-webkit-scrollbar {
//     width: 6px;
//   }

//   .filter-menu::-webkit-scrollbar-track {
//     background: #f1f5f9;
//     border-radius: 3px;
//   }

//   .filter-menu::-webkit-scrollbar-thumb {
//     background: #cbd5e1;
//     border-radius: 3px;
//   }

//   .filter-menu::-webkit-scrollbar-thumb:hover {
//     background: #94a3b8;
//   }

//   .quick-ranges-section {
//     max-height: 200px;
//     overflow-y: auto;
//     margin-bottom: 16px;
//   }

//   .quick-ranges-section::-webkit-scrollbar {
//     width: 4px;
//   }

//   .quick-ranges-section::-webkit-scrollbar-track {
//     background: #f8fafc;
//     border-radius: 2px;
//   }

//   .quick-ranges-section::-webkit-scrollbar-thumb {
//     background: #e2e8f0;
//     border-radius: 2px;
//   }

//   /* Ensure the filter dropdown stays within viewport */
//   .filter-dropdown {
//     position: relative;
//     display: inline-block;
//   }

//   @media (max-height: 600px) {
//     .filter-menu {
//       max-height: 300px;
//     }
    
//     .quick-ranges-section {
//       max-height: 150px;
//     }
//   }

//   .date-input {
//     width: 100%;
//     padding: 8px 12px;
//     border: 1px solid var(--border-light);
//     border-radius: 8px;
//     font-size: 0.875rem;
//     transition: all 0.2s ease;
//   }

//   .date-input:focus {
//     outline: none;
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
//   }

//   .filter-actions {
//     display: flex;
//     gap: 8px;
//     margin-top: 12px;
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

//   /* NEW: Donut Chart Styles */
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

//   /* Custom Donut Chart Tooltip */
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

//   /* Improved Table Styles for Modal */
//   .modal-content table {
//     width: 100%;
//     border-collapse: collapse;
//   }

//   .modal-content thead {
//     position: sticky;
//     top: 0;
//     background: #f9fafb;
//     z-index: 10;
//   }

//   .modal-content th {
//     padding: 12px 16px;
//     text-align: left;
//     font-size: 0.75rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     color: #6b7280;
//     border-bottom: 2px solid #e5e7eb;
//     white-space: nowrap;
//   }

//   .modal-content td {
//     padding: 12px 16px;
//     font-size: 0.875rem;
//     border-bottom: 1px solid #f3f4f6;
//     white-space: nowrap;
//   }

//   .modal-content tbody tr:last-child td {
//     border-bottom: none;
//   }

//   /* Ensure the modal content area is scrollable but without visible scrollbars */
//   .modal-content > div:last-child {
//     flex: 1;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//   }

//   .modal-content .overflow-visible {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//   }

//   /* Custom scrollbar hiding for modal content */
//   .modal-content ::-webkit-scrollbar {
//     width: 6px;
//     height: 6px;
//   }

//   .modal-content ::-webkit-scrollbar-track {
//     background: transparent;
//   }

//   .modal-content ::-webkit-scrollbar-thumb {
//     background: transparent;
//     border-radius: 3px;
//   }

//   .modal-content:hover ::-webkit-scrollbar-thumb {
//     background: #cbd5e1;
//   }

//   .modal-content ::-webkit-scrollbar-thumb:hover {
//     background: #94a3b8;
//   }

//   /* Improved responsive design */
//   @media (max-width: 1024px) {
//     .modal-content {
//       margin: 10px;
//       max-height: 95vh;
//     }
    
//     .modal-content table {
//       display: block;
//       overflow-x: auto;
//       white-space: nowrap;
//     }
    
//     .modal-content thead,
//     .modal-content tbody,
//     .modal-content th,
//     .modal-content td,
//     .modal-content tr {
//       display: block;
//     }
    
//     .modal-content thead tr {
//       position: absolute;
//       top: -9999px;
//       left: -9999px;
//     }
    
//     .modal-content tr {
//       border: 1px solid #e5e7eb;
//       border-radius: 8px;
//       margin-bottom: 8px;
//       padding: 8px;
//     }
    
//     .modal-content td {
//       border: none;
//       border-bottom: 1px solid #f3f4f6;
//       position: relative;
//       padding-left: 50%;
//       white-space: normal;
//     }
    
//     .modal-content td:before {
//       content: attr(data-label);
//       position: absolute;
//       left: 12px;
//       width: 45%;
//       padding-right: 12px;
//       white-space: nowrap;
//       font-weight: 600;
//       color: #374151;
//     }
//   }
// `;

// /* ----------------------------- Small Components ----------------------------- */

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
//         className={`modal-content w-full ${sizeClasses[size]} mx-4 my-6 max-h-[90vh] flex flex-col`} 
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

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;
  
//   return (
//     <div style={{
//       background: 'white',
//       border: '1px solid rgba(0,0,0,0.1)',
//       borderRadius: '12px',
//       padding: '12px 16px',
//       boxshadow: '0 8px 24px rgba(0,0,0,0.12)'
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
//       <div className="sortable">
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

// // Donut Chart Component
// const DonutChart = ({ data, title, subtitle }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
  
//   const COLORS = {
//     approved: '#10B981',
//     rejected: '#EF4444',
//     pending: '#F59E0B'
//   };

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

// /* ----------------------------- Main Component ----------------------------- */

// const PaymentPage = () => {
//   const [approvedUsers, setApprovedUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalRevenue: 0,
//     pendingAmount: 0,
//     totalApproved: 0,
//     paidUsers: 0,
//     pendingUsers: 0,
//     unpaidUsers: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("All");
//   const [userModalData, setUserModalData] = useState(null);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     console.log("Computing stats for:", data.length, "approved users");
    
//     let totalRevenue = 0;
//     let pendingAmount = 0;
//     let paidUsers = 0;
//     let pendingUsers = 0;
//     let unpaidUsers = 0;

//     data.forEach(user => {
//       const paymentStatus = user.paymentStatus || "unpaid";
//       const amountPaid = user.amountPaid || 0;

//       console.log(`User: ${user.authorName}, Status: ${paymentStatus}, Amount: ${amountPaid}`);

//       if (paymentStatus === "paid") {
//         totalRevenue += amountPaid;
//         paidUsers++;
//       } else if (paymentStatus === "pending") {
//         pendingAmount += amountPaid;
//         pendingUsers++;
//       } else {
//         unpaidUsers++;
//       }
//     });

//     const newStats = {
//       totalRevenue,
//       pendingAmount,
//       totalApproved: data.length,
//       paidUsers,
//       pendingUsers,
//       unpaidUsers,
//     };

//     console.log("Computed stats:", newStats);
//     setStats(newStats);
//   }, []);

//   /**
//    * Computes the revenue trend based on creation date.
//    */
//   const computeTrend = useCallback((data) => {
//     const groups = {};
//     data.forEach((user) => {
//       const date = new Date(user.createdAt).toISOString().split("T")[0];
//       if (!groups[date]) {
//         groups[date] = { date, revenue: 0, pending: 0 };
//       }
      
//       const paymentStatus = user.paymentStatus || "unpaid";
//       const amountPaid = user.amountPaid || 0;

//       if (paymentStatus === "paid") {
//         groups[date].revenue += amountPaid;
//       } else if (paymentStatus === "pending") {
//         groups[date].pending += amountPaid;
//       }
//     });

//     const arr = Object.values(groups).sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTrend(arr);
//   }, []);

//   // Format each user with proper payment data extraction
//   const formatUser = (item) => {
//     // Extract payment data from multiple possible locations
//     const workflowPayment = item.workflow || {};
//     const registrationPayment = item.registration?.payment || {};
//     const directPayment = item.payment || {};
    
//     // Use payment data from workflow first, then registration, then direct
//     const paymentData = workflowPayment.amountPaid ? workflowPayment : 
//                        registrationPayment.amountPaid ? registrationPayment : 
//                        directPayment;

//     const paymentStatus = (
//       paymentData.paymentStatus || 
//       workflowPayment.paymentStatus ||
//       registrationPayment.paymentStatus ||
//       "unpaid"
//     ).toLowerCase();

//     const amountPaid = Number(
//       paymentData.amountPaid || 
//       workflowPayment.amountPaid ||
//       registrationPayment.amountPaid || 
//       0
//     );

//     const paymentMethod = (
//       paymentData.paymentMethod || 
//       workflowPayment.paymentMethod ||
//       registrationPayment.paymentMethod ||
//       "-"
//     );

//     // Check for discount from multiple sources
//     const discountApplied = 
//       paymentData.discountApplied ||
//       workflowPayment.discountApplied ||
//       registrationPayment.discountApplied ||
//       item.registration?.discount ||
//       workflowPayment.discount ||
//       false;

//     return {
//       id: item._id,
//       userId: item.userId || "N/A",
//       uniqueId: item.registration?.uniqueId || "N/A",
//       authorName: item.name || "Unknown",
//       email: item.registration?.participants?.[0]?.email || "-",
//       mobile: item.registration?.participants?.[0]?.phone || "-",
//       track: item.registration?.track || "-",
//       title: item.registration?.abstractTitle || "No Title",
//       paymentStatus,
//       paymentMethod,
//       amountPaid,
//       discountApplied: Boolean(discountApplied),
//       paperStatus: (
//         workflowPayment.finalPaperStatus ||
//         workflowPayment.paperStatus ||
//         item.registration?.paperStatus ||
//         "no paper"
//       ).toLowerCase(),
//       createdAt: item.workflow?.createdAt || item.createdAt || new Date().toISOString(),
//     };
//   };

//   // Check if user has approved paper status
//   const hasApprovedPaper = (user) => {
//     const paperStatus = user.paperStatus || "no paper";
//     return paperStatus === "approved";
//   };

//   // Fetch all users and filter only those with approved papers
//   const fetchApprovedUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Raw API data:", data);

//       const formatted = Array.isArray(data) ? data.map(formatUser) : [];
      
//       // Filter only users with approved paper status
//       const approvedPaperUsers = formatted.filter(hasApprovedPaper);
      
//       console.log("All users:", formatted.length);
//       console.log("Approved paper users:", approvedPaperUsers.length);
//       console.log("Approved users details:", approvedPaperUsers);

//       setApprovedUsers(approvedPaperUsers);
//       computeStats(approvedPaperUsers);
//       computeTrend(approvedPaperUsers);
//       setCurrentPage(1); // Reset to first page when data changes
//     } catch (err) {
//       console.error("Error fetching payment data:", err);
//       setApprovedUsers([]);
//       setStats({
//         totalRevenue: 0,
//         pendingAmount: 0,
//         totalApproved: 0,
//         paidUsers: 0,
//         pendingUsers: 0,
//         unpaidUsers: 0,
//       });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchApprovedUsers();
//   }, [fetchApprovedUsers]);

//   // Sorting function
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Search & Filter (Memoized)
//   const filteredAndSearchedUsers = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = paymentFilter.toLowerCase() === "all";

//     let filtered = approvedUsers.filter((user) => {
//       const matchesSearch =
//         user.authorName.toLowerCase().includes(q) ||
//         user.email.toLowerCase().includes(q) ||
//         user.uniqueId.toLowerCase().includes(q) ||
//         user.userId.toLowerCase().includes(q) ||
//         user.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || user.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];

//         if (sortConfig.key === 'createdAt' || sortConfig.key === 'amountPaid') {
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
//   }, [approvedUsers, searchTerm, paymentFilter, sortConfig]);

//   // Pagination logic
//   const paginatedUsers = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSearchedUsers.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSearchedUsers, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Payment Status Badge Styling
//   const getPaymentBadge = (status) => {
//     const statusMap = {
//       paid: { class: "status-indicator-paid", label: "Paid" },
//       unpaid: { class: "status-indicator-unpaid", label: "Unpaid" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   // Paper Status Badge Styling
//   const getPaperStatusBadge = (status) => {
//     const statusMap = {
//       approved: { class: "status-indicator-approved", label: "Approved" },
//       rejected: { class: "status-indicator-rejected", label: "Rejected" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//       "no paper": { class: "", label: "No Paper" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedUsers.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedUsers.map((user) => ({
//       "Unique ID": user.uniqueId,
//       "User ID": user.userId,
//       "Author Name": user.authorName,
//       Email: user.email,
//       "Mobile": user.mobile,
//       Track: user.track,
//       Title: user.title,
//       "Paper Status": user.paperStatus,
//       "Payment Status": user.paymentStatus,
//       "Payment Method": user.paymentMethod,
//       "Amount Paid": user.amountPaid,
//       "Discount Applied": user.discountApplied ? "Yes" : "No",
//       "Registration Date": new Date(user.createdAt).toLocaleDateString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Payments");
//     XLSX.writeFile(wb, `approved_papers_payments_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Chart data for donut chart
//   const paymentDonutData = [
//     { name: "Paid", value: stats.paidUsers, color: "#10B981" },
//     { name: "Unpaid", value: stats.unpaidUsers, color: "#EF4444" },
//     { name: "Pending", value: stats.pendingUsers, color: "#F59E0B" },
//   ].filter(item => item.value > 0);

//   return (
//     <>
//       <style>{paymentStyles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Payment & Financial Overview
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
//                 <BarChart3 className="w-4 w-4" />
//                 Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
//               </p>
//             </div>
//             <button
//               onClick={fetchApprovedUsers}
//               className="btn btn-secondary"
//               disabled={loading}
//               style={{ flexShrink: 0 }}
//             >
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//               Refresh Data
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <StatCard 
//               icon={<DollarSign className="w-6 h-6" />}
//               title="Total Revenue (Paid)" 
//               value={`₹${stats.totalRevenue.toLocaleString()}`}
//               hint="Confirmed payments from approved papers"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={<FileCheck className="w-6 h-6" />}
//               title="Approved Papers" 
//               value={stats.totalApproved.toLocaleString()}
//               hint="Papers with approved status"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//             <StatCard 
//               icon={<UserCheck className="w-6 h-6" />}
//               title="Paid Users" 
//               value={stats.paidUsers.toLocaleString()}
//               hint="Completed payments"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={<UserX className="w-6 h-6" />}
//               title="Unpaid Users" 
//               value={stats.unpaidUsers.toLocaleString()}
//               hint="Payment required"
//               color="#EF4444"
//               colorDark="#DC2626"
//             />
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Payment Status Donut Chart */}
//             <DonutChart 
//               title="Payment Status Distribution"
//               subtitle="Breakdown of payment status for approved papers"
//               data={paymentDonutData}
//             />

//             {/* Revenue Trend Chart */}
//             <ChartCard 
//               title="Revenue Trends"
//               subtitle="Daily revenue and pending amount trends"
//             >
//               {trend.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={trend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                     <XAxis 
//                       dataKey="date" 
//                       tick={{ fill: '#6c757d', fontSize: 12 }}
//                       axisLine={{ stroke: '#e2e8f0' }}
//                       tickLine={false}
//                     />
//                     <YAxis 
//                       tickFormatter={(v) => `₹${v.toLocaleString()}`}
//                       tick={{ fill: '#6c757d', fontSize: 12 }}
//                       axisLine={{ stroke: '#e2e8f0' }}
//                       tickLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="revenue"
//                       name="Paid Revenue"
//                       stroke="#10B981"
//                       strokeWidth={3}
//                       dot={{ r: 4, strokeWidth: 2, stroke: '#10B981', fill: 'white' }}
//                       activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="pending"
//                       name="Pending Amount"
//                       stroke="#F59E0B"
//                       strokeWidth={3}
//                       dot={{ r: 4, strokeWidth: 2, stroke: '#F59E0B', fill: 'white' }}
//                       activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: 'white' }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex items-center justify-center h-64">
//                   <p style={{ color: '#6c757d' }}>No revenue data available</p>
//                 </div>
//               )}
//             </ChartCard>
//           </div>

//           {/* Enhanced Table Section */}
//           <div className="table-container">
//             {/* Table Header */}
//             <div className="table-toolbar">
//               <div className="table-info">
//                 <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
//                   Approved Papers Payment Records
//                 </h3>
//                 <span style={{ color: '#6c757d' }}>
//                   {filteredAndSearchedUsers.length} records found
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
//                   value={paymentFilter}
//                   onChange={(e) => setPaymentFilter(e.target.value)}
//                   className="filter-select"
//                 >
//                   <option value="All">All Payment Statuses</option>
//                   <option value="paid">Paid</option>
//                   <option value="unpaid">Unpaid</option>
//                   <option value="pending">Pending</option>
//                 </select>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-success btn-sm"
//                   disabled={filteredAndSearchedUsers.length === 0}
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
//                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading payment data...</span>
//               </div>
//             ) : filteredAndSearchedUsers.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
//                   {approvedUsers.length === 0 ? 'No approved papers found' : 'No matching records'}
//                 </h4>
//                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
//                   {approvedUsers.length === 0 
//                     ? 'There are no approved paper submissions yet.' 
//                     : 'Try adjusting your search or filter criteria.'
//                   }
//                 </p>
//                 {approvedUsers.length === 0 && (
//                   <button 
//                     onClick={fetchApprovedUsers}
//                     className="btn btn-primary"
//                   >
//                     <RefreshCw className="w-4 h-4 mr-2" />
//                     Refresh Data
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 {/* Removed overflow-x-auto wrapper to prevent scrolling */}
//                 <table className="table-modern">
//                   <thead>
//                     <tr>
//                       <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
//                         Author
//                       </SortableHeader>
//                       <th>Email</th>
//                       <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
//                         Title
//                       </SortableHeader>
//                       <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
//                         Track
//                       </SortableHeader>
//                       <th style={{ textAlign: 'center' }}>Paper Status</th>
//                       <th style={{ textAlign: 'center' }}>Payment Status</th>
//                       <th style={{ textAlign: 'center' }}>Payment Method</th>
//                       <th style={{ textAlign: 'center' }}>Discount</th>
//                       <SortableHeader field="amountPaid" sortConfig={sortConfig} onSort={handleSort}>
//                         Amount Paid
//                       </SortableHeader>
//                       <th style={{ textAlign: 'center' }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedUsers.map((user) => (
//                       <tr key={user.id}>
//                         <td>
//                           <div>
//                             <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
//                               {user.authorName}
//                             </div>
//                             <div className="text-xs" style={{ color: '#6c757d' }}>
//                               {user.userId}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="text-sm" style={{ color: '#475569' }}>
//                             {user.email}
//                           </div>
//                         </td>
//                         <td>
//                           <div 
//                             className="font-medium"
//                             title={user.title}
//                             style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
//                           >
//                             {user.title}
//                           </div>
//                         </td>
//                         <td>
//                           <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                             {user.track}
//                           </span>
//                         </td>
//                         <td style={{ textAlign: 'center' }}>
//                           {getPaperStatusBadge(user.paperStatus)}
//                         </td>
//                         <td style={{ textAlign: 'center' }}>
//                           {getPaymentBadge(user.paymentStatus)}
//                         </td>
//                         <td style={{ textAlign: 'center' }}>
//                           <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                             {user.paymentMethod}
//                           </span>
//                         </td>
//                         <td style={{ textAlign: 'center' }}>
//                           {user.discountApplied ? (
//                             <span className="text-emerald-600 font-semibold text-sm">Yes</span>
//                           ) : (
//                             <span className="text-gray-400 text-sm">No</span>
//                           )}
//                         </td>
//                         <td>
//                           <div className="font-bold text-right" style={{ color: '#111318' }}>
//                             ₹{user.amountPaid.toLocaleString()}
//                           </div>
//                         </td>
//                         <td style={{ textAlign: 'center' }}>
//                           <div className="action-buttons">
//                             <button
//                               onClick={() => setUserModalData(user)}
//                               className="details-button"
//                             >
//                               <Eye className="w-4 h-4" />
//                               Details
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
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

//       {/* User Details Modal */}
//       {userModalData && (
//         <Modal onClose={() => setUserModalData(null)} size="md">
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-2">
//               Payment Details: {userModalData.authorName}
//             </h2>
//             <p className="text-gray-600 mb-4">
//               {userModalData.title.substring(0, 70)}...
//             </p>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <div className="text-sm text-gray-500">User ID</div>
//                   <div className="font-mono text-sm">{userModalData.userId}</div>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <div className="text-sm text-gray-500">Unique ID</div>
//                   <div className="font-mono text-sm">{userModalData.uniqueId}</div>
//                 </div>
//               </div>

//               <div className="p-3 border rounded-lg">
//                 <div className="text-sm text-gray-500 mb-2">Paper & Payment Information</div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Paper Status:</span>
//                     {getPaperStatusBadge(userModalData.paperStatus)}
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Status:</span>
//                     {getPaymentBadge(userModalData.paymentStatus)}
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Method:</span>
//                     <span>{userModalData.paymentMethod}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Amount Paid:</span>
//                     <span className="font-bold">₹{userModalData.amountPaid.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Discount Applied:</span>
//                     <span>{userModalData.discountApplied ? "Yes" : "No"}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-3 border rounded-lg">
//                 <div className="text-sm text-gray-500 mb-2">Contact Information</div>
//                 <div className="space-y-1 text-sm">
//                   <div>Email: {userModalData.email}</div>
//                   <div>Mobile: {userModalData.mobile}</div>
//                   <div>Track: {userModalData.track}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Loader2,
  Download,
  X,
  Search,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  UserCheck,
  UserX,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  RefreshCw,
  BarChart3,
  Eye,
  FileText,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ----------------------------- Updated Styles ----------------------------- */
const paymentStyles = `
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
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  .stat-card {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
    border: 1px solid rgba(0, 0, 0, 0.06);
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
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-icon-wrapper::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-color-dark));
    opacity: 0.2;
    filter: blur(8px);
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .chart-container {
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .chart-container:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }

  .chart-header {
    padding: 24px 28px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  }

  .chart-body {
    padding: 28px;
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-size: 0.9375rem;
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
  }

  .btn-sm {
    padding: 8px 16px;
    font-size: 0.875rem;
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
    border-radius: 16px;
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
    padding: 16px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    border-bottom: 2px solid #e2e8f0;
    background: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    text-align: left;
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

  .table-modern th .sortable {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Table cell alignment fixes */
  .table-modern tbody tr {
    border-bottom: 1px solid #f1f5f9;
    position: relative;
  }

  .table-modern tbody tr:last-child {
    border-bottom: none;
  }

  /* Remove hover effects completely */
  .table-modern tbody tr:hover {
    background: inherit;
    transform: none;
    box-shadow: none;
  }

  .table-modern tbody tr:hover::before {
    display: none;
  }

  .table-modern td {
    padding: 16px 12px;
    color: #334155;
    font-size: 0.875rem;
    font-weight: 500;
    border-bottom: 1px solid #f8fafc;
    vertical-align: top;
    text-align: left;
  }

  /* Specific column alignments */
  .table-modern td.text-center {
    text-align: center;
  }

  .table-modern td.text-right {
    text-align: right;
  }

  .table-modern td.text-left {
    text-align: left;
  }

  .table-modern th.text-center {
    text-align: center;
  }

  .table-modern th.text-right {
    text-align: right;
  }

  .table-modern th.text-left {
    text-align: left;
  }

  .table-modern tbody tr:last-child td {
    border-bottom: none;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .action-menu {
    position: relative;
    display: inline-block;
  }

  .action-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 8px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--border-light);
    padding: 8px;
    min-width: 160px;
    z-index: 20;
    animation: slideDown 0.2s ease;
  }

  .action-dropdown button {
    width: 100%;
    justify-content: flex-start;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.875rem;
    border: none;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-dropdown button:hover {
    background: #f8fafc;
  }

  .action-dropdown button.danger {
    color: #ef4444;
  }

  .action-dropdown button.danger:hover {
    background: #fef2f2;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
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
    border-radius: 12px;
    padding: 8px 16px;
    transition: all 0.3s ease;
    min-width: 300px;
  }

  .search-box:focus-within {
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  .search-box input {
    border: none;
    outline: none;
    padding: 8px;
    width: 100%;
    font-size: 0.875rem;
    background: transparent;
  }

  .filter-select {
    padding: 10px 16px;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    font-size: 0.875rem;
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
    padding: 60px 20px;
    text-align: center;
  }

  .empty-state-icon {
    width: 80px;
    height: 80px;
    background: #f8fafc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
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
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: 24px;
    box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
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

  /* Chart specific styles */
  .recharts-wrapper {
    font-family: 'Inter', sans-serif;
  }

  .recharts-legend-wrapper {
    padding-top: 20px !important;
  }

  .recharts-legend-item-text {
    font-size: 14px !important;
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
    font-size: 14px;
    font-weight: 500;
  }

  /* --- NEW: Redesigned Status Indicator Styles --- */
  .status-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: capitalize;
    background-color: #E5E7EB;
    color: #374151;
    cursor: default;
    pointer-events: none;
    width: fit-content;
    margin: 0 auto;
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

  .status-indicator-paid {
    background-color: #D1FAE5;
    color: #065F46;
  }
  
  .status-indicator-unpaid {
    background-color: #FEE2E2;
    color: #991B1B;
  }
  /* --- END: Redesigned Status Indicator Styles --- */

  /* UPDATED: New button colors for View Team and Review buttons */
  .team-button {
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .team-button:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  }

  .review-button {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .review-button:hover {
    background: linear-gradient(135deg, #7C3AED, #6D28D9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  }

  .details-button {
    background: linear-gradient(135deg, #F57C00, #E65100);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }

  .details-button:hover {
    background: linear-gradient(135deg, #E65100, #BF360C);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
  }

  /* Date Filter Styles */
  .filter-dropdown {
    position: relative;
    display: inline-block;
  }

  /* FIXED: Updated Date Filter Styles to prevent hiding */
  .filter-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--border-light);
    padding: 16px;
    min-width: 280px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    animation: slideDown 0.2s ease;
  }

  .filter-menu::-webkit-scrollbar {
    width: 6px;
  }

  .filter-menu::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .filter-menu::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .filter-menu::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  .quick-ranges-section {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .quick-ranges-section::-webkit-scrollbar {
    width: 4px;
  }

  .quick-ranges-section::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 2px;
  }

  .quick-ranges-section::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 2px;
  }

  /* Ensure the filter dropdown stays within viewport */
  .filter-dropdown {
    position: relative;
    display: inline-block;
  }

  @media (max-height: 600px) {
    .filter-menu {
      max-height: 300px;
    }
    
    .quick-ranges-section {
      max-height: 150px;
    }
  }

  .date-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .date-input:focus {
    outline: none;
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  .filter-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
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

  /* NEW: Donut Chart Styles */
  .donut-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .donut-chart-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
  }

  .donut-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .donut-total {
    font-size: 2rem;
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-top: 4px;
  }

  .donut-legend {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 300px;
  }

  .donut-legend-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid;
  }

  .donut-legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .donut-legend-content {
    flex: 1;
  }

  .donut-legend-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-legend-label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-top: 2px;
  }

  .donut-legend-percentage {
    font-size: 1rem;
    font-weight: 600;
    color: #111318;
  }

  /* Custom Donut Chart Tooltip */
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

  /* Improved Table Styles for Modal */
  .modal-content table {
    width: 100%;
    border-collapse: collapse;
  }

  .modal-content thead {
    position: sticky;
    top: 0;
    background: #f9fafb;
    z-index: 10;
  }

  .modal-content th {
    padding: 12px 16px;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 2px solid #e5e7eb;
    white-space: nowrap;
  }

  .modal-content td {
    padding: 12px 16px;
    font-size: 0.875rem;
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
  }

  .modal-content tbody tr:last-child td {
    border-bottom: none;
  }

  /* Ensure the modal content area is scrollable but without visible scrollbars */
  .modal-content > div:last-child {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal-content .overflow-visible {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Custom scrollbar hiding for modal content */
  .modal-content ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .modal-content ::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-content ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }

  .modal-content:hover ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
  }

  .modal-content ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Improved responsive design */
  @media (max-width: 1024px) {
    .modal-content {
      margin: 10px;
      max-height: 95vh;
    }
    
    .modal-content table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
    
    .modal-content thead,
    .modal-content tbody,
    .modal-content th,
    .modal-content td,
    .modal-content tr {
      display: block;
    }
    
    .modal-content thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    
    .modal-content tr {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 8px;
      padding: 8px;
    }
    
    .modal-content td {
      border: none;
      border-bottom: 1px solid #f3f4f6;
      position: relative;
      padding-left: 50%;
      white-space: normal;
    }
    
    .modal-content td:before {
      content: attr(data-label);
      position: absolute;
      left: 12px;
      width: 45%;
      padding-right: 12px;
      white-space: nowrap;
      font-weight: 600;
      color: #374151;
    }
  }
`;

/* ----------------------------- Small Components ----------------------------- */

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
        className={`modal-content w-full ${sizeClasses[size]} mx-4 my-6 max-h-[90vh] flex flex-col`} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-hidden rounded-2xl bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
  <div 
    className="stat-card glass-card rounded-2xl p-6"
    style={{ '--accent-color': color, '--accent-color-dark': colorDark }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6c757d' }}>
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
    <p className="text-xs" style={{ color: '#6c757d' }}>{hint}</p>
  </div>
);

const ChartCard = ({ title, subtitle, children, controls }) => (
  <div className="chart-container">
    <div className="chart-header">
      <div className="chart-header-actions">
        <div className="chart-title-section">
          <h3 className="text-lg font-bold mb-1" style={{ color: '#111318' }}>{title}</h3>
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
    <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
      <div className="text-sm" style={{ color: '#6c757d' }}>
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxshadow: '0 8px 24px rgba(0,0,0,0.12)'
    }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ fontSize: '0.875rem', fontWeight: 600, color: entry.color, margin: '4px 0' }}>
          {entry.name}: {entry.value}
        </p>
      ))}
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
      <div className="sortable">
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

// Donut Chart Component
const DonutChart = ({ data, title, subtitle }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const COLORS = {
    approved: '#10B981',
    rejected: '#EF4444',
    pending: '#F59E0B'
  };

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
                innerRadius={70}
                outerRadius={90}
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

/* ----------------------------- Main Component ----------------------------- */

const PaymentPage = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    totalApproved: 0,
    paidUsers: 0,
    pendingUsers: 0,
    unpaidUsers: 0,
  });
  const [trend, setTrend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [userModalData, setUserModalData] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  /**
   * Computes statistics for the dashboard cards.
   */
  const computeStats = useCallback((data) => {
    console.log("Computing stats for:", data.length, "approved users");
    
    let totalRevenue = 0;
    let pendingAmount = 0;
    let paidUsers = 0;
    let pendingUsers = 0;
    let unpaidUsers = 0;

    data.forEach(user => {
      const paymentStatus = user.paymentStatus || "unpaid";
      const amountPaid = user.amountPaid || 0;

      console.log(`User: ${user.authorName}, Status: ${paymentStatus}, Amount: ${amountPaid}`);

      if (paymentStatus === "paid") {
        totalRevenue += amountPaid;
        paidUsers++;
      } else if (paymentStatus === "pending") {
        pendingAmount += amountPaid;
        pendingUsers++;
      } else {
        unpaidUsers++;
      }
    });

    const newStats = {
      totalRevenue,
      pendingAmount,
      totalApproved: data.length,
      paidUsers,
      pendingUsers,
      unpaidUsers,
    };

    console.log("Computed stats:", newStats);
    setStats(newStats);
  }, []);

  /**
   * Computes the revenue trend based on creation date.
   */
  const computeTrend = useCallback((data) => {
    const groups = {};
    data.forEach((user) => {
      const date = new Date(user.createdAt).toISOString().split("T")[0];
      if (!groups[date]) {
        groups[date] = { date, revenue: 0, pending: 0 };
      }
      
      const paymentStatus = user.paymentStatus || "unpaid";
      const amountPaid = user.amountPaid || 0;

      if (paymentStatus === "paid") {
        groups[date].revenue += amountPaid;
      } else if (paymentStatus === "pending") {
        groups[date].pending += amountPaid;
      }
    });

    const arr = Object.values(groups).sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrend(arr);
  }, []);

  // Format each user with proper payment data extraction
  const formatUser = (item) => {
    // Extract payment data from multiple possible locations
    const workflowPayment = item.workflow || {};
    const registrationPayment = item.registration?.payment || {};
    const directPayment = item.payment || {};
    
    // Use payment data from workflow first, then registration, then direct
    const paymentData = workflowPayment.amountPaid ? workflowPayment : 
                       registrationPayment.amountPaid ? registrationPayment : 
                       directPayment;

    const paymentStatus = (
      paymentData.paymentStatus || 
      workflowPayment.paymentStatus ||
      registrationPayment.paymentStatus ||
      "unpaid"
    ).toLowerCase();

    const amountPaid = Number(
      paymentData.amountPaid || 
      workflowPayment.amountPaid ||
      registrationPayment.amountPaid || 
      0
    );

    const paymentMethod = (
      paymentData.paymentMethod || 
      workflowPayment.paymentMethod ||
      registrationPayment.paymentMethod ||
      "-"
    );

    // Check for discount from multiple sources
    const discountApplied = 
      paymentData.discountApplied ||
      workflowPayment.discountApplied ||
      registrationPayment.discountApplied ||
      item.registration?.discount ||
      workflowPayment.discount ||
      false;

    return {
      id: item._id,
      userId: item.userId || "N/A",
      uniqueId: item.registration?.uniqueId || "N/A",
      authorName: item.name || "Unknown",
      email: item.registration?.participants?.[0]?.email || "-",
      mobile: item.registration?.participants?.[0]?.phone || "-",
      track: item.registration?.track || "-",
      title: item.registration?.abstractTitle || "No Title",
      paymentStatus,
      paymentMethod,
      amountPaid,
      discountApplied: Boolean(discountApplied),
      paperStatus: (
        workflowPayment.finalPaperStatus ||
        workflowPayment.paperStatus ||
        item.registration?.paperStatus ||
        "no paper"
      ).toLowerCase(),
      createdAt: item.workflow?.createdAt || item.createdAt || new Date().toISOString(),
    };
  };

  // Check if user has approved paper status
  const hasApprovedPaper = (user) => {
    const paperStatus = user.paperStatus || "no paper";
    return paperStatus === "approved";
  };

  // Fetch all users and filter only those with approved papers
  const fetchApprovedUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Raw API data:", data);

      const formatted = Array.isArray(data) ? data.map(formatUser) : [];
      
      // Filter only users with approved paper status
      const approvedPaperUsers = formatted.filter(hasApprovedPaper);
      
      console.log("All users:", formatted.length);
      console.log("Approved paper users:", approvedPaperUsers.length);
      console.log("Approved users details:", approvedPaperUsers);

      setApprovedUsers(approvedPaperUsers);
      computeStats(approvedPaperUsers);
      computeTrend(approvedPaperUsers);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching payment data:", err);
      setApprovedUsers([]);
      setStats({
        totalRevenue: 0,
        pendingAmount: 0,
        totalApproved: 0,
        paidUsers: 0,
        pendingUsers: 0,
        unpaidUsers: 0,
      });
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend]);

  useEffect(() => {
    fetchApprovedUsers();
  }, [fetchApprovedUsers]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Search & Filter (Memoized)
  const filteredAndSearchedUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = paymentFilter.toLowerCase() === "all";

    let filtered = approvedUsers.filter((user) => {
      const matchesSearch =
        user.authorName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.uniqueId.toLowerCase().includes(q) ||
        user.userId.toLowerCase().includes(q) ||
        user.track.toLowerCase().includes(q);

      const matchesFilter =
        isAllStatus || user.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'createdAt' || sortConfig.key === 'amountPaid') {
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
  }, [approvedUsers, searchTerm, paymentFilter, sortConfig]);

  // Pagination logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSearchedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Payment Status Badge Styling
  const getPaymentBadge = (status) => {
    const statusMap = {
      paid: { class: "status-indicator-paid", label: "Paid" },
      unpaid: { class: "status-indicator-unpaid", label: "Unpaid" },
      pending: { class: "status-indicator-pending", label: "Pending" },
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
    return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  // Paper Status Badge Styling
  const getPaperStatusBadge = (status) => {
    const statusMap = {
      approved: { class: "status-indicator-approved", label: "Approved" },
      rejected: { class: "status-indicator-rejected", label: "Rejected" },
      pending: { class: "status-indicator-pending", label: "Pending" },
      "no paper": { class: "", label: "No Paper" },
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
    return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    if (!filteredAndSearchedUsers.length) return alert("No data to export!");

    const exportData = filteredAndSearchedUsers.map((user) => ({
      "Unique ID": user.uniqueId,
      "User ID": user.userId,
      "Author Name": user.authorName,
      Email: user.email,
      "Mobile": user.mobile,
      Track: user.track,
      Title: user.title,
      "Paper Status": user.paperStatus,
      "Payment Status": user.paymentStatus,
      "Payment Method": user.paymentMethod,
      "Amount Paid": user.amountPaid,
      "Discount Applied": user.discountApplied ? "Yes" : "No",
      "Registration Date": new Date(user.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, `approved_papers_payments_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Chart data for donut chart
  const paymentDonutData = [
    { name: "Paid", value: stats.paidUsers, color: "#10B981" },
    { name: "Unpaid", value: stats.unpaidUsers, color: "#EF4444" },
    { name: "Pending", value: stats.pendingUsers, color: "#F59E0B" },
  ].filter(item => item.value > 0);

  return (
    <>
      <style>{paymentStyles}</style>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
                Payment & Financial Overview
              </h1>
              <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
                <BarChart3 className="w-4 w-4" />
                Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
              </p>
            </div>
            <button
              onClick={fetchApprovedUsers}
              className="btn btn-secondary"
              disabled={loading}
              style={{ flexShrink: 0 }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh Data
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<DollarSign className="w-6 h-6" />}
              title="Total Revenue (Paid)" 
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              hint="Confirmed payments from approved papers"
              color="#10B981"
              colorDark="#059669"
            />
            <StatCard 
              icon={<FileCheck className="w-6 h-6" />}
              title="Approved Papers" 
              value={stats.totalApproved.toLocaleString()}
              hint="Papers with approved status"
              color="#1976D2"
              colorDark="#0D47A1"
            />
            <StatCard 
              icon={<UserCheck className="w-6 h-6" />}
              title="Paid Users" 
              value={stats.paidUsers.toLocaleString()}
              hint="Completed payments"
              color="#10B981"
              colorDark="#059669"
            />
            <StatCard 
              icon={<UserX className="w-6 h-6" />}
              title="Unpaid Users" 
              value={stats.unpaidUsers.toLocaleString()}
              hint="Payment required"
              color="#EF4444"
              colorDark="#DC2626"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Status Donut Chart */}
            <DonutChart 
              title="Payment Status Distribution"
              subtitle="Breakdown of payment status for approved papers"
              data={paymentDonutData}
            />

            {/* Revenue Trend Chart */}
            <ChartCard 
              title="Revenue Trends"
              subtitle="Daily revenue and pending amount trends"
            >
              {trend.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#6c757d', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tickFormatter={(v) => `₹${v.toLocaleString()}`}
                      tick={{ fill: '#6c757d', fontSize: 12 }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Paid Revenue"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, stroke: '#10B981', fill: 'white' }}
                      activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      name="Pending Amount"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, stroke: '#F59E0B', fill: 'white' }}
                      activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p style={{ color: '#6c757d' }}>No revenue data available</p>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Enhanced Table Section */}
          <div className="table-container">
            {/* Table Header */}
            <div className="table-toolbar">
              <div className="table-info">
                <h3 className="text-lg font-bold" style={{ color: '#111318' }}>
                  Approved Papers Payment Records
                </h3>
                <span style={{ color: '#6c757d' }}>
                  {filteredAndSearchedUsers.length} records found
                </span>
              </div>
              <div className="table-actions">
                <div className="search-box">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, email, or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Payment Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="pending">Pending</option>
                </select>
                <button
                  onClick={handleExportExcel}
                  className="btn btn-success btn-sm"
                  disabled={filteredAndSearchedUsers.length === 0}
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
                <span className="mt-3" style={{ color: '#6c757d' }}>Loading payment data...</span>
              </div>
            ) : filteredAndSearchedUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h4 style={{ color: '#111318', marginBottom: '8px' }}>
                  {approvedUsers.length === 0 ? 'No approved papers found' : 'No matching records'}
                </h4>
                <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                  {approvedUsers.length === 0 
                    ? 'There are no approved paper submissions yet.' 
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
                {approvedUsers.length === 0 && (
                  <button 
                    onClick={fetchApprovedUsers}
                    className="btn btn-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </button>
                )}
              </div>
            ) : (
              <>
                <table className="table-modern">
                  <thead>
                    <tr>
                      <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
                        Author
                      </SortableHeader>
                      <th className="text-left">Email</th>
                      <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
                        Title
                      </SortableHeader>
                      <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
                        Track
                      </SortableHeader>
                      <th className="text-center">Paper Status</th>
                      <th className="text-center">Payment Status</th>
                      <th className="text-center">Payment Method</th>
                      <th className="text-center">Discount</th>
                      <SortableHeader field="amountPaid" sortConfig={sortConfig} onSort={handleSort}>
                        Amount Paid
                      </SortableHeader>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="text-left">
                          <div>
                            <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
                              {user.authorName}
                            </div>
                            <div className="text-xs" style={{ color: '#6c757d' }}>
                              {user.userId}
                            </div>
                          </div>
                        </td>
                        <td className="text-left">
                          <div className="text-sm" style={{ color: '#475569' }}>
                            {user.email}
                          </div>
                        </td>
                        <td className="text-left">
                          <div 
                            className="font-medium"
                            title={user.title}
                            style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
                          >
                            {user.title}
                          </div>
                        </td>
                        <td className="text-left">
                          <span style={{ color: '#475569', fontSize: '0.875rem' }}>
                            {user.track}
                          </span>
                        </td>
                        <td className="text-center">
                          {getPaperStatusBadge(user.paperStatus)}
                        </td>
                        <td className="text-center">
                          {getPaymentBadge(user.paymentStatus)}
                        </td>
                        <td className="text-center">
                          <span style={{ color: '#475569', fontSize: '0.875rem' }}>
                            {user.paymentMethod}
                          </span>
                        </td>
                        <td className="text-center">
                          {user.discountApplied ? (
                            <span className="text-emerald-600 font-semibold text-sm">Yes</span>
                          ) : (
                            <span className="text-gray-400 text-sm">No</span>
                          )}
                        </td>
                        <td className="text-right">
                          <div className="font-bold" style={{ color: '#111318' }}>
                            ₹{user.amountPaid.toLocaleString()}
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons">
                            <button
                              onClick={() => setUserModalData(user)}
                              className="details-button"
                            >
                              <Eye className="w-4 h-4" />
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
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

      {/* User Details Modal */}
      {userModalData && (
        <Modal onClose={() => setUserModalData(null)} size="md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">
              Payment Details: {userModalData.authorName}
            </h2>
            <p className="text-gray-600 mb-4">
              {userModalData.title.substring(0, 70)}...
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">User ID</div>
                  <div className="font-mono text-sm">{userModalData.userId}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Unique ID</div>
                  <div className="font-mono text-sm">{userModalData.uniqueId}</div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Paper & Payment Information</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Paper Status:</span>
                    {getPaperStatusBadge(userModalData.paperStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    {getPaymentBadge(userModalData.paymentStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{userModalData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-bold">₹{userModalData.amountPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount Applied:</span>
                    <span>{userModalData.discountApplied ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Contact Information</div>
                <div className="space-y-1 text-sm">
                  <div>Email: {userModalData.email}</div>
                  <div>Mobile: {userModalData.mobile}</div>
                  <div>Track: {userModalData.track}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PaymentPage;