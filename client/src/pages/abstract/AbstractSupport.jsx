// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import axios from "axios";
// import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs";
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
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   RefreshCw,
//   BarChart3,
//   MoreVertical,
//   Edit,
//   Trash2,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
//   ChevronRight as ChevronRightIcon,
// } from "lucide-react";

// /* ----------------------------- Updated Styles ----------------------------- */
// const abstractStyles = `
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

//   /* NEW: Proof view styles */
//   .proof-view-header {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 16px 24px;
//     border-bottom: 1px solid var(--border-light);
//     background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
//   }

//   .proof-view-content {
//     padding: 24px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 16px;
//   }

//   .proof-image {
//     max-width: 100%;
//     max-height: 60vh;
//     border-radius: 12px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }

//   .proof-url {
//     word-break: break-all;
//     text-align: center;
//     color: var(--text-secondary);
//     font-size: 0.875rem;
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

// // Team Modal with improved design and no scroll bars
// const TeamModal = ({ teamData, onClose, onViewProof }) => {
//   const [currentView, setCurrentView] = useState('team'); // 'team' or 'proof'
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
//         <div className="proof-view-header">
//           <button
//             onClick={handleBackToTeam}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <ChevronLeft className="w-5 h-5" />
//             Back to Team
//           </button>
//           <h3 className="text-lg font-semibold flex-1 text-center">
//             Proof Document - {proofMember?.name}
//           </h3>
//           <div className="w-9"></div> {/* Spacer for balance */}
//         </div>
        
//         <div className="proof-view-content">
//           {currentProof ? (
//             <>
//               <img 
//                 src={currentProof} 
//                 alt="Proof Document" 
//                 className="proof-image"
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
//               <div className="proof-url">
//                 <p className="text-sm text-gray-500">Proof URL:</p>
//                 <p className="text-xs break-all">{currentProof}</p>
//               </div>
//               <button 
//                 onClick={() => window.open(currentProof, '_blank')}
//                 className="btn btn-primary mt-4"
//               >
//                 <Eye className="w-4 h-4" />
//                 Open in New Tab
//               </button>
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
//     <Modal onClose={onClose} size="xl"> {/* Changed from lg to xl for more space */}
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900">
//           Team Members for "{teamData.title}"
//         </h3>
//         <p className="text-sm text-gray-600 mt-1">
//           {Array.isArray(teamData.team) ? `${teamData.team.length} team members` : 'No team members'}
//         </p>
//       </div>
      
//       {Array.isArray(teamData.team) && teamData.team.length ? (
//         <div className="p-1"> {/* Reduced padding to maximize space */}
//           <div className="overflow-visible"> {/* Changed from overflow-x-auto to overflow-visible */}
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50">
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
//           <p className="text-sm">This abstract doesn't have any team members associated with it.</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

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
//             className="btn btn-primary"
//           >
//             <Eye className="w-4 h-4" />
//             Open in New Tab
//           </button>
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

// // Date Filter Component
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
//     { label: "Year to date", days: new Date().getDate() + (new Date().getMonth() * 30) },
//     { label: "This month", days: new Date().getDate() },
//     { label: "Previous month", days: 30 },
//     { label: "Previous quarter", days: 90 },
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
    
//     const start = new Date(currentRange.startDate);
//     const end = new Date(currentRange.endDate);
    
//     // Format for display - show abbreviated version if same month
//     if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
//       return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('en', { month: 'short' })}`;
//     }
    
//     return `${start.toLocaleDateString('en', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en', { day: 'numeric', month: 'short' })}`;
//   };

//   return (
//     <div className="filter-dropdown">
//       <button
//         className="btn btn-outline btn-sm"
//         onClick={() => setIsOpen(!isOpen)}
//         style={{ whiteSpace: 'nowrap' }}
//       >
//         <Filter className="w-4 h-4" />
//         <span className="truncate max-w-[120px]">{formatDateRange()}</span>
//         <ChevronRightIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="filter-menu">
//           <div className="mb-4">
//             <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
//               Quick Ranges
//             </h4>
//             <div className="quick-ranges-section">
//               <div className="space-y-1">
//                 {quickRanges.map((range) => (
//                   <button
//                     key={range.label}
//                     className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm border border-transparent hover:border-gray-200"
//                     onClick={() => handleQuickRange(range.days)}
//                   >
//                     {range.label}
//                   </button>
//                 ))}
//               </div>
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
//                   max={endDate || new Date().toISOString().split('T')[0]}
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
//                   min={startDate}
//                   max={new Date().toISOString().split('T')[0]}
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
//   const [actionMenuOpen, setActionMenuOpen] = useState(null);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   // Date filter state for trend chart
//   const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

//   const computeStats = useCallback((data) => {
//     const total = data.length;
//     const approved = data.filter((d) => 
//       d.status.toLowerCase() === "approved" || 
//       d.abstractStatus?.toLowerCase() === "approved"
//     ).length;
//     const rejected = data.filter((d) => 
//       d.status.toLowerCase() === "rejected" || 
//       d.abstractStatus?.toLowerCase() === "rejected"
//     ).length;
//     const pending = data.filter((d) => 
//       d.status.toLowerCase() === "pending" || 
//       d.status.toLowerCase() === "submitted" || 
//       d.status.toLowerCase() === "under review" ||
//       d.abstractStatus?.toLowerCase() === "pending" ||
//       d.abstractStatus?.toLowerCase() === "submitted" ||
//       d.abstractStatus?.toLowerCase() === "under review" ||
//       !d.status
//     ).length;

//     setStats({
//       total,
//       approved,
//       rejected,
//       pending,
//     });
//   }, []);

//   const computeTrend = useCallback((data, dateFilter = null) => {
//     const groups = {};
    
