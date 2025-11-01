
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
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
// } from "lucide-react";

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   totalRevenue: (
//     <DollarSign className="w-6 h-6 text-emerald-600" />
//   ),
//   pendingAmount: (
//     <Clock className="w-6 h-6 text-orange-500" />
//   ),
//   totalApproved: (
//     <FileCheck className="w-6 h-6 text-indigo-600" />
//   ),
//   paidUsers: (
//     <UserCheck className="w-6 h-6 text-green-500" />
//   ),
//   unpaidUsers: (
//     <UserX className="w-6 h-6 text-red-500" />
//   ),
// };

// // Reusable Modal Component
// const Modal = ({ children, onClose, size = "md" }) => {
//   const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}>
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl">
//           <X className="w-6 h-6" />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// // Stat Card
// const StatCard = ({ icon, title, value, hint }) => (
//   <div className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition">
//     <div className="flex items-start justify-between">
//       <div>
//         <div className="text-sm text-gray-500 font-medium">{title}</div>
//         <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
//         {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
//       </div>
//       <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
//     </div>
//   </div>
// );

// // Payment Status Snapshot Chart Component
// const PaymentStatusChart = ({ stats }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Payment Status Distribution</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart
//         data={[
//           {
//             name: "Payments",
//             paid: stats.paidUsers,
//             pending: stats.pendingUsers,
//             unpaid: stats.unpaidUsers,
//           },
//         ]}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="paid" name="Paid Users" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending Payments" fill="#F59E0B" />
//         <Bar dataKey="unpaid" name="Unpaid Users" fill="#EF4444" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// // Revenue Trend Chart Component
// const RevenueTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Revenue Trends</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis tickFormatter={(v) => `₹${v.toLocaleString()}`} />
//         <Tooltip 
//           formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
//           labelFormatter={(label) => `Date: ${label}`}
//         />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="revenue"
//           name="Paid Revenue"
//           stroke="#10B981"
//           strokeWidth={2}
//           dot={{ r: 4 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="pending"
//           name="Pending Amount"
//           stroke="#F59E0B"
//           strokeWidth={2}
//           dot={{ r: 4 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

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
//   const [teamModalData, setTeamModalData] = useState(null);

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

//     const teamMembers = item.registration?.participants?.length
//       ? item.registration.participants.slice(1).map((p) => ({
//           name: p.name || "Unknown",
//           email: p.email || "-",
//           phone: p.phone || "-",
//           organisation: p.organisation || "-",
//           proofUrl: p.proofUrl || null,
//         }))
//       : [];

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
//       team: teamMembers,
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

//   // Search & Filter (Memoized)
//   const filteredAndSearchedUsers = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = paymentFilter.toLowerCase() === "all";

//     return approvedUsers.filter((user) => {
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
//   }, [approvedUsers, searchTerm, paymentFilter]);

//   // Payment Badge Styling
//   const getPaymentBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//         return "bg-green-100 text-green-700";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "unpaid":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Paper Status Badge Styling
//   const getPaperStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "correction required":
//         return "bg-yellow-100 text-yellow-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "no paper":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
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

//   // Handle View Proof (for team members)
//   const handleViewProof = (proofUrl) => {
//     if (!proofUrl) return alert("No proof available.");
//     if (proofUrl.startsWith("http")) window.open(proofUrl, "_blank");
//     else alert("Invalid proof URL: " + proofUrl);
//   };

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Payment & Financial Overview</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           icon={icons.totalRevenue} 
//           title="Total Revenue (Paid)" 
//           value={`₹${stats.totalRevenue.toLocaleString()}`}
//           hint="Confirmed payments from approved papers"
//         />
//         {/* <StatCard 
//           icon={icons.pendingAmount} 
//           title="Pending Amount" 
//           value={`₹${stats.pendingAmount.toLocaleString()}`}
//           hint="Awaiting confirmation from approved papers"
//         /> */}
//         <StatCard 
//           icon={icons.totalApproved} 
//           title="Approved Papers" 
//           value={stats.totalApproved}
//           hint="Papers with approved status"
//         />
//         <StatCard 
//           icon={icons.paidUsers} 
//           title="Paid Users" 
//           value={stats.paidUsers}
//           hint="Completed payments"
//         />
//         {/* <StatCard 
//           icon={icons.pendingAmount} 
//           title="Pending Payments" 
//           value={stats.pendingUsers}
//           hint="Payment in process"
//         /> */}
//         <StatCard 
//           icon={icons.unpaidUsers} 
//           title="Unpaid Users" 
//           value={stats.unpaidUsers}
//           hint="Payment required"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <PaymentStatusChart stats={stats} />
//         <RevenueTrendChart data={trend} />
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl shadow border overflow-hidden">
//         {/* Toolbar (Search & Filter) */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <div className="flex items-center border rounded-lg overflow-hidden bg-white w-full md:w-72">
//               <Search className="w-5 h-5 ml-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by ID, name, email, or title..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="px-3 py-2 outline-none text-sm w-full"
//               />
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
//               >
//                 Clear
//               </button>
//             </div>

//             <select
//               value={paymentFilter}
//               onChange={(e) => setPaymentFilter(e.target.value)}
//               className="border rounded-lg p-2 text-sm w-full md:w-auto"
//             >
//               <option value="All">All Payment Statuses</option>
//               <option value="paid">Paid</option>
//               {/* <option value="pending">Pending</option> */}
//               <option value="unpaid">Unpaid</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchApprovedUsers}
//               className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full md:w-auto"
//               disabled={loading}
//             >
//               {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh Data'}
//             </button>
//             <button
//               onClick={handleExportExcel}
//               className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 w-full md:w-auto"
//             >
//               <Download className="w-4 h-4" /> Export Excel
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="flex items-center justify-center p-10">
//             <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
//           </div>
//         ) : filteredAndSearchedUsers.length === 0 ? (
//           <div className="p-8 text-center text-gray-600">
//             No users with approved papers match the current filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
//                 <tr>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Author Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Track</th>
//                   <th className="p-3 text-center">Paper Status</th>
//                   <th className="p-3 text-center">Payment Status</th>
//                   <th className="p-3 text-center">Payment Method</th>
//                   <th className="p-3 text-center">Discount</th>
//                   <th className="p-3 text-right">Amount Paid</th>
//                   {/* <th className="p-3 text-center">Team</th> */}
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {user.userId}
//                     </td>
//                     <td className="p-3 font-medium">{user.authorName}</td>
//                     <td className="p-3 text-gray-600">{user.email}</td>
//                     <td className="p-3 text-gray-600">{user.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(
//                           user.paperStatus
//                         )}`}
//                       >
//                         {user.paperStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(
//                           user.paymentStatus
//                         )}`}
//                       >
//                         {user.paymentStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center text-gray-600">
//                       {user.paymentMethod}
//                     </td>
//                     <td className="p-3 text-center">
//                       {user.discountApplied ? (
//                         <span className="text-emerald-600 font-semibold">Yes</span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-right font-bold text-gray-800">
//                       ₹{user.amountPaid.toLocaleString()}
//                     </td>
//                     {/* <td className="p-3 text-center">
//                       {Array.isArray(user.team) && user.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(user)}
//                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
//                         >
//                           <Users className="w-4 h-4" /> View
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td> */}
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setUserModalData(user)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* User Details Modal */}
//       {userModalData && (
//         <Modal onClose={() => setUserModalData(null)} size="md">
//           <h2 className="text-xl font-bold mb-2">
//             Payment Details: {userModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             {userModalData.title.substring(0, 70)}...
//           </p>

