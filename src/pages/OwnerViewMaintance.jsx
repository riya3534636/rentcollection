import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Calendar, 
  Tag, 
  MessageSquareText, 
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { serverUrl } from "../main";

export default function MaintenanceDetails() {
  const [status, setStatus] = useState("open");
  const [maintenance, setMaintenance] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/maintenace/getDetailsMaintenance/${id}`,
        { withCredentials: true }
      );
      setMaintenance(result.data.maintenance);
      setStatus(result.data.maintenance.status || "open");
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/maintenace/updateStatus/${id}`,
        { status: status.toLowerCase() },
        { withCredentials: true }
      );
      getDetails();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const statusStyles = {
    open: "bg-rose-50 text-rose-600 border-rose-100 ring-rose-500/20",
    in_progress: "bg-amber-50 text-amber-600 border-amber-100 ring-amber-500/20",
    resolved: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/20"
  };

  const statusIcons = {
    open: <AlertCircle size={18} />,
    in_progress: <Clock size={18} />,
    resolved: <CheckCircle2 size={18} />
  };

  if (!maintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium italic">Fetching ticket details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={18} /> Back to Requests
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ticket ID</span>
            <span className="text-sm font-mono font-bold text-slate-600">#{id.slice(-6).toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Header Ticket Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ring-4 uppercase tracking-tighter ${statusStyles[status]}`}>
                {statusIcons[status]} {status.replace('_', ' ')}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <Calendar size={14} /> Created {new Date(maintenance.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric'})}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {maintenance.description}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 text-indigo-600 mb-4 font-bold uppercase tracking-widest text-xs">
                <MessageSquareText size={16} /> Issue Summary
              </div>
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
                {maintenance.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
                  <p className="text-slate-900 font-bold flex items-center gap-2 uppercase text-sm">
                    <Tag size={14} className="text-indigo-500" /> {maintenance.category}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority</p>
                  <p className="text-slate-900 font-bold flex items-center gap-2 uppercase text-sm">
                    <Activity size={14} className="text-rose-500" /> High
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Action Center */}
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-500 p-2 rounded-lg">
                   <Activity size={20} className="text-white" />
                </div>
                <h2 className="text-lg font-bold">Maintenance Control</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Current Progress</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="open">Open (Reviewing)</option>
                    <option value="in_progress">In Progress (Repairing)</option>
                    <option value="resolved">Resolved (Closed)</option>
                  </select>
                </div>
                
                <button
                  onClick={updateStatus}
                  className="mt-6 md:mt-0 w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  Update Ticket Status
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            {/* Property Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600"><Building2 size={20} /></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Property</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 leading-tight">{maintenance.property?.propertyName}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{maintenance.property?.address}</p>
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">City</span>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{maintenance.property?.city}</span>
                </div>
              </div>
            </div>

            {/* Tenant Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600"><User size={20} /></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Requester</h3>
              </div>
              {maintenance.tenant ? (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900">{maintenance.tenant.name}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    {maintenance.tenant.email}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No tenant assigned to ticket</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