//     data.forEach((item) => {
//       const dateStr = item.createdAt || item.workflow?.createdAt || item.registration?.createdAt || new Date().toISOString();
//       const date = new Date(dateStr).toISOString().split("T")[0];
      
//       // Apply date filter if provided
//       if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
//         const itemDate = new Date(date);
//         const startDate = new Date(dateFilter.startDate);
//         const endDate = new Date(dateFilter.endDate);
//         endDate.setHours(23, 59, 59, 999); // Include the entire end date
        
//         if (itemDate < startDate || itemDate > endDate) {
//           return; // Skip items outside the date range
//         }
//       }
      
//       groups[date] = (groups[date] || 0) + 1;
//     });

//     let arr = Object.entries(groups)
//       .map(([date, count]) => ({ date, count }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));

//     // If no data after filtering, show empty chart
//     if (arr.length === 0) {
//       setTrend([]);
//       return;
//     }

//     // If we have a date filter, ensure we show all dates in the range (even zero counts)
//     if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
//       const start = new Date(dateFilter.startDate);
//       const end = new Date(dateFilter.endDate);
//       const allDates = [];
      
//       // Create a map of existing data for easy lookup
//       const existingDataMap = {};
//       arr.forEach(item => {
//         existingDataMap[item.date] = item.count;
//       });
      
//       // Generate all dates in the range
//       const currentDate = new Date(start);
//       while (currentDate <= end) {
//         const dateStr = currentDate.toISOString().split('T')[0];
//         allDates.push({
//           date: dateStr,
//           count: existingDataMap[dateStr] || 0
//         });
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
      
//       arr = allDates;
//     }

//     setTrend(arr);
//   }, []);

//   const handleDateRangeChange = useCallback((startDate, endDate) => {
//     const newDateRange = { startDate, endDate };
//     setDateRange(newDateRange);
//     computeTrend(abstracts, newDateRange);
//   }, [abstracts, computeTrend]);

//   const formatProofUrl = (url) => {
//     if (!url) return null;
    
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//       return url;
//     }
    
//     if (url.startsWith('/uploads/')) {
//       return `http://localhost:5000${url}`;
//     }
    
//     if (url.includes('proof_') && !url.includes('/')) {
//       return `http://localhost:5000/uploads/proofs/${url}`;
//     }
    
//     return url;
//   };

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

//     const abstractData = {
//       id: item._id || item.id,
//       userId: item.userId || "N/A",
//       authorName: item.name || item.registration?.participants?.[0]?.name || "Unknown",
//       email: item.registration?.participants?.[0]?.email || item.email || "-",
//       mobile: item.registration?.participants?.[0]?.phone || item.phone || "-",
//       uniqueId: item.registration?.uniqueId || item.uniqueId || "-",
//       track: item.registration?.track || item.track || "-",
//       presentationMode: item.registration?.presentationMode || item.presentationMode || "-",
//       title: item.registration?.abstractTitle || item.abstractTitle || item.title || "No Title",
//       content: item.registration?.abstractContent || item.abstractContent || item.content || "No content available",
//       team: teamMembers,
//       country: item.registration?.country || item.country || "-",
//       proofUrl: formatProofUrl(item.registration?.proofUrl || item.proofUrl),
//       status: (item.workflow?.abstractStatus || item.abstractStatus || item.status || "pending").toLowerCase(),
//       createdAt: item.workflow?.createdAt || item.createdAt || item.registration?.createdAt || new Date().toISOString(),
//     };

//     return abstractData;
//   };

//   const fetchAbstracts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const { data } = await axios.get(
//         "http://localhost:5000/api/admin/users",
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           } 
//         }
//       );

//       let usersData = [];
//       if (Array.isArray(data)) {
//         usersData = data;
//       } else if (data && Array.isArray(data.users)) {
//         usersData = data.users;
//       } else if (data && Array.isArray(data.data)) {
//         usersData = data.data;
//       } else {
//         usersData = [];
//       }

//       const formatted = usersData.map(formatAbstract);
      
//       const filteredData = formatted.filter(
//         (item) =>
//           item.content &&
//           item.content.trim() !== "" &&
//           item.content !== "No content available"
//       );

//       setAbstracts(filteredData);
//       computeStats(filteredData);
//       computeTrend(filteredData, dateRange);
//       setCurrentPage(1);
      
//     } catch (err) {
//       console.error("Error fetching abstracts:", err);
//       setAbstracts([]);
//       setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
//       setTrend([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [computeStats, computeTrend, dateRange]);

//   useEffect(() => {
//     fetchAbstracts();
//   }, [fetchAbstracts, refreshTrigger]);

//   // Sorting function
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Sort and filter abstracts
//   const filteredAndSearchedAbstracts = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     const isAllStatus = statusFilter.toLowerCase() === "all";

//     let filtered = abstracts.filter((abs) => {
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
//   }, [abstracts, searchTerm, statusFilter, sortConfig]);

//   const paginatedAbstracts = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSearchedAbstracts.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSearchedAbstracts, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredAndSearchedAbstracts.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       approved: { class: "status-indicator-approved", label: "Approved" },
//       rejected: { class: "status-indicator-rejected", label: "Rejected" },
//       pending: { class: "status-indicator-pending", label: "Pending" },
//       "under review": { class: "status-indicator-under-review", label: "Under Review" },
//       submitted: { class: "status-indicator-under-review", label: "Submitted" },
//     };
    
//     const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
//     return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
//   };

//   const handleExportExcel = () => {
//     if (!filteredAndSearchedAbstracts.length) {
//       alert("No data to export!");
//       return;
//     }