//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="text-sm text-gray-500">User ID</div>
//                 <div className="font-mono text-sm">{userModalData.userId}</div>
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="text-sm text-gray-500">Unique ID</div>
//                 <div className="font-mono text-sm">{userModalData.uniqueId}</div>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <div className="text-sm text-gray-500 mb-2">Paper & Payment Information</div>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Paper Status:</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(userModalData.paperStatus)}`}>
//                     {userModalData.paperStatus.toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Payment Status:</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(userModalData.paymentStatus)}`}>
//                     {userModalData.paymentStatus.toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Payment Method:</span>
//                   <span>{userModalData.paymentMethod}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Amount Paid:</span>
//                   <span className="font-bold">₹{userModalData.amountPaid.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Discount Applied:</span>
//                   <span>{userModalData.discountApplied ? "Yes" : "No"}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <div className="text-sm text-gray-500 mb-2">Contact Information</div>
//               <div className="space-y-1 text-sm">
//                 <div>Email: {userModalData.email}</div>
//                 <div>Mobile: {userModalData.mobile}</div>
//                 <div>Track: {userModalData.track}</div>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Team Modal */}
//       {teamModalData && (
//         <Modal onClose={() => setTeamModalData(null)} size="lg">
//           <h3 className="text-xl font-bold mb-4">
//             Team Members for "{teamModalData.title}"
//           </h3>
//           {Array.isArray(teamModalData.team) && teamModalData.team.length ? (
//             <div className="overflow-x-auto max-h-[70vh]">
//               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                 <thead className="bg-gray-100 sticky top-0">
//                   <tr>
//                     <th className="p-2 text-left">Name</th>
//                     <th className="p-2 text-left">Email</th>
//                     <th className="p-2 text-left">Phone</th>
//                     <th className="p-2 text-left">Organisation</th>
//                     <th className="p-2 text-left">Proof</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {teamModalData.team.map((member, i) => (
//                     <tr key={i}>
//                       <td className="p-2">{member.name || "Unnamed"}</td>
//                       <td className="p-2">{member.email || "-"}</td>
//                       <td className="p-2">{member.phone || "-"}</td>
//                       <td className="p-2">{member.organisation || "-"}</td>
//                       <td className="p-2">
//                         {member.proofUrl ? (
//                           <button
//                             onClick={() => handleViewProof(member.proofUrl)}
//                             className="text-blue-500 hover:underline text-xs"
//                           >
//                             View Proof
//                           </button>
//                         ) : (
//                           "-"
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No team members available.</p>
//           )}
//         </Modal>
//       )}
//     </div>
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
} from "lucide-react";

