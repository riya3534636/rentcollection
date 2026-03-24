import React, { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Car,
  Droplets,
  Zap,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Receipt,
  Trash2,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProperty } from "../redux/ownerSlice";
import { setAssignedTenantTo } from "../redux/ownerSlice";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [singleProperty, setSingleProperty] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { singleProperty } = useSelector((state) => state.owner);
  const { AssignedTenantTo } = useSelector((state) => state.owner);
  const [assignedTenant, setAssignedTenant] = useState(null);
  const [property, setProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3100/api/property/getBy/${id}`,
        {
          withCredentials: true,
        },
      );

      dispatch(setSingleProperty(result.data.property));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteProperty = async () => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `http://localhost:3100/api/property/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      if (result.data.success) {
        navigate("/owner/properties");
      }
      console.log(result.data.message);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const getProptertyDetails = async () => {
  //   try {
  //     const result = await axios.get(
  //       `http://localhost:3100/api/property/getPropertyViewDetails/${id}`,
  //       { withCredentials: true },
  //     );

  //     console.log(result.data); // ✅ now you’ll see the actual response object

  //     dispatch(setAssignedTenantTo(result.data.assignedTenant));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (id) {
      getProptertyDetails();
    }
  }, [id]);

  const getProptertyDetails = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3100/api/property/getPropertyViewDetails/${id}`,
        { withCredentials: true },
      );

      console.log(result.data); // ✅ see the response
      dispatch(setAssignedTenantTo(result.data.assignedTenant));
      setProperty(result.data.property);
      setAssignedTenant(result.data.assignedTenant);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProperties();
    // getProptertyDetails();
  }, []);

  return (
    <div className="p-8 bg-gray-50/50 h-500 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate("/owner/properties")}
              className="flex items-center gap-1 text-indigo-600 font-medium text-sm hover:underline mb-2"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {singleProperty.propertyName}
              </h1>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                {singleProperty.Status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={18} className="text-indigo-500" />
              <p className="text-lg">
                {singleProperty.city} {singleProperty.state}{" "}
                {singleProperty.pincode}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={deleteProperty}
              className="flex items-center gap-2 bg-white border border-gray-200 text-red-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all shadow-sm"
            >
              <Trash2 size={18} />
              Delete
            </button>
            {/* <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Edit Property
            </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Specs Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Building2 className="text-indigo-600" size={22} />
                Property Specifications
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Type
                  </p>
                  <p className="font-semibold text-gray-800">
                    {singleProperty.propertyType}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                    <BedDouble size={14} /> {singleProperty.bedrooms}
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">3 Units</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                    <Bath size={14} /> {singleProperty.bathrooms}
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">2 Units</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                    <Maximize size={14} /> Total Area
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {singleProperty.areaSqft}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-indigo-600 text-xs font-bold uppercase mb-1">
                    Monthly Rent
                  </p>
                  <p className="font-bold text-indigo-700 text-xl">
                    ₹{singleProperty.rent}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Pincode
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {singleProperty.pincode}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-bold uppercase mb-2">
                  Complete Address
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {singleProperty.address} {singleProperty.city},{" "}
                  {singleProperty.state} - {singleProperty.pincode}
                </p>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Facilities & Utilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {singleProperty.hasParking && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                      <Car size={20} />
                    </div>
                    <span className="font-semibold text-emerald-900">
                      Parking Space
                    </span>
                  </div>
                )}
                {singleProperty.haswaterConnnection && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Droplets size={20} />
                    </div>
                    <span className="font-semibold text-blue-900">
                      Water Supply
                    </span>
                  </div>
                )}

                {singleProperty.hasElectricityConnection && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                      <Zap size={20} />
                    </div>
                    <span className="font-semibold text-amber-900">
                      Electricity
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Column: Tenant & Actions */}
          <div className="space-y-8">
            {/* Tenant Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-10 -mt-10"></div>

              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-indigo-600" size={22} />
                Assign Tenant
              </h3>
              {AssignedTenantTo ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                      RS
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {AssignedTenantTo.name}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        Tenant since Jan 2025
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm">
                        +91 {AssignedTenantTo.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-wrap">
                        {AssignedTenantTo.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">
                        Moved in:{" "}
                        {new Date(
                          AssignedTenantTo.leaseStartDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No Tenat assigned</p>
              )}

              <button
                onClick={() => navigate("/owner/AssignmentTenant")}
                className="w-full mt-8 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 text-indigo-600 py-3 rounded-2xl text-sm font-bold transition-colors border border-gray-100"
              >
                <UserPlus size={18} />
                Assign Tenant / Change Tenant
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-indigo-900 rounded-3xl p-8 shadow-xl text-white">
              <h3 className="text-lg font-bold mb-6">Quick Documents</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/AgreementForm")}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all group"
                >
                  {/* <div className="flex items-center gap-3">
                    <FileText size={20} className="text-indigo-300" />
                    <span className="font-medium text-sm">Create Rent Agreement</span>
                  </div> */}

                  <div className="flex items-center gap-3 mt-6">
                    <FileText size={20} className="text-indigo-300" />

                    {assignedTenant ? (
                      <span className="font-medium text-sm text-white-700">
                        Property occupied by {assignedTenant.name}
                      </span>
                    ) : (
                      <span className="font-medium text-sm">
                        Create Rent Agreement
                      </span>
                    )}
                  </div>
                </button>
                {/* <button onClick={()=>navigate(`/owner/viewBillsByPropterty/${id}`)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                   <div className="flex items-center gap-3">
                    <Receipt size={20} className="text-indigo-300" />
                    <span className="font-medium text-sm">Utility Bills</span>
                  </div> 
                  <span className="text-xs text-indigo-300">View All</span>  
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