//     const exportData = filteredAndSearchedAbstracts.map((abs) => ({
//       "Unique ID": abs.uniqueId,
//       "User ID": abs.userId,
//       "Author Name": abs.authorName,
//       "Email": abs.email,
//       "Mobile": abs.mobile,
//       "Title": abs.title,
//       "Track": abs.track,
//       "Presentation Mode": abs.presentationMode,
//       "Abstract Status": abs.status,
//       "Country": abs.country,
//       "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
//       "Team Size": abs.team?.length || 0,
//     }));

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
    
//     const fileName = `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`;
//     XLSX.writeFile(wb, fileName);
//   };

//   const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
//     if (!abstractModalData) return;

//     setActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const payload = {
//         abstractStatus: newStatus.toLowerCase(),
//       };

//       if (newStatus.toLowerCase() === "rejected" && reason) {
//         payload.abstractrejectedReason = reason;
//       }

//       const API_URL = `http://localhost:5000/api/admin/update/${abstractModalData.id}`;

//       const response = await axios.put(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data?.success || response.data?.message) {
//         alert(`✅ Abstract status updated to "${newStatus}"`);
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       } else {
//         alert(response.data?.message || "Abstract status updated successfully");
//         updateAbstractLocal(abstractModalData.id, newStatus);
//         setAbstractModalData(null);
//         setRejectionModalData(null);
//         setRejectionReason("");
//         setRefreshTrigger(prev => !prev);
//       }
//     } catch (err) {
//       console.error("❌ Error updating abstract status:", err);
//       alert("Failed to update abstract status");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const updateAbstractLocal = useCallback((id, newStatus) => {
//     setAbstracts((prevAbstracts) => {
//       const updatedAbstracts = prevAbstracts.map((abs) => {
//         if (abs.id === id) {
//           return { ...abs, status: newStatus.toLowerCase() };
//         }
//         return abs;
//       });
      
//       computeStats(updatedAbstracts);
//       computeTrend(updatedAbstracts, dateRange);
//       return updatedAbstracts;
//     });
//   }, [computeStats, computeTrend, dateRange]);

//   const handleRejectionSubmit = () => {
//     if (!rejectionReason.trim()) {
//       alert("Please provide a reason for rejection.");
//       return;
//     }
//     handleAbstractStatusUpdate("rejected", rejectionReason.trim());
//   };

//   const handleViewProof = async (proofUrl) => {
//     if (!proofUrl) {
//       alert("No proof available for this team member.");
//       return;
//     }

//     let finalUrl = proofUrl;
    
//     if (proofUrl.startsWith('/')) {
//       finalUrl = `http://localhost:5000${proofUrl}`;
//     }
    
//     if (proofUrl.includes('proof_') && !proofUrl.includes('/')) {
//       finalUrl = `http://localhost:5000/uploads/proofs/${proofUrl}`;
//     }

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
//     }
//   };

//   // Chart data for donut chart
//   const donutChartData = [
//     { name: "Approved", value: stats.approved, color: "#10B981" },
//     { name: "Rejected", value: stats.rejected, color: "#EF4444" },
//     { name: "Pending", value: stats.pending, color: "#F59E0B" },
//   ].filter(item => item.value > 0);

//   // Date filter controls for trend chart
//   const trendChartControls = (
//     <DateFilter 
//       onDateRangeChange={handleDateRangeChange}
//       currentRange={dateRange}
//     />
//   );

//   return (
//     <>
//       <style>{abstractStyles}</style>
//       <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '32px' }}>
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-bold mb-3 header-gradient leading-tight">
//                 Abstract Management
//               </h1>
//               <p className="text-base flex items-center gap-2" style={{ color: '#6c757d' }}>
//                 <BarChart3 className="w-4 w-4" />
//                 Review and manage abstract submissions with comprehensive analytics
//               </p>
//             </div>
//             <button
//               onClick={fetchAbstracts}
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
//               icon={<FileText className="w-6 h-6" />}
//               title="Total Abstracts" 
//               value={stats.total.toLocaleString()}
//               hint="All submitted abstracts"
//               color="#1976D2"
//               colorDark="#0D47A1"
//             />
//             <StatCard 
//               icon={<CheckCircle className="w-6 h-6" />}
//               title="Approved" 
//               value={stats.approved.toLocaleString()}
//               hint="Accepted for presentation"
//               color="#10B981"
//               colorDark="#059669"
//             />
//             <StatCard 
//               icon={<XCircle className="w-6 h-6" />}
//               title="Rejected" 
//               value={stats.rejected.toLocaleString()}
//               hint="Not accepted"
//               color="#EF4444"
//               colorDark="#DC2626"
//             />
//             <StatCard 
//               icon={<Clock className="w-6 h-6" />}
//               title="Pending Review" 
//               value={stats.pending.toLocaleString()}
//               hint="Awaiting decision"
//               color="#F59E0B"
//               colorDark="#D97706"
//             />
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* UPDATED: Donut Chart */}
//             <DonutChart 
//               title="Paper Submission Status"
//               subtitle="Breakdown of paper submission reviews"
//               data={donutChartData}
//             />

