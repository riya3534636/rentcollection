// import { useSelector } from "react-redux";
// import axios from "axios"
// import { useEffect } from "react";

// export default function TenantDashboard() {

//   const getTenantSummary=async()=>{
//     try {
//       const res=await axios.get("http://localhost:3100/api/tenant/tenantDashboard/summary",{
//        withCredentials: true,
//       })
//       console.log(res.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   const getCurrentBill=async()=>{
//     try {
//       const res=await axios.get("http://localhost:3100/api/tenant/getCurrentMonthBill",{
//        withCredentials: true,
//       })
//       console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//    const getMaintaince=async()=>{
//     try {
//       const res=await axios.get("http://localhost:3100/api/tenant/getMaintenanceSummary",{
//        withCredentials: true,
//       })
//       console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }



//   useEffect(()=>{
//      getTenantSummary()
//      getCurrentBill()
//      getMaintaince()
//   },[])


//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
      
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Welcome,  👋
//         </h1>
//         <p className="text-sm text-gray-500">
//           Property:  · Flat 202 · Owner: 
//         </p>
//       </div>

//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//         {/* Pending Amount */}
//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
//           <p className="text-sm text-gray-500">Pending Amount</p>
//           <h2 className="text-2xl font-bold text-red-600 mt-2">₹{}</h2>
//           <p className="text-xs text-red-500 mt-1">1 Bill Overdue</p>
//         </div>

//         {/* Current Rent */}
//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
//           <p className="text-sm text-gray-500">February Rent</p>
//           <h2 className="text-2xl font-bold text-blue-600 mt-2">₹8,000</h2>
//           <p className="text-xs text-gray-500 mt-1">Due on 10 Feb 2026</p>
//         </div>

//         {/* Maintenance */}
//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
//           <p className="text-sm text-gray-500">Maintenance</p>
//           <h2 className="text-2xl font-bold text-green-600 mt-2">2 Active</h2>
//           <p className="text-xs text-gray-500 mt-1">1 Resolved</p>
//         </div>
//       </div>

//       {/* Current Bill Section */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           February 2026 Bill
//         </h3>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//           <div>
//             <p className="text-sm text-gray-500">Rent</p>
//             <p className="font-semibold">₹8,000</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Water</p>
//             <p className="font-semibold">₹300</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Electricity</p>
//             <p className="font-semibold">₹250</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total</p>
//             <p className="font-bold text-blue-600">₹8,550</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
//             Pending
//           </span>

//           <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//             Pay Now
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";

export default function TenantDashboard() {
  const [tenantSummary, setTenantSummary] = useState(null);
  const [currentBill, setCurrentBill] = useState(null);
  const [maintenanceSummary, setMaintenanceSummary] = useState(null);

  // API calls
  const getTenantSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3100/api/tenant/tenantDashboard/summary",
        { withCredentials: true }
      );
      setTenantSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentBill = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3100/api/tenant/getCurrentMonthBill",
        { withCredentials: true }
      );
      setCurrentBill(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMaintenance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3100/api/tenant/getMaintenanceSummary",
        { withCredentials: true }
      );
      setMaintenanceSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTenantSummary();
    getCurrentBill();
    getMaintenance();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {tenantSummary?.tenantName} 👋
        </h1>
        <p className="text-sm text-gray-500">
          Property: · Flat 202 · Owner: {tenantSummary?.ownerName}
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Pending Amount */}
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <h2 className="text-2xl font-bold text-red-600 mt-2">
            ₹{tenantSummary?.totalPendingAmount ?? 0}
          </h2>
          <p className="text-xs text-red-500 mt-1">
            {tenantSummary?.overdueBills} Bill Overdue
          </p>
        </div>

        {/* Current Rent */}
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">
            {currentBill?.month} Rent
          </p>
          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            ₹{currentBill?.rentAmount}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Due on{" "}
            {currentBill?.dueDate
              ? new Date(currentBill.dueDate).toLocaleDateString()
              : ""}
          </p>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Maintenance</p>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {maintenanceSummary?.active} Active
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {maintenanceSummary?.resolved} Resolved
          </p>
        </div>
      </div>

      {/* Current Bill Section */}
      {currentBill && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {currentBill.month} {currentBill.year} Bill
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Rent</p>
              <p className="font-semibold">₹{currentBill.rentAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Water</p>
              <p className="font-semibold">₹{currentBill.waterAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Electricity</p>
              <p className="font-semibold">₹{currentBill.electricityAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-blue-600">₹{currentBill.totalAmount}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
              {currentBill.status}
            </span>

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}