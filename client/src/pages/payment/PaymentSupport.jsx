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
  File, // Added
  Image as ImageIcon, // Added
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  DollarSign,
  UserCheck,
  UserX,
} from "lucide-react";

/* ----------------------------- Styles (Copied from Example) ----------------------------- */
const paymentSupportStyles = `
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
    font-size: 14px;
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
    border-radius: 12px;
    padding: 16px;
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
    width: 42px;
    height: 42px;
    border-radius: 12px;
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
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #111318 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .chart-container {
    background: white;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .chart-container:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  .chart-header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  }

  .chart-body {
    padding: 16px;
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
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
  
  .btn-danger {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .btn-danger:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
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
    padding: 6px 12px;
    font-size: 0.75rem;
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
    border-radius: 12px;
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
    padding: 10px 16px;
    font-size: 0.7rem;
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
    padding: 10px 16px;
    color: #334155;
    font-size: 0.85rem;
    font-weight: 500;
    border-bottom: 1px solid #f8fafc;
  }

  .table-modern tbody tr:last-child td {
    border-bottom: none;
  }

  .status-indicator {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: capitalize;
    background-color: #E5E7EB;
    color: #374151;
    cursor: default;
    pointer-events: none;
  }

  .status-indicator-paid {
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
  
  .status-indicator-unpaid {
    background-color: #E5E7EB;
    color: #374151;
  }

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
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
    border-radius: 8px;
    padding: 6px 12px;
    transition: all 0.3s ease;
    min-width: 250px;
  }

  .search-box:focus-within {
    border-color: var(--brand-blue-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  .search-box input {
    border: none;
    outline: none;
    padding: 4px;
    width: 100%;
    font-size: 0.85rem;
    background: transparent;
  }

  .filter-select {
    padding: 8px 12px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 0.85rem;
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
    padding: 40px 20px;
    text-align: center;
  }

  .empty-state-icon {
    width: 60px;
    height: 60px;
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
    padding: 40px 20px;
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
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
    padding: 16px;
  }

  .modal-content {
    background: white;
    border-radius: 16px;
    box-shadow: 0 32px 96px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    width: 100%;
    position: relative;
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

  .manage-button {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
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
    font-size: 13px !important;
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
    font-size: 13px;
    font-weight: 500;
  }

  /* Donut Chart Styles */
  .donut-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .donut-chart-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
  }

  .donut-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .donut-total {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-label {
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 4px;
  }

  .donut-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 300px;
  }

  .donut-legend-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid;
  }

  .donut-legend-color {
    width: 12px;
    height: 12px;
    border-radius: 4px;
  }

  .donut-legend-content {
    flex: 1;
  }

  .donut-legend-value {
    font-size: 1rem;
    font-weight: 700;
    color: #111318;
    line-height: 1;
  }

  .donut-legend-label {
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 2px;
  }

  .donut-legend-percentage {
    font-size: 0.9rem;
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

// Icon map for Stat Cards
const icons = {
  total: <Users className="w-5 h-5" />,
  paid: <UserCheck className="w-5 h-5" />,
  pending: <Clock className="w-5 h-5" />,
  rejected: <UserX className="w-5 h-5" />,
  unpaid: <DollarSign className="w-5 h-5" />,
};

// Reusable Modal Component
const Modal = ({ children, onClose, size = "md" }) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-7xl",
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-content w-full ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
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

// Stat Card
const StatCard = ({ icon, title, value, hint, color, colorDark }) => (
  <div
    className="stat-card"
    style={{ "--accent-color": color, "--accent-color-dark": colorDark }}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <p
          className="text-[0.65rem] font-bold uppercase tracking-wider mb-1"
          style={{ color: "#6c757d" }}
        >
          {title}
        </p>
        <div className="metric-value">{value}</div>
      </div>
      <div className="stat-icon-wrapper">
        <div style={{ color: "white", position: "relative", zIndex: 1 }}>
          {icon}
        </div>
      </div>
    </div>
    <p className="text-[0.7rem]" style={{ color: "#6c757d" }}>
      {hint}
    </p>
  </div>
);

// Chart Card
const ChartCard = ({ title, subtitle, children, controls }) => (
  <div className="chart-container">
    <div className="chart-header">
      <div className="chart-header-actions">
        <div className="chart-title-section">
          <h3 className="text-base font-bold mb-0.5" style={{ color: "#111318" }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs" style={{ color: "#6c757d" }}>
              {subtitle}
            </p>
          )}
        </div>
        {controls && <div className="chart-controls">{controls}</div>}
      </div>
    </div>
    <div className="chart-body">{children}</div>
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
      <div className="text-xs" style={{ color: "#6c757d" }}>
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

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : "btn-outline"
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
  const isAscending = sortConfig.direction === "asc";

  const handleClick = () => {
    onSort(field);
  };

  return (
    <th
      className={isSorted ? "sorted" : ""}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="sortable flex items-center gap-2">
        {children}
        <span className="sort-icon">
          {isSorted ? (
            isAscending ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )
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
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      {payload.map((entry, index) => (
        <p
          key={index}
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: entry.color,
            margin: "4px 0",
          }}
        >
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
            {data.name}: {data.value} (
            {total > 0 ? ((data.value / total) * 100).toFixed(1) : 0}%)
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
            {total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0}%
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

// Payment Trend Chart Component
const PaymentTrendChart = ({ data }) => (
  <ChartCard
    title="Payment Submission Trend"
    subtitle="Daily 'Pending' submissions"
  >
    {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6c757d", fontSize: 10 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#6c757d", fontSize: 10 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            name="Submissions"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, stroke: "#F59E0B", fill: "white" }}
            activeDot={{ r: 5, stroke: "#F59E0B", strokeWidth: 2, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex items-center justify-center h-[240px]">
        <p className="text-sm" style={{ color: "#6c757d" }}>
          No trend data available
        </p>
      </div>
    )}
  </ChartCard>
);


/* ----------------------------- Main PaymentSupport Component ----------------------------- */

const PaymentSupport = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    rejected: 0,
    unpaid: 0,
  });
  const [trend, setTrend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // Default to 'All'
  const [verifyModalData, setVerifyModalData] = useState(null);
  const [rejectionModalData, setRejectionModalData] = useState(null);
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  /**
   * Formats proof URL to ensure it's a complete, valid URL
   */
  const formatProofUrl = (url) => {
    if (!url) return null;

    // Base URL for all assets
    const BASE_URL = "https://s3conference.ksrce.ac.in";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (url.startsWith("/uploads/")) {
      return `${BASE_URL}${url}`;
    }
    
    // Handle specific proof_ file names
    if (url.includes("proof_")) {
        if (url.startsWith("uploads/proofs/")) {
            return `${BASE_URL}/${url}`;
        }
        if (url.startsWith("/uploads/proofs/")) {
            return `${BASE_URL}${url}`;
        }
        return `${BASE_URL}/uploads/proofs/${url}`;
    }

    // Handle partial paths
    if (url.includes("s3conference.ksrce.ac.in") && !url.startsWith("http")) {
      return `https://${url.replace(/^\/+/, "")}`;
    }

    return `${BASE_URL}/${url.replace(/^\/+/, "")}`;
  };

  /**
   * Computes statistics for the dashboard cards.
   */
  const computeStats = useCallback((data) => {
    setStats({
      total: data.length,
      paid: data.filter((d) => d.paymentStatus === "paid").length,
      pending: data.filter((d) => d.paymentStatus === "pending").length,
      rejected: data.filter((d) => d.paymentStatus === "rejected").length,
      unpaid: data.filter((d) => d.paymentStatus === "unpaid").length,
    });
  }, []);

  /**
   * Computes the submission trend for "pending" payments.
   */
  const computeTrend = useCallback((data) => {
    const groups = {};
    const pendingData = data.filter(d => d.paymentStatus === 'pending');
    
    pendingData.forEach((d) => {
      const date = new Date(d.createdAt).toISOString().split("T")[0];
      groups[date] = (groups[date] || 0) + 1;
    });
    const arr = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrend(arr);
  }, []);

  // Format each user with proper payment info
  const formatUser = (item) => {
    
    const paymentData = item.registration?.payment || {};
    const workflowData = item.workflow || {};

    return {
      id: item._id, // This is the main User _id
      userId: item.userId || "N/A",
      authorName: item.name || "Unknown",
      email: item.registration?.participants?.[0]?.email || item.email || "-",
      mobile: item.registration?.participants?.[0]?.phone || "-",
      uniqueId: item.registration?.uniqueId || "-",
      title: item.registration?.abstractTitle || "No Title",
      
      // Payment specific fields
      paymentStatus: (workflowData.paymentStatus || paymentData.paymentStatus || "unpaid").toLowerCase(),
      amountPaid: Number(paymentData.amountPaid || workflowData.amountPaid || 0),
      currency: paymentData.currency || "INR",
      paymentProofUrl: formatProofUrl(paymentData.paymentProofUrl),
      feedback: paymentData.feedback || "",
      
      paperStatus: (
        workflowData.finalPaperStatus ||
        workflowData.paperStatus ||
        item.registration?.paperStatus ||
        "no paper"
      ).toLowerCase(),
      createdAt: workflowData.createdAt || item.createdAt || new Date().toISOString(),
    };
  };

  // Fetch all users
  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("📡 Fetching data from API...");

      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formatted = (Array.isArray(data) ? data : []).map(formatUser);
      const allFormattedUsers = (Array.isArray(data) ? data : []).map(formatUser);

      // Filter for users with approved papers only
      const approvedUsers = allFormattedUsers.filter(
        (user) => user.paperStatus === "approved"
      );

      setRows(approvedUsers);
      computeStats(approvedUsers);
      computeTrend(approvedUsers);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setRows([]);
      setStats({
        total: 0,
        paid: 0,
        pending: 0,
        rejected: 0,
        unpaid: 0,
      });
      setTrend([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows, refreshTrigger]);

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
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
        r.userId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q);

      const matchesFilter =
        isAllStatus ||
        r.paymentStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "createdAt") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig.key === 'amountPaid') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else {
          aValue = String(aValue || "").toLowerCase();
          bValue = String(bValue || "").toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
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
      paid: { class: "status-indicator-paid", label: "Paid" },
      rejected: { class: "status-indicator-rejected", label: "Rejected" },
      pending: { class: "status-indicator-pending", label: "Pending" },
      unpaid: { class: "status-indicator-unpaid", label: "Unpaid" },
    };

    const statusInfo = statusMap[status.toLowerCase()] || {
      class: "",
      label: status,
    };
    return (
      <span className={`status-indicator ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    if (!filteredAndSearchedRows.length) return alert("No data to export!");

    const exportData = filteredAndSearchedRows.map((r) => ({
      "Unique ID": r.uniqueId,
      "User ID": r.userId,
      "Author Name": r.authorName,
      Email: r.email,
      Mobile: r.mobile,
      "Paper Title": r.title,
      "Payment Status": r.paymentStatus,
      "Amount Paid": r.amountPaid,
      Currency: r.currency,
      "Proof URL": r.paymentProofUrl || "N/A",
      "Rejection Feedback": r.feedback || "N/A",
      "Submission Date": new Date(r.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(
      wb,
      `payments_export_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  
  // Handle Payment Status Update (Approve or Reject)
  const handlePaymentVerify = async (id, status, feedback = "") => {
    if (!id) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const body = {
        paymentStatus: status.toLowerCase(),
        feedback: feedback,
      };

      // -----------------------------------------------------------------
      // URL as per your backend route file
      // -----------------------------------------------------------------
      const API_URL = `https://s3conference.ksrce.ac.in/api/admin/paymentprocess/verify/${id}`;
      
      console.log("🚀 Attempting to verify payment:", { API_URL, body });
      
      const response = await axios.put(API_URL, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data?.success) {
        const successMessage = `✅ Payment for ${id} marked as "${status}".`;
        console.log("🎉 SUCCESS:", successMessage);
        alert(successMessage);

        setVerifyModalData(null);
        setRejectionModalData(null);
        setRejectionFeedback("");
        setRefreshTrigger((prev) => !prev);
      } else {
        console.warn("⚠️ Unexpected server response:", response.data);
        alert(response.data?.message || "Unexpected server response.");
      }
    } catch (err) {
      console.error("❌ ERROR updating payment status:", {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      alert(err.response?.data?.message || "Failed to update payment status.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Rejection Submit
  const handleRejectionSubmit = () => {
    if (!rejectionFeedback.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    if (!rejectionModalData) return;
    
    handlePaymentVerify(rejectionModalData.id, "rejected", rejectionFeedback.trim());
  };


  // Open Verification Modal
  const openVerifyModal = (row) => {
    setVerifyModalData(row);
  };
  
  // Open Rejection Modal
  const openRejectionModal = () => {
    if (!verifyModalData) return;
    setRejectionModalData(verifyModalData);
    setVerifyModalData(null);
    setRejectionFeedback(verifyModalData.feedback || "");
  };

  // Donut Chart Data
  const donutChartData = [
    { name: "Paid", value: stats.paid, color: "#10B981" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" },
    { name: "Unpaid", value: stats.unpaid, color: "#6B7280" },
  ].filter((item) => item.value > 0);

  return (
    <>
      <style>{paymentSupportStyles}</style>
      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          padding: "20px",
        }}
      >
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 header-gradient leading-tight">
                Payment Verification
              </h1>
              <p
                className="text-xs flex items-center gap-2"
                style={{ color: "#6c757d" }}
              >
                <DollarSign className="w-4 h-4" />
                Manage and verify user payment submissions.
              </p>
            </div>
            <button
              onClick={fetchRows}
              className="btn btn-secondary btn-sm self-start lg:self-auto"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh Data
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              icon={icons.total}
              title="Total Registrations"
              value={stats.total.toLocaleString()}
              hint="All users in the system"
              color="#1976D2"
              colorDark="#0D47A1"
            />
            <StatCard
              icon={icons.pending}
              title="Pending Verification"
              value={stats.pending.toLocaleString()}
              hint="Awaiting admin review"
              color="#F59E0B"
              colorDark="#D97706"
            />
            <StatCard
              icon={icons.paid}
              title="Payments Approved"
              value={stats.paid.toLocaleString()}
              hint="Successfully verified"
              color="#10B981"
              colorDark="#059669"
            />
            <StatCard
              icon={icons.rejected}
              title="Payments Rejected"
              value={stats.rejected.toLocaleString()}
              hint="Rejected submissions"
              color="#EF4444"
              colorDark="#DC2626"
            />
            <StatCard
              icon={icons.unpaid}
              title="Unpaid"
              value={stats.unpaid.toLocaleString()}
              hint="No proof submitted yet"
              color="#6B7280"
              colorDark="#4B5563"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DonutChart
              title="Payment Status Distribution"
              subtitle="Breakdown of payment statuses"
              data={donutChartData}
            />
            <PaymentTrendChart data={trend} />
          </div>

          {/* Enhanced Table Section */}
          <div className="table-container">
            {/* Table Header */}
            <div className="table-toolbar">
              <div className="table-info">
                <h3
                  className="text-base font-bold"
                  style={{ color: "#111318" }}
                >
                  Payment Submissions
                </h3>
                <span className="text-xs" style={{ color: "#6c757d" }}>
                  {filteredAndSearchedRows.length} records found
                </span>
              </div>
              <div className="table-actions">
                <div className="search-box">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="rejected">Rejected</option>
                  <option value="unpaid">Unpaid</option>
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
                <Loader2
                  className="h-8 w-8 animate-spin"
                  style={{ color: "#1976D2" }}
                />
                <span className="mt-3 text-sm" style={{ color: "#6c757d" }}>
                  Loading payments...
                </span>
              </div>
            ) : filteredAndSearchedRows.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
                <h4
                  className="text-base font-semibold"
                  style={{ color: "#111318", marginBottom: "8px" }}
                >
                  {rows.length === 0
                    ? "No payments found"
                    : "No matching payments"}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "#6c757d", marginBottom: "20px" }}
                >
                  {rows.length === 0
                    ? "There are no payment submissions yet."
                    : "Try adjusting your search or filter criteria."}
                </p>
                {rows.length === 0 && (
                  <button onClick={fetchRows} className="btn btn-primary">
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
                        <SortableHeader
                          field="userId"
                          sortConfig={sortConfig}
                          onSort={handleSort}
                        >
                          User ID
                        </SortableHeader>
                        <SortableHeader
                          field="authorName"
                          sortConfig={sortConfig}
                          onSort={handleSort}
                        >
                          Author
                        </SortableHeader>
                        <th>Email</th>
                        <SortableHeader
                          field="amountPaid"
                          sortConfig={sortConfig}
                          onSort={handleSort}
                        >
                          Amount
                        </SortableHeader>
                        <SortableHeader
                          field="paymentStatus"
                          sortConfig={sortConfig}
                          onSort={handleSort}
                        >
                          Status
                        </SortableHeader>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRows.map((r) => (
                        <tr key={r.id}>
                          <td
                            className="font-mono text-xs"
                            style={{ color: "#475569" }}
                          >
                            {r.userId}
                          </td>
                          <td>
                            <div
                              className="font-semibold"
                              style={{ color: "#111318", fontSize: "0.8rem" }}
                            >
                              {r.authorName}
                            </div>
                          </td>
                          <td>
                            <div
                              className="text-xs"
                              style={{ color: "#475569" }}
                            >
                              {r.email}
                            </div>
                          </td>
                           <td>
                            <div
                              className="text-xs font-semibold"
                              style={{ color: "#111318" }}
                            >
                              {r.currency} {r.amountPaid.toLocaleString()}
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {getStatusBadge(r.paymentStatus)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              onClick={() => openVerifyModal(r)}
                              className="manage-button"
                            >
                              <Eye className="w-3 h-3" />
                              {r.paymentStatus === 'pending' ? 'Verify' : 'View'}
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

      {/* Verification Modal */}
      {verifyModalData && (
        <Modal onClose={() => setVerifyModalData(null)} size="lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Verify Payment: {verifyModalData.authorName}
            </h2>
            <div className="text-xs text-gray-600 mt-1">
              User ID: {verifyModalData.userId} | Status:{" "}
              {verifyModalData.paymentStatus}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[70vh]">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Side: Details */}
                  <div className="p-3 border rounded-lg space-y-3">
                      <h4 className="font-bold mb-2 text-sm text-gray-900">Payment Details</h4>
                      <div className="text-xs">
                          <strong>Amount:</strong> {verifyModalData.currency} {verifyModalData.amountPaid.toLocaleString()}
                      </div>
                      <div className="text-xs">
                          <strong>Email:</strong> {verifyModalData.email}
                      </div>
                      <div className="text-xs">
                          <strong>Mobile:</strong> {verifyModalData.mobile}
                      </div>
                       <div className="text-xs">
                          <strong>Submitted:</strong> {new Date(verifyModalData.createdAt).toLocaleString()}
                      </div>
                      {verifyModalData.feedback && (
                        <div className="pt-2">
                           <strong className="text-xs">Previous Feedback:</strong>
                           <div className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                               <p className="text-xs text-yellow-800">{verifyModalData.feedback}</p>
                           </div>
                        </div>
                      )}
                  </div>
                  
                {/* Right Side: Proof Preview (UPDATED LOGIC) */}
                <div className="p-3 border rounded-lg">
                      <h4 className="font-bold mb-3 text-sm text-gray-900">Payment Proof</h4>
                      
                      {verifyModalData.paymentProofUrl ? (() => {
                        // 1. Extract file extension safely
                        const url = verifyModalData.paymentProofUrl;
                        const extension = url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
                        
                        // 2. Define Format Categories
                        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'heic'].includes(extension);
                        const isPdf = ['pdf'].includes(extension);
                        
                        return (
                          <>
                            {/* --- PREVIEW SECTION --- */}
                            <div className="w-full h-64 bg-gray-50 border rounded-lg flex items-center justify-center overflow-hidden relative">
                              
                              {/* CASE A: It is an Image */}
                              {isImage ? (
                                <img 
                                  src={url}
                                  alt="Payment Proof"
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    // Show fallback icon if image fails to load
                                    e.target.nextSibling.style.display = 'flex'; 
                                  }}
                                />
                              ) : (
                                // CASE B: It is a Document (PDF, Docx, etc)
                                <div className="flex flex-col items-center justify-center p-6 text-center">
                                   {/* Dynamic Icon based on type */}
                                   {isPdf ? (
                                      <FileText className="w-16 h-16 text-red-500 mb-2" />
                                   ) : (
                                      <File className="w-16 h-16 text-blue-500 mb-2" />
                                   )}
                                   
                                   <span className="text-sm font-medium text-gray-700 uppercase">
                                      {extension} File
                                   </span>
                                   <p className="text-xs text-gray-500 mt-1 px-4 break-all">
                                      {url.split('/').pop()} 
                                   </p>
                                </div>
                              )}

                              {/* Fallback div for broken images (hidden by default) */}
                              <div className="hidden absolute inset-0 flex-col items-center justify-center bg-gray-100 text-red-500">
                                 <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                                 <p className="text-xs">Preview unavailable</p>
                              </div>
                            </div>

                            {/* --- ACTION BUTTON --- */}
                            <button
                              onClick={() => window.open(verifyModalData.paymentProofUrl, '_blank')}
                              className="btn btn-primary btn-sm w-full mt-3 flex items-center justify-center gap-2"
                            >
                               <Eye className="w-4 h-4" /> 
                               {isImage ? "View Full Image" : "Download / View Document"}
                            </button>
                          </>
                        );
                      })() : (
                        // --- NO FILE STATE ---
                        <div className="text-center text-red-500 py-8 border border-dashed rounded-lg bg-gray-50">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm">No proof document uploaded.</p>
                        </div>
                      )}
                </div>
              </div>
              
            </div>
          </div>

          {/* --- THIS IS THE FIX --- */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={openRejectionModal}
                className="btn btn-danger btn-sm"
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button
                onClick={() => handlePaymentVerify(verifyModalData.id, "paid")}
                disabled={actionLoading}
                className="btn btn-success btn-sm"
              >
                <CheckCircle className="w-4 h-4" />
                {actionLoading ? "..." : "Approve"}
              </button>
            </div>
          </div>
          {/* --- END OF FIX --- */}
        </Modal>
      )}

      {/* Rejection Modal */}
      {rejectionModalData && (
        <Modal onClose={() => setRejectionModalData(null)} size="md">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Provide Rejection Reason
            </h3>
          </div>

          <div className="p-4">
            <div className="text-center mb-4">
              <div className="mx-auto w-fit bg-red-100 rounded-full p-3 mb-3">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-500 text-sm">
                Please provide a clear reason for rejecting this payment. This
                feedback will be sent to the user.
              </p>
            </div>

            <textarea
              rows="4"
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-red-400 outline-none resize-none text-sm"
              placeholder="Write rejection reason here..."
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
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
                disabled={actionLoading || !rejectionFeedback.trim()}
                className="btn btn-danger flex-1"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Submit Rejection
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PaymentSupport;