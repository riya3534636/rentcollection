import React from 'react';
import { 
  FileText, Calendar, User, Download, Eye, 
  Hash, DollarSign, ShieldCheck, Clock, UploadCloud 
} from 'lucide-react';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

const AgreementDesign = () => {
    const navigate=useNavigate()

  const data = {
    status: "Active",
    property: "Skyline Residency",
    flatNo: "Flat 402, 4th Floor",
    id: "AGR-2026-0092",
    startDate: "Jan 01, 2026",
    endDate: "Dec 31, 2026",
    monthlyRent: "2,400",
    securityDeposit: "4,800",
    owner: "Robert Fox",
    tenant: "Alex Johnson",
    uploadedBy: "Admin",
    uploadDate: "Jan 05, 2026"
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-10 font-sans text-slate-900">
          <button
        onClick={() => navigate("/tenant")}
        className="flex items-center  gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <div className="max-w-5xl mt-10 mx-auto">
        
        {/* Main Header Card */}
        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight">{data.property}</h1>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                data.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {data.status}
              </span>
            </div>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{data.flatNo}</span>
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Eye size={18} /> View
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Download size={18} /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Agreement Info & Parties */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Agreement Info Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Hash size={16} /> Agreement Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Agreement ID</span>
                    <span className="font-bold text-blue-600">{data.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Start Date</span>
                    <span className="font-bold">{data.startDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">End Date</span>
                    <span className="font-bold">{data.endDate}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Monthly Rent</span>
                    <span className="font-bold text-slate-900">${data.monthlyRent}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Security Deposit</span>
                    <span className="font-bold text-slate-900">${data.securityDeposit}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parties Details Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <User size={16} /> Parties Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">L</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Landlord / Owner</p>
                    <p className="font-bold text-slate-800">{data.owner}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">T</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Tenant</p>
                    <p className="font-bold text-slate-800">{data.tenant}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Upload Info & Quick Stats */}
          <div className="space-y-6">
            
            {/* Upload Info Card */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-300">
              <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">Upload Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Uploaded By</p>
                    <p className="font-bold text-slate-200">{data.uploadedBy}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-800 rounded-lg text-emerald-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Upload Date</p>
                    <p className="font-bold text-slate-200">{data.uploadDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                   <ShieldCheck size={20} className="text-emerald-500" />
                   <span className="text-xs font-medium text-slate-300">Verified by CloudVault</span>
                </div>
              </div>
            </div>

            {/* Quick Helper
            <div className="bg-blue-600 rounded-3xl p-6 text-white text-center">
              <FileText className="mx-auto mb-3 opacity-50" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest mb-1">Contract Validity</p>
              <p className="text-2xl font-black">365 Days</p>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgreementDesign;