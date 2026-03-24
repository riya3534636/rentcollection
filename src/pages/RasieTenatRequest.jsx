import React, { useState } from "react";
import axios from "axios";
import { 
  Wrench, 
  Zap, 
  Wind, 
  ClipboardList, 
  HelpCircle, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Loader2 
} from "lucide-react"; // Using Lucide for modern icons
import {  useNavigate } from "react-router-dom";

const RaiseRequest = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const navigate=useNavigate()

  const categories = [
    { id: "plumbing", label: "Plumbing", icon: <Wrench size={18} />, color: "text-blue-600" },
    { id: "electrical", label: "Electrical", icon: <Zap size={18} />, color: "text-yellow-600" },
    { id: "ac", label: "AC Repair", icon: <Wind size={18} />, color: "text-cyan-600" },
    { id: "general", label: "General", icon: <ClipboardList size={18} />, color: "text-purple-600" },
    { id: "others", label: "Others", icon: <HelpCircle size={18} />, color: "text-gray-600" },
  ];

  const raiseRequest = async () => {
    if (!category || !description) return alert("Please fill in all fields");
    
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(
        "http://localhost:3100/api/maintenace/createIssue",
        { description, category },
        { withCredentials: true }
      );
      setStatus("success");
      setDescription("");
      setCategory("");
      navigate("/tenant/RaiseRequest")
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Maintenance Request
          </h1>
          <p className="text-slate-500 mt-2">
            Tell us what's wrong and we'll send an expert right away.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="p-8">
            
            {/* Category Grid */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-slate-700 mb-4 block">
                Select Issue Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-sm font-medium
                      ${category === cat.id 
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-100" 
                        : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    <span className={category === cat.id ? "text-blue-600" : "text-slate-400"}>
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Area */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Detailed Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue (e.g., 'The kitchen sink is leaking from the main pipe...')"
                className="w-full rounded-2xl border-slate-200 bg-slate-50/50 p-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Styled File Upload */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Attachment <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors mb-2" size={24} />
                <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mb-6 flex items-center gap-2 text-emerald-600 bg-emerald-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">Request submitted successfully!</span>
              </div>
            )}
            
            {status === "error" && (
              <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">Something went wrong. Please try again.</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3.5 text-slate-600 font-semibold rounded-2xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={raiseRequest}
                disabled={loading}
                className="flex-[2] bg-blue-600 text-white font-semibold rounded-2xl py-3.5 shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseRequest;