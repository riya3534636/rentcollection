// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   ArrowLeft,
//   Zap,
//   Droplets,
//   CreditCard,
//   User,
//   Building,
//   Phone,
//   Mail,
//   Hash,
//   Calendar,
// } from "lucide-react";

// export default function BillDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [bill, setBill] = useState(null);
//   const [electricityAmount, setElectricityAmount] = useState("");
//   const [waterAmount, setWaterAmount] = useState("");

//   const getBillById = async () => {
//     try {
//       const result = await axios.get(
//         `http://localhost:3100/api/bill/getBillById/${id}`,
//         { withCredentials: true },
//       );
//       setBill(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (id) getBillById();
//   }, [id]);

//   if (!bill)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50 text-indigo-600 font-medium">
//         <div className="animate-pulse">Loading statement details...</div>
//       </div>
//     );

//   const rent = Number(bill.rentAmount || 0);
//   const effectiveElectricity =
//     electricityAmount !== ""
//       ? Number(electricityAmount)
//       : bill.electricityAmount || 0;
//   const effectiveWater =
//     waterAmount !== "" ? Number(waterAmount) : bill.waterAmount || 0;
//   const totalAmount = rent + effectiveElectricity + effectiveWater;

//   const updateBill = async () => {
//     try {
//       const result = await axios.put(
//         `http://localhost:3100/api/bill/update/${id}`,
//         {
//           electricityAmount: effectiveElectricity,
//           waterAmount: effectiveWater,
//         },
//       );
//       alert("Bill updated successfully");
//       if (result.data.success) {
//         navigate("/owner/bills");
//       }
//       getBillById();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans">
//       {/* TOP NAV */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <button
//           onClick={() => navigate("/ownerDashboard")}
//           className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all mb-8"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform"
//           />
//           <span className="font-semibold text-sm tracking-wide uppercase">
//             Dashboard
//           </span>
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* LEFT COLUMN: EDITING & BREAKDOWN */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* MAIN HEADER CARD */}
//             <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
//               <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
//                 <div>
//                   <h1 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
//                     Invoice Statement
//                   </h1>
//                   <p className="text-3xl font-black">
//                     {bill.month}{" "}
//                     <span className="text-indigo-400">{bill.year}</span>
//                   </p>
//                 </div>
//                 <div
//                   className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg ${
//                     bill.status.toLowerCase() === "paid"
//                       ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
//                       : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
//                   }`}
//                 >
//                   ● {bill.status}
//                 </div>
//               </div>

//               {/* QUICK STATS BARS */}
//               <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
//                 <div className="p-6 text-center">
//                   <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
//                     Due Date
//                   </p>
//                   <p className="text-slate-700 font-bold">
//                     {new Date(bill.dueDate).toLocaleDateString("en-IN")}
//                   </p>
//                 </div>
//                 <div className="p-6 text-center">
//                   <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
//                     Created On
//                   </p>
//                   <p className="text-slate-700 font-bold">
//                     {new Date(bill.createdAt).toLocaleDateString("en-IN")}
//                   </p>
//                 </div>
//                 <div className="p-6 text-center overflow-hidden">
//                   <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
//                     ID Ref
//                   </p>
//                   <p className="text-slate-700 font-bold truncate">
//                     #{bill._id.slice(-6).toUpperCase()}
//                   </p>
//                 </div>
//               </div>

//               {/* ACTION AREA */}
            
//                <div className="p-8">
                
//                 <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
//                   <CreditCard size={18} className="text-indigo-600"/> Adjust Utility Charges
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
//                       <Zap size={14} className="text-amber-500"/> Electricity (₹)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Enter amount"
//                       value={electricityAmount}
//                       onChange={(e) => setElectricityAmount(e.target.value)}
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
//                       <Droplets size={14} className="text-blue-500"/> Water (₹)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Enter amount"
//                       value={waterAmount}
//                       onChange={(e) => setWaterAmount(e.target.value)}
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none font-medium"
//                     />
//                   </div>
//                 </div>

            
             

//               {/* PREVIEW BOX */}
//               <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 border-dashed">
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Base Rent</span>
//                     <span className="font-bold text-slate-700">₹{rent}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Electricity</span>
//                     <span className="font-bold text-slate-700">
//                       ₹{effectiveElectricity}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Water & Services</span>
//                     <span className="font-bold text-slate-700">
//                       ₹{effectiveWater}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center pt-4 border-t border-indigo-200/50">
//                   <span className="text-indigo-900 font-bold uppercase tracking-wider">
//                     Total Payable
//                   </span>
//                   <span className="text-3xl font-black text-indigo-600 tracking-tighter">
//                     ₹{totalAmount.toLocaleString("en-IN")}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={updateBill}
//                 className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
//               >
//                 Save & Update Statement
//               </button>
//             </div> 
//             </div>
          


//         {/* RIGHT COLUMN: CARDS */}
//         <div className="lg:col-span-4 space-y-6">
//           <SideCard
//             icon={<User className="text-indigo-600" />}
//             title="Tenant Details"
//             lines={[
//               {
//                 label: <User size={12} />,
//                 text: bill.tenant.name,
//                 primary: true,
//               },
//               { label: <Mail size={12} />, text: bill.tenant.email },
//               { label: <Phone size={12} />, text: bill.tenant.phone },
//             ]}
//           />

//           <SideCard
//             icon={<Building className="text-slate-600" />}
//             title="Property Details"
//             lines={[
//               {
//                 label: <Building size={12} />,
//                 text: bill.property.propertyName,
//                 primary: true,
//               },
//               { label: <Hash size={12} />, text: bill.property.address },
//             ]}
//           />

//           <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl">
//             <h4 className="font-bold text-sm mb-2 uppercase tracking-wider flex items-center gap-2">
//               Owner Contact
//             </h4>
//             <p className="text-indigo-100 text-sm font-medium flex items-center gap-2">
//               <Mail size={14} /> {bill.owner.email}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//    </div>
//   );
// }

// /* UI COMPONENTS */
// const SideCard = ({ icon, title, lines }) => (
//   <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
//     <div className="flex items-center gap-3 mb-6">
//       <div className="bg-slate-50 p-2.5 rounded-xl">{icon}</div>
//       <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
//         {title}
//       </h4>
//     </div>
//     <div className="space-y-4">
//       {lines.map((line, i) => (
//         <div key={i} className="flex items-start gap-3">
//           <span className="mt-1 text-slate-300">{line.label}</span>
//           <p
//             className={`${line.primary ? "font-bold text-slate-800" : "text-sm text-slate-500 font-medium"} leading-tight`}
//           >
//             {line.text}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  User,
  Building,
  Zap,
  Droplets,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function BillDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [electricityAmount, setElectricityAmount] = useState("");
  const [waterAmount, setWaterAmount] = useState("");

  const getBillById = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3100/api/bill/getBillById/${id}`,
        { withCredentials: true }
      );
      setBill(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) getBillById();
  }, [id]);

  if (!bill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Fetching statement details...</p>
      </div>
    );
  }

  const rent = Number(bill.rentAmount || 0);
  const effectiveElectricity = electricityAmount !== "" ? Number(electricityAmount) : bill.electricityAmount || 0;
  const effectiveWater = waterAmount !== "" ? Number(waterAmount) : bill.waterAmount || 0;
  const totalAmount = rent + effectiveElectricity + effectiveWater;

  const updateBill = async () => {
    try {
      const result = await axios.put(
        `http://localhost:3100/api/bill/update/${id}`,
        {
          electricityAmount: effectiveElectricity,
          waterAmount: effectiveWater,
        }
      );
      if (result.data.success) {
        navigate("/owner/bills");
      }
      getBillById();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans antialiased text-slate-900">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/ownerDashboard")}
            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-widest">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
              bill.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {bill.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: PRIMARY ACTION */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                      Invoice for {bill.month}
                    </h1>
                    <p className="text-slate-500 flex items-center gap-2 mt-1 italic">
                      <Calendar size={14} /> Fiscal Year {bill.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
                    <p className="text-4xl font-black text-indigo-600">₹{totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {bill.status === "Pending" ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
                          <Zap size={16} className="text-amber-500" /> Electricity Unit
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={electricityAmount}
                            onChange={(e) => setElectricityAmount(e.target.value)}
                            className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
                          <Droplets size={16} className="text-blue-500" /> Water Consumption
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={waterAmount}
                            onChange={(e) => setWaterAmount(e.target.value)}
                            className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-300">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Breakdown Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Base Monthly Rent</span>
                          <span className="font-mono font-bold">₹{rent}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Electricity Bill</span>
                          <span className="font-mono font-bold">₹{effectiveElectricity}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 pb-3 border-b border-slate-200">
                          <span>Water Charges</span>
                          <span className="font-mono font-bold">₹{effectiveWater}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-900 pt-2">
                          <span className="font-bold text-lg">Grand Total</span>
                          <span className="font-black text-2xl text-indigo-600">₹{totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={updateBill}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Finalize and Update Statement</span>
                      <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck size={40} className="text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Payment Completed</h3>
                    <p className="text-slate-500 mt-1 max-w-xs">This statement is locked as payment has already been settled by the tenant.</p>
                    
                    <div className="mt-8 w-full max-w-md bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-emerald-800 font-medium">Total Received</span>
                        <span className="font-black text-emerald-900 text-xl">₹{rent}</span>
                      </div>
                      {bill.paymentDate && (
                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                          <Clock size={14} />
                          Settled on {new Date(bill.paymentDate).toLocaleDateString("en-IN", {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CARDS */}
          <div className="lg:col-span-4 space-y-6">
            <SideCard
              icon={<User className="text-indigo-600" size={20} />}
              title="Tenant Profiles"
              lines={[
                { text: bill.tenant?.name, primary: true },
                { text: bill.tenant?.email, sub: true },
                { text: bill.tenant?.phone, sub: true },
              ]}
            />

            <SideCard
              icon={<Building className="text-indigo-600" size={20} />}
              title="Property Detail"
              lines={[
                { text: bill.property?.propertyName, primary: true },
                { text: bill.property?.address, sub: true },
              ]}
            />

            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <CreditCard size={80} />
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Owner in Charge</p>
               <h4 className="font-bold truncate relative z-10">{bill.owner?.email}</h4>
               <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-bold tracking-widest uppercase relative z-10">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 Verified Account
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SideCard = ({ icon, title, lines }) => (
  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200 hover:border-indigo-200 transition-colors">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 bg-indigo-50 rounded-lg">
        {icon}
      </div>
      <h4 className="font-bold text-slate-800 tracking-tight">{title}</h4>
    </div>

    <div className="space-y-3">
      {lines.map((line, i) => (
        <p key={i} className={`
          ${line.primary ? "text-lg font-bold text-slate-900 leading-tight" : ""}
          ${line.sub ? "text-sm text-slate-500 font-medium" : ""}
          ${!line.primary && !line.sub ? "text-slate-700" : ""}
        `}>
          {line.text}
        </p>
      ))}
    </div>
  </div>
);