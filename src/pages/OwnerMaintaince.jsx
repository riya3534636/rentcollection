import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wrench, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  User2,
  Filter,
  ArrowLeft
} from "lucide-react";

const statusConfig = {
  OPEN: { 
    color: "bg-rose-50 text-rose-600 border-rose-100", 
    icon: <AlertCircle size={14} />,
    dot: "bg-rose-500"
  },
  IN_PROGRESS: { 
    color: "bg-amber-50 text-amber-600 border-amber-100", 
    icon: <Clock size={14} />,
    dot: "bg-amber-500"
  },
  RESOLVED: { 
    color: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    icon: <CheckCircle2 size={14} />,
    dot: "bg-emerald-500"
  }
};

export default function OwnerMaintenance() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  const getIssues = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3100/api/maintenace/getByOwner",
        { withCredentials: true }
      );
      setIssues(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const total = issues.length;
  const openCount = issues.filter(i => i.status?.toUpperCase() === "OPEN").length;
  const inProgressCount = issues.filter(i => i.status?.toUpperCase() === "IN_PROGRESS").length;
  const resolvedCount = issues.filter(i => i.status?.toUpperCase() === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">

         <button
          onClick={() => navigate("/ownerDashboard")}
          className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Wrench className="text-indigo-600" /> Maintenance
          </h1>
          <p className="text-slate-500 mt-1">Track and manage property repair requests</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
             <Filter size={16} /> Filter
           </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard 
          title="Total Requests" 
          value={total} 
          icon={<Wrench size={20} />} 
          bg="bg-indigo-600" 
          accent="text-white" 
        />
        <SummaryCard 
          title="Open" 
          value={openCount} 
          icon={<AlertCircle size={20} />} 
          bg="bg-white" 
          accent="text-rose-600" 
          border="border-slate-200"
        />
        <SummaryCard 
          title="In Progress" 
          value={inProgressCount} 
          icon={<Clock size={20} />} 
          bg="bg-white" 
          accent="text-amber-600" 
          border="border-slate-200"
        />
        <SummaryCard 
          title="Resolved" 
          value={resolvedCount} 
          icon={<CheckCircle2 size={20} />} 
          bg="bg-white" 
          accent="text-emerald-600" 
          border="border-slate-200"
        />
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Issue Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Property & Tenant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {issues.map(item => {
                const status = statusConfig[item.status?.toUpperCase()] || { color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
                return (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.description}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 italic">Reported: {new Date(item.createdAt).toLocaleDateString("en-IN")}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                        <Building2 size={14} className="text-slate-400" /> {item.property?.propertyName || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                        <User2 size={12} className="text-slate-300" /> {item.tenant?.name || "Unassigned"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        {item.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => navigate(`/owner/billsDetails/${item._id}`)} 
                        className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm shadow-indigo-100"
                      >
                        Details <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {issues.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <Wrench size={32} />
            </div>
            <p className="text-slate-400 font-medium">No maintenance requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, bg, accent, border = "border-transparent" }) {
  return (
    <div className={`${bg} ${border} border rounded-3xl p-6 shadow-sm flex items-center justify-between transition-transform hover:scale-[1.02] duration-300`}>
      <div>
        <p className={`text-[11px] uppercase tracking-[0.1em] font-bold ${bg === 'bg-indigo-600' ? 'text-indigo-200' : 'text-slate-400'}`}>
          {title}
        </p>
        <p className={`text-3xl font-black mt-1 ${accent}`}>
          {value}
        </p>
      </div>
      <div className={`${bg === 'bg-indigo-600' ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400'} p-4 rounded-2xl`}>
        {icon}
      </div>
    </div>
  );
}