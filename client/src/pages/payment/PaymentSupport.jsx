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
  CheckCircle,
  XCircle,
  AlertTriangle,
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
  History
} from "lucide-react";

/* ----------------------------- Enhanced Styles ----------------------------- */
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
  --brand-green: #10B981;
  --brand-yellow: #F59E0B;
  --brand-gray: #6B7280;
  --text-primary: #111318;
  --text-secondary: #6c757d;
  --surface-light: #f8f9fa;
  --surface-dark: #e9ecef;
  --white: #FFFFFF;
  --border-light: #e2e8f0;
}

.payment-support-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
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

.btn-warning {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-warning:hover:not(:disabled) {
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
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

.status-indicator-payment-pending {
  background-color: #FFF7ED; 
  color: #C2410C; 
  border: 1px solid #FFEDD5;
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
  text-align: center;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

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

/* Enhanced Image Styles */
.proof-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.proof-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.proof-image-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.proof-image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  padding: 20px;
}

.proof-image-error .text-sm {
  color: #6b7280;
}

.proof-image-error .text-xs {
  color: #9ca3af;
}
`;

/* ----------------------------- Small Components & Utils ----------------------------- */

const icons = {
  total: <Users className="w-5 h-5" />,
  paid: <UserCheck className="w-5 h-5" />,
  pending: <Clock className="w-5 h-5" />,
  rejected: <UserX className="w-5 h-5" />,
  unpaid: <DollarSign className="w-5 h-5" />,
};

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

/* ----------------------------- Enhanced Proof Image Component ----------------------------- */
const ProofImage = ({ src, alt = "Payment Proof" }) => {
  const [imageState, setImageState] = useState('loading'); // 'loading', 'loaded', 'error'
  const [retryCount, setRetryCount] = useState(0);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    console.error('Failed to load proof image:', src);
    setImageState('error');
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setImageState('loading');
  };

  const handleDirectView = () => {
    if (src) {
      window.open(src, '_blank', 'noopener,noreferrer');
    }
  };

  // Reset state when src changes
  useEffect(() => {
    setImageState('loading');
    setRetryCount(0);
  }, [src]);

  if (!src) {
    return (
      <div className="proof-image-container">
        <div className="proof-image-error">
          <FileText className="w-16 h-16 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">No Proof Submitted</p>
            <p className="text-xs text-gray-500 mt-1">User has not uploaded any payment proof</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="proof-image-container">
      {imageState === 'loading' && (
        <div className="proof-image-loading">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-600">Loading proof image...</p>
        </div>
      )}

      {imageState === 'error' && (
        <div className="proof-image-error">
          <FileText className="w-16 h-16 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Failed to Load Image</p>
            <p className="text-xs text-gray-500 mt-1">
              {retryCount > 0 ? `Retry attempt ${retryCount}` : 'The image could not be loaded'}
            </p>
          </div>
          <div className="flex gap-2 mt-3">
            <button 
              onClick={handleRetry}
              className="btn btn-outline btn-sm"
              disabled={retryCount >= 3}
            >
              {retryCount >= 3 ? 'Max Retries' : 'Retry Loading'}
            </button>
            <button 
              onClick={handleDirectView}
              className="btn btn-primary btn-sm"
            >
              Open Direct Link
            </button>
          </div>
        </div>
      )}

      {imageState === 'loaded' && (
        <img
          src={`${src}${retryCount > 0 ? `?retry=${retryCount}` : ''}`}
          alt={alt}
          className="proof-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Hidden preloader */}
      <img
        src={src}
        alt=""
        style={{ display: 'none' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

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
  const [statusFilter, setStatusFilter] = useState("All");
  const [verifyModalData, setVerifyModalData] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackAction, setFeedbackAction] = useState("rejected");
  const [feedbackText, setFeedbackText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // --- IMPROVED URL FORMATTER ---
  const formatProofUrl = (url) => {
    if (!url) return null;

    // If it's already a full URL, return it
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Replace Windows backslashes with forward slashes
    let cleanPath = url.replace(/\\/g, "/");

    // Remove 'public/' prefix if present
    if (cleanPath.startsWith("public/")) {
      cleanPath = cleanPath.substring(7);
    }

    // Remove leading slash to avoid double slashes
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    const BASE_URL = "https://s3conference.ksrce.ac.in/api";
    
    // For debugging - log the formatted URL
    console.log(`Original: ${url}, Formatted: ${BASE_URL}/${cleanPath}`);
    
    return `${BASE_URL}/${cleanPath}`;
  };

  // Calculate Stats
  const computeStats = useCallback((data) => {
    setStats({
      total: data.length,
      paid: data.filter((d) => d.paymentStatus === "paid").length,
      pending: data.filter((d) => d.paymentStatus === "pending" || d.paymentStatus === "payment pending").length,
      rejected: data.filter((d) => d.paymentStatus === "rejected").length,
      unpaid: data.filter((d) => d.paymentStatus === "unpaid").length,
    });
  }, []);

  // Calculate Trend
  const computeTrend = useCallback((data) => {
    const groups = {};
    const pendingData = data.filter(d => d.paymentStatus === 'pending' || d.paymentStatus === 'payment pending');
    pendingData.forEach((d) => {
      const date = new Date(d.createdAt).toISOString().split("T")[0];
      groups[date] = (groups[date] || 0) + 1;
    });
    const arr = Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setTrend(arr);
  }, []);

  // Format API response for Frontend Table
  const formatUser = (item) => {
    const paymentData = item.registration?.payment || {};
    const workflowData = item.workflow || {};
    const registrationData = item.registration || {};
    
    // Handle Multiple Proofs
    let allProofs = [];
    let latestProofUrl = null;

    if (Array.isArray(paymentData.paymentProofUrl) && paymentData.paymentProofUrl.length > 0) {
      // Sort by uploadedAt descending (newest first)
      const sortedProofs = [...paymentData.paymentProofUrl].sort((a, b) => 
        new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );
      // Map to formatted URLs
      allProofs = sortedProofs.map(p => formatProofUrl(p.url)).filter(url => url); // filter out nulls
      latestProofUrl = allProofs[0];
    } else if (typeof paymentData.paymentProofUrl === 'string' && paymentData.paymentProofUrl) {
       const url = formatProofUrl(paymentData.paymentProofUrl);
       if (url) {
         allProofs = [url];
         latestProofUrl = url;
       }
    }

    return {
      _id: item._id,            // MongoDB ID (Required for API calls)
      userId: item.userId,      // Custom User ID (Displayed to User)
      authorName: item.name || "Unknown",
      email: item.registration?.participants?.[0]?.email || item.email || "-",
      mobile: item.registration?.participants?.[0]?.phone || "-",
      uniqueId: item.registration?.uniqueId || "-",
      title: item.registration?.abstractTitle || "No Title",
      paymentStatus: (paymentData.paymentStatus || "unpaid").toLowerCase(),
      amountPaid: Number(paymentData.amountPaid || 0),
      currency: paymentData.currency || "INR",
      paymentProofUrl: latestProofUrl, // Keep for backward compatibility
      allProofUrls: allProofs,         // New field for multiple proofs
      feedback: paymentData.feedback || "",
      paperStatus: (
        workflowData.paperStatus ||
        item.registration?.paperStatus ||
        "no paper"
      ).toLowerCase(),
      createdAt: workflowData.createdAt || item.createdAt || new Date().toISOString(),
      
      // 👇👇 MODIFIED HERE: Check both item.country (backend fix) and registrationData.country
      country: item.country || registrationData.country || "Unknown",
      isEarlyBird: workflowData.earlyBirdDiscount || registrationData.earlyBirdDiscount || false,
    };
  };

  // Fetch Data
  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // 1. Make the API Call
      const { data } = await axios.get(
        "https://s3conference.ksrce.ac.in/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ---------------------------------------------------------
      // ✅ ADD THIS LINE TO SEE EVERYTHING IN CONSOLE
      console.log("🔥 FULL RAW DATA FROM BACKEND:", data);
      // ---------------------------------------------------------

      const allFormattedUsers = (Array.isArray(data) ? data : []).map(formatUser);
      
      // ---------------------------------------------------------
      // ✅ CONSOLE TABLE FOR EASY VERIFICATION
      console.table(allFormattedUsers.map(u => ({
        Name: u.authorName,
        Country: u.country,
        "Early Bird?": u.isEarlyBird ? "YES" : "NO",
        Status: u.paymentStatus
      })));
      // ---------------------------------------------------------
      
      // Filter for approved papers as per requirement
      const approvedUsers = allFormattedUsers.filter(
        (user) => user.paperStatus === "approved"
      );
      console.log("Fetched and Approved Users:", approvedUsers);

      setRows(approvedUsers);
      computeStats(approvedUsers);
      computeTrend(approvedUsers);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [computeStats, computeTrend]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows, refreshTrigger]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtering and Sorting Logic
  const filteredAndSearchedRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const isAllStatus = statusFilter.toLowerCase() === "all";

    let filtered = rows.filter((r) => {
      const matchesSearch =
        r.authorName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.uniqueId && r.uniqueId.toLowerCase().includes(q)) ||
        (r.userId && r.userId.toLowerCase().includes(q)) ||
        (r.title && r.title.toLowerCase().includes(q));

      const matchesFilter =
        isAllStatus ||
        r.paymentStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

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

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [rows, searchTerm, statusFilter, sortConfig]);

  // Pagination Logic
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedRows.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSearchedRows, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSearchedRows.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  // Status Badge Component
  const getStatusBadge = (status) => {
    const statusMap = {
      paid: { class: "status-indicator-paid", label: "Paid" },
      rejected: { class: "status-indicator-rejected", label: "Rejected" },
      pending: { class: "status-indicator-pending", label: "Pending" },
      "payment pending": { class: "status-indicator-payment-pending", label: "Payment Pending" },
      unpaid: { class: "status-indicator-unpaid", label: "Unpaid" },
    };

    const statusInfo = statusMap[status.toLowerCase()] || { class: "", label: status };
    return (
      <span className={`status-indicator ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const handleExportExcel = () => {
    if (!filteredAndSearchedRows.length) {
      alert("No data to export!");
      return;
    }
    
    try {
      const exportData = filteredAndSearchedRows.map((r) => ({
        "Unique ID": r.uniqueId,
        "User ID": r.userId,
        "Author Name": r.authorName,
        "Email": r.email,
        "Mobile": r.mobile,
        "Paper Title": r.title,
        "Country": r.country,
        "Early Bird": r.isEarlyBird ? "Yes" : "No",
        "Payment Status": r.paymentStatus,
        "Amount Paid": r.amountPaid,
        "Currency": r.currency,
        "Proof URL": r.paymentProofUrl || "N/A",
        "Feedback": r.feedback || "N/A",
        "Submission Date": new Date(r.createdAt).toLocaleDateString(),
      }));
      
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Payments");
      XLSX.writeFile(wb, `payments_export_${new Date().toISOString().split("T")[0]}.xlsx`);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  // Verify Payment API Call
const handlePaymentVerify = async (mongoId, action, feedback = "") => {
  if (!mongoId) {
    alert("Error: No valid User ID provided");
    return;
  }

  setActionLoading(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in again.");
      return;
    }

    let body = {};

    // ✅ If admin clicks APPROVE → send ONLY paymentStatus
    if (action === "paid") {
      body = { paymentStatus: "paid" };
    }

    // ✅ If admin clicks MARK PENDING → send ONLY feedback
    else if (action === "payment pending") {
      if (!feedback.trim()) {
        alert("Feedback is required to mark payment as pending");
        setActionLoading(false);
        return;
      }
      body = { feedback: feedback.trim() };
    }

    else {
      alert("Invalid admin action");
      setActionLoading(false);
      return;
    }

    const API_URL = `https://s3conference.ksrce.ac.in/api/payments/paymentprocess/verify/${mongoId}`;

    const response = await axios.put(API_URL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data?.success) {
      alert("✅ Payment status updated successfully");
      setVerifyModalData(null);
      setFeedbackModalOpen(false);
      setFeedbackText("");
      setRefreshTrigger((prev) => !prev);
    } else {
      alert(response.data?.message || "Unexpected server response");
    }

  } catch (err) {
    console.error("❌ ERROR updating payment status:", err);
    alert(err.response?.data?.message || "Failed to update payment");
  } finally {
    setActionLoading(false);
  }
};



  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) {
      alert("Please provide a reason.");
      return;
    }
    if (!verifyModalData) {
      alert("Error: No user data found.");
      return;
    }
    
    handlePaymentVerify(verifyModalData._id, feedbackAction, feedbackText.trim());
  };

  const openVerifyModal = (row) => setVerifyModalData(row);
  
  const openFeedbackModal = (action) => {
    if (!verifyModalData) return;
    setFeedbackAction(action);
    setFeedbackText(verifyModalData.feedback || "");
    setFeedbackModalOpen(true);
  };

  const donutChartData = [
    { name: "Paid", value: stats.paid, color: "#10B981" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" },
    { name: "Unpaid", value: stats.unpaid, color: "#6B7280" },
  ].filter((item) => item.value > 0);

  return (
    <>
      <style>{paymentSupportStyles}</style>
      <div className="payment-support-container">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 header-gradient leading-tight">
                Payment Verification Dashboard
              </h1>
              <p className="text-xs flex items-center gap-2" style={{ color: "#6c757d" }}>
                <DollarSign className="w-4 h-4" /> 
                Manage and verify user payment submissions for approved papers
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
              title="Total Registrations" 
              value={stats.total.toLocaleString()} 
              hint="All approved papers" 
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

          {/* Table Section */}
          <div className="table-container">
            <div className="table-toolbar">
              <div className="table-info">
                <h3 className="text-base font-bold" style={{ color: "#111318" }}>
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
                  <option value="payment pending">Payment Pending</option>
                </select>
                <button 
                  onClick={handleExportExcel} 
                  className="btn btn-success btn-sm" 
                  disabled={filteredAndSearchedRows.length === 0}
                >
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#1976D2" }} />
                <span className="mt-3 text-sm" style={{ color: "#6c757d" }}>
                  Loading payment data...
                </span>
              </div>
            ) : filteredAndSearchedRows.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-base font-semibold" style={{ color: "#111318", marginBottom: "8px" }}>
                  {rows.length === 0 ? "No payments found" : "No matching payments"}
                </h4>
                <p className="text-sm" style={{ color: "#6c757d" }}>
                  {rows.length === 0 
                    ? "There are no payment submissions to display." 
                    : "Try adjusting your search or filter criteria."}
                </p>
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
                        <SortableHeader field="amountPaid" sortConfig={sortConfig} onSort={handleSort}>
                          Amount
                        </SortableHeader>
                        <SortableHeader field="paymentStatus" sortConfig={sortConfig} onSort={handleSort}>
                          Status
                        </SortableHeader>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRows.map((r) => (
                        <tr key={r._id}>
                          <td className="font-mono text-xs" style={{ color: "#475569" }}>
                            {r.userId}
                          </td>
                          <td>
                            <div className="font-semibold" style={{ color: "#111318", fontSize: "0.8rem" }}>
                              {r.authorName}
                            </div>
                          </td>
                          <td>
                            <div className="text-xs" style={{ color: "#475569" }}>
                              {r.email}
                            </div>
                          </td>
                          <td>
                            <div className="text-xs font-semibold" style={{ color: "#111318" }}>
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
                              {r.paymentStatus === 'pending' || r.paymentStatus === 'payment pending' ? 'Verify' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              User ID: {verifyModalData.userId} | Status: {verifyModalData.paymentStatus}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[70vh] p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* NEW FIELDS IN MODAL FOR VERIFICATION */}
                <div className="text-xs">
                  <strong>Country:</strong> {verifyModalData.country}
                </div>
                <div className="text-xs">
                  <strong>Early Bird:</strong> {verifyModalData.isEarlyBird ? 
                    <span className="text-green-600 font-bold">Yes (Discount Applied)</span> : 
                    <span className="text-gray-600">No</span>
                  }
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
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-bold mb-3 text-sm text-gray-900 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Payment Proofs ({verifyModalData.allProofUrls?.length || 0})
                </h4>
                
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {verifyModalData.allProofUrls && verifyModalData.allProofUrls.length > 0 ? (
                    verifyModalData.allProofUrls.map((url, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-600">
                               {index === 0 ? "Latest Submission" : `Previous Submission ${index}`}
                            </span>
                            <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                              #{verifyModalData.allProofUrls.length - index}
                            </span>
                         </div>
                         <ProofImage 
                           src={url} 
                           alt={`Payment proof ${index + 1} for ${verifyModalData.authorName}`}
                         />
                         <button 
                           onClick={() => window.open(url, '_blank', 'noopener,noreferrer')} 
                           className="btn btn-outline btn-sm w-full mt-2 flex items-center justify-center gap-2 hover:bg-white"
                         >
                           <Eye className="w-3 h-3" /> View Full Image
                         </button>
                      </div>
                    ))
                  ) : (
                     <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No payment proofs uploaded.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              {/* <button 
                onClick={() => openFeedbackModal("rejected")} 
                className="btn btn-danger btn-sm" 
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button> */}
              <button 
                onClick={() => openFeedbackModal("payment pending")} 
                className="btn btn-warning btn-sm" 
                disabled={actionLoading}
              >
                <AlertTriangle className="w-4 h-4" /> Mark Pending
              </button>
              <button 
                onClick={() => handlePaymentVerify(verifyModalData._id, "paid")} 
                disabled={actionLoading} 
                className="btn btn-success btn-sm"
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <Modal onClose={() => setFeedbackModalOpen(false)} size="md">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 capitalize">
              {feedbackAction === "rejected" ? "Rejection Reason" : "Request Update"}
            </h3>
          </div>
          <div className="p-4">
            <div className="text-center mb-4">
              <div className={`mx-auto w-fit rounded-full p-3 mb-3 ${
                feedbackAction === "rejected" ? "bg-red-100" : "bg-orange-100"
              }`}>
                {feedbackAction === "rejected" ? 
                  <XCircle className="w-6 h-6 text-red-500" /> : 
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                }
              </div>
              <p className="text-gray-500 text-sm">
                {feedbackAction === "rejected" 
                  ? "Please provide a reason for rejection (this will be sent to the user)." 
                  : "Explain what needs to be corrected in the payment proof (this will be sent to the user)."}
              </p>
            </div>
            <textarea 
              rows="4" 
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 outline-none resize-none text-sm" 
              placeholder="Enter feedback here..." 
              value={feedbackText} 
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <div className="flex gap-3">
              <button 
                onClick={() => setFeedbackModalOpen(false)} 
                className="btn btn-outline flex-1" 
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleFeedbackSubmit} 
                disabled={actionLoading || !feedbackText.trim()} 
                className={`btn flex-1 ${
                  feedbackAction === "rejected" ? "btn-danger" : "btn-warning"
                }`}
              >
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PaymentSupport;
