
// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import axios from "axios";
// // import * as XLSX from "xlsx"; // For Excel export

// // import {
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   Legend,
// // } from "recharts";
// // import {
// //   Loader2,
// //   Download,
// //   X,
// //   Users, // Used for team icon
// //   Search, // Used for search icon
// // } from "lucide-react";

// // /* ----------------------------- Small Components & Utils ----------------------------- */

// // // Icon map (Moved outside to prevent re-creation)
// // const icons = {
// //   total: (
// //     <svg
// //       className="w-6 h-6 text-blue-500"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth="2"
// //         d="M3 7h18M3 12h18M3 17h18"
// //       ></path>
// //     </svg>
// //   ),
// //   approvedPaper: (
// //     <svg
// //       className="w-6 h-6 text-green-500"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth="2"
// //         d="M5 13l4 4L19 7"
// //       ></path>
// //     </svg>
// //   ),
// //   pendingPaper: (
// //     <svg
// //       className="w-6 h-6 text-yellow-500"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth="2"
// //         d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
// //       ></path>
// //     </svg>
// //   ),
// //   rejected: (
// //     <svg
// //       className="w-6 h-6 text-red-500"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth="2"
// //         d="M6 18L18 6M6 6l12 12"
// //       ></path>
// //     </svg>
// //   ),
// //   noPaper: (
// //     <svg
// //       className="w-6 h-6 text-gray-500"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth="2"
// //         d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"
// //       ></path>
// //     </svg>
// //   ),
// // };

// // // Reusable Modal Component
// // const Modal = ({ children, onClose, size = "md" }) => {
// //   const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
// //   return (
// //     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div
// //         className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}
// //       >
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl"
// //         >
// //           <X className="w-6 h-6" />
// //         </button>
// //         {children}
// //       </div>
// //     </div>
// //   );
// // };

// // // Stat Card
// // const StatCard = ({ icon, title, value, hint }) => (
// //   <div className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition">
// //     <div className="flex items-start justify-between">
// //       <div>
// //         <div className="text-sm text-gray-500 font-medium">{title}</div>
// //         <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
// //         {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
// //       </div>
// //       <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
// //     </div>
// //   </div>
// // );

// // /* ----------------------------- Main Component ----------------------------- */

// // const FinalPaperSupport = () => {
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     approvedPaper: 0,
// //     noPaper: 0,
// //     rejected: 0,
// //     pending: 0,
// //   });
// //   const [trend, setTrend] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("All");
// //   const [teamModalData, setTeamModalData] = useState(null);

// //   // New state for combined Action/Discount Modal
// //   const [actionModalData, setActionModalData] = useState(null);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   // Renamed from discountValue to simply track if discount is applied (Yes/No)
// //   const [isDiscountApplied, setIsDiscountApplied] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [newPaperStatus, setNewPaperStatus] = useState("");
// //   const [downloading, setDownloading] = useState(false); // New state for download loading

// //   /**
// //    * Computes statistics for the dashboard cards.
// //    * @param {Array<Object>} data - The full array of formatted abstract rows.
// //    */
// //   const computeStats = useCallback((data) => {
// //     // Corresponds to 'submitted' and 'correction required' in the database enum
// //     const submittedOrPending = ["submitted", "correction required"]; 
// //     setStats({
// //       total: data.length,
// //       approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
// //       noPaper: data.filter((d) => d.paperStatus === "no paper").length,
// //       rejected: data.filter((d) => d.paperStatus === "rejected").length,
// //       pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
// //     });
// //   }, []);

// //   /**
// //    * Computes the submission trend based on the creation date.
// //    * @param {Array<Object>} data - The full array of formatted abstract rows.
// //    */
// //   const computeTrend = useCallback((data) => {
// //     const groups = {};
// //     data.forEach((d) => {
// //       // Use the abstract creation date for trend tracking
// //       const date = new Date(d.createdAt).toISOString().split("T")[0];
// //       groups[date] = (groups[date] || 0) + 1;
// //     });
// //     const arr = Object.entries(groups)
// //       .map(([date, count]) => ({ date, count }))
// //       .sort((a, b) => new Date(a.date) - new Date(b.date));
// //     setTrend(arr);
// //   }, []);

// //   // Format each user (from old component, enhanced)
// //   const formatUser = (item) => {
// //     // Determine discount status based on any indication of a discount
// //     const isDiscount =
// //       item.workflow?.discountApplied === true ||
// //       item.workflow?.discount === true ||
// //       item.workflow?.discountApplied === "true" ||
// //       item.workflow?.discount === "true" ||
// //       (item.workflow?.discount || 0) > 0;

// //     // FIX: Prioritize finalPaperUrl, but fallback to old paperUrl from registration 
// //     const finalPaperLink = 
// //       item.workflow?.finalPaperUrl || // New, preferred path
// //       item.registration?.paperUrl ||  // Old, fallback path (from your previous code)
// //       null;

// //     return {
// //       id: item._id,
// //       userId: item.userId || "N/A",
// //       authorName: item.name || "Unknown",
// //       email: item.registration?.participants?.[0]?.email || "-",
// //       mobile: item.registration?.participants?.[0]?.phone || "-",
// //       uniqueId: item.registration?.uniqueId || "-",
// //       track: item.registration?.track || "-",
// //       title: item.registration?.abstractTitle || "No Title",
// //       abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
// //       paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
// //       paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
// //       amountPaid: Number(item.workflow?.amountPaid || 0),
// //       discount: item.workflow?.discount ?? 0,
// //       discountApplied: isDiscount,
// //       createdAt: item.workflow?.createdAt || new Date().toISOString(),
// //       team: item.registration?.participants?.slice(1) || [], // Assuming first participant is the author
// //       finalPaperUrl: finalPaperLink,
// //       proofUrl: item.registration?.participants?.[0]?.proofUrl || null,
// //     };
// //   };

// //   // Fetch approved abstracts
// //   const fetchRows = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const { data } = await axios.get(
// //         "http://localhost:5000/api/admin/users",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const formatted = (Array.isArray(data) ? data : []).map(formatUser);
// //       // Filter only abstracts with approved status, as this component is for "Final Paper Support"
// //       const approved = formatted.filter(
// //         (f) => f.abstractStatus === "approved"
// //       );
      
// //       setRows(approved);
// //       computeStats(approved);
// //       computeTrend(approved);
// //     } catch (err) {
// //       console.error("Error fetching:", err);
// //       setRows([]);
// //       setStats({
// //         total: 0,
// //         approvedPaper: 0,
// //         noPaper: 0,
// //         rejected: 0,
// //         pending: 0,
// //       });
// //       setTrend([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [computeStats, computeTrend]);

// //   useEffect(() => {
// //     fetchRows();
// //   }, [fetchRows]);

// //   // Update local state after successful API call
// //   const updateAbstractLocal = useCallback((id, newStatus, discountBoolean) => {
// //     setRows((prevRows) => {
// //       const updatedRows = prevRows.map((row) => {
// //         if (row.id === id) {
// //           return {
// //             ...row,
// //             paperStatus: newStatus,
// //             discountApplied: discountBoolean,
// //             // Reflect the discount change locally. The actual amount is handled by the backend.
// //             discount: discountBoolean ? 1 : 0, 
// //           };
// //         }
// //         return row;
// //       });
      
// //       // IMPORTANT: Update stats and trend with the NEW set of rows
// //       computeStats(updatedRows);
// //       computeTrend(updatedRows);

// //       return updatedRows;
// //     });
// //   }, [computeStats, computeTrend]); // Dependencies added

// //   // Search & Filter (Memoized)
// //   const filteredAndSearchedRows = useMemo(() => {
// //     const q = searchTerm.trim().toLowerCase();
// //     const isAllStatus = statusFilter.toLowerCase() === "all";

// //     return rows.filter((r) => {
// //       const matchesSearch =
// //         r.authorName.toLowerCase().includes(q) ||
// //         r.email.toLowerCase().includes(q) ||
// //         r.uniqueId.toLowerCase().includes(q) ||
// //         r.title.toLowerCase().includes(q) ||
// //         r.userId.toLowerCase().includes(q);

// //       const matchesFilter =
// //         isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

// //       return matchesSearch && matchesFilter;
// //     });
// //   }, [rows, searchTerm, statusFilter]);

// //   // Badge Styling
// //   const getStatusBadgeClass = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "approved":
// //         return "bg-green-100 text-green-700";
// //       case "rejected":
// //         return "bg-red-100 text-red-700";
// //       case "under review":
// //         // Fallback/Legacy status style
// //         return "bg-orange-100 text-orange-700"; 
// //       case "submitted":
// //         return "bg-blue-100 text-blue-700";
// //       case "correction required":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "no paper":
// //         return "bg-gray-100 text-gray-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   // Handle Export to Excel
// //   const handleExportExcel = () => {
// //     if (!filteredAndSearchedRows.length) return alert("No data to export!");

// //     const exportData = filteredAndSearchedRows.map((abs) => ({
// //       "Unique ID": abs.uniqueId,
// //       "User ID": abs.userId,
// //       "Author Name": abs.authorName,
// //       Email: abs.email,
// //       Title: abs.title,
// //       Track: abs.track,
// //       "Abstract Status": abs.abstractStatus,
// //       "Final Paper Status": abs.paperStatus,
// //       "Payment Status": abs.paymentStatus,
// //       "Amount Paid": abs.amountPaid,
// //       // Change to Yes/No for export consistency
// //       "Discount Applied": abs.discountApplied ? "Yes" : "No",
// //       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
// //       "Final Paper Link": abs.finalPaperUrl || "N/A",
// //     }));

// //     const ws = XLSX.utils.json_to_sheet(exportData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
// //     XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
// //   };
  
// //   // --- NEW DOWNLOAD FUNCTION TO PREVENT CORRUPTION ---
  
// // const handleForceDownload = async (fileUrl, userId) => {
// //   if (!fileUrl) return alert("No file found to download.");

// //   try {
// //     setDownloading(true);
// //     const downloadUrl = `http://localhost:5000${fileUrl}`;
// //     console.log("⬇️ Downloading:", downloadUrl);

// //     // 🧩 Use userId for naming
// //     const customFileName = `Final_Paper_${userId}.docx`;

