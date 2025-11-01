// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import StatCard from "../../components/StatCard";
// import RevenueChart from "../../components/RevenueChart";
// import AbstractStatusPie from "../../components/AbstractStatusPie";
// import AbstractTrendChart from "../../components/AbstractTrendChart";
// import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// // ✅ World map source
// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// // --- Icons for StatCards ---
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   abstractApproved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   abstractRejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   paperApproved: (
//     <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m1 10H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"></path>
//     </svg>
//   ),
//   revenue: (
//     <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3h2a1 1 0 0 1 2 0c0 1.105-.895 2-2 2-1.657 0-3 1.343-3 3h8"></path>
//     </svg>
//   ),
// };

// const MainDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     abstractApproved: 0,
//     abstractRejected: 0,
//     paperApproved: 0,
//     revenue: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [countryCounts, setCountryCounts] = useState({});
//   const [countryCoordinates, setCountryCoordinates] = useState({});

//   const safeNumber = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   };

//   // --- Fetch registrations ---
//   const fetchRegistrations = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found. Access denied.");

//       const res = await axios.get("https://s3conference.ksrce.ac.in/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const allUsers = Array.isArray(res.data) ? res.data : [];

//       // ✅ Use only valid registrations
//       const validRegistrations = allUsers.filter((user) => user?.registration);

//       updateStats(validRegistrations);
//       updateTrend(validRegistrations);
//       updateCountryCounts(validRegistrations);
//     } catch (err) {
//       console.error("Error fetching registrations:", err);
//       alert(err.response?.data?.message || err.message || "Failed to fetch registrations.");
//       setStats({ total: 0, abstractApproved: 0, abstractRejected: 0, paperApproved: 0, revenue: 0 });
//       setTrend([]);
//       setCountryCounts({});
//       setCountryCoordinates({});
//     }
//   }, []);

//   useEffect(() => {
//     fetchRegistrations();
//   }, [fetchRegistrations]);

//   // ✅ Calculate all stats together
//   const updateStats = (data) => {
//     const total = data.length;
//     let abstractApproved = 0;
//     let abstractRejected = 0;
//     let paperApproved = 0;
//     let revenue = 0;

//     data.forEach((user) => {
//       const workflow = user?.workflow || user?.registration?.workflow || {};
//       const payment = user?.payment || user?.registration?.payment || {};

//       const abstractStatus = workflow.abstractStatus?.toLowerCase() || "-";
//       const paperStatus =
//         workflow.finalPaperStatus?.toLowerCase() ||
//         workflow.paperStatus?.toLowerCase() ||
//         user?.registration?.paperStatus?.toLowerCase() ||
//         "-";

//       const paymentStatus = payment.paymentStatus?.toLowerCase() || "unpaid";
//       const amountPaid = safeNumber(payment.amountPaid);

//       if (abstractStatus === "approved") abstractApproved++;
//       if (abstractStatus === "rejected") abstractRejected++;
//       if (paperStatus === "approved") paperApproved++;

//       if (paperStatus === "approved" && paymentStatus === "paid") {
//         revenue += amountPaid;
//       }
//     });

//     setStats({
//       total,
//       abstractApproved,
//       abstractRejected,
//       paperApproved,
//       revenue,
//     });
//   };

//   // --- Trend over time ---
//   const updateTrend = (data) => {
//     const grouped = {};
//     data.forEach((user) => {
//       const date = new Date(user?.createdAt || new Date()).toISOString().split("T")[0];
//       grouped[date] = (grouped[date] || 0) + 1;
//     });
//     const sorted = Object.entries(grouped)
//       .sort((a, b) => new Date(a[0]) - new Date(b[0]))
//       .map(([date, count]) => ({ name: date, value: count }));
//     setTrend(sorted);
//   };

//   // --- Fetch coordinates for countries ---
//   const fetchCountryCoordinates = async (code) => {
//     if (!code || code === "-") return null;
//     try {
//       const res = await axios.get(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`);
//       if (res.data && res.data[0]?.latlng) {
//         return res.data[0].latlng;
//       }
//     } catch (e) {
//       console.debug(`Coordinates lookup failed for ${code}`, e?.message || e);
//     }
//     return null;
//   };

//   // --- Country distribution ---
//   const updateCountryCounts = async (data) => {
//     const counts = {};
//     data.forEach((r) => {
//       const c = r.registration?.country || r.country || "-";
//       counts[c] = (counts[c] || 0) + 1;
//     });
//     setCountryCounts(counts);

//     const uniqueCountries = Object.keys(counts).filter((c) => c && c !== "-");
//     const coordsMap = { ...countryCoordinates };
//     for (const country of uniqueCountries) {
//       if (!coordsMap[country]) {
//         const latlng = await fetchCountryCoordinates(country);
//         if (latlng) coordsMap[country] = latlng;
//       }
//     }
//     setCountryCoordinates(coordsMap);
//   };

//   // ✅ Chart-friendly data
//   const revenueData = [
//     { name: "Abstract Approved", value: stats.abstractApproved },
//     { name: "Abstract Rejected", value: stats.abstractRejected },
//     { name: "Paper Approved", value: stats.paperApproved },
//   ];

//   const statusData = [
//     { name: "Approved", value: stats.abstractApproved },
//     { name: "Rejected", value: stats.abstractRejected },
//     { name: "Pending", value: stats.total - stats.abstractApproved - stats.abstractRejected },
//   ];

//   return (
//     <div className="space-y-6 p-4">
//       {/* StatCards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard icon={icons.total} title="Total Registrations" value={stats.total} change="+5%" isPositive />
//         <StatCard icon={icons.abstractApproved} title="Abstract Approved" value={stats.abstractApproved} change="+3%" isPositive />
//         <StatCard icon={icons.abstractRejected} title="Abstract Rejected" value={stats.abstractRejected} change="-2%" isPositive={false} />
//         <StatCard icon={icons.paperApproved} title="Paper Approved" value={stats.paperApproved} change="+8%" isPositive />
//         <StatCard icon={icons.revenue} title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} change="+12%" isPositive />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <RevenueChart data={revenueData} />
//         <AbstractStatusPie data={statusData} />
//       </div>

//       {/* Trend */}
//       <AbstractTrendChart data={trend} />

//       {/* Map */}
//       <div className="p-4 shadow rounded-lg bg-white">
//         <h2 className="text-xl font-bold mb-4">Participants by Country</h2>
//         <ComposableMap projectionConfig={{ scale: 200 }} style={{ width: "100%", height: "700px" }}>
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography key={geo.rsmKey} geography={geo} fill="#E5E7EB" stroke="#D1D5DB" />
//               ))
//             }
//           </Geographies>
//           {Object.entries(countryCounts).map(([country, count], idx) => {
//             const coords = countryCoordinates[country];
//             if (!coords) return null;
//             return (
//               <Marker key={idx} coordinates={[coords[1], coords[0]]}>
//                 <circle r={Math.sqrt(count) * 2} fill="#F59E0B" stroke="#fff" strokeWidth={1} />
//                 <text textAnchor="middle" y={-10} fontSize={10} fill="#111">{`${country} (${count})`}</text>
//               </Marker>
//             );
//           })}
//         </ComposableMap>
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
// } from "react-simple-maps";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip as RechartTooltip,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ World map source
// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// // --- Colors for charts ---
// const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6366F1", "#8B5CF6"];

// // --- Icons ---
// const icons = {
//   total: (
//     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
//     </svg>
//   ),
//   abstractApproved: (
//     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   abstractRejected: (
//     <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//     </svg>
//   ),
//   paperApproved: (
//     <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m1 10H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"></path>
//     </svg>
//   ),
//   revenue: (
//     <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3h2a1 1 0 0 1 2 0c0 1.105-.895 2-2 2-1.657 0-3 1.343-3 3h8"></path>
//     </svg>
//   ),
// };

// const MainDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     abstractApproved: 0,
//     abstractRejected: 0,
//     paperApproved: 0,
//     revenue: 0,
//   });
//   const [trend, setTrend] = useState([]);
//   const [countryCounts, setCountryCounts] = useState({});
//   const [countryCoordinates, setCountryCoordinates] = useState({});

//   const safeNumber = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   };

//   // --- Fetch registrations ---
//   const fetchRegistrations = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found. Access denied.");

//       const res = await axios.get("https://s3conference.ksrce.ac.in/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const allUsers = Array.isArray(res.data) ? res.data : [];
//       const validRegistrations = allUsers.filter((user) => user?.registration);

//       updateStats(validRegistrations);
//       updateTrend(validRegistrations);
//       updateCountryCounts(validRegistrations);
//     } catch (err) {
//       console.error("Error fetching registrations:", err);
//       alert(err.response?.data?.message || err.message || "Failed to fetch registrations.");
//       setStats({ total: 0, abstractApproved: 0, abstractRejected: 0, paperApproved: 0, revenue: 0 });
//       setTrend([]);
//       setCountryCounts({});
//       setCountryCoordinates({});
//     }
//   }, []);

//   useEffect(() => {
//     fetchRegistrations();
//   }, [fetchRegistrations]);

//   // ✅ Update stats
//   const updateStats = (data) => {
//     const total = data.length;
//     let abstractApproved = 0;
//     let abstractRejected = 0;
//     let paperApproved = 0;
//     let revenue = 0;

//     data.forEach((user) => {
//       const workflow = user?.workflow || user?.registration?.workflow || {};
//       const payment = user?.payment || user?.registration?.payment || {};

//       const abstractStatus = workflow.abstractStatus?.toLowerCase() || "-";
//       const paperStatus =
//         workflow.finalPaperStatus?.toLowerCase() ||
//         workflow.paperStatus?.toLowerCase() ||
//         user?.registration?.paperStatus?.toLowerCase() ||
//         "-";
//       const paymentStatus = payment.paymentStatus?.toLowerCase() || "unpaid";
//       const amountPaid = safeNumber(payment.amountPaid);

//       if (abstractStatus === "approved") abstractApproved++;
//       if (abstractStatus === "rejected") abstractRejected++;
//       if (paperStatus === "approved") paperApproved++;
//       if (paperStatus === "approved" && paymentStatus === "paid") revenue += amountPaid;
//     });

//     setStats({ total, abstractApproved, abstractRejected, paperApproved, revenue });
//   };

//   // --- Trend ---
//   const updateTrend = (data) => {
//     const grouped = {};
//     data.forEach((user) => {
//       const date = new Date(user?.createdAt || new Date()).toISOString().split("T")[0];
//       grouped[date] = (grouped[date] || 0) + 1;
//     });
//     const sorted = Object.entries(grouped)
//       .sort((a, b) => new Date(a[0]) - new Date(b[0]))
//       .map(([date, count]) => ({ name: date, value: count }));
//     setTrend(sorted);
//   };

//   // --- Fetch coordinates ---
//   const fetchCountryCoordinates = async (code) => {
//     if (!code || code === "-") return null;
//     try {
//       const res = await axios.get(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`);
//       if (res.data && res.data[0]?.latlng) return res.data[0].latlng;
//     } catch (e) {
//       console.debug(`Coordinates lookup failed for ${code}:`, e?.message);
//     }
//     return null;
//   };

//   // --- Country distribution ---
//   const updateCountryCounts = async (data) => {
//     const counts = {};
//     data.forEach((r) => {
//       const c = r.registration?.country || r.country || "-";
//       counts[c] = (counts[c] || 0) + 1;
//     });
//     setCountryCounts(counts);

//     const uniqueCountries = Object.keys(counts).filter((c) => c && c !== "-");
//     const coordsMap = { ...countryCoordinates };
//     for (const country of uniqueCountries) {
//       if (!coordsMap[country]) {
//         const latlng = await fetchCountryCoordinates(country);
//         if (latlng) coordsMap[country] = latlng;
//       }
//     }
//     setCountryCoordinates(coordsMap);
//   };

//   const revenueData = [
//     { name: "Abstract Approved", value: stats.abstractApproved },
//     { name: "Abstract Rejected", value: stats.abstractRejected },
//     { name: "Paper Approved", value: stats.paperApproved },
//   ];

//   const statusData = [
//     { name: "Approved", value: stats.abstractApproved },
//     { name: "Rejected", value: stats.abstractRejected },
//     { name: "Pending", value: stats.total - stats.abstractApproved - stats.abstractRejected },
//   ];

//   return (
//     <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
//       {/* --- Stat Cards --- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {[
//           { icon: icons.total, title: "Total Registrations", value: stats.total },
//           { icon: icons.abstractApproved, title: "Abstract Approved", value: stats.abstractApproved },
//           { icon: icons.abstractRejected, title: "Abstract Rejected", value: stats.abstractRejected },
//           { icon: icons.paperApproved, title: "Paper Approved", value: stats.paperApproved },
//           { icon: icons.revenue, title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}` },
//         ].map((card, idx) => (
//           <div key={idx} className="p-4 bg-white shadow rounded-xl flex items-center gap-3 hover:shadow-lg transition">
//             <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
//             <div>
//               <h4 className="text-gray-600 text-sm font-semibold">{card.title}</h4>
//               <p className="text-xl font-bold text-gray-800">{card.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- Charts --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Pie Chart */}
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h2 className="text-lg font-bold mb-3">Abstract Status Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//                 {statusData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <RechartTooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Line Chart */}
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h2 className="text-lg font-bold mb-3">Registration Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={trend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <RechartTooltip />
//               <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* --- Map Section --- */}
//       <div className="p-4 shadow rounded-xl bg-white">
//         <h2 className="text-xl font-bold mb-4">Participants by Country</h2>
//         <ComposableMap projectionConfig={{ scale: 200 }} style={{ width: "100%", height: "700px" }}>
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography key={geo.rsmKey} geography={geo} fill="#E5E7EB" stroke="#D1D5DB" />
//               ))
//             }
//           </Geographies>
//           {Object.entries(countryCounts).map(([country, count], idx) => {
//             const coords = countryCoordinates[country];
//             if (!coords) return null;
//             return (
//               <Marker key={idx} coordinates={[coords[1], coords[0]]}>
//                 <circle r={Math.sqrt(count) * 2} fill="#F59E0B" stroke="#fff" strokeWidth={1} />
//                 <text textAnchor="middle" y={-10} fontSize={10} fill="#111">
//                   {`${country} (${count})`}
//                 </text>
//               </Marker>
//             );
//           })}
//         </ComposableMap>
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Loader2,
  Download,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
  Globe,
} from "lucide-react";

/* ----------------------------- Small Components & Utils ----------------------------- */

// World map source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Colors for charts
const COLORS = ["#10B981", "#EF4444", "#F59E0B", "#6366F1", "#8B5CF6"];

// Icon map
const icons = {
  total: <Users className="w-6 h-6 text-blue-500" />,
  abstractApproved: <CheckCircle className="w-6 h-6 text-green-500" />,
  abstractRejected: <XCircle className="w-6 h-6 text-red-500" />,
  paperApproved: <FileText className="w-6 h-6 text-indigo-500" />,
  revenue: <DollarSign className="w-6 h-6 text-purple-500" />,
  countries: <Globe className="w-6 h-6 text-emerald-500" />,
};

// Reusable Modal Component
const Modal = ({ children, onClose, size = "md" }) => {
  const sizeClasses = { sm: "max-w-sm", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-xl p-6 relative`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl">
          <XCircle className="w-6 h-6" />
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

// Abstract Status Pie Chart Component
const AbstractStatusPie = ({ data }) => (
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

// Registration Trend Chart Component
const RegistrationTrendChart = ({ data }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Registration Trend</h3>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          name="Registrations"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Status Snapshot Chart Component
const StatusSnapshotChart = ({ stats }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h3 className="text-lg font-semibold mb-3">Registration Overview</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={[
          {
            name: "Overview",
            total: stats.total,
            abstractApproved: stats.abstractApproved,
            paperApproved: stats.paperApproved,
          },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" name="Total Registrations" fill="#3B82F6" />
        <Bar dataKey="abstractApproved" name="Abstract Approved" fill="#10B981" />
        <Bar dataKey="paperApproved" name="Paper Approved" fill="#8B5CF6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

/* ----------------------------- Main Component ----------------------------- */

const MainDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    abstractApproved: 0,
    abstractRejected: 0,
    paperApproved: 0,
    revenue: 0,
    totalCountries: 0,
  });
  const [trend, setTrend] = useState([]);
  const [countryCounts, setCountryCounts] = useState({});
  const [countryCoordinates, setCountryCoordinates] = useState({});
  const [loading, setLoading] = useState(true);
  const [countryModalData, setCountryModalData] = useState(null);

  const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // Fetch registrations
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Access denied.");

      const res = await axios.get("https://s3conference.ksrce.ac.in/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allUsers = Array.isArray(res.data) ? res.data : [];
      const validRegistrations = allUsers.filter((user) => user?.registration);

      updateStats(validRegistrations);
      updateTrend(validRegistrations);
      await updateCountryCounts(validRegistrations);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setStats({ total: 0, abstractApproved: 0, abstractRejected: 0, paperApproved: 0, revenue: 0, totalCountries: 0 });
      setTrend([]);
      setCountryCounts({});
      setCountryCoordinates({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Update stats
  const updateStats = (data) => {
    const total = data.length;
    let abstractApproved = 0;
    let abstractRejected = 0;
    let paperApproved = 0;
    let revenue = 0;

    data.forEach((user) => {
      const workflow = user?.workflow || user?.registration?.workflow || {};
      const payment = user?.payment || user?.registration?.payment || {};

      const abstractStatus = (workflow.abstractStatus || "").toLowerCase();
      const paperStatus = (
        workflow.finalPaperStatus ||
        workflow.paperStatus ||
        user?.registration?.paperStatus ||
        ""
      ).toLowerCase();
      const paymentStatus = (payment.paymentStatus || "unpaid").toLowerCase();
      const amountPaid = safeNumber(payment.amountPaid);

      if (abstractStatus === "approved") abstractApproved++;
      if (abstractStatus === "rejected") abstractRejected++;
      if (paperStatus === "approved") paperApproved++;
      if (paymentStatus === "paid") revenue += amountPaid;
    });

    setStats({ 
      total, 
      abstractApproved, 
      abstractRejected, 
      paperApproved, 
      revenue,
      totalCountries: Object.keys(countryCounts).length 
    });
  };

  // Update trend
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
  };

  // Fetch country coordinates
  const fetchCountryCoordinates = async (code) => {
    if (!code || code === "-") return null;
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`);
      if (res.data && res.data[0]?.latlng) return res.data[0].latlng;
    } catch (e) {
      console.debug(`Coordinates lookup failed for ${code}:`, e?.message);
    }
    return null;
  };

  // Country distribution
  const updateCountryCounts = async (data) => {
    const counts = {};
    data.forEach((r) => {
      const c = r.registration?.country || r.country || "-";
      if (c && c !== "-") {
        counts[c] = (counts[c] || 0) + 1;
      }
    });
    setCountryCounts(counts);

    const uniqueCountries = Object.keys(counts).filter((c) => c && c !== "-");
    const coordsMap = { ...countryCoordinates };
    
    // Fetch coordinates for new countries
    for (const country of uniqueCountries) {
      if (!coordsMap[country]) {
        const latlng = await fetchCountryCoordinates(country);
        if (latlng) coordsMap[country] = latlng;
      }
    }
    setCountryCoordinates(coordsMap);
  };

  // Handle Export to Excel
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

  // Chart data
  const statusData = [
    { name: "Approved", value: stats.abstractApproved },
    { name: "Rejected", value: stats.abstractRejected },
    { name: "Pending/Review", value: stats.total - stats.abstractApproved - stats.abstractRejected },
  ];

  // Country data for table
  const countryData = useMemo(() => {
    return Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }, [countryCounts]);

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Main Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of registrations, abstracts, papers, and global participation.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={icons.total} 
          title="Total Registrations" 
          value={stats.total}
          hint="All registered users"
        />
        <StatCard 
          icon={icons.abstractApproved} 
          title="Abstract Approved" 
          value={stats.abstractApproved}
          hint="Approved abstracts"
        />
        <StatCard 
          icon={icons.abstractRejected} 
          title="Abstract Rejected" 
          value={stats.abstractRejected}
          hint="Rejected abstracts"
        />
        <StatCard 
          icon={icons.paperApproved} 
          title="Paper Approved" 
          value={stats.paperApproved}
          hint="Approved final papers"
        />
        <StatCard 
          icon={icons.revenue} 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`}
          hint="Total payments received"
        />
        <StatCard 
          icon={icons.countries} 
          title="Countries" 
          value={stats.totalCountries}
          hint="Participating countries"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AbstractStatusPie data={statusData} />
        <RegistrationTrendChart data={trend} />
      </div>

      {/* Status Snapshot Chart */}
      <StatusSnapshotChart stats={stats} />

      {/* Map Section */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b bg-gray-50">
          <div>
            <h3 className="text-lg font-semibold">Global Participation Map</h3>
            <p className="text-sm text-gray-500">Participants distribution across countries</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchRegistrations}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : 'Refresh'}
            </button>
            <button
              onClick={handleExportExcel}
              className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>
        </div>

        <div className="p-4">
          <ComposableMap 
            projectionConfig={{ scale: 120, center: [20, 0] }} 
            style={{ width: "100%", height: "500px" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#D1D5DB"
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#D1D5DB', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            {Object.entries(countryCounts).map(([country, count], idx) => {
              const coords = countryCoordinates[country];
              if (!coords || count === 0) return null;
              
              const radius = Math.min(Math.max(Math.sqrt(count) * 3, 5), 20);
              
              return (
                <Marker key={idx} coordinates={[coords[1], coords[0]]}>
                  <circle 
                    r={radius} 
                    fill="#F59E0B" 
                    fillOpacity={0.7}
                    stroke="#D97706" 
                    strokeWidth={1}
                    className="cursor-pointer hover:fill-#D97706"
                    onClick={() => setCountryModalData({ country, count })}
                  />
                  {count > 5 && (
                    <text 
                      textAnchor="middle" 
                      y={-radius - 5} 
                      fontSize={10} 
                      fill="#111827"
                      fontWeight="bold"
                    >
                      {count}
                    </text>
                  )}
                </Marker>
              );
            })}
          </ComposableMap>
        </div>

        {/* Country Table */}
        <div className="border-t">
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-3">Country-wise Participation</h4>
            {countryData.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No country data available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Country</th>
                      <th className="p-3 text-center">Participants</th>
                      <th className="p-3 text-right">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {countryData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.country}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {item.count}
                          </span>
                        </td>
                        <td className="p-3 text-right text-gray-600">
                          {((item.count / stats.total) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Country Details Modal */}
      {countryModalData && (
        <Modal onClose={() => setCountryModalData(null)} size="sm">
          <div className="text-center">
            <Globe className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{countryModalData.country}</h3>
            <p className="text-gray-600 mb-4">
              Total Participants: <span className="font-bold text-2xl text-emerald-600">{countryModalData.count}</span>
            </p>
            <p className="text-sm text-gray-500">
              {((countryModalData.count / stats.total) * 100).toFixed(1)}% of total registrations
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MainDashboard;