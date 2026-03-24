
import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerNavbar from "../Components/OwnerNavbar";
import OwnerSidebar from "../Components/OwnerSideBar";
import { useSelector } from "react-redux";
import { serverUrl } from "../main";

const OwnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);

  // ✅ Get logged-in user data from Redux
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!userData?._id) return; // safeguard if userData not loaded yet
        const res = await axios.get(
          `${serverUrl}/api/dashboard/stats?ownerId=${userData._id}`,
          { withCredentials: true }
        );
        setStats(res.data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [userData]);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <OwnerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 h-300 flex flex-col overflow-hidden">
        {/* Navbar */}
        <OwnerNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Owner Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Overview of your property portfolio
              </p>
            </div>
          </div>

          {/* Grid Container for Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl shadow-xl shadow-indigo-200/50 p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
                <p className="text-indigo-100 max-w-md leading-relaxed">
                  Manage your properties, tenants, and finances all in one place. 
                  Your portfolio is performing 12% better than last month.
                </p>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                  </svg>
                </span>
                <h2 className="font-bold text-slate-800">Quick Tip</h2>
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                “Responding quickly to tenant maintenance requests builds trust
                and helps reduce turnover. Happy tenants are long-term tenants.”
              </p>
            </div>

            {/* Monthly Snapshot Card */}
            <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Monthly Snapshot
                <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wider">Live Stats</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Properties Managed", value: stats?.propertiesManaged || 0, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Active Tenants", value: stats?.activeTenants || 0, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Pending Requests", value: stats?.pendingRequests || 0, color: "text-rose-600", bg: "bg-rose-50" },
                  { label: "Bills Generated", value: stats?.billsGenerated || 0, color: "text-amber-600", bg: "bg-amber-50" }
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} rounded-xl p-5 border border-transparent hover:border-white hover:shadow-md transition-all`}>
                    <p className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