// //     const response = await fetch(downloadUrl);
// //     const blob = await response.blob();
// //     const blobUrl = window.URL.createObjectURL(blob);

// //     const link = document.createElement("a");
// //     link.href = blobUrl;
// //     link.download = customFileName; // ✅ only one line
// //     document.body.appendChild(link);
// //     link.click();
// //     link.remove();

// //     window.URL.revokeObjectURL(blobUrl);
// //   } catch (err) {
// //     console.error("❌ Download error:", err);
// //   } finally {
// //     setDownloading(false);
// //   }
// // };
// //   // --- END NEW DOWNLOAD FUNCTION ---


// //   // Handle Action Modal Submission (Combined Discount & Status Update)
// //   const handleActionSubmit = async () => {
// //     if (!actionModalData) return;

// //     const statusToUse = newPaperStatus;
// //     const discountBoolean = isDiscountApplied;

// //     // Require a status selection for a full submit
// //     if (!statusToUse) {
// //       return alert("⚠️ Please select a new final paper status to update.");
// //     }

// //     setActionLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const formData = new FormData();

// //       formData.append("paperAction", statusToUse);
// //       // Backend expects 'discount' and 'discountApplied' which we will map from the boolean state
// //       formData.append("discount", discountBoolean);
// //       formData.append("discountApplied", discountBoolean);

// //       // Add file only if it's set
// //       if (selectedFile) {
// //         formData.append("file", selectedFile);
// //       }

// //       const API_URL = `http://localhost:5000/api/admin/update/${actionModalData.id}`;

// //       const response = await axios.put(API_URL, formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           // Axios handles the Content-Type for FormData automatically
// //         },
// //       });

// //       if (response.data?.success) {
// //         alert(
// //           `✅ Final paper status updated to "${statusToUse}"${
// //             discountBoolean ? " with discount applied." : "."
// //           }`
// //         );
// //         // Update local state and close modal
// //         updateAbstractLocal(actionModalData.id, statusToUse, discountBoolean); // Corrected order of arguments for updateAbstractLocal
// //         closeActionModal();
// //       } else {
// //         alert(response.data?.message || "Unexpected server response.");
// //       }
// //     } catch (err) {
// //       console.error("❌ Error updating paper/discount:", err.response?.data || err.message);
// //       alert(err.response?.data?.message || "Failed to process action.");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Helper to open the combined action modal
// //   const openActionModal = (row) => {
// //     setActionModalData(row);
// //     // Use the stored boolean state for the checkbox
// //     setIsDiscountApplied(row.discountApplied);
// //     setNewPaperStatus(row.paperStatus); // Pre-select current status
// //     setSelectedFile(null); // Clear any previous file selection
// //   };

// //   // Helper to handle closing the modal and resetting state
// //   const closeActionModal = () => {
// //     setActionModalData(null);
// //     setIsDiscountApplied(false);
// //     setSelectedFile(null);
// //     setNewPaperStatus("");
// //   };

// //   // Handle View Proof (for team members)
// //   const handleViewProof = (proofUrl) => {
// //     if (!proofUrl) return alert("No proof available.");
// //     // Simple URL validation (assuming backend serves a full URL)
// //     if (proofUrl.startsWith("http")) window.open(proofUrl, "_blank");
// //     else alert("Invalid proof URL: " + proofUrl);
// //   };

// //   /* ----------------------------- JSX ----------------------------- */
// //   return (
// //     <div className="space-y-6 p-4">
// //       <div>
// //         <h1 className="text-2xl font-bold">Final Paper Support</h1>
// //         <p className="text-sm text-gray-500 mt-1">
// //           Manage final paper uploads, discounts, and approval statuses for **approved abstracts** only.
// //         </p>
// //       </div>

// //       {/* --- */}

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
// //         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
// //         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
// //         <StatCard icon={icons.pendingPaper} title="Submitted / Correction Required" value={stats.pending} />
// //         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
// //         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
// //       </div>

// //       {/* --- */}

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white p-4 rounded-2xl shadow">
// //           <h3 className="text-lg font-semibold mb-3">Paper Status</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             <BarChart
// //               data={[
// //                 {
// //                   name: "Papers",
// //                   approvedPaper: stats.approvedPaper,
// //                   pending: stats.pending,
// //                   rejected: stats.rejected,
// //                   noPaper: stats.noPaper,
// //                 },
// //               ]}
// //             >
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" hide />
// //               <YAxis allowDecimals={false} />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
// //               <Bar dataKey="pending" name="Submitted/Correction" fill="#F59E0B" />
// //               <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
// //               <Bar dataKey="noPaper" name="No Paper" fill="#9CA3AF" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-white p-4 rounded-2xl shadow">
// //           <h3 className="text-lg font-semibold mb-3">Submission Trend (Abstract)</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             <LineChart data={trend}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis allowDecimals={false} />
// //               <Tooltip />
// //               <Line
// //                 type="monotone"
// //                 dataKey="count"
// //                 name="Abstracts"
// //                 stroke="#3B82F6"
// //                 strokeWidth={2}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* --- */}

// //       {/* Table Section */}
// //       <div className="bg-white rounded-2xl shadow border overflow-hidden">
// //         {/* Toolbar (Search & Filter) */}
// //         <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
// //           <div className="flex items-center gap-3 w-full md:w-auto">
// //             <div className="flex items-center border rounded-lg overflow-hidden bg-white w-full md:w-72">
// //               <Search className="w-5 h-5 ml-3 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by ID, name, email, or title..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="px-3 py-2 outline-none text-sm w-full"
// //               />
// //               <button
// //                 onClick={() => setSearchTerm("")}
// //                 className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
// //               >
// //                 Clear
// //               </button>
// //             </div>

// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="border rounded-lg p-2 text-sm w-full md:w-auto"
// //             >
// //               <option value="All">All Paper Statuses</option>
// //               <option value="submitted">Submitted</option>
// //               <option value="correction required">Correction Required</option>
// //               <option value="approved">Approved</option>
// //               <option value="rejected">Rejected</option>
// //               <option value="no paper">No Paper</option>
// //             </select>
// //           </div>