/* ----------------------------- Small Components & Utils ----------------------------- */

// Icon map
const icons = {
  totalRevenue: (
    <DollarSign className="w-6 h-6 text-emerald-600" />
  ),
  pendingAmount: (
    <Clock className="w-6 h-6 text-orange-500" />
  ),
  totalApproved: (
    <FileCheck className="w-6 h-6 text-indigo-600" />
  ),
  paidUsers: (
    <UserCheck className="w-6 h-6 text-green-500" />
  ),
  unpaidUsers: (
    <UserX className="w-6 h-6 text-red-500" />
  ),
};

// Reusable Modal Component
const Modal = ({ children, onClose, size = "md" }) => {
  const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl">
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Stat Card
const StatCard = ({ icon, title, value, hint }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm text-gray-500 font-medium">{title}</div>
        <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
        {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
      </div>
      <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
    </div>
  </div>
);

// Payment Status Snapshot Chart Component
const PaymentStatusChart = ({ stats }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Payment Status Distribution</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={[
          {
            name: "Payments",
            paid: stats.paidUsers,
            pending: stats.pendingUsers,
            unpaid: stats.unpaidUsers,
          },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="paid" name="Paid Users" fill="#10B981" />
        <Bar dataKey="pending" name="Pending Payments" fill="#F59E0B" />
        <Bar dataKey="unpaid" name="Unpaid Users" fill="#EF4444" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Revenue Trend Chart Component
const RevenueTrendChart = ({ data }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Revenue Trends</h3>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(v) => `₹${v.toLocaleString()}`} />
        <Tooltip 
          formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Paid Revenue"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="pending"
          name="Pending Amount"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
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
      <div className="text-sm text-gray-700">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
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
  const [teamModalData, setTeamModalData] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

    const teamMembers = item.registration?.participants?.length
      ? item.registration.participants.slice(1).map((p) => ({
          name: p.name || "Unknown",
          email: p.email || "-",
          phone: p.phone || "-",
          organisation: p.organisation || "-",
          proofUrl: p.proofUrl || null,
        }))
      : [];

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
      team: teamMembers,
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

  // Search & Filter (Memoized)
  const filteredAndSearchedUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = paymentFilter.toLowerCase() === "all";

    return approvedUsers.filter((user) => {
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
  }, [approvedUsers, searchTerm, paymentFilter]);

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

  // Payment Badge Styling
  const getPaymentBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "unpaid":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Paper Status Badge Styling
  const getPaperStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "correction required":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "no paper":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

  // Handle View Proof (for team members)
  const handleViewProof = (proofUrl) => {
    if (!proofUrl) return alert("No proof available.");
    if (proofUrl.startsWith("http")) window.open(proofUrl, "_blank");
    else alert("Invalid proof URL: " + proofUrl);
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Payment & Financial Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage payment statuses, revenue tracking, and financial reports for users with approved papers only.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={icons.totalRevenue} 
          title="Total Revenue (Paid)" 
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          hint="Confirmed payments from approved papers"
        />
        {/* <StatCard 
          icon={icons.pendingAmount} 
          title="Pending Amount" 
          value={`₹${stats.pendingAmount.toLocaleString()}`}
          hint="Awaiting confirmation from approved papers"
        /> */}
        <StatCard 
          icon={icons.totalApproved} 
          title="Approved Papers" 
          value={stats.totalApproved}
          hint="Papers with approved status"
        />
        <StatCard 
          icon={icons.paidUsers} 
          title="Paid Users" 
          value={stats.paidUsers}
          hint="Completed payments"
        />
        {/* <StatCard 
          icon={icons.pendingAmount} 
          title="Pending Payments" 
          value={stats.pendingUsers}
          hint="Payment in process"
        /> */}
        <StatCard 
          icon={icons.unpaidUsers} 
          title="Unpaid Users" 
          value={stats.unpaidUsers}
          hint="Payment required"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentStatusChart stats={stats} />
        <RevenueTrendChart data={trend} />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        {/* Toolbar (Search & Filter) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center border rounded-lg overflow-hidden bg-white w-full md:w-72">
              <Search className="w-5 h-5 ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, email, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 outline-none text-sm w-full"
              />
              <button
                onClick={() => setSearchTerm("")}
                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border rounded-lg p-2 text-sm w-full md:w-auto"
            >
              <option value="All">All Payment Statuses</option>
              <option value="paid">Paid</option>
              {/* <option value="pending">Pending</option> */}
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={fetchApprovedUsers}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full md:w-auto"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh Data'}
            </button>
            <button
              onClick={handleExportExcel}
              className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 w-full md:w-auto"
            >
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : filteredAndSearchedUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No users with approved papers match the current filters.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="p-3">User ID</th>
                    <th className="p-3">Author Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Track</th>
                    <th className="p-3 text-center">Paper Status</th>
                    <th className="p-3 text-center">Payment Status</th>
                    <th className="p-3 text-center">Payment Method</th>
                    <th className="p-3 text-center">Discount</th>
                    <th className="p-3 text-right">Amount Paid</th>
                    {/* <th className="p-3 text-center">Team</th> */}
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs text-gray-600">
                        {user.userId}
                      </td>
                      <td className="p-3 font-medium">{user.authorName}</td>
                      <td className="p-3 text-gray-600">{user.email}</td>
                      <td className="p-3 text-gray-600">{user.track}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(
                            user.paperStatus
                          )}`}
                        >
                          {user.paperStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(
                            user.paymentStatus
                          )}`}
                        >
                          {user.paymentStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-center text-gray-600">
                        {user.paymentMethod}
                      </td>
                      <td className="p-3 text-center">
                        {user.discountApplied ? (
                          <span className="text-emerald-600 font-semibold">Yes</span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-bold text-gray-800">
                        ₹{user.amountPaid.toLocaleString()}
                      </td>
                      {/* <td className="p-3 text-center">
                        {Array.isArray(user.team) && user.team.length ? (
                          <button
                            onClick={() => setTeamModalData(user)}
                            className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
                          >
                            <Users className="w-4 h-4" /> View
                          </button>
                        ) : (
                          "-"
                        )}
                      </td> */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setUserModalData(user)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                        >
                          Details
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

      {/* User Details Modal */}
      {userModalData && (
        <Modal onClose={() => setUserModalData(null)} size="md">
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
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaperStatusBadgeClass(userModalData.paperStatus)}`}>
                    {userModalData.paperStatus.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeClass(userModalData.paymentStatus)}`}>
                    {userModalData.paymentStatus.toUpperCase()}
                  </span>
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
        </Modal>
      )}

      {/* Team Modal */}
      {teamModalData && (
        <Modal onClose={() => setTeamModalData(null)} size="lg">
          <h3 className="text-xl font-bold mb-4">
            Team Members for "{teamModalData.title}"
          </h3>
          {Array.isArray(teamModalData.team) && teamModalData.team.length ? (
            <div className="overflow-x-auto max-h-[70vh]">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Organisation</th>
                    <th className="p-2 text-left">Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamModalData.team.map((member, i) => (
                    <tr key={i}>
                      <td className="p-2">{member.name || "Unnamed"}</td>
                      <td className="p-2">{member.email || "-"}</td>
                      <td className="p-2">{member.phone || "-"}</td>
                      <td className="p-2">{member.organisation || "-"}</td>
                      <td className="p-2">
                        {member.proofUrl ? (
                          <button
                            onClick={() => handleViewProof(member.proofUrl)}
                            className="text-blue-500 hover:underline text-xs"
                          >
                            View Proof
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No team members available.</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PaymentPage;