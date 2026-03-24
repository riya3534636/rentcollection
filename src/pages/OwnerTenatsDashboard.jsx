import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, UserCheck, UserPlus, Home, Phone, Mail, 
  Calendar, Search, Trash2, ExternalLink, Filter, ChevronRight,
  ArrowLeft
} from "lucide-react";
import { serverUrl } from "../main";

const OwnerTenantsDashboard = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ totalTenants: 0, activeTenants: 0, vacantTenants: 0 });

  const getOwnerTenant = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/tenant/getByOwnerTenat`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setTenants(res.data.tenants);
        setStats({
          totalTenants: res.data.totalTenants || 0,
          activeTenants: res.data.activeTenants || 0,
          vacantTenants: res.data.vacantTenants || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    getOwnerTenant();
  }, []);

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">

      <button
          onClick={() => navigate("/ownerDashboard")}
          className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation & Stats Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Residents</h1>
            <div className="flex items-center gap-4 mt-3 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Users size={16}/> {stats.totalTenants} Total</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-emerald-600 font-bold">{stats.activeTenants} Active Leases</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Find a resident..."
                className="bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 w-64 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              /> */}
            </div>
            <button
              onClick={() => navigate("/owner/AddTenants")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
            >
              <UserPlus size={18} /> Add
            </button>
          </div>
        </div>

        {/* Column-based Table Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-400">Resident</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-slate-400">Property Info</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-slate-400">Contact Details</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant._id} className="hover:bg-indigo-50/30 transition-colors group">
                    {/* Column 1: Resident Identity */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                          {tenant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{tenant.name}</div>
                          <div className="text-xs text-slate-400 font-medium">Joined {new Date(tenant.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Property */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium italic">
                        <Home size={14} className="text-slate-300" />
                        {tenant.property || "Unassigned"}
                      </div>
                    </td>

                    {/* Column 3: Contact Details */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-600 flex items-center gap-2">
                          <Phone size={14} className="text-slate-300" /> {tenant.phone}
                        </span>
                        <span className="text-sm text-slate-400 truncate max-w-[180px]">
                          {tenant.email}
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Status */}
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight
                        ${tenant.isActive 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-amber-100 text-amber-700"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tenant.isActive ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        {tenant.isActive ? "Active" : "Pending"}
                      </span>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/owner/TenantDetails/${tenant._id}`)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <ExternalLink size={18} />
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination Placeholder */}
          {filteredTenants.length > 0 && (
            <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-400 font-medium">
              Showing {filteredTenants.length} of {stats.totalTenants} residents
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredTenants.length === 0 && (
          <div className="mt-10 py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <Users size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No matches found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerTenantsDashboard;