// //           <div className="flex items-center gap-2 w-full md:w-auto">
// //             <button
// //               onClick={fetchRows}
// //               className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full md:w-auto"
// //               disabled={loading}
// //             >
// //               {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh Data'}
// //             </button>
// //             <button
// //               onClick={handleExportExcel}
// //               className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 w-full md:w-auto"
// //             >
// //               <Download className="w-4 h-4" /> Export Excel
// //             </button>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         {loading ? (
// //           <div className="flex items-center justify-center p-10">
// //             <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
// //           </div>
// //         ) : filteredAndSearchedRows.length === 0 ? (
// //           <div className="p-8 text-center text-gray-600">
// //             No records match the current filters.
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full text-sm divide-y divide-gray-200">
// //               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
// //                 <tr>
// //                   <th className="p-3">User ID</th>
// //                   <th className="p-3">Author Name</th>
// //                   <th className="p-3">Email</th>
// //                   <th className="p-3">Title</th>
// //                   <th className="p-3 text-center">Paper Status</th>
// //                   <th className="p-3 text-center">Discount</th>
// //                   <th className="p-3 text-center">Team</th>
// //                   <th className="p-3 text-center">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-100">
// //                 {filteredAndSearchedRows.map((r) => (
// //                   <tr key={r.id} className="hover:bg-gray-50">
// //                     <td className="p-3 font-mono text-xs text-gray-600">
// //                       {r.userId}
// //                     </td>
// //                     <td className="p-3 font-medium">{r.authorName}</td>
// //                     <td className="p-3 text-gray-600">{r.email}</td>
// //                     <td className="p-3 text-gray-600">{r.title}</td>
// //                     <td className="p-3 text-center">
// //                       <span
// //                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
// //                           r.paperStatus
// //                         )}`}
// //                       >
// //                         {r.paperStatus.toUpperCase()}
// //                       </span>
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       {/* SIMPLIFIED DISCOUNT DISPLAY: YES/NO ONLY */}
// //                       {r.discountApplied ? (
// //                         <span className="text-emerald-600 font-semibold">
// //                           Yes
// //                         </span>
// //                       ) : (
// //                         <span className="text-gray-400">No</span>
// //                       )}
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       {Array.isArray(r.team) && r.team.length ? (
// //                         <button
// //                           onClick={() => setTeamModalData(r)}
// //                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
// //                         >
// //                           <Users className="w-4 h-4" /> View
// //                         </button>
// //                       ) : (
// //                         "-"
// //                       )}
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       <button
// //                         onClick={() => openActionModal(r)}
// //                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
// //                       >
// //                         Actions
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       {/* --- */}

// //       {/* Team Modal */}
// //       {teamModalData && (
// //         <Modal onClose={() => setTeamModalData(null)} size="lg">
// //           <h3 className="text-xl font-bold mb-4">
// //             Team Members for "{teamModalData.title}"
// //           </h3>
// //           {Array.isArray(teamModalData.team) && teamModalData.team.length ? (
// //             <div className="overflow-x-auto max-h-[70vh]">
// //               <table className="min-w-full divide-y divide-gray-200 text-sm">
// //                 <thead className="bg-gray-100 sticky top-0">
// //                   <tr>
// //                     <th className="p-2 text-left">Name</th>
// //                     <th className="p-2 text-left">Email</th>
// //                     <th className="p-2 text-left">Phone</th>
// //                     <th className="p-2 text-left">Organisation</th>
// //                     <th className="p-2 text-left">Proof</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {teamModalData.team.map((member, i) => (
// //                     <tr key={i}>
// //                       <td className="p-2">{member.name || "Unnamed"}</td>
// //                       <td className="p-2">{member.email || "-"}</td>
// //                       <td className="p-2">{member.phone || "-"}</td>
// //                       <td className="p-2">{member.organisation || "-"}</td>
// //                       <td className="p-2">
// //                         {member.proofUrl ? (
// //                           <button
// //                             onClick={() => handleViewProof(member.proofUrl)}
// //                             className="text-blue-500 hover:underline text-xs"
// //                           >
// //                             View Proof
// //                           </button>
// //                         ) : (
// //                           "-"
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <p>No team members available.</p>
// //           )}
// //         </Modal>
// //       )}

// //       {/* Action / Discount / Status Modal */}
// //       {actionModalData && (
// //         <Modal onClose={closeActionModal} size="md">
// //           <h2 className="text-xl font-bold mb-2">
// //             Final Paper Actions: {actionModalData.authorName}
// //           </h2>
// //           <p className="text-gray-600 mb-4">
// //             Title: {actionModalData.title.substring(0, 70)}...
// //           </p>

// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
// //               <span className="font-semibold">Current Paper Status:</span>
// //               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(actionModalData.paperStatus)}`}>
// //                 {actionModalData.paperStatus.toUpperCase()}
// //               </span>
// //             </div>

// //             {/* Final Paper Download - NOW USES FUNCTION TO PREVENT CORRUPTION */}
// //             <div className="p-3 border rounded-lg flex justify-between items-center">
// //               <span className="font-medium text-gray-700">Uploaded Paper:</span>
// //               {actionModalData.finalPaperUrl ? (
// //                 <button
// //                     onClick={() => handleForceDownload(actionModalData.finalPaperUrl, actionModalData.uniqueId)}
// //                     disabled={downloading}
// //                     className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
// //                 >
// //                     {downloading ? (
// //                       <Loader2 className="h-4 w-4 animate-spin" />
// //                     ) : (
// //                       'Download Paper (DOCX)'
// //                     )}
// //                 </button>
// //               ) : (
// //                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
// //               )}
// //             </div>

// //             {/* Discount Section - Simplified to Checkbox */}
// //             <div className="border p-4 rounded-lg">
// //               <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                 Discount Status
// //               </label>
// //               <div className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id="discountApplied"
// //                   checked={isDiscountApplied}
// //                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
// //                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
// //                 />
// //                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
// //                   **Discount Applied (Yes/No)**
// //                 </label>
// //               </div>
// //               <p className="text-xs text-gray-500 mt-1">Check this box to grant or uncheck to revoke the discount.</p>
// //             </div>

// //             {/* Status Update Section */}
// //             <div className="border-t pt-4">
// //               <h4 className="font-bold mb-3">Update Final Paper Status</h4>

// //               <div className="mb-4">
// //                 <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                   New Status
// //                 </label>
// //                 <select
// //                   value={newPaperStatus}
// //                   onChange={(e) => setNewPaperStatus(e.target.value)}
// //                   className="w-full p-2 border rounded"
// //                 >
// //                   <option value="">-- Select Status --</option>
// //                   <option value="approved">Approved</option>
// //                   <option value="rejected">Rejected</option>
// //                   <option value="correction required">Correction Required</option>
// //                   <option value="no paper">No Paper</option>
// //                   <option value="submitted">Submitted</option>
// //                 </select>
// //               </div>

// //               {/* Optional File Upload for Correction/Update */}
// //               <div className="mb-4">
// //                 <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                   Upload Correction/Approval File (Optional)
// //                 </label>
// //                 <input
// //                   type="file"
// //                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
// //                   className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
// //                 />
// //                 {selectedFile && (
// //                   <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
// //                 )}
// //               </div>

// //               <div className="flex justify-end gap-2">
// //                 <button
// //                   onClick={closeActionModal}
// //                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
// //                   disabled={actionLoading}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleActionSubmit}
// //                   disabled={actionLoading || !newPaperStatus}
// //                   className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
// //                 >
// //                   {actionLoading ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
// //                     </>
// //                   ) : "Update Status & Save"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default FinalPaperSupport;

// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import axios from "axios";
// // import * as XLSX from "xlsx";
// // import {
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   Legend,
// // } from "recharts";
// // import {
// //   Loader2,
// //   Download,
// //   X,
// //   Users,
// //   Search,
// //   Eye,
// // } from "lucide-react";

// // /* ----------------------------- Small Components & Utils ----------------------------- */

// // // Icon map
// // const icons = {
// //   total: (
// //     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
// //     </svg>
// //   ),
// //   approvedPaper: (
// //     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
// //     </svg>
// //   ),
// //   pendingPaper: (
// //     <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //     </svg>
// //   ),
// //   rejected: (
// //     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
// //     </svg>
// //   ),
// //   noPaper: (
// //     <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
// //     </svg>
// //   ),
// // };

// // // Reusable Modal Component
// // const Modal = ({ children, onClose, size = "md" }) => {
// //   const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
// //   return (
// //     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}>
// //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl">
// //           <X className="w-6 h-6" />
// //         </button>
// //         {children}
// //       </div>
// //     </div>
// //   );
// // };

// // // Image Preview Modal
// // const ImagePreviewModal = ({ imageUrl, onClose }) => {
// //   return (
// //     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
// //       <div className="bg-white rounded-2xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
// //         <button 
// //           onClick={onClose} 
// //           className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10"
// //         >
// //           <X className="w-8 h-8" />
// //         </button>
// //         <div className="p-4 border-b">
// //           <h3 className="text-lg font-semibold">Proof Document Preview</h3>
// //         </div>
// //         <div className="p-4 max-h-[70vh] overflow-auto">
// //           {imageUrl ? (
// //             <img 
// //               src={imageUrl} 
// //               alt="Proof Document" 
// //               className="w-full h-auto rounded-lg shadow-md"
// //               onError={(e) => {
// //                 e.target.style.display = 'none';
// //                 const errorDiv = e.target.parentNode.querySelector('.image-error');
// //                 if (errorDiv) errorDiv.style.display = 'block';
// //               }}
// //             />
// //           ) : (
// //             <div className="text-center text-gray-500 py-8">
// //               No image available
// //             </div>
// //           )}
// //           <div className="image-error text-center text-red-500 py-4" style={{ display: 'none' }}>
// //             <p>Failed to load image.</p>
// //             <p className="text-sm text-gray-600 break-all mt-2">{imageUrl}</p>
// //           </div>
// //         </div>
// //         <div className="p-4 border-t flex justify-between items-center">
// //           <span className="text-sm text-gray-500 break-all flex-1 mr-4">
// //             {imageUrl}
// //           </span>
// //           <button 
// //             onClick={() => window.open(imageUrl, '_blank')}
// //             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
// //           >
// //             <Eye className="w-4 h-4" />
// //             Open in New Tab
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Stat Card
// // const StatCard = ({ icon, title, value, hint }) => (
// //   <div className="bg-white border border-gray-100 rounded-2xl shadow p-4 hover:shadow-md transition">
// //     <div className="flex items-start justify-between">
// //       <div>
// //         <div className="text-sm text-gray-500 font-medium">{title}</div>
// //         <div className="mt-2 text-2xl font-bold text-gray-800">{value}</div>
// //         {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
// //       </div>
// //       <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
// //     </div>
// //   </div>
// // );

// // /* ----------------------------- Main Component ----------------------------- */

// // const FinalPaperSupport = () => {
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     approvedPaper: 0,
// //     noPaper: 0,
// //     rejected: 0,
// //     pending: 0,
// //   });
// //   const [trend, setTrend] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("All");
// //   const [teamModalData, setTeamModalData] = useState(null);
// //   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

// //   // Action Modal State
// //   const [actionModalData, setActionModalData] = useState(null);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [isDiscountApplied, setIsDiscountApplied] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [newPaperStatus, setNewPaperStatus] = useState("");
// //   const [downloading, setDownloading] = useState(false);

// //   /**
// //    * Formats proof URL to ensure it's a complete, valid URL
// //    */
// //   const formatProofUrl = (url) => {
// //     if (!url) return null;
    
// //     if (url.startsWith('http://') || url.startsWith('https://')) {
// //       return url;
// //     }
    
// //     if (url.startsWith('/uploads/')) {
// //       return `https://s3conference.ksrce.ac.in${url}`;
// //     }
    
// //     if (url.includes('proof_')) {
// //       return `https://s3conference.ksrce.ac.in/uploads/proofs/${url}`;
// //     }
    
// //     if (url.includes('s3conference.ksrce.ac.in') && !url.startsWith('http')) {
// //       return `https://${url.replace(/^\/+/, '')}`;
// //     }
    
// //     return url;
// //   };

// //   /**
// //    * Computes statistics for the dashboard cards.
// //    */
// //   const computeStats = useCallback((data) => {
// //     const submittedOrPending = ["submitted", "correction required"]; 
// //     setStats({
// //       total: data.length,
// //       approvedPaper: data.filter((d) => d.paperStatus === "approved").length,
// //       noPaper: data.filter((d) => d.paperStatus === "no paper").length,
// //       rejected: data.filter((d) => d.paperStatus === "rejected").length,
// //       pending: data.filter((d) => submittedOrPending.includes(d.paperStatus)).length,
// //     });
// //   }, []);

// //   /**
// //    * Computes the submission trend based on the creation date.
// //    */
// //   const computeTrend = useCallback((data) => {
// //     const groups = {};
// //     data.forEach((d) => {
// //       const date = new Date(d.createdAt).toISOString().split("T")[0];
// //       groups[date] = (groups[date] || 0) + 1;
// //     });
// //     const arr = Object.entries(groups)
// //       .map(([date, count]) => ({ date, count }))
// //       .sort((a, b) => new Date(a.date) - new Date(b.date));
// //     setTrend(arr);
// //   }, []);

// //   // Format each user with proper proof URL formatting
// //   const formatUser = (item) => {
// //     const isDiscount =
// //       item.workflow?.discountApplied === true ||
// //       item.workflow?.discount === true ||
// //       item.workflow?.discountApplied === "true" ||
// //       item.workflow?.discount === "true" ||
// //       (item.workflow?.discount || 0) > 0;

// //     const finalPaperLink = 
// //       item.workflow?.finalPaperUrl ||
// //       item.registration?.paperUrl ||
// //       null;

// //     // Format team members' proof URLs
// //     const formattedTeam = Array.isArray(item.registration?.participants) 
// //       ? item.registration.participants.slice(1).map(member => ({
// //           ...member,
// //           proofUrl: formatProofUrl(member.proofUrl)
// //         }))
// //       : [];

// //     return {
// //       id: item._id,
// //       userId: item.userId || "N/A",
// //       authorName: item.name || "Unknown",
// //       email: item.registration?.participants?.[0]?.email || "-",
// //       mobile: item.registration?.participants?.[0]?.phone || "-",
// //       uniqueId: item.registration?.uniqueId || "-",
// //       track: item.registration?.track || "-",
// //       title: item.registration?.abstractTitle || "No Title",
// //       abstractStatus: (item.workflow?.abstractStatus || "pending").toLowerCase(),
// //       paperStatus: (item.workflow?.paperStatus || "no paper").toLowerCase(),
// //       paymentStatus: (item.workflow?.paymentStatus || "unpaid").toLowerCase(),
// //       amountPaid: Number(item.workflow?.amountPaid || 0),
// //       discount: item.workflow?.discount ?? 0,
// //       discountApplied: isDiscount,
// //       createdAt: item.workflow?.createdAt || new Date().toISOString(),
// //       team: formattedTeam,
// //       finalPaperUrl: finalPaperLink,
// //       proofUrl: item.registration?.participants?.[0]?.proofUrl || null,
// //     };
// //   };

// //   // Fetch approved abstracts
// //   const fetchRows = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const { data } = await axios.get(
// //         "http://localhost:5000/api/admin/users",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const formatted = (Array.isArray(data) ? data : []).map(formatUser);
// //       const approved = formatted.filter((f) => f.abstractStatus === "approved");
      
// //       setRows(approved);
// //       computeStats(approved);
// //       computeTrend(approved);
// //     } catch (err) {
// //       console.error("Error fetching:", err);
// //       setRows([]);
// //       setStats({
// //         total: 0,
// //         approvedPaper: 0,
// //         noPaper: 0,
// //         rejected: 0,
// //         pending: 0,
// //       });
// //       setTrend([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [computeStats, computeTrend]);

// //   useEffect(() => {
// //     fetchRows();
// //   }, [fetchRows]);

// //   // Update local state after successful API call
// //   const updateAbstractLocal = useCallback((id, newStatus, discountBoolean) => {
// //     setRows((prevRows) => {
// //       const updatedRows = prevRows.map((row) => {
// //         if (row.id === id) {
// //           return {
// //             ...row,
// //             paperStatus: newStatus,
// //             discountApplied: discountBoolean,
// //             discount: discountBoolean ? 1 : 0,
// //           };
// //         }
// //         return row;
// //       });
      
// //       computeStats(updatedRows);
// //       computeTrend(updatedRows);

// //       return updatedRows;
// //     });
// //   }, [computeStats, computeTrend]);

// //   // Search & Filter (Memoized)
// //   const filteredAndSearchedRows = useMemo(() => {
// //     const q = searchTerm.trim().toLowerCase();
// //     const isAllStatus = statusFilter.toLowerCase() === "all";

// //     return rows.filter((r) => {
// //       const matchesSearch =
// //         r.authorName.toLowerCase().includes(q) ||
// //         r.email.toLowerCase().includes(q) ||
// //         r.uniqueId.toLowerCase().includes(q) ||
// //         r.title.toLowerCase().includes(q) ||
// //         r.userId.toLowerCase().includes(q);

// //       const matchesFilter =
// //         isAllStatus || r.paperStatus.toLowerCase() === statusFilter.toLowerCase();

// //       return matchesSearch && matchesFilter;
// //     });
// //   }, [rows, searchTerm, statusFilter]);

// //   // Badge Styling
// //   const getStatusBadgeClass = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "approved":
// //         return "bg-green-100 text-green-700";
// //       case "rejected":
// //         return "bg-red-100 text-red-700";
// //       case "under review":
// //         return "bg-orange-100 text-orange-700";
// //       case "submitted":
// //         return "bg-blue-100 text-blue-700";
// //       case "correction required":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "no paper":
// //         return "bg-gray-100 text-gray-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   // Handle Export to Excel
// //   const handleExportExcel = () => {
// //     if (!filteredAndSearchedRows.length) return alert("No data to export!");

// //     const exportData = filteredAndSearchedRows.map((abs) => ({
// //       "Unique ID": abs.uniqueId,
// //       "User ID": abs.userId,
// //       "Author Name": abs.authorName,
// //       Email: abs.email,
// //       Title: abs.title,
// //       Track: abs.track,
// //       "Abstract Status": abs.abstractStatus,
// //       "Final Paper Status": abs.paperStatus,
// //       "Payment Status": abs.paymentStatus,
// //       "Amount Paid": abs.amountPaid,
// //       "Discount Applied": abs.discountApplied ? "Yes" : "No",
// //       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
// //       "Final Paper Link": abs.finalPaperUrl || "N/A",
// //     }));

// //     const ws = XLSX.utils.json_to_sheet(exportData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "FinalPapers");
// //     XLSX.writeFile(wb, `final_papers_${new Date().toISOString().split('T')[0]}.xlsx`);
// //   };

// //   // Download function to prevent corruption
// //   const handleForceDownload = async (fileUrl, userId) => {
// //     if (!fileUrl) return alert("No file found to download.");

// //     try {
// //       setDownloading(true);
// //       const downloadUrl = `http://localhost:5000${fileUrl}`;
// //       console.log("⬇️ Downloading:", downloadUrl);

// //       const customFileName = `Final_Paper_${userId}.docx`;

// //       const response = await fetch(downloadUrl);
// //       const blob = await response.blob();
// //       const blobUrl = window.URL.createObjectURL(blob);

// //       const link = document.createElement("a");
// //       link.href = blobUrl;
// //       link.download = customFileName;
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();

// //       window.URL.revokeObjectURL(blobUrl);
// //     } catch (err) {
// //       console.error("❌ Download error:", err);
// //     } finally {
// //       setDownloading(false);
// //     }
// //   };

// //   // Handle View Proof with robust error handling
// //   const handleViewProof = async (proofUrl) => {
// //     if (!proofUrl) {
// //       alert("No proof available for this team member.");
// //       return;
// //     }

// //     let finalUrl = proofUrl;
    
// //     if (proofUrl.startsWith('/')) {
// //       finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
// //     }
    
// //     if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
// //       finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
// //     }

// //     console.log("Attempting to load proof from:", finalUrl);

// //     try {
// //       const response = await fetch(finalUrl, { method: 'HEAD' });
// //       if (response.ok) {
// //         setImagePreviewUrl(finalUrl);
// //       } else {
// //         throw new Error(`HTTP ${response.status}`);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load proof image:", error);
// //       setImagePreviewUrl(finalUrl);
      
// //       setTimeout(() => {
// //         const errorDiv = document.querySelector('.image-error');
// //         if (errorDiv && errorDiv.style.display === 'block') {
// //           alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
// //         }
// //       }, 500);
// //     }
// //   };

// //   // Handle Action Modal Submission
// //   const handleActionSubmit = async () => {
// //     if (!actionModalData) return;

// //     const statusToUse = newPaperStatus;
// //     const discountBoolean = isDiscountApplied;

// //     if (!statusToUse) {
// //       return alert("⚠️ Please select a new final paper status to update.");
// //     }

// //     setActionLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const formData = new FormData();

// //       formData.append("paperAction", statusToUse);
// //       formData.append("discount", discountBoolean);
// //       formData.append("discountApplied", discountBoolean);

// //       if (selectedFile) {
// //         formData.append("file", selectedFile);
// //       }

// //       const API_URL = `http://localhost:5000/api/admin/update/${actionModalData.id}`;

// //       const response = await axios.put(API_URL, formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (response.data?.success) {
// //         alert(
// //           `✅ Final paper status updated to "${statusToUse}"${
// //             discountBoolean ? " with discount applied." : "."
// //           }`
// //         );
// //         updateAbstractLocal(actionModalData.id, statusToUse, discountBoolean);
// //         closeActionModal();
// //       } else {
// //         alert(response.data?.message || "Unexpected server response.");
// //       }
// //     } catch (err) {
// //       console.error("❌ Error updating paper/discount:", err.response?.data || err.message);
// //       alert(err.response?.data?.message || "Failed to process action.");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Helper to open the combined action modal
// //   const openActionModal = (row) => {
// //     setActionModalData(row);
// //     setIsDiscountApplied(row.discountApplied);
// //     setNewPaperStatus(row.paperStatus);
// //     setSelectedFile(null);
// //   };

// //   // Helper to handle closing the modal and resetting state
// //   const closeActionModal = () => {
// //     setActionModalData(null);
// //     setIsDiscountApplied(false);
// //     setSelectedFile(null);
// //     setNewPaperStatus("");
// //   };

// //   return (
// //     <div className="space-y-6 p-4">
// //       <div>
// //         <h1 className="text-2xl font-bold">Final Paper Support</h1>
// //         <p className="text-sm text-gray-500 mt-1">
// //           Manage final paper uploads, discounts, and approval statuses for **approved abstracts** only.
// //         </p>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
// //         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
// //         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
// //         <StatCard icon={icons.pendingPaper} title="Submitted / Correction Required" value={stats.pending} />
// //         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
// //         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white p-4 rounded-2xl shadow">
// //           <h3 className="text-lg font-semibold mb-3">Paper Status</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             <BarChart
// //               data={[
// //                 {
// //                   name: "Papers",
// //                   approvedPaper: stats.approvedPaper,
// //                   pending: stats.pending,
// //                   rejected: stats.rejected,
// //                   noPaper: stats.noPaper,
// //                 },
// //               ]}
// //             >
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" hide />
// //               <YAxis allowDecimals={false} />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
// //               <Bar dataKey="pending" name="Submitted/Correction" fill="#F59E0B" />
// //               <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
// //               <Bar dataKey="noPaper" name="No Paper" fill="#9CA3AF" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-white p-4 rounded-2xl shadow">
// //           <h3 className="text-lg font-semibold mb-3">Submission Trend (Abstract)</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             <LineChart data={trend}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis allowDecimals={false} />
// //               <Tooltip />
// //               <Line
// //                 type="monotone"
// //                 dataKey="count"
// //                 name="Abstracts"
// //                 stroke="#3B82F6"
// //                 strokeWidth={2}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* Table Section */}
// //       <div className="bg-white rounded-2xl shadow border overflow-hidden">
// //         {/* Toolbar (Search & Filter) */}
// //         <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
// //           <div className="flex items-center gap-3 w-full md:w-auto">
// //             <div className="flex items-center border rounded-lg overflow-hidden bg-white w-full md:w-72">
// //               <Search className="w-5 h-5 ml-3 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by ID, name, email, or title..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="px-3 py-2 outline-none text-sm w-full"
// //               />
// //               <button
// //                 onClick={() => setSearchTerm("")}
// //                 className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
// //               >
// //                 Clear
// //               </button>
// //             </div>

// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="border rounded-lg p-2 text-sm w-full md:w-auto"
// //             >
// //               <option value="All">All Paper Statuses</option>
// //               <option value="submitted">Submitted</option>
// //               <option value="correction required">Correction Required</option>
// //               <option value="approved">Approved</option>
// //               <option value="rejected">Rejected</option>
// //               <option value="no paper">No Paper</option>
// //             </select>
// //           </div>

// //           <div className="flex items-center gap-2 w-full md:w-auto">
// //             <button
// //               onClick={fetchRows}
// //               className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full md:w-auto"
// //               disabled={loading}
// //             >
// //               {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh Data'}
// //             </button>
// //             <button
// //               onClick={handleExportExcel}
// //               className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 w-full md:w-auto"
// //             >
// //               <Download className="w-4 h-4" /> Export Excel
// //             </button>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         {loading ? (
// //           <div className="flex items-center justify-center p-10">
// //             <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
// //           </div>
// //         ) : filteredAndSearchedRows.length === 0 ? (
// //           <div className="p-8 text-center text-gray-600">
// //             No records match the current filters.
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full text-sm divide-y divide-gray-200">
// //               <thead className="bg-gray-50 text-xs uppercase text-gray-700">
// //                 <tr>
// //                   <th className="p-3">User ID</th>
// //                   <th className="p-3">Author Name</th>
// //                   <th className="p-3">Email</th>
// //                   <th className="p-3">Title</th>
// //                   <th className="p-3 text-center">Paper Status</th>
// //                   <th className="p-3 text-center">Discount</th>
// //                   <th className="p-3 text-center">Team</th>
// //                   <th className="p-3 text-center">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-100">
// //                 {filteredAndSearchedRows.map((r) => (
// //                   <tr key={r.id} className="hover:bg-gray-50">
// //                     <td className="p-3 font-mono text-xs text-gray-600">
// //                       {r.userId}
// //                     </td>
// //                     <td className="p-3 font-medium">{r.authorName}</td>
// //                     <td className="p-3 text-gray-600">{r.email}</td>
// //                     <td className="p-3 text-gray-600">{r.title}</td>
// //                     <td className="p-3 text-center">
// //                       <span
// //                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
// //                           r.paperStatus
// //                         )}`}
// //                       >
// //                         {r.paperStatus.toUpperCase()}
// //                       </span>
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       {r.discountApplied ? (
// //                         <span className="text-emerald-600 font-semibold">
// //                           Yes
// //                         </span>
// //                       ) : (
// //                         <span className="text-gray-400">No</span>
// //                       )}
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       {Array.isArray(r.team) && r.team.length ? (
// //                         <button
// //                           onClick={() => setTeamModalData(r)}
// //                           className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto text-xs"
// //                         >
// //                           <Users className="w-4 h-4" /> View
// //                         </button>
// //                       ) : (
// //                         "-"
// //                       )}
// //                     </td>
// //                     <td className="p-3 text-center">
// //                       <button
// //                         onClick={() => openActionModal(r)}
// //                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
// //                       >
// //                         Actions
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       {/* Team Modal */}
// //       {teamModalData && (
// //         <Modal onClose={() => setTeamModalData(null)} size="lg">
// //           <h3 className="text-xl font-bold mb-4">
// //             Team Members for "{teamModalData.title}"
// //           </h3>
// //           {Array.isArray(teamModalData.team) && teamModalData.team.length ? (
// //             <div className="overflow-x-auto max-h-[70vh]">
// //               <table className="min-w-full divide-y divide-gray-200 text-sm">
// //                 <thead className="bg-gray-100 sticky top-0">
// //                   <tr>
// //                     <th className="p-2 text-left">Name</th>
// //                     <th className="p-2 text-left">Email</th>
// //                     <th className="p-2 text-left">Phone</th>
// //                     <th className="p-2 text-left">Designation</th>
// //                     <th className="p-2 text-left">Organisation</th>
// //                     <th className="p-2 text-left">Gender</th>
// //                     <th className="p-2 text-left">Proof</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {teamModalData.team.map((member, i) => (
// //                     <tr key={i}>
// //                       <td className="p-2">{member.name || "Unnamed"}</td>
// //                       <td className="p-2">{member.email || "-"}</td>
// //                       <td className="p-2">{member.phone || "-"}</td>
// //                       <td className="p-2">{member.designation || "-"}</td>
// //                       <td className="p-2">{member.organisation || "-"}</td>
// //                       <td className="p-2">{member.gender || "-"}</td>
// //                       <td className="p-2">
// //                         {member.proofUrl ? (
// //                           <button
// //                             onClick={() => handleViewProof(member.proofUrl)}
// //                             className="text-blue-500 hover:underline text-xs flex items-center gap-1"
// //                           >
// //                             <Eye className="w-3 h-3" /> View Proof
// //                           </button>
// //                         ) : (
// //                           "-"
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <p>No team members available.</p>
// //           )}
// //         </Modal>
// //       )}

// //       {/* Action / Discount / Status Modal */}
// //       {actionModalData && (
// //         <Modal onClose={closeActionModal} size="md">
// //           <h2 className="text-xl font-bold mb-2">
// //             Final Paper Actions: {actionModalData.authorName}
// //           </h2>
// //           <p className="text-gray-600 mb-4">
// //             Title: {actionModalData.title.substring(0, 70)}...
// //           </p>

// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
// //               <span className="font-semibold">Current Paper Status:</span>
// //               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(actionModalData.paperStatus)}`}>
// //                 {actionModalData.paperStatus.toUpperCase()}
// //               </span>
// //             </div>

// //             {/* Final Paper Download */}
// //             <div className="p-3 border rounded-lg flex justify-between items-center">
// //               <span className="font-medium text-gray-700">Uploaded Paper:</span>
// //               {actionModalData.finalPaperUrl ? (
// //                 <button
// //                     onClick={() => handleForceDownload(actionModalData.finalPaperUrl, actionModalData.uniqueId)}
// //                     disabled={downloading}
// //                     className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
// //                 >
// //                     {downloading ? (
// //                       <Loader2 className="h-4 w-4 animate-spin" />
// //                     ) : (
// //                       'Download Paper (DOCX)'
// //                     )}
// //                 </button>
// //               ) : (
// //                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
// //               )}
// //             </div>

// //             {/* Discount Section */}
// //             <div className="border p-4 rounded-lg">
// //               <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                 Discount Status
// //               </label>
// //               <div className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id="discountApplied"
// //                   checked={isDiscountApplied}
// //                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
// //                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
// //                 />
// //                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
// //                   **Discount Applied (Yes/No)**
// //                 </label>
// //               </div>
// //               <p className="text-xs text-gray-500 mt-1">Check this box to grant or uncheck to revoke the discount.</p>
// //             </div>

// //             {/* Status Update Section */}
// //             <div className="border-t pt-4">
// //               <h4 className="font-bold mb-3">Update Final Paper Status</h4>

// //               <div className="mb-4">
// //                 <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                   New Status
// //                 </label>
// //                 <select
// //                   value={newPaperStatus}
// //                   onChange={(e) => setNewPaperStatus(e.target.value)}
// //                   className="w-full p-2 border rounded"
// //                 >
// //                   <option value="">-- Select Status --</option>
// //                   <option value="approved">Approved</option>
// //                   <option value="rejected">Rejected</option>
// //                   <option value="correction required">Correction Required</option>
// //                   <option value="no paper">No Paper</option>
// //                   <option value="submitted">Submitted</option>
// //                 </select>
// //               </div>

// //               {/* Optional File Upload */}
// //               <div className="mb-4">
// //                 <label className="text-sm font-semibold text-gray-700 block mb-2">
// //                   Upload Correction/Approval File (Optional)
// //                 </label>
// //                 <input
// //                   type="file"
// //                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
// //                   className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
// //                 />
// //                 {selectedFile && (
// //                   <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
// //                 )}
// //               </div>

// //               <div className="flex justify-end gap-2">
// //                 <button
// //                   onClick={closeActionModal}
// //                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
// //                   disabled={actionLoading}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleActionSubmit}
// //                   disabled={actionLoading || !newPaperStatus}
// //                   className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
// //                 >
// //                   {actionLoading ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
// //                     </>
// //                   ) : "Update Status & Save"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}

// //       {/* Image Preview Modal */}
// //       {imagePreviewUrl && (
// //         <ImagePreviewModal 
// //           imageUrl={imagePreviewUrl} 
// //           onClose={() => setImagePreviewUrl(null)} 
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default FinalPaperSupport;


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
// } from "lucide-react";

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

// // Paper Status Pie Chart Component
// const PaperStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280", "#3B82F6"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Paper Status Distribution</h3>
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

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Paper Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Papers"
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
//     <h3 className="text-lg font-semibold mb-3">Paper Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
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
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
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

//   // Format each user with proper proof URL formatting - IMPROVED VERSION
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

//     // Format ALL team members including the main author - IMPROVED
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
//         f.abstractStatus === "approved" || 
//         f.abstractStatus === "approved paper"
//       );
      
//       setRows(approved);
//       computeStats(approved);
//       computeTrend(approved);
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

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return rows.filter((r) => {
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
//   }, [rows, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "correction required":
//         return "bg-yellow-100 text-yellow-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "no paper":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
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

//   // Handle View Proof with robust error handling - SAME AS AbstractSupport
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

//   // Handle Paper Status Update
//   const handlePaperStatusUpdate = async (newStatus, reason = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData if there's a file, otherwise use JSON
//       let payload;
//       let headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       if (file) {
//         payload = new FormData();
//         payload.append("paperStatus", newStatus.toLowerCase());
        
//         if (discountBoolean !== null) {
//           payload.append("discountApplied", discountBoolean);
//           payload.append("discount", discountBoolean ? 1 : 0);
//         }
        
//         if (newStatus.toLowerCase() === "rejected" && reason) {
//           payload.append("paperRejectedReason", reason);
//         }
        
//         payload.append("file", file);
//       } else {
//         payload = {
//           paperStatus: newStatus.toLowerCase(),
//         };
        
//         if (discountBoolean !== null) {
//           payload.discountApplied = discountBoolean;
//           payload.discount = discountBoolean ? 1 : 0;
//         }
        
//         if (newStatus.toLowerCase() === "rejected" && reason) {
//           payload.paperRejectedReason = reason;
//         }

//         headers["Content-Type"] = "application/json";
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

//       const response = await axios.put(API_URL, payload, { headers });

//       if (response.data?.success) {
//         alert(`✅ Paper status updated to "${newStatus}"${discountBoolean !== null ? (discountBoolean ? " with discount applied." : " with discount removed.") : "."}`);
//         updatePaperLocal(paperModalData.id, newStatus, discountBoolean !== null ? discountBoolean : paperModalData.discountApplied);
//         setPaperModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setSelectedFile(null);
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
//     handlePaperStatusUpdate("rejected", rejectionReason.trim());
//   };

//   // Handle Quick Status Update (without modal)
//   const handleQuickStatusUpdate = async (row, newStatus) => {
//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const payload = {
//         paperStatus: newStatus.toLowerCase(),
//       };

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${row.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Paper status updated to "${newStatus}"`);
//         updatePaperLocal(row.id, newStatus, row.discountApplied);
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

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approvedPaper },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending/Correction", value: stats.pending },
//     { name: "No Paper", value: stats.noPaper },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Final Paper Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
//         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
//         <StatCard icon={icons.pendingPaper} title="Submitted/Correction" value={stats.pending} />
//         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
//         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <PaperStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <PaperTrendChart data={trend} />

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
//               <option value="All">All Paper Statuses</option>
//               <option value="submitted">Submitted</option>
//               <option value="correction required">Correction Required</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="no paper">No Paper</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchRows}
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
//         ) : filteredAndSearchedRows.length === 0 ? (
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
//                   <th className="p-3 text-center">Paper Status</th>
//                   <th className="p-3 text-center">Discount</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedRows.map((r) => (
//                   <tr key={r.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {r.userId}
//                     </td>
//                     <td className="p-3 font-medium">{r.authorName}</td>
//                     <td className="p-3 text-gray-600">{r.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{r.title}</td>
//                     <td className="p-3 text-gray-600">{r.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           r.paperStatus
//                         )}`}
//                       >
//                         {r.paperStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {r.discountApplied ? (
//                         <span className="text-emerald-600 font-semibold">
//                           Yes
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(r.team) && r.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(r)}
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
//                         onClick={() => setPaperModalData(r)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Manage
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Team Modal - SAME AS AbstractSupport */}
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

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Paper Management: {paperModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {paperModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Paper Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(paperModalData.paperStatus)}`}>
//                 {paperModalData.paperStatus.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Paper Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {paperModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {paperModalData.email}</p>
//                 <p><strong>Mobile:</strong> {paperModalData.mobile}</p>
//                 <p><strong>Country:</strong> {paperModalData.country}</p>
//                 <p><strong>Abstract Status:</strong> 
//                   <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(paperModalData.abstractStatus)}`}>
//                     {paperModalData.abstractStatus.toUpperCase()}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Final Paper Download */}
//             <div className="p-3 border rounded-lg flex justify-between items-center">
//               <span className="font-medium text-gray-700">Uploaded Paper:</span>
//               {paperModalData.finalPaperUrl ? (
//                 <button
//                   onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                   disabled={downloading}
//                   className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
//                 >
//                   {downloading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Download className="w-3 h-3" /> Download Paper
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
//               )}
//             </div>

//             {/* Discount Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Discount Status
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="discountApplied"
//                   checked={isDiscountApplied}
//                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                 />
//                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                   Discount Applied
//                 </label>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Check this box to grant or uncheck to revoke the discount.</p>
//             </div>

//             {/* File Upload Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Upload Correction/Approval File (Optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               />
//               {selectedFile && (
//                 <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Correction Required"}
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this paper.
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
//                 Reject Paper
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
// } from "lucide-react";

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

// // Paper Status Pie Chart Component
// const PaperStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280", "#3B82F6"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Paper Status Distribution</h3>
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

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Paper Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Papers"
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
//     <h3 className="text-lg font-semibold mb-3">Paper Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
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
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
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
//             discount: discountBoolean,
//           };
//         }
//         return row;
//       });
      
//       computeStats(updatedRows);
//       computeTrend(updatedRows);

//       return updatedRows;
//     });
//   }, [computeStats, computeTrend]);

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return rows.filter((r) => {
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
//   }, [rows, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "correction required":
//         return "bg-yellow-100 text-yellow-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "no paper":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
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

//   // Handle Paper Status Update - FIXED VERSION
//   const handlePaperStatusUpdate = async (newStatus, reason = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData for all requests to handle both file and non-file updates consistently
//       const formData = new FormData();
      
//       // Always include paperStatus
//       formData.append("paperStatus", newStatus.toLowerCase());
      
//       // Handle discount - use the current discountApplied if not explicitly provided
//       const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
//       formData.append("discountApplied", finalDiscount);
//       formData.append("discount", finalDiscount ? 1 : 0);
      
//       // Add rejection reason if provided
//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         formData.append("paperRejectedReason", reason);
//       }
      
//       // Add file if provided
//       if (file) {
//         formData.append("file", file);
//       }

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

//       const response = await axios.put(API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Let axios set the Content-Type for FormData
//         },
//       });

//       if (response.data?.success) {
//         alert(`✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " with discount removed."}`);
//         updatePaperLocal(paperModalData.id, newStatus, finalDiscount);
//         setPaperModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setSelectedFile(null);
//         setIsDiscountApplied(false); // Reset discount state
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
//     setIsDiscountApplied(row.discountApplied || false); // Initialize with current discount value
//     setSelectedFile(null);
//   };

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approvedPaper },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending/Correction", value: stats.pending },
//     { name: "No Paper", value: stats.noPaper },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Final Paper Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
//         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
//         <StatCard icon={icons.pendingPaper} title="Submitted/Correction" value={stats.pending} />
//         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
//         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <PaperStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <PaperTrendChart data={trend} />

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
//               <option value="All">All Paper Statuses</option>
//               <option value="submitted">Submitted</option>
//               <option value="correction required">Correction Required</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="no paper">No Paper</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchRows}
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
//         ) : filteredAndSearchedRows.length === 0 ? (
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
//                   <th className="p-3 text-center">Paper Status</th>
//                   <th className="p-3 text-center">Discount</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedRows.map((r) => (
//                   <tr key={r.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {r.userId}
//                     </td>
//                     <td className="p-3 font-medium">{r.authorName}</td>
//                     <td className="p-3 text-gray-600">{r.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{r.title}</td>
//                     <td className="p-3 text-gray-600">{r.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           r.paperStatus
//                         )}`}
//                       >
//                         {r.paperStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {r.discountApplied ? (
//                         <span className="text-emerald-600 font-semibold">
//                           Yes
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(r.team) && r.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(r)}
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
//                         onClick={() => openPaperModal(r)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Manage
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

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Paper Management: {paperModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {paperModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Paper Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(paperModalData.paperStatus)}`}>
//                 {paperModalData.paperStatus.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Paper Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {paperModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {paperModalData.email}</p>
//                 <p><strong>Mobile:</strong> {paperModalData.mobile}</p>
//                 <p><strong>Country:</strong> {paperModalData.country}</p>
//                 <p><strong>Abstract Status:</strong> 
//                   <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(paperModalData.abstractStatus)}`}>
//                     {paperModalData.abstractStatus.toUpperCase()}
//                   </span>
//                 </p>
//                 <p><strong>Current Discount:</strong> 
//                   <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                     {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Final Paper Download */}
//             <div className="p-3 border rounded-lg flex justify-between items-center">
//               <span className="font-medium text-gray-700">Uploaded Paper:</span>
//               {paperModalData.finalPaperUrl ? (
//                 <button
//                   onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                   disabled={downloading}
//                   className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
//                 >
//                   {downloading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Download className="w-3 h-3" /> Download Paper
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
//               )}
//             </div>

//             {/* Discount Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Discount Status
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="discountApplied"
//                   checked={isDiscountApplied}
//                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                 />
//                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                   Apply Discount
//                 </label>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 {isDiscountApplied ? 
//                   "Discount will be applied when you update the status." : 
//                   "No discount will be applied when you update the status."
//                 }
//               </p>
//             </div>

//             {/* File Upload Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Upload Correction/Approval File (Optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                 accept=".doc,.docx,.pdf"
//               />
//               {selectedFile && (
//                 <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Correction Required"}
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this paper.
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
//                 Reject Paper
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
// } from "lucide-react";

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

// // Paper Status Pie Chart Component
// const PaperStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280", "#3B82F6"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Paper Status Distribution</h3>
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

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Paper Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Papers"
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
//     <h3 className="text-lg font-semibold mb-3">Paper Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
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
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
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

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return rows.filter((r) => {
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
//   }, [rows, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "correction required":
//         return "bg-yellow-100 text-yellow-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "no paper":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
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

//   // FIXED: Handle Paper Status Update with correct field names
//   const handlePaperStatusUpdate = async (newStatus, reason = "", discountBoolean = null, file = null) => {
//     if (!paperModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Use FormData for all requests
//       const formData = new FormData();
      
//       // CRITICAL FIX: Use the correct field names that your backend expects
//       formData.append("paperStatus", newStatus.toLowerCase());
      
//       // Handle discount - use the correct field names
//       const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
//       formData.append("discountApplied", finalDiscount);
//       formData.append("discount", finalDiscount ? "true" : "false"); // Send as string if backend expects string
      
//       // Add rejection reason if provided - use correct field name
//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         formData.append("paperRejectedReason", reason);
//       }
      
//       // Add file if provided
//       if (file) {
//         formData.append("file", file);
//       }

//       console.log("📤 Sending update with:", {
//         paperStatus: newStatus.toLowerCase(),
//         discountApplied: finalDiscount,
//         discount: finalDiscount ? "true" : "false",
//         paperRejectedReason: newStatus.toLowerCase() === "rejected" && reason ? reason : "none",
//         hasFile: !!file
//       });

//       const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

//       const response = await axios.put(API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Let axios set the Content-Type for FormData
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

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approvedPaper },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending/Correction", value: stats.pending },
//     { name: "No Paper", value: stats.noPaper },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Final Paper Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
//         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
//         <StatCard icon={icons.pendingPaper} title="Submitted/Correction" value={stats.pending} />
//         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
//         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <PaperStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <PaperTrendChart data={trend} />

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
//               <option value="All">All Paper Statuses</option>
//               <option value="submitted">Submitted</option>
//               <option value="correction required">Correction Required</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="no paper">No Paper</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchRows}
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
//         ) : filteredAndSearchedRows.length === 0 ? (
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
//                   <th className="p-3 text-center">Paper Status</th>
//                   <th className="p-3 text-center">Discount</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedRows.map((r) => (
//                   <tr key={r.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {r.userId}
//                     </td>
//                     <td className="p-3 font-medium">{r.authorName}</td>
//                     <td className="p-3 text-gray-600">{r.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{r.title}</td>
//                     <td className="p-3 text-gray-600">{r.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           r.paperStatus
//                         )}`}
//                       >
//                         {r.paperStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {r.discountApplied ? (
//                         <span className="text-emerald-600 font-semibold">
//                           Yes
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(r.team) && r.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(r)}
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
//                         onClick={() => openPaperModal(r)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Manage
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

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Paper Management: {paperModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {paperModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Paper Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(paperModalData.paperStatus)}`}>
//                 {paperModalData.paperStatus.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Paper Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {paperModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {paperModalData.email}</p>
//                 <p><strong>Mobile:</strong> {paperModalData.mobile}</p>
//                 <p><strong>Country:</strong> {paperModalData.country}</p>
//                 <p><strong>Abstract Status:</strong> 
//                   <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(paperModalData.abstractStatus)}`}>
//                     {paperModalData.abstractStatus.toUpperCase()}
//                   </span>
//                 </p>
//                 <p><strong>Current Discount:</strong> 
//                   <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                     {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Final Paper Download */}
//             <div className="p-3 border rounded-lg flex justify-between items-center">
//               <span className="font-medium text-gray-700">Uploaded Paper:</span>
//               {paperModalData.finalPaperUrl ? (
//                 <button
//                   onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                   disabled={downloading}
//                   className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
//                 >
//                   {downloading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Download className="w-3 h-3" /> Download Paper
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
//               )}
//             </div>

//             {/* Discount Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Discount Status
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="discountApplied"
//                   checked={isDiscountApplied}
//                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                 />
//                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                   Apply Discount
//                 </label>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 {isDiscountApplied ? 
//                   "Discount will be applied when you update the status." : 
//                   "No discount will be applied when you update the status."
//                 }
//               </p>
//             </div>

//             {/* File Upload Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Upload Correction/Approval File (Optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                 accept=".doc,.docx,.pdf"
//               />
//               {selectedFile && (
//                 <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Correction Required"}
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this paper.
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
//                 Reject Paper
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
// } from "lucide-react";

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

// // Paper Status Pie Chart Component
// const PaperStatusPie = ({ data }) => {
//   const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280", "#3B82F6"];
  
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h3 className="text-lg font-semibold mb-3">Paper Status Distribution</h3>
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

// // Paper Trend Chart Component
// const PaperTrendChart = ({ data }) => (
//   <div className="bg-white p-4 rounded-2xl shadow">
//     <h3 className="text-lg font-semibold mb-3">Paper Submission Trend</h3>
//     <ResponsiveContainer width="100%" height={260}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="count"
//           name="Papers"
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
//     <h3 className="text-lg font-semibold mb-3">Paper Status Snapshot</h3>
//     <ResponsiveContainer width="100%" height={260}>
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
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" hide />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
//         <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" />
//         <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
//         <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
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

//   // Search & Filter (Memoized)
//   const filteredAndSearchedRows = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     return rows.filter((r) => {
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
//   }, [rows, searchTerm, statusFilter]);

//   // Badge Styling
//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "correction required":
//         return "bg-yellow-100 text-yellow-700";
//       case "submitted":
//         return "bg-blue-100 text-blue-700";
//       case "no paper":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
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

//   // Pie Chart Data
//   const pieChartData = [
//     { name: "Approved", value: stats.approvedPaper },
//     { name: "Rejected", value: stats.rejected },
//     { name: "Pending/Correction", value: stats.pending },
//     { name: "No Paper", value: stats.noPaper },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//         <h1 className="text-2xl font-bold">Final Paper Support</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
//         <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
//         <StatCard icon={icons.pendingPaper} title="Submitted/Correction" value={stats.pending} />
//         <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
//         <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <StatusSnapshotChart stats={stats} />
//         <PaperStatusPie data={pieChartData} />
//       </div>

//       {/* Trend Chart */}
//       <PaperTrendChart data={trend} />

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
//               <option value="All">All Paper Statuses</option>
//               <option value="submitted">Submitted</option>
//               <option value="correction required">Correction Required</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="no paper">No Paper</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchRows}
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
//         ) : filteredAndSearchedRows.length === 0 ? (
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
//                   <th className="p-3 text-center">Paper Status</th>
//                   <th className="p-3 text-center">Discount</th>
//                   <th className="p-3 text-center">Team</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredAndSearchedRows.map((r) => (
//                   <tr key={r.id} className="hover:bg-gray-50">
//                     <td className="p-3 font-mono text-xs text-gray-600">
//                       {r.userId}
//                     </td>
//                     <td className="p-3 font-medium">{r.authorName}</td>
//                     <td className="p-3 text-gray-600">{r.email}</td>
//                     <td className="p-3 text-gray-600 max-w-xs truncate">{r.title}</td>
//                     <td className="p-3 text-gray-600">{r.track}</td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
//                           r.paperStatus
//                         )}`}
//                       >
//                         {r.paperStatus.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       {r.discountApplied ? (
//                         <span className="text-emerald-600 font-semibold">
//                           Yes
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-center">
//                       {Array.isArray(r.team) && r.team.length ? (
//                         <button
//                           onClick={() => setTeamModalData(r)}
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
//                         onClick={() => openPaperModal(r)}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
//                       >
//                         Manage
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

//       {/* Paper Management Modal */}
//       {paperModalData && (
//         <Modal onClose={() => setPaperModalData(null)} size="lg">
//           <h2 className="text-xl font-bold mb-2">
//             Paper Management: {paperModalData.authorName}
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Title: {paperModalData.title}
//           </p>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
//               <span className="font-semibold">Current Paper Status:</span>
//               <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(paperModalData.paperStatus)}`}>
//                 {paperModalData.paperStatus.toUpperCase()}
//               </span>
//             </div>

//             <div className="p-3 border rounded-lg">
//               <h4 className="font-bold mb-2">Paper Details</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Track:</strong> {paperModalData.track}</p>
//                 <p><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</p>
//                 <p><strong>Email:</strong> {paperModalData.email}</p>
//                 <p><strong>Mobile:</strong> {paperModalData.mobile}</p>
//                 <p><strong>Country:</strong> {paperModalData.country}</p>
//                 <p><strong>Abstract Status:</strong> 
//                   <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(paperModalData.abstractStatus)}`}>
//                     {paperModalData.abstractStatus.toUpperCase()}
//                   </span>
//                 </p>
//                 <p><strong>Current Discount:</strong> 
//                   <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
//                     {paperModalData.discountApplied ? "Applied" : "Not Applied"}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Final Paper Download */}
//             <div className="p-3 border rounded-lg flex justify-between items-center">
//               <span className="font-medium text-gray-700">Uploaded Paper:</span>
//               {paperModalData.finalPaperUrl ? (
//                 <button
//                   onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
//                   disabled={downloading}
//                   className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
//                 >
//                   {downloading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Download className="w-3 h-3" /> Download Paper
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <span className="text-red-500 text-xs">No Paper Uploaded</span>
//               )}
//             </div>

//             {/* Discount Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Discount Status
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="discountApplied"
//                   checked={isDiscountApplied}
//                   onChange={(e) => setIsDiscountApplied(e.target.checked)}
//                   className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                 />
//                 <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
//                   Apply Discount
//                 </label>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 {isDiscountApplied ? 
//                   "Discount will be applied when you update the status." : 
//                   "No discount will be applied when you update the status."
//                 }
//               </p>
//             </div>

//             {/* File Upload Section */}
//             <div className="border p-4 rounded-lg">
//               <label className="text-sm font-semibold text-gray-700 block mb-2">
//                 Upload Correction/Approval File (Optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                 className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                 accept=".doc,.docx,.pdf"
//               />
//               {selectedFile && (
//                 <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <button
//                 onClick={() => {
//                   setRejectionModalData(paperModalData);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
//                 disabled={actionLoading}
//               >
//                 <XCircle className="w-4 h-4" /> Reject
//               </button>
              
//               <button
//                 onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
//               >
//                 <Clock className="w-4 h-4" /> 
//                 {actionLoading ? "Processing..." : "Correction Required"}
//               </button>

//               <button
//                 onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
//                 disabled={actionLoading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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
//           <div className="text-center p-4">
//             <div className="mx-auto w-fit bg-orange-100 rounded-full p-4 mb-4">
//               <FileText className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold my-2">Provide Rejection Reason</h3>
//             <p className="text-gray-500 mb-4">
//               Please provide a reason for rejecting this paper.
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
//                 Reject Paper
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

// export default FinalPaperSupport;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
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
} from "lucide-react";

/* ----------------------------- Small Components & Utils ----------------------------- */

// Icon map
const icons = {
  total: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
    </svg>
  ),
  approvedPaper: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  pendingPaper: (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  rejected: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  noPaper: (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 8l8 8M4 4l8 8"></path>
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

// Paper Status Pie Chart Component
const PaperStatusPie = ({ data }) => {
  const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6B7280", "#3B82F6"];
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-3">Paper Status Distribution</h3>
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

// Paper Trend Chart Component
const PaperTrendChart = ({ data }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Paper Submission Trend</h3>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          name="Papers"
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
    <h3 className="text-lg font-semibold mb-3">Paper Status Snapshot</h3>
    <ResponsiveContainer width="100%" height={260}>
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="approvedPaper" name="Approved" fill="#10B981" />
        <Bar dataKey="pending" name="Pending/Correction" fill="#F59E0B" />
        <Bar dataKey="rejected" name="Rejected" fill="#EF4444" />
        <Bar dataKey="noPaper" name="No Paper" fill="#6B7280" />
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
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
    const isDiscount =
      item.workflow?.discountApplied === true ||
      item.workflow?.discount === true ||
      item.workflow?.discountApplied === "true" ||
      item.workflow?.discount === "true" ||
      (item.workflow?.discount || 0) > 0;

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
    };
  };

  // Fetch approved abstracts
  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formatted = (Array.isArray(data) ? data : []).map(formatUser);
      console.log("Formatted final paper data:", formatted);
      
      // Filter only approved abstracts
      const approved = formatted.filter((f) => 
        f.abstractStatus === "approved"
      );
      
      setRows(approved);
      computeStats(approved);
      computeTrend(approved);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching:", err);
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
  const updatePaperLocal = useCallback((id, newStatus, discountBoolean) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            paperStatus: newStatus.toLowerCase(),
            discountApplied: discountBoolean,
            discount: discountBoolean ? 1 : 0,
          };
        }
        return row;
      });
      
      computeStats(updatedRows);
      computeTrend(updatedRows);

      return updatedRows;
    });
  }, [computeStats, computeTrend]);

  // Search & Filter (Memoized)
  const filteredAndSearchedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = statusFilter.toLowerCase() === "all";

    return rows.filter((r) => {
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
  }, [rows, searchTerm, statusFilter]);

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

  // Badge Styling
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "correction required":
        return "bg-yellow-100 text-yellow-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "no paper":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

  // Handle View Proof with robust error handling
  const handleViewProof = async (proofUrl) => {
    if (!proofUrl) {
      alert("No proof available for this team member.");
      return;
    }

    let finalUrl = proofUrl;
    
    if (proofUrl.startsWith('/')) {
      finalUrl = `https://s3conference.ksrce.ac.in${proofUrl}`;
    }
    
    if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
      finalUrl = `https://s3conference.ksrce.ac.in/uploads/proofs/${proofUrl}`;
    }

    console.log("Attempting to load proof from:", finalUrl);

    try {
      const response = await fetch(finalUrl, { method: 'HEAD' });
      if (response.ok) {
        setImagePreviewUrl(finalUrl);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to load proof image:", error);
      setImagePreviewUrl(finalUrl);
      
      setTimeout(() => {
        const errorDiv = document.querySelector('.image-error');
        if (errorDiv && errorDiv.style.display === 'block') {
          alert(`Unable to load the proof image. The server may be experiencing issues or the file may not exist.\n\nURL: ${finalUrl}\n\nPlease check:\n1. If the file exists on the server\n2. Your internet connection\n3. Server accessibility`);
        }
      }, 500);
    }
  };

  // FIXED: Handle Paper Status Update with CORRECT field names matching backend
  const handlePaperStatusUpdate = async (newStatus, reason = "", discountBoolean = null, file = null) => {
    if (!paperModalData) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Use FormData for all requests
      const formData = new FormData();
      
      // CRITICAL FIX: Use the EXACT field names that backend expects
      formData.append("paperAction", newStatus.toLowerCase()); // Backend expects "paperAction" not "paperStatus"
      
      // Handle discount - use the correct field names
      const finalDiscount = discountBoolean !== null ? discountBoolean : isDiscountApplied;
      formData.append("discountApplied", finalDiscount);
      formData.append("discount", finalDiscount);
      
      // Add rejection reason if provided - use correct field name (lowercase 'r')
      if (newStatus.toLowerCase() === "rejected" && reason) {
        formData.append("paperrejectedReason", reason); // Note: lowercase 'r' in backend
      }
      
      // Add file if provided
      if (file) {
        formData.append("file", file);
      }

      console.log("📤 Sending update with:", {
        paperAction: newStatus.toLowerCase(),
        discountApplied: finalDiscount,
        discount: finalDiscount,
        paperrejectedReason: newStatus.toLowerCase() === "rejected" && reason ? reason : "none",
        hasFile: !!file
      });

      const API_URL = `https://s3conference.ksrce.ac.in/api/admin/update/${paperModalData.id}`;

      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Server response:", response.data);

      if (response.data?.success) {
        alert(`✅ Paper status updated to "${newStatus}"${finalDiscount ? " with discount applied." : " with discount removed."}`);
        updatePaperLocal(paperModalData.id, newStatus, finalDiscount);
        setPaperModalData(null);
        setRejectionModalData(null);
        setRejectionReason("");
        setSelectedFile(null);
        setIsDiscountApplied(false);
        setRefreshTrigger(prev => !prev);
      } else {
        alert(response.data?.message || "Unexpected server response.");
      }
    } catch (err) {
      console.error("❌ Error updating paper status:", err.response?.data || err.message);
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
    handlePaperStatusUpdate("rejected", rejectionReason.trim(), isDiscountApplied, selectedFile);
  };

  // Open Paper Management Modal - FIXED: Initialize discount state properly
  const openPaperModal = (row) => {
    setPaperModalData(row);
    setIsDiscountApplied(row.discountApplied || false);
    setSelectedFile(null);
  };

  // Pie Chart Data
  const pieChartData = [
    { name: "Approved", value: stats.approvedPaper },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending/Correction", value: stats.pending },
    { name: "No Paper", value: stats.noPaper },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Final Paper Support</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage final paper uploads, discounts, and approval statuses for approved abstracts only.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={icons.total} title="Total Abstracts (Approved)" value={stats.total} />
        <StatCard icon={icons.approvedPaper} title="Papers Approved" value={stats.approvedPaper} />
        <StatCard icon={icons.pendingPaper} title="Submitted/Correction" value={stats.pending} />
        <StatCard icon={icons.rejected} title="Papers Rejected" value={stats.rejected} />
        <StatCard icon={icons.noPaper} title="No Paper Uploaded" value={stats.noPaper} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusSnapshotChart stats={stats} />
        <PaperStatusPie data={pieChartData} />
      </div>

      {/* Trend Chart */}
      <PaperTrendChart data={trend} />

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
              <option value="All">All Paper Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="correction required">Correction Required</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="no paper">No Paper</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={fetchRows}
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
        ) : filteredAndSearchedRows.length === 0 ? (
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
                    <th className="p-3 text-center">Paper Status</th>
                    <th className="p-3 text-center">Discount</th>
                    <th className="p-3 text-center">Team</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedRows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs text-gray-600">
                        {r.userId}
                      </td>
                      <td className="p-3 font-medium">{r.authorName}</td>
                      <td className="p-3 text-gray-600">{r.email}</td>
                      <td className="p-3 text-gray-600 max-w-xs truncate">{r.title}</td>
                      <td className="p-3 text-gray-600">{r.track}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                            r.paperStatus
                          )}`}
                        >
                          {r.paperStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {r.discountApplied ? (
                          <span className="text-emerald-600 font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {Array.isArray(r.team) && r.team.length ? (
                          <button
                            onClick={() => setTeamModalData(r)}
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
                          onClick={() => openPaperModal(r)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                        >
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

      {/* Paper Management Modal */}
      {paperModalData && (
        <Modal onClose={() => setPaperModalData(null)} size="lg">
          <h2 className="text-xl font-bold mb-2">
            Paper Management: {paperModalData.authorName}
          </h2>
          <p className="text-gray-600 mb-4">
            Title: {paperModalData.title}
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
              <span className="font-semibold">Current Paper Status:</span>
              <span className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusBadgeClass(paperModalData.paperStatus)}`}>
                {paperModalData.paperStatus.toUpperCase()}
              </span>
            </div>

            <div className="p-3 border rounded-lg">
              <h4 className="font-bold mb-2">Paper Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Track:</strong> {paperModalData.track}</p>
                <p><strong>Presentation Mode:</strong> {paperModalData.presentationMode}</p>
                <p><strong>Email:</strong> {paperModalData.email}</p>
                <p><strong>Mobile:</strong> {paperModalData.mobile}</p>
                <p><strong>Country:</strong> {paperModalData.country}</p>
                <p><strong>Abstract Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(paperModalData.abstractStatus)}`}>
                    {paperModalData.abstractStatus.toUpperCase()}
                  </span>
                </p>
                <p><strong>Current Discount:</strong> 
                  <span className={`ml-2 ${paperModalData.discountApplied ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
                    {paperModalData.discountApplied ? "Applied" : "Not Applied"}
                  </span>
                </p>
              </div>
            </div>

            {/* Final Paper Download */}
            <div className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-medium text-gray-700">Uploaded Paper:</span>
              {paperModalData.finalPaperUrl ? (
                <button
                  onClick={() => handleForceDownload(paperModalData.finalPaperUrl, paperModalData.uniqueId)}
                  disabled={downloading}
                  className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Download className="w-3 h-3" /> Download Paper
                    </>
                  )}
                </button>
              ) : (
                <span className="text-red-500 text-xs">No Paper Uploaded</span>
              )}
            </div>

            {/* Discount Section */}
            <div className="border p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Discount Status
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="discountApplied"
                  checked={isDiscountApplied}
                  onChange={(e) => setIsDiscountApplied(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="discountApplied" className="ml-2 text-sm text-gray-900">
                  Apply Discount
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isDiscountApplied ? 
                  "Discount will be applied when you update the status." : 
                  "No discount will be applied when you update the status."
                }
              </p>
            </div>

            {/* File Upload Section */}
            <div className="border p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Upload Correction/Approval File (Optional)
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                accept=".doc,.docx,.pdf"
              />
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-1">File selected: {selectedFile.name}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setRejectionModalData(paperModalData);
                  setRejectionReason("");
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              
              <button
                onClick={() => handlePaperStatusUpdate("correction required", "", isDiscountApplied, selectedFile)}
                disabled={actionLoading}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" /> 
                {actionLoading ? "Processing..." : "Correction Required"}
              </button>

              <button
                onClick={() => handlePaperStatusUpdate("approved", "", isDiscountApplied, selectedFile)}
                disabled={actionLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> 
                {actionLoading ? "Processing..." : "Approve"}
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
              Please provide a reason for rejecting this paper.
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
                Reject Paper
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

export default FinalPaperSupport;