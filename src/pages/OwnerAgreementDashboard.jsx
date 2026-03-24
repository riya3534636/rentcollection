import axios from "axios";
import { useEffect, useState } from "react";
import { 
  FileText, 
  MapPin, 
  User, 
  Calendar, 
  IndianRupee, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";

export default function AgreementList() {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreementId, setSelectedAgreementId] = useState("");
  const navigate=useNavigate()

  const getAllAgreements = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/agreement/getAllAggrements`,
        { withCredentials: true }
      );
      setAgreements(result.data);
      
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllAgreements();
  }, []);

  const deleteAgreement = async (id) => {
    const targetId = id || selectedAgreementId;
    if (!targetId) {
      alert("Please select an agreement first");
      return;
    }
    
    if(!window.confirm("Are you sure you want to delete this agreement?")) return;

    try {
      const result = await axios.delete(
        `${serverUrl}/api/agreement/endAggrement/${targetId}`,
        { withCredentials: true }
      );
      alert(result.data.message);
      getAllAgreements();
      setSelectedAgreementId("");
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/ownerDashboard")}
          className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <FileText size={28} />
              </span>
              Agreements
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage and track all rental contracts from your properties.
            </p>
          </div>

         
           
        </div> 

        {/* LIST CONTAINER */}
        <div className="grid grid-cols-1 gap-4">
          {agreements.map((agreement) => (
            <div
              key={agreement._id}
              onClick={() => setSelectedAgreementId(agreement._id)}
              className={`group relative bg-white rounded-3xl border-2 transition-all duration-300 p-5 md:p-6 
                ${selectedAgreementId === agreement._id 
                  ? "border-indigo-500 ring-4 ring-indigo-500/5 shadow-xl shadow-indigo-500/10" 
                  : "border-transparent hover:border-slate-200 shadow-sm hover:shadow-md"
                }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* LEFT: PRIMARY INFO */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex mt-1 p-3 bg-slate-50 rounded-2xl text-indigo-600">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 leading-tight">
                        {agreement.propertyId?.address || "Unknown Property"}
                      </h2>

                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 font-semibold bg-slate-50 px-3 py-1 rounded-lg">
                          <User size={14} className="text-indigo-500" />
                          {agreement.tenantId?.name || "Unknown Tenant"}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 font-semibold bg-slate-50 px-3 py-1 rounded-lg">
                          <Calendar size={14} className="text-indigo-500" />
                          {new Date(agreement.startDate).toLocaleDateString()} — {new Date(agreement.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MIDDLE: STATUS & RENT */}
                <div className="flex items-center gap-8 lg:px-8 lg:border-x border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Monthly Rent</span>
                    <span className="text-lg font-bold text-slate-900 flex items-center gap-0.5">
                      <IndianRupee size={16} strokeWidth={3} className="text-indigo-600" />
                      {agreement.rentAmount?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Status</span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2
                      ${agreement.status?.toLowerCase() === "active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-slate-50 text-slate-600 border-slate-100"
                      }`}>
                      {agreement.status?.toLowerCase() === "active" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {agreement.status}
                    </span>
                  </div>
                </div>

                {/* RIGHT: ACTIONS */}
               <div className="flex items-center gap-2"> 
                  {/* <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                    <ExternalLink size={16} />
                    View PDF
                  </button>  */}

                  {/* SELECT BUTTON (maintained your logic) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAgreementId(agreement._id);
                    }}
                    className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm
                      ${selectedAgreementId === agreement._id 
                        ? "bg-indigo-600 text-white shadow-indigo-200" 
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-100"
                      }`}
                  >
                    {selectedAgreementId === agreement._id ? "Selected" : "Select"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAgreement(agreement._id);
                    }}
                    className="p-2.5 text-rose-500 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm group-hover:scale-105"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

              </div>
              
              {/* SELECTION INDICATOR GLOW */}
              {selectedAgreementId === agreement._id && (
                <div className="absolute top-0 right-0 p-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* EMPTY STATE */}
          {agreements.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="inline-flex p-5 bg-indigo-50 text-indigo-500 rounded-full mb-4">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No Agreements Yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium">
                Rental agreements will appear here once you've generated them for your properties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
