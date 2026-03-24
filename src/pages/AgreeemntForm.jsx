import React, { useEffect, useState } from "react";
import {
  Calendar,
  IndianRupee,
  ShieldCheck,
  Building,
  User,
  Clock,
  ArrowLeft,
  FileSignature,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AgreementForm = () => {
  const navigate = useNavigate();
  const { singleProperty } = useSelector((state) => state.owner);
  const { AssignedTenantTo } = useSelector((state) => state.owner);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rentAmount, setAmount] = useState("");
  const [electricityCharge, setelectricityCharge] = useState("");
  const [waterCharge, setwaterCharge] = useState("");
  //  const [frontendImage, setFrontendImage] = useState(null);
    const [Backendimages, setBackendimages] = useState(null);

  const handleImages = (e) => {
        const file = e.target.files[0];
        setBackendimages(file);
    //     setFrontendImage(URL.createObjectURL(file));
  };

  const [tenantId,setTenantId]=useState("")


  const getProptertyDetails = async () => {
  try {
    const result = await axios.get(
      `http://localhost:3100/api/property/getPropertyViewDetails/${singleProperty._id}`,
      { withCredentials: true }
    );

    // console.log(result.data.assignedTenant._id);
    setTenantId(result.data.assignedTenant._id)
  } catch (error) {
    console.error(error);
  }
};

 useEffect(()=>{
     getProptertyDetails()
 },[])


     const CreatingAggrement = async () => {
  try {
    const result = await axios.post("http://localhost:3100/api/agreement/create", {
      tenantId: tenantId,   
      propertyId: singleProperty?._id,           // property ID from redux
      rentAmount: rentAmount,
      electricityCharge: electricityCharge,
      waterCharge: waterCharge,                    // you can make this a state too if needed
      dueDate: dueDate,
      startDate: startDate,
      endDate: endDate,
      image: Backendimages
    },
    {withCredentials:true}
  );

    // console.log("Agreement created:", result.data);
    if(result.data.success){
      navigate("/owner/properties") // redirect if needed
    }
    } catch (error) {
    console.error("Error creating agreement:", error);
    console.error(error.response?.data?.message || "Something went wrong"); 
  }
};


  return (
    <div className="min-h-screen bg-gray-50/50 h-600 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/owner/properties")}
            className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} /> Back to Handover
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <FileSignature className="text-indigo-600" size={32} />
            Create Rental Agreement
          </h1>
          <p className="text-gray-500 mt-2">
            Formalize the lease by setting terms, rent cycles, and legal
            documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: The "Parties Involved" Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">
                Agreement Entities
              </h3>

              {/* Property Summary */}
              <div className="mb-8 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <Building size={18} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {" "}
                    {singleProperty.propertyName}
                  </h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold">
                      {singleProperty.propertyType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold">{singleProperty.city}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-100">
                    <span className="text-gray-500">Base Rent</span>
                    <span className="font-bold text-indigo-600">
                      ₹{singleProperty.rent}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tenant Summary */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-600 p-2 rounded-lg text-white">
                    <User size={18} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {AssignedTenantTo.name}
                  </h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-semibold">
                      {" "}
                      {AssignedTenantTo.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-semibold truncate ml-4">
                      {" "}
                      {AssignedTenantTo.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Agreement Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Agreement Period */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600">
                  <Calendar size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  1. Agreement Period
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Start Date
                  </label>
                  <input
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    type="date"
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-amber-400 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-amber-400 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Due Day (Monthly)
                  </label>
                  <div className="relative">
                    <Clock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="number"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="5"
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:bg-white focus:border-amber-400 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Rent & Deposit */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600">
                  <IndianRupee size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  2. Financial Terms
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Monthly Rent
                  </label>
                  <input
                    type="number"
                    value={rentAmount}
                    onChange={(e) =>setAmount(e.target.value)}
                    placeholder="₹"
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-400 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    ElectricityCharge
                  </label>
                  <input
                    type="number"
                    value={electricityCharge}
                    onChange={(e) => setelectricityCharge(e.target.value)}
                    placeholder="₹"
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-400 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    WaterCharge
                  </label>
                  <input
                    type="number"
                    value={waterCharge}
                    onChange={(e) => setwaterCharge(e.target.value)}
                    placeholder="₹"
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-400 transition-all outline-none"
                  />
                </div>
              </div>
            </section>

            {/* 3. Terms & Upload */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  3. Legal Clauses & Document
                </h3>
              </div>

              {/* <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Agreement Terms</label>
                  <textarea rows="4" placeholder="Enter custom conditions (e.g., notice period, maintenance responsible...)" className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-emerald-400 transition-all outline-none" />
                </div> */}

              {/* <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Signed Document Scan</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer text-center">
                    <div className="bg-white w-14 h-14 rounded-full shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="text-indigo-600" size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max. 10MB)</p>
                    <input onChange={handleImages} type="file" className="hidden" />
                  </div>
                </div>  */}

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Signed Document Scan
                </label>

                <label
                  htmlFor="signedDoc"
                  className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer text-center"
                >
                  <div className="bg-white w-14 h-14 rounded-full shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {/* <UploadCloud className="text-indigo-600" size={24} /> */}
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG or PNG (Max. 10MB)
                  </p>
                </label>

                <input
                  id="signedDoc"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  className="hidden"
                  onChange={handleImages}
                />
              </div>

              {/* </div> */}
            </section>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 p-4">
              <button className="px-8 py-3 rounded-2xl text-gray-500 font-bold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button onClick={CreatingAggrement} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95">
                Create Agreement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementForm;