//             <ChartCard 
//               title="Submission Trend"
//               subtitle="Daily abstract submission pattern"
//               controls={trendChartControls}
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
//                       allowDecimals={false}
//                       tick={{ fill: '#6c757d', fontSize: 12 }}
//                       axisLine={{ stroke: '#e2e8f0' }}
//                       tickLine={false}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Line
//                       type="monotone"
//                       dataKey="count"
//                       name="Abstracts"
//                       stroke="#1976D2"
//                       strokeWidth={3}
//                       dot={{ r: 4, strokeWidth: 2, stroke: '#1976D2', fill: 'white' }}
//                       activeDot={{ r: 6, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex items-center justify-center h-64">
//                   <p style={{ color: '#6c757d' }}>
//                     {dateRange.startDate && dateRange.endDate 
//                       ? 'No submissions in the selected date range' 
//                       : 'No trend data available'
//                     }
//                   </p>
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
//                   Abstract Submissions
//                 </h3>
//                 <span style={{ color: '#6c757d' }}>
//                   {filteredAndSearchedAbstracts.length} records found
//                 </span>
//               </div>
//               <div className="table-actions">
//                 <div className="search-box">
//                   <Search className="w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search abstracts..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="filter-select"
//                 >
//                   <option value="All">All Status</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="pending">Pending</option>
//                   <option value="under review">Under Review</option>
//                 </select>
//                 <button
//                   onClick={handleExportExcel}
//                   className="btn btn-success btn-sm"
//                   disabled={filteredAndSearchedAbstracts.length === 0}
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
//                 <span className="mt-3" style={{ color: '#6c757d' }}>Loading abstracts...</span>
//               </div>
//             ) : filteredAndSearchedAbstracts.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">
//                   <FileText className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 style={{ color: '#111318', marginBottom: '8px' }}>
//                   {abstracts.length === 0 ? 'No abstracts found' : 'No matching abstracts'}
//                 </h4>
//                 <p style={{ color: '#6c757d', marginBottom: '20px' }}>
//                   {abstracts.length === 0 
//                     ? 'There are no abstract submissions yet.' 
//                     : 'Try adjusting your search or filter criteria.'
//                   }
//                 </p>
//                 {abstracts.length === 0 && (
//                   <button 
//                     onClick={fetchAbstracts}
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
//                       <tr>
//                         <SortableHeader field="authorName" sortConfig={sortConfig} onSort={handleSort}>
//                           Author
//                         </SortableHeader>
//                         <th>Email</th>
//                         <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
//                           Title
//                         </SortableHeader>
//                         <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
//                           Track
//                         </SortableHeader>
//                         <SortableHeader field="status" sortConfig={sortConfig} onSort={handleSort}>
//                           Status
//                         </SortableHeader>
//                         <th>Team</th>
//                         <th style={{ textAlign: 'center' }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedAbstracts.map((abs) => (
//                         <tr key={abs.id}>
//                           <td>
//                             <div>
//                               <div className="font-semibold" style={{ color: '#111318', fontSize: '0.85rem' }}>
//                                 {abs.authorName}
//                               </div>
//                               <div className="text-xs" style={{ color: '#6c757d' }}>
//                                 {abs.userId}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="text-sm" style={{ color: '#475569' }}>
//                               {abs.email}
//                             </div>
//                           </td>
//                           <td>
//                             <div 
//                               className="font-medium"
//                               title={abs.title}
//                               style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '250px' }}
//                             >
//                               {abs.title}
//                             </div>
//                           </td>
//                           <td>
//                             <span style={{ color: '#475569', fontSize: '0.875rem' }}>
//                               {abs.track}
//                             </span>
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {getStatusBadge(abs.status)}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             {Array.isArray(abs.team) && abs.team.length ? (
//                               <button
//                                 onClick={() => setTeamModalData(abs)}
//                                 className="team-button"
//                               >
//                                 <Eye className="w-4 h-4" />
//                                 View Team ({abs.team.length})
//                               </button>
//                             ) : (
//                               <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ textAlign: 'center' }}>
//                             <div className="action-buttons">
//                               <button
//                                 onClick={() => setAbstractModalData(abs)}
//                                 className="review-button"
//                               >
//                                 <FileText className="w-4 h-4" />
//                                 Review
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
                
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

//       {/* UPDATED: Use the new TeamModal component */}
//       {teamModalData && (
//         <TeamModal 
//           teamData={teamModalData} 
//           onClose={() => setTeamModalData(null)}
//         />
//       )}

//       {abstractModalData && (
//         <Modal onClose={() => setAbstractModalData(null)} size="lg">
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-2">
//               Abstract Review: {abstractModalData.authorName}
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Title: {abstractModalData.title}
//             </p>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
//                 <span className="font-semibold">Current Status:</span>
//                 {getStatusBadge(abstractModalData.status)}
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-bold mb-2">Abstract Details</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Track:</strong> {abstractModalData.track}</div>
//                   <div><strong>Presentation Mode:</strong> {abstractModalData.presentationMode}</div>
//                   <div><strong>Email:</strong> {abstractModalData.email}</div>
//                   <div><strong>Mobile:</strong> {abstractModalData.mobile}</div>
//                   <div><strong>Country:</strong> {abstractModalData.country}</div>
//                   <div><strong>Unique ID:</strong> {abstractModalData.uniqueId}</div>
//                   <div><strong>Team Size:</strong> {abstractModalData.team?.length || 0}</div>
//                 </div>
//               </div>

//               <div className="p-4 border rounded-xl max-h-60 overflow-y-auto">
//                 <h4 className="font-bold mb-2">Abstract Content</h4>
//                 <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                   {abstractModalData.content}
//                 </p>
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t">
//                 <button
//                   onClick={() => {
//                     setRejectionModalData(abstractModalData);
//                     setRejectionReason("");
//                   }}
//                   className="btn btn-outline"
//                   disabled={actionLoading}
//                 >
//                   <XCircle className="w-4 h-4" /> Reject
//                 </button>
                
//                 <button
//                   onClick={() => handleAbstractStatusUpdate("under review")}
//                   disabled={actionLoading}
//                   className="btn btn-outline"
//                 >
//                   <Clock className="w-4 h-4" />
//                   {actionLoading ? "Processing..." : "Under Review"}
//                 </button>

//                 <button
//                   onClick={() => handleAbstractStatusUpdate("approved")}
//                   disabled={actionLoading}
//                   className="btn btn-success"
//                 >
//                   <CheckCircle className="w-4 h-4" /> 
//                   {actionLoading ? "Processing..." : "Approve"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}

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
//               className="w-full border rounded-xl p-4 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
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
//                 Reject Abstract
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {imagePreviewUrl && (
//         <ImagePreviewModal 
//           imageUrl={imagePreviewUrl} 
//           onClose={() => setImagePreviewUrl(null)} 
//         />
//       )}
//     </>
//   );
// };

// export default AbstractSupport;

import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs";
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
  Filter,
  RefreshCw,
  BarChart3,
  MoreVertical,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

/* ----------------------------- Updated Styles (Compacted) ----------------------------- */
const abstractStyles = `
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
    gap: 6px; /* Reduced */
    padding: 8px 16px; /* Reduced */
    border: none;
    border-radius: 8px; /* Reduced */
    font-size: 0.85rem; /* Reduced */
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

  .table-modern th .sortable {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .table-modern tbody tr {
    border-bottom: 1px solid #f1f5f9;
    position: relative;
  }

  .table-modern tbody tr:last-child {
    border-bottom: none;
  }

  .table-modern tbody tr:hover {
    background: inherit;
    transform: none;
    box-shadow: none;
  }

  .table-modern tbody tr:hover::before {
    display: none;
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
    backdrop-filter: blur(8px); /* Reduced blur */
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

  /* --- NEW: Redesigned Status Indicator Styles --- */
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

  /* UPDATED: New button colors for View Team and Review buttons */
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

  .review-button {
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

  .review-button:hover {
    background: linear-gradient(135deg, #7C3AED, #6D28D9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  }

  /* Date Filter Styles */
  .filter-dropdown {
    position: relative;
    display: inline-block;
  }

  .filter-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--border-light);
    padding: 12px; /* Reduced */
    min-width: 240px; /* Reduced */
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
    padding: 6px 10px; /* Reduced */
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 0.8rem; /* Reduced */
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

  /* NEW: Proof view styles */
  .proof-view-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px; /* Reduced */
    border-bottom: 1px solid var(--border-light);
    background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  }

  .proof-view-content {
    padding: 20px; /* Reduced */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .proof-image {
    max-width: 100%;
    max-height: 60vh;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .proof-url {
    word-break: break-all;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.8rem; /* Reduced */
  }

  /* NEW: Donut Chart Styles */
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
    padding: 8px 12px; /* Reduced */
    text-align: left;
    font-size: 0.7rem; /* Reduced */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 2px solid #e5e7eb;
    white-space: nowrap;
  }

  .modal-content td {
    padding: 8px 12px; /* Reduced */
    font-size: 0.8rem; /* Reduced */
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
  }

  .modal-content tbody tr:last-child td {
    border-bottom: none;
  }

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
        <div className="flex-1 overflow-hidden rounded-xl bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

// Team Modal with improved design and no scroll bars
const TeamModal = ({ teamData, onClose }) => {
  const [currentView, setCurrentView] = useState('team'); // 'team' or 'proof'
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
        <div className="proof-view-header">
          <button
            onClick={handleBackToTeam}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <h3 className="text-base font-semibold flex-1 text-center">
            Proof - {proofMember?.name}
          </h3>
          <div className="w-9"></div> {/* Spacer for balance */}
        </div>
        
        <div className="proof-view-content">
          {currentProof ? (
            <>
              <img 
                src={currentProof} 
                alt="Proof Document" 
                className="proof-image"
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
              <div className="proof-url">
                <p className="text-xs text-gray-500">Proof URL:</p>
                <p className="text-xs break-all">{currentProof}</p>
              </div>
              <button 
                onClick={() => window.open(currentProof, '_blank')}
                className="btn btn-primary btn-sm mt-2"
              >
                <Eye className="w-4 h-4" />
                Open in New Tab
              </button>
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
          <div className="overflow-visible">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
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
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
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
                          View
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
          <p className="text-xs">This abstract doesn't have any team members associated with it.</p>
        </div>
      )}
    </Modal>
  );
};

const ImagePreviewModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl max-h-[90vh] w-full relative">
        <button 
          onClick={onClose} 
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-3 border-b">
          <h3 className="text-base font-semibold">Proof Document Preview</h3>
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
        <div className="p-3 border-t flex justify-between items-center">
          <span className="text-xs text-gray-500 break-all flex-1 mr-4">
            {imageUrl}
          </span>
          <button 
            onClick={() => window.open(imageUrl, '_blank')}
            className="btn btn-primary btn-sm"
          >
            <Eye className="w-4 h-4" />
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
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
      {data.map((entry) => (
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
                innerRadius={55}
                outerRadius={75}
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

// Date Filter Component
const DateFilter = ({ onDateRangeChange, currentRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const quickRanges = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "Last 6 months", days: 180 },
    { label: "Last year", days: 365 },
    { label: "Year to date", days: new Date().getDate() + (new Date().getMonth() * 30) },
    { label: "This month", days: new Date().getDate() },
    { label: "Previous month", days: 30 },
    { label: "Previous quarter", days: 90 },
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
    
    const start = new Date(currentRange.startDate);
    const end = new Date(currentRange.endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('en', { month: 'short' })}`;
    }
    
    return `${start.toLocaleDateString('en', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en', { day: 'numeric', month: 'short' })}`;
  };

  return (
    <div className="filter-dropdown">
      <button
        className="btn btn-outline btn-sm"
        onClick={() => setIsOpen(!isOpen)}
        style={{ whiteSpace: 'nowrap' }}
      >
        <Filter className="w-3 h-3" />
        <span className="truncate max-w-[120px]">{formatDateRange()}</span>
        <ChevronRightIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="filter-menu">
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Quick Ranges
            </h4>
            <div className="quick-ranges-section">
              <div className="space-y-1">
                {quickRanges.map((range) => (
                  <button
                    key={range.label}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm border border-transparent hover:border-gray-200"
                    onClick={() => handleQuickRange(range.days)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Custom Range
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  className="date-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={endDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  End Date
                </label>
                <input
                  type="date"
                  className="date-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  max={new Date().toISOString().split('T')[0]}
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
  // const [actionMenuOpen, setActionMenuOpen] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Kept at 10 for readability

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Date filter state for trend chart
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const computeStats = useCallback((data) => {
    const total = data.length;
    const approved = data.filter((d) => 
      d.status.toLowerCase() === "approved" || 
      d.abstractStatus?.toLowerCase() === "approved"
    ).length;
    const rejected = data.filter((d) => 
      d.status.toLowerCase() === "rejected" || 
      d.abstractStatus?.toLowerCase() === "rejected"
    ).length;
    const pending = data.filter((d) => 
      d.status.toLowerCase() === "pending" || 
      d.status.toLowerCase() === "submitted" || 
      d.status.toLowerCase() === "under review" ||
      d.abstractStatus?.toLowerCase() === "pending" ||
      d.abstractStatus?.toLowerCase() === "submitted" ||
      d.abstractStatus?.toLowerCase() === "under review" ||
      !d.status
    ).length;

    setStats({
      total,
      approved,
      rejected,
      pending,
    });
  }, []);

  const computeTrend = useCallback((data, dateFilter = null) => {
    const groups = {};
    
    data.forEach((item) => {
      const dateStr = item.createdAt || item.workflow?.createdAt || item.registration?.createdAt || new Date().toISOString();
      const date = new Date(dateStr).toISOString().split("T")[0];
      
      if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
        const itemDate = new Date(date);
        const startDate = new Date(dateFilter.startDate);
        const endDate = new Date(dateFilter.endDate);
        endDate.setHours(23, 59, 59, 999);
        
        if (itemDate < startDate || itemDate > endDate) {
          return;
        }
      }
      
      groups[date] = (groups[date] || 0) + 1;
    });

    let arr = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (arr.length === 0) {
      setTrend([]);
      return;
    }

    if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
      const start = new Date(dateFilter.startDate);
      const end = new Date(dateFilter.endDate);
      const allDates = [];
      
      const existingDataMap = {};
      arr.forEach(item => {
        existingDataMap[item.date] = item.count;
      });
      
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split('T')[0];
        allDates.push({
          date: dateStr,
          count: existingDataMap[dateStr] || 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      arr = allDates;
    }

    setTrend(arr);
  }, []);

  const handleDateRangeChange = useCallback((startDate, endDate) => {
    const newDateRange = { startDate, endDate };
    setDateRange(newDateRange);
    computeTrend(abstracts, newDateRange);
  }, [abstracts, computeTrend]);

  const formatProofUrl = (url) => {
    if (!url) return null;
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (url.startsWith('/uploads/')) {
      return `http://localhost:5000${url}`;
    }
    
    if (url.includes('proof_') && !url.includes('/')) {
      return `http://localhost:5000/uploads/proofs/${url}`;
    }
    
    return url;
  };

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

    const abstractData = {
      id: item._id || item.id,
      userId: item.userId || "N/A",
      authorName: item.name || item.registration?.participants?.[0]?.name || "Unknown",
      email: item.registration?.participants?.[0]?.email || item.email || "-",
      mobile: item.registration?.participants?.[0]?.phone || item.phone || "-",
      uniqueId: item.registration?.uniqueId || item.uniqueId || "-",
      track: item.registration?.track || item.track || "-",
      presentationMode: item.registration?.presentationMode || item.presentationMode || "-",
      title: item.registration?.abstractTitle || item.abstractTitle || item.title || "No Title",
      content: item.registration?.abstractContent || item.abstractContent || item.content || "No content available",
      team: teamMembers,
      country: item.registration?.country || item.country || "-",
      proofUrl: formatProofUrl(item.registration?.proofUrl || item.proofUrl),
      status: (item.workflow?.abstractStatus || item.abstractStatus || item.status || "pending").toLowerCase(),
      createdAt: item.workflow?.createdAt || item.createdAt || item.registration?.createdAt || new Date().toISOString(),
    };

    return abstractData;
  };

  const fetchAbstracts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users",
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );

      let usersData = [];
      if (Array.isArray(data)) {
        usersData = data;
      } else if (data && Array.isArray(data.users)) {
        usersData = data.users;
      } else if (data && Array.isArray(data.data)) {
        usersData = data.data;
      } else {
        usersData = [];
      }

      const formatted = usersData.map(formatAbstract);
      
      const filteredData = formatted.filter(
        (item) =>
          item.content &&
          item.content.trim() !== "" &&
          item.content !== "No content available"
      );

      setAbstracts(filteredData);
      computeStats(filteredData);
      computeTrend(filteredData, dateRange);
      setCurrentPage(1);
      
    } catch (err) {
      console.error("Error fetching abstracts:", err);
      setAbstracts([]);
      setStats({ total: 0, approved: 0, rejected: 0, pending: 0 });
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend, dateRange]);

  useEffect(() => {
    fetchAbstracts();
  }, [fetchAbstracts, refreshTrigger]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort and filter abstracts
  const filteredAndSearchedAbstracts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = statusFilter.toLowerCase() === "all";

    let filtered = abstracts.filter((abs) => {
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
  }, [abstracts, searchTerm, statusFilter, sortConfig]);

  const paginatedAbstracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedAbstracts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSearchedAbstracts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSearchedAbstracts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { class: "status-indicator-approved", label: "Approved" },
      rejected: { class: "status-indicator-rejected", label: "Rejected" },
      pending: { class: "status-indicator-pending", label: "Pending" },
      "under review": { class: "status-indicator-under-review", label: "Under Review" },
      submitted: { class: "status-indicator-under-review", label: "Submitted" },
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
    return <span className={`status-indicator ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  const handleExportExcel = () => {
    if (!filteredAndSearchedAbstracts.length) {
      alert("No data to export!");
      return;
    }

    const exportData = filteredAndSearchedAbstracts.map((abs) => ({
      "Unique ID": abs.uniqueId,
      "User ID": abs.userId,
      "Author Name": abs.authorName,
      "Email": abs.email,
      "Mobile": abs.mobile,
      "Title": abs.title,
      "Track": abs.track,
      "Presentation Mode": abs.presentationMode,
      "Abstract Status": abs.status,
      "Country": abs.country,
      "Registration Date": new Date(abs.createdAt).toLocaleDateString(),
      "Team Size": abs.team?.length || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Abstracts");
    
    const fileName = `abstracts_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleAbstractStatusUpdate = async (newStatus, reason = "") => {
    if (!abstractModalData) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const payload = {
        abstractStatus: newStatus.toLowerCase(),
      };

      if (newStatus.toLowerCase() === "rejected" && reason) {
        payload.abstractrejectedReason = reason;
      }

      const API_URL = `http://localhost:5000/api/admin/update/${abstractModalData.id}`;

      const response = await axios.put(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success || response.data?.message) {
        alert(`✅ Abstract status updated to "${newStatus}"`);
        updateAbstractLocal(abstractModalData.id, newStatus);
        setAbstractModalData(null);
        setRejectionModalData(null);
        setRejectionReason("");
        setRefreshTrigger(prev => !prev);
      } else {
        alert(response.data?.message || "Abstract status updated successfully");
        updateAbstractLocal(abstractModalData.id, newStatus);
        setAbstractModalData(null);
        setRejectionModalData(null);
        setRejectionReason("");
        setRefreshTrigger(prev => !prev);
      }
    } catch (err) {
      console.error("❌ Error updating abstract status:", err);
      alert("Failed to update abstract status");
    } finally {
      setActionLoading(false);
    }
  };

  const updateAbstractLocal = useCallback((id, newStatus) => {
    setAbstracts((prevAbstracts) => {
      const updatedAbstracts = prevAbstracts.map((abs) => {
        if (abs.id === id) {
          return { ...abs, status: newStatus.toLowerCase() };
        }
        return abs;
      });
      
      computeStats(updatedAbstracts);
      computeTrend(updatedAbstracts, dateRange);
      return updatedAbstracts;
    });
  }, [computeStats, computeTrend, dateRange]);

  const handleRejectionSubmit = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    handleAbstractStatusUpdate("rejected", rejectionReason.trim());
  };

  // Chart data for donut chart
  const donutChartData = [
    { name: "Approved", value: stats.approved, color: "#10B981" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
  ].filter(item => item.value > 0);

  // Date filter controls for trend chart
  const trendChartControls = (
    <DateFilter 
      onDateRangeChange={handleDateRangeChange}
      currentRange={dateRange}
    />
  );

  return (
    <>
      <style>{abstractStyles}</style>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '20px' }}>
        <div className="max-w-7xl mx-auto space-y-5">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 header-gradient leading-tight">
                Abstract Management
              </h1>
              <p className="text-xs flex items-center gap-2" style={{ color: '#6c757d' }}>
                <BarChart3 className="w-4 w-4" />
                Review and manage abstract submissions
              </p>
            </div>
            <button
              onClick={fetchAbstracts}
              className="btn btn-secondary btn-sm"
              disabled={loading}
              style={{ flexShrink: 0 }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={<FileText className="w-5 h-5" />}
              title="Total Abstracts" 
              value={stats.total.toLocaleString()}
              hint="All submissions"
              color="#1976D2"
              colorDark="#0D47A1"
            />
            <StatCard 
              icon={<CheckCircle className="w-5 h-5" />}
              title="Approved" 
              value={stats.approved.toLocaleString()}
              hint="Accepted"
              color="#10B981"
              colorDark="#059669"
            />
            <StatCard 
              icon={<XCircle className="w-5 h-5" />}
              title="Rejected" 
              value={stats.rejected.toLocaleString()}
              hint="Not accepted"
              color="#EF4444"
              colorDark="#DC2626"
            />
            <StatCard 
              icon={<Clock className="w-5 h-5" />}
              title="Pending" 
              value={stats.pending.toLocaleString()}
              hint="Awaiting decision"
              color="#F59E0B"
              colorDark="#D97706"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DonutChart 
              title="Submission Status"
              subtitle="Review breakdown"
              data={donutChartData}
            />

            <ChartCard 
              title="Submission Trend"
              subtitle="Daily submission pattern"
              controls={trendChartControls}
            >
              {trend.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      name="Abstracts"
                      stroke="#1976D2"
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 1, stroke: '#1976D2', fill: 'white' }}
                      activeDot={{ r: 5, stroke: '#1976D2', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[240px]">
                  <p className="text-sm" style={{ color: '#6c757d' }}>
                    {dateRange.startDate && dateRange.endDate 
                      ? 'No submissions in selected range' 
                      : 'No trend data available'
                    }
                  </p>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Enhanced Table Section */}
          <div className="table-container">
            {/* Table Header */}
            <div className="table-toolbar">
              <div className="table-info">
                <h3 className="text-base font-bold" style={{ color: '#111318' }}>
                  Submissions
                </h3>
                <span className="text-xs" style={{ color: '#6c757d' }}>
                  {filteredAndSearchedAbstracts.length} records
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
                  <option value="All">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                  <option value="under review">Under Review</option>
                </select>
                <button
                  onClick={handleExportExcel}
                  className="btn btn-success btn-sm"
                  disabled={filteredAndSearchedAbstracts.length === 0}
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
                <span className="mt-3 text-sm" style={{ color: '#6c757d' }}>Loading abstracts...</span>
              </div>
            ) : filteredAndSearchedAbstracts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-base font-semibold" style={{ color: '#111318', marginBottom: '8px' }}>
                  {abstracts.length === 0 ? 'No abstracts found' : 'No matching abstracts'}
                </h4>
                <p className="text-sm" style={{ color: '#6c757d', marginBottom: '20px' }}>
                  {abstracts.length === 0 
                    ? 'There are no abstract submissions yet.' 
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
                {abstracts.length === 0 && (
                  <button 
                    onClick={fetchAbstracts}
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
                      <th>Email</th>
                      <SortableHeader field="title" sortConfig={sortConfig} onSort={handleSort}>
                        Title
                      </SortableHeader>
                      <SortableHeader field="track" sortConfig={sortConfig} onSort={handleSort}>
                        Track
                      </SortableHeader>
                      <SortableHeader field="status" sortConfig={sortConfig} onSort={handleSort}>
                        Status
                      </SortableHeader>
                      <th>Team</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAbstracts.map((abs) => (
                      <tr key={abs.id}>
                        <td>
                          <div>
                            <div className="font-semibold" style={{ color: '#111318', fontSize: '0.8rem' }}>
                              {abs.authorName}
                            </div>
                            <div className="text-[0.7rem]" style={{ color: '#6c757d' }}>
                              {abs.userId}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs" style={{ color: '#475569' }}>
                            {abs.email}
                          </div>
                        </td>
                        <td>
                          <div 
                            className="font-medium text-xs"
                            title={abs.title}
                            style={{ color: '#111318', wordBreak: 'break-word', maxWidth: '200px' }}
                          >
                            {abs.title}
                          </div>
                        </td>
                        <td>
                          <span style={{ color: '#475569', fontSize: '0.8rem' }}>
                            {abs.track}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {getStatusBadge(abs.status)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {Array.isArray(abs.team) && abs.team.length ? (
                            <button
                              onClick={() => setTeamModalData(abs)}
                              className="team-button"
                            >
                              <Eye className="w-3 h-3" />
                              ({abs.team.length})
                            </button>
                          ) : (
                            <span style={{ color: '#6c757d', fontSize: '0.8rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div className="action-buttons">
                            <button
                              onClick={() => setAbstractModalData(abs)}
                              className="review-button"
                            >
                              <FileText className="w-3 h-3" />
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
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

      {teamModalData && (
        <TeamModal 
          teamData={teamModalData} 
          onClose={() => setTeamModalData(null)}
        />
      )}

      {abstractModalData && (
        <Modal onClose={() => setAbstractModalData(null)} size="lg">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">
              Abstract Review: {abstractModalData.authorName}
            </h2>
            <p className="text-gray-600 mb-4 text-xs">
              Title: {abstractModalData.title}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <span className="font-semibold text-sm">Current Status:</span>
                {getStatusBadge(abstractModalData.status)}
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-bold mb-2 text-sm">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div><strong>Track:</strong> {abstractModalData.track}</div>
                  <div><strong>Mode:</strong> {abstractModalData.presentationMode}</div>
                  <div><strong>Email:</strong> {abstractModalData.email}</div>
                  <div><strong>Mobile:</strong> {abstractModalData.mobile}</div>
                  <div><strong>Country:</strong> {abstractModalData.country}</div>
                  <div><strong>Unique ID:</strong> {abstractModalData.uniqueId}</div>
                  <div><strong>Team:</strong> {abstractModalData.team?.length || 0}</div>
                </div>
              </div>

              <div className="p-3 border rounded-lg max-h-40 overflow-y-auto">
                <h4 className="font-bold mb-2 text-sm">Abstract Content</h4>
                <p className="text-xs text-gray-700 whitespace-pre-wrap">
                  {abstractModalData.content}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  onClick={() => {
                    setRejectionModalData(abstractModalData);
                    setRejectionReason("");
                  }}
                  className="btn btn-outline btn-sm"
                  disabled={actionLoading}
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                
                <button
                  onClick={() => handleAbstractStatusUpdate("under review")}
                  disabled={actionLoading}
                  className="btn btn-outline btn-sm"
                >
                  <Clock className="w-4 h-4" />
                  {actionLoading ? "..." : "Review"}
                </button>

                <button
                  onClick={() => handleAbstractStatusUpdate("approved")}
                  disabled={actionLoading}
                  className="btn btn-success btn-sm"
                >
                  <CheckCircle className="w-4 h-4" /> 
                  {actionLoading ? "..." : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {rejectionModalData && (
        <Modal onClose={() => setRejectionModalData(null)} size="md">
          <div className="text-center p-4">
            <div className="mx-auto w-fit bg-orange-100 rounded-full p-3 mb-3">
              <FileText className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold my-2">Provide Rejection Reason</h3>
            <p className="text-gray-500 mb-4 text-sm">
              Please provide a reason for rejecting this abstract.
            </p>
            <textarea
              rows="4"
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none text-sm"
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
                Reject Abstract
              </button>
            </div>
          </div>
        </Modal>
      )}

      {imagePreviewUrl && (
        <ImagePreviewModal 
          imageUrl={imagePreviewUrl} 
          onClose={() => setImagePreviewUrl(null)} 
        />
      )}
    </>
  );
};

export default AbstractSupport;