import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  UserPlus,
  Info,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";

export default function AddTenant() {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    verified:false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await axios.post(
      `${serverlUrl}/api/tenant/addTenant`,
      formData,
      { withCredentials: true }
    );

    if(result.data.success){
      navigate("/owner/tenants")
    }

    console.log(result.data.tenant); 
    // dispatch(setTenantData(result.data.tenant))
  } catch (error) {
    console.error(error.response?.data || error.message); // ✅ proper error logging
  }
};


  return (
    <div className="p-8 bg-gray-50/50 min-h-screen h-500">
      <div className="max-w-4xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <button onClick={()=>navigate("/owner/tenants")} className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft size={16} /> Back to Directory
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Onboard New Tenant
            </h1>
          </div>
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 hidden md:block">
            <UserPlus size={28} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT: Profile Preview & Status */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-indigo-600"></div>

              <div className="relative pt-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto border-4 border-white flex items-center justify-center text-gray-400 shadow-lg">
                  {formData.name ? (
                    <span className="text-2xl font-bold text-indigo-600">
                      {formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 leading-tight">
                  {formData.name || "Full Name"}
                </h3>
                <p className="text-sm text-gray-500 truncate px-4">
                  {formData.email || "email@address.com"}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                <div
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${formData.verified ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-gray-50 border-gray-100 text-gray-400"}`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      size={20}
                      className={
                        formData.verified ? "text-emerald-500" : "text-gray-300"
                      }
                    />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Verification
                    </span>
                  </div>
                  <span className="text-xs font-black">
                    {formData.verified ? "DONE" : "PENDING"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
              <div className="bg-amber-100 p-2 rounded-xl h-fit text-amber-600">
                <Info size={20} />
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                Ensure the phone number provided is reachable via WhatsApp for
                digital agreements and rent reminders.
              </p>
            </div>
          </div>

          {/* RIGHT: Detailed Form Inputs */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="space-y-8">
              {/* Personal Section */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                        placeholder="rahul@gmail.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1">
                  Location Details
                </h4>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    Permanent Address (Optional)
                  </label>
                  <div className="relative group">
                    <MapPin
                      className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      size={18}
                    />
                    <textarea
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium resize-none"
                      placeholder="Enter the tenant's permanent or previous address..."
                    />
                  </div>
                </div>
              </div>

              {/* Verification Toggle */}
              <div className="pt-4">
                <label
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.verified
                      ? "bg-emerald-50 border-emerald-500"
                      : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData({ ...formData, verified: e.target.checked })
                      }
                    />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${formData.verified ? "bg-emerald-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.verified ? "translate-x-4" : ""}`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-bold text-gray-800">
                      Verified Tenant
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      This tenant has provided valid Government ID proof.
                    </span>
                  </div>
                  {formData.verified && (
                    <ShieldCheck className="text-emerald-600" size={24} />
                  )}
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Save Tenant Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
