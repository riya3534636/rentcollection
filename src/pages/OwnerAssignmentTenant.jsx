import React, { useEffect, useState } from "react";
import {
  UserCheck,
  Building,
  Calendar,
  Users,
  ArrowLeft,
  Info,
  CheckCircle2,
  X,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";

const AssignTenant = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { singleProperty } = useSelector((state) => state.owner);
  const [ActiveTenats, setActiveTenats] = useState([]);
  const [leaseStartDate, setleaseDate] = useState("");
  const [selectedTenantId, setSelectedTenantId] = useState("");

  const [propertyId, setPropertyId] = useState("");

  useEffect(() => {
    if (singleProperty && singleProperty._id) {
      setPropertyId(singleProperty._id);
    }

    
  }, [singleProperty]);



  const getActiveTenant = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/tenant/getActiveTentant`,
        { withCredentials: true },
      );

      // console.log("Active tenants:", result.data);
      setActiveTenats(result.data.tenants);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const AssigningTenant = async () => {
    if (!singleProperty || !singleProperty._id) {
      alert("No property selected");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/property/AssignTenant/${propertyId}`,
        {
          tenantId: selectedTenantId,
          leaseStartDate,
        },
        { withCredentials: true },
      );

      console.log("Tenant assigned:", result.data.property.tenant.name);
      if(result.data.success){
        navigate("/owner/properties")
      }
       
     
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getActiveTenant();
  }, [ActiveTenats]);

  return (
    <div className="min-h-screen bg-gray-50/50 h-600 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate("/owner/properties")}
              className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft size={16} /> Back to Property
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Assign New Tenant
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 text-sm font-medium">
              <Info size={18} />
              Ensure agreement is signed before assigning
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Property Summary Card (The "What") */}
          <div className="lg:col-span-4">
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 sticky top-10 overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-50"></div>

              <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Building size={24} />
                </div>

                <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-200 mb-1">
                  Target Property
                </h2>
                <h3 className="text-2xl font-bold mb-6">
                  {" "}
                  {singleProperty.propertyName}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-indigo-500/50">
                    <span className="text-indigo-100 text-sm">Type</span>
                    <span className="font-semibold">
                      {singleProperty.propertyType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-indigo-500/50">
                    <span className="text-indigo-100 text-sm">Rent</span>
                    <span className="font-semibold">
                      ₹{singleProperty.rent}/mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-indigo-100 text-sm">Status</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {singleProperty.Status}
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-indigo-700/50 rounded-2xl border border-indigo-400/30 text-xs text-indigo-100 leading-relaxed">
                  Assigning a tenant will update the property status to
                  "Occupied" and begin the billing cycle.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Selection Form (The "Who & When") */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Select Tenant */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <Users size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Select Tenant
                </h3>
              </div>

              <div className="relative group">
                <select
                  value={selectedTenantId}
                  onChange={(e) => setSelectedTenantId(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium focus:bg-white focus:border-indigo-500 transition-all outline-none appearance-none"
                >
                  <option value="">Choose a registered tenant...</option>
                  {ActiveTenats.map((tenant) => (
                    <option key={tenant._id} value={tenant._id}>
                      {tenant.name} ({tenant.phone})
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <UserCheck size={20} />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-gray-500">
                <Info size={14} className="mt-0.5 text-indigo-500" />
                <p className="text-xs">
                  Only verified tenants appear here. If you can't find a tenant,
                  please
                  <span className="text-indigo-600 font-bold cursor-pointer hover:underline ml-1">
                    add them first
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Step 2: Move-in Details */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <Calendar size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Lease Start Date
                </h3>
              </div>

              <div className="max-w-xs">
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block ml-1">
                  Official Move-in Date
                </label>
                <input
                  type="date"
                  onChange={(e) => setleaseDate(e.target.value)}
                  value={leaseStartDate}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium focus:bg-white focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
              <button
                onClick={() => navigate("/owner/properties")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
                Cancel Assignment
              </button>

              <button
                onClick={AssigningTenant}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 group"
              >
                <CheckCircle2
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                Confirm & Assign Tenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTenant;
