
// // // import React, { useState, useCallback, useEffect } from "react";
// // // import axios from "axios";

// // // // Components
// // // import UnifiedAbstractDashboard from "../../components/AbstractsTable";
// // // import StatCard from "../../components/StatCard";
// // // import RevenueChart from "../../components/RevenueChart";
// // // import AbstractStatusPie from "../../components/AbstractStatusPie";
// // // import AbstractTrendChart from "../../components/AbstractTrendChart";

// // // // --- Icons for StatCards ---
// // // const icons = {
// // //   total: (
// // //     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
// // //     </svg>
// // //   ),
// // //   approved: (
// // //     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// // //     </svg>
// // //   ),
// // //   rejected: (
// // //     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// // //     </svg>
// // //   ),
// // //   pending: (
// // //     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
// // //     </svg>
// // //   ),
// // // };

// // // const AbstractSupport = () => {
// // //   const [abstracts, setAbstracts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [trend, setTrend] = useState([]);
// // //   const [stats, setStats] = useState({ total: 0, approved: 0, rejected: 0, pending: 0 });

// // //   // --- Fetch abstracts from API ---
// // //   const fetchAbstracts = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const { data } = await axios.get(
// // //         "https://it-con-backend.onrender.com/api/admin/users",
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       const formattedData = data.map((item) => {
// // //         const teamMembers = item.registration?.participants?.length
// // //           ? item.registration.participants.map((p) => ({
// // //               name: p.name || "Unknown",
// // //               email: p.email || "-",
// // //               phone: p.phone || "-",
// // //               designation: p.designation || "-",
// // //               organisation: p.organisation || "-",
// // //               gender: p.gender || "-",
// // //               proofUrl: p.proofUrl || null,
// // //             }))
// // //           : [];

// // //         return {
// // //           id: item._id || Math.random().toString(),
// // //           userId: item.userId || "N/A",
// // //           authorName: item.name || "Unknown",
// // //           email: item.registration?.participants?.[0]?.email || "-",
// // //           mobile: item.registration?.participants?.[0]?.phone || "-",

// // //           registrationId: item.registration?._id || null,
// // //           uniqueId: item.registration?.uniqueId || "-",
// // //           track: item.registration?.track || "-",
// // //           presentationMode: item.registration?.presentationMode || "-",
// // //           title: item.registration?.abstractTitle || "No Title",
// // //           content: item.registration?.abstractContent || null,
// // //           team: teamMembers,
// // //           country: item.registration?.country || "-",
// // //           proofUrl: item.registration?.proofUrl || null,
// // //           paperUrl: item.registration?.paperUrl || null,

// // //           status: item.workflow?.abstractStatus || "Pending",
// // //           abstractApprovedBy: item.workflow?.abstractApprovedBy || "-",
// // //           rejectedReason: item.workflow?.rejectedReason || null,
// // //           abstractreasonBy: item.workflow?.abstractreasonBy || "-",

// // //           finalPaperStatus: item.workflow?.paperStatus || "-",
// // //           paperApprovedBy: item.workflow?.paperApprovedBy || "-",

// // //           paymentStatus: item.workflow?.paymentStatus || "unpaid",
// // //           paymentApprovedBy: item.workflow?.paymentApprovedBy || "-",
// // //           paymentMethod: item.workflow?.paymentMethod || "-",
// // //           amountPaid: item.workflow?.amountPaid || 0,
// // //           discount: item.workflow?.discount || 0,
// // //           paymentDate: item.workflow?.paymentDate || null,
// // //           transactionId: item.workflow?.transactionId || "-",

// // //           createdAt: item.workflow?.createdAt || new Date().toISOString(),
// // //           updatedAt: item.workflow?.updatedAt || new Date().toISOString(),
// // //         };
// // //       });

// // //       // ✅ Only keep abstracts with actual content
// // //       const filteredData = formattedData.filter(
// // //         (item) =>
// // //           item.content &&
// // //           item.content.trim() !== "" &&
// // //           item.content !== "No Content"
// // //       );

// // //       console.log("Filtered abstracts with content:", filteredData);
// // //       setAbstracts(filteredData);

// // //       updateTrend(filteredData);
// // //       updateStats(filteredData);
// // //     } catch (err) {
// // //       console.error("Error fetching abstracts:", err);
// // //       setAbstracts([]);
// // //       setTrend([]);
// // //       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchAbstracts();
// // //   }, [fetchAbstracts]);

// // //   // --- Update stats from data ---
// // //   const updateStats = (data) => {
// // //     const total = data.length;
// // //     const approved = data.filter((a) => a.status.toLowerCase() === "approved").length;
// // //     const rejected = data.filter((a) => a.status.toLowerCase() === "rejected").length;
// // //     const pending = data.filter(
// // //       (a) =>
// // //         a.status.toLowerCase() === "submitted" ||
// // //         a.status.toLowerCase() === "under review"
// // //     ).length;

// // //     setStats({ total, approved, rejected, pending });
// // //   };

// // //   // --- Update trend data ---
// // //   const updateTrend = (data) => {
// // //     const trendMap = {};
// // //     data.forEach((item) => {
// // //       const date = new Date(item.createdAt).toISOString().split("T")[0];
// // //       trendMap[date] = (trendMap[date] || 0) + 1;
// // //     });
// // //     const trendData = Object.keys(trendMap).map((date) => ({
// // //       date,
// // //       count: trendMap[date],
// // //     }));
// // //     setTrend(trendData);
// // //   };

// // //   // --- Callback to update abstract status ---
// // //   const updateAbstractLocal = async (userId, newStatus) => {
// // //     try {
// // //       await axios.put(
// // //         `https://it-con-backend.onrender.com/api/admin/users/abstract/${userId}`,
// // //         { status: newStatus },
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
// // //       );

// // //       fetchAbstracts();
// // //     } catch (err) {
// // //       console.error("Error updating abstract status:", err);
// // //     }
// // //   };

// // //   const chartData = [
// // //     { name: "Abstracts", approved: stats.approved, rejected: stats.rejected },
// // //   ];

// // //   return (
// // //     <div className="space-y-6 p-4">
// // //       {/* StatCards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} change="+5%" isPositive />
// // //         <StatCard icon={icons.approved} title="Approved" value={stats.approved} change="+3%" isPositive />
// // //         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} change="-1%" isPositive={false} />
// // //         <StatCard icon={icons.pending} title="Pending" value={stats.pending} change="+2%" isPositive />
// // //       </div>

// // //       {/* Charts Row */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <RevenueChart data={chartData} />
// // //          <AbstractStatusPie 
// // //   data={[
// // //     { name: "Approved", value: stats.approved },
// // //     { name: "Rejected", value: stats.rejected },
// // //     { name: "Pending", value: stats.total - stats.approved - stats.rejected }
// // //   ]} 
// // // />

// // //       </div>

// // //       {/* Trend Chart */}
// // //       <AbstractTrendChart data={trend} />

// // //       {/* Dashboard Table */}
// // //       <h1 className="text-2xl font-bold mb-6">Abstract Support Dashboard</h1>
// // //       <UnifiedAbstractDashboard
// // //         abstractsData={abstracts}
// // //         loading={loading}
// // //         updateAbstractLocal={updateAbstractLocal}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default AbstractSupport;

// // // import React, { useState, useCallback, useEffect } from "react";
// // // import axios from "axios";

// // // // Components
// // // import UnifiedAbstractDashboard from "../../components/AbstractsTable";
// // // import StatCard from "../../components/StatCard";
// // // import RevenueChart from "../../components/RevenueChart";
// // // import AbstractStatusPie from "../../components/AbstractStatusPie";
// // // import AbstractTrendChart from "../../components/AbstractTrendChart";

// // // // --- Icons for StatCards ---
// // // const icons = {
// // //   total: (
// // //     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
// // //     </svg>
// // //   ),
// // //   approved: (
// // //     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// // //     </svg>
// // //   ),
// // //   rejected: (
// // //     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// // //     </svg>
// // //   ),
// // //   pending: (
// // //     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
// // //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
// // //     </svg>
// // //   ),
// // // };

// // // const AbstractSupport = () => {
// // //   const [abstracts, setAbstracts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [trend, setTrend] = useState([]);
// // //   const [stats, setStats] = useState({ total: 0, approved: 0, rejected: 0, pending: 0 });
// // //   const [refreshTrigger, setRefreshTrigger] = useState(false); // ✅ Added for smooth refresh

// // //   // --- Fetch abstracts from API ---
// // //   const fetchAbstracts = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const { data } = await axios.get(
// // //         "https://s3conference.ksrce.ac.in/api/admin/users",
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       const formattedData = data.map((item) => {
// // //         const teamMembers = item.registration?.participants?.length
// // //           ? item.registration.participants.map((p) => ({
// // //               name: p.name || "Unknown",
// // //               email: p.email || "-",
// // //               phone: p.phone || "-",
// // //               designation: p.designation || "-",
// // //               organisation: p.organisation || "-",
// // //               gender: p.gender || "-",
// // //               proofUrl: p.proofUrl || null,
// // //             }))
// // //           : [];

// // //         return {
// // //           id: item._id || Math.random().toString(),
// // //           userId: item.userId || "N/A",
// // //           authorName: item.name || "Unknown",
// // //           email: item.registration?.participants?.[0]?.email || "-",
// // //           mobile: item.registration?.participants?.[0]?.phone || "-",

// // //           registrationId: item.registration?._id || null,
// // //           uniqueId: item.registration?.uniqueId || "-",
// // //           track: item.registration?.track || "-",
// // //           presentationMode: item.registration?.presentationMode || "-",
// // //           title: item.registration?.abstractTitle || "No Title",
// // //           content: item.registration?.abstractContent || null,
// // //           team: teamMembers,
// // //           country: item.registration?.country || "-",
// // //           proofUrl: item.registration?.proofUrl || null,
// // //           paperUrl: item.registration?.paperUrl || null,

// // //           status: item.workflow?.abstractStatus || "Pending",
// // //           abstractApprovedBy: item.workflow?.abstractApprovedBy || "-",
// // //           rejectedReason: item.workflow?.rejectedReason || null,
// // //           abstractreasonBy: item.workflow?.abstractreasonBy || "-",

// // //           finalPaperStatus: item.workflow?.paperStatus || "-",
// // //           paperApprovedBy: item.workflow?.paperApprovedBy || "-",

// // //           paymentStatus: item.workflow?.paymentStatus || "unpaid",
// // //           paymentApprovedBy: item.workflow?.paymentApprovedBy || "-",
// // //           paymentMethod: item.workflow?.paymentMethod || "-",
// // //           amountPaid: item.workflow?.amountPaid || 0,
// // //           discount: item.workflow?.discount || 0,
// // //           paymentDate: item.workflow?.paymentDate || null,
// // //           transactionId: item.workflow?.transactionId || "-",

// // //           createdAt: item.workflow?.createdAt || new Date().toISOString(),
// // //           updatedAt: item.workflow?.updatedAt || new Date().toISOString(),
// // //         };
// // //       });

// // //       // ✅ Only keep abstracts with actual content
// // //       const filteredData = formattedData.filter(
// // //         (item) =>
// // //           item.content &&
// // //           item.content.trim() !== "" &&
// // //           item.content !== "No Content"
// // //       );

// // //       setAbstracts(filteredData);
// // //       updateTrend(filteredData);
// // //       updateStats(filteredData);
// // //     } catch (err) {
// // //       console.error("Error fetching abstracts:", err);
// // //       setAbstracts([]);
// // //       setTrend([]);
// // //       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   // ✅ Re-fetch data whenever refreshTrigger changes
// // //   useEffect(() => {
// // //     fetchAbstracts();
// // //   }, [fetchAbstracts, refreshTrigger]);

// // //   // --- Update stats from data ---
// // //   const updateStats = (data) => {
// // //     const total = data.length;
// // //     const approved = data.filter((a) => a.status.toLowerCase() === "approved").length;
// // //     const rejected = data.filter((a) => a.status.toLowerCase() === "rejected").length;
// // //     const pending = data.filter(
// // //       (a) =>
// // //         a.status.toLowerCase() === "submitted" ||
// // //         a.status.toLowerCase() === "under review"
// // //     ).length;

// // //     setStats({ total, approved, rejected, pending });
// // //   };

// // //   // --- Update trend data ---
// // //   const updateTrend = (data) => {
// // //     const trendMap = {};
// // //     data.forEach((item) => {
// // //       const date = new Date(item.createdAt).toISOString().split("T")[0];
// // //       trendMap[date] = (trendMap[date] || 0) + 1;
// // //     });
// // //     const trendData = Object.keys(trendMap).map((date) => ({
// // //       date,
// // //       count: trendMap[date],
// // //     }));
// // //     setTrend(trendData);
// // //   };

// // //   // --- Callback to update abstract status locally ---
// // //   const updateAbstractLocal = async (userId, newStatus) => {
// // //     try {
// // //       await axios.put(
// // //         `https://it-con-backend.onrender.com/api/admin/users/abstract/${userId}`,
// // //         { status: newStatus },
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
// // //       );
// // //       fetchAbstracts();
// // //     } catch (err) {
// // //       console.error("Error updating abstract status:", err);
// // //     }
// // //   };

// // //   const chartData = [
// // //     { name: "Abstracts", approved: stats.approved, rejected: stats.rejected },
// // //   ];

// // //   return (
// // //     <div className="space-y-6 p-4">
// // //       {/* StatCards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} change="+5%" isPositive />
// // //         <StatCard icon={icons.approved} title="Approved" value={stats.approved} change="+3%" isPositive />
// // //         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} change="-1%" isPositive={false} />
// // //         <StatCard icon={icons.pending} title="Pending" value={stats.pending} change="+2%" isPositive />
// // //       </div>

// // //       {/* Charts Row */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <RevenueChart data={chartData} />
// // //         <AbstractStatusPie
// // //           data={[
// // //             { name: "Approved", value: stats.approved },
// // //             { name: "Rejected", value: stats.rejected },
// // //             { name: "Pending", value: stats.total - stats.approved - stats.rejected },
// // //           ]}
// // //         />
// // //       </div>

// // //       {/* Trend Chart */}
// // //       <AbstractTrendChart data={trend} />

// // //       {/* Dashboard Table */}
// // //       <h1 className="text-2xl font-bold mb-6">Abstract Support Dashboard</h1>
// // //       <UnifiedAbstractDashboard
// // //         abstractsData={abstracts}
// // //         loading={loading}
// // //         updateAbstractLocal={updateAbstractLocal}
// // //         refreshTrigger={refreshTrigger}          // ✅ Added
// // //         setRefreshTrigger={setRefreshTrigger}    // ✅ Added
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default AbstractSupport;
// // import React, { useState, useCallback, useEffect } from "react";
// // import axios from "axios";
// // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
// // import UnifiedAbstractDashboard from "../../components/AbstractsTable"; // ✅ Keep this imported

// // // =============================================================
// // // 📊 Small Sub-Components (All included in this file)
// // // =============================================================

// // // ✅ StatCard Component
// // const StatCard = ({ icon, title, value, change, isPositive }) => (
// //   <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-all duration-300">
// //     <div className="flex items-center justify-between">
// //       <div>{icon}</div>
// //       <div
// //         className={`text-sm font-semibold ${
// //           isPositive ? "text-green-500" : "text-red-500"
// //         }`}
// //       >
// //         {change}
// //       </div>
// //     </div>
// //     <h3 className="mt-4 text-gray-500 text-sm font-medium">{title}</h3>
// //     <p className="text-2xl font-bold text-gray-800">{value}</p>
// //   </div>
// // );

// // // ✅ Revenue Chart Component (Bar Chart)
// // const RevenueChart = ({ data }) => (
// //   <div className="bg-white p-6 rounded-2xl shadow">
// //     <h2 className="text-lg font-semibold mb-4 text-gray-700">Abstract Approval Stats</h2>
// //     <ResponsiveContainer width="100%" height={300}>
// //       <BarChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="name" />
// //         <YAxis allowDecimals={false} />
// //         <Tooltip />
// //         <Bar dataKey="approved" fill="#22c55e" />
// //         <Bar dataKey="rejected" fill="#ef4444" />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   </div>
// // );

// // // ✅ Abstract Status Pie Chart
// // const AbstractStatusPie = ({ data }) => {
// //   const COLORS = ["#22c55e", "#ef4444", "#eab308"];
// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow">
// //       <h2 className="text-lg font-semibold mb-4 text-gray-700">Abstract Status Distribution</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <PieChart>
// //           <Pie
// //             data={data}
// //             cx="50%"
// //             cy="50%"
// //             outerRadius={100}
// //             fill="#8884d8"
// //             dataKey="value"
// //             label={({ name, value }) => `${name}: ${value}`}
// //           >
// //             {data.map((entry, index) => (
// //               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //         </PieChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // // ✅ Abstract Trend Chart (Line)
// // const AbstractTrendChart = ({ data }) => (
// //   <div className="bg-white p-6 rounded-2xl shadow">
// //     <h2 className="text-lg font-semibold mb-4 text-gray-700">Abstract Submission Trend</h2>
// //     <ResponsiveContainer width="100%" height={300}>
// //       <BarChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="date" />
// //         <YAxis allowDecimals={false} />
// //         <Tooltip />
// //         <Bar dataKey="count" fill="#3b82f6" />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   </div>
// // );

// // // =============================================================
// // // 🌐 Main Component: AbstractSupport
// // // =============================================================
// // const icons = {
// //   total: (
// //     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
// //     </svg>
// //   ),
// //   approved: (
// //     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// //     </svg>
// //   ),
// //   rejected: (
// //     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// //     </svg>
// //   ),
// //   pending: (
// //     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
// //     </svg>
// //   ),
// // };

// // const AbstractSupport = () => {
// //   const [abstracts, setAbstracts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [trend, setTrend] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, approved: 0, rejected: 0, pending: 0 });
// //   const [refreshTrigger, setRefreshTrigger] = useState(false);

// //   // --- Fetch abstracts from API ---
// //   const fetchAbstracts = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const { data } = await axios.get(
// //         "https://s3conference.ksrce.ac.in/api/admin/users",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const formattedData = data.map((item) => {
// //         const teamMembers = item.registration?.participants?.length
// //           ? item.registration.participants.map((p) => ({
// //               name: p.name || "Unknown",
// //               email: p.email || "-",
// //               phone: p.phone || "-",
// //               designation: p.designation || "-",
// //               organisation: p.organisation || "-",
// //               gender: p.gender || "-",
// //               proofUrl: p.proofUrl || null,
// //             }))
// //           : [];

// //         return {
// //           id: item._id || Math.random().toString(),
// //           authorName: item.name || "Unknown",
// //           email: item.registration?.participants?.[0]?.email || "-",
// //           mobile: item.registration?.participants?.[0]?.phone || "-",
// //           uniqueId: item.registration?.uniqueId || "-",
// //           track: item.registration?.track || "-",
// //           presentationMode: item.registration?.presentationMode || "-",
// //           title: item.registration?.abstractTitle || "No Title",
// //           content: item.registration?.abstractContent || null,
// //           team: teamMembers,
// //           country: item.registration?.country || "-",
// //           proofUrl: item.registration?.proofUrl || null,
// //           status: item.workflow?.abstractStatus || "Pending",
// //           paymentStatus: item.workflow?.paymentStatus || "unpaid",
// //           createdAt: item.workflow?.createdAt || new Date().toISOString(),
// //         };
// //       });

// //       const filteredData = formattedData.filter(
// //         (item) => item.content && item.content.trim() !== "" && item.content !== "No Content"
// //       );

// //       setAbstracts(filteredData);
// //       updateTrend(filteredData);
// //       updateStats(filteredData);
// //     } catch (err) {
// //       console.error("Error fetching abstracts:", err);
// //       setAbstracts([]);
// //       setTrend([]);
// //       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchAbstracts();
// //   }, [fetchAbstracts, refreshTrigger]);

// //   const updateStats = (data) => {
// //     const total = data.length;
// //     const approved = data.filter((a) => a.status.toLowerCase() === "approved").length;
// //     const rejected = data.filter((a) => a.status.toLowerCase() === "rejected").length;
// //     const pending = data.filter(
// //       (a) =>
// //         a.status.toLowerCase() === "submitted" ||
// //         a.status.toLowerCase() === "under review"
// //     ).length;

// //     setStats({ total, approved, rejected, pending });
// //   };

// //   const updateTrend = (data) => {
// //     const trendMap = {};
// //     data.forEach((item) => {
// //       const date = new Date(item.createdAt).toISOString().split("T")[0];
// //       trendMap[date] = (trendMap[date] || 0) + 1;
// //     });
// //     setTrend(Object.keys(trendMap).map((date) => ({ date, count: trendMap[date] })));
// //   };

// //   const updateAbstractLocal = async (userId, newStatus) => {
// //     try {
// //       await axios.put(
// //         `https://it-con-backend.onrender.com/api/admin/users/abstract/${userId}`,
// //         { status: newStatus },
// //         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
// //       );
// //       fetchAbstracts();
// //     } catch (err) {
// //       console.error("Error updating abstract status:", err);
// //     }
// //   };

// //   const chartData = [{ name: "Abstracts", approved: stats.approved, rejected: stats.rejected }];

// //   return (
// //     <div className="space-y-6 p-4">
// //       {/* Stat Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} change="+5%" isPositive />
// //         <StatCard icon={icons.approved} title="Approved" value={stats.approved} change="+3%" isPositive />
// //         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} change="-1%" isPositive={false} />
// //         <StatCard icon={icons.pending} title="Pending" value={stats.pending} change="+2%" isPositive />
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <RevenueChart data={chartData} />
// //         <AbstractStatusPie
// //           data={[
// //             { name: "Approved", value: stats.approved },
// //             { name: "Rejected", value: stats.rejected },
// //             { name: "Pending", value: stats.total - stats.approved - stats.rejected },
// //           ]}
// //         />
// //       </div>

// //       {/* Trend */}
// //       <AbstractTrendChart data={trend} />

// //       {/* Table */}
// //       <h1 className="text-2xl font-bold mb-6">Abstract Support Dashboard</h1>
// //       <UnifiedAbstractDashboard
// //         abstractsData={abstracts}
// //         loading={loading}
// //         updateAbstractLocal={updateAbstractLocal}
// //         refreshTrigger={refreshTrigger}
// //         setRefreshTrigger={setRefreshTrigger}
// //       />
// //     </div>
// //   );
// // };

// // export default AbstractSupport;



// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
// } from "lucide-react";

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   pending: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
//     </svg>
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

// // Abstract Status Pie Chart Component
// const AbstractStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Abstract Status Distribution</h3>
//       <ResponsiveContainer width="100%" height={260}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, value }) => `${name}: ${value}`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Abstract Trend Chart Component
// const AbstractTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Abstracts"
//           stroke="#3B82F6"
//           strokeWidth={2}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart
//         data={[
//           {
//             name: "Abstracts",
//             approved: stats.approved,
//             pending: stats.pending,
//             rejected: stats.rejected,
//           },
//         ]}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approved" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const AbstractSupport = () => {
//   const [abstracts, setAbstracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [abstractModalData, setAbstractModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     setStats({
//       total: data.length,
//       approved: data.filter((d) => d.status.toLowerCase() === "approved").length,
//       rejected: data.filter((d) => d.status.toLowerCase() === "rejected").length,
//       pending: data.filter((d) => 
//         d.status.toLowerCase() === "submitted" || 
//         d.status.toLowerCase() === "under review" ||
//         d.status.toLowerCase() === "pending"
//       ).length,
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

//   // Format each abstract
//   const formatAbstract = (item) => {
//     const teamMembers = item.registration?.participants?.length
//       ? item.registration.participants.map((p) => ({
//           name: p.name || "Unknown",
//           email: p.email || "-",
//           phone: p.phone || "-",
//           designation: p.designation || "-",
//           organisation: p.organisation || "-",
//           gender: p.gender || "-",
//           proofUrl: p.proofUrl || null,
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
//       team: teamMembers,
//       country: item.registration?.country || "-",
//       proofUrl: item.registration?.proofUrl || null,
//       status: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//     };
//   };

//   // Fetch abstracts
//   const fetchAbstracts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatAbstract);
//       console.log("this is the data",formatted);
//       // Filter only abstracts with actual content
//       const filteredData = formatted.filter(
//         (item) =>
//           item.content &&
//           item.content.trim() !== "" &&
//           item.content !== "No content available"
//       );

//       setAbstracts(filteredData);
//       computeStats(filteredData);
//       computeTrend(filteredData);
//     } catch (err) {
//       console.error("Error fetching abstracts:", err);
//       setAbstracts([]);
//       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchAbstracts();
//   }, [fetchAbstracts, refreshTrigger]);

//   // Update local state after successful API call
//   const updateAbstractLocal = useCallback((id, newStatus) => {
//     setAbstracts((prevAbstracts) => {
//       const updatedAbstracts = prevAbstracts.map((abs) => {
//         if (abs.id === id) {
//           return { ...abs, status: newStatus.toLowerCase() };
//         }
//         return abs;
//       });
      
//       computeStats(updatedAbstracts);
//       computeTrend(updatedAbstracts);
//       return updatedAbstracts;
//     });
//   }, [computeStats, computeTrend]);

//   // Search & Filter (Memoized)
//   const filteredAndSearchedAbstracts = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return abstracts.filter((abs) => {
//       const matchesSearch =
//         abs.authorName.toLowerCase().includes(q) ||
//         abs.email.toLowerCase().includes(q) ||
//         abs.uniqueId.toLowerCase().includes(q) ||
//         abs.title.toLowerCase().includes(q) ||
//         abs.userId.toLowerCase().includes(q) ||
//         abs.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || abs.status.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });
//   }, [abstracts, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "under review":
//         return "bg-orange-100 text-orange-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "pending":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedAbstracts.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedAbstracts.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.status,
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
//     XLSX.writeFile(wb, `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Handle Abstract Status Update
//   const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
//     if (!abstractModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         abstractStatus: newStatus.toLowerCase(),
//       };

//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         payload.abstractrejectedReason = reason;
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${abstractModalData.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Abstract status updated to "${newStatus}"`);
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating abstract status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update abstract status.");
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
//     handleAbstractStatusUpdate("rejected", rejectionReason.trim());
//   };

//   // Handle View Proof
//   const handleViewProof = (proofUrl) => {
//     if (!proofUrl) return alert("No proof available.");
//     if (proofUrl.startsWith("http")) window.open(proofUrl, "_blank");
//     else alert("Invalid proof URL: " + proofUrl);
//   };

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approved },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending", value: stats.pending },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Abstract Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage abstract submissions, reviews, and approval statuses.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} />
//         <StatCard icon={icons.approved} title="Approved" value={stats.approved} />
//         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} />
//         <StatCard icon={icons.pending} title="Pending Review" value={stats.pending} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <AbstractStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <AbstractTrendChart data={trend} />

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
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded-lg p-2 text-sm w-full md:w-auto"
//             >
//               <option value="All">All Statuses</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="under review">Under Review</option>
//               <option value="submitted">Submitted</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchAbstracts}
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
//         ) : filteredAndSearchedAbstracts.length === 0 ? (
//           <div className="p-8 text-center text-gray-600">
//             No records match the current filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
//                 <tr>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Author Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Title</th>
//                   <th className="p-3">Track</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedAbstracts.map((abs) => (
//                   <tr key={abs.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {abs.userId}
//                     </td>
//                     <td className="p-3 font-medium">{abs.authorName}</td>
//                     <td className="p-3 text-gray-600">{abs.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{abs.title}</td>
//                     <td className="p-3 text-gray-600">{abs.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           abs.status
//                         )}`}
//                       >
//                         {abs.status.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(abs.team) && abs.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(abs)}
//                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
//                         >
//                           <Users className="w-4 h-4" /> View
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setAbstractModalData(abs)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Review
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

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
//                     <th className="p-2 text-left">Designation</th>
//                     <th className="p-2 text-left">Organisation</th>
//                     <th className="p-2 text-left">Gender</th>
//                     <th className="p-2 text-left">Proof</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {teamModalData.team.map((member, i) => (
//                     <tr key={i}>
//                       <td className="p-2">{member.name || "Unnamed"}</td>
//                       <td className="p-2">{member.email || "-"}</td>
//                       <td className="p-2">{member.phone || "-"}</td>
//                       <td className="p-2">{member.designation || "-"}</td>
//                       <td className="p-2">{member.organisation || "-"}</td>
//                       <td className="p-2">{member.gender || "-"}</td>
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

//       {/* Abstract Review Modal */}
//       {abstractModalData && (
//         <Modal onClose={() => setAbstractModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Abstract Review: {abstractModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {abstractModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(abstractModalData.status)}`}>
//                 {abstractModalData.status.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Abstract Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {abstractModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {abstractModalData.email}</p>
//                 <p><strong>Mobile:</strong> {abstractModalData.mobile}</p>
//                 <p><strong>Country:</strong> {abstractModalData.country}</p>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg max-h-60 overflow-y-auto">
//               <h4 className="font-bold mb-2">Abstract Content</h4>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {abstractModalData.content}
//               </p>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(abstractModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handleAbstractStatusUpdate("approved")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>

//               <button
//                 onClick={() => handleAbstractStatusUpdate("under review")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" />
//                 {actionLoading ? "Processing..." : "Mark Under Review"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this abstract.
//             </p>
//             <textarea
//               rows="4"
//               className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Abstract
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AbstractSupport;


// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Eye,
// } from "lucide-react";

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   pending: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
//     </svg>
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

// // Image Preview Modal
// const ImagePreviewModal = ({ imageUrl, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
//         <button 
//           onClick={onClose} 
//           className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10"
//         >
//           <X className="w-8 h-8" />
//         </button>
//         <div className="p-4 border-b">
//           <h3 className="text-lg font-semibold">Proof Document Preview</h3>
//         </div>
//         <div className="p-4 max-h-[70vh] overflow-auto">
//           {imageUrl ? (
//             <img 
//               src={imageUrl} 
//               alt="Proof Document" 
//               className="w-full h-auto rounded-lg shadow-md"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 const errorDiv = e.target.parentNode.querySelector('.image-error');
//                 if (errorDiv) errorDiv.style.display = 'block';
//               }}
//             />
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               No image available
//             </div>
//           )}
//           <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//             <p>Failed to load image.</p>
//             <p className="text-sm text-gray-600 break-all mt-2">{imageUrl}</p>
//           </div>
//         </div>
//         <div className="p-4 border-t flex justify-between items-center">
//           <span className="text-sm text-gray-500 break-all flex-1 mr-4">
//             {imageUrl}
//           </span>
//           <button 
//             onClick={() => window.open(imageUrl, '_blank')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Eye className="w-4 h-4" />
//             Open in New Tab
//           </button>
//         </div>
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

// // Abstract Status Pie Chart Component
// const AbstractStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Abstract Status Distribution</h3>
//       <ResponsiveContainer width="100%" height={260}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, value }) => `${name}: ${value}`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Abstract Trend Chart Component
// const AbstractTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Abstracts"
//           stroke="#3B82F6"
//           strokeWidth={2}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart
//         data={[
//           {
//             name: "Abstracts",
//             approved: stats.approved,
//             pending: stats.pending,
//             rejected: stats.rejected,
//           },
//         ]}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approved" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const AbstractSupport = () => {
//   const [abstracts, setAbstracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [abstractModalData, setAbstractModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     setStats({
//       total: data.length,
//       approved: data.filter((d) => d.status.toLowerCase() === "approved").length,
//       rejected: data.filter((d) => d.status.toLowerCase() === "rejected").length,
//       pending: data.filter((d) => 
//         d.status.toLowerCase() === "submitted" || 
//         d.status.toLowerCase() === "under review" ||
//         d.status.toLowerCase() === "pending"
//       ).length,
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

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     // If it's already a full URL, return as is
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     // If it's a relative path starting with /uploads, prepend the base URL
//     if (url.startsWith('/uploads/')) {
//       return `https://s3conference.ksrce.ac.in${url}`;
//     }
    
//     // If it's just a filename, construct the full path
//     if (url.includes('proof_')) {
//       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
//     }
    
//     return url;
//   };

//   // Format each abstract
//   const formatAbstract = (item) => {
//     const teamMembers = item.registration?.participants?.length
//       ? item.registration.participants.map((p) => ({
//           name: p.name || "Unknown",
//           email: p.email || "-",
//           phone: p.phone || "-",
//           designation: p.designation || "-",
//           organisation: p.organisation || "-",
//           gender: p.gender || "-",
//           proofUrl: formatProofUrl(p.proofUrl),
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
//       team: teamMembers,
//       country: item.registration?.country || "-",
//       proofUrl: formatProofUrl(item.registration?.proofUrl),
//       status: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//     };
//   };

//   // Fetch abstracts
//   const fetchAbstracts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatAbstract);
//       console.log("this is the data", formatted);
//       // Filter only abstracts with actual content
//       const filteredData = formatted.filter(
//         (item) =>
//           item.content &&
//           item.content.trim() !== "" &&
//           item.content !== "No content available"
//       );

//       setAbstracts(filteredData);
//       computeStats(filteredData);
//       computeTrend(filteredData);
//     } catch (err) {
//       console.error("Error fetching abstracts:", err);
//       setAbstracts([]);
//       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchAbstracts();
//   }, [fetchAbstracts, refreshTrigger]);

//   // Update local state after successful API call
//   const updateAbstractLocal = useCallback((id, newStatus) => {
//     setAbstracts((prevAbstracts) => {
//       const updatedAbstracts = prevAbstracts.map((abs) => {
//         if (abs.id === id) {
//           return { ...abs, status: newStatus.toLowerCase() };
//         }
//         return abs;
//       });
      
//       computeStats(updatedAbstracts);
//       computeTrend(updatedAbstracts);
//       return updatedAbstracts;
//     });
//   }, [computeStats, computeTrend]);

//   // Search & Filter (Memoized)
//   const filteredAndSearchedAbstracts = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return abstracts.filter((abs) => {
//       const matchesSearch =
//         abs.authorName.toLowerCase().includes(q) ||
//         abs.email.toLowerCase().includes(q) ||
//         abs.uniqueId.toLowerCase().includes(q) ||
//         abs.title.toLowerCase().includes(q) ||
//         abs.userId.toLowerCase().includes(q) ||
//         abs.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || abs.status.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });
//   }, [abstracts, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "under review":
//         return "bg-orange-100 text-orange-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "pending":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedAbstracts.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedAbstracts.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.status,
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
//     XLSX.writeFile(wb, `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Handle Abstract Status Update
//   const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
//     if (!abstractModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         abstractStatus: newStatus.toLowerCase(),
//       };

//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         payload.abstractrejectedReason = reason;
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${abstractModalData.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Abstract status updated to "${newStatus}"`);
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating abstract status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update abstract status.");
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
//     handleAbstractStatusUpdate("rejected", rejectionReason.trim());
//   };

//   // Handle View Proof - Updated function
//   const handleViewProof = (proofUrl) => {
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     // Test if the URL is accessible
//     const img = new Image();
//     img.onload = () => {
//       // Image loaded successfully, open preview
//       setImagePreviewUrl(proofUrl);
//     };
//     img.onerror = () => {
//       // Image failed to load, show error with URL details
//       alert(`Unable to load the proof image. The URL may be invalid or the image may not be accessible.\n\nURL: ${proofUrl}`);
//     };
//     img.src = proofUrl;
//   };

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approved },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending", value: stats.pending },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Abstract Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage abstract submissions, reviews, and approval statuses.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} />
//         <StatCard icon={icons.approved} title="Approved" value={stats.approved} />
//         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} />
//         <StatCard icon={icons.pending} title="Pending Review" value={stats.pending} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <AbstractStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <AbstractTrendChart data={trend} />

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
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded-lg p-2 text-sm w-full md:w-auto"
//             >
//               <option value="All">All Statuses</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="under review">Under Review</option>
//               <option value="submitted">Submitted</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchAbstracts}
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
//         ) : filteredAndSearchedAbstracts.length === 0 ? (
//           <div className="p-8 text-center text-gray-600">
//             No records match the current filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
//                 <tr>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Author Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Title</th>
//                   <th className="p-3">Track</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedAbstracts.map((abs) => (
//                   <tr key={abs.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {abs.userId}
//                     </td>
//                     <td className="p-3 font-medium">{abs.authorName}</td>
//                     <td className="p-3 text-gray-600">{abs.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{abs.title}</td>
//                     <td className="p-3 text-gray-600">{abs.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           abs.status
//                         )}`}
//                       >
//                         {abs.status.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(abs.team) && abs.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(abs)}
//                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
//                         >
//                           <Users className="w-4 h-4" /> View
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setAbstractModalData(abs)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Review
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

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
//                     <th className="p-2 text-left">Designation</th>
//                     <th className="p-2 text-left">Organisation</th>
//                     <th className="p-2 text-left">Gender</th>
//                     <th className="p-2 text-left">Proof</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {teamModalData.team.map((member, i) => (
//                     <tr key={i}>
//                       <td className="p-2">{member.name || "Unnamed"}</td>
//                       <td className="p-2">{member.email || "-"}</td>
//                       <td className="p-2">{member.phone || "-"}</td>
//                       <td className="p-2">{member.designation || "-"}</td>
//                       <td className="p-2">{member.organisation || "-"}</td>
//                       <td className="p-2">{member.gender || "-"}</td>
//                       <td className="p-2">
//                         {member.proofUrl ? (
//                           <button
//                             onClick={() => handleViewProof(member.proofUrl)}
//                             className="text-blue-500 hover:underline text-xs flex items-center gap-1"
//                           >
//                             <Eye className="w-3 h-3" /> View Proof
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

//       {/* Abstract Review Modal */}
//       {abstractModalData && (
//         <Modal onClose={() => setAbstractModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Abstract Review: {abstractModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {abstractModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(abstractModalData.status)}`}>
//                 {abstractModalData.status.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Abstract Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {abstractModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {abstractModalData.email}</p>
//                 <p><strong>Mobile:</strong> {abstractModalData.mobile}</p>
//                 <p><strong>Country:</strong> {abstractModalData.country}</p>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg max-h-60 overflow-y-auto">
//               <h4 className="font-bold mb-2">Abstract Content</h4>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {abstractModalData.content}
//               </p>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(abstractModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handleAbstractStatusUpdate("approved")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>

//               <button
//                 onClick={() => handleAbstractStatusUpdate("under review")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" />
//                 {actionLoading ? "Processing..." : "Mark Under Review"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this abstract.
//             </p>
//             <textarea
//               rows="4"
//               className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Abstract
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <ImagePreviewModal 
//           imageUrl={imagePreviewUrl} 
//           onClose={() => setImagePreviewUrl(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default AbstractSupport;
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Eye,
// } from "lucide-react";

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   pending: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
//     </svg>
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

// // Image Preview Modal
// const ImagePreviewModal = ({ imageUrl, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
//         <button 
//           onClick={onClose} 
//           className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10"
//         >
//           <X className="w-8 h-8" />
//         </button>
//         <div className="p-4 border-b">
//           <h3 className="text-lg font-semibold">Proof Document Preview</h3>
//         </div>
//         <div className="p-4 max-h-[70vh] overflow-auto">
//           {imageUrl ? (
//             <img 
//               src={imageUrl} 
//               alt="Proof Document" 
//               className="w-full h-auto rounded-lg shadow-md"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 const errorDiv = e.target.parentNode.querySelector('.image-error');
//                 if (errorDiv) errorDiv.style.display = 'block';
//               }}
//             />
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               No image available
//             </div>
//           )}
//           <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//             <p>Failed to load image.</p>
//             <p className="text-sm text-gray-600 break-all mt-2">{imageUrl}</p>
//           </div>
//         </div>
//         <div className="p-4 border-t flex justify-between items-center">
//           <span className="text-sm text-gray-500 break-all flex-1 mr-4">
//             {imageUrl}
//           </span>
//           <button 
//             onClick={() => window.open(imageUrl, '_blank')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Eye className="w-4 h-4" />
//             Open in New Tab
//           </button>
//         </div>
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

// // Abstract Status Pie Chart Component
// const AbstractStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Abstract Status Distribution</h3>
//       <ResponsiveContainer width="100%" height={260}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, value }) => `${name}: ${value}`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Abstract Trend Chart Component
// const AbstractTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Abstracts"
//           stroke="#3B82F6"
//           strokeWidth={2}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart
//         data={[
//           {
//             name: "Abstracts",
//             approved: stats.approved,
//             pending: stats.pending,
//             rejected: stats.rejected,
//           },
//         ]}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approved" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const AbstractSupport = () => {
//   const [abstracts, setAbstracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [abstractModalData, setAbstractModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

//   // Define the base URL once
//   const BASE_URL = "https://s3conference.ksrce.ac.in";

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = useCallback((url) => {
//     if (!url) return null;
    
//     // If it's already a full URL, return as is
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     // If it's a relative path starting with /uploads, prepend the base URL
//     // This is the most likely case causing the issue: /uploads/proofs/...
//     if (url.startsWith('/')) {
//       return `${BASE_URL}${url}`;
//     }
    
//     // If it's just a filename, construct the full path (less common)
//     if (url.includes('proof_')) {
//       return `${BASE_URL}/uploads/proofs/${url}`;
//     }
    
//     return url;
//   }, [BASE_URL]); // BASE_URL is constant, but useCallback is good practice

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     setStats({
//       total: data.length,
//       approved: data.filter((d) => d.status.toLowerCase() === "approved").length,
//       rejected: data.filter((d) => d.status.toLowerCase() === "rejected").length,
//       pending: data.filter((d) => 
//         d.status.toLowerCase() === "submitted" || 
//         d.status.toLowerCase() === "under review" ||
//         d.status.toLowerCase() === "pending"
//       ).length,
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

//   // Format each abstract
//   const formatAbstract = useCallback((item) => {
//     const teamMembers = item.registration?.participants?.length
//       ? item.registration.participants.map((p) => ({
//           name: p.name || "Unknown",
//           email: p.email || "-",
//           phone: p.phone || "-",
//           designation: p.designation || "-",
//           organisation: p.organisation || "-",
//           gender: p.gender || "-",
//           proofUrl: formatProofUrl(p.proofUrl), // Formatted URL stored here
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
//       team: teamMembers,
//       country: item.registration?.country || "-",
//       proofUrl: formatProofUrl(item.registration?.proofUrl),
//       status: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//     };
//   }, [formatProofUrl]); // Dependency on formatProofUrl

//   // Fetch abstracts
//   const fetchAbstracts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         `${BASE_URL}/api/admin/users`, // Use BASE_URL here too
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatAbstract);
      
//       // Filter only abstracts with actual content
//       const filteredData = formatted.filter(
//         (item) =>
//           item.content &&
//           item.content.trim() !== "" &&
//           item.content !== "No content available"
//       );

//       setAbstracts(filteredData);
//       computeStats(filteredData);
//       computeTrend(filteredData);
//     } catch (err) {
//       console.error("Error fetching abstracts:", err);
//       setAbstracts([]);
//       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend, formatAbstract, BASE_URL]);

//   useEffect(() => {
//     fetchAbstracts();
//   }, [fetchAbstracts, refreshTrigger]);

//   // Update local state after successful API call
//   const updateAbstractLocal = useCallback((id, newStatus) => {
//     setAbstracts((prevAbstracts) => {
//       const updatedAbstracts = prevAbstracts.map((abs) => {
//         if (abs.id === id) {
//           return { ...abs, status: newStatus.toLowerCase() };
//         }
//         return abs;
//       });
      
//       computeStats(updatedAbstracts);
//       computeTrend(updatedAbstracts);
//       return updatedAbstracts;
//     });
//   }, [computeStats, computeTrend]);

//   // Search & Filter (Memoized)
//   const filteredAndSearchedAbstracts = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return abstracts.filter((abs) => {
//       const matchesSearch =
//         abs.authorName.toLowerCase().includes(q) ||
//         abs.email.toLowerCase().includes(q) ||
//         abs.uniqueId.toLowerCase().includes(q) ||
//         abs.title.toLowerCase().includes(q) ||
//         abs.userId.toLowerCase().includes(q) ||
//         abs.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || abs.status.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });
//   }, [abstracts, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "under review":
//         return "bg-orange-100 text-orange-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "pending":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedAbstracts.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedAbstracts.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.status,
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
//     XLSX.writeFile(wb, `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Handle Abstract Status Update
//   const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
//     if (!abstractModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         abstractStatus: newStatus.toLowerCase(),
//       };

//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         payload.abstractrejectedReason = reason;
//       }

//       const API_URL = `${BASE_URL}/api/admin/update/${abstractModalData.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Abstract status updated to "${newStatus}"`);
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating abstract status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update abstract status.");
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
//     handleAbstractStatusUpdate("rejected", rejectionReason.trim());
//   };

//   // Handle View Proof - **FIXED:** Now calls the function with the already-formatted URL
//   const handleViewProof = (proofUrl) => {
//     // Note: proofUrl passed here should already be fully qualified due to fix in the table below
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     console.log("Attempting to load proof from URL:", proofUrl); // Added for debugging

//     // Test if the URL is accessible
//     const img = new Image();
//     img.onload = () => {
//       // Image loaded successfully, open preview
//       setImagePreviewUrl(proofUrl);
//     };
//     img.onerror = () => {
//       // Image failed to load, show error with URL details
//       // The alert message is now more helpful and shows the full URL if available
//       alert(`Unable to load the proof image. The URL may be invalid or the image may not be accessible.\n\nURL: ${proofUrl}`);
//     };
//     img.src = proofUrl;
//   };

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approved },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending", value: stats.pending },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Abstract Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage abstract submissions, reviews, and approval statuses.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} />
//         <StatCard icon={icons.approved} title="Approved" value={stats.approved} />
//         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} />
//         <StatCard icon={icons.pending} title="Pending Review" value={stats.pending} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <AbstractStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <AbstractTrendChart data={trend} />

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
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded-lg p-2 text-sm w-full md:w-auto"
//             >
//               <option value="All">All Statuses</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="under review">Under Review</option>
//               <option value="submitted">Submitted</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchAbstracts}
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
//         ) : filteredAndSearchedAbstracts.length === 0 ? (
//           <div className="p-8 text-center text-gray-600">
//             No records match the current filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
//                 <tr>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Author Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Title</th>
//                   <th className="p-3">Track</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedAbstracts.map((abs) => (
//                   <tr key={abs.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {abs.userId}
//                     </td>
//                     <td className="p-3 font-medium">{abs.authorName}</td>
//                     <td className="p-3 text-gray-600">{abs.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{abs.title}</td>
//                     <td className="p-3 text-gray-600">{abs.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           abs.status
//                         )}`}
//                       >
//                         {abs.status.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(abs.team) && abs.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(abs)}
//                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
//                         >
//                           <Users className="w-4 h-4" /> View
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setAbstractModalData(abs)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Review
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

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
//                     <th className="p-2 text-left">Designation</th>
//                     <th className="p-2 text-left">Organisation</th>
//                     <th className="p-2 text-left">Gender</th>
//                     <th className="p-2 text-left">Proof</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {teamModalData.team.map((member, i) => (
//                     <tr key={i}>
//                       <td className="p-2">{member.name || "Unnamed"}</td>
//                       <td className="p-2">{member.email || "-"}</td>
//                       <td className="p-2">{member.phone || "-"}</td>
//                       <td className="p-2">{member.designation || "-"}</td>
//                       <td className="p-2">{member.organisation || "-"}</td>
//                       <td className="p-2">{member.gender || "-"}</td>
//                       <td className="p-2">
//                         {/* *** FIX IS HERE ***
//                           member.proofUrl is now guaranteed to be the fully formatted URL
//                           because it was run through formatProofUrl in formatAbstract
//                         */}
//                         {member.proofUrl ? (
//                           <button
//                             onClick={() => handleViewProof(member.proofUrl)}
//                             className="text-blue-500 hover:underline text-xs flex items-center gap-1"
//                           >
//                             <Eye className="w-3 h-3" /> View Proof
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

//       {/* Abstract Review Modal */}
//       {abstractModalData && (
//         <Modal onClose={() => setAbstractModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Abstract Review: {abstractModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {abstractModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(abstractModalData.status)}`}>
//                 {abstractModalData.status.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Abstract Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {abstractModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {abstractModalData.email}</p>
//                 <p><strong>Mobile:</strong> {abstractModalData.mobile}</p>
//                 <p><strong>Country:</strong> {abstractModalData.country}</p>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg max-h-60 overflow-y-auto">
//               <h4 className="font-bold mb-2">Abstract Content</h4>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {abstractModalData.content}
//               </p>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(abstractModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handleAbstractStatusUpdate("approved")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>

//               <button
//                 onClick={() => handleAbstractStatusUpdate("under review")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" />
//                 {actionLoading ? "Processing..." : "Mark Under Review"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this abstract.
//             </p>
//             <textarea
//               rows="4"
//               className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Abstract
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <ImagePreviewModal 
//           imageUrl={imagePreviewUrl} 
//           onClose={() => setImagePreviewUrl(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default AbstractSupport;


// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Loader2,
//   Download,
//   X,
//   Users,
//   Search,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Eye,
// } from "lucide-react";

// /* ----------------------------- Small Components & Utils ----------------------------- */

// // Icon map
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   approved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   rejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   pending: (
//     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
//     </svg>
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

// // Image Preview Modal
// const ImagePreviewModal = ({ imageUrl, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
//         <button 
//           onClick={onClose} 
//           className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10"
//         >
//           <X className="w-8 h-8" />
//         </button>
//         <div className="p-4 border-b">
//           <h3 className="text-lg font-semibold">Proof Document Preview</h3>
//         </div>
//         <div className="p-4 max-h-[70vh] overflow-auto">
//           {imageUrl ? (
//             <img 
//               src={imageUrl} 
//               alt="Proof Document" 
//               className="w-full h-auto rounded-lg shadow-md"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 const errorDiv = e.target.parentNode.querySelector('.image-error');
//                 if (errorDiv) errorDiv.style.display = 'block';
//               }}
//             />
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               No image available
//             </div>
//           )}
//           <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
//             <p>Failed to load image.</p>
//             <p className="text-sm text-gray-600 break-all mt-2">{imageUrl}</p>
//           </div>
//         </div>
//         <div className="p-4 border-t flex justify-between items-center">
//           <span className="text-sm text-gray-500 break-all flex-1 mr-4">
//             {imageUrl}
//           </span>
//           <button 
//             onClick={() => window.open(imageUrl, '_blank')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Eye className="w-4 h-4" />
//             Open in New Tab
//           </button>
//         </div>
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

// // Abstract Status Pie Chart Component
// const AbstractStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Abstract Status Distribution</h3>
//       <ResponsiveContainer width="100%" height={260}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, value }) => `${name}: ${value}`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // Abstract Trend Chart Component
// const AbstractTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Abstracts"
//           stroke="#3B82F6"
//           strokeWidth={2}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// // Status Snapshot Chart Component
// const StatusSnapshotChart = ({ stats }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Abstract Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart
//         data={[
//           {
//             name: "Abstracts",
//             approved: stats.approved,
//             pending: stats.pending,
//             rejected: stats.rejected,
//           },
//         ]}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approved" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// /* ----------------------------- Main Component ----------------------------- */

// const AbstractSupport = () => {
//   const [abstracts, setAbstracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     rejected: 0,
//     pending: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [teamModalData, setTeamModalData] = useState(null);
//   const [abstractModalData, setAbstractModalData] = useState(null);
//   const [rejectionModalData, setRejectionModalData] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

//   /**
//    * Computes statistics for the dashboard cards.
//    */
//   const computeStats = useCallback((data) => {
//     setStats({
//       total: data.length,
//       approved: data.filter((d) => d.status.toLowerCase() === "approved").length,
//       rejected: data.filter((d) => d.status.toLowerCase() === "rejected").length,
//       pending: data.filter((d) => 
//         d.status.toLowerCase() === "submitted" || 
//         d.status.toLowerCase() === "under review" ||
//         d.status.toLowerCase() === "pending"
//       ).length,
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

//   /**
//    * Formats proof URL to ensure it's a complete, valid URL
//    */
//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     // If it's already a full URL, return as is
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     // If it's a relative path starting with /uploads, prepend the base URL
//     if (url.startsWith('/uploads/')) {
//       return `https://s3conference.ksrce.ac.in${url}`;
//     }
    
//     // If it's just a filename, construct the full path
//     if (url.includes('proof_')) {
//       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
//     }
    
//     // Handle cases where it might already have the full path but missing protocol
//     if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
//       return `https://${url.replace(/^\/+/, '')}`;
//     }
    
//     return url;
//   };

//   // Format each abstract
//   const formatAbstract = (item) => {
//     const teamMembers = item.registration?.participants?.length
//       ? item.registration.participants.map((p) => ({
//           name: p.name || "Unknown",
//           email: p.email || "-",
//           phone: p.phone || "-",
//           designation: p.designation || "-",
//           organisation: p.organisation || "-",
//           gender: p.gender || "-",
//           proofUrl: formatProofUrl(p.proofUrl),
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
//       team: teamMembers,
//       country: item.registration?.country || "-",
//       proofUrl: formatProofUrl(item.registration?.proofUrl),
//       status: (item.workflow?.abstractStatus || "pending").toLowerCase(),
//       createdAt: item.workflow?.createdAt || new Date().toISOString(),
//     };
//   };

//   // Fetch abstracts
//   const fetchAbstracts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://s3conference.ksrce.ac.in/api/admin/users",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = (Array.isArray(data) ? data : []).map(formatAbstract);
//       console.log("this is the data", formatted);
//       // Filter only abstracts with actual content
//       const filteredData = formatted.filter(
//         (item) =>
//           item.content &&
//           item.content.trim() !== "" &&
//           item.content !== "No content available"
//       );

//       setAbstracts(filteredData);
//       computeStats(filteredData);
//       computeTrend(filteredData);
//     } catch (err) {
//       console.error("Error fetching abstracts:", err);
//       setAbstracts([]);
//       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend]);

//   useEffect(() => {
//     fetchAbstracts();
//   }, [fetchAbstracts, refreshTrigger]);

//   // Update local state after successful API call
//   const updateAbstractLocal = useCallback((id, newStatus) => {
//     setAbstracts((prevAbstracts) => {
//       const updatedAbstracts = prevAbstracts.map((abs) => {
//         if (abs.id === id) {
//           return { ...abs, status: newStatus.toLowerCase() };
//         }
//         return abs;
//       });
      
//       computeStats(updatedAbstracts);
//       computeTrend(updatedAbstracts);
//       return updatedAbstracts;
//     });
//   }, [computeStats, computeTrend]);

//   // Search & Filter (Memoized)
//   const filteredAndSearchedAbstracts = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return abstracts.filter((abs) => {
//       const matchesSearch =
//         abs.authorName.toLowerCase().includes(q) ||
//         abs.email.toLowerCase().includes(q) ||
//         abs.uniqueId.toLowerCase().includes(q) ||
//         abs.title.toLowerCase().includes(q) ||
//         abs.userId.toLowerCase().includes(q) ||
//         abs.track.toLowerCase().includes(q);

//       const matchesFilter =
//         isAllStatus || abs.status.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesFilter;
//     });
//   }, [abstracts, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "under review":
//         return "bg-orange-100 text-orange-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "pending":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // Handle Export to Excel
//   const handleExportExcel = () => {
//     if (!filteredAndSearchedAbstracts.length) return alert("No data to export!");

//     const exportData = filteredAndSearchedAbstracts.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       Email: abs.email,
//       "Mobile": abs.mobile,
//       Title: abs.title,
//       Track: abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.status,
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
//     XLSX.writeFile(wb, `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Handle Abstract Status Update
//   const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
//     if (!abstractModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         abstractStatus: newStatus.toLowerCase(),
//       };

//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         payload.abstractrejectedReason = reason;
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${abstractModalData.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Abstract status updated to "${newStatus}"`);
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Unexpected server response.");
//       }
//     } catch (err) {
//       console.error("❌ Error updating abstract status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update abstract status.");
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
//     handleAbstractStatusUpdate("rejected", rejectionReason.trim());
//   };

//   // Handle View Proof - Updated function with better error handling
//   const handleViewProof = async (proofUrl) => {
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     // First, check if the URL is properly formatted
//     let finalUrl = proofUrl;
    
//     // If it's a relative URL, prepend the base URL
//     if (proofUrl.startsWith('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
//     }
    
//     // If it's just a filename without path, construct the full URL
//     if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
//       finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
//     }

//     console.log("Attempting to load proof from:", finalUrl);

//     // Test if the URL is accessible
//     try {
//       const response = await fetch(finalUrl, { method: 'HEAD' });
//       if (response.ok) {
//         // Image is accessible, open preview
//         setImagePreviewUrl(finalUrl);
//       } else {
//         throw new Error(`HTTP ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Failed to load proof image:", error);
//       // Try the original URL as fallback
//       setImagePreviewUrl(finalUrl);
      
//       // Show a more informative error message
//       setTimeout(() => {
//         const errorDiv = document.querySelector('.image-error');
//         if (errorDiv && errorDiv.style.display === 'block') {
//           alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
//         }
//       }, 500);
//     }
//   };

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approved },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending", value: stats.pending },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Abstract Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage abstract submissions, reviews, and approval statuses.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} />
//         <StatCard icon={icons.approved} title="Approved" value={stats.approved} />
//         <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} />
//         <StatCard icon={icons.pending} title="Pending Review" value={stats.pending} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <AbstractStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <AbstractTrendChart data={trend} />

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
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded-lg p-2 text-sm w-full md:w-auto"
//             >
//               <option value="All">All Statuses</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="under review">Under Review</option>
//               <option value="submitted">Submitted</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchAbstracts}
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
//         ) : filteredAndSearchedAbstracts.length === 0 ? (
//           <div className="p-8 text-center text-gray-600">
//             No records match the current filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
//                 <tr>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Author Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Title</th>
//                   <th className="p-3">Track</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedAbstracts.map((abs) => (
//                   <tr key={abs.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {abs.userId}
//                     </td>
//                     <td className="p-3 font-medium">{abs.authorName}</td>
//                     <td className="p-3 text-gray-600">{abs.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{abs.title}</td>
//                     <td className="p-3 text-gray-600">{abs.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           abs.status
//                         )}`}
//                       >
//                         {abs.status.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(abs.team) && abs.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(abs)}
//                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
//                         >
//                           <Users className="w-4 h-4" /> View
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setAbstractModalData(abs)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Review
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

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
//                     <th className="p-2 text-left">Designation</th>
//                     <th className="p-2 text-left">Organisation</th>
//                     <th className="p-2 text-left">Gender</th>
//                     <th className="p-2 text-left">Proof</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {teamModalData.team.map((member, i) => (
//                     <tr key={i}>
//                       <td className="p-2">{member.name || "Unnamed"}</td>
//                       <td className="p-2">{member.email || "-"}</td>
//                       <td className="p-2">{member.phone || "-"}</td>
//                       <td className="p-2">{member.designation || "-"}</td>
//                       <td className="p-2">{member.organisation || "-"}</td>
//                       <td className="p-2">{member.gender || "-"}</td>
//                       <td className="p-2">
//                         {member.proofUrl ? (
//                           <button
//                             onClick={() => handleViewProof(member.proofUrl)}
//                             className="text-blue-500 hover:underline text-xs flex items-center gap-1"
//                           >
//                             <Eye className="w-3 h-3" /> View Proof
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

//       {/* Abstract Review Modal */}
//       {abstractModalData && (
//         <Modal onClose={() => setAbstractModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Abstract Review: {abstractModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {abstractModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(abstractModalData.status)}`}>
//                 {abstractModalData.status.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Abstract Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {abstractModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {abstractModalData.email}</p>
//                 <p><strong>Mobile:</strong> {abstractModalData.mobile}</p>
//                 <p><strong>Country:</strong> {abstractModalData.country}</p>
//               </div>
//             </div>

//             <div className="p-3 border rounded-lg max-h-60 overflow-y-auto">
//               <h4 className="font-bold mb-2">Abstract Content</h4>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {abstractModalData.content}
//               </p>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(abstractModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handleAbstractStatusUpdate("approved")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Approve"}
//               </button>

//               <button
//                 onClick={() => handleAbstractStatusUpdate("under review")}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" />
//                 {actionLoading ? "Processing..." : "Mark Under Review"}
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Rejection Modal */}
//       {rejectionModalData && (
//         <Modal onClose={() => setRejectionModalData(null)} size="md">
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this abstract.
//             </p>
//             <textarea
//               rows="4"
//               className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
//               placeholder="Write rejection reason here..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//             ></textarea>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setRejectionModalData(null)}
//                 className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRejectionSubmit}
//                 disabled={actionLoading || !rejectionReason.trim()}
//                 className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {actionLoading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <XCircle className="w-4 h-4" />
//                 )}
//                 Reject Abstract
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Image Preview Modal */}
//       {imagePreviewUrl && (
//         <ImagePreviewModal 
//           imageUrl={imagePreviewUrl} 
//           onClose={() => setImagePreviewUrl(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default AbstractSupport;

import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Loader2,
  Download,
  X,
  Users,
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/* ----------------------------- Small Components & Utils ----------------------------- */

// Icon map
const icons = {
  total: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
    </svg>
  ),
  approved: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  rejected: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  pending: (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
    </svg>
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

// Image Preview Modal
const ImagePreviewModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
        <button 
          onClick={onClose} 
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Proof Document Preview</h3>
        </div>
        <div className="p-4 max-h-[70vh] overflow-auto">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Proof Document" 
              className="w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
                const errorDiv = e.target.parentNode.querySelector('.image-error');
                if (errorDiv) errorDiv.style.display = 'block';
              }}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              No image available
            </div>
          )}
          <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
            <p>Failed to load image.</p>
            <p className="text-sm text-gray-600 break-all mt-2">{imageUrl}</p>
          </div>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-500 break-all flex-1 mr-4">
            {imageUrl}
          </span>
          <button 
            onClick={() => window.open(imageUrl, '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Open in New Tab
          </button>
        </div>
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

// Abstract Status Pie Chart Component
const AbstractStatusPie = ({ data }) => {
  const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280"];
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-3">Abstract Status Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Abstract Trend Chart Component
const AbstractTrendChart = ({ data }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Abstract Submission Trend</h3>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          name="Abstracts"
          stroke="#3B82F6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Status Snapshot Chart Component
const StatusSnapshotChart = ({ stats }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Abstract Status Snapshot</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={[
          {
            name: "Abstracts",
            approved: stats.approved,
            pending: stats.pending,
            rejected: stats.rejected,
          },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="approved" name="Approved" fill="#10B981" />
        <Bar dataKey="pending" name="Pending" fill="#F59E0B" />
        <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
      </BarChart>
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

const AbstractSupport = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [trend, setTrend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [teamModalData, setTeamModalData] = useState(null);
  const [abstractModalData, setAbstractModalData] = useState(null);
  const [rejectionModalData, setRejectionModalData] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  /**
   * Computes statistics for the dashboard cards.
   */
  const computeStats = useCallback((data) => {
    setStats({
      total: data.length,
      approved: data.filter((d) => d.status.toLowerCase() === "approved").length,
      rejected: data.filter((d) => d.status.toLowerCase() === "rejected").length,
      pending: data.filter((d) => 
        d.status.toLowerCase() === "submitted" || 
        d.status.toLowerCase() === "under review" ||
        d.status.toLowerCase() === "pending"
      ).length,
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

  /**
   * Formats proof URL to ensure it's a complete, valid URL
   */
  const formatProofUrl = (url) => {
    if (!url) return null;
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative path starting with /uploads, prepend the base URL
    if (url.startsWith('/uploads/')) {
      return `https://s3conference.ksrce.ac.in${url}`;
    }
    
    // If it's just a filename, construct the full path
    if (url.includes('proof_')) {
      return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
    }
    
    // Handle cases where it might already have the full path but missing protocol
    if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
      return `https://${url.replace(/^\/+/, '')}`;
    }
    
    return url;
  };

  // Format each abstract
  const formatAbstract = (item) => {
    const teamMembers = item.registration?.participants?.length
      ? item.registration.participants.map((p) => ({
          name: p.name || "Unknown",
          email: p.email || "-",
          phone: p.phone || "-",
          designation: p.designation || "-",
          organisation: p.organisation || "-",
          gender: p.gender || "-",
          proofUrl: formatProofUrl(p.proofUrl),
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
      team: teamMembers,
      country: item.registration?.country || "-",
      proofUrl: formatProofUrl(item.registration?.proofUrl),
      status: (item.workflow?.abstractStatus || "pending").toLowerCase(),
      createdAt: item.workflow?.createdAt || new Date().toISOString(),
    };
  };

  // Fetch abstracts
  const fetchAbstracts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formatted = (Array.isArray(data) ? data : []).map(formatAbstract);
      console.log("this is the data", formatted);
      // Filter only abstracts with actual content
      const filteredData = formatted.filter(
        (item) =>
          item.content &&
          item.content.trim() !== "" &&
          item.content !== "No content available"
      );

      setAbstracts(filteredData);
      computeStats(filteredData);
      computeTrend(filteredData);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching abstracts:", err);
      setAbstracts([]);
      setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend]);

  useEffect(() => {
    fetchAbstracts();
  }, [fetchAbstracts, refreshTrigger]);

  // Update local state after successful API call
  const updateAbstractLocal = useCallback((id, newStatus) => {
    setAbstracts((prevAbstracts) => {
      const updatedAbstracts = prevAbstracts.map((abs) => {
        if (abs.id === id) {
          return { ...abs, status: newStatus.toLowerCase() };
        }
        return abs;
      });
      
      computeStats(updatedAbstracts);
      computeTrend(updatedAbstracts);
      return updatedAbstracts;
    });
  }, [computeStats, computeTrend]);

  // Search & Filter (Memoized)
  const filteredAndSearchedAbstracts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = statusFilter.toLowerCase() === "all";

    return abstracts.filter((abs) => {
      const matchesSearch =
        abs.authorName.toLowerCase().includes(q) ||
        abs.email.toLowerCase().includes(q) ||
        abs.uniqueId.toLowerCase().includes(q) ||
        abs.title.toLowerCase().includes(q) ||
        abs.userId.toLowerCase().includes(q) ||
        abs.track.toLowerCase().includes(q);

      const matchesFilter =
        isAllStatus || abs.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [abstracts, searchTerm, statusFilter]);

  // Pagination logic
  const paginatedAbstracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedAbstracts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSearchedAbstracts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSearchedAbstracts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Badge Styling
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "under review":
        return "bg-orange-100 text-orange-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    if (!filteredAndSearchedAbstracts.length) return alert("No data to export!");

    const exportData = filteredAndSearchedAbstracts.map((abs) => ({
      "Unique ID": abs.uniqueId,
      "User ID": abs.userId,
      "Author Name": abs.authorName,
      Email: abs.email,
      "Mobile": abs.mobile,
      Title: abs.title,
      Track: abs.track,
      "Presentation Mode": abs.presentationMode,
      "Abstract Status": abs.status,
      "Country": abs.country,
      "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
    XLSX.writeFile(wb, `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Handle Abstract Status Update
  const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
    if (!abstractModalData) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        abstractStatus: newStatus.toLowerCase(),
      };

      if (newStatus.toLowerCase() === "rejected" && reason) {
        payload.abstractrejectedReason = reason;
      }

      const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${abstractModalData.id}`;

      const response = await axios.put(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        alert(`✅ Abstract status updated to "${newStatus}"`);
        updateAbstractLocal(abstractModalData.id, newStatus);
        setAbstractModalData(null);
        setRejectionModalData(null);
        setRejectionReason("");
        setRefreshTrigger(prev => !prev);
      } else {
        alert(response.data?.message || "Unexpected server response.");
      }
    } catch (err) {
      console.error("❌ Error updating abstract status:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update abstract status.");
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
    handleAbstractStatusUpdate("rejected", rejectionReason.trim());
  };

  // Handle View Proof - Updated function with better error handling
  const handleViewProof = async (proofUrl) => {
    if (!proofUrl) {
      alert("No proof available for this team member.");
      return;
    }

    // First, check if the URL is properly formatted
    let finalUrl = proofUrl;
    
    // If it's a relative URL, prepend the base URL
    if (proofUrl.startsWith('/')) {
      finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
    }
    
    // If it's just a filename without path, construct the full URL
    if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
      finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
    }

    console.log("Attempting to load proof from:", finalUrl);

    // Test if the URL is accessible
    try {
      const response = await fetch(finalUrl, { method: 'HEAD' });
      if (response.ok) {
        // Image is accessible, open preview
        setImagePreviewUrl(finalUrl);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to load proof image:", error);
      // Try the original URL as fallback
      setImagePreviewUrl(finalUrl);
      
      // Show a more informative error message
      setTimeout(() => {
        const errorDiv = document.querySelector('.image-error');
        if (errorDiv && errorDiv.style.display === 'block') {
          alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
        }
      }, 500);
    }
  };

  // Pie Chart Data
  const pieChartData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Abstract Support</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage abstract submissions, reviews, and approval statuses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={icons.total} title="Total Abstracts" value={stats.total} />
        <StatCard icon={icons.approved} title="Approved" value={stats.approved} />
        <StatCard icon={icons.rejected} title="Rejected" value={stats.rejected} />
        <StatCard icon={icons.pending} title="Pending Review" value={stats.pending} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusSnapshotChart stats={stats} />
        <AbstractStatusPie data={pieChartData} />
      </div>

      {/* Trend Chart */}
      <AbstractTrendChart data={trend} />

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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg p-2 text-sm w-full md:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="under review">Under Review</option>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={fetchAbstracts}
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
        ) : filteredAndSearchedAbstracts.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No records match the current filters.
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
                    <th className="p-3">Title</th>
                    <th className="p-3">Track</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Team</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedAbstracts.map((abs) => (
                    <tr key={abs.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs text-gray-600">
                        {abs.userId}
                      </td>
                      <td className="p-3 font-medium">{abs.authorName}</td>
                      <td className="p-3 text-gray-600">{abs.email}</td>
                      <td className="p-3 text-gray-600 max-w-xs truncate">{abs.title}</td>
                      <td className="p-3 text-gray-600">{abs.track}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                            abs.status
                          )}`}
                        >
                          {abs.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {Array.isArray(abs.team) && abs.team.length ? (
                          <button
                            onClick={() => setTeamModalData(abs)}
                            className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
                          >
                            <Users className="w-4 h-4" /> View
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setAbstractModalData(abs)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                        >
                          Review
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
                    <th className="p-2 text-left">Designation</th>
                    <th className="p-2 text-left">Organisation</th>
                    <th className="p-2 text-left">Gender</th>
                    <th className="p-2 text-left">Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamModalData.team.map((member, i) => (
                    <tr key={i}>
                      <td className="p-2">{member.name || "Unnamed"}</td>
                      <td className="p-2">{member.email || "-"}</td>
                      <td className="p-2">{member.phone || "-"}</td>
                      <td className="p-2">{member.designation || "-"}</td>
                      <td className="p-2">{member.organisation || "-"}</td>
                      <td className="p-2">{member.gender || "-"}</td>
                      <td className="p-2">
                        {member.proofUrl ? (
                          <button
                            onClick={() => handleViewProof(member.proofUrl)}
                            className="text-blue-500 hover:underline text-xs flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" /> View Proof
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

      {/* Abstract Review Modal */}
      {abstractModalData && (
        <Modal onClose={() => setAbstractModalData(null)} size="lg">
          <h2 className="text-xl font-bold mb-2">
            Abstract Review: {abstractModalData.authorName}
          </h2>
          <p className="text-gray-600 mb-4">
            Title: {abstractModalData.title}
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
              <span className="font-semibold">Current Status:</span>
              <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(abstractModalData.status)}`}>
                {abstractModalData.status.toUpperCase()}
              </span>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="font-bold mb-2">Abstract Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Track:</strong> {abstractModalData.track}</p>
                <p><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</p>
                <p><strong>Email:</strong> {abstractModalData.email}</p>
                <p><strong>Mobile:</strong> {abstractModalData.mobile}</p>
                <p><strong>Country:</strong> {abstractModalData.country}</p>
              </div>
            </div>

            <div className="p-3 border rounded-lg max-h-60 overflow-y-auto">
              <h4 className="font-bold mb-2">Abstract Content</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {abstractModalData.content}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setRejectionModalData(abstractModalData);
                  setRejectionReason("");
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              
              <button
                onClick={() => handleAbstractStatusUpdate("approved")}
                disabled={actionLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> 
                {actionLoading ? "Processing..." : "Approve"}
              </button>

              <button
                onClick={() => handleAbstractStatusUpdate("under review")}
                disabled={actionLoading}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {actionLoading ? "Processing..." : "Mark Under Review"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Rejection Modal */}
      {rejectionModalData && (
        <Modal onClose={() => setRejectionModalData(null)} size="md">
          <div className="text-center p-4">
            <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
            <p className="text-gray-500 mb-4">
              Please provide a reason for rejecting this abstract.
            </p>
            <textarea
              rows="4"
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Write rejection reason here..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex gap-3">
              <button
                onClick={() => setRejectionModalData(null)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleRejectionSubmit}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Reject Abstract
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Image Preview Modal */}
      {imagePreviewUrl && (
        <ImagePreviewModal 
          imageUrl={imagePreviewUrl} 
          onClose={() => setImagePreviewUrl(null)} 
        />
      )}
    </div>
  );
};

export default AbstractSupport;