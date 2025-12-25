
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Loader2,
  MessageSquare,
  Mail,
  BellRing,
  Check,
  CircleX,
  X,
  RefreshCw,
  BarChart3,
  User, // Added for cards
  Phone, // Added for cards
  AlertTriangle, // Added for empty state
  Inbox as InboxIcon, // Added for empty state
} from "lucide-react";

/* ----------------------------- Styles ----------------------------- */
const styles = `
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
  .btn-sm {
    padding: 6px 12px;
    font-size: 0.75rem;
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
  .header-gradient {
    background: linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #F57C00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Tab Styles */
  .tab-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4B5563; /* text-gray-600 */
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .tab-btn-active {
    color: #1D4ED8; /* text-blue-700 */
    border-bottom-color: #1D4ED8; /* border-blue-700 */
  }
  .tab-btn:hover:not(.tab-btn-active) {
    background-color: #F3F4F6; /* bg-gray-100 */
    border-bottom-color: #E5E7EB; /* border-gray-200 */
  }
`;

// ✅ Inline StatCard Component (Enhanced)
const StatCard = ({ icon, title, value, change, isPositive }) => (
  <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
    <div>
      <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
        {title}
      </div>
      <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
      {change !== "-" && (
        <div
          className={`text-xs mt-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </div>
      )}
    </div>
    <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
  </div>
);

// --- Icons for StatCards (Compacted) ---
const icons = {
  total: <Mail className="w-6 h-6 text-blue-500" />,
  new: <BellRing className="w-6 h-6 text-yellow-500" />,
  resolved: <Check className="w-6 h-6 text-green-500" />,
  unresolved: <CircleX className="w-6 h-6 text-red-500" />,
};

const Inbox = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    resolved: 0,
    unresolved: 0,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyMessages, setReplyMessages] = useState({});
  const [activeTab, setActiveTab] = useState("unresolved"); // 'unresolved' or 'resolved'

  const API_BASE = "https://s3Conference.ksrce.ac.in/api/enquiries";

  // --- Fetch enquiries from API ---
  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
        updateStats(data.enquiries);
      } else {
        setEnquiries([]);
        setStats({ total: 0, new: 0, resolved: 0, unresolved: 0 });
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setEnquiries([]);
      setStats({ total: 0, new: 0, resolved: 0, unresolved: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // --- Update enquiry status (resolve) ---
  const updateEnquiryStatus = async (enquiryId, messageId) => {
    try {
      await axios.put(
        `${API_BASE}/${enquiryId}`,
        { messageId, status: "resolved" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchEnquiries();
    } catch (err) {
      console.error("Failed to update enquiry status:", err);
    }
  };

  // --- Update Stats ---
  const updateStats = (list) => {
    const total = list.reduce((acc, e) => acc + e.messages.length, 0);

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const newCount = list.reduce(
      (acc, e) =>
        acc +
        e.messages.filter((m) => new Date(m.createdAt) > oneDayAgo).length,
      0
    );

    const resolved = list.reduce(
      (acc, e) =>
        acc + e.messages.filter((m) => m.status === "resolved").length,
      0
    );

    const unresolved = list.reduce(
      (acc, e) =>
        acc + e.messages.filter((m) => m.status === "unresolved").length,
      0
    );

    setStats({ total, new: newCount, resolved, unresolved });
  };

  // --- Gmail Reply ---
  const handleGmailReply = (email, messageId) => {
    const subject = encodeURIComponent("Query Resolution");
    const body = encodeURIComponent(replyMessages[messageId] || "");
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  // --- Render Enquiry Cards (Enhanced) ---
  const renderEnquiryCards = (list, isResolved = false) => {
    let allMessages = [];
    list.forEach((enquiry) => {
      enquiry.messages.forEach((msg) => {
        allMessages.push({
          ...enquiry,
          messageId: msg._id,
          message: msg.text,
          messageStatus: msg.status,
          messageCreatedAt: msg.createdAt,
        });
      });
    });

    const filtered = allMessages
      .filter((msg) =>
        isResolved
          ? msg.messageStatus === "resolved"
          : msg.messageStatus === "unresolved"
      )
      .sort(
        (a, b) => new Date(b.messageCreatedAt) - new Date(a.messageCreatedAt)
      ); // Sort by newest first

    if (filtered.length === 0) {
      const Icon = isResolved ? Check : AlertTriangle;
      const title = isResolved ? "All Clear!" : "Inbox Zero";
      const text = isResolved
        ? "No resolved enquiries found."
        : "You have no new unresolved enquiries. Great job!";
      
      return (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500 space-y-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <Icon className="h-16 w-16 text-gray-300" strokeWidth={1} />
          <p className="text-xl font-semibold text-gray-700">{title}</p>
          <p className="text-sm">{text}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((msgObj, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl border border-gray-100"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-gray-400" />
                <p className="text-gray-800 font-semibold text-lg">
                  {msgObj.firstName} {msgObj.lastName}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-700 font-medium text-sm">
                    {msgObj.mobile || "N/A"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-blue-600 font-medium text-sm">
                    {msgObj.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Message
                </p>
                <p className="text-gray-700 text-sm">{msgObj.message}</p>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {new Date(msgObj.messageCreatedAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Reply Message
                </p>
                <textarea
                  value={replyMessages[msgObj.messageId] || ""}
                  onChange={(e) =>
                    setReplyMessages({
                      ...replyMessages,
                      [msgObj.messageId]: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full text-sm shadow-inner bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Type your reply here..."
                  rows={2}
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() =>
                    handleGmailReply(msgObj.email, msgObj.messageId)
                  }
                  className="flex-1 btn btn-secondary btn-sm"
                >
                  Reply via Gmail
                </button>
                {!isResolved && (
                  <button
                    onClick={() =>
                      updateEnquiryStatus(msgObj._id, msgObj.messageId)
                    }
                    className="flex-1 btn btn-success btn-sm"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
            {!isResolved && msgObj.proof && (
              <div className="mt-4 border-t pt-4">
                <button
                  onClick={() => setSelectedImage(msgObj.proof)}
                  className="w-full btn btn-outline btn-sm"
                >
                  View File
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50/50 min-h-screen p-4 md:p-8">
      <style>{styles}</style>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 header-gradient leading-tight">
            Inbox & Enquiries
          </h1>
          <p
            className="text-sm flex items-center gap-2"
            style={{ color: "#6c757d" }}
          >
            <BarChart3 className="w-4 w-4" />
            Manage and resolve user enquiries
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="btn btn-secondary btn-sm self-start lg:self-auto"
          disabled={loading}
          style={{ flexShrink: 0 }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 md:mb-8">
        <StatCard
          icon={icons.total}
          title="Total"
          value={stats.total}
          change="-"
          isPositive
        />
        <StatCard
          icon={icons.new}
          title="New (24h)"
          value={stats.new}
          change="-"
          isPositive
        />
        <StatCard
          icon={icons.resolved}
          title="Resolved"
          value={stats.resolved}
          change="-"
          isPositive
        />
        <StatCard
          icon={icons.unresolved}
          title="Unresolved"
          value={stats.unresolved}
          change="-"
          isPositive={false}
        />
      </div>

      {/* Tab Navigation and Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("unresolved")}
            className={`tab-btn ${
              activeTab === "unresolved" ? "tab-btn-active" : ""
            }`}
          >
            Unresolved ({stats.unresolved})
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`tab-btn ${
              activeTab === "resolved" ? "tab-btn-active" : ""
            }`}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="animate-spin text-blue-500 h-10 w-10" />
            </div>
          ) : (
            <>
              {activeTab === "unresolved" &&
                renderEnquiryCards(enquiries, false)}
              {activeTab === "resolved" &&
                renderEnquiryCards(enquiries, true)}
            </>
          )}
        </div>
      </div>

      {/* Image Modal (Compacted & Enhanced) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all z-10"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <div className="overflow-hidden rounded-lg">
              <img
                src={selectedImage}
                alt="Proof"
                className="w-full h-auto object-contain max-h-[calc(90vh-4rem)]" /* 90vh - padding */
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;